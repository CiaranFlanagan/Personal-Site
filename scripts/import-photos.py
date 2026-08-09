#!/usr/bin/env python3
"""Import the "website photos" album from Photos.app into the site.

    npm run import:photos

Adding a photo is: put it in the album, run this. It exports the album, works
out where each photo was taken from its own GPS, sorts it into a place group,
resizes it, and regenerates src/photoMeta.js. Nothing needs editing by hand
unless a photo is somewhere new, in which case it is reported as UNPLACED and
wants a row in PLACES below.

Two things worth knowing:

  * Photos.app strips GPS on export but keeps it in the library, so the place
    is read from the library and the files that ship carry no coordinates.
    That is the reason this reads metadata separately rather than off the
    exported file.

  * Exporting a burst gives you every frame in the stack, so the file list
    comes from the album rather than from the export directory.
"""
import csv
import math
import os
import shutil
import subprocess
import sys
import tempfile
from collections import defaultdict

ALBUM = "website photos"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEST = os.path.join(ROOT, "src", "assets", "photos")
META = os.path.join(ROOT, "src", "photoMeta.js")
OVERRIDES = os.path.join(ROOT, "scripts", "photo-overrides")

# (place label, group, lat, lng, radius_km). Radii only have to separate one
# trip from another, so they are generous. Group is the folder name, which is
# also what the site groups by.
PLACES = [
    ("Galway",                     "ireland",       53.2707,  -9.0568, 15),
    ("Co. Galway",                 "ireland",       53.2110,  -8.8950, 15),
    ("Cork",                       "ireland",       51.8985,  -8.4756, 10),
    ("Kinsale, Co. Cork",          "ireland",       51.7059,  -8.5222, 12),
    ("Midleton, Co. Cork",         "ireland",       51.9146,  -8.1745, 12),
    ("Cobh, Co. Cork",             "ireland",       51.8515,  -8.2971, 10),
    ("Ortigia, Syracuse",          "sicily",        37.0590,  15.2930, 15),
    ("Taormina",                   "sicily",        37.8523,  15.2896, 12),
    ("Mount Etna",                 "sicily",        37.7510,  14.9930, 25),
    ("Cefalù",                     "sicily",        38.0390,  14.0220, 12),
    ("Arenal",                     "costa-rica",    10.4300, -84.7200, 30),
    ("Manuel Antonio",             "costa-rica",     9.3900, -84.1400, 20),
    ("Central Park, New York",     "new-york",      40.7800, -73.9620, 5),
    ("West Village, New York",     "new-york",      40.7330, -74.0040, 4),
    ("Lower East Side, New York",  "new-york",      40.7210, -73.9890, 4),
    ("Watertown",                  "massachusetts", 42.3709, -71.1828, 8),
    ("Boston",                     "massachusetts", 42.3601, -71.0589, 15),
    ("Cape Cod",                   "massachusetts", 41.6760, -70.0900, 30),
    ("Fayetteville, Arkansas",     "arkansas",      36.0626, -94.1574, 25),
    ("Hawksbill Crag, Arkansas",   "arkansas",      35.8917, -93.4436, 15),
    ("Bryce Canyon, Utah",         "southwest",     37.5930,-112.1870, 30),
]

# Photos with no GPS. Placed from the rest of the same day's photos, except the
# GAA one, which is a screenshot of the club's Instagram post rather than a
# photo taken anywhere.
MANUAL = {
    "IMG_8566.JPG": ("Antelope Canyon, Arizona", "southwest", "2022-07-01"),
    "IMG_2587.PNG": ("Irish Cultural Centre, Canton", "massachusetts", "2022-08-13"),
    "IMG_0967.JPG": ("Arenal", "costa-rica", None),
    "IMG_1768.JPG": ("Galway", "ireland", None),
    "IMG_0766.JPG": ("Hawksbill Crag, Arkansas", "arkansas", None),
}

# Photos that already live in the repo rather than the album.
KEEP = {
    "massachusetts/oasis-workshop.jpg": ("Northeastern, Boston", "2025-01-01", ""),
}

SLUG = {
    "Galway": "galway", "Co. Galway": "co-galway", "Cork": "cork",
    "Kinsale, Co. Cork": "kinsale", "Midleton, Co. Cork": "midleton",
    "Cobh, Co. Cork": "cobh", "Ortigia, Syracuse": "ortigia",
    "Taormina": "taormina", "Mount Etna": "etna", "Cefalù": "cefalu",
    "Arenal": "arenal", "Manuel Antonio": "manuel-antonio",
    "Central Park, New York": "central-park",
    "West Village, New York": "west-village",
    "Lower East Side, New York": "lower-east-side",
    "Watertown": "watertown", "Boston": "boston", "Cape Cod": "cape-cod",
    "Fayetteville, Arkansas": "fayetteville",
    "Hawksbill Crag, Arkansas": "hawksbill-crag",
    "Bryce Canyon, Utah": "bryce-canyon",
    "Antelope Canyon, Arizona": "antelope-canyon",
    "Irish Cultural Centre, Canton": "galway-boston",
}

MONTHS = ["", "January", "February", "March", "April", "May", "June", "July",
          "August", "September", "October", "November", "December"]

LONG_EDGE = "1200"
QUALITY = "55"

MANIFEST_SCRIPT = """
tell application "Photos"
  set AppleScript's text item delimiters to tab
  set out to {}
  repeat with m in (media items of album "%s")
    set fn to filename of m
    set dt to (date of m)
    set la to "NA"
    set lo to "NA"
    try
      set l to location of m
      if (item 1 of l) is not missing value then
        set la to (item 1 of l) as string
        set lo to (item 2 of l) as string
      end if
    end try
    set end of out to (fn & tab & ((year of dt) as string) & "-" & ¬
      ((month of dt as integer) as string) & "-" & ((day of dt) as string) & ¬
      tab & la & tab & lo)
  end repeat
  set AppleScript's text item delimiters to linefeed
  return out as string
end tell
"""


