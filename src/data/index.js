// ===================================================
//  src/data/index.js  —  All portfolio content
//  Extracted from constants + components
// ===================================================

// ─── HERO ──────────────────────────────────────────
export const HERO_CONTENT =
  `I'm a passionate, reliable, and industrious individual. My experience across various projects has honed my adaptability, making me a seasoned team player. I thrive in collaborative settings and am equally adept at taking initiative.`;

export const TYPEWRITER_WORDS = [
  "Full Stack Developer",
  "Backend Engineer",
  "MERN Specialist",
  "Problem Solver",
  "Creative Thinker",
];

// ─── ABOUT ──────────────────────────────────────────
export const ABOUT_TEXT =
  `I'm a full-stack developer specialising in React, Next.js, and Node.js, with strong experience in building scalable applications, secure APIs, and performant user interfaces. My work spans API engineering, authentication systems, real-time communication, and end-to-end feature development.

Through my roles at Nextesport, as a freelance software engineer, and during my MERN/Next.js architecture internship at Job In Tech — ARK'X, I've delivered reliable systems, optimised backend performance, improved security, and built user-centred booking, messaging, and consultation platforms.

My skill set covers modern frontend frameworks, backend development, databases, DevOps practices, and cloud services, enabling me to contribute across the full development lifecycle.`;

export const ABOUT_HIGHLIGHTS = [
  "End-to-end feature development across web and mobile platforms.",
  "API engineering and authentication pipelines (JWT, Firebase OTP, bcrypt).",
  "Real-time communication with WebSockets and WebRTC.",
  "Performance optimisation and backend reliability improvements.",
  "Collaboration with product and engineering teams in agile environments.",
];

export const SKILL_BARS = [
  { name: "Frontend", level: 90 },
  { name: "Backend",  level: 85 },
  { name: "UX / UI Design", level: 80 },
  { name: "Mobile Dev",     level: 75 },
];

// ─── NAVIGATION ────────────────────────────────────
export const NAV_LINKS = [
  { name: "Home",         href: "#"            },
  { name: "About",        href: "#about"        },
  { name: "Tech",         href: "#tech"         },
  { name: "Experience",   href: "#experience"   },
  { name: "Projects",     href: "#projects"     },
  { name: "Certificates", href: "#certificates" },
  { name: "Contact",      href: "#contact"      },
];

// ─── SOCIAL LINKS ──────────────────────────────────
export const SOCIAL_LINKS = [
  { name: "LinkedIn",  href: "https://www.linkedin.com/in/ilias-radouche" },
  { name: "GitHub",    href: "https://github.com/iliasradouche"           },
  { name: "Twitter",   href: "https://twitter.com/Radoucheilias"          },
  { name: "Instagram", href: "https://www.instagram.com/radouche__"       },
];

// ─── CONTACT ────────────────────────────────────────
export const CONTACT = {
  address: "Rabat, Morocco",
  phone:   "+212 7 08 76 80 70",
  email:   "iliasradouche2@gmail.com",
};

// ─── EXPERIENCE ─────────────────────────────────────
export const EXPERIENCES = [
  {
    year:        "2025",
    role:        "Full-Stack Developer (Web & Mobile)",
    company:     "Nextesport",
    logo:        "/companies/nextesport.png",
    location:    "Casablanca, Morocco",
    description: "Engineered REST APIs that improved backend response times by 35%, strengthened endpoint reliability, enhanced security mechanisms, and integrated payment workflows serving over 1,500 monthly users.",
    technologies: ["React", "Next.js", "Node.js", "Express", "MongoDB", "PostgreSQL"],
  },
  {
    year:        "2024 — 2025",
    role:        "Software Engineer (Full-Stack)",
    company:     "Freelance",
    logo:        "/companies/fiver.png",
    location:    "Worldwide",
    description: "Architected a SaaS platform processing 10,000+ monthly requests with 99.9% uptime, implemented real-time communication using WebRTC and Socket.IO (<100 ms latency), and designed secure authentication pipelines (Firebase OTP, JWT, bcrypt).",
    technologies: ["Next.js", "React", "Node.js", "Socket.IO", "WebRTC", "PostgreSQL", "Firebase"],
  },
  {
    year:        "2024",
    role:        "MERN / Next.js Architecture Intern",
    company:     "Job In Tech — ARK'X Academy",
    logo:        "/companies/Arkx.png",
    location:    "Rabat, Morocco",
    description: "Structured MERN and Next.js feature modules that accelerated frontend load time by 22%, produced high-fidelity product prototypes, and supported UI/UX evaluations improving task completion accuracy by 18%.",
    technologies: ["React", "Next.js", "Node.js", "Express", "MongoDB", "TailwindCSS", "Figma"],
  },
  {
    year:        "2022",
    role:        "Front-End Developer Intern",
    company:     "MarocArchi",
    location:    "Rabat, Morocco",
    description: "Developed an invoice-management interface that reduced internal processing steps by 40% and built optimised, responsive UI components used daily by more than 50 employees.",
    technologies: ["React", "HTML", "CSS", "JavaScript"],
  },
  {
    year:        "2018",
    role:        "IT Development Technician Intern",
    company:     "Prefecture of Rabat",
    location:    "Rabat, Morocco",
    description: "Contributed to an archive management system that improved document retrieval speed by 50% and assisted in backend logic implementation and data structuring tasks.",
    technologies: ["Java", "MySQL"],
  },
];

