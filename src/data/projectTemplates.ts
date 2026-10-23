import { ProjectBlueprint } from '../types';

export interface ProjectDomainOption {
  id: string;
  name: string;
  icon: string;
  defaultTech: string[];
  suggestedProblems: string[];
}

export const PROJECT_DOMAINS: ProjectDomainOption[] = [
  {
    id: 'agritech',
    name: 'Agriculture & Rural Tech',
    icon: 'Sprout',
    defaultTech: ['Python', 'OpenCV', 'React', 'FastAPI', 'SQLite'],
    suggestedProblems: [
      'Early crop leaf disease detection & vernacular treatment advice',
      'Hyperlocal soil moisture & automated micro-irrigation controller',
      'Direct farm-to-consumer perishable produce bidding exchange',
      'Cold storage capacity tracking & spoilage prediction alert system'
    ]
  },
  {
    id: 'healthcare',
    name: 'Healthcare & Public Well-being',
    icon: 'HeartPulse',
    defaultTech: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    suggestedProblems: [
      'Rural clinic patient vitals tracking & prescription digitization',
      'Emergency blood donor matching & urgent hospital dispatch pipeline',
      'Anonymous mental health peer listening & counselor triage portal',
      'Geriatric medication adherence reminder with guardian notifications'
    ]
  },
  {
    id: 'social_impact',
    name: 'Social Impact & Civic Tech',
    icon: 'Users',
    defaultTech: ['Next.js', 'Node.js', 'PostgreSQL', 'Leaflet Maps', 'Tailwind'],
    suggestedProblems: [
      'Municipal civic issue crowdsourcing with GPS geotagging & status SLAs',
      'Food surplus redistribution network connecting banquet halls to shelters',
      'Community disaster relief supply tally and volunteer coordination grid',
      'Accessible textbook-to-audio speech converter for visually impaired students'
    ]
  },
  {
    id: 'fintech',
    name: 'FinTech & Student Economics',
    icon: 'Wallet',
    defaultTech: ['React', 'Express', 'PostgreSQL', 'Chart.js', 'JWT'],
    suggestedProblems: [
      'Student group expense split with automated UPI settlement deep links',
      'Micro-savings round-up & subscription leakage audit dashboard',
      'College campus peer-to-peer used book and equipment rental ledger',
      'Freelancer invoice generator with milestone escrow tracking simulation'
    ]
  },
  {
    id: 'education',
    name: 'EdTech & Skill Development',
    icon: 'GraduationCap',
    defaultTech: ['React', 'TypeScript', 'Node.js', 'WebSockets', 'Prisma'],
    suggestedProblems: [
      'Peer code review & synchronous collaborative pair programming room',
      'Spaced repetition flashcard engine for technical interview terms',
      'Interactive Git branch visualizer and simulation sandbox',
      'Automated lab assignment grading runner with instant test feedback'
    ]
  },
  {
    id: 'cybersecurity',
    name: 'Cybersecurity & Privacy',
    icon: 'ShieldCheck',
    defaultTech: ['Python', 'Bash', 'Docker', 'FastAPI', 'SQLite'],
    suggestedProblems: [
      'Zero-knowledge password health auditor & breach dictionary scanner',
      'Internal network port scanner & SSL certificate expiry watchdog',
      'Automated phishing email header analyzer and risk scorer',
      'Encrypted client-side file vault using Web Crypto AES-GCM'
    ]
  }
];

export const PRECONFIGURED_BLUEPRINTS: Record<string, Partial<ProjectBlueprint>> = {
  'agritech_beginner': {
    title: 'KisanCare: Plant Health Diagnostic & Vernacular Advisory',
    problemStatement: 'Smallholder farmers in semi-arid regions frequently lose up to 35% of crop yields due to late identification of pest infestations and lack of localized vernacular guidance.',
    proposedSolution: 'A responsive progressive web app that allows farmers to upload or capture photos of damaged leaves, identifies top fungal and pest conditions using lightweight image analysis, and provides remedy instructions in simple local language.',
    targetUsers: ['Smallholder farmers', 'Agricultural extension field officers', 'Village cooperative leaders'],
    features: [
      'Leaf image upload with automated validation of focus and lighting',
      'Diagnostic inference engine identifying Top 5 common crop ailments (Tomato blight, Rice blast, Cotton bollworm)',
      'Plain-language treatment protocols (Organic bio-pesticides vs Chemical options)',
      'Audio read-aloud feature for farmers with limited literacy',
      'Offline-first caching of treatment guides for low connectivity areas'
    ],
    systemArchitecture: {
      frontend: 'React 19 + Tailwind CSS with responsive camera capture and PWA offline storage',
      backend: 'FastAPI / Python lightweight server with REST endpoints for image evaluation and crop database',
      database: 'SQLite for disease profiles, symptoms, treatments, and seasonal crop calendars',
      externalServices: 'Web Speech API for native browser audio playback'
    },
    databaseDesign: {
      entities: [
        { name: 'Crops', fields: ['id', 'name', 'scientific_name', 'season', 'ideal_climate'] },
        { name: 'Diseases', fields: ['id', 'crop_id', 'common_name', 'symptoms', 'organic_remedy', 'chemical_remedy', 'severity'] },
        { name: 'DiagnosesHistory', fields: ['id', 'timestamp', 'crop_name', 'detected_disease', 'confidence_score', 'feedback_useful'] }
      ],
      notes: 'Compact relational schema designed for instant local retrieval without complex join overhead.'
    },
    testingChecklist: [
      'Verify image upload functions correctly on mobile cameras and file picker',
      'Ensure inference fallback returns useful guidance even if image quality is suboptimal',
      'Test audio playback across Chrome, Safari, and Firefox',
      'Verify application functions in airplane mode with cached disease manuals'
    ],
    futureEnhancements: [
      'Integration with local weather forecasts to alert farmers ahead of high-humidity blight periods',
      'WhatsApp bot interface for ultra-low friction photo submissions',
      'Government subsidized fertilizer retailer locator'
    ],
    demoPresentationTips: [
      'Start with a 30-second problem anecdote: Show a picture of an infected leaf and ask the audience how a farmer without an agronomist nearby would diagnose it.',
      'Demonstrate live mobile capture, show instant diagnosis, and play the vernacular audio prompt.',
      'Show the offline resilience test by disconnecting WiFi and still viewing previously accessed guides.'
    ]
  }
};
