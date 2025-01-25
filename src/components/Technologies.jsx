import { RiReactjsLine, RiNodejsLine } from "react-icons/ri";
import {
  FaJava,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
  FaChartBar,
} from "react-icons/fa";
import {
  SiPython,
  SiMysql,
  SiMongodb,
  SiSupabase,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiTypescript,
  SiJavascript,
  SiExpress,
} from "react-icons/si";
import { CgCPlusPlus } from "react-icons/cg";
import RacketIcon from "../assets/Racket-logo.png";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const Technologies = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      className="border-b border-neutral-800 pb-24"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      ref={ref}
    >
      <h2 className="my-20 text-center text-4xl">Technologies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {/* Programming Languages */}
        <motion.div className="flex flex-col items-center hover:scale-110 transition-transform duration-300">
          <FaJava className="text-4xl" />
          <span>Java</span>
        </motion.div>
        <motion.div className="flex flex-col items-center hover:scale-110 transition-transform duration-300">
          <SiPython className="text-4xl" />
          <span>Python</span>
        </motion.div>
        <motion.div className="flex flex-col items-center hover:scale-110 transition-transform duration-300">
          <SiMysql className="text-4xl" />
          <span>SQL</span>
        </motion.div>
        <motion.div className="flex flex-col items-center hover:scale-110 transition-transform duration-300">
          <SiJavascript className="text-4xl" />
          <span>JavaScript</span>
        </motion.div>
        <motion.div className="flex flex-col items-center hover:scale-110 transition-transform duration-300">
          <SiTypescript className="text-4xl" />
          <span>TypeScript</span>
        </motion.div>
        <motion.div className="flex flex-col items-center hover:scale-110 transition-transform duration-300">
          <img src={RacketIcon} alt="Racket" className="w-10 h-10" />
          <span>Racket</span>
        </motion.div>
        <motion.div className="flex flex-col items-center hover:scale-110 transition-transform duration-300">
          <CgCPlusPlus className="text-4xl" />
          <span>C++</span>
        </motion.div>

        {/* Tools & Technologies */}
        <motion.div className="flex flex-col items-center hover:scale-110 transition-transform duration-300">
          <RiReactjsLine className="text-4xl" />
          <span>React.js</span>
        </motion.div>
        <motion.div className="flex flex-col items-center hover:scale-110 transition-transform duration-300">
          <RiNodejsLine className="text-4xl" />
          <span>Node.js</span>
        </motion.div>
        <motion.div className="flex flex-col items-center hover:scale-110 transition-transform duration-300">
          <SiExpress className="text-4xl" />
          <span>Express.js</span>
        </motion.div>
        <motion.div className="flex flex-col items-center hover:scale-110 transition-transform duration-300">
          <SiMongodb className="text-4xl" />
          <span>MongoDB</span>
        </motion.div>
        <motion.div className="flex flex-col items-center hover:scale-110 transition-transform duration-300">
          <SiSupabase className="text-4xl" />
          <span>Supabase</span>
        </motion.div>
        <motion.div className="flex flex-col items-center hover:scale-110 transition-transform duration-300">
          <SiPandas className="text-4xl" />
          <span>Pandas</span>
        </motion.div>
        <motion.div className="flex flex-col items-center hover:scale-110 transition-transform duration-300">
          <SiNumpy className="text-4xl" />
          <span>NumPy</span>
        </motion.div>
        <motion.div className="flex flex-col items-center hover:scale-110 transition-transform duration-300">
          <FaChartBar className="text-4xl" />
          <span>Matplotlib</span>
        </motion.div>
        <motion.div className="flex flex-col items-center hover:scale-110 transition-transform duration-300">
          <SiScikitlearn className="text-4xl" />
          <span>Scikit-learn</span>
        </motion.div>
        <motion.div className="flex flex-col items-center hover:scale-110 transition-transform duration-300">
          <FaHtml5 className="text-4xl" />
          <span>HTML</span>
        </motion.div>
        <motion.div className="flex flex-col items-center hover:scale-110 transition-transform duration-300">
          <FaCss3Alt className="text-4xl" />
          <span>CSS</span>
        </motion.div>
        <motion.div className="flex flex-col items-center hover:scale-110 transition-transform duration-300">
          <FaGitAlt className="text-4xl" />
          <span>Git</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Technologies;
