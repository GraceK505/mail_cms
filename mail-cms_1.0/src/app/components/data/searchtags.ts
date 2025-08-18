import { SearchTagsType } from '../../models/template';
const subjectList = [
  'Meeting Confirmation',
  'Team Stand-up',
  'Budget Review Session',
  'Project Kickoff',
  'Lunch Break Gone Wrong',
  'Emergency Cat Video Viewing',
  'Mandatory Nap Time',
  'Unexpected Tech Outage (aka Coffee Break)',
  'Office Karaoke Championship',
  'Unscheduled Snack Raid',
  'The Great Printer Jam Crisis',
  'Urgent: Who Ate My Sandwich?',
  'Coffee Machine vs. Humanity',
  'All-Hands Meeting About Nothing',
  'Friday Dance-Off: Participation Mandatory',
];

const getRandomBgColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  const alpha = Math.random().toFixed(2); // Generates transparency between 0.00 to 1.00

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

const getGroupedSubjects = () => {
  const shuffled = [...subjectList].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 4); // Always return a fresh randomized group
};

export const searchTags: any[] = [
  {
    id: 'breaking-new-horizons',
    title: 'Breaking New Horizons',
    subtitle: getGroupedSubjects(),
    content:
      'In recent years, space agencies and private companies have revolutionized space travel. With new technologies emerging, Mars colonization and deep-space exploration are becoming more tangible goals.',
    image: 'https://picsum.photos/seed/space/300/300',
    bgColor: getRandomBgColor(),
  },
  {
    id: 'ai-in-everyday-life',
    title: 'AI in Everyday Life',
    subtitle: getGroupedSubjects(),
    content:
      'From smart assistants to self-driving cars, AI is becoming an integral part of daily life. Machine learning algorithms analyze vast amounts of data to provide automation and personalized recommendations.',
    image: 'https://picsum.photos/seed/ai/300/300',
    bgColor: getRandomBgColor(),
  },
  {
    id: 'electric-vehicles',
    title: 'The Rise of Electric Vehicles',
    subtitle: getGroupedSubjects(),
    content:
      'Electric vehicles (EVs) are transforming transportation with their eco-friendly attributes. Governments are investing in sustainable infrastructure to support EVs and reduce fossil fuel dependence.',
    image: 'https://picsum.photos/seed/ev/300/300',
    bgColor: getRandomBgColor(),
  },
  {
    id: 'minimalism-art',
    title: 'The Art of Minimalism',
    subtitle: getGroupedSubjects(),
    content:
      "Minimalism isn't just a design trend—it's a lifestyle choice that emphasizes decluttering and focusing on the essentials, promoting structured environments and mental clarity.",
    image: 'https://picsum.photos/seed/minimal/300/300',
    bgColor: getRandomBgColor(),
  },
  {
    id: 'healthy-eating-trends',
    title: 'Healthy Eating Trends',
    subtitle: getGroupedSubjects(),
    content:
      'From plant-based diets to intermittent fasting, health-conscious individuals are exploring new ways to improve their nutrition, seeking superfoods and organic alternatives.',
    image: 'https://picsum.photos/seed/health/300/300',
    bgColor: getRandomBgColor(),
  },
  {
    id: 'sustainable-fashion',
    title: 'Sustainable Fashion',
    subtitle: getGroupedSubjects(),
    content:
      'Fashion brands are moving toward sustainability with ethical materials and zero-waste production. Consumers are embracing second-hand shopping and rentals to reduce waste.',
    image: 'https://picsum.photos/seed/fashion/300/300',
    bgColor: getRandomBgColor(),
  },
  {
    id: 'remote-work-era',
    title: 'The Remote Work Era',
    subtitle: getGroupedSubjects(),
    content:
      'With digital tools enabling remote collaboration, flexible work arrangements are more common, improving work-life balance while maintaining productivity.',
    image: 'https://picsum.photos/seed/work/300/300',
    bgColor: getRandomBgColor(),
  },
  {
    id: 'mindfulness-practices',
    title: 'Mindfulness Practices',
    subtitle: getGroupedSubjects(),
    content:
      'Meditation, yoga, and breathing techniques are gaining popularity as effective stress management practices that enhance emotional well-being.',
    image: 'https://picsum.photos/seed/mindfulness/300/300',
    bgColor: getRandomBgColor(),
  },
  {
    id: 'cryptocurrency-future',
    title: 'The Future of Cryptocurrency',
    subtitle: getGroupedSubjects(),
    content:
      'Digital currencies continue evolving with blockchain innovations, decentralized finance (DeFi), and global crypto adoption trends.',
    image: 'https://picsum.photos/seed/crypto/300/300',
    bgColor: getRandomBgColor(),
  },
  {
    id: 'green-energy-movement',
    title: 'Green Energy Movement',
    subtitle: getGroupedSubjects(),
    content:
      'Countries are investing in wind, solar, and hydroelectric power to combat climate change, making renewable energy more efficient.',
    image: 'https://picsum.photos/seed/energy/300/300',
    bgColor: getRandomBgColor(),
  },
  {
    id: 'future-of-robotics',
    title: 'The Future of Robotics',
    subtitle: getGroupedSubjects(),
    content:
      'Robots are advancing beyond industrial automation, entering healthcare, customer service, and everyday human assistance.',
    image: 'https://picsum.photos/seed/robotics/300/300',
    bgColor: getRandomBgColor(),
  },
  {
    id: 'quantum-computing-revolution',
    title: 'Quantum Computing Revolution',
    subtitle: getGroupedSubjects(),
    content:
      'Quantum computers promise exponential improvements in computing speed, impacting cryptography, AI, and large-scale simulations.',
    image: 'https://picsum.photos/seed/quantum/300/300',
    bgColor: getRandomBgColor(),
  },
  {
    id: 'cybersecurity-threats',
    title: 'Cybersecurity Threats',
    subtitle: getGroupedSubjects(),
    content:
      'Cyberattacks are increasing, requiring stronger encryption, AI-based detection, and user awareness to combat security breaches.',
    image: 'https://picsum.photos/seed/cybersecurity/300/300',
    bgColor: getRandomBgColor(),
  },
  {
    id: 'digital-privacy-rights',
    title: 'Digital Privacy Rights',
    subtitle: getGroupedSubjects(),
    content:
      'Data protection laws are evolving globally to prevent misuse of personal data by corporations and cybercriminals.',
    image: 'https://picsum.photos/seed/privacy/300/300',
    bgColor: getRandomBgColor(),
  },
  {
    id: 'personalized-medicine',
    title: 'Personalized Medicine',
    subtitle: getGroupedSubjects(),
    content:
      'Genetic profiling and AI-driven diagnostics are helping tailor medical treatments to individual patients with greater accuracy.',
    image: 'https://picsum.photos/seed/medicine/300/300',
    bgColor: getRandomBgColor(),
  },
  {
    id: 'autonomous-transportation',
    title: 'Autonomous Transportation',
    subtitle: getGroupedSubjects(),
    content:
      'Smart infrastructure and AI are driving the evolution of autonomous transportation, reducing accidents and improving efficiency.',
    image: 'https://picsum.photos/seed/autonomous/300/300',
    bgColor: getRandomBgColor(),
  },
];
