import { HERO_CONTENT } from "../constants";
import radoucheAbout from "../assets/radoucheAbout.jpg";
import DownloadPDFButton from "./DownloadMyPdf";
import { motion } from "framer-motion";
import { useTypewriter } from "react-simple-typewriter";

const container = (delay) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: delay },
  },
});

const Hero = () => {
  const [typeEffect] = useTypewriter({
    words: ["Full Stack Developper"],
    loop: {},
    typeSpeed: 100,
    deleteSpeed: 40,
  });

  const profileVar = (duration) => ({
    initial: { y: -10 },
    animate: {
      y: [10, -10],
      transition: {
        duration: duration,
        ease: "linear",
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  });

  return (
    <div className="border-b border-neutral-900 pb-4 lg:mb-35">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-1/2">
          <div className="flex flex-col items-center lg:items-start">
            <motion.h1
              variants={container(0)}
              initial="hidden"
              animate="visible"
              className="pb-9 text-5xl font-thin tracking-tight lg:mt-16 lg:text-8xl"
            >
              Ilias<br></br>
              <span className="text-neutral-400 font-medium"> RADOUCHE</span>
            </motion.h1>
            <motion.span
              variants={container(0.5)}
              initial="hidden"
              animate="visible"
              className="bg-gradient-to-r from-orange-700 via-slate-500 to-sky-50 bg-clip-text text-3xl tracking-tight text-transparent"
            >
             I am 
              <span> {typeEffect}</span>
            </motion.span>
            <motion.p
              variants={container(1)}
              initial="hidden"
              animate="visible"
              className="my-2 max-w-xl py-6 font-light tracking-tighter"
            >
              {HERO_CONTENT}
            </motion.p>
            <DownloadPDFButton />
          </div>
        </div>
        <motion.div
          variants={container(2)}
          initial="hidden"
          animate="visible"
          className="w-full lg:w-1/2 lg:p-20"
        >
          <motion.div
            variants={profileVar(2)}
            initial="initial"
            animate="animate"
            className="inline-block rounded-3xl overflow-hidden"
          >
            <img
              className="rounded-full"
              src={radoucheAbout}
              alt="profilepic"
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