// ─── TECHNOLOGIES ───────────────────────────────────
export const TECH_CATEGORIES = [
  { id: "frontend", label: "Frontend"  },
  { id: "backend",  label: "Backend"   },
  { id: "design",   label: "Design"    },
  { id: "tools",    label: "Tools"     },
];

export const TECHNOLOGIES = [
  // Frontend
  { id: "react",      name: "React",       category: "frontend", proficiency: 95, description: "Component-based UI library"       },
  { id: "next",       name: "Next.js",     category: "frontend", proficiency: 90, description: "React framework for production"   },
  { id: "javascript", name: "JavaScript",  category: "frontend", proficiency: 95, description: "Core web programming language"    },
  { id: "typescript", name: "TypeScript",  category: "frontend", proficiency: 85, description: "Typed JavaScript superset"        },
  { id: "html",       name: "HTML5",       category: "frontend", proficiency: 98, description: "Web markup language"              },
  { id: "css",        name: "CSS3",        category: "frontend", proficiency: 92, description: "Web styling language"             },
  { id: "tailwind",   name: "TailwindCSS", category: "frontend", proficiency: 95, description: "Utility-first CSS framework"      },
  { id: "zustand",    name: "Zustand",     category: "frontend", proficiency: 80, description: "Lightweight state management"     },
  { id: "vue",        name: "Vue.js",      category: "frontend", proficiency: 70, description: "Progressive JavaScript framework"  },
  { id: "angular",    name: "Angular",     category: "frontend", proficiency: 65, description: "TypeScript-based framework"       },
  { id: "redux",      name: "Redux",       category: "frontend", proficiency: 85, description: "State management library"       },

  // Backend
  { id: "node",       name: "Node.js",     category: "backend",  proficiency: 90, description: "JavaScript runtime"              },
  { id: "express",    name: "Express",     category: "backend",  proficiency: 88, description: "Minimal web framework"           },
  { id: "nestjs",     name: "NestJS",      category: "backend",  proficiency: 75, description: "Progressive Node.js framework"   },
  { id: "websockets", name: "WebSockets",  category: "backend",  proficiency: 85, description: "Real-time communication"         },
  { id: "webrtc",     name: "WebRTC",      category: "backend",  proficiency: 80, description: "Audio/video communication"       },
  { id: "mongodb",    name: "MongoDB",     category: "backend",  proficiency: 85, description: "NoSQL document database"         },
  { id: "postgresql", name: "PostgreSQL",  category: "backend",  proficiency: 80, description: "Relational SQL database"         },
  { id: "supabase",   name: "Supabase",    category: "backend",  proficiency: 80, description: "PostgreSQL-based backend"        },
  { id: "firebase",   name: "Firebase",    category: "backend",  proficiency: 82, description: "Auth, DB & serverless tools"     },
  { id: "docker",     name: "Docker",      category: "backend",  proficiency: 80, description: "Containerisation platform"       },
  { id: "python",     name: "Python/Django",category: "backend", proficiency: 70, description: "Backend with Django REST"        },
  { id: "sanity",     name: "Sanity.io",   category: "backend",  proficiency: 75, description: "Headless CMS"                    },
  // Design
  { id: "figma",      name: "Figma",       category: "design",   proficiency: 90, description: "Collaborative design tool"       },
  { id: "sass",       name: "Sass/SCSS",   category: "design",   proficiency: 85, description: "CSS preprocessor"               },
  { id: "tailwindcss",name: "TailwindCSS", category: "design",   proficiency: 95, description: "Utility-first CSS framework"      },
  { id: "framer",     name: "Framer Motion", category: "design",   proficiency: 85, description: "Animation library"                },
  // Tools
  { id: "github",     name: "GitHub",      category: "tools",    proficiency: 92, description: "Version control hosting"         },
  { id: "vscode",     name: "VS Code",     category: "tools",    proficiency: 95, description: "Code editor"                    },
  { id: "gh_actions", name: "GitHub Actions", category: "tools", proficiency: 85, description: "CI/CD automation"               },
  { id: "linux",      name: "Linux",       category: "tools",    proficiency: 80, description: "Operating system & CLI"          },
  { id: "aws",        name: "AWS",         category: "tools",    proficiency: 70, description: "Cloud computing platform"        },
  { id: "gcp",        name: "GCP",         category: "tools",    proficiency: 65, description: "Google Cloud Platform"           },
  { id: "vercel",     name: "Vercel",      category: "tools",    proficiency: 90, description: "Deployment platform"             },
  { id: "netlify",    name: "Netlify",     category: "tools",    proficiency: 85, description: "Deployment platform"             },
  { id: "plesk",      name: "Plesk",       category: "tools",    proficiency: 85, description: "Web hosting control panel"       },
 

];

