import { OpportunityListing } from '../types';

export const SAMPLE_OPPORTUNITIES: OpportunityListing[] = [
  {
    id: 'opp_1',
    organization: 'Acme Cloud Labs (Demonstration Listing)',
    role: 'Frontend Engineering Intern',
    type: 'Internship',
    location: 'Bengaluru / Hybrid',
    workMode: 'Hybrid',
    requiredSkills: ['React', 'TypeScript', 'CSS/Tailwind', 'Git'],
    eligibility: 'Pre-final & Final year engineering students / Bootcamp graduates with published projects',
    stipendOrSalary: '₹25,000 – ₹35,000 / month (Sample Range)',
    deadline: 'Rolling Applications / Fall Batch',
    applicationUrl: 'https://example.com/careers/sample-frontend-intern',
    isCuratedSample: true,
    status: 'Not Applied'
  },
  {
    id: 'opp_2',
    organization: 'FinTech Nexus Systems (Demonstration Listing)',
    role: 'Junior Full-Stack Associate',
    type: 'Entry-Level',
    location: 'Remote (India)',
    workMode: 'Remote',
    requiredSkills: ['Node.js', 'PostgreSQL', 'React', 'REST APIs', 'Docker'],
    eligibility: '2025/2026 Batch Graduates with demonstrated full-stack capstone and Git commit history',
    stipendOrSalary: '₹6.5 – ₹8.5 LPA (Sample Range)',
    deadline: 'Next Month Review Cycle',
    applicationUrl: 'https://example.com/careers/sample-fullstack-associate',
    isCuratedSample: true,
    status: 'Not Applied'
  },
  {
    id: 'opp_3',
    organization: 'GreenPulse AgriAnalytics (Demonstration Listing)',
    role: 'Associate Data & ML Analyst',
    type: 'Entry-Level',
    location: 'Hyderabad / On-site',
    workMode: 'On-site',
    requiredSkills: ['Python', 'SQL', 'Pandas', 'PowerBI', 'Scikit-Learn'],
    eligibility: 'B.E./B.Tech/MCA/M.Sc with strong statistical modeling and exploratory data analysis portfolio',
    stipendOrSalary: '₹6.0 – ₹8.0 LPA (Sample Range)',
    deadline: 'Open for Verified Portfolios',
    applicationUrl: 'https://example.com/careers/sample-data-analyst',
    isCuratedSample: true,
    status: 'Not Applied'
  },
  {
    id: 'opp_4',
    organization: 'CyberDefend Security Operations (Demonstration Listing)',
    role: 'SOC Analyst Trainee',
    type: 'Graduate Program',
    location: 'Chennai / Hybrid',
    workMode: 'Hybrid',
    requiredSkills: ['Network Protocols (TCP/IP)', 'Linux', 'Wireshark', 'SIEM Fundamentals'],
    eligibility: 'Graduates with completed hands-on lab milestones (TryHackMe / HackTheBox or certifications)',
    stipendOrSalary: '₹5.5 – ₹7.2 LPA (Sample Range)',
    deadline: 'Bi-Weekly Cohort Intake',
    applicationUrl: 'https://example.com/careers/sample-soc-analyst',
    isCuratedSample: true,
    status: 'Not Applied'
  },
  {
    id: 'opp_5',
    organization: 'Starlight Interactive Media (Demonstration Listing)',
    role: 'UI/UX Design Intern',
    type: 'Internship',
    location: 'Remote',
    workMode: 'Remote',
    requiredSkills: ['Figma Auto-Layout', 'Design Systems', 'User Research', 'Wireframing'],
    eligibility: 'Students with 2+ documented case studies showing problem-solving process',
    stipendOrSalary: '₹20,000 – ₹30,000 / month (Sample Range)',
    deadline: 'Immediate Screening',
    applicationUrl: 'https://example.com/careers/sample-uiux-intern',
    isCuratedSample: true,
    status: 'Not Applied'
  }
];

export const RESUME_CHECKLIST = [
  { id: 'res_1', title: 'Single-page concise layout with zero fluff or decorative rating bars', core: true },
  { id: 'res_2', title: 'Every bullet point follows the Action Verb + Context + Measurable Outcome pattern', core: true },
  { id: 'res_3', title: 'Direct clickable links to live deployed demo URLs and clean GitHub repositories', core: true },
  { id: 'res_4', title: 'Technical skills grouped cleanly by domain (Languages, Frameworks, Databases, Tools)', core: true },
  { id: 'res_5', title: 'ATS-friendly plain text formatting tested with standard PDF parsers', core: true },
  { id: 'res_6', title: 'Includes verified contact channels: Professional email, LinkedIn profile, GitHub handle', core: true }
];

export const PORTFOLIO_CHECKLIST = [
  { id: 'port_1', title: 'At least 2 comprehensive, non-tutorial capstone projects with full source code', core: true },
  { id: 'port_2', title: 'Clear README.md with screenshots, problem statement, architecture overview, and run commands', core: true },
  { id: 'port_3', title: 'Live deployed application on Vercel, Render, Cloud Run, or Hugging Face Spaces', core: true },
  { id: 'port_4', title: 'Consistent Git commit history demonstrating disciplined iteration and feature branches', core: true },
  { id: 'port_5', title: 'Accessible UI with responsive mobile adaptation and zero broken console errors', core: true }
];

export const PAP_EDUCATIONAL_GUIDE = {
  title: 'Understanding Pay-After-Placement (PAP) Frameworks',
  subtitle: 'A transparent student guide to evaluating income-sharing and deferred fee education models.',
  disclaimer: 'Note: Below terms are educational benchmarks for how ethical PAP agreements operate. Always review your institution’s specific written legal agreement prior to enrollment.',
  pillars: [
    {
      title: '1. Minimum Salary Threshold (The Trigger)',
      description: 'An ethical PAP only triggers repayment once a candidate secures an industry placement earning at or above an agreed minimum annual threshold (e.g. ₹5.0 LPA or above). If the student secures an offer below the threshold, payments are deferred.'
    },
    {
      title: '2. Maximum Fee Cap & Fixed Repayment Window',
      description: 'Every reputable agreement defines an absolute total fee cap and an expiry duration (typically 24 to 36 months). Once the cap or time limit is reached, all obligations terminate regardless of whether the full amount was reached.'
    },
    {
      title: '3. What Full Placement Support Entails',
      description: 'Comprehensive placement acceleration includes 1-on-1 resume tailoring, technical mock interviews with senior industry mentors, behavioral round readiness, and direct referral drives with hiring partner networks.'
    },
    {
      title: '4. Written Agreements & Rights Disclosure',
      description: 'Students should always inspect the written legal contract for clear drop-out clauses, medical intermission provisions, transparent dispute resolution, and no hidden upfront or processing penalties.'
    }
  ]
};
