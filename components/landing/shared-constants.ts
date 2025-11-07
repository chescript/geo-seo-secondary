// Shared constants for landing page components

export const EXAMPLE_URL = 'www.chatsy.com';

export const MOCK_CHECKS = [
  {
    id: 'llms-txt',
    label: 'No llms.txt file found',
    title: 'LLMs.txt',
    status: 'pass' as const,
    score: 0,
    details: 'Add an llms.txt file to define AI usage permissions',
    recommendation: 'Add an llms.txt file to define AI usage permissions'
  },
  {
    id: 'robots-txt',
    label: 'LLMs.TXT',
    title: 'Robots.txt',
    status: 'pass' as const,
    score: 100,
    details: 'Add an llms.txt file to define AI usage permissions',
    recommendation: ''
  },
  {
    id: 'sitemap',
    label: 'LLMs.TXT',
    title: 'Sitemap',
    status: 'pass' as const,
    score: 100,
    details: 'Add an llms.txt file to define AI usage permissions',
    recommendation: ''
  },
  {
    id: 'heading-hierarchy',
    label: 'LLMs.TXT',
    title: 'Heading Hierarchy',
    status: 'pass' as const,
    score: 65,
    details: 'Multiple H1s (2) create topic ambiguity, Skipped heading.',
    recommendation: 'Use exactly one H1 and maintain logical heading hierarchy (H1→H2→H3)'
  },
  {
    id: 'content-readability',
    label: 'No llms.txt file found',
    title: 'Content Readability',
    status: 'pass' as const,
    score: 48,
    details: 'Difficult to read (Flesch: 48)',
    recommendation: 'Simplify sentences and use clearer language for better AI comprehension'
  },
  {
    id: 'metadata-quality',
    label: 'LLMs.TXT',
    title: 'Metadata Quality',
    status: 'pass' as const,
    score: 85,
    details: 'Title ✓, Description',
    recommendation: ''
  },
  {
    id: 'semantic-html',
    label: 'LLMs.TXT',
    title: 'Semantic HTML',
    status: 'pass' as const,
    score: 90,
    details: 'Found 1 semantic HTML5 elements',
    recommendation: 'Use more semantic HTML5 elements (article, nav, main, section, etc.)'
  },
  {
    id: 'accessibility',
    label: 'LLMs.TXT',
    title: 'Accessibility',
    status: 'pass' as const,
    score: 100,
    details: '100% images have alt text, ARIA labels: Yes',
    recommendation: ''
  },
];

export const MOCK_RECOMMENDATIONS = [
  'Add an llms.txt file to define AI usage permissions',
  'Use exactly one H1 and maintain logical heading hierarchy (H1→H2→H3)',
  'Simplify sentences and use clearer language for better AI comprehension',
  'Use more semantic HTML5 elements (article, nav, main, section, etc.)',
];

export const MOCK_SCORES = {
  overall: 90,
  seo: 95,
  content: 73,
};