// ─── PROJECTS ───────────────────────────────────────
import project1  from "../assets/projects/project-1.png";
import project2  from "../assets/projects/project-2.png";
import project3  from "../assets/projects/project-3.png";
import project4  from "../assets/projects/project-4.png";
import medsafe   from "../assets/projects/medsafe.png";
import medsafe2  from "../assets/projects/medsafe1.png";
import secret    from "../assets/projects/secret.png";
import gym1      from "../assets/projects/gym1.png";
import gym2      from "../assets/projects/gym2.png";
import jobtrack  from "../assets/projects/jobtrack.png";
import jobtrack2 from "../assets/projects/jobtrack2.png";
import marbreHero from "../assets/projects/marbreco/Hero.png";
import marbreColl from "../assets/projects/marbreco/collections.png";
import marbreContact from "../assets/projects/marbreco/Contact.png";
import beztamiLogin from "../assets/projects/beztami/loginpage.png";
import beztamiDash from "../assets/projects/beztami/dashboard.png";
import beztamiTrans from "../assets/projects/beztami/transactions.png";
import beztamiDashMob from "../assets/projects/beztami/dashboard_mobile.png";
import axonHero from "../assets/projects/axon-next/hero.png";
import axonProj from "../assets/projects/axon-next/projects.png";
import axonServ from "../assets/projects/axon-next/services.png";
import alx from "../assets/logos/alx_morocco.png";
export const PROJECTS = [
  {
    id: 13,
    title:       "Axon Studio - Digital Agency",
    year:        "2024",
    image:       axonHero,
    images:      [axonHero, axonProj, axonServ],
    description: "Premium digital agency platform focusing on high-end product engineering, AI-integration, and branding.",
    challenge:   "Building a high-performance, SEO-optimized agency site with full internationalization (EN/FR/AR) and MDX-based content management.",
    solution:    "Architected with Next.js 14 App Router and next-intl for localized routing. Used Framer Motion for premium animations and gray-matter for local MDX parsing.",
    stats:       ["Next.js 14 App Router", "i18n (EN/FR/AR)", "MDX-Driven CMS"],
    technologies: ["Next.js", "TypeScript", "Framer Motion", "TailwindCSS", "next-intl"],
    category:    "fullstack",
    featured:    true,
    liveLink:    null,
    codeLink:    null,
  },
  {
    id: 12,
    title:       "Beztami - Budget Planner",
    year:        "2023",
    image:       beztamiDash,
    images:      [beztamiDash, beztamiDashMob, beztamiTrans, beztamiLogin],
    description: "Mobile-first Progressive Web App (PWA) focusing on intuitive personal finance tracking and budgeting.",
    challenge:   "Designing a truly app-like experience on the web that feels native, handles offline states gracefully, and allows for rapid expense logging.",
    solution:    "Leveraged PWA technologies including service workers for offline resilience and a optimized mobile-first UI with instantaneous state updates.",
    stats:       ["PWA Ready", "Offline Access", "90+ Lighthouse Score"],
    technologies: ["React", "PWA", "Supabase", "TailwindCSS"],
    category:    "fullstack",
    featured:    true,
    liveLink:    null,
    codeLink:    null,
  },
  {
    id: 11,
    title:       "MarbreCo - Luxury Stone",
    year:        "2024",
    image:       marbreHero,
    images:      [marbreHero, marbreColl, marbreContact],
    description: "Premium architectural luxury website for a high-end marble and stone company focusing on visual storytelling.",
    challenge:   "Conveying the tactile and premium nature of luxury stone digitally while managing heavy visual assets for seamless performance.",
    solution:    "Implemented a refined minimalist design with immersive scroll animations and high-performance image optimization to mirror the quality of the marble products.",
    stats:       ["Architectural UX", "Motion-First UI", "High Performance"],
    technologies: ["React", "TailwindCSS", "Framer Motion", "Vite","Supabase","Sanity.io"],
    category:    "frontend",
    featured:    true,
    liveLink:    null,
    codeLink:    null,
  },
  {
    id: 5,
    title:       "Med-Safe",
    year:        "2024",
    image:       medsafe2,
    images:      [medsafe, medsafe2],
    description: "Medication management platform supporting prescription tracking and ensuring safe, consistent dosage adherence.",
    challenge:   "Users often struggle with complex medication schedules and Forget the dosage timing, leading to potential health risks.",
    solution:    "Developed a robust notification engine and a simplified pharmaceutical dashboard that centralizes all dosage information into a single unified interface.",
    stats:       ["1.5k+ Users", "99% Reliability", "35% Fast Load"],
    technologies: ["React", "Next.js", "Node.js", "MongoDB"],
    category:    "fullstack",
    featured:    true,
    liveLink:    "https://medsafe-dr.netlify.app/",
    codeLink:    "https://github.com/iliasradouche/MedSafe",
  },
  {
    id: 7,
    title:       "Veterinary SaaS Platform",
    year:        "2024",
    image:       secret,
    images:      [secret],
    description: "Full SaaS solution for veterinary clinics including online booking, client management, and video consultations.",
    challenge:   "Traditional clinics lack digital infrastructure for real-time video triage and secure pet records management.",
    solution:    "Integrated WebRTC for zero-latency video calls and a scalable MongoDB schema to handle thousands of unique pet health records.",
    stats:       ["Real-time Video", "Multi-clinic Support", "HIPAA Compliant"],
    technologies: ["Next.js", "Node.js", "WebRTC", "Socket.IO", "MongoDB"],
    category:    "fullstack",
    featured:    true,
    liveLink:    null,
    codeLink:    null,
  },
  {
    id: 10,
    title:       "Job Tracking App",
    year:        "2024",
    image:       jobtrack,
    images:      [jobtrack, jobtrack2],
    description: "Job tracking application for job seekers to manage their applications, track interviews, and stay organised.",
    challenge:   "Managing dozens of different job portals and interview statuses often leads to missed opportunities and disorganized follow-ups.",
    solution:    "Built a kanban-style application tracker with authentication and automated deadline reminders.",
    stats:       ["Auth with Clerk", "Kanban Layout", "Responsive"],
    technologies: ["React", "Node.js", "Clerk"],
    category:    "fullstack",
    featured:    true,
    liveLink:    "https://jobtrackingapplication.netlify.app/",
    codeLink:    null,
  },
  {
    id: 6,
    title:       "MovieRec",
    year:        "2023",
    image:       secret,
    images:      [secret],
    description: "Movie recommendation engine combining a Python API with a React UI for personalised recommendations.",
    challenge:   "Sifting through thousands of titles to find relevant content is time-consuming and often inaccurate.",
    solution:    "Implemented a content-filtering algorithm on a Python (Django REST) backend that processes user preferences against a massive IMDB-synced database.",
    stats:       ["Python Backend", "Fast Search", "Restful API"],
    technologies: ["Python", "Django REST", "React", "PostgreSQL"],
    category:    "fullstack",
    featured:    false,
    liveLink:    "https://project-nexus-alx.netlify.app",
    codeLink:    "https://github.com/iliasradouche/alx-project-nexus",
  },
  {
    id: 8,
    title:       "Ai-Calorie",
    year:        "2023",
    image:       secret,
    images:      [secret],
    description: "Calorie estimation mobile app using the ChatGPT API for real-time food recognition and nutritional analysis.",
    challenge:   "Manual calorie tracking is tedious and prone to user error.",
    solution:    "Leveraged GPT-4 Vision API to identify food items from photos and provide instant nutritional breakdowns.",
    stats:       ["AI-Powered", "Mobile Native", "Real-time"],
    technologies: ["React Native", "Node.js", "ChatGPT API"],
    category:    "fullstack",
    featured:    false,
    liveLink:    null,
    codeLink:    null,
  },
  {
    id: 9,
    title:       "Gym Landing Page",
    year:        "2022",
    image:       gym1,
    images:      [gym1, gym2],
    description: "Modern, responsive landing page for a fitness gym featuring class schedules, trainer profiles, and membership sign-up.",
    technologies: ["React", "Node.js"],
    category:    "frontend",
    featured:    false,
    liveLink:    "https://newgymdesign.netlify.app/",
    codeLink:    null,
  },
  {
    id: 1,
    title:       "Digital Solutions Landing Page",
    year:        "2022",
    image:       project1,
    images:      [project1],
    description: "A fully functional landing page for a company called Digital Solution.",
    technologies: ["HTML", "CSS", "JavaScript"],
    category:    "frontend",
    featured:    false,
    liveLink:    "https://digital-solutions-test.netlify.app/",
    codeLink:    "https://github.com/iliasradouche/P.DigitalSolutions",
  },
  {
    id: 3,
    title:       "EcoSerenity",
    year:        "2021",
    image:       project3,
    images:      [project3],
    description: "Landing page for an interior design architecture firm called EcoSerenity.",
    technologies: ["HTML", "TailwindCSS", "JavaScript"],
    category:    "frontend",
    featured:    false,
    liveLink:    "https://eco-serenity.netlify.app/",
    codeLink:    "https://github.com/iliasradouche/Eco-Serenity",
  },
  {
    id: 4,
    title:       "FootChat",
    year:        "2021",
    image:       project4,
    images:      [project4],
    description: "A chat app for football players to connect with others who want to play football with strangers.",
    technologies: ["HTML", "CSS", "JavaScript", "Express", "MongoDB", "Socket.IO"],
    category:    "frontend",
    featured:    false,
    liveLink:    null,
    codeLink:    null,
  },
  {
    id: 2,
    title:       "Mobile Banking UI/UX",
    year:        "2021",
    image:       project2,
    images:      [project2],
    description: "Effortless banking in your pocket: intuitive design, instant transfers, and secure transactions with a fresh, clean look.",
    technologies: ["Figma", "Miro"],
    category:    "design",
    featured:    false,
    liveLink:    null,
    codeLink:    null,
  },
];

export const PROJECT_CATEGORIES = [
  { id: "all",       name: "All"       },
  { id: "fullstack", name: "Full Stack" },
  { id: "frontend",  name: "Frontend"  },
  { id: "design",    name: "Design"    },
];

// ─── CERTIFICATES ────────────────────────────────────
export const CERTIFICATES = [
  {
    id:          1,
    title:       "ALX Software Engineering Program — Backend Pro-Dev",
    issuer:      "ALX Africa",
    date:        "2025",
    image:       alx,
    description: "Backend engineering program focused on building scalable systems, APIs, and production-grade backend services.",
  },
  {
    id:          2,
    title:       "Professional Development Competency Program",
    issuer:      "ALX Africa",
    date:        "2025",
    image:       alx,
    description: "Competency program centred on professional skills, productivity, leadership, and workplace effectiveness.",
  },
  {
    id:          3,
    title:       "Full-Stack MERN Development Training",
    issuer:      "Job In Tech — ARK'X",
    date:        "2024",
    image:       "/companies/Arkx.png",
    description: "Full-stack MERN and Next.js training with hands-on architectural work, feature planning, UI/UX, and project delivery.",
  },
];
