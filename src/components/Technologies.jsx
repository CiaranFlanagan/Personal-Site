import { RiReactjsLine } from "react-icons/ri";
import { FaJava } from "react-icons/fa";
import { SiPython, SiMysql } from "react-icons/si";
import RacketIcon from "../assets/Racket-logo.png";

const Technologies = () => {
  return (
    <div className="border-b border-neutral-800 pb-24">
      <h2 className="my-20 text-center text-4xl">Technologies</h2>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <div className="rounded-2xl border-4 border-neutral-800 p-4 flex items-center justify-center">
          <RiReactjsLine className="text-8xl text-cyan-400" />
        </div>
        <div className="rounded-2xl border-4 border-neutral-800 p-4 flex items-center justify-center">
          <FaJava className="text-8xl text-red-700" />
        </div>
        <div className="rounded-2xl border-4 border-neutral-800 p-4 flex items-center justify-center">
          <SiPython className="text-8xl text-yellow-400" />
        </div>
        <div className="rounded-2xl border-4 border-neutral-800 p-4 flex items-center justify-center">
          <SiMysql className="text-8xl text-blue-400" />
        </div>
        <div className="rounded-2xl border-4 border-neutral-800 p-4 flex items-center justify-center">
          <img
            src={RacketIcon}
            alt="Racket Logo"
            className="w-24 h-24 object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Technologies;
