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
    programming: ['C++', 'Python', 'C'],
    web: ['HTML', 'CSS'],
    database: ['MSQL', 'MySQL'],
    iot: ['IoT', 'Embedded Systems'],
    tools: ['Git', 'GitHub'],
    softSkills: ['Problem-Solving', 'Team Player', 'Project Management', 'Adaptability'],
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
  certificates: [
    {
      title: 'Computer Programming',
      issuer: 'neoColab · Lovely Professional University',
      date: 'May 2026',
      description: 'A 150-hour course certificate recognizing consistent practice and strong foundations in computer programming.',
      file: '/certificates/computer-programming.pdf',
      preview: '/certificates/computer-programming.png',
    },
    {
      title: 'Introduction to Python',
      issuer: 'Infosys Springboard',
      date: 'February 2026',
      description: 'Course completion certificate covering Python fundamentals and the building blocks of practical programming.',
      file: '/certificates/introduction-to-python.pdf',
      preview: '/certificates/introduction-to-python.png',
    },
    {
      title: 'Programming in C',
      issuer: 'Infosys Springboard',
      date: 'March 2026',
      description: 'Course completion certificate focused on C syntax, logic, and core problem-solving concepts.',
      file: '/certificates/programming-in-c.pdf',
      preview: '/certificates/programming-in-c.png',
    },
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