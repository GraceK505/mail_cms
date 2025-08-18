import { EmailTemplates } from '../../models/template';

const subjectList = [
  'breaking-new-horizons',
  'ai-in-everyday-life',
  'electric-vehicles',
  'minimalism-art',
  'healthy-eating-trends',
  'sustainable-fashion',
  'remote-work-era',
  'mindfulness-practices',
  'cryptocurrency-future',
  'green-energy-movement',
  'future-of-robotics',
  'quantum-computing-revolution',
  'cybersecurity-threats',
  'digital-privacy-rights',
  'autonomous-transportation',
];

export const emailDataset: EmailTemplates[] = Array.from(
  { length: 15 },
  (_, index) => {
    return {
      name: subjectList[index],
      component: 'Breaking New Horizons',
    };
  }
);
