import project1 from "../assets/projects/project-1.png";
import project2 from "../assets/projects/project-2.png";
import project3 from "../assets/projects/project-3.png";
import project4 from "../assets/projects/project-4.png";

export const HERO_CONTENT = `I'm a passionate, reliable, and industrious individual. My experience across various projects has honed my adaptability, making me a seasoned team player. I thrive in collaborative settings and am equally adept at taking initiative.`;

export const ABOUT_TEXT = `As a dedicated and versatile full stack MERN developer based in Rabat, my journey in web development is fueled by a passion for creating efficient and user-friendly applications. At 27, I'm not only enriching my skills through an internship at Arkx Academy but also pursuing a Master's degree in Software Engineering. With expertise in ReactJS, MongoDB, Node.js, and Express.js, my professional path has been marked by a continuous quest for learning and adapting to new technologies. I thrive in collaborative settings, where solving complex issues to deliver superior solutions is part of my daily routine. Beyond coding, I engage in staying active, exploring new technologies, and contributing to open-source projects.`;

export const EXPERIENCES = [
  {
    year: "2024",
    role: "Full Stack MERN Developer",
    company: "ARK'X Academy",
    description: `Completed 4-month MERN stack Internship, In this role, I learned both technical skills and how to advance in my career through mentorship.`,
    technologies: [
      "React JS",
      "TailwindCSS",
      "MongoDB",
      "Node JS",
      "Express JS",
    ],
  },
  {
    year: "2022",
    role: "Front-End Developer Intern",
    company: "MarocArchi",
    description: `Developed Front-End for a web application for User management with capabilities of generating invoices for clients.`,
    technologies: ["HTML", "CSS", "React.js"],
  },
  {
    year: "2020-2021",
    role: "Dropshipper",
    company: "Freelancer",
    description: `Selling products for customers online on E-bay, Amazon, creating Facebook ADS, Google ADS.`,
    technologies: ["Ecomhunt", "Dropship.io", "AutoDS"],
  },
  {
    year: "2019-2020",
    role: "Fiverr, Upwork",
    company: "Freelancer",
    description: `Seasoned Fiverr designer specializing in logos, flyers, and brochures with a year of creative excellence.`,
    technologies: ["Canva", "Figma"],
  },
];

export const PROJECTS = [
  {
    id: 1,
    title: "Landing Page",
    image: project1,
    description:
      "A fully functional landing page for a company called Digital Solution.",
    technologies: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: 2,
    title: "Mobile Banking App UI/UX Design",
    image: project2,
    description:
      "Effortless banking in your pocket: intuitive design, instant transfers, and secure transactions with a fresh, clean look.",
    technologies: ["Figma", "Miro"],
  },
  {
    id: 3,
    title: "Landing Page",
    image: project3,
    description:
      "Landing Page for an Architect company for interior design called EcoSerenity",
    technologies: ["HTML", "Tailwind CSS", "JavaScript"],
  },
  {
    id: 4,
    title: "Chat App",
    image: project4,
    description:
      "A chat app named FOOTCHAT for players who want to play football with strangers, using the app to contact others who have the same objective",
    technologies: ["HTML", "CSS", "JavaScript", "Express", "MongoDB", "Socket"],
  },
];

export const CONTACT = 
  {
    address: "Rabat, Morocco",
    phone: "+212 7 08 76 80 70",
    email: "iliasradouche2@gmail.com",
  }