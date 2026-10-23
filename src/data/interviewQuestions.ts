import { InterviewQuestion } from '../types';

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  // WEB DEVELOPMENT
  {
    id: 'web_1',
    role: 'fullstack',
    topic: 'Web Development',
    difficulty: 'Beginner',
    question: 'Explain the difference between synchronous and asynchronous operations in JavaScript, and how Promises solve callback hell.',
    hints: [
      'Mention the single-threaded nature of JavaScript and the Event Loop.',
      'Explain what happens when long network requests or timers run.',
      'Contrast deeply nested callbacks with `.then()` or `async/await` syntax.'
    ],
    conceptExplanation: 'JavaScript runs on a single thread with an Event Loop. Synchronous code blocks execution until finished, whereas asynchronous code delegates tasks (like HTTP requests, file I/O, or timers) to browser/Node APIs and handles completion through the callback queue and microtask queue. Promises provide a structured object representing future completion, avoiding pyramid-of-doom nested callbacks through method chaining and async/await.',
    idealAnswer: 'In JavaScript, synchronous execution means code is evaluated sequentially, where each operation blocks the main execution thread until it completes. Asynchronous execution allows time-consuming tasks (like fetching data over the network) to run in the background without blocking UI rendering or user input. Historically, asynchronous code relied on callback functions passed into other callbacks, leading to unreadable, hard-to-maintain "callback hell". Promises solve this by providing a first-class object that represents the eventual completion or failure of an async operation with states (pending, fulfilled, rejected). This allows flat chaining using `.then()` or synchronous-looking `async/await` syntax with unified `try/catch` error handling.',
    keyEvaluationKeywords: ['single thread', 'event loop', 'blocking', 'callback hell', 'promise', 'async', 'await', 'pending', 'fulfilled', 'microtask']
  },
  {
    id: 'web_2',
    role: 'fullstack',
    topic: 'Web Development',
    difficulty: 'Intermediate',
    question: 'How does React Virtual DOM work, and what role do keys play when rendering dynamic lists?',
    hints: [
      'Explain reconciliation and diffing.',
      'Contrast updating real DOM nodes directly vs in-memory tree comparisons.',
      'Explain what bugs occur when using list index as key.'
    ],
    conceptExplanation: 'The Virtual DOM is an in-memory representation of real DOM elements. When state changes, React creates a new virtual DOM tree, computes differences with the previous tree (reconciliation), and batches minimal real DOM updates. Keys give list elements stable identities so React knows which items changed, moved, or were deleted without unmounting and remounting the entire list.',
    idealAnswer: 'The Virtual DOM is a lightweight JavaScript object representation of the actual browser DOM. When a component’s state or props change, React generates a new Virtual DOM tree and runs a diffing algorithm (reconciliation) against the previous tree. It calculates the minimum necessary real DOM mutations and batches them, which is far faster than re-rendering the entire actual DOM. In dynamic lists, the `key` attribute provides a persistent, unique identity for each item across renders. This enables React to recognize whether an item has been reordered, added, or removed, rather than re-rendering all children. Using unstable keys like array indices can lead to state bleeding and visual glitches when items are inserted or removed.',
    keyEvaluationKeywords: ['virtual dom', 'reconciliation', 'diffing', 'in-memory', 'real dom', 'keys', 'identity', 'reorder', 'performance', 'batch']
  },
  // SQL
  {
    id: 'sql_1',
    role: 'data-analyst',
    topic: 'SQL',
    difficulty: 'Intermediate',
    question: 'What is the difference between a Window Function (e.g., ROW_NUMBER, RANK, DENSE_RANK) and a standard GROUP BY aggregation?',
    hints: [
      'Think about how many rows are returned in each case.',
      'Explain the OVER() clause and PARTITION BY.',
      'Compare ties between RANK and DENSE_RANK.'
    ],
    conceptExplanation: 'A standard `GROUP BY` collapses multiple rows into a single summary row per group. A Window Function performs a calculation across a set of table rows related to the current row, but retains each original row without collapsing the output.',
    idealAnswer: 'The fundamental difference is row cardinality: `GROUP BY` collapses multiple input rows into a single aggregated summary row per group, whereas a Window Function calculates an aggregate or analytical value across a window of rows while preserving every individual input row. Window functions use the `OVER (PARTITION BY ... ORDER BY ...)` clause. Furthermore, within ranking functions: `ROW_NUMBER()` assigns sequential numbers regardless of ties (1, 2, 3); `RANK()` leaves gaps after duplicate values (1, 2, 2, 4); and `DENSE_RANK()` advances consecutively without leaving gaps (1, 2, 2, 3).',
    keyEvaluationKeywords: ['row', 'collapse', 'group by', 'over', 'partition by', 'retain', 'row_number', 'rank', 'dense_rank', 'ties', 'aggregate']
  },
  {
    id: 'sql_2',
    role: 'fullstack',
    topic: 'SQL',
    difficulty: 'Beginner',
    question: 'Explain the difference between INNER JOIN, LEFT JOIN, and RIGHT JOIN with a practical scenario.',
    hints: [
      'Explain what happens to non-matching rows in both tables.',
      'Give an example with Users and Orders.',
      'Mention NULL values in unmatched records.'
    ],
    conceptExplanation: 'JOINs combine columns from two tables based on a related key. INNER JOIN returns only records where the condition matches in both tables. LEFT JOIN returns all records from the left table and matching records from the right (filling NULL where missing). RIGHT JOIN does the reverse.',
    idealAnswer: 'Consider two tables: `Users` (left) and `Orders` (right). An `INNER JOIN` returns only users who have placed at least one order; users with zero orders are excluded. A `LEFT JOIN` returns every user from the `Users` table regardless of whether they ordered anything; for users with no orders, the order fields will be filled with `NULL`. A `RIGHT JOIN` returns all orders, including any order that does not have an associated user (or orphaned orders). In practice, `LEFT JOIN` is commonly used to find customers without purchases or retain primary entity records.',
    keyEvaluationKeywords: ['inner join', 'left join', 'right join', 'match', 'null', 'unmatched', 'records', 'foreign key']
  },
  // MACHINE LEARNING
  {
    id: 'ml_1',
    role: 'aiml',
    topic: 'Machine Learning',
    difficulty: 'Intermediate',
    question: 'Explain the Bias-Variance tradeoff. How do underfitting and overfitting relate to this, and how do you combat them?',
    hints: [
      'Define high bias (assumptions too simple) vs high variance (too sensitive to noise).',
      'Mention regularization (L1/L2), cross-validation, and data augmentation.',
      'Relate training loss vs validation loss.'
    ],
    conceptExplanation: 'Bias is error stemming from erroneous or oversimplified assumptions in the learning algorithm (underfitting). Variance is error from excessive sensitivity to small fluctuations and noise in the training data (overfitting). As model complexity increases, bias decreases but variance increases. The goal is to find the sweet spot that minimizes total generalization error.',
    idealAnswer: 'The Bias-Variance tradeoff represents the tension between model simplicity and model flexibility. High bias occurs when an algorithm makes overly simplistic assumptions about data patterns, leading to Underfitting, where the model performs poorly on both training and test data. High variance occurs when a model captures random noise and idiosyncrasies in the training dataset, leading to Overfitting, characterized by near-perfect training accuracy but poor generalization to unseen validation data. To combat underfitting, one increases model complexity, adds engineered features, or reduces regularization. To combat overfitting, techniques include L1/L2 regularization, dropout, pruning trees, gathering more training data, and rigorous k-fold cross-validation.',
    keyEvaluationKeywords: ['bias', 'variance', 'tradeoff', 'underfitting', 'overfitting', 'regularization', 'generalization', 'noise', 'complexity', 'validation']
  },
  // DATA STRUCTURES
  {
    id: 'dsa_1',
    role: 'fullstack',
    topic: 'Data Structures',
    difficulty: 'Intermediate',
    question: 'How does a Hash Table achieve average O(1) time complexity for search, insertion, and deletion? What happens during a collision?',
    hints: [
      'Explain the hash function mapping keys to indices.',
      'Explain collision resolution strategies: separate chaining vs open addressing.',
      'Mention worst-case complexity when collisions degrade to a linked list.'
    ],
    conceptExplanation: 'A Hash Table uses a hash function to compute an index in an underlying array from a key. When distinct keys produce the identical bucket index (collision), collision resolution strategies like separate chaining (linked list / balanced tree at each bucket) or open addressing (linear/quadratic probing) are used.',
    idealAnswer: 'A Hash Table achieves average O(1) time complexity by applying a deterministic hash function to an input key, which converts it into an integer index mapping directly into a fixed-size contiguous array bucket. Because array index lookup is instant O(1) in memory, retrieval is typically constant time. However, when two distinct keys yield the same index, a collision occurs. Collision resolution methods include Separate Chaining (where each bucket holds a linked list or red-black tree of colliding elements) and Open Addressing (where colliding elements probe alternative open slots in the array, such as linear probing or double hashing). If the hash function is poor or load factor is too high, worst-case lookup can degrade to O(N).',
    keyEvaluationKeywords: ['hash function', 'constant time', 'o(1)', 'collision', 'separate chaining', 'open addressing', 'bucket', 'load factor', 'linked list', 'worst case']
  },
  // HR & BEHAVIORAL
  {
    id: 'hr_1',
    role: 'general',
    topic: 'HR & Behavioral',
    difficulty: 'Beginner',
    question: 'Tell me about a technical project where you faced a significant obstacle or bug. How did you diagnose the issue and resolve it?',
    hints: [
      'Use the STAR method: Situation, Task, Action, Result.',
      'Focus on your systematic debugging approach rather than just luck.',
      'Share what you learned from the experience.'
    ],
    conceptExplanation: 'Interviewers look for evidence of methodical problem-solving, resilience under frustration, effective communication, and continuous learning when things go wrong.',
    idealAnswer: 'When answering, structure your narrative using the STAR framework (Situation, Task, Action, Result). State the context of your project and the deadline or goal. Clearly describe the specific obstacle (e.g., unexpected CORS blocking, memory leak under load, or race condition in state). Highlight your systematic diagnostic steps: isolating reproducing conditions, reading server logs, setting breakpoints, or isolating network payloads rather than blindly guessing. Explain the exact solution implemented, and conclude with the concrete outcome (e.g., successful deployment, latency reduced by 40%) and key architectural takeaway.',
    keyEvaluationKeywords: ['star', 'situation', 'task', 'action', 'result', 'systematic', 'debugging', 'logs', 'resolution', 'outcome', 'learning']
  },
  {
    id: 'hr_2',
    role: 'general',
    topic: 'HR & Behavioral',
    difficulty: 'Beginner',
    question: 'Why do you want to join a technical career, and how do you stay updated with rapidly evolving technology?',
    hints: [
      'Connect personal curiosity with real-world impact.',
      'Mention specific resources: official docs, GitHub repositories, technical RFCs, tech communities.',
      'Discuss how you apply new knowledge through hands-on side projects.'
    ],
    conceptExplanation: 'Companies seek developers who demonstrate genuine intrinsic curiosity, proactive self-learning, and the discipline to adopt emerging standards without needing constant supervision.',
    idealAnswer: 'I am drawn to technology because it is one of the few domains where a single developer or small team can construct solutions that directly solve tangible problems for thousands of people. To stay ahead of rapid evolution, I follow a three-pronged approach: First, I read primary documentation, release notes, and community RFCs for tools I use. Second, I actively participate in developer communities, follow engineering blogs from teams like Cloudflare or Uber, and review open-source repos. Third, whenever a compelling paradigm emerges, I build a small working prototype rather than just reading about it, which cements real understanding.',
    keyEvaluationKeywords: ['curiosity', 'impact', 'documentation', 'prototype', 'hands-on', 'open source', 'continuous learning', 'discipline']
  }
];
