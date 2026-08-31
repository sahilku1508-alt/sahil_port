export type ProjectCategory = 'IoT' | 'Web' | 'Hackathon';

export interface Project {
  id: string;
  title: string;
  categories: ProjectCategory[];
  date: string;
  label: string;
  description: string;
  details: string[];
  stack: string[];
  accent: string;
}

export const portfolio = {
  name: 'Sahil Kumar',
  role: 'Computer Science & Engineering student',
  location: 'Phagwara, Punjab',
  intro: 'I like turning curious questions into working systems — from connected hardware to useful web interfaces.',
  interests: ['Programming', 'Web development', 'IoT', 'Embedded systems', 'Problem-solving', 'Project development'],
  skills: {
    languages: ['C++', 'Python', 'C'],
    webAndData: ['HTML', 'CSS', 'MSQL', 'MySQL'],
    tools: ['Git', 'GitHub'],
    waysOfWorking: ['IoT', 'Embedded Systems', 'Problem-Solving', 'Team Player', 'Project Management', 'Adaptability'],
  },
  education: [
    { school: 'Lovely Professional University', place: 'Phagwara, Punjab', credential: 'Bachelor of Technology, Computer Science and Engineering', date: 'Aug 2025–Present', result: 'CGPA 8.20' },
    { school: 'CPS Raxaul', place: 'Raxaul, Bihar', credential: 'Intermediate, PCM', date: 'May 2023–May 2024', result: '70%' },
    { school: 'TCS Raxaul', place: 'Raxaul, Bihar', credential: 'Matriculation', date: 'Apr 2021–Apr 2022', result: '80%' },
  ],
  achievements: [
    { title: 'InfernoVerse 24-Hour Hackathon', text: 'Delivered a functional Humanity OS prototype under 24-hour pressure.' },
    { title: 'GeeksforGeeks LPU Chapter', text: 'Participated in the InfernoVerse hackathon in association with the student chapter.' },
  ],
  certifications: [
    { name: 'Microsoft Generative AI', issuer: 'Coursera', date: 'May 2026' },
    { name: 'C', issuer: 'NeoCollab', date: 'April 2025' },
    { name: 'Python', issuer: 'Infosys', date: 'Nov 2023' },
    { name: 'SQL', issuer: 'HackerRank', date: 'Aug 2025' },
  ],
  projects: [
    {
      id: 'smart-safety-helmet',
      title: 'Smart Safety Helmet for Coal Miners',
      categories: ['IoT'] as ProjectCategory[],
      date: 'May 2026',
      label: 'Embedded / IoT project',
      description: 'Developed an IoT-based smart safety helmet engineered to monitor hazardous environmental conditions in real time, including toxic gas levels, temperature spikes, flame detection, and obstacle proximity.',
      details: [
        'Integrated multi-sensor modules with an ESP32 micro-controller and simulated circuit logic via Wokwi to ensure fail-safe hardware reliability.',
        'Implemented GPS tracking protocols for accurate miner localization and rapid response during underground mine hazard events.',
      ],
      stack: ['ESP32', 'Arduino', 'IoT', 'Sensors', 'GPS', 'Wokwi'],
      accent: 'orange',
    },
    {
      id: 'humanity-os',
      title: 'Humanity OS - Sustainability Dashboard Platform',
      categories: ['Web', 'Hackathon'] as ProjectCategory[],
      date: 'Nov 2025',
      label: 'Hackathon Project',
      description: 'Developed a futuristic sustainability dashboard platform designed to track environmental metrics.',
      details: [
        'Implemented complex responsive layouts and interactive modules using HTML, Tailwind CSS, and JavaScript.',
        'Engineered the UI logic to ensure a seamless and intuitive user experience under tight deadlines.',
      ],
      stack: ['HTML', 'Tailwind CSS', 'JavaScript'],
      accent: 'teal',
    },
  ],
  contact: {
    email: 'sahil.ku1508@gmail.com',
    phone: '+91 9835832812',
    github: 'https://github.com/sahilku1508-alt',
    linkedin: 'https://www.linkedin.com/in/sahil-kumar1508',
  },
};