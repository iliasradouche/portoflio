import { motion } from "motion/react";
import { HiOutlineDownload } from "react-icons/hi";
import { useState } from "react";

const DownloadPDFButton = () => {
  const [clicked, setClicked] = useState(false);

  const handleDownload = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 1200);
    const a   = document.createElement("a");
    a.href    = "/my_resume.pdf";
    a.download = "ILIAS_RADOUCHE_CV.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <motion.button
      onClick={handleDownload}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className="btn-terminal-solid inline-flex items-center gap-2 rounded px-6 py-3 font-mono text-sm font-bold"
    >
      <motion.span
        animate={clicked ? { rotate: [0, 15, -10, 5, 0] } : {}}
        transition={{ duration: 0.5 }}
        className="flex items-center"
      >
        <HiOutlineDownload className="h-4 w-4" />
      </motion.span>
      {clicked ? "downloading..." : "Download CV"}
    </motion.button>
  );
};

export default DownloadPDFButton;
