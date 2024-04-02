import { CONTACT } from "../constants";
import { motion } from "framer-motion";

const ContactMe = () => {
  return (
    <div className="border-b border-neutral-900 pb-20 px-4 sm:px-6 lg:px-8">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="my-10 text-center text-4xl font-semibold text-neutral-100"
      >
        Contact Me
      </motion.h2>
      <div className="text-center tracking-tighter">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="my-4 text-lg text-neutral-300"
        >
          {CONTACT.address}
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="my-4 text-lg text-neutral-300"
        >
          {CONTACT.phone}
        </motion.p>
        <motion.a 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          href={`mailto:${CONTACT.email}`} 
          className="my-4 inline-block font-medium text-neutral-200 border-b-2 border-transparent hover:border-neutral-100 hover:text-neutral-50 transition-colors duration-300"
        >
          {CONTACT.email}
        </motion.a>
      </div>
    </div>
  );
};

export default ContactMe;
