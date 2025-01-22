import { PROFILE_CONTENT } from "../constants";
import Headshot from "../assets/Headshot-removebg.png";
import { motion } from "framer-motion";

const Profile = () => {
  return (
    <div className="border-b border-neutral-900 pb-4 lg:mb-35 overflow-x-hidden">
      <div className="flex flex-wrap">
        <motion.div
          className="w-full lg:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center lg:items-start">
            <h1 className="pb-16 text-6xl font-thin tracking-tight lg:mt-16 lg:text-8xl">
              Hey! I&apos;m{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-galwayMaroon-700 to-galwayWhite font-bold">
                Ciar&aacute;n Flanagan
              </span>
            </h1>
            <span className="text-to-galwayWhite text-3xl tracking-tight">
              Honors CS Student at Northeastern University
            </span>
            <p className="my-2 max-w-xl py-6 font-light tracking-tighter">
              {PROFILE_CONTENT}
            </p>
          </div>
        </motion.div>
        <motion.div
          className="w-full lg:w-1/2 lg:p-8"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center">
            <img
              src={Headshot}
              alt="pic did not load :("
              className="rounded-lg shadow-lg"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
