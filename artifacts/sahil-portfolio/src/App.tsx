import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowUpRight,
  Activity,
  Award,
  Check,
  ChevronRight,
  CircleX,
  Code2,
  Cpu,
  Database,
  Download,
  FileCode2,
  Github,
  GraduationCap,
  Linkedin,
  MapPin,
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
  { id: 'certificates', label: 'Certificates' },
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

function CursorLayer() {
  const [position, setPosition] = useState({ x: -100, y: -100, active: false });
  useEffect(() => {
    const move = (event: MouseEvent) => setPosition((current) => ({ ...current, x: event.clientX, y: event.clientY }));
    const over = (event: MouseEvent) => setPosition((current) => ({ ...current, active: Boolean((event.target as HTMLElement).closest('a, button')) }));
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseover', over); };
  }, []);
  return <div className="cursor-layer" aria-hidden="true"><span className="cursor-dot" style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }} /><span className="cursor-ring" data-active={position.active} style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }} /></div>;
}

function TerminalVisual() {
  const lines = [
    <><span className="text-primary">$ whoami</span><br /><span className="text-slate-300">&gt; Sahil Kumar</span></>,
    <><span className="text-primary">$ skills</span><br /><span className="text-violet-300">&gt; C++</span><br /><span className="text-violet-300">&gt; Python</span><br /><span className="text-violet-300">&gt; C</span></>,
    <><span className="text-primary">$ focus</span><br /><span className="text-slate-300">&gt; Software Development</span><br /><span className="text-slate-300">&gt; IoT &amp; Embedded Systems</span></>,
  ];
  return <motion.div initial={{ opacity: 0, x: 22 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .34, duration: .75 }} className="terminal-window relative w-full max-w-[350px] overflow-hidden rounded-md font-mono text-[10px] leading-5 sm:text-[11px]" aria-label="Sahil developer terminal">
    <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-[9px] uppercase tracking-[.14em] text-slate-500"><span className="flex gap-1.5"><i className="h-2 w-2 rounded-full bg-rose-400/80" /><i className="h-2 w-2 rounded-full bg-amber-300/80" /><i className="h-2 w-2 rounded-full bg-emerald-300/80" /></span><span>sahil.dev / terminal</span></div>
    <div className="space-y-4 px-4 py-5">
      {lines.map((line, index) => <motion.div key={index} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .56 + index * .18 }} className="min-h-[2.5rem]">{line}</motion.div>)}
      <div className="text-primary">$ status<br /><span className="text-emerald-300">&gt; building<span className="cursor" /></span></div>
    </div>
    <div className="pointer-events-none absolute right-3 top-14 text-[9px] text-fuchsia-300/60">01 / 04</div>
  </motion.div>;
}

