import { InterviewQuestion } from '../types';

export interface EvaluationResult {
  score: number; // 0 to 100
  verdict: 'Excellent' | 'Good' | 'Needs Practice' | 'Incomplete';
  strengths: string[];
  improvements: string[];
  matchedKeywords: string[];
  missedKeywords: string[];
  detailedFeedback: string;
}

export function evaluateStudentAnswer(question: InterviewQuestion, answer: string): EvaluationResult {
  const trimmed = answer.trim();

  if (!trimmed || trimmed.length < 15) {
    return {
      score: 15,
      verdict: 'Incomplete',
      strengths: ['Attempted to submit a response.'],
      improvements: [
        'Answer is too brief to evaluate technical depth.',
        'Please expand with concrete terminology, mechanisms, and real-world trade-offs.'
      ],
      matchedKeywords: [],
      missedKeywords: question.keyEvaluationKeywords.slice(0, 5),
      detailedFeedback: 'Your response was too short for a standard interview evaluation. In an actual interview, provide structured explanations covering definitions, internal mechanisms, and practical examples.'
    };
  }

  const normalizedAnswer = trimmed.toLowerCase();
  const matchedKeywords: string[] = [];
  const missedKeywords: string[] = [];

  question.keyEvaluationKeywords.forEach(kw => {
    if (normalizedAnswer.includes(kw.toLowerCase())) {
      matchedKeywords.push(kw);
    } else {
      missedKeywords.push(kw);
    }
  });

  const keywordCoverage = matchedKeywords.length / Math.max(1, question.keyEvaluationKeywords.length);
  
  // Length & depth heuristic
  const wordCount = trimmed.split(/\s+/).length;
  let depthScore = 20;
  if (wordCount >= 30) depthScore = 40;
  if (wordCount >= 60) depthScore = 60;
  if (wordCount >= 100) depthScore = 80;
  if (wordCount >= 140) depthScore = 90;

  // Composite score calculation
  const calculatedScore = Math.min(98, Math.round((keywordCoverage * 65) + (depthScore * 0.35)));

  const strengths: string[] = [];
  const improvements: string[] = [];

  if (matchedKeywords.length >= 3) {
    strengths.push(`Successfully demonstrated understanding of core concepts: "${matchedKeywords.slice(0, 3).join(', ')}".`);
  } else if (matchedKeywords.length > 0) {
    strengths.push(`Mentioned relevant principle: "${matchedKeywords[0]}".`);
  }

  if (wordCount >= 50) {
    strengths.push('Good structured explanation length suitable for an interview response.');
  }

  if (missedKeywords.length > 0) {
    improvements.push(`Consider mentioning: "${missedKeywords.slice(0, 3).join('", "')}" to demonstrate deeper technical command.`);
  }

  if (question.topic === 'HR & Behavioral' && !normalizedAnswer.includes('situation') && !normalizedAnswer.includes('action') && !normalizedAnswer.includes('result')) {
    improvements.push('Try using the STAR format (Situation, Task, Action, Result) to make your story punchy.');
  }

  let verdict: EvaluationResult['verdict'] = 'Needs Practice';
  if (calculatedScore >= 80) verdict = 'Excellent';
  else if (calculatedScore >= 65) verdict = 'Good';

  let detailedFeedback = `Your response demonstrated familiarity with the topic. `;
  if (calculatedScore >= 80) {
    detailedFeedback += `Strong answer! You articulated key mechanisms clearly and used appropriate industry terminology.`;
  } else if (calculatedScore >= 60) {
    detailedFeedback += `Solid foundation, but expanding on the underlying mechanics and edge cases would elevate this into a top-percentile response.`;
  } else {
    detailedFeedback += `Review the concept explanation and sample answer to incorporate missing foundational principles.`;
  }

  return {
    score: Math.max(30, calculatedScore),
    verdict,
    strengths: strengths.length > 0 ? strengths : ['Clear communication tone.'],
    improvements: improvements.length > 0 ? improvements : ['Add an illustrative real-world code or architecture example.'],
    matchedKeywords,
    missedKeywords,
    detailedFeedback
  };
}
