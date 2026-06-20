export const portfolioData = {
  site: {
    logoInitial: "K.",
    logoName: "Kushal",
    logoHighlight: "Poudel",
    footerCopyright: "Copyright 2026 Kushal Poudel. All rights reserved.",
    footerCredit: "Built with React and Tailwind CSS",
  },

  navItems: [
    { id: "home", label: "Home", href: "#home" },
    { id: "about", label: "About", href: "#about" },
    { id: "skills", label: "Skills", href: "#skills" },
    { id: "projects", label: "Projects", href: "#projects" },
    { id: "blogs", label: "Blogs", href: "#blogs" },
    { id: "experience", label: "Experience", href: "#experience" },
    { id: "contact", label: "Contact", href: "#contact" },
  ],

  profile: {
    name: "Kushal Poudel",
    role: "Backend Java Developer | Full-stack Laravel Developer",
    location: "Sinamangal, Kathmandu",
    email: "kushalpoudel240@gmail.com",
    phone: "9863614263 / 9824055306",
    image: "/images/pic3.png",
    imageFallback:
      "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=900&q=80",
    cv: "/Kushal_Poudel_CV.pdf",
    cvFileName: "Kushal_Poudel_CV.pdf",
    github: "https://github.com/The-Kushal-Poudel",
    linkedin: "https://www.linkedin.com/in/kushal-poudel-317b25241/",
    availability: "Available for work",
  },

  hero: {
    title: "I build clean, fast and meaningful digital experiences.",
    description:
      "BCA graduate focused on Laravel applications, backend systems, and modern full-stack web experiences using Java, PHP, SQL, React, and Tailwind CSS.",
    primaryButton: "Download CV",
    secondaryButton: "View Projects",
    secondaryLink: "#projects",
    chips: [
      { id: "laravel", label: "Laravel", className: "left-2 top-8 z-20", delay: 0.7 },
      { id: "react", label: "React", className: "right-4 top-24 z-20 hidden sm:block", delay: 1.1 },
      { id: "java", label: "Java", className: "bottom-36 right-12 z-20 hidden sm:block", delay: 1.45 },
    ],
  },

  about: {
    label: "About Me",
    title: "Turning ideas into functional and beautiful web applications.",
    description:
      "I am a BCA graduate and backend-focused developer from Kathmandu. I enjoy building clean, dynamic, and useful web applications with Laravel, PHP, SQL, React, and Tailwind CSS. I am also exploring Java, Spring, and backend development concepts to grow as a stronger full-stack developer.",
    signature: "Kushal",
    cards: [
      {
        id: "clean-code",
        title: "Clean Code",
        icon: "Code",
        text: "Writing maintainable and scalable code with simple structure and best practices.",
      },
      {
        id: "strong-backend",
        title: "Strong Backend",
        icon: "Database",
        text: "Building robust APIs, dashboards, and backend systems using Laravel, PHP, and Java.",
      },
      {
        id: "responsive-ui",
        title: "Responsive UI",
        icon: "Monitor",
        text: "Creating clean, modern, and mobile-friendly interfaces using React and Tailwind CSS.",
      },
      {
        id: "always-learning",
        title: "Always Learning",
        icon: "Rocket",
        text: "Exploring new technologies and improving through practical real-world projects.",
      },
    ],
  },

  techStack: {
    label: "Technologies I Work With",
    items: [
      { id: "laravel", label: "Laravel" },
      { id: "php", label: "PHP" },
      { id: "mysql", label: "MySQL" },
      { id: "react", label: "React" },
      { id: "tailwind-css", label: "Tailwind CSS" },
      { id: "git", label: "Git" },
      { id: "java", label: "Java" },
      { id: "spring", label: "Spring" },
      { id: "postgresql", label: "PostgreSQL" },
    ],
  },

  projectsSection: {
    label: "Featured Projects",
    title: "Some things I have built.",
    ctaText: "Contact Me",
    ctaLink: "#contact",
    items: [
      {
        id: "news-portal",
        slug: "news-portal",
        title: "News Portal",
        description:
          "User and admin based news portal website with dashboard, category management, and role based access.",
        techStack: ["Laravel", "SQL", "Tailwind CSS"],
        role: "Backend and admin dashboard development",
        features: ["Role based admin access", "Category and news management", "Responsive public news pages"],
        githubLink: null,
        liveLink: null,
        image:
          "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=900&q=80",
        imageAlt: "Newspapers and digital news project preview",
      },
      {
        id: "sayumi-travels",
        slug: "sayumi-travels-and-tours",
        title: "Sayumi Travels and Tours",
        description:
          "Travel and tours website with dynamic packages, destinations, booking forms, and admin management features.",
        techStack: ["Laravel", "SQL", "Tailwind CSS", "Git"],
        role: "Full-stack Laravel development",
        features: ["Dynamic package management", "Destination pages", "Booking inquiry workflow"],
        githubLink: null,
        liveLink: "https://sayumiglobal.com/",
        image:
          "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
        imageAlt: "Travel destination landscape for Sayumi Travels and Tours",
      },
      {
        id: "converttree",
        slug: "converttree",
        title: "ConvertTree",
        description:
          "All-in-one online tools platform for PDF, image, email, video, and daily utility tools.",
        techStack: ["Laravel", "SQL", "Tailwind CSS"],
        role: "Backend architecture and tool workflows",
        features: ["Utility tool modules", "Clean dashboard structure", "Launch-ready product pages"],
        githubLink: null,
        liveLink: "https://www.converttree.com/",
        status: "Launching Soon",
        image:
          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
        imageAlt: "Laptop workspace representing ConvertTree online tools",
      },
    ],
  },

  blogsSection: {
    label: "Latest Blogs",
    title: "Thoughts, learning and development notes.",
    description:
      "I write about Laravel, React, backend development, project building, and my developer journey.",
    ctaText: "Suggest a Topic",
    ctaLink: "#contact",
    items: [
      {
        id: "portfolio-website",
        title: "How I Built My Portfolio Website",
        category: "React",
        date: "May 2026",
        description:
          "A simple explanation of how I created my developer portfolio using React, Tailwind CSS, and Framer Motion.",
        link: null,
      },
      {
        id: "backend-java-journey",
        title: "My Journey as a Backend Java Developer",
        category: "Career",
        date: "May 2026",
        description:
          "My learning journey, internship experience, and how I am growing as a backend developer.",
        link: null,
      },
      {
        id: "laravel-crud",
        title: "Laravel CRUD Project Explained",
        category: "Laravel",
        date: "May 2026",
        description:
          "A beginner-friendly explanation of CRUD, routing, controllers, models, migrations, and database flow in Laravel.",
        link: null,
      },
    ],
  },

  journeySection: {
    label: "My Journey",
    title: "Education and Experience",
    items: [
      {
        id: "fonenxt-internship",
        year: "January 7, 2024 - April 4, 2024",
        title: "Backend Java Developer Intern",
        company: "FoneNxt",
        icon: "Briefcase",
        text: "Worked as an intern and learned Java, PostgreSQL, use case flow, and backend development practices.",
      },
      {
        id: "bca-degree",
        year: "2020 - 2025",
        title: "Bachelor of Computer Application",
        company: "Patan Multiple Campus",
        icon: "GraduationCap",
        text: "Completed a bachelor's degree focused on programming, database systems, web development, and software engineering.",
      },
      {
        id: "laravel-projects",
        year: "Present",
        title: "Laravel and Web Development Projects",
        company: "Softsaron Pvt. Ltd. and Freelance",
        icon: "Laptop",
        text: "Built Laravel based dynamic websites with admin panels, responsive UI, database integration, and Git workflow.",
      },
    ],
  },

  faqSection: {
    label: "Frequently Asked Questions",
    title: "Got questions? I've got answers.",
    description:
      "Here are some of the most common things people ask me about my work, availability, and process.",
    items: [
      {
        id: "faq-availability",
        question: "Are you available for freelance or full-time work?",
        answer:
          "Yes! I am currently open to both freelance projects and full-time opportunities. Feel free to reach out through the contact section and let's discuss your project or job opening.",
      },
      {
        id: "faq-tech-stack",
        question: "What technologies do you specialize in?",
        answer:
          "I primarily work with Laravel, PHP, MySQL, and Tailwind CSS for backend and full-stack web development. I also have experience with React for frontend interfaces and Java with Spring for backend systems.",
      },
      {
        id: "faq-timeline",
        question: "How long does a typical project take?",
        answer:
          "It depends on the project scope and complexity. A simple website can take 1-2 weeks, while a full-featured web application with admin panel, authentication, and complex features may take 4-8 weeks or more.",
      },
      {
        id: "faq-process",
        question: "What is your development process?",
        answer:
          "I start by understanding the requirements and goals. Then I plan the architecture, build the backend logic, create the frontend interface, test thoroughly, and finally deploy. I maintain clear communication throughout the process.",
      },
      {
        id: "faq-collaboration",
        question: "Can you work with an existing team or codebase?",
        answer:
          "Absolutely. I am comfortable collaborating with teams using Git workflows, code reviews, and agile practices. I can also jump into existing codebases, understand the architecture, and contribute effectively.",
      },
      {
        id: "faq-support",
        question: "Do you provide support after project delivery?",
        answer:
          "Yes, I offer post-delivery support including bug fixes, minor updates, and maintenance. For ongoing support, we can discuss a maintenance plan that fits your needs and budget.",
      },
    ],
  },

  reviewsSection: {
    label: "Ratings & Reviews",
    title: "What people say about my work.",
    description:
      "Feedback from clients, colleagues, and collaborators I've had the pleasure of working with.",
    items: [
      {
        id: "review-1",
        name: "Suman Shrestha",
        role: "Project Manager, Softsaron",
        rating: 5,
        text: "Kushal delivered the travel website on time with clean code and a well-structured admin panel. His Laravel skills are impressive and he communicates clearly throughout the project.",
      },
      {
        id: "review-2",
        name: "Anisha Maharjan",
        role: "Startup Founder",
        rating: 5,
        text: "Working with Kushal was a great experience. He understood our vision quickly and built exactly what we needed. The attention to detail in both backend logic and frontend design was outstanding.",
      },
      {
        id: "review-3",
        name: "Rajesh Tamang",
        role: "Senior Developer, FoneNxt",
        rating: 4.5,
        text: "During his internship, Kushal showed exceptional dedication and quick learning ability. He picked up Java and Spring concepts fast and contributed meaningfully to our backend projects.",
      },
      {
        id: "review-4",
        name: "Priya Adhikari",
        role: "Freelance Client",
        rating: 5,
        text: "Kushal built our e-commerce dashboard with all the features we requested. The database design was solid, the UI was responsive, and he was always available for feedback and revisions.",
      },
      {
        id: "review-5",
        name: "Bikash Karki",
        role: "College Project Partner",
        rating: 4.5,
        text: "A reliable and skilled developer. Kushal handled the entire backend for our final year project. His understanding of MVC architecture and database relationships is really strong.",
      },
      {
        id: "review-6",
        name: "Nisha Gurung",
        role: "UI/UX Designer",
        rating: 5,
        text: "Kushal translated my designs into pixel-perfect, responsive pages. He respected the design system and added subtle interactions that made the final product feel polished and professional.",
      },
    ],
  },

  contact: {
    label: "Let's Connect",
    title: "Have a project in mind? Let's build something amazing together.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Clean developer workspace with laptop",
    namePlaceholder: "Your Name",
    emailPlaceholder: "Email Address",
    messagePlaceholder: "Your Message",
    buttonText: "Send Message",
    submittingText: "Preparing Email...",
    emailSubjectPrefix: "Portfolio inquiry from",
  },
};