function ProjectVisual({ project }: { project: Project }) {
  if (project.id === 'smart-safety-helmet') {
    return <div className="project-visual relative min-h-[230px] overflow-hidden rounded-md p-5 sm:min-h-[280px]" aria-label="Decorative smart helmet system diagram">
      <div className="absolute inset-0 opacity-40 grid-lines" />
      <div className="absolute left-5 top-5 font-mono text-[9px] uppercase tracking-[.17em] text-cyan-200/70">system diagram / 01</div>
      <div className="absolute left-[18%] top-[42%] h-20 w-28 rounded-[45%_45%_40%_40%] border border-cyan-300/70 bg-cyan-200/[.04] shadow-[0_0_28px_rgba(0,245,255,.16)] sm:h-24 sm:w-36">
        <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-200 shadow-[0_0_12px_#00f5ff]" />
        <div className="absolute -bottom-2 left-1/2 h-4 w-16 -translate-x-1/2 rounded-b-full border-b border-violet-300/70" />
      </div>
      <div className="absolute left-[12%] top-[29%] h-2 w-2 rounded-full bg-fuchsia-300 shadow-[0_0_12px_#ff00c8]" />
      <div className="absolute left-[46%] top-[23%] h-2 w-2 rounded-full bg-cyan-200 shadow-[0_0_12px_#00f5ff]" />
      <div className="absolute left-[49%] top-[76%] h-2 w-2 rounded-full bg-violet-300 shadow-[0_0_12px_#7c3aed]" />
      <div className="absolute right-[19%] top-[28%] grid h-14 w-20 place-items-center rounded border border-violet-300/45 bg-violet-300/[.05] text-center font-mono text-[8px] uppercase tracking-[.1em] text-violet-200"><Cpu size={14} /> ESP32</div>
      <div className="absolute right-[12%] bottom-[24%] flex items-center gap-2 font-mono text-[8px] uppercase tracking-[.12em] text-fuchsia-200"><MapPin size={13} /> GPS node</div>
      <svg className="absolute inset-0 h-full w-full opacity-60" viewBox="0 0 500 280" fill="none" aria-hidden="true"><path d="M82 118L230 87L342 95M226 89L260 218L392 191M82 118L59 82" stroke="url(#line)" strokeDasharray="5 6" /><defs><linearGradient id="line" x1="50" y1="70" x2="400" y2="220"><stop stopColor="#00f5ff" /><stop offset=".55" stopColor="#7c3aed" /><stop offset="1" stopColor="#ff00c8" /></linearGradient></defs></svg>
      <div className="absolute bottom-4 left-5 flex gap-4 font-mono text-[8px] uppercase tracking-[.12em] text-slate-400"><span>sensor array</span><span>signal active</span></div>
    </div>;
  }
  return <div className="project-visual relative min-h-[230px] overflow-hidden rounded-md p-5 sm:min-h-[280px]" aria-label="Decorative sustainability dashboard visual">
    <div className="absolute inset-0 opacity-40 grid-lines" />
    <div className="relative mx-auto mt-7 max-w-[360px] rounded border border-cyan-300/25 bg-slate-950/55 p-4 shadow-[0_0_30px_rgba(0,102,255,.1)]">
      <div className="mb-5 flex items-center justify-between"><span className="font-mono text-[9px] uppercase tracking-[.15em] text-cyan-200">sustainability / dashboard</span><Activity size={14} className="text-fuchsia-300" /></div>
      <div className="grid grid-cols-3 gap-2"><span className="h-10 rounded-sm border border-cyan-300/20 bg-cyan-300/[.05]" /><span className="h-10 rounded-sm border border-violet-300/20 bg-violet-300/[.05]" /><span className="h-10 rounded-sm border border-fuchsia-300/20 bg-fuchsia-300/[.05]" /></div>
      <div className="mt-4 flex items-end gap-1.5 border-b border-white/10 pb-3">{[38, 62, 48, 76, 55, 82, 66, 92].map((height, index) => <span key={index} className="flex-1 rounded-t-sm bg-gradient-to-t from-cyan-400/65 to-violet-400/70" style={{ height: `${height / 1.7}px` }} />)}</div>
      <div className="mt-3 flex justify-between font-mono text-[8px] uppercase tracking-[.1em] text-slate-500"><span>environmental metrics</span><span>responsive UI</span></div>
    </div>
    <div className="absolute bottom-4 left-5 font-mono text-[8px] uppercase tracking-[.14em] text-cyan-200/70">interface study / decorative visual</div>
  </div>;
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
            <span className="hidden font-mono text-xs tracking-[.12em] text-muted-foreground sm:block">SAHIL.DEV / PORTFOLIO</span>
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
  const [mode, setMode] = useState(0);
  const modes = ['Developer', 'Problem solver', 'Web development', 'IoT & embedded systems'];
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setMode((current) => (current + 1) % modes.length), 2600);
    return () => window.clearInterval(timer);
  }, [modes.length]);
  return (
    <section id="home" className="relative flex min-h-[min(860px,100dvh)] items-center overflow-hidden border-b hairline pt-24">
      <div className="tech-atmosphere" />
      <div className="absolute inset-0 grid-lines opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_80%)]" />
      <div className="section-wrap relative grid items-center gap-12 pb-20 lg:grid-cols-[1fr_540px] lg:gap-8 lg:pb-24">
        <div>
          <motion.div initial="hidden" animate="visible" variants={reveal} className="eyebrow mb-8 flex items-center gap-3"><span className="inline-block h-2 w-2 rounded-full bg-primary shadow-[0_0_14px_#00f5ff]" /> &lt; CSE student /&gt;</motion.div>
          <motion.p initial="hidden" animate="visible" variants={reveal} transition={{ delay: .04 }} className="mono mb-3 text-xs text-muted-foreground">&gt; Hi, I&apos;m</motion.p>
          <motion.h1 initial="hidden" animate="visible" variants={reveal} transition={{ delay: .08 }} className="display mt-6 max-w-4xl text-[clamp(3.8rem,8vw,6.5rem)] font-extrabold uppercase leading-[.86]">
            Sahil<br /><span className="rgb-text text-primary">Kumar</span><span className="text-accent">.</span>
          </motion.h1>
          <motion.div initial="hidden" animate="visible" variants={reveal} transition={{ delay: .16 }} className="mt-10 max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[.14em] text-primary sm:text-sm">{portfolio.role}</p>
            <div className="mt-3 flex min-h-6 items-center gap-2 font-mono text-sm text-fuchsia-300"><span className="text-muted-foreground">&gt;</span><AnimatePresence mode="wait"><motion.span key={modes[mode]} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .25 }}>{modes[mode]}</motion.span></AnimatePresence><span className="cursor" /></div>
            <p className="max-w-md text-lg leading-8 text-muted-foreground">{portfolio.intro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <motion.button whileTap={{ scale: .97 }} type="button" onClick={onWork} className="solid-button inline-flex w-fit items-center gap-3 rounded-sm px-5 py-3 font-mono text-xs font-semibold uppercase tracking-[.12em] text-primary-foreground" data-testid="button-hero-work">View projects <ArrowDownRight size={16} /></motion.button>
              <button type="button" onClick={onContact} className="outline-button inline-flex w-fit items-center gap-3 rounded-sm border border-primary/35 bg-primary/[.04] px-5 py-3 font-mono text-xs font-medium uppercase tracking-[.12em] text-foreground hover:border-primary hover:text-primary" data-testid="button-hero-contact">Contact me <ArrowUpRight size={16} /></button>
              {resumeAvailable ? <a
  href="/attached_assets/Sahil_CV.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="outline-button inline-flex w-fit items-center gap-2 rounded-sm border border-white/10 px-4 py-3 font-mono text-[10px] uppercase tracking-[.12em] text-muted-foreground hover:border-accent hover:text-accent"
  data-testid="link-hero-resume"
>
  <Download size={15} /> View CV
</a>

            </div>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .3, duration: .8 }} className="relative lg:translate-y-10">
          <div className="rgb-frame grid gap-5 rounded-lg p-4 sm:grid-cols-[.76fr_1.24fr] sm:items-center sm:p-5">
            <div className="flex flex-col items-center gap-4 sm:items-start">
              <div className="relative"><div className="absolute -inset-3 rounded-full border border-fuchsia-300/20" /><img src="/sahil-profile.jpeg" alt="Sahil Kumar" className="relative h-[min(70vw,250px)] w-[min(70vw,250px)] shrink-0 rounded-full border-2 border-primary/70 object-cover object-top shadow-[0_0_45px_rgba(0,245,255,.2)] ring-4 ring-primary/10 sm:h-[190px] sm:w-[190px]" /></div>
              <div className="text-center sm:text-left"><div className="mono text-[10px] uppercase tracking-[.14em] text-primary">Sahil Kumar</div><div className="mt-2 text-xs leading-5 text-muted-foreground">Computer Science &amp; Engineering student.</div></div>
            </div>
            <TerminalVisual />
          </div>
          <div className="mt-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.14em] text-primary"><span className="h-8 w-px bg-gradient-to-b from-primary to-accent" /> Scroll to explore <ArrowDownRight size={14} /></div>
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
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .25 }} variants={reveal}>
            <h2 className="display max-w-md text-5xl font-bold leading-[.98] sm:text-6xl">Still early.<br /><span className="text-primary">Already curious.</span></h2>
            <p className="mt-8 max-w-xl text-lg leading-9 text-foreground/90">I’m Sahil, a Computer Science and Engineering student at Lovely Professional University. I’m interested in programming, web development, IoT, embedded systems, problem-solving, and project development.</p>
            <p className="mt-6 max-w-xl leading-7 text-muted-foreground">My projects are a way to learn in public: follow a question, understand the parts, and make something functional enough to test. That means writing code, connecting devices, and working with people when the clock is moving.</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .25 }} variants={reveal} className="rgb-frame rounded-sm p-7 sm:p-8">
            <div className="mb-8 flex items-center justify-between"><span className="eyebrow">Profile / 01</span><GraduationCap size={18} className="text-primary" /></div>
            <dl className="divide-y hairline">
              <div className="grid gap-2 py-4 sm:grid-cols-[90px_1fr]"><dt className="mono text-[10px] uppercase tracking-[.1em] text-muted-foreground">Name</dt><dd className="text-sm">Sahil Kumar</dd></div>
              <div className="grid gap-2 py-4 sm:grid-cols-[90px_1fr]"><dt className="mono text-[10px] uppercase tracking-[.1em] text-muted-foreground">Field</dt><dd className="text-sm">Computer Science &amp; Engineering</dd></div>
              <div className="grid gap-2 py-4 sm:grid-cols-[90px_1fr]"><dt className="mono text-[10px] uppercase tracking-[.1em] text-muted-foreground">Focus</dt><dd className="text-sm leading-7">Software Development<br />Web Development<br />IoT &amp; Embedded Systems</dd></div>
            </dl>
            <div className="mt-7 flex flex-wrap gap-2">{portfolio.interests.map((interest) => <span key={interest} className="rounded-full border border-primary/20 bg-primary/[.04] px-3 py-2 font-mono text-[10px] uppercase tracking-[.1em] text-muted-foreground">{interest}</span>)}</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const groups = [
    { title: 'Programming', icon: <Code2 size={17} />, items: portfolio.skills.programming },
    { title: 'Web', icon: <FileCode2 size={17} />, items: portfolio.skills.web },
    { title: 'Database', icon: <Database size={17} />, items: portfolio.skills.database },
    { title: 'IoT & Embedded', icon: <Cpu size={17} />, items: portfolio.skills.iot },
    { title: 'Tools', icon: <Network size={17} />, items: portfolio.skills.tools },
    { title: 'Soft Skills', icon: <Check size={17} />, items: portfolio.skills.softSkills },
  ];
  return (
    <section id="skills" className="border-b hairline py-28">
      <div className="section-wrap">
        <SectionLabel index="02">The toolkit</SectionLabel>
        <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .25 }} variants={reveal}><h2 className="display max-w-sm text-5xl font-bold leading-[.98] sm:text-6xl">Tools for<br /><span className="text-primary">making things.</span></h2><p className="mt-7 max-w-sm leading-7 text-muted-foreground">A growing, practical toolkit shaped by coursework, experiments, and building with constraints.</p></motion.div>
          <div className="grid gap-px border hairline bg-border sm:grid-cols-2">
            {groups.map((group, index) => <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .3 }} variants={reveal} transition={{ delay: index * .06 }} key={group.title} className="tech-card bg-background p-7">
              <div className="mb-7 flex items-center justify-between text-primary"><span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[.11em]"><span className="tech-icon transition-colors">{group.icon}</span>{group.title}</span><span className="mono text-[10px] text-muted-foreground">0{index + 1}</span></div>
              <div className="flex flex-wrap gap-2">{group.items.map((item) => <span key={item} className="rounded border border-white/10 bg-secondary/55 px-2.5 py-2 font-mono text-xs text-foreground/85 transition-colors hover:border-primary/50 hover:text-primary">{item}</span>)}</div>
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
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .25 }} variants={reveal}><h2 className="display max-w-sm text-5xl font-bold leading-[.98] sm:text-6xl">Learning by<br /><span className="text-accent">layers.</span></h2></motion.div>
          <div className="relative border-y hairline py-2">
            <div className="timeline-line absolute bottom-8 left-[10px] top-8 w-px sm:left-[17px]" />
            {portfolio.education.map((item, index) => <motion.div initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .3 }} transition={{ delay: index * .12, duration: .55 }} key={item.school} className="relative grid gap-4 py-7 pl-9 sm:grid-cols-[64px_1fr_auto] sm:pl-12 sm:items-start">
              <span className="timeline-node absolute left-[3px] top-9 h-4 w-4 rounded-full border border-primary bg-background sm:left-[10px]" />
              <span className="mono text-xs text-primary">0{index + 1}</span>
              <div><h3 className="text-lg font-semibold">{item.school}</h3><p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin size={12} />{item.place}</p><p className="mt-4 max-w-md text-sm leading-6 text-foreground/80">{item.credential}</p></div>
              <div className="sm:text-right"><p className="mono text-[10px] uppercase tracking-[.1em] text-muted-foreground">{item.date}</p><p className="mt-3 font-mono text-xs text-primary">{item.result}</p></div>
            </motion.div>)}
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
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .25 }} variants={reveal}><h2 className="display text-5xl font-bold leading-[.98] sm:text-6xl">Built to<br /><span className="rgb-text text-primary">understand.</span></h2><p className="mt-6 max-w-md leading-7 text-muted-foreground">Small, purposeful projects that sit between an idea and a working prototype.</p></motion.div>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">{filters.map((item) => <button key={item} type="button" onClick={() => setFilter(item)} className={`rounded-full border px-4 py-2 font-mono text-[10px] uppercase tracking-[.1em] transition-all hover:-translate-y-0.5 ${filter === item ? 'border-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-fuchsia-500 text-slate-950 shadow-[0_0_20px_rgba(0,245,255,.2)]' : 'hairline bg-card/45 text-muted-foreground hover:border-primary/60 hover:text-foreground'}`} data-testid={`button-filter-${item.toLowerCase()}`}>{item}</button>)}</div>
        </div>
           <div className="grid gap-5 lg:grid-cols-2">
            {projects.map((project, index) => <motion.button type="button" key={project.id} onClick={() => onSelect(project)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={reveal} transition={{ delay: index * .08 }} className={`card-lift group relative overflow-hidden rounded-md border hairline bg-card/80 p-5 text-left ${project.id === 'smart-safety-helmet' ? 'lg:col-span-2 lg:grid lg:grid-cols-[1.08fr_.92fr] lg:gap-8 lg:p-7' : ''}`} data-testid={`card-project-${project.id}`}>
             <div className="relative flex min-h-[340px] flex-col justify-between">
                <div><div className="mb-6 flex items-center justify-between"><span className="eyebrow">{project.categories.join(' / ')} / {project.date}</span><ArrowUpRight size={19} className="text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary" /></div><ProjectVisual project={project} /></div>
             </div>
             <div className="relative flex flex-col justify-between py-1 lg:py-3">
               <div><div className="mb-5 flex items-start justify-between gap-4"><h3 className="display max-w-2xl text-3xl font-bold leading-tight lg:text-4xl">{project.title}</h3><span className="shrink-0 rounded-full border border-primary/40 px-3 py-1 font-mono text-[10px] uppercase tracking-[.1em] text-primary">View details</span></div><p className="max-w-2xl leading-7 text-muted-foreground">{project.description}</p></div>
               <div className="mt-10 flex flex-wrap gap-2">{project.stack.map((tag) => <span key={tag} className="rounded-sm border border-primary/15 bg-secondary/70 px-2.5 py-1.5 font-mono text-[10px] text-secondary-foreground transition-colors group-hover:border-primary/35">{tag}</span>)}</div>
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
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .25 }} variants={reveal}><SectionLabel index="05">Proof of practice</SectionLabel><h2 className="display max-w-sm text-5xl font-bold leading-[.98] sm:text-6xl">Pressure<br /><span className="text-accent">tested.</span></h2></motion.div>
        <div>
          <div className="relative border-l border-primary/35 pl-7 sm:pl-9">{portfolio.achievements.map((item, index) => <motion.div initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: .3 }} transition={{ delay: index * .12 }} key={item.title} className="relative pb-9 last:pb-0"><span className="timeline-node absolute -left-[2.05rem] top-1.5 grid h-5 w-5 place-items-center rounded-full border border-primary bg-background sm:-left-[2.55rem]"><Trophy className="text-primary" size={11} strokeWidth={1.7} /></span><div className="mono mb-3 text-[10px] uppercase tracking-[.1em] text-primary">0{index + 1} / Nov 2025</div><h3 className="font-semibold">{item.title}</h3><p className="mt-2 leading-7 text-muted-foreground">{item.text}</p></motion.div>)}</div>
        </div>
      </div>
    </section>
  );
}

