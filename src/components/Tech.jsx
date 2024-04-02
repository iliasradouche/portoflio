import { RiReactjsLine } from "react-icons/ri";
import { TbBrandNextjs } from "react-icons/tb";
import { SiMongodb } from "react-icons/si";
import { FaNodeJs, FaHtml5, FaCss3Alt, FaFigma } from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si";
import { motion } from "framer-motion";

const scalePulseVariants = {
  initial: { scale: 0 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 0.8,
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0.5,
    },
  },
};

const Tech = () => {
  return (
    <div className="border-b border-neutral-800 pb-24">
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 1.5 }}
        className="my-20 text-center text-4xl"
      >
        Technologies
      </motion.h2>
      <motion.div
        whileInView={{ opacity: 1, x: 0 }}
        initial={{ opacity: 0, x: -100 }}
        transition={{ duration: 1.5 }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <motion.div
          variants={scalePulseVariants}
          initial="initial"
          animate="animate"
          className="rounded-full border-4 border-neutral-800 p-4"
        >
          <RiReactjsLine className="text-7xl text-cyan-400" />
        </motion.div>
        <motion.div
          variants={scalePulseVariants}
          initial="initial"
          animate="animate"
          className="rounded-full border-4 border-neutral-800 p-4"
        >
          <SiMongodb className="text-7xl text-green-400" />
        </motion.div>
        <motion.div
          variants={scalePulseVariants}
          initial="initial"
          animate="animate"
          className="rounded-full border-4 border-neutral-800 p-4"
        >
          <TbBrandNextjs className="text-7xl" />
        </motion.div>
        <motion.div
          variants={scalePulseVariants}
          initial="initial"
          animate="animate"
          className="rounded-full border-4 border-neutral-800 p-4"
        >
          <FaNodeJs className="text-7xl text-green-400" />
        </motion.div>
        <motion.div
          variants={scalePulseVariants}
          initial="initial"
          animate="animate"
          className="rounded-full border-4 border-neutral-800 p-4"
        >
          <SiTailwindcss className="text-7xl text-cyan-400" />
        </motion.div>
        <motion.div
          variants={scalePulseVariants}
          initial="initial"
          animate="animate"
          className="rounded-full border-4 border-neutral-800 p-4"
        >
          <FaHtml5 className="text-7xl text-orange-500" />
        </motion.div>
        <motion.div
          variants={scalePulseVariants}
          initial="initial"
          animate="animate"
          className="rounded-full border-4 border-neutral-800 p-4"
        >
          <FaCss3Alt className="text-7xl text-blue-500" />
        </motion.div>
        <motion.div
          variants={scalePulseVariants}
          initial="initial"
          animate="animate"
          className="rounded-full border-4 border-neutral-800 p-4"
        >
          <FaFigma className="text-7xl text-purple-500" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Tech;
