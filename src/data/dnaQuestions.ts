import { DNAQuestion } from '../types';

export const DNA_QUESTIONS: DNAQuestion[] = [
  {
    id: 'subjects',
    title: 'Which academic or technical domains intrigue you the most?',
    subtitle: 'Select all subjects that spark your curiosity and engagement.',
    isMultiSelect: true,
    options: [
      {
        id: 'web_tech',
        label: 'Web Technologies & Internet Systems',
        description: 'How modern websites, web applications, and web services connect the world.',
        associatedCareers: ['fullstack', 'cloud-devops']
      },
      {
        id: 'ai_math',
        label: 'Artificial Intelligence & Machine Learning',
        description: 'Neural networks, algorithms that learn from data, and generative models.',
        associatedCareers: ['aiml', 'data-analyst']
      },
      {
        id: 'data_stats',
        label: 'Data Science, Statistics & Visual Trends',
        description: 'Finding patterns, uncovering hidden truths, and answering questions with evidence.',
        associatedCareers: ['data-analyst', 'aiml']
      },
      {
        id: 'cloud_infra',
        label: 'Cloud Infrastructure & Server Architecture',
        description: 'Automating high-scale systems, networks, data pipelines, and server reliability.',
        associatedCareers: ['cloud-devops', 'cybersecurity']
      },
      {
        id: 'cyber_security',
        label: 'Cybersecurity, Cryptography & Defense',
        description: 'Protecting systems against threats, ethical hacking, and vulnerability auditing.',
        associatedCareers: ['cybersecurity', 'cloud-devops']
      },
      {
        id: 'design_human',
        label: 'Human-Computer Interaction & Visual Design',
        description: 'Creating clean interfaces, user psychology, and intuitive digital experiences.',
        associatedCareers: ['uiux', 'fullstack']
      }
    ]
  },
  {
    id: 'work_style',
    title: 'What kind of work do you genuinely enjoy doing day-to-day?',
    subtitle: 'Think about when you feel most energized and in the flow.',
    isMultiSelect: true,
    options: [
      {
        id: 'crafting_ui',
        label: 'Designing visual interfaces & user journeys',
        description: 'Playing with colors, typography, layout, animations, and visual polish.',
        associatedCareers: ['uiux', 'fullstack']
      },
      {
        id: 'coding_logic',
        label: 'Writing software logic, APIs & data structures',
        description: 'Structuring clean code, building features, and connecting components.',
        associatedCareers: ['fullstack', 'aiml', 'cloud-devops']
      },
      {
        id: 'analyzing_numbers',
        label: 'Exploring data tables, charts & generating insights',
        description: 'Querying tables, plotting correlations, and extracting business stories.',
        associatedCareers: ['data-analyst', 'aiml']
      },
      {
        id: 'solving_puzzles',
        label: 'Investigating vulnerabilities & security puzzles',
        description: 'Deep diving into how systems break, forensic investigation, and defense.',
        associatedCareers: ['cybersecurity']
      },
      {
        id: 'automating_systems',
        label: 'Configuring servers, containers & automation',
        description: 'Automating repetitive tasks, writing scripts, and managing deploy pipelines.',
        associatedCareers: ['cloud-devops', 'cybersecurity']
      },
      {
        id: 'collaborating_people',
        label: 'Understanding user feedback & collaborating across teams',
        description: 'Interviewing users, translating requirements, and presenting solutions.',
        associatedCareers: ['uiux', 'data-analyst', 'fullstack']
      }
    ]
  },
  {
    id: 'programming_level',
    title: 'What is your current programming experience level?',
    subtitle: 'Be honest — this helps us construct an achievable learning velocity for you.',
    isMultiSelect: false,
    options: [
      {
        id: 'absolute_beginner',
        label: 'Absolute Beginner',
        description: 'Never written code before or only tried a few basic lines. Looking for a clear starting path.',
        associatedCareers: ['uiux', 'data-analyst', 'fullstack']
      },
      {
        id: 'early_learner',
        label: 'Early Learner',
        description: 'Know variables, loops, and basic syntax in Python, C, Java, or JavaScript.',
        associatedCareers: ['fullstack', 'data-analyst', 'aiml']
      },
      {
        id: 'intermediate_builder',
        label: 'Intermediate Builder',
        description: 'Built simple scripts, academic projects, or web pages. Need industry-standard project rigor.',
        associatedCareers: ['fullstack', 'aiml', 'cloud-devops', 'cybersecurity']
      },
      {
        id: 'placement_seeker',
        label: 'Placement Ready / Final Year',
        description: 'Comfortable with programming, now focused on real-world projects and placement rounds.',
        associatedCareers: ['fullstack', 'aiml', 'cloud-devops', 'cybersecurity', 'data-analyst']
      }
    ]
  },
  {
    id: 'technologies_known',
    title: 'Which of these technologies have you worked with or touched?',
    subtitle: 'Select any tools, languages, or platforms you have at least basic familiarity with.',
    isMultiSelect: true,
    options: [
      { id: 'tech_c_cpp', label: 'C / C++', skillsExtracted: ['C / C++ Foundations', 'Pointers & Memory'], associatedCareers: ['cybersecurity', 'cloud-devops', 'aiml'] },
      { id: 'tech_java', label: 'Java / OOP', skillsExtracted: ['Java Core', 'Object-Oriented Design'], associatedCareers: ['fullstack', 'cloud-devops'] },
      { id: 'tech_python', label: 'Python', skillsExtracted: ['Python Programming', 'Data Scripts'], associatedCareers: ['aiml', 'data-analyst', 'cybersecurity'] },
      { id: 'tech_html_css', label: 'HTML / CSS', skillsExtracted: ['HTML Semantics', 'CSS Styling'], associatedCareers: ['fullstack', 'uiux'] },
      { id: 'tech_javascript', label: 'JavaScript', skillsExtracted: ['JavaScript Fundamentals', 'DOM APIs'], associatedCareers: ['fullstack', 'uiux'] },
      { id: 'tech_react', label: 'React / Next.js', skillsExtracted: ['React Components', 'Frontend State'], associatedCareers: ['fullstack'] },
      { id: 'tech_sql', label: 'SQL / Databases', skillsExtracted: ['SQL Queries', 'Relational Schemas'], associatedCareers: ['data-analyst', 'fullstack'] },
      { id: 'tech_git', label: 'Git / GitHub', skillsExtracted: ['Version Control', 'Git Commits'], associatedCareers: ['fullstack', 'cloud-devops', 'aiml'] },
      { id: 'tech_linux', label: 'Linux / Terminal', skillsExtracted: ['Command Line', 'Bash Basics'], associatedCareers: ['cloud-devops', 'cybersecurity'] },
      { id: 'tech_figma', label: 'Figma / Design Tools', skillsExtracted: ['Wireframing', 'Visual Prototyping'], associatedCareers: ['uiux'] }
    ]
  },
  {
    id: 'career_goal',
    title: 'What is your primary milestone or career target right now?',
    subtitle: 'We calibrate recommendations to align with your immediate destination.',
    isMultiSelect: false,
    options: [
      {
        id: 'goal_campus_placement',
        label: 'Secure a Campus Tech Placement',
        description: 'Clear company technical assessments, coding rounds, and interview panels.',
        associatedCareers: ['fullstack', 'aiml', 'cloud-devops', 'data-analyst']
      },
      {
        id: 'goal_internship',
        label: 'Land a High-Quality Tech Internship',
        description: 'Gain practical industry experience with a live stipend before graduation.',
        associatedCareers: ['fullstack', 'uiux', 'data-analyst', 'aiml']
      },
      {
        id: 'goal_switch_tech',
        label: 'Transition into Tech from Non-CS / Core',
        description: 'Clear, structured path to build strong coding fundamentals from the ground up.',
        associatedCareers: ['data-analyst', 'fullstack', 'uiux']
      },
      {
        id: 'goal_portfolio_projects',
        label: 'Build Strong Portfolio Projects That Stand Out',
        description: 'Move past tutorial clones to architect genuine resume-worthy products.',
        associatedCareers: ['fullstack', 'aiml', 'cloud-devops', 'uiux']
      }
    ]
  },
  {
    id: 'daily_time',
    title: 'How much focused time can you dedicate each day?',
    subtitle: 'Realistic commitments guarantee steady, sustainable skill progression.',
    isMultiSelect: false,
    options: [
      {
        id: 'time_1_2_hours',
        label: '1 to 2 Hours per day',
        description: 'Balanced for heavy college semesters or exam periods.',
        associatedCareers: ['data-analyst', 'uiux', 'fullstack']
      },
      {
        id: 'time_3_4_hours',
        label: '3 to 4 Hours per day',
        description: 'Ideal pace for deep learning and consistent coding progress.',
        associatedCareers: ['fullstack', 'aiml', 'cloud-devops', 'cybersecurity']
      },
      {
        id: 'time_5_plus_hours',
        label: '5+ Hours per day (Intensive Sprint)',
        description: 'Accelerated bootcamp-style focus for rapid upskilling and immediate hiring.',
        associatedCareers: ['fullstack', 'aiml', 'cloud-devops']
      }
    ]
  }
];
