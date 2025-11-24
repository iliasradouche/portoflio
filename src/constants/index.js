import project1 from "../assets/projects/project-1.png";
import project2 from "../assets/projects/project-2.png";
import project3 from "../assets/projects/project-3.png";
import project4 from "../assets/projects/project-4.png";
import medsafe from "../assets/projects/medsafe.png"
import medsafe2 from "../assets/projects/medsafe1.png"
import secret from "../assets/projects/secret.png"
import gym1 from "../assets/projects/gym1.png"
import gym2 from "../assets/projects/gym2.png"



export const HERO_CONTENT = `I'm a passionate, reliable, and industrious individual. My experience across various projects has honed my adaptability, making me a seasoned team player. I thrive in collaborative settings and am equally adept at taking initiative.`;

export const ABOUT_TEXT = `I'm a full-stack developer specializing in React, Next.js, and Node.js, with strong experience in building scalable applications, secure APIs, and performant user interfaces. My work spans API engineering, authentication systems, real-time communication, and end-to-end feature development.

Through my roles at Nextesport, as a freelance software engineer, and during my MERN/Next.js architecture internship at Job In Tech — ARK'X, I’ve delivered reliable systems, optimized backend performance, improved security, and built user-centered booking, messaging, and consultation platforms. I enjoy solving complex technical problems, improving system behavior, and collaborating with product and engineering teams to ship maintainable, high-quality solutions.

My skill set covers modern frontend frameworks, backend development, databases, DevOps practices, and cloud services, enabling me to contribute across the full development lifecycle. I’m driven by clean engineering practices, scalability, and building products that deliver real value to users.`;


export const EXPERIENCES = [
  {
    year: "2025",
    role: "Full-Stack Developer (Web & Mobile)",
    company: "Nextesport — Casablanca, Morocco",
    description: `Engineered REST APIs that improved backend response times by 35%, strengthened endpoint reliability, enhanced security mechanisms, and integrated payment workflows serving over 1,500 monthly users.`,
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "MongoDB",
      "PostgreSQL"
    ],
  },
  {
    year: "2024 — 2025",
    role: "Software Engineer (Full-Stack)",
    company: "Freelance — Rabat, Morocco",
    description: `Architected a SaaS platform processing 10,000+ monthly requests with 99.9% uptime, implemented real-time communication using WebRTC and Socket.IO (<100ms latency), and designed secure authentication pipelines (Firebase OTP, JWT, bcrypt).`,
    technologies: [
      "Next.js",
      "React",
      "Node.js",
      "Socket.IO",
      "WebRTC",
      "PostgreSQL",
      "Firebase"
    ],
  },
  {
    year: "2024",
    role: "MERN / Next.js Architecture Intern",
    company: "Job In Tech — ARK'X Academy",
    description: `Structured MERN and Next.js feature modules that accelerated frontend load time by 22%, produced high-fidelity product prototypes, and supported UI/UX evaluations improving task completion accuracy by 18%.`,
    technologies: [
      "React",
      "Next.js",
      "Node.js",
      "Express",
      "MongoDB",
      "TailwindCSS",
      "Figma"
    ],
  },
  {
    year: "2022",
    role: "Front-End Developer Intern",
    company: "MarocArchi — Rabat, Morocco",
    description: `Developed an invoice-management interface that reduced internal processing steps by 40% and built optimized, responsive UI components used daily by more than 50 employees.`,
    technologies: ["React", "HTML", "CSS", "JavaScript"],
  },
  {
    year: "2018",
    role: "IT Development Technician Intern",
    company: "Prefecture of Rabat — Rabat, Morocco",
    description: `Contributed to an archive management system that improved document retrieval speed by 50% and assisted in backend logic implementation and data structuring tasks.`,
    technologies: ["Java", "MySQL"],
  }
];

export const CERTIFICATES = [
  {
    id: 1,
    title: "ALX Software Engineering Program — Backend Pro-Dev",
    issuer: "ALX Africa",
    date: "2025",
    image: "",
    description: "Backend engineering program focused on building scalable systems, APIs, and production-grade backend services."
  },
  {
    id: 2,
    title: "Professional Development Competency Program",
    issuer: "ALX Africa",
    date: "2025",
    image: "",
    description: "Competency program centered on professional skills, productivity, leadership, and workplace effectiveness."
  },
  {
    id: 3,
    title: "Full-Stack MERN Development Training",
    issuer: "Job In Tech — ARK'X",
    date: "2024",
    image: "",
    description: "Full-stack MERN and Next.js training with hands-on architectural work, feature planning, UI/UX, and project delivery."
  },
];