function Certificates() {
  return (
    <section id="certificates" className="border-b hairline py-28">
      <div className="section-wrap">
        <SectionLabel index="06">Proof of learning</SectionLabel>
        <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .25 }} variants={reveal}>
            <h2 className="display max-w-sm text-5xl font-bold leading-[.98] sm:text-6xl">Learning<br /><span className="rgb-text text-primary">documented.</span></h2>
            <p className="mt-7 max-w-sm leading-7 text-muted-foreground">A few milestones from the coursework and structured practice shaping my programming foundation.</p>
          </motion.div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {portfolio.certificates.map((certificate, index) => (
              <motion.a
                key={certificate.title}
                href={certificate.file}
                target="_blank"
                rel="noreferrer"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: .2 }}
                variants={reveal}
                transition={{ delay: index * .08 }}
                className="group block rounded-sm border hairline bg-card/55 p-3 transition-colors hover:border-primary/60"
                data-testid={`link-certificate-${index + 1}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-white/10 bg-slate-950">
                  <img src={certificate.preview} alt={`${certificate.title} certificate`} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
                  <span className="absolute inset-x-2 bottom-2 flex items-center justify-between rounded-sm border border-white/10 bg-slate-950/80 px-3 py-2 font-mono text-[9px] uppercase tracking-[.1em] text-cyan-200 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                    Open certificate <ArrowUpRight size={13} />
                  </span>
                </div>
                <div className="mt-4 flex items-start justify-between gap-3">
                  <h3 className="text-sm font-semibold leading-5">{certificate.title}</h3>
                  <Award size={15} className="shrink-0 text-primary" />
                </div>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">{certificate.description}</p>
                <div className="mt-4 flex items-center justify-between gap-2 border-t hairline pt-3 font-mono text-[9px] uppercase tracking-[.08em] text-muted-foreground">
                  <span>{certificate.issuer}</span>
                  <span className="shrink-0 text-primary">{certificate.date}</span>
                </div>
              </motion.a>
            ))}
          </div>
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
         <SectionLabel index="07">Start a conversation</SectionLabel>
        <div className="grid gap-16 lg:grid-cols-[1fr_.75fr]">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .25 }} variants={reveal}><h2 className="display max-w-2xl text-[clamp(3.7rem,8vw,7.5rem)] font-bold leading-[.85]">Let’s build<br /><span className="rgb-text text-primary">something together.</span></h2><p className="mt-10 max-w-md text-lg leading-8 text-muted-foreground">Whether it’s a project, a question, or just a shared interest in building things, I’m always open to a thoughtful message.</p><div className="mt-12 grid max-w-lg gap-3 sm:grid-cols-2">{[<a key="email" href={`mailto:${portfolio.contact.email}`} className="card-lift flex items-center gap-2 rounded-sm border border-primary/20 bg-card/50 p-4 text-sm text-foreground hover:text-primary" data-testid="link-contact-email"><Mail size={16} />{portfolio.contact.email}</a>, <a key="phone" href={`tel:${portfolio.contact.phone.replace(/\s/g, '')}`} className="card-lift flex items-center gap-2 rounded-sm border border-primary/20 bg-card/50 p-4 text-sm text-foreground hover:text-primary" data-testid="link-contact-phone"><Phone size={16} />{portfolio.contact.phone}</a>]}</div><div className="mt-8 flex gap-3"><a href={portfolio.contact.github} target="_blank" rel="noreferrer" aria-label="Sahil Kumar on GitHub" className="icon-button grid h-10 w-10 place-items-center rounded-full border hairline hover:text-primary" data-testid="link-github"><Github size={17} /></a><a href={portfolio.contact.linkedin} target="_blank" rel="noreferrer" aria-label="Sahil Kumar on LinkedIn" className="icon-button grid h-10 w-10 place-items-center rounded-full border hairline hover:text-primary" data-testid="link-linkedin"><Linkedin size={17} /></a></div></motion.div>
          <motion.form initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={reveal} onSubmit={submit} className="rgb-frame rounded-sm p-6 sm:p-8" noValidate>
            <div className="mb-7 flex items-center justify-between"><span className="mono text-[10px] uppercase tracking-[.13em] text-muted-foreground">Direct line</span><Send size={17} className="text-primary" /></div>
            <label className="mb-5 block"><span className="mb-2 block font-mono text-[10px] uppercase tracking-[.1em] text-muted-foreground">Name</span><input value={form.name} onChange={update('name')} className="w-full border-0 border-b hairline bg-transparent px-0 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none" placeholder="Your name" data-testid="input-contact-name" /></label>
            <label className="mb-5 block"><span className="mb-2 block font-mono text-[10px] uppercase tracking-[.1em] text-muted-foreground">Email</span><input type="email" value={form.email} onChange={update('email')} className="w-full border-0 border-b hairline bg-transparent px-0 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none" placeholder="you@example.com" data-testid="input-contact-email" /></label>
             <label className="mb-5 block"><span className="mb-2 block font-mono text-[10px] uppercase tracking-[.1em] text-muted-foreground">Subject</span><input value={form.subject} onChange={update('subject')} className="w-full border-0 border-b hairline bg-transparent px-0 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none" placeholder="A project or opportunity" data-testid="input-contact-subject" /></label>
            <label className="mb-7 block"><span className="mb-2 block font-mono text-[10px] uppercase tracking-[.1em] text-muted-foreground">Message</span><textarea value={form.message} onChange={update('message')} rows={4} className="w-full resize-none border-0 border-b hairline bg-transparent px-0 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none" placeholder="What are you working on?" data-testid="input-contact-message" /></label>
            {feedback && <p className="mb-5 flex items-center gap-2 text-xs text-primary" role="status" data-testid="status-contact-feedback"><Check size={14} />{feedback}</p>}
             <button type="submit" className="solid-button flex w-full items-center justify-center gap-2 rounded-sm px-5 py-3.5 font-mono text-xs font-semibold uppercase tracking-[.12em] text-primary-foreground" data-testid="button-contact-submit">Send via email <ArrowUpRight size={16} /></button>
           </motion.form>
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
      <motion.div initial={{ opacity: 0, y: 18, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="rgb-frame relative max-h-[90dvh] w-full max-w-2xl overflow-auto rounded-md p-7 shadow-2xl sm:p-10">
        <button type="button" onClick={close} className="icon-button absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border hairline text-muted-foreground hover:text-foreground" aria-label="Close project details" data-testid="button-close-project"><CircleX size={17} /></button>
          <div className="eyebrow mb-12">{project.categories.join(' / ')} / {project.date}</div>
         <h2 id="project-modal-title" className="display max-w-xl text-4xl font-bold leading-tight sm:text-5xl">{project.title}</h2>
         <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">{project.description}</p>
         <div className="mt-12 border-t hairline pt-6"><p className="mono mb-4 text-[10px] uppercase tracking-[.14em] text-muted-foreground">Built with</p><div className="flex flex-wrap gap-2">{project.stack.map((item) => <span key={item} className="rounded-sm border border-primary/20 bg-secondary px-3 py-2 font-mono text-xs text-secondary-foreground">{item}</span>)}</div></div>
         <div className="mt-10 border-t hairline pt-6"><p className="mono mb-4 text-[10px] uppercase tracking-[.14em] text-muted-foreground">Key development points</p><ul className="space-y-4">{project.details.map((detail) => <li key={detail} className="flex gap-3 text-sm leading-7 text-foreground/80"><span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />{detail}</li>)}</ul></div>
        <div className="mt-10 flex items-center gap-2 text-xs text-muted-foreground"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> {project.label}</div>
      </motion.div>
    </motion.div>
  );
}

function Footer() {
  const [resumeAvailable, setResumeAvailable] = useState(false);
  useEffect(() => { fetch('/resume.pdf', { method: 'HEAD' }).then((response) => setResumeAvailable(response.ok)).catch(() => setResumeAvailable(false)); }, []);
  return <footer className="relative border-t hairline py-8"><div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-70" /><div className="section-wrap flex flex-col justify-between gap-6 sm:flex-row sm:items-center"><div><p className="mono text-sm font-semibold uppercase tracking-[.12em] text-foreground">Sahil.dev</p><p className="mt-2 font-mono text-[10px] uppercase tracking-[.1em] text-muted-foreground">Computer Science &amp; Engineering student</p><p className="mt-2 font-mono text-[10px] uppercase tracking-[.1em] text-muted-foreground">© {new Date().getFullYear()} Sahil Kumar</p></div><div className="flex flex-wrap items-center gap-5 font-mono text-[10px] uppercase tracking-[.1em] text-muted-foreground"><button type="button" onClick={() => scrollToSection('about')} className="hover:text-primary">About</button><button type="button" onClick={() => scrollToSection('projects')} className="hover:text-primary">Projects</button>{resumeAvailable ? <a href="/resume.pdf" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-primary hover:text-accent" data-testid="link-resume"><Download size={14} /> View resume</a> : <span className="flex items-center gap-2" data-testid="status-resume-unavailable"><Download size={14} /> Resume unavailable</span>}<button type="button" onClick={() => scrollToSection('home')} className="flex items-center gap-2 hover:text-foreground" data-testid="button-back-to-top">Back to top <ArrowUpRight size={14} /></button></div></div></footer>;
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
  return <div className="portfolio-shell noise min-h-[100dvh]"><CursorLayer /><div className="progress-track"><div className="progress-bar" style={{ transform: `scaleX(${progress})` }} /></div><Header activeSection={activeSection} dark={dark} setDark={setDark} /><main><Hero onContact={() => scrollToSection('contact')} onWork={() => scrollToSection('projects')} resumeAvailable={resumeAvailable} /><About /><Skills /><Education /><Work onSelect={setSelectedProject} /><Achievements /><Certificates /><Contact /></main><Footer /><AnimatePresence>{selectedProject && <ProjectModal project={selectedProject} close={() => setSelectedProject(null)} />}</AnimatePresence></div>;
}

function Router() {
  return <ErrorBoundary><Switch><Route path="/" component={Home} /><Route component={NotFound} /></Switch></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><Router /></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;
