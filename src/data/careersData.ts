import { CareerPathway } from '../types';

export const CAREER_PATHWAYS: CareerPathway[] = [
  {
    id: 'fullstack',
    title: 'Full-Stack Developer',
    tagline: 'Architect and build complete end-to-end web applications from user interfaces to resilient backends.',
    category: 'Software Engineering',
    difficulty: 'Beginner Friendly',
    avgTimelineMonths: 6,
    description: 'Full-stack developers bridge user experience and server-side engineering. You will learn to construct fluid client interfaces, craft RESTful and GraphQL APIs, model database schemas, and deploy scalable cloud software.',
    idealFor: ['Students who love building visual products with functional logic', 'Problem solvers interested in product development', 'Beginners seeking highest placement market volume'],
    requiredSkills: [
      { name: 'HTML & Semantic Layouts', category: 'Frontend', importance: 'Core' },
      { name: 'CSS & Modern Tailwind', category: 'Frontend', importance: 'Core' },
      { name: 'JavaScript & TypeScript', category: 'Language', importance: 'Core' },
      { name: 'React & Component Architecture', category: 'Frontend', importance: 'Core' },
      { name: 'Node.js & Express / Fastify', category: 'Backend', importance: 'Core' },
      { name: 'PostgreSQL & SQL Schema Modeling', category: 'Databases', importance: 'Core' },
      { name: 'Git & GitHub Version Control', category: 'Tooling', importance: 'Core' },
      { name: 'RESTful API Design & Auth (JWT/OAuth)', category: 'Backend', importance: 'Core' },
      { name: 'Docker & Basic Cloud Hosting', category: 'DevOps', importance: 'Recommended' },
      { name: 'Redis Caching & Testing (Vitest/Jest)', category: 'Engineering', importance: 'Bonus' }
    ],
    exampleProjects: [
      {
        title: 'Campus Peer Mentorship & Project Exchange',
        desc: 'A full-stack collaborative hub where senior students mentor juniors on projects with live milestone reviews and chat.',
        tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS']
      },
      {
        title: 'Micro-SaaS Invoicing & Client Portal',
        desc: 'Self-hosted invoicing app with PDF generation, webhooks, and authenticated client dashboards.',
        tech: ['Next.js', 'Express', 'Prisma ORM', 'Docker']
      },
      {
        title: 'Real-Time Emergency Logistics Board',
        desc: 'Interactive crisis coordination platform with live geo-updates, inventory tallies, and role-based permissions.',
        tech: ['React', 'WebSockets', 'Node.js', 'PostgreSQL']
      }
    ],
    learningRoadmap: [
      { stage: 1, title: 'Web Fundamentals & Semantic Structure', summary: 'Master HTML5, CSS Flexbox/Grid, semantic DOM, responsive web design.', duration: '3 Weeks' },
      { stage: 2, title: 'JavaScript & TypeScript Core Engine', summary: 'Asynchronous JS, Promises, Event Loop, DOM APIs, strict typing with TypeScript.', duration: '4 Weeks' },
      { stage: 3, title: 'React Architecture & State Management', summary: 'Components, hooks, custom hooks, context, state lifecycles, and Tailwind CSS.', duration: '4 Weeks' },
      { stage: 4, title: 'Backend Servers & RESTful APIs', summary: 'Node.js, Express, middleware, routing, input validation (Zod), and error handling.', duration: '3 Weeks' },
      { stage: 5, title: 'Databases & Relational Modeling', summary: 'PostgreSQL, query writing, table relationships, foreign keys, and Drizzle/Prisma ORMs.', duration: '3 Weeks' },
      { stage: 6, title: 'Full-Stack Integration & Auth Security', summary: 'JWT auth, secure cookie handling, OAuth, role-based access control, file uploads.', duration: '3 Weeks' },
      { stage: 7, title: 'Capstone Real-World Project & Deployment', summary: 'Build production-ready application, write tests, containerize with Docker, deploy to cloud.', duration: '4 Weeks' },
      { stage: 8, title: 'Interview & Placement Engineering', summary: 'Data structures in JS, system design fundamentals, mock coding rounds, portfolio polish.', duration: '3 Weeks' }
    ],
    readinessChecklist: [
      'Can design responsive, accessible UI without relying on copy-pasted templates',
      'Can construct a secure REST API with authentication and input validation',
      'Can design normalized 3NF database schema and execute relational queries',
      'Understands asynchronous JavaScript, event loop, and error boundaries',
      'Has 2 substantial deployed full-stack capstone projects on public GitHub with live URLs',
      'Can explain CORS, cookies, JWT tokens, and basic security vulnerabilities (SQLi, XSS)'
    ]
  },
  {
    id: 'aiml',
    title: 'AI / Machine Learning Engineer',
    tagline: 'Develop predictive intelligence, natural language models, and automated inference pipelines.',
    category: 'Artificial Intelligence',
    difficulty: 'Moderate',
    avgTimelineMonths: 7,
    description: 'AI & Machine Learning engineers transform data into intelligent applications. You will learn mathematical foundations, data wrangling with Python, supervised/unsupervised algorithms, deep learning, LLM fine-tuning, and production model serving.',
    idealFor: ['Students with strong mathematical curiosity and logical reasoning', 'Enthusiasts of predictive modeling, NLP, and intelligent agents', 'Coders eager to solve domain problems with deep neural networks'],
    requiredSkills: [
      { name: 'Python for Scientific Computing', category: 'Language', importance: 'Core' },
      { name: 'Linear Algebra & Statistics', category: 'Math', importance: 'Core' },
      { name: 'NumPy, Pandas & Data Cleaning', category: 'Data', importance: 'Core' },
      { name: 'Scikit-Learn & Classical ML', category: 'ML', importance: 'Core' },
      { name: 'PyTorch / TensorFlow Deep Learning', category: 'AI', importance: 'Core' },
      { name: 'Natural Language Processing & Transformers', category: 'AI', importance: 'Core' },
      { name: 'LLM Orchestration & RAG (Retrieval Augmented Gen)', category: 'AI', importance: 'Recommended' },
      { name: 'FastAPI Model Serving & Docker', category: 'Engineering', importance: 'Recommended' },
      { name: 'MLOps, Weights & Biases, MLflow', category: 'Operations', importance: 'Bonus' }
    ],
    exampleProjects: [
      {
        title: 'Agricultural Crop Disease Diagnosis via Vision',
        desc: 'Mobile-ready image classification model detecting leaf blights with 94% validation accuracy and treatment recommendations.',
        tech: ['PyTorch', 'FastAPI', 'OpenCV', 'React Native']
      },
      {
        title: 'Campus Knowledge RAG Search Agent',
        desc: 'Vector-grounded assistant that answers university regulations, syllabus questions, and course prerequisites using embeddings.',
        tech: ['LangChain', 'ChromaDB', 'Gemini / HuggingFace', 'Streamlit']
      },
      {
        title: 'Predictive Medical Patient Readmission Engine',
        desc: 'Clinical risk scoring algorithm using gradient boosting with model explainability (SHAP values).',
        tech: ['Scikit-Learn', 'Pandas', 'XGBoost', 'Docker']
      }
    ],
    learningRoadmap: [
      { stage: 1, title: 'Python Mastery & Computational Foundations', summary: 'Python data structures, object-oriented design, vectorized math with NumPy, linear algebra.', duration: '3 Weeks' },
      { stage: 2, title: 'Data Wrangling & Statistical Analysis', summary: 'Pandas, feature imputation, outlier detection, hypothesis testing, Matplotlib/Seaborn.', duration: '3 Weeks' },
      { stage: 3, title: 'Classical Machine Learning Algorithms', summary: 'Linear/Logistic regression, Decision Trees, Random Forests, Gradient Boosted Trees, cross-validation.', duration: '4 Weeks' },
      { stage: 4, title: 'Deep Learning with PyTorch', summary: 'Neural network architectures, backpropagation, CNNs for computer vision, loss functions, optimizers.', duration: '4 Weeks' },
      { stage: 5, title: 'NLP, Transformers & Embeddings', summary: 'Tokenization, attention mechanisms, HuggingFace transformers, semantic vector spaces.', duration: '4 Weeks' },
      { stage: 6, title: 'Modern Generative AI & RAG Pipelines', summary: 'Vector databases, prompt engineering patterns, retrieval augmented generation, fine-tuning.', duration: '3 Weeks' },
      { stage: 7, title: 'Model Deployment & MLOps Pipelines', summary: 'FastAPI microservices, Dockerization, model monitoring, latency optimization.', duration: '3 Weeks' },
      { stage: 8, title: 'Interview & Placement Engineering', summary: 'ML theory, math derivations, coding data structures in Python, presenting capstones.', duration: '3 Weeks' }
    ],
    readinessChecklist: [
      'Understands bias-variance tradeoff, regularization, and evaluation metrics (AUC, F1, Precision/Recall)',
      'Can clean unstandardized messy real-world datasets with Pandas and justify transformations',
      'Can train and fine-tune a PyTorch or Scikit-Learn model and serve it through a REST endpoint',
      'Understands how embedding vectors, cosine similarity, and RAG architectures function',
      'Has at least 1 end-to-end deployed ML application on HuggingFace Spaces or Cloud Run',
      'Can explain loss functions, gradient descent variants, and overfitting remedies during interviews'
    ]
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst & BI Specialist',
    tagline: 'Translate complex datasets into executive decision insights, interactive dashboards, and actionable growth narratives.',
    category: 'Analytics',
    difficulty: 'Beginner Friendly',
    avgTimelineMonths: 5,
    description: 'Data analysts decipher trends, reveal operational bottlenecks, and empower stakeholders to make evidence-based decisions. You will master analytical SQL, exploratory data analysis, business intelligence dashboards (Tableau/PowerBI), and executive storytelling.',
    idealFor: ['Students who enjoy storytelling with numbers and graphs', 'Curious minds seeking direct business impact', 'Beginners looking for accessible entry into data careers'],
    requiredSkills: [
      { name: 'Advanced SQL & Window Functions', category: 'Databases', importance: 'Core' },
      { name: 'Data Visualization & BI (PowerBI / Tableau)', category: 'BI', importance: 'Core' },
      { name: 'Python / R for Exploratory Analysis', category: 'Language', importance: 'Core' },
      { name: 'Pandas & Data Cleaning', category: 'Data', importance: 'Core' },
      { name: 'Business Metrics & KPI Modeling', category: 'Business', importance: 'Core' },
      { name: 'Statistical Testing & A/B Experimentation', category: 'Math', importance: 'Recommended' },
      { name: 'Excel / Sheets Advanced Modeling', category: 'Spreadsheets', importance: 'Core' },
      { name: 'Data Warehousing Fundamentals (BigQuery/Snowflake)', category: 'Cloud', importance: 'Bonus' }
    ],
    exampleProjects: [
      {
        title: 'E-Commerce Customer Churn & Cohort Analysis',
        desc: 'Interactive cohort retention report identifying retention drop-off drivers and segment-based revenue leaks.',
        tech: ['PostgreSQL', 'Python', 'PowerBI', 'Tableau']
      },
      {
        title: 'Public Transit Route Delay & Congestion Audit',
        desc: 'Analysis of 500k bus transit logs linking weather anomalies with peak bottleneck stops.',
        tech: ['SQL', 'Pandas', 'Plotly', 'Streamlit']
      },
      {
        title: 'Healthcare Clinic Resource Allocation Dashboard',
        desc: 'Real-time bed occupancy, triage response times, and nurse staffing predictive model.',
        tech: ['SQL Window Functions', 'Excel Power Query', 'Tableau']
      }
    ],
    learningRoadmap: [
      { stage: 1, title: 'SQL Fundamentals & Relational Querying', summary: 'SELECT, WHERE, JOINs, GROUP BY, aggregations, data types, database schemas.', duration: '3 Weeks' },
      { stage: 2, title: 'Advanced SQL & Analytical Windows', summary: 'Window functions (RANK, LEAD, LAG, OVER), CTEs, subqueries, query optimization.', duration: '3 Weeks' },
      { stage: 3, title: 'Exploratory Data Analysis with Python', summary: 'Pandas, data cleansing, duplicate removal, handling missing values, visualizations with Seaborn.', duration: '3 Weeks' },
      { stage: 4, title: 'Business Intelligence & Dashboard Mastery', summary: 'Power BI / Tableau: DAX, calculated fields, dashboard design, user filters.', duration: '3 Weeks' },
      { stage: 5, title: 'Metrics Modeling & Financial / Business KPIs', summary: 'CAC, LTV, Retention, Churn rate, ARPU, funnel drop-off analysis.', duration: '2 Weeks' },
      { stage: 6, title: 'A/B Testing & Statistical Inference', summary: 'Hypothesis testing, p-values, sample sizing, conversion rate optimization.', duration: '2 Weeks' },
      { stage: 7, title: 'Portfolio Project Curation & Case Studies', summary: 'Build 3 comprehensive business case studies on GitHub with executive summary slide decks.', duration: '3 Weeks' },
      { stage: 8, title: 'Interview & Placement Engineering', summary: 'Live SQL query rounds, take-home case analysis defense, business logic questions.', duration: '2 Weeks' }
    ],
    readinessChecklist: [
      'Can write complex multi-table SQL queries with CTEs and window functions effortlessly',
      'Can clean messy raw CSV/JSON data into a reliable star or snowflake analytics schema',
      'Has designed at least 2 interactive dashboards with drill-downs and executive summaries',
      'Understands how to formulate hypotheses and test business impact statistically',
      'Can communicate technical findings in clear business language to non-technical stakeholders',
      'Possesses a public portfolio showcasing reproducible analytics reports'
    ]
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & DevOps Engineer',
    tagline: 'Automate deployment pipelines, design resilient infrastructure, and scale high-availability cloud platforms.',
    category: 'Cloud Engineering',
    difficulty: 'Moderate',
    avgTimelineMonths: 6,
    description: 'DevOps engineers ensure software systems run reliably, securely, and without downtime. You will master Linux server administration, Docker containerization, CI/CD automation pipelines, Kubernetes orchestration, Infrastructure as Code, and AWS/GCP cloud platforms.',
    idealFor: ['Students interested in systems infrastructure, networking, and automation', 'Coders who enjoy orchestrating large-scale distributed setups', 'Those who love eliminating manual work through automated workflows'],
    requiredSkills: [
      { name: 'Linux Systems & Bash Scripting', category: 'Systems', importance: 'Core' },
      { name: 'Networking Fundamentals (DNS, TCP, HTTP/S)', category: 'Networking', importance: 'Core' },
      { name: 'Docker & Container Architecture', category: 'DevOps', importance: 'Core' },
      { name: 'CI/CD Pipelines (GitHub Actions / GitLab CI)', category: 'DevOps', importance: 'Core' },
      { name: 'Cloud Providers (AWS / GCP Fundamentals)', category: 'Cloud', importance: 'Core' },
      { name: 'Infrastructure as Code (Terraform)', category: 'DevOps', importance: 'Core' },
      { name: 'Kubernetes Cluster Basics', category: 'DevOps', importance: 'Recommended' },
      { name: 'Monitoring & Observability (Prometheus, Grafana)', category: 'Operations', importance: 'Recommended' },
      { name: 'Cloud Security & IAM Least Privilege', category: 'Security', importance: 'Core' }
    ],
    exampleProjects: [
      {
        title: 'Zero-Downtime Multi-Environment CI/CD Automation',
        desc: 'Automated GitHub Actions pipeline running linting, tests, Docker build, and canary release to Kubernetes with rollbacks.',
        tech: ['GitHub Actions', 'Docker', 'Kubernetes', 'Helm']
      },
      {
        title: 'Automated Multi-Region Infrastructure as Code',
        desc: 'Terraform blueprint provisioning VPCs, auto-scaling compute clusters, load balancers, and encrypted RDS databases.',
        tech: ['Terraform', 'AWS / GCP', 'Bash', 'Security Hub']
      },
      {
        title: 'Full-Stack Observability & Incident Alerting Mesh',
        desc: 'Centralized telemetry dashboard tracking latency percentiles, error budgets, and Slack webhooks.',
        tech: ['Prometheus', 'Grafana', 'Loki', 'Docker Compose']
      }
    ],
    learningRoadmap: [
      { stage: 1, title: 'Linux Administration & Shell Scripting', summary: 'File systems, permissions, process management, SSH keys, cron jobs, bash scripting.', duration: '3 Weeks' },
      { stage: 2, title: 'Computer Networking & Security Basics', summary: 'OSI layers, TCP/IP, DNS records, SSL/TLS certificates, reverse proxies (Nginx).', duration: '3 Weeks' },
      { stage: 3, title: 'Containerization with Docker', summary: 'Dockerfiles, multi-stage builds, container isolation, volume mounts, Docker Compose.', duration: '3 Weeks' },
      { stage: 4, title: 'CI/CD Pipelines with GitHub Actions', summary: 'Automating build, test, lint, container push, secrets management, environment approvals.', duration: '3 Weeks' },
      { stage: 5, title: 'Cloud Infrastructure (AWS / GCP)', summary: 'VPC subnets, EC2/Compute Engine, S3/Cloud Storage, IAM policies, serverless containers.', duration: '4 Weeks' },
      { stage: 6, title: 'Infrastructure as Code with Terraform', summary: 'Declarative states, provider modules, variables, drift detection, resource lifecycles.', duration: '3 Weeks' },
      { stage: 7, title: 'Kubernetes & Observability Systems', summary: 'Pods, Deployments, Services, Ingress, Prometheus metrics, Grafana dashboards.', duration: '3 Weeks' },
      { stage: 8, title: 'Interview & Placement Engineering', summary: 'Infrastructure scenarios, Linux troubleshooting drills, incident triage case studies.', duration: '2 Weeks' }
    ],
    readinessChecklist: [
      'Can comfortably diagnose Linux performance bottlenecks (htop, netstat, systemctl, journalctl)',
      'Can write optimized multi-stage Dockerfiles resulting in minimal secure container images',
      'Has built and maintained an end-to-end CI/CD pipeline deploying code automatically on git push',
      'Can write modular Terraform templates provisioning secure cloud resources with least privilege IAM',
      'Understands high availability, auto-scaling, load balancing, and disaster recovery concepts',
      'Possesses a public repository with automated infrastructure and documentation'
    ]
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity Analyst',
    tagline: 'Defend organizational assets, analyze threat vectors, audit vulnerabilities, and harden digital infrastructure.',
    category: 'Information Security',
    difficulty: 'Moderate',
    avgTimelineMonths: 6,
    description: 'Cybersecurity analysts protect modern enterprises from malicious exploits, ransomware, and identity breaches. You will study defensive operations (Blue Team), vulnerability scanning, network traffic analysis, cryptography, OWASP top 10 web vulnerabilities, and incident response.',
    idealFor: ['Students passionate about digital defense, ethical investigation, and puzzles', 'Those fascinated by how systems can be exploited and fortified', 'Rigorous thinkers with high integrity and ethics'],
    requiredSkills: [
      { name: 'Networking & Protocol Security (Wireshark)', category: 'Networking', importance: 'Core' },
      { name: 'Linux & Windows Security Architecture', category: 'Systems', importance: 'Core' },
      { name: 'OWASP Top 10 Web Application Vulnerabilities', category: 'Security', importance: 'Core' },
      { name: 'Security Information & Event Management (SIEM)', category: 'Operations', importance: 'Core' },
      { name: 'Vulnerability Scanning (Nmap, Nessus)', category: 'Tooling', importance: 'Core' },
      { name: 'Python / Bash for Security Automation', category: 'Language', importance: 'Core' },
      { name: 'Cryptography & Public Key Infrastructure', category: 'Math', importance: 'Recommended' },
      { name: 'Incident Response & Digital Forensics', category: 'Operations', importance: 'Bonus' }
    ],
    exampleProjects: [
      {
        title: 'Automated Web Application Security Vulnerability Scanner',
        desc: 'Python utility scanning target endpoints for SQL injection, XSS vectors, and misconfigured HTTP headers with remediation reports.',
        tech: ['Python', 'Requests', 'OWASP ZAP', 'Docker']
      },
      {
        title: 'SOC Log Analysis & Intrusion Detection Lab',
        desc: 'Virtual security operations lab capturing brute-force attacks and triggering SIEM alerts with Suricata & Splunk.',
        tech: ['Suricata', 'Wireshark', 'Splunk / Elastic', 'Linux']
      },
      {
        title: 'Enterprise Zero-Trust Policy Audit Toolkit',
        desc: 'Script auditing cloud IAM permissions, unencrypted storage buckets, and public subnet exposures.',
        tech: ['Bash', 'Python', 'AWS CLI', 'Markdown Reports']
      }
    ],
    learningRoadmap: [
      { stage: 1, title: 'Network Fundamentals & Packet Inspection', summary: 'TCP/IP, subnetting, ARP, DNS, TLS handshake, packet capture analysis with Wireshark.', duration: '3 Weeks' },
      { stage: 2, title: 'Operating System Hardening', summary: 'Linux file permissions, sudoers, Windows Active Directory basics, firewall rules (iptables/ufw).', duration: '3 Weeks' },
      { stage: 3, title: 'OWASP Top 10 & Web Application Security', summary: 'SQL injection, XSS, CSRF, broken access control, server-side request forgery (SSRF).', duration: '4 Weeks' },
      { stage: 4, title: 'Security Tooling & Vulnerability Assessment', summary: 'Nmap scanning, Metasploit methodology, Burp Suite intercepting proxy, Nessus scans.', duration: '3 Weeks' },
      { stage: 5, title: 'SIEM, Log Analysis & Threat Detection', summary: 'Analyzing auth logs, detecting brute force attempts, correlation rules, Splunk/ELK stack.', duration: '3 Weeks' },
      { stage: 6, title: 'Applied Cryptography & Defensive Architecture', summary: 'Symmetric/asymmetric encryption, hashing, salts, digital signatures, certificates.', duration: '3 Weeks' },
      { stage: 7, title: 'Incident Response Drills & Capture the Flag (CTF)', summary: 'TryHackMe/HackTheBox pathways, malware triage basics, post-mortem incident documentation.', duration: '3 Weeks' },
      { stage: 8, title: 'Interview & Placement Engineering', summary: 'Security defense scenarios, networking quizzes, explaining CVEs, portfolio case study review.', duration: '2 Weeks' }
    ],
    readinessChecklist: [
      'Understands how packets traverse networks and can pinpoint anomalous traffic in Wireshark',
      'Can clearly demonstrate and remediate OWASP Top 10 vulnerabilities on sample vulnerable apps',
      'Understands difference between vulnerability assessment, penetration testing, and compliance audits',
      'Has completed recognized hands-on lab milestones (TryHackMe / HackTheBox badges or equivalent)',
      'Can explain defense-in-depth, zero-trust architecture, and multi-factor authentication mechanics',
      'Possesses written vulnerability write-ups detailing findings and remediation steps'
    ]
  },
  {
    id: 'uiux',
    title: 'UI/UX Product Designer',
    tagline: 'Craft intuitive, accessible digital experiences through user research, design systems, and rapid interactive prototyping.',
    category: 'Design Engineering',
    difficulty: 'Beginner Friendly',
    avgTimelineMonths: 5,
    description: 'UI/UX designers craft the interfaces people interact with every day. You will learn human-computer interaction principles, user research methodologies, information architecture, wireframing, high-fidelity Figma design systems, WCAG accessibility, and design-to-code handoffs.',
    idealFor: ['Creative thinkers with keen visual empathy and curiosity for human behavior', 'Students who love making software feel effortless, clean, and delightful', 'Designers who want to build a high-impact tech career without heavy coding'],
    requiredSkills: [
      { name: 'Figma Mastery & Auto-Layout', category: 'Tooling', importance: 'Core' },
      { name: 'Design Systems & Component Libraries', category: 'Design', importance: 'Core' },
      { name: 'User Research & Usability Testing', category: 'Research', importance: 'Core' },
      { name: 'Information Architecture & Wireframing', category: 'UX', importance: 'Core' },
      { name: 'Typography & Spatial Hierarchy', category: 'Visual', importance: 'Core' },
      { name: 'WCAG Accessibility Standards (AA/AAA)', category: 'Accessibility', importance: 'Core' },
      { name: 'Interactive Micro-Prototyping', category: 'Prototyping', importance: 'Core' },
      { name: 'Frontend Basics (HTML/CSS/Tailwind)', category: 'Engineering', importance: 'Recommended' }
    ],
    exampleProjects: [
      {
        title: 'Inclusive Healthcare Telemedicine Booking App',
        desc: 'Complete end-to-end UX case study with user interviews, journey maps, high-contrast accessible design, and responsive prototypes.',
        tech: ['Figma', 'FigJam', 'Maze User Testing', 'WCAG Auditing']
      },
      {
        title: 'FinTech Micro-Investment Onboarding Flow',
        desc: 'Redesign of complex financial onboarding flow reducing user drop-off by 38% through contextual micro-interactions.',
        tech: ['Figma Variables', 'Design Tokens', 'Interactive Prototyping']
      },
      {
        title: 'Open-Source Design System & Component Matrix',
        desc: 'Comprehensive multi-theme accessible UI library with typography scales, states, tokens, and developer documentation.',
        tech: ['Figma Components', 'Tailwind Tokens', 'Storybook Specs']
      }
    ],
    learningRoadmap: [
      { stage: 1, title: 'UX Foundations & User-Centered Philosophy', summary: 'Design thinking process, empathy mapping, user personas, problem framing, journey mapping.', duration: '3 Weeks' },
      { stage: 2, title: 'Information Architecture & Low-Fidelity Wireframes', summary: 'Card sorting, sitemaps, user flows, content hierarchy, paper wireframes, digital wireframes.', duration: '3 Weeks' },
      { stage: 3, title: 'Figma Engineering & Design Systems', summary: 'Auto-layout 5.0, variables, component variants, responsive constraints, token naming conventions.', duration: '4 Weeks' },
      { stage: 4, title: 'Visual Design, Color Theory & Typography', summary: 'Optical sizing, modular type scales, color contrast ratios, dark mode palettes, visual balance.', duration: '3 Weeks' },
      { stage: 5, title: 'Accessibility (WCAG 2.2) & Inclusive Design', summary: 'Color blindness testing, keyboard navigation flows, screen reader friendly layouts, focus states.', duration: '2 Weeks' },
      { stage: 6, title: 'Interactive Prototyping & Usability Testing', summary: 'Smart animate, interactive components, conducting unmoderated user tests, synthesizing feedback.', duration: '3 Weeks' },
      { stage: 7, title: 'Developer Handoff & Frontend Literacy', summary: 'CSS box model, flexbox principles, design tokens, inspecting elements, communicating with engineers.', duration: '2 Weeks' },
      { stage: 8, title: 'Portfolio Case Study Polish & Placement Preparation', summary: 'Drafting 3 in-depth case studies with problem, process, iterations, and measurable results.', duration: '3 Weeks' }
    ],
    readinessChecklist: [
      'Has 2 to 3 detailed case studies showcasing the entire UX process, not just final mockups',
      'Can build robust Figma components with auto-layout, variants, and responsive behavior',
      'Understands WCAG color contrast, accessible touch targets, and assistive technology flow',
      'Can clearly articulate design decisions and trade-offs to product managers and developers',
      'Has conducted real user interviews or usability tests to validate interface assumptions',
      'Maintains an organized, public portfolio website presenting design solutions'
    ]
  }
];
