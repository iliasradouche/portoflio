import { useState, useRef } from "react";
import { CONTACT } from "../constants";
import { motion, useInView } from "framer-motion";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker, HiOutlinePaperAirplane } from "react-icons/hi";
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const ContactMe = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      }, 3000);
    }, 1500);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };
  
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" }
    }
  };

  // Social media links
  const socialLinks = [
    { 
      name: "LinkedIn", 
      icon: <FaLinkedin />, 
      href: "https://www.linkedin.com/in/ilias-radouche",
      color: "bg-[#0077B5]"
    },
    { 
      name: "GitHub", 
      icon: <FaGithub />, 
      href: "https://github.com/iliasradouche",
      color: "bg-[#333333]" 
    },
    { 
      name: "Twitter", 
      icon: <FaSquareXTwitter />, 
      href: "https://twitter.com/Radoucheilias",
      color: "bg-[#1DA1F2]" 
    },
    { 
      name: "Instagram", 
      icon: <FaInstagram />, 
      href: "https://www.instagram.com/radouche__",
      color: "bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]" 
    }
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden border-b border-neutral-800 py-16 lg:py-24"
      id="contact"
    >
      {/* Background elements */}
      <div className="absolute -right-32 top-1/4 -z-10 h-96 w-96 rounded-full bg-gradient-to-tr from-orange-700/10 to-transparent blur-3xl"></div>
      <div className="absolute -left-32 bottom-1/4 -z-10 h-96 w-96 rounded-full bg-gradient-to-bl from-sky-700/10 to-transparent blur-3xl"></div>
      
      <div className="container mx-auto px-6">
        {/* Section title */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-16 text-center"
        >
          <h2 className="inline-block text-4xl font-light tracking-tight lg:text-5xl">
            Let's
            <span className="font-medium text-neutral-400"> Connect</span>
          </h2>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-orange-500 to-sky-500"></div>
          <p className="mx-auto mt-4 max-w-2xl text-neutral-400">
            Have a project in mind or just want to say hello? I'd love to hear from you.
          </p>
        </motion.div>
        
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h3 className="mb-6 text-2xl font-medium">Get in Touch</h3>
              <p className="mb-8 text-neutral-400">
                Whether you have a question, a project proposal, or just want to connect, feel free to reach out. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </motion.div>
            
            {/* Contact Details */}
            <motion.div 
              variants={itemVariants}
              className="space-y-6"
            >
              {/* Email */}
              <div className="flex items-start">
                <div className="mr-4 rounded-full bg-gradient-to-r from-orange-500/20 to-sky-500/20 p-3">
                  <HiOutlineMail className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <a 
                    href={`mailto:${CONTACT.email}`} 
                    className="text-neutral-400 transition-colors hover:text-orange-400"
                  >
                    {CONTACT.email}
                  </a>
                </div>
              </div>
              
              {/* Phone */}
              <div className="flex items-start">
                <div className="mr-4 rounded-full bg-gradient-to-r from-orange-500/20 to-sky-500/20 p-3">
                  <HiOutlinePhone className="h-6 w-6 text-sky-400" />
                </div>
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <a 
                    href={`tel:${CONTACT.phone}`} 
                    className="text-neutral-400 transition-colors hover:text-sky-400"
                  >
                    {CONTACT.phone}
                  </a>
                </div>
              </div>
              
              {/* Location */}
              <div className="flex items-start">
                <div className="mr-4 rounded-full bg-gradient-to-r from-orange-500/20 to-sky-500/20 p-3">
                  <HiOutlineLocationMarker className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <h4 className="font-medium">Location</h4>
                  <p className="text-neutral-400">{CONTACT.address}</p>
                </div>
              </div>
            </motion.div>
            
            {/* Social Media */}
            <motion.div variants={itemVariants} className="mt-8">
              <h4 className="mb-4 font-medium">Connect on Social Media</h4>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-white transition-transform hover:scale-110 ${social.color}`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
          
          {/* Contact Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 backdrop-blur-sm lg:p-8"
          >
            <motion.h3 
              variants={itemVariants}
              className="mb-6 text-2xl font-medium"
            >
              Send a Message
            </motion.h3>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-8 grid gap-6 md:grid-cols-2">
                {/* Name */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-neutral-400">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 p-3 text-neutral-200 outline-none transition-colors focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50"
                    placeholder="Your name"
                  />
                </motion.div>
                
                {/* Email */}
                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-neutral-400">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 p-3 text-neutral-200 outline-none transition-colors focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50"
                    placeholder="youremail@example.com"
                  />
                </motion.div>
              </div>
              
              {/* Subject */}
              <motion.div variants={itemVariants} className="mb-6">
                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-neutral-400">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 p-3 text-neutral-200 outline-none transition-colors focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50"
                  placeholder="Project Discussion"
                />
              </motion.div>
              
              {/* Message */}
              <motion.div variants={itemVariants} className="mb-8">
                <label htmlFor="message" className="mb-2 block text-sm font-medium text-neutral-400">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-800/50 p-3 text-neutral-200 outline-none transition-colors focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50"
                  placeholder="I'd like to discuss a potential project..."
                ></textarea>
              </motion.div>
              
              {/* Submit Button */}
              <motion.div variants={itemVariants} className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting || submitSuccess}
                  className={`inline-flex items-center justify-center rounded-full px-8 py-3 font-medium text-white shadow-lg transition-all ${
                    submitSuccess
                      ? "bg-green-600"
                      : "bg-gradient-to-r from-orange-500 to-sky-500 hover:from-orange-600 hover:to-sky-600"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="mr-2 h-5 w-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : submitSuccess ? (
                    <>
                      <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <HiOutlinePaperAirplane className="mr-2 h-5 w-5 rotate-45" />
                      Send Message
                    </>
                  )}
                </button>
              </motion.div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;