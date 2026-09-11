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
    eyebrow: "FULL-STACK DEVELOPER · I BUILD THE HARD PARTS",
    title: "Products that look sharp and hold up underneath.",
    description:
      "I’m backend-led, but I don’t hide behind APIs. I design the flow, model the data, lock down the rules, build the interface, debug the ugly edge cases, and ship the product.",
    primaryButton: "View selected work",
    primaryLink: "#projects",
    secondaryButton: "Download CV",
    stack: ["Laravel", "Spring Boot", "React", "PostgreSQL", "MySQL"],
    signals: ["Backend-led", "Product-minded", "End-to-end", "Built beyond CRUD"],
  },

  about: {
    label: "HOW I WORK",
    title: "Proof over buzzwords.",
    description:
      "My best work sits where product thinking and backend engineering meet: data models, APIs, permissions, admin workflows, business rules, and the interface people actually use. I like owning enough of the stack to fix the real problem instead of passing it to the next person.",
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
    title: "Serious systems. Clean interfaces.",
    description:
      "These are not tutorial CRUD apps. They include permissions, lifecycle rules, admin operations, billing, booking logic, file workflows and the user-facing layer around them.",
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
        problem:
          "Signing looks simple from the outside, but the backend has to coordinate documents, signers, fields, sessions, files, billing limits and notifications without letting one failed step corrupt the rest of the transaction.",
        contribution:
          "I worked on the backend architecture and product rules: tightening document lifecycle guards, securing signer access, hardening finalization, introducing usage and storage controls, and making billing and email processing resilient to retries and partial failure.",
        architecture: ["Transaction", "Signer sessions", "Field workflow", "Final PDF", "Billing + outbox"],
        decisions: [
          "Make illegal state transitions impossible at the service layer instead of relying on the UI.",
          "Finalize signed documents after commit and use locking so concurrent requests cannot generate conflicting final files.",
          "Treat Stripe webhooks and background email delivery as retryable, idempotent workflows.",
        ],
        takeaway:
          "This project is the clearest example of how I approach backend work: model the lifecycle first, then make every edge case obey it.",
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
        problem:
          "The product had to serve guests and hotel staff at the same time. Rooms, dining, wellness, events and offers each had different workflows, while availability, pricing and status changes still needed to stay consistent.",
        contribution:
          "I built across the Laravel stack: customer booking flows, availability rules, admin CMS modules, notification behavior, account separation, pricing breakdowns and the interface around those workflows.",
        architecture: ["Guest journey", "Availability + pricing", "Booking state", "Admin operations", "Notifications"],
        decisions: [
          "Keep customer and administrative concerns separated even when they operate on the same booking records.",
          "Protect reservation time slots and status transitions in backend logic rather than trusting form state.",
          "Reuse CMS and notification patterns across modules without forcing every hospitality feature into one generic model.",
        ],
        takeaway:
          "The value here is not a single booking page; it is turning a growing hospitality site into an operational product without losing control of the workflows.",
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
        problem:
          "A utility platform can become messy fast: every tool accepts different inputs, has different limits and may need a completely different processing strategy, yet the experience still has to feel consistent.",
        contribution:
          "I shaped the shared tool UI, validation patterns and processing boundaries while keeping individual utilities free to use browser-side or server-side conversion where each approach made the most sense.",
        architecture: ["Input", "Validation", "Tool engine", "Result", "Download"],
        decisions: [
          "Use a common interaction shell so new utilities feel familiar without duplicating UI logic.",
          "Prefer local browser processing when it improves speed or privacy, and use the server only where it earns its complexity.",
          "Keep production bundles and worker behavior in mind because conversion tools can easily make a lightweight site feel heavy.",
        ],
        takeaway:
          "ConvertTree shows the product side of my work: keeping dozens of small workflows coherent instead of treating them like unrelated pages.",
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
        problem:
          "Personal finance apps only work when entering data is quick enough to become a habit. The app needed richer budgeting and recurring features without turning everyday expense entry into work.",
        contribution:
          "I built the app with Compose, Room and MVVM, covering transaction flows, budgets, recurring entries, local insights, backup and restore, bilingual UI, and privacy controls such as PIN and biometric locking.",
        architecture: ["Compose UI", "ViewModel", "Room data", "Insights", "Backup + security"],
        decisions: [
          "Keep financial data local-first so the core app remains fast, private and usable without an account.",
          "Separate recurring rules from generated transactions so automation stays understandable and reversible.",
          "Make security lifecycle-aware so sensitive screens re-lock correctly when the app leaves the foreground.",
        ],
        takeaway:
          "This project pushed me beyond web development and reinforced the same principle: good product architecture should make the safe path the easy path.",
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
        problem:
          "The public site needed to sell destinations visually, while the team behind it needed a straightforward way to keep packages and travel content current without developer involvement.",
        contribution:
          "I implemented the Laravel content structure, responsive public pages and enquiry flow, with a backend that keeps recurring content updates inside the admin experience.",
        architecture: ["Admin content", "Packages", "Destinations", "Public pages", "Enquiries"],
        decisions: [
          "Model repeatable travel content in the CMS instead of hard-coding marketing pages.",
          "Keep the enquiry path visible and lightweight rather than forcing users through a heavy booking process.",
          "Use the public visual hierarchy to sell the destination while keeping editing workflows practical for administrators.",
        ],
        takeaway:
          "Sayumi is a good example of balancing a polished marketing surface with a backend that non-developers can actually maintain.",
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
        problem:
          "Company registration is a trust-heavy service. The site had to explain the process clearly, answer the important questions quickly and move serious visitors toward direct contact without clutter.",
        contribution:
          "I translated the service into a focused Laravel website with clear information architecture, responsive pages, SEO-friendly content structure and direct WhatsApp and email conversion paths.",
        architecture: ["Service story", "Process", "Trust content", "SEO", "Direct enquiry"],
        decisions: [
          "Prioritize clarity over feature count because the product goal is confidence and conversion, not account creation.",
          "Keep contact actions close to decision points instead of hiding them at the bottom of the site.",
          "Structure service content so search engines and first-time visitors can understand the offering with minimal context.",
        ],
        takeaway:
          "This project demonstrates restraint: not every business problem needs a complex application, but simple work still deserves strong structure and execution.",
        tone: "plum",
        status: "Website",
      },
    ],
  },

  journeySection: {
    label: "EXPERIENCE",
    title: "I learn fastest when the work gets real.",
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
    title: "Notes from the parts that fought back.",
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
    title: "Bring me the messy problem.",
    description:
      "I’m open to full-time roles and serious product work — especially the kind with real workflows, edge cases and room to improve the system, not just repaint the screen.",
  },
};
