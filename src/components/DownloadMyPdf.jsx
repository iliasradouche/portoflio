import { motion } from "framer-motion";

const container = (delay) => ({
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: delay },
  },
});

const DownloadPDFButton = () => {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "https://drive.usercontent.google.com/download?id=10eyHQi6vIn-E3cRW2t47eNeCqSDIA8sg&export=download&authuser=0&confirm=t&uuid=388f65fc-631b-4697-ab08-d13f70addc1e&at=APZUnTXZMzENqtsj2wG1cc5WE0ub:1712157371757";
    link.download = "ILIAS_RADOUCHE_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.button
      variants={container(1.5)}
      initial="hidden"
      animate="visible"
      onClick={handleDownload}
      className="mt-4 px-6 py-2 mb-8 lg:mb-0 border-2 border-transparent font-medium rounded-md text-white bg-orange-500 hover:bg-orange-700"
    >
      Download PDF
    </motion.button>
  );
};

export default DownloadPDFButton;
