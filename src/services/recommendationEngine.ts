import { CareerId, CareerPathway, DNAReport } from '../types';
import { CAREER_PATHWAYS } from '../data/careersData';
import { DNA_QUESTIONS } from '../data/dnaQuestions';

export interface UserAssessmentAnswers {
  subjects: string[];
  work_style: string[];
  programming_level: string;
  technologies_known: string[];
  career_goal: string;
  daily_time: string;
}

export function generateCareerDNAReport(answers: UserAssessmentAnswers): DNAReport {
  // Score career tracks based on user answers
  const careerScores: Record<CareerId, number> = {
    fullstack: 10,
    aiml: 10,
    'data-analyst': 10,
    'cloud-devops': 10,
    cybersecurity: 10,
    uiux: 10
  };

  const currentSkills: string[] = [];
  const whyReasons: Record<CareerId, string[]> = {
    fullstack: [],
    aiml: [],
    'data-analyst': [],
    'cloud-devops': [],
    cybersecurity: [],
    uiux: []
  };

  // 1. Process subjects
  answers.subjects.forEach(subId => {
    const q = DNA_QUESTIONS[0].options.find(o => o.id === subId);
    if (q) {
      q.associatedCareers.forEach(c => {
        careerScores[c] += 18;
        whyReasons[c].push(`You expressed deep interest in ${q.label}.`);
      });
    }
  });

  // 2. Process work style
  answers.work_style.forEach(styleId => {
    const opt = DNA_QUESTIONS[1].options.find(o => o.id === styleId);
    if (opt) {
      opt.associatedCareers.forEach(c => {
        careerScores[c] += 16;
        whyReasons[c].push(`Your day-to-day excitement for "${opt.label.toLowerCase()}" is a foundational pillar here.`);
      });
    }
  });

  // 3. Process programming level
  if (answers.programming_level === 'absolute_beginner') {
    careerScores['uiux'] += 15;
    careerScores['data-analyst'] += 14;
    careerScores['fullstack'] += 10;
  } else if (answers.programming_level === 'early_learner') {
    careerScores['fullstack'] += 14;
    careerScores['data-analyst'] += 12;
    careerScores['aiml'] += 10;
  } else if (answers.programming_level === 'intermediate_builder') {
    careerScores['fullstack'] += 16;
    careerScores['aiml'] += 15;
    careerScores['cloud-devops'] += 14;
    careerScores['cybersecurity'] += 13;
  } else {
    careerScores['fullstack'] += 15;
    careerScores['cloud-devops'] += 15;
    careerScores['aiml'] += 14;
  }

  // 4. Process technologies known
  answers.technologies_known.forEach(techId => {
    const opt = DNA_QUESTIONS[3].options.find(o => o.id === techId);
    if (opt) {
      opt.associatedCareers.forEach(c => {
        careerScores[c] += 12;
      });
      if (opt.skillsExtracted) {
        currentSkills.push(...opt.skillsExtracted);
      }
    }
  });

  // 5. Process career goal
  if (answers.career_goal === 'goal_campus_placement') {
    careerScores['fullstack'] += 12;
    careerScores['data-analyst'] += 10;
  } else if (answers.career_goal === 'goal_portfolio_projects') {
    careerScores['fullstack'] += 12;
    careerScores['aiml'] += 12;
    careerScores['uiux'] += 10;
  }

  // Rank career tracks
  const ranked = (Object.keys(careerScores) as CareerId[]).sort((a, b) => careerScores[b] - careerScores[a]);

  const topCareerId = ranked[0];
  const secondCareerId = ranked[1];
  const thirdCareerId = ranked[2];

  const primaryCareer = CAREER_PATHWAYS.find(c => c.id === topCareerId) || CAREER_PATHWAYS[0];
  const secondCareer = CAREER_PATHWAYS.find(c => c.id === secondCareerId) || CAREER_PATHWAYS[1];
  const thirdCareer = CAREER_PATHWAYS.find(c => c.id === thirdCareerId) || CAREER_PATHWAYS[2];

  // Calculate dynamic match percentage
  const maxPossible = Math.max(careerScores[topCareerId], 85);
  const topMatchScore = Math.min(97, Math.max(76, Math.round((careerScores[topCareerId] / maxPossible) * 94)));
  const secondMatchScore = Math.min(topMatchScore - 4, Math.max(65, Math.round((careerScores[secondCareerId] / maxPossible) * 88)));
  const thirdMatchScore = Math.min(secondMatchScore - 5, Math.max(58, Math.round((careerScores[thirdCareerId] / maxPossible) * 80)));

  // Identify skills to develop
  const requiredPrimarySkillNames = primaryCareer.requiredSkills.map(s => s.name);
  const skillsToDevelop = requiredPrimarySkillNames.filter(req => !currentSkills.some(cur => cur.toLowerCase().includes(req.split(' ')[0].toLowerCase())));

  // Radar metrics comparing current estimated strength vs benchmark
  const radarMetrics = [
    {
      skill: 'Core Logic & Coding',
      currentScore: answers.programming_level === 'absolute_beginner' ? 25 : answers.programming_level === 'early_learner' ? 50 : 75,
      targetScore: 85
    },
    {
      skill: 'Domain Architecture',
      currentScore: answers.technologies_known.length > 4 ? 60 : answers.technologies_known.length > 2 ? 40 : 20,
      targetScore: 80
    },
    {
      skill: 'Problem Solving & Math',
      currentScore: answers.subjects.includes('ai_math') || answers.subjects.includes('data_stats') ? 70 : 45,
      targetScore: 75
    },
    {
      skill: 'User & System Empathy',
      currentScore: answers.work_style.includes('crafting_ui') || answers.work_style.includes('collaborating_people') ? 80 : 50,
      targetScore: 75
    },
    {
      skill: 'Tooling & Deployment',
      currentScore: answers.technologies_known.includes('tech_git') || answers.technologies_known.includes('tech_linux') ? 65 : 30,
      targetScore: 75
    }
  ];

  // Tailored 30-day action plan (4 weeks)
  const thirtyDayPlan = [
    {
      week: 1,
      title: 'Foundation Lockdown & Syntax Fluency',
      goals: [
        `Consolidate foundational core syntax and environment setup for ${primaryCareer.title}`,
        'Initialize a dedicated GitHub repository for daily learning commits',
        `Master fundamental principles: ${skillsToDevelop[0] || 'Core Syntax & Best Practices'}`
      ],
      keyMilestone: 'Build and push a working sandbox script or mini-component to GitHub.'
    },
    {
      week: 2,
      title: 'Architectural Mechanics & Data Flow',
      goals: [
        `Tackle second key competency: ${skillsToDevelop[1] || 'State & Data Structures'}`,
        'Understand async execution, state patterns, and API connectivity',
        'Solve 5 curated problem-solving exercises related to this stack'
      ],
      keyMilestone: 'Deploy a connected prototype fetching and rendering dynamic data.'
    },
    {
      week: 3,
      title: 'Capstone Blueprint Construction',
      goals: [
        `Begin building recommended project: "${primaryCareer.exampleProjects[0]?.title || 'Portfolio Capstone'}"`,
        'Implement clean database/storage schema and responsive layout',
        'Write modular components with comprehensive error boundaries'
      ],
      keyMilestone: 'Complete 70% of the core functionality with live preview.'
    },
    {
      week: 4,
      title: 'Testing, Deployment & Placement Narrative',
      goals: [
        'Deploy application to cloud provider (Vercel, Render, or Cloud Run)',
        'Write an executive README.md detailing architecture, challenges, and measurable performance',
        'Record a 90-second Loom/video walkthrough explaining design decisions'
      ],
      keyMilestone: 'Ready-to-share portfolio artifact added to your resume and LinkedIn.'
    }
  ];

  // Unique Why Fit synthesis
  const compiledWhy: string[] = whyReasons[topCareerId].length > 0 
    ? whyReasons[topCareerId].slice(0, 3)
    : [
        `Your strengths in logical decomposition directly match the daily cadence of a ${primaryCareer.title}.`,
        `Given your current background, this track offers the highest return on investment for your placement timeline.`,
        `The market demand for this specialty aligns with your goal of ${answers.career_goal.replace(/_/g, ' ')}.`
      ];

  return {
    generatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    primaryCareer,
    secondaryCareers: [
      {
        career: secondCareer,
        matchScore: secondMatchScore,
        reason: whyReasons[secondCareerId][0] || `High overlap in analytical reasoning and systems fundamentals.`
      },
      {
        career: thirdCareer,
        matchScore: thirdMatchScore,
        reason: whyReasons[thirdCareerId][0] || `Valuable adjacent pathway if you desire more visual or investigative focus.`
      }
    ],
    matchScore: topMatchScore,
    whyFit: compiledWhy,
    currentSkillsIdentified: currentSkills.length > 0 ? Array.from(new Set(currentSkills)) : ['Computer Literacy', 'Analytical Thinking', 'Problem Solving'],
    skillsToDevelop: skillsToDevelop.slice(0, 5),
    recommendedProjects: primaryCareer.exampleProjects.map(p => ({
      title: p.title,
      description: p.desc,
      tech: p.tech,
      difficulty: 'Beginner to Intermediate',
      estimatedDays: 14
    })),
    thirtyDayPlan,
    placementAdvice: {
      resumeFocus: `Highlight 2 deployed projects demonstrating ${skillsToDevelop.slice(0, 2).join(' and ')} rather than listing generic coursework.`,
      targetPortfolioPiece: primaryCareer.exampleProjects[0]?.title || 'Full Stack Capstone',
      interviewPillar: `Prepare to defend your architectural tradeoffs, debugging process (STAR method), and performance optimizations.`
    },
    radarMetrics
  };
}
