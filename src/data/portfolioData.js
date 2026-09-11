export const portfolioData = {
  site: {
    logoInitial: "KP",
    logoName: "Kushal",
    logoHighlight: "Poudel",
    footerCopyright: `© ${new Date().getFullYear()} Kushal Poudel`,
    footerCredit: "Designed and built with React",
  },

  navItems: [
    { id: "work", label: "Work", href: "#projects" },
    { id: "about", label: "About", href: "#about" },
    { id: "experience", label: "Experience", href: "#experience" },
    { id: "writing", label: "Writing", href: "#blogs" },
    { id: "contact", label: "Contact", href: "#contact" },
  ],

  profile: {
    name: "Kushal Poudel",
    role: "Full-Stack Developer",
    location: "Kathmandu, Nepal",
    email: "kushalpoudel240@gmail.com",
    image: "/images/pic3.webp",
    cv: "/Kushal_Poudel_CV.pdf",
    cvFileName: "Kushal_Poudel_CV.pdf",
    github: "https://github.com/The-Kushal-Poudel",
    linkedin: "https://www.linkedin.com/in/kushal-poudel-317b25241/",
    availability: "Open to full-time and product opportunities",
  },

  hero: {
    eyebrow: "FULL-STACK DEVELOPER · BACKEND-LED PRODUCT BUILDER",
    title: "I build web products with backend depth and polished interfaces.",
    description:
      "I work across Laravel, Spring Boot, React and modern databases to turn real workflows into reliable products — from booking platforms and CMS systems to signing workflows and utility tools.",
    primaryButton: "View selected work",
    primaryLink: "#projects",
    secondaryButton: "Download CV",
    stack: ["Laravel", "Spring Boot", "React", "PostgreSQL", "MySQL"],
  },

  about: {
    label: "HOW I WORK",
    title: "I like owning the whole product flow, not just one layer.",
    description:
      "My strongest work sits where product thinking and backend engineering meet: data models, APIs, permissions, admin workflows, business rules, and the interface people actually use. I care about clean architecture, but I care just as much about whether the final product feels clear and useful.",
    principles: [
      {
        id: "backend-systems",
        number: "01",
        title: "Backend systems",
        text: "REST APIs, authentication, roles, queues, data modeling, workflows, integrations and lifecycle rules.",
      },
      {
        id: "product-ui",
        number: "02",
        title: "Product UI",
        text: "Responsive interfaces, dashboards and complex forms that stay understandable as features grow.",
      },
      {
        id: "security-data",
        number: "03",
        title: "Data & security",
        text: "Validation, authorization, safer state transitions, transactional thinking and defensive backend design.",
      },
      {
        id: "shipping",
        number: "04",
        title: "Shipping",
        text: "Git workflows, production builds, deployment, debugging and improving products after the first version ships.",
      },
    ],
  },

  techStack: {
    label: "TOOLS I USE",
    groups: [
      { name: "Backend", items: ["Laravel", "PHP", "Spring Boot", "Java", "REST APIs"] },
      { name: "Frontend", items: ["React", "Tailwind CSS", "JavaScript", "Vite", "Blade"] },
      { name: "Data", items: ["PostgreSQL", "MySQL", "Room DB", "SQL"] },
      { name: "Workflow", items: ["Git", "Docker", "Vercel", "Render", "Stripe"] },
    ],
  },

  projectsSection: {
    label: "SELECTED WORK",
    title: "Products and systems I’ve built.",
    description:
      "A selection of projects where I worked on real workflows, backend logic, admin systems and user-facing product experiences.",
    items: [
      {
        id: "mark-instantly",
        slug: "mark-instantly",
        title: "Mark Instantly",
        kicker: "E-signature platform",
        description:
          "A document signing product with transaction workflows, signer sessions, PDF finalization, billing entitlements and durable background processing.",
        techStack: ["Spring Boot", "PostgreSQL", "Stripe", "Docker"],
        role: "Backend architecture & product engineering",
        features: [
          "Document transaction and signer lifecycle rules",
          "Secure signer PDF and field workflows",
          "Final PDF generation with locking and after-commit processing",
          "Subscription entitlements, usage limits and storage reservations",
          "Stripe webhook idempotency and billing administration",
          "Durable email outbox and post-transaction notifications",
        ],
        challenge:
          "The core challenge was keeping signing, billing and document state consistent when several operations could happen concurrently or fail mid-flow.",
        outcome:
          "The architecture was hardened around lifecycle guards, idempotency, transaction boundaries and safer document finalization so the product can evolve without fragile state transitions.",
        tone: "ink",
        status: "Private product",
      },
      {
        id: "lions-den",
        slug: "lions-den-hospitality-platform",
        title: "Lions Den",
        kicker: "Hospitality platform",
        description:
          "A multi-module hospitality product covering rooms, dining, wellness, experiences, offers, bookings, notifications and admin operations.",
        techStack: ["Laravel", "MySQL", "Blade", "Tailwind CSS"],
        role: "Full-stack development",
        features: [
          "Room availability, guest booking and charge breakdown workflows",
          "Dining reservation slot integrity and safe status flows",
          "Independent CMS modules for rooms, offers, wellness and content",
          "Admin dashboards, notification counts and operational summaries",
          "Customer-only portal and account separation",
          "Responsive booking and content interfaces",
        ],
        challenge:
          "The system grew across many business modules, so maintaining clean boundaries between customer flows, admin operations and booking state became essential.",
        outcome:
          "The project evolved into a broader hospitality system rather than a brochure site, with reusable admin patterns and more reliable booking logic.",
        tone: "forest",
        status: "Active development",
      },
      {
        id: "converttree",
        slug: "converttree",
        title: "ConvertTree",
        kicker: "Browser utility platform",
        description:
          "An all-in-one utilities product for document, image, text and everyday conversion workflows with a compact tool-first interface.",
        techStack: ["Laravel", "JavaScript", "Vite", "Tailwind CSS"],
        role: "Product architecture & full-stack development",
        features: [
          "Image conversion and optimization workflows",
          "PDF and document utility modules",
          "Tool-specific validation and browser-side processing",
          "Reusable compact UI system across tool categories",
          "Performance-focused production builds",
        ],
        challenge:
          "Each utility has different file constraints and processing behavior, but the product still needs to feel like one consistent system.",
        outcome:
          "The platform uses shared interaction patterns while allowing individual tools to use the best client-side or server-side processing path.",
        tone: "sand",
        status: "Product build",
        liveLink: "https://www.converttree.com/",
        image: "/project Images/converttree.webp",
      },
      {
        id: "paisaa-kaha-gayo",
        slug: "paisaa-kaha-gayo",
        title: "Paisaa Kaha Gayo",
        kicker: "Personal finance Android app",
        description:
          "A private-first money tracking Android app with budgets, recurring transactions, insights, backup/restore and bilingual localization.",
        techStack: ["Kotlin", "Jetpack Compose", "Room", "MVVM"],
        role: "Android product development",
        features: [
          "Transaction CRUD, filters, sorting and undo",
          "Monthly budgets and previous-month copying",
          "Recurring transaction manager and automatic entries",
          "Backup, restore and CSV export",
          "PIN lock, biometric access and lifecycle locking",
          "English and Nepali localization",
        ],
        challenge:
          "The app needed to stay simple for daily use while supporting budgeting, recurring money flows, local storage and privacy-sensitive features.",
        outcome:
          "The core feature set was completed and the Android build verified successfully with the security and data-management flows integrated.",
        tone: "blue",
        status: "Android app",
      },
      {
        id: "sayumi",
        slug: "sayumi-travels-and-tours",
        title: "Sayumi Travels",
        kicker: "Travel website & CMS",
        description:
          "A dynamic travel and tours website with packages, destinations, enquiry flows and content administration.",
        techStack: ["Laravel", "MySQL", "Tailwind CSS"],
        role: "Full-stack Laravel development",
        features: [
          "Dynamic travel package management",
          "Destination and service content pages",
          "Booking enquiry workflow",
          "Responsive customer-facing UI",
        ],
        challenge:
          "The goal was to keep content manageable for administrators while presenting destinations and packages clearly on the public site.",
        outcome:
          "The result is a live, content-driven travel site that can be maintained without code changes for routine updates.",
        tone: "sunset",
        status: "Live",
        liveLink: "https://sayumiglobal.com/",
        image: "/project Images/sayumi.webp",
      },
      {
        id: "nepal-formation",
        slug: "nepal-formation",
        title: "Nepal Formation",
        kicker: "Business registration website",
        description:
          "A focused company-registration website designed around service clarity, trust and direct enquiry conversion.",
        techStack: ["Laravel", "Blade", "Tailwind CSS"],
        role: "Frontend & Laravel implementation",
        features: [
          "Service-led landing page architecture",
          "Responsive business-focused interface",
          "Direct WhatsApp and email contact flows",
          "SEO-ready content structure",
        ],
        challenge:
          "The site needed to explain a formal service simply and move visitors quickly from understanding the process to making contact.",
        outcome:
          "The build prioritizes clear service communication and lightweight conversion paths rather than unnecessary application complexity.",
        tone: "plum",
        status: "Website",
      },
    ],
  },

  journeySection: {
    label: "EXPERIENCE",
    title: "Learning by shipping real work.",
    items: [
      {
        id: "current-work",
        period: "Present",
        title: "Full-Stack Web Development",
        company: "Softsaron Pvt. Ltd. · Project & freelance work",
        text: "Building Laravel applications, admin systems, booking flows, CMS modules and product interfaces while working across backend logic and frontend implementation.",
      },
      {
        id: "fonenxt",
        period: "Jan 2024 — Apr 2024",
        title: "Backend Java Developer Intern",
        company: "FoneNxt",
        text: "Worked with Java, PostgreSQL, backend use-case flows and structured team development practices.",
      },
      {
        id: "bca",
        period: "2020 — 2025",
        title: "Bachelor of Computer Application",
        company: "Patan Multiple Campus · Studies completed — graduation pending",
        text: "Coursework included programming, databases, web development, software engineering and application development fundamentals.",
      },
    ],
  },

  blogsSection: {
    label: "NOTES",
    title: "Writing from the build process.",
    description:
      "Short notes about architecture, debugging and lessons that came from actually building products.",
    items: [
      {
        id: "esign-state",
        title: "What an e-signature workflow taught me about state",
        category: "Backend",
        date: "2026",
        description:
          "Why lifecycle guards, transaction boundaries and idempotency matter when one user action touches documents, billing and notifications.",
        content: [
          "Building an e-signature workflow changed the way I think about application state. A signing transaction is not just a row that moves from pending to complete. It connects documents, signers, fields, sessions, generated files, usage limits, emails and billing events.",
          "The important lesson was to make illegal transitions difficult. Structure edits should only be allowed while a document is still editable. Closed transactions should not accept new signer sessions. Finalization should not run twice because two requests arrived at nearly the same time.",
          "That pushed the backend toward explicit lifecycle guards, pessimistic locking where it mattered, idempotent webhook handling and post-commit work for operations that should only happen after a database transaction succeeds.",
        ],
      },
      {
        id: "laravel-cms",
        title: "A CMS becomes useful when the workflow is designed first",
        category: "Laravel",
        date: "2026",
        description:
          "What I learned from building repeated admin modules for hospitality, education and business websites.",
        content: [
          "It is easy to call any admin panel a CMS, but CRUD screens alone do not make a useful content system. The real work is deciding what editors need to control, what should stay fixed, and which relationships should be visible instead of hidden in the database.",
          "Across different Laravel projects I started reusing patterns for status controls, image management, ordering, project scoping and safer deletion. That made new modules faster to build without making every screen feel identical.",
          "The biggest improvement came from treating the admin experience as part of the product instead of an internal afterthought.",
        ],
      },
      {
        id: "frontend-without-backend",
        title: "When a portfolio should not need a backend",
        category: "Frontend",
        date: "2026",
        description:
          "Why I moved this portfolio to local content so the public site stays fast, simple and deployable on its own.",
        content: [
          "A portfolio is mostly read-only content. Running an API, database and authentication layer just to render projects adds deployment cost and more ways for the public site to fail.",
          "For this version I kept the backend project available for future use, but removed it from the production dependency chain. The public React app owns its portfolio content locally and contact links use normal email instead of an API submission.",
          "That trade-off makes sense here: fewer moving parts, simpler hosting and a site that still communicates the work clearly.",
        ],
      },
    ],
  },

  contact: {
    label: "CONTACT",
    title: "Have a product, role or problem worth solving?",
    description:
      "I’m open to full-time opportunities and serious product work. The easiest way to reach me is by email or LinkedIn.",
  },
};
