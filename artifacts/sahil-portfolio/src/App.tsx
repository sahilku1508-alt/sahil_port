import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  CircleX,
  Code2,
  Download,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Network,
  Phone,
  Send,
  Sun,
  Terminal,
  Trophy,
  X,
} from 'lucide-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { portfolio, type Project, type ProjectCategory } from '@/data/portfolio';

const queryClient = new QueryClient();
const navigation = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];
const reveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.2, 0.8, 0.2, 1] as const } },
};

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function Header({ activeSection, dark, setDark }: { activeSection: string; dark: boolean; setDark: (value: boolean) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const jump = (id: string) => {
    setMobileOpen(false);
    scrollToSection(id);
  };

  return (
    <>
      <header className="nav-blur fixed inset-x-0 top-0 z-40 border-b hairline">
        <div className="section-wrap flex h-[72px] items-center justify-between">
          <button type="button" onClick={() => jump('home')} className="group flex items-center gap-3 text-left" data-testid="button-home">
            <span className="grid h-9 w-9 place-items-center rounded-sm bg-primary font-mono text-sm font-bold text-primary-foreground transition-transform group-hover:rotate-6">SK</span>
            <span className="hidden font-mono text-xs tracking-[.12em] text-muted-foreground sm:block">SAHIL / PORTFOLIO</span>
          </button>
          <nav className="hidden items-center gap-7 md:flex" aria-label="Primary navigation">
            {navigation.map((item) => (
              <button key={item.id} type="button" onClick={() => jump(item.id)} className="nav-link font-mono text-[11px] uppercase tracking-[.13em]" data-active={activeSection === item.id} data-testid={`button-nav-${item.id}`}>
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setDark(!dark)} className="icon-button grid h-10 w-10 place-items-center rounded-full border hairline text-muted-foreground hover:text-foreground" aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'} data-testid="button-theme-toggle">
              {dark ? <Sun size={17} strokeWidth={1.7} /> : <Moon size={17} strokeWidth={1.7} />}
            </button>
            <button type="button" onClick={() => setMobileOpen(!mobileOpen)} className="icon-button grid h-10 w-10 place-items-center rounded-full border hairline text-muted-foreground md:hidden" aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'} data-testid="button-mobile-menu">
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden border-t hairline md:hidden" aria-label="Mobile navigation">
              <div className="section-wrap flex flex-col gap-1 py-4">
                {navigation.map((item) => (
                  <button key={item.id} type="button" onClick={() => jump(item.id)} className="flex items-center justify-between px-2 py-3 text-left font-mono text-xs uppercase tracking-[.13em] text-muted-foreground" data-testid={`button-mobile-nav-${item.id}`}>
                    <span className={activeSection === item.id ? 'text-primary' : ''}>{item.label}</span><ChevronRight size={15} />
                  </button>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return <div className="mb-8 flex items-center gap-3"><span className="mono text-[10px] text-primary">{index}</span><span className="h-px w-8 bg-primary/60" /><span className="eyebrow">{children}</span></div>;
}

function Hero({ onContact, onWork, resumeAvailable }: { onContact: () => void; onWork: () => void; resumeAvailable: boolean }) {
  return (
    <section id="home" className="relative flex min-h-[min(860px,100dvh)] items-center overflow-hidden border-b hairline pt-24">
      <div className="absolute inset-0 grid-lines opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      <div className="absolute -right-24 top-32 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="section-wrap relative grid items-end gap-16 pb-24 lg:grid-cols-[1fr_420px]">
        <div>
          <motion.div initial="hidden" animate="visible" variants={reveal} className="eyebrow mb-9 flex items-center gap-3"><span className="inline-block h-2 w-2 rounded-full bg-primary" /> Currently learning, building, and shipping</motion.div>
          <motion.h1 initial="hidden" animate="visible" variants={reveal} transition={{ delay: .08 }} className="display max-w-4xl text-[clamp(4.25rem,12vw,10.5rem)] font-semibold leading-[.82]">
            Sahil<br /><span className="text-primary">Kumar</span><span className="text-accent">.</span>
          </motion.h1>
          <motion.div initial="hidden" animate="visible" variants={reveal} transition={{ delay: .16 }} className="mt-10 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[.14em] text-primary sm:text-sm">{portfolio.role}</p>
            <p className="max-w-md text-lg leading-8 text-muted-foreground">{portfolio.intro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button type="button" onClick={onWork} className="solid-button inline-flex w-fit items-center gap-3 rounded-sm bg-primary px-5 py-3 font-mono text-xs font-medium uppercase tracking-[.12em] text-primary-foreground" data-testid="button-hero-work">View projects <ArrowDownRight size={16} /></button>
              <button type="button" onClick={onContact} className="inline-flex w-fit items-center gap-3 rounded-sm border hairline px-5 py-3 font-mono text-xs font-medium uppercase tracking-[.12em] text-foreground transition-colors hover:border-primary hover:text-primary" data-testid="button-hero-contact">Contact me <ArrowUpRight size={16} /></button>
              {resumeAvailable ? <a href="/resume.pdf" download className="inline-flex w-fit items-center gap-2 px-2 py-3 font-mono text-[10px] uppercase tracking-[.12em] text-muted-foreground transition-colors hover:text-primary" data-testid="link-hero-resume"><Download size={15} /> Download CV</a> : <span className="inline-flex w-fit items-center gap-2 px-2 py-3 font-mono text-[10px] uppercase tracking-[.12em] text-muted-foreground/60" aria-disabled="true" data-testid="status-hero-resume"><Download size={15} /> CV coming soon</span>}
            </div>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .3, duration: .8 }} className="relative lg:translate-y-24">
          <div className="mb-8 flex flex-col items-start gap-5">
            <img src="/sahil-profile.jpeg" alt="Sahil Kumar" className="h-[min(84vw,420px)] w-[min(84vw,420px)] shrink-0 rounded-full border-2 border-primary/70 object-cover object-top shadow-[0_0_52px_rgba(244,103,57,.22)] ring-4 ring-primary/10 sm:h-[min(46vh,420px)] sm:w-[min(46vh,420px)]" />
            <div className="pb-1"><div className="mono text-[10px] uppercase tracking-[.14em] text-muted-foreground">Sahil Kumar</div><div className="mt-2 text-xs text-muted-foreground">Computer Science &amp; Engineering student.</div></div>
          </div>
          <div className="mono mb-5 text-[10px] uppercase tracking-[.14em] text-muted-foreground">01 / Signal</div>
          <div className="space-y-4 text-sm leading-6 text-muted-foreground">
            <p className="text-foreground">Computer Science &amp; Engineering student.</p>
            <p>Building a foundation across software, hardware, and the space where the two meet.</p>
          </div>
          <div className="mt-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.14em] text-primary"><span className="h-10 w-px bg-primary" /> Scroll to explore <ArrowDownRight size={14} /></div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="border-b hairline py-28">
      <div className="section-wrap">
        <SectionLabel index="01">A little context</SectionLabel>
        <div className="grid gap-14 lg:grid-cols-[1fr_.85fr]">
          <div>
            <h2 className="display max-w-md text-5xl font-semibold leading-[.98] sm:text-6xl">Still early.<br /><span className="text-primary">Already curious.</span></h2>
            <p className="mt-8 max-w-xl text-lg leading-9 text-foreground/90">I’m Sahil, a Computer Science and Engineering student at Lovely Professional University. I’m interested in programming, web development, IoT, embedded systems, problem-solving, and project development.</p>
            <p className="mt-6 max-w-xl leading-7 text-muted-foreground">My projects are a way to learn in public: follow a question, understand the parts, and make something functional enough to test. That means writing code, connecting devices, and working with people when the clock is moving.</p>
          </div>
          <div className="rounded-sm border hairline bg-card/70 p-7 sm:p-8">
            <div className="mb-8 flex items-center justify-between"><span className="eyebrow">Profile / 01</span><GraduationCap size={18} className="text-primary" /></div>
            <dl className="divide-y hairline">
              <div className="grid gap-2 py-4 sm:grid-cols-[90px_1fr]"><dt className="mono text-[10px] uppercase tracking-[.1em] text-muted-foreground">Name</dt><dd className="text-sm">Sahil Kumar</dd></div>
              <div className="grid gap-2 py-4 sm:grid-cols-[90px_1fr]"><dt className="mono text-[10px] uppercase tracking-[.1em] text-muted-foreground">Field</dt><dd className="text-sm">Computer Science &amp; Engineering</dd></div>
              <div className="grid gap-2 py-4 sm:grid-cols-[90px_1fr]"><dt className="mono text-[10px] uppercase tracking-[.1em] text-muted-foreground">Focus</dt><dd className="text-sm leading-7">Software Development<br />Web Development<br />IoT &amp; Embedded Systems</dd></div>
            </dl>
            <div className="mt-7 flex flex-wrap gap-2">{portfolio.interests.map((interest) => <span key={interest} className="rounded-full border hairline px-3 py-2 font-mono text-[10px] uppercase tracking-[.1em] text-muted-foreground">{interest}</span>)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const groups = [
    { title: 'Programming', icon: <Code2 size={17} />, items: portfolio.skills.programming },
    { title: 'Web', icon: <Terminal size={17} />, items: portfolio.skills.web },
    { title: 'Database', icon: <Network size={17} />, items: portfolio.skills.database },
    { title: 'IoT & Embedded', icon: <BriefcaseBusiness size={17} />, items: portfolio.skills.iot },
    { title: 'Tools', icon: <Network size={17} />, items: portfolio.skills.tools },
    { title: 'Soft Skills', icon: <Check size={17} />, items: portfolio.skills.softSkills },
  ];
  return (
    <section id="skills" className="border-b hairline py-28">
      <div className="section-wrap">
        <SectionLabel index="02">The toolkit</SectionLabel>
        <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <div><h2 className="display max-w-sm text-5xl font-semibold leading-[.98] sm:text-6xl">Tools for<br /><span className="text-primary">making things.</span></h2><p className="mt-7 max-w-sm leading-7 text-muted-foreground">A growing, practical toolkit shaped by coursework, experiments, and building with constraints.</p></div>
          <div className="grid gap-px border hairline bg-border sm:grid-cols-2">
            {groups.map((group, index) => <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .3 }} variants={reveal} transition={{ delay: index * .06 }} key={group.title} className="bg-background p-7">
              <div className="mb-8 flex items-center justify-between text-primary"><span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[.11em]">{group.icon}{group.title}</span><span className="mono text-[10px] text-muted-foreground">0{index + 1}</span></div>
              <div className="flex flex-wrap gap-x-5 gap-y-3">{group.items.map((item) => <span key={item} className="text-sm text-foreground/85">{item}</span>)}</div>
            </motion.div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="border-b hairline py-28">
      <div className="section-wrap">
        <SectionLabel index="03">The long game</SectionLabel>
        <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <div><h2 className="display max-w-sm text-5xl font-semibold leading-[.98] sm:text-6xl">Learning by<br /><span className="text-accent">layers.</span></h2></div>
          <div className="divide-y hairline border-y">
            {portfolio.education.map((item, index) => <div key={item.school} className="grid gap-4 py-7 sm:grid-cols-[64px_1fr_auto] sm:items-start">
              <span className="mono text-xs text-primary">0{index + 1}</span>
              <div><h3 className="text-lg font-semibold">{item.school}</h3><p className="mt-1 text-sm text-muted-foreground">{item.place}</p><p className="mt-4 max-w-md text-sm leading-6 text-foreground/80">{item.credential}</p></div>
              <div className="sm:text-right"><p className="mono text-[10px] uppercase tracking-[.1em] text-muted-foreground">{item.date}</p><p className="mt-3 font-mono text-xs text-primary">{item.result}</p></div>
            </div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

function Work({ onSelect }: { onSelect: (project: Project) => void }) {
  const filters: Array<'All' | ProjectCategory> = ['All', 'IoT', 'Web', 'Hackathon'];
  const [filter, setFilter] = useState<'All' | ProjectCategory>('All');
  const projects = useMemo(() => filter === 'All' ? portfolio.projects : portfolio.projects.filter((project) => project.categories.includes(filter)), [filter]);
  return (
    <section id="projects" className="border-b hairline py-28">
      <div className="section-wrap">
        <SectionLabel index="04">Selected work</SectionLabel>
        <div className="mb-12 flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div><h2 className="display text-5xl font-semibold leading-[.98] sm:text-6xl">Built to<br /><span className="text-primary">understand.</span></h2><p className="mt-6 max-w-md leading-7 text-muted-foreground">Small, purposeful projects that sit between an idea and a working prototype.</p></div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">{filters.map((item) => <button key={item} type="button" onClick={() => setFilter(item)} className={`rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[.1em] transition-colors ${filter === item ? 'border-primary bg-primary text-primary-foreground' : 'hairline text-muted-foreground hover:text-foreground'}`} data-testid={`button-filter-${item.toLowerCase()}`}>{item}</button>)}</div>
        </div>
          <div className="grid gap-5 lg:grid-cols-2">
           {projects.map((project, index) => <motion.button type="button" key={project.id} onClick={() => onSelect(project)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={reveal} transition={{ delay: index * .08 }} className={`card-lift group relative overflow-hidden rounded-sm border hairline bg-card p-7 text-left ${project.id === 'smart-safety-helmet' ? 'lg:col-span-2 lg:p-9' : ''}`} data-testid={`card-project-${project.id}`}>
            <div className={`absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full blur-3xl ${project.accent === 'orange' ? 'bg-primary/20' : 'bg-cyan-400/15'}`} />
            <div className="relative flex min-h-[310px] flex-col justify-between">
               <div><div className="mb-8 flex items-center justify-between"><span className="eyebrow">{project.categories.join(' / ')} / {project.date}</span><ArrowUpRight size={19} className="text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" /></div><div className={`mb-8 h-16 overflow-hidden rounded-sm border hairline bg-gradient-to-r ${project.accent === 'orange' ? 'from-primary/15 via-primary/5 to-transparent' : 'from-cyan-400/15 via-cyan-400/5 to-transparent'}`}><div className="grid h-full grid-cols-[repeat(12,1fr)] opacity-50">{Array.from({ length: 12 }).map((_, line) => <span key={line} className="border-r hairline" />)}</div></div><div className="flex flex-wrap items-start justify-between gap-4"><h3 className="display max-w-2xl text-3xl font-semibold leading-tight lg:text-4xl">{project.title}</h3><span className="rounded-full border border-primary/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[.1em] text-primary">View details</span></div><p className="mt-5 max-w-2xl leading-7 text-muted-foreground">{project.description}</p></div>
              <div className="mt-10 flex flex-wrap gap-2">{project.stack.map((tag) => <span key={tag} className="rounded-sm bg-secondary px-2.5 py-1.5 font-mono text-[10px] text-secondary-foreground">{tag}</span>)}</div>
            </div>
          </motion.button>)}
        </div>
      </div>
    </section>
  );
}

function Achievements() {
  return (
    <section id="achievements" className="border-b hairline py-28">
      <div className="section-wrap grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
        <div><SectionLabel index="05">Proof of practice</SectionLabel><h2 className="display max-w-sm text-5xl font-semibold leading-[.98] sm:text-6xl">Pressure<br /><span className="text-accent">tested.</span></h2></div>
        <div>
          <div className="relative border-l border-primary/40 pl-7 sm:pl-9">{portfolio.achievements.map((item, index) => <div key={item.title} className="relative pb-9 last:pb-0"><span className="absolute -left-[2.05rem] top-1.5 grid h-5 w-5 place-items-center rounded-full border border-primary bg-background sm:-left-[2.55rem]"><Trophy className="text-primary" size={11} strokeWidth={1.7} /></span><div className="mono mb-3 text-[10px] uppercase tracking-[.1em] text-primary">0{index + 1} / Nov 2025</div><h3 className="font-semibold">{item.title}</h3><p className="mt-2 leading-7 text-muted-foreground">{item.text}</p></div>)}</div>
          <div className="mt-14"><div className="mb-5 eyebrow">Certifications</div><div className="grid gap-3 sm:grid-cols-2">{portfolio.certifications.map((cert) => <div key={cert.name} className="flex items-center justify-between rounded-sm border hairline bg-card/50 p-4"><div><p className="text-sm font-semibold">{cert.name}</p><p className="mt-1 text-xs text-muted-foreground">{cert.issuer}</p></div><span className="mono text-[10px] text-primary">{cert.date}</span></div>)}</div></div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [feedback, setFeedback] = useState('');
  const update = (field: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setForm({ ...form, [field]: event.target.value });
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) || !form.subject.trim() || !form.message.trim()) {
      setFeedback('Please add your name, a valid email, a subject, and a message.');
      return;
    }
    window.location.href = `mailto:${portfolio.contact.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`${form.message}\n\nReply to: ${form.email}`)}`;
    setFeedback('Opening your email client…');
  };
  return (
    <section id="contact" className="relative overflow-hidden py-32">
      <div className="absolute inset-0 grid-lines opacity-45" />
      <div className="section-wrap relative">
        <SectionLabel index="06">Start a conversation</SectionLabel>
        <div className="grid gap-16 lg:grid-cols-[1fr_.75fr]">
          <div><h2 className="display max-w-2xl text-[clamp(3.7rem,8vw,7.5rem)] font-semibold leading-[.85]">Let’s build<br /><span className="text-primary">something together.</span></h2><p className="mt-10 max-w-md text-lg leading-8 text-muted-foreground">Whether it’s a project, a question, or just a shared interest in building things, I’m always open to a thoughtful message.</p><div className="mt-12 flex flex-wrap gap-x-7 gap-y-4">{[<a key="email" href={`mailto:${portfolio.contact.email}`} className="flex items-center gap-2 text-sm text-foreground hover:text-primary" data-testid="link-contact-email"><Mail size={16} />{portfolio.contact.email}</a>, <a key="phone" href={`tel:${portfolio.contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-sm text-foreground hover:text-primary" data-testid="link-contact-phone"><Phone size={16} />{portfolio.contact.phone}</a>]}</div><div className="mt-8 flex gap-3"><a href={portfolio.contact.github} target="_blank" rel="noreferrer" aria-label="Sahil Kumar on GitHub" className="icon-button grid h-10 w-10 place-items-center rounded-full border hairline hover:text-primary" data-testid="link-github"><Github size={17} /></a><a href={portfolio.contact.linkedin} target="_blank" rel="noreferrer" aria-label="Sahil Kumar on LinkedIn" className="icon-button grid h-10 w-10 place-items-center rounded-full border hairline hover:text-primary" data-testid="link-linkedin"><Linkedin size={17} /></a></div></div>
          <form onSubmit={submit} className="rounded-sm border hairline bg-card/75 p-6 sm:p-8" noValidate>
            <div className="mb-7 flex items-center justify-between"><span className="mono text-[10px] uppercase tracking-[.13em] text-muted-foreground">Direct line</span><Send size={17} className="text-primary" /></div>
            <label className="mb-5 block"><span className="mb-2 block font-mono text-[10px] uppercase tracking-[.1em] text-muted-foreground">Name</span><input value={form.name} onChange={update('name')} className="w-full border-0 border-b hairline bg-transparent px-0 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none" placeholder="Your name" data-testid="input-contact-name" /></label>
            <label className="mb-5 block"><span className="mb-2 block font-mono text-[10px] uppercase tracking-[.1em] text-muted-foreground">Email</span><input type="email" value={form.email} onChange={update('email')} className="w-full border-0 border-b hairline bg-transparent px-0 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none" placeholder="you@example.com" data-testid="input-contact-email" /></label>
             <label className="mb-5 block"><span className="mb-2 block font-mono text-[10px] uppercase tracking-[.1em] text-muted-foreground">Subject</span><input value={form.subject} onChange={update('subject')} className="w-full border-0 border-b hairline bg-transparent px-0 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none" placeholder="A project or opportunity" data-testid="input-contact-subject" /></label>
            <label className="mb-7 block"><span className="mb-2 block font-mono text-[10px] uppercase tracking-[.1em] text-muted-foreground">Message</span><textarea value={form.message} onChange={update('message')} rows={4} className="w-full resize-none border-0 border-b hairline bg-transparent px-0 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none" placeholder="What are you working on?" data-testid="input-contact-message" /></label>
            {feedback && <p className="mb-5 flex items-center gap-2 text-xs text-primary" role="status" data-testid="status-contact-feedback"><Check size={14} />{feedback}</p>}
            <button type="submit" className="solid-button flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-5 py-3.5 font-mono text-xs uppercase tracking-[.12em] text-primary-foreground" data-testid="button-contact-submit">Send via email <ArrowUpRight size={16} /></button>
          </form>
        </div>
      </div>
    </section>
  );
}

function ProjectModal({ project, close }: { project: Project; close: () => void }) {
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') close(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [close]);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 grid place-items-center bg-background/80 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }} role="dialog" aria-modal="true" aria-labelledby="project-modal-title" data-testid="modal-project">
      <motion.div initial={{ opacity: 0, y: 18, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="relative max-h-[90dvh] w-full max-w-2xl overflow-auto rounded-sm border hairline bg-card p-7 shadow-2xl sm:p-10">
        <button type="button" onClick={close} className="icon-button absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border hairline text-muted-foreground hover:text-foreground" aria-label="Close project details" data-testid="button-close-project"><CircleX size={17} /></button>
         <div className="eyebrow mb-12">{project.categories.join(' / ')} / {project.date}</div>
        <h2 id="project-modal-title" className="display max-w-xl text-4xl font-semibold leading-tight sm:text-5xl">{project.title}</h2>
         <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">{project.description}</p>
        <div className="mt-12 border-t hairline pt-6"><p className="mono mb-4 text-[10px] uppercase tracking-[.14em] text-muted-foreground">Built with</p><div className="flex flex-wrap gap-2">{project.stack.map((item) => <span key={item} className="rounded-sm bg-secondary px-3 py-2 font-mono text-xs text-secondary-foreground">{item}</span>)}</div></div>
         <div className="mt-10 border-t hairline pt-6"><p className="mono mb-4 text-[10px] uppercase tracking-[.14em] text-muted-foreground">Key development points</p><ul className="space-y-4">{project.details.map((detail) => <li key={detail} className="flex gap-3 text-sm leading-7 text-foreground/80"><span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{detail}</li>)}</ul></div>
        <div className="mt-10 flex items-center gap-2 text-xs text-muted-foreground"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> {project.label}</div>
      </motion.div>
    </motion.div>
  );
}

function Footer() {
  const [resumeAvailable, setResumeAvailable] = useState(false);
  useEffect(() => { fetch('/resume.pdf', { method: 'HEAD' }).then((response) => setResumeAvailable(response.ok)).catch(() => setResumeAvailable(false)); }, []);
  return <footer className="border-t hairline py-8"><div className="section-wrap flex flex-col justify-between gap-5 sm:flex-row sm:items-center"><p className="mono text-[10px] uppercase tracking-[.1em] text-muted-foreground">© {new Date().getFullYear()} Sahil Kumar</p>{resumeAvailable ? <a href="/resume.pdf" target="_blank" rel="noreferrer" className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.1em] text-primary hover:text-accent" data-testid="link-resume"><Download size={14} /> View resume</a> : <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.1em] text-muted-foreground" data-testid="status-resume-unavailable"><Download size={14} /> Resume unavailable</span>}<button type="button" onClick={() => scrollToSection('home')} className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.1em] text-muted-foreground hover:text-foreground" data-testid="button-back-to-top">Back to top <ArrowUpRight size={14} /></button></div></footer>;
}

function Home() {
  const [dark, setDark] = useState(() => localStorage.getItem('sahil-theme') !== 'light');
  const [activeSection, setActiveSection] = useState('home');
  const [progress, setProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [resumeAvailable, setResumeAvailable] = useState(false);
  useEffect(() => { document.documentElement.classList.toggle('dark', dark); localStorage.setItem('sahil-theme', dark ? 'dark' : 'light'); }, [dark]);
  useEffect(() => { fetch('/resume.pdf', { method: 'HEAD' }).then((response) => setResumeAvailable(response.ok)).catch(() => setResumeAvailable(false)); }, []);
  useEffect(() => {
    const sections = navigation.map((item) => item.id);
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? window.scrollY / scrollable : 0);
      const current = sections.reduce((found, id) => (document.getElementById(id)?.getBoundingClientRect().top !== undefined && document.getElementById(id)!.getBoundingClientRect().top <= 150 ? id : found), 'home');
      setActiveSection(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="portfolio-shell noise min-h-[100dvh]"><div className="progress-track"><div className="progress-bar" style={{ transform: `scaleX(${progress})` }} /></div><Header activeSection={activeSection} dark={dark} setDark={setDark} /><main><Hero onContact={() => scrollToSection('contact')} onWork={() => scrollToSection('projects')} resumeAvailable={resumeAvailable} /><About /><Skills /><Education /><Work onSelect={setSelectedProject} /><Achievements /><Contact /></main><Footer /><AnimatePresence>{selectedProject && <ProjectModal project={selectedProject} close={() => setSelectedProject(null)} />}</AnimatePresence></div>;
}

function Router() {
  return <ErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;