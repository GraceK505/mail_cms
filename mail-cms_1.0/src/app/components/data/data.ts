import { Template } from '../../models/template';

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

export const templates: Template[] = Array.from({ length: 15 }, (_, index) => {
  return {
    id: subjectList[index],
    name: subjectList[index],
    data: {
      pages: [
        {
          name: 'Home',
          component: '<mjml><mj-body width="660px" margin="auto"><mj-section><mj-column width="660px" margin="0 auto"><mj-text>Template ' +
            subjectList[index] +
            ' - Welcome!</mj-text></mj-column></mj-section></mj-body></mjml>',
        },
      ],
    },
  };
});