export const PROJECTS = [
  // OLD PROJECTS
  {
    id: 1,
    title: "Landing Page",
    image: project1,
    images: [project1],
    description:
      "A fully functional landing page for a company called Digital Solution.",
    technologies: ["HTML", "CSS", "JavaScript"],
    category: "frontend",
    featured: true,
    liveLink: "https://digital-solutions-test.netlify.app/",
    codeLink: "https://github.com/iliasradouche/P.DigitalSolutions",
  },
  {
    id: 2,
    title: "Mobile Banking App UI/UX Design",
    image: project2,
    images: [project2],
    description:
      "Effortless banking in your pocket: intuitive design, instant transfers, and secure transactions with a fresh, clean look.",
    technologies: ["Figma", "Miro"],
    category: "design",
    liveLink: null,
    codeLink: null,
  },
  {
    id: 3,
    title: "EcoSerinity",
    image: project3,
    images: [project3],
    description:
      "Landing Page for an Architect company for interior design called EcoSerenity",
    technologies: ["HTML", "Tailwind CSS", "JavaScript"],
    category: "frontend",
    liveLink: "https://eco-serenity.netlify.app/",
    codeLink: "https://github.com/iliasradouche/Eco-Serenity",
  },
  {
    id: 4,
    title: "Chat App (FOOTCHAT)",
    image: project4,
    images: [project4],
    description:
      "A chat app for football players to connect with others who want to play football with strangers.",
    technologies: ["HTML", "CSS", "JavaScript", "Express", "MongoDB", "Socket"],
    category: "frontend",
    featured: true,
    liveLink: null,
    codeLink: null,
  },

  // NEW PROJECTS FROM CV
  {
    id: 5,
    title: "Med-Safe",
    image: medsafe2,
    images: [medsafe, medsafe2],
    description:
      "Medication management platform supporting prescription tracking and ensuring safe, consistent dosage adherence.",
    technologies: ["React", "Next.js", "Node.js", "MongoDB"],
    category: "fullstack",
    featured: true,
    liveLink: "https://medsafe-dr.netlify.app/",
    codeLink: "https://github.com/iliasradouche/MedSafe",
  },
  {
    id: 6,
    title: "MovieRec",
    image: secret,
    images: [secret],
    description:
      "Movie recommendation engine combining a Python API with a React UI for personalized recommendations.",
    technologies: ["Python", "Django REST", "React", "PostgreSQL"],
    category: "fullstack",
    liveLink: "project-nexus-alx.netlify.app",
    codeLink: "https://github.com/iliasradouche/alx-project-nexus",
  },
  {
    id: 7,
    title: "Veterinary SaaS Platform",
    image: secret,
    images: [secret],
    description:
      "Full SaaS solution for veterinary clinics including online booking, client management, and video consultations.",
    technologies: ["Next.js", "Node.js", "WebRTC", "Socket.IO", "MongoDB"],
    category: "fullstack",
    featured: true,
    liveLink: null,
    codeLink: null,
  },
  {
    id: 8,
    title: "Ai-Calorie",
    image: secret,
    images: [secret],
    description:
      "Calorie estimation mobile app using ChatGPT API for real-time food recognition and nutritional analysis.",
    technologies: ["React Native", "Node.js", "ChatGPT API"],
    category: "fullstack",
    liveLink: null,
    codeLink: null,
  },
  {
    id: 9,
    title: "Gym Landing page",
    image: gym1,
    images: [gym1, gym2],
    description:
      "Modern, responsive landing page for a fitness gym featuring class schedules, trainer profiles, and membership sign-up.",
    technologies: ["React", "Node.js"],
    category: "frontend",
    liveLink: "https://newgymdesign.netlify.app/",
    codeLink: null,
  },
];


export const CONTACT = 
  {
    address: "Rabat, Morocco",
    phone: "+212 7 08 76 80 70",
    email: "iliasradouche2@gmail.com",
  }
