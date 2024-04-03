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
    link.href = "https://drive.usercontent.google.com/download?id=1wi-v6hSzBGqJsT3zmt5odiO2CictL0dA&export=download&authuser=0&confirm=t&uuid=af001b80-6add-45d4-8c7f-75031bd8a8e1&at=APZUnTVwR7ZyRVoAPK3eGJ_VPX1X:1712158192474";
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