def osa(script):
    return subprocess.run(
        ["osascript", "-e", script], check=True, capture_output=True, text=True
    ).stdout


def haversine(a1, o1, a2, o2):
    r = 6371.0
    p1, p2 = math.radians(a1), math.radians(a2)
    dp, dl = math.radians(a2 - a1), math.radians(o2 - o1)
    h = math.sin(dp / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return 2 * r * math.asin(math.sqrt(h))


def locate(lat, lng):
    best, best_d = None, 1e9
    for label, group, plat, plng, radius in PLACES:
        d = haversine(lat, lng, plat, plng)
        if d < radius and d < best_d:
            best, best_d = (label, group), d
    return best


def dims(path):
    out = subprocess.run(
        ["sips", "-g", "pixelWidth", "-g", "pixelHeight", path],
        check=True, capture_output=True, text=True,
    ).stdout
    got = {}
    for line in out.splitlines():
        if "pixelWidth:" in line:
            got["w"] = int(line.split(":")[1])
        if "pixelHeight:" in line:
            got["h"] = int(line.split(":")[1])
    return got


def main():
    export_dir = tempfile.mkdtemp(prefix="website-photos-")
    print(f"exporting {ALBUM!r} to {export_dir}")
    osa(
        f'tell application "Photos" to export (get media items of album "{ALBUM}") '
        f'to POSIX file "{export_dir}" with using originals'
    )

    rows, unplaced = [], []
    for fn, date, lat, lng in csv.reader(
        osa(MANIFEST_SCRIPT % ALBUM).splitlines(), delimiter="\t"
    ):
        y, m, d = (int(x) for x in date.split("-"))
        iso = f"{y:04d}-{m:02d}-{d:02d}"
        if fn in MANUAL:
            label, group, override = MANUAL[fn]
            if override:
                iso = override
        else:
            hit = locate(float(lat), float(lng)) if lat != "NA" else None
            if not hit:
                unplaced.append(f"{fn}  {date}  {lat},{lng}")
                continue
            label, group = hit
        rows.append({"file": fn, "iso": iso, "place": label, "group": group})

    rows.sort(key=lambda r: (r["iso"], r["file"]))

    # Rebuild the group folders from scratch so removing a photo from the album
    # removes it from the site. Anything in KEEP is stashed and put back.
    stashed = {}
    for key in KEEP:
        path = os.path.join(DEST, key)
        if os.path.exists(path):
            tmp = os.path.join(export_dir, os.path.basename(key))
            shutil.copy2(path, tmp)
            stashed[key] = tmp
    for entry in os.listdir(DEST):
        p = os.path.join(DEST, entry)
        if os.path.isdir(p):
            shutil.rmtree(p)

    counters, manifest = defaultdict(int), []
    for r in rows:
        slug = SLUG.get(r["place"])
        if not slug:
            unplaced.append(f'{r["file"]}  no slug for {r["place"]!r}')
            continue
        counters[slug] += 1
        name = f"{slug}-{counters[slug]:02d}.jpg"
        out_dir = os.path.join(DEST, r["group"])
        os.makedirs(out_dir, exist_ok=True)
        out = os.path.join(out_dir, name)

        override = os.path.join(OVERRIDES, r["file"] + ".jpg")
        src = override if os.path.exists(override) else os.path.join(export_dir, r["file"])
        subprocess.run(
            ["sips", "-s", "format", "jpeg", "-Z", LONG_EDGE, src, "--out", out,
             "-s", "formatOptions", QUALITY],
            check=True, capture_output=True,
        )
        y, m, _ = (int(x) for x in r["iso"].split("-"))
        manifest.append({
            "key": f'{r["group"]}/{name}',
            "place": r["place"],
            "date": r["iso"],
            "when": f"{MONTHS[m]} {y}",
            **dims(out),
        })

    for key, tmp in stashed.items():
        dest = os.path.join(DEST, key)
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        shutil.copy2(tmp, dest)
        place, date, when = KEEP[key]
        manifest.append({"key": key, "place": place, "date": date,
                         "when": when, **dims(dest)})

    manifest.sort(key=lambda m: m["key"])
    with open(META, "w") as fh:
        fh.write(
            "/* Generated by scripts/import-photos.py. Do not edit by hand.\n"
            " *\n"
            " * Place and date come from each photo's own metadata, so a caption\n"
            " * built from these states a fact rather than describing the picture.\n"
            " * Hand-written captions in PHOTO_CAPTIONS override them.\n"
            " */\n"
            "export const PHOTO_META = {\n"
        )
        for m in manifest:
            fh.write(
                f'  "{m["key"]}": {{ place: "{m["place"]}", date: "{m["date"]}", '
                f'when: "{m["when"]}", w: {m["w"]}, h: {m["h"]} }},\n'
            )
        fh.write("};\n")

    shutil.rmtree(export_dir, ignore_errors=True)

    by_group = defaultdict(list)
    for m in manifest:
        by_group[m["key"].split("/")[0]].append(m)
    for g, items in sorted(by_group.items()):
        print(f"{g:>14}  {len(items):>2}")
    print(f"\n{len(manifest)} photos")

    if unplaced:
        print("\nUNPLACED, add a row to PLACES or MANUAL:", file=sys.stderr)
        for u in unplaced:
            print(f"  {u}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
