
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Shield,
  Menu,
  X,
  ArrowRight,
  ChevronRight,
  BrainCircuit,
  Target,
  Users,
  BookOpen,
  MessageCircle,
  Radar,
  GraduationCap,
  Trophy,
  Clock3,
  Zap,
  Globe,
  ShieldCheck,
  ClipboardCheck,
  Crosshair,
  Sparkles,
} from 'lucide-react'

const modules = [
  {
    icon: Target,
    title: 'OIR & PPDT',
    description: 'Build reasoning ability and master the first stage of SSB screening.',
    tag: 'SCREENING',
  },
  {
    icon: BrainCircuit,
    title: 'Psychology Tests',
    description: 'Practise TAT, WAT, SRT and SDT with realistic test conditions.',
    tag: 'PSYCHOLOGY',
  },
  {
    icon: MessageCircle,
    title: 'Personal Interview',
    description: 'Prepare for PIQ-based questions and realistic interview sessions.',
    tag: 'INTERVIEW',
  },
  {
    icon: Users,
    title: 'GTO Ground',
    description: 'Learn group discussion, planning exercises and outdoor tasks.',
    tag: 'GTO',
  },
  {
    icon: BookOpen,
    title: 'Lecturette & GD',
    description: 'Explore discussion topics, organise your thoughts and practise speaking.',
    tag: 'COMMUNICATION',
  },
  {
    icon: Globe,
    title: 'Defence Knowledge',
    description: 'Explore defence news, military organisation and current affairs.',
    tag: 'KNOWLEDGE',
  },
]

const services = [
  {
    name: 'Indian Army',
    subtitle: 'LAND • COURAGE • LEADERSHIP',
    icon: Shield,
    description: 'Prepare for Army SSB entries and develop the qualities required of an Army officer.',
  },
  {
    name: 'Indian Navy',
    subtitle: 'SEA • DISCIPLINE • EXCELLENCE',
    icon: Crosshair,
    description: 'Explore naval knowledge, technical preparation and Navy selection processes.',
  },
  {
    name: 'Indian Air Force',
    subtitle: 'AIR • PRECISION • DETERMINATION',
    icon: Radar,
    description: 'Prepare for AFSB, AFCAT and other Air Force selection opportunities.',
  },
]

export default function Landing() {
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="min-h-screen overflow-hidden bg-[#07111f] text-slate-100">

      {/* NAVBAR */}
      <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#07111f]/90 backdrop-blur-xl">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

          <a href="#home" className="flex items-center gap-3" onClick={closeMenu}>
            <div className="rounded-xl border border-cyan-400/30 bg-cyan-400/10 p-2">
              <Shield className="h-7 w-7 text-cyan-400" />
            </div>

            <div>
              <h1 className="text-lg font-black tracking-widest">
                SSB <span className="text-cyan-400">MISSION</span>
              </h1>
              <p className="text-[9px] tracking-[0.25em] text-slate-500">
                OFFICER TRAINING PORTAL
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-8 text-sm text-slate-400 lg:flex">
            <a href="#home" className="transition hover:text-cyan-400">Home</a>
            <a href="#modules" className="transition hover:text-cyan-400">Preparation</a>
            <a href="#services" className="transition hover:text-cyan-400">Services</a>
            <a href="#features" className="transition hover:text-cyan-400">Features</a>
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              to="/login"
              className="rounded-lg px-4 py-2 text-sm text-slate-300 transition hover:text-white"
            >
              Log in
            </Link>

            <Link
              to="/register"
              className="flex items-center gap-2 rounded-lg bg-cyan-400 px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
            >
              Get Started <ArrowRight size={16} />
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg border border-white/10 p-2 lg:hidden"
            aria-label="Toggle navigation"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </nav>

        {menuOpen && (
          <div className="border-t border-white/10 bg-[#0b192a] px-6 py-5 lg:hidden">
            {[
              ['Home', '#home'],
              ['Preparation', '#modules'],
              ['Services', '#services'],
              ['Features', '#features'],
            ].map(([name, link]) => (
              <a
                key={name}
                href={link}
                onClick={closeMenu}
                className="block border-b border-white/5 py-3 text-sm text-slate-300 hover:text-cyan-400"
              >
                {name}
              </a>
            ))}

            <Link
              to="/login"
              onClick={closeMenu}
              className="block border-b border-white/5 py-3 text-sm text-slate-300 hover:text-cyan-400"
            >
              Log in
            </Link>

            <Link
              to="/register"
              onClick={closeMenu}
              className="mt-4 block rounded-lg bg-cyan-400 px-4 py-3 text-center text-sm font-bold text-slate-950"
            >
              Get Started
            </Link>
          </div>
        )}
      </header>

      {/* HERO */}
      <main>
        <section id="home" className="hero-grid relative flex min-h-[720px] items-center pt-28">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#07111f]/10 to-[#07111f]" />

          <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-5 py-20 lg:grid-cols-2 lg:px-8">

            <div>
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-xs font-semibold tracking-wider text-cyan-300">
                <Sparkles size={14} />
                YOUR SSB PREPARATION STARTS HERE
              </div>

              <h2 className="max-w-2xl text-5xl font-black leading-[1.12] tracking-tight sm:text-6xl lg:text-7xl">
                PREPARE.
                <br />
                PERFORM.
                <br />
                <span className="glow-text text-cyan-400">LEAD.</span>
              </h2>

              <p className="mt-7 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
                Your complete preparation destination for the Services
                Selection Board. Train your mind, improve your personality
                and prepare for a career in the Indian Armed Forces.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <a
                  href="#modules"
                  className="flex items-center gap-3 rounded-lg bg-cyan-400 px-6 py-4 font-bold text-slate-950 transition hover:-translate-y-1 hover:bg-cyan-300"
                >
                  Explore Preparation <ArrowRight size={18} />
                </a>

                <a
                  href="#services"
                  className="flex items-center gap-3 rounded-lg border border-white/15 px-6 py-4 font-semibold text-white transition hover:border-cyan-400/50 hover:bg-white/5"
                >
                  Explore Services <ChevronRight size={18} />
                </a>
              </div>

              <div className="mt-12 flex flex-wrap gap-8 border-t border-white/10 pt-8">
                <div>
                  <p className="text-2xl font-bold text-white">03</p>
                  <p className="mt-1 text-xs text-slate-500">Armed Forces</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">360°</p>
                  <p className="mt-1 text-xs text-slate-500">Preparation</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">01</p>
                  <p className="mt-1 text-xs text-slate-500">Mission</p>
                </div>
              </div>
            </div>

            {/* HERO VISUAL */}
            <div className="relative mx-auto w-full max-w-lg">
              <div className="absolute inset-10 rounded-full bg-cyan-400/10 blur-[90px]" />

              <div className="glass-card cyan-glow relative overflow-hidden rounded-3xl p-6 sm:p-8">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.2em] text-cyan-400">
                      MISSION CONTROL
                    </p>
                    <h3 className="mt-2 text-xl font-bold">Officer Preparation</h3>
                  </div>

                  <div className="rounded-xl bg-cyan-400/10 p-3">
                    <ShieldCheck className="h-7 w-7 text-cyan-400" />
                  </div>
                </div>

                <div className="my-8 flex justify-center">
                  <div className="relative flex h-56 w-56 items-center justify-center rounded-full border border-cyan-400/20">
                    <div className="absolute inset-4 rounded-full border border-dashed border-cyan-400/30" />
                    <div className="absolute inset-10 rounded-full border border-cyan-400/30" />

                    <div className="flex h-28 w-28 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-400/10">
                      <Shield className="h-16 w-16 text-cyan-400" />
                    </div>

                    <span className="absolute -top-2 rounded-full bg-[#10283d] px-3 py-1 text-[10px] tracking-widest text-cyan-300">
                      MISSION ACTIVE
                    </span>

                    <span className="absolute -bottom-2 rounded-full bg-[#10283d] px-3 py-1 text-[10px] text-slate-400">
                      OFFICER DEVELOPMENT
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: BrainCircuit, name: 'Psychology', value: 'TAT / WAT / SRT' },
                    { icon: Users, name: 'GTO Tasks', value: 'Group Training' },
                    { icon: MessageCircle, name: 'Interview', value: 'Personal Practice' },
                    { icon: Target, name: 'Screening', value: 'OIR / PPDT' },
                  ].map((item) => (
                    <div
                      key={item.name}
                      className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                    >
                      <item.icon className="mb-3 h-5 w-5 text-cyan-400" />
                      <p className="text-sm font-semibold">{item.name}</p>
                      <p className="mt-1 text-[10px] text-slate-500">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex items-center justify-between rounded-xl bg-cyan-400/5 px-4 py-3">
                  <span className="text-xs text-slate-400">YOUR NEXT MISSION</span>
                  <Link
                    to="/register"
                    className="flex items-center gap-2 text-xs font-bold text-cyan-400"
                  >
                    GET STARTED <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* TRUST STRIP */}
        <section className="border-y border-white/10 bg-[#0b192a]">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-5 py-8 sm:grid-cols-3 lg:px-8">
            {[
              ['01', 'Complete SSB Preparation', 'One platform for every stage'],
              ['02', 'All Three Services', 'Army, Navy and Air Force'],
              ['03', 'Continuous Improvement', 'Practise, analyse and improve'],
            ].map(([number, title, description]) => (
              <div key={number} className="flex items-center gap-4">
                <span className="text-3xl font-black text-cyan-400/40">{number}</span>
                <div>
                  <p className="font-semibold text-white">{title}</p>
                  <p className="mt-1 text-xs text-slate-500">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MODULES */}
        <section id="modules" className="scroll-mt-24 px-5 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 max-w-2xl">
              <p className="mb-4 text-xs font-bold tracking-[0.3em] text-cyan-400">
                TRAINING MODULES
              </p>
              <h2 className="text-3xl font-bold sm:text-5xl">
                Everything you need.
                <span className="text-cyan-400"> One mission.</span>
              </h2>
              <p className="mt-5 leading-7 text-slate-400">
                Prepare for every stage of the selection process through
                structured practice and learning modules.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {modules.map((module, index) => (
                <article
                  key={module.title}
                  className="glass-card group rounded-2xl p-7 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/40"
                >
                  <div className="mb-7 flex items-center justify-between">
                    <div className="rounded-xl border border-cyan-400/20 bg-cyan-400/10 p-3">
                      <module.icon className="h-6 w-6 text-cyan-400" />
                    </div>
                    <span className="text-xs font-bold text-slate-600">
                      0{index + 1}
                    </span>
                  </div>

                  <p className="mb-3 text-[10px] font-bold tracking-[0.2em] text-cyan-400">
                    {module.tag}
                  </p>
                  <h3 className="text-xl font-bold">{module.title}</h3>
                  <p className="mt-3 min-h-16 text-sm leading-6 text-slate-400">
                    {module.description}
                  </p>

                  <Link
                    to="/login"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 transition group-hover:gap-4"
                  >
                    Explore module <ArrowRight size={16} />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="scroll-mt-24 border-y border-white/10 bg-[#0b192a] px-5 py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-14 text-center">
              <p className="mb-4 text-xs font-bold tracking-[0.3em] text-cyan-400">
                THREE SERVICES. ONE NATION.
              </p>
              <h2 className="text-3xl font-bold sm:text-5xl">
                Choose your <span className="text-cyan-400">direction.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-400">
                Explore preparation resources for the Army, Navy and
                Air Force, with common SSB training and service-specific learning.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {services.map((service) => (
                <article
                  key={service.name}
                  className="glass-card rounded-2xl p-8 transition hover:border-cyan-400/40"
                >
                  <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-xl bg-cyan-400/10">
                    <service.icon className="h-8 w-8 text-cyan-400" />
                  </div>

                  <p className="text-[10px] font-bold tracking-widest text-cyan-400">
                    {service.subtitle}
                  </p>
                  <h3 className="mt-3 text-2xl font-bold">{service.name}</h3>
                  <p className="mt-4 min-h-20 text-sm leading-7 text-slate-400">
                    {service.description}
                  </p>

                  <Link
                    to="/login"
                    className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cyan-400"
                  >
                    Explore preparation <ArrowRight size={16} />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="scroll-mt-24 px-5 py-24 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center">

            <div>
              <p className="mb-4 text-xs font-bold tracking-[0.3em] text-cyan-400">
                NEXT-GENERATION PREPARATION
              </p>

              <h2 className="text-3xl font-bold leading-tight sm:text-5xl">
                Smarter preparation.
                <br />
                <span className="text-cyan-400">Better practice.</span>
              </h2>

              <p className="mt-6 leading-8 text-slate-400">
                Beyond static notes and question banks, SSB MISSION will
                bring together interactive practice, personalised learning
                and continuously updated preparation resources.
              </p>

              <div className="mt-9 space-y-6">
                {[
                  [MessageCircle, 'SSB Mission Mentor', 'An interactive preparation assistant for your questions and practice.'],
                  [Radar, 'Topic Intelligence', 'Discover publicly reported GD and Lecturette topics from multiple sources.'],
                  [Trophy, 'Performance Tracking', 'Track practice sessions, progress and personal milestones.'],
                  [Clock3, 'Realistic Timed Practice', 'Build familiarity with test formats and time management.'],
                ].map(([Icon, title, description]) => (
                  <div key={title} className="flex gap-4">
                    <div className="h-fit rounded-lg bg-cyan-400/10 p-3">
                      <Icon className="h-5 w-5 text-cyan-400" />
                    </div>

                    <div>
                      <h3 className="font-bold">{title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        {description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card cyan-glow rounded-3xl p-7 sm:p-10">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-xs tracking-widest text-cyan-400">
                    MISSION INTELLIGENCE
                  </p>
                  <h3 className="mt-2 text-2xl font-bold">
                    Your preparation hub
                  </h3>
                </div>

                <Sparkles className="h-8 w-8 text-cyan-400" />
              </div>

              <div className="space-y-4">
                {[
                  [BrainCircuit, 'Psychology Practice', 'Develop structured responses'],
                  [GraduationCap, 'Knowledge Hub', 'Build defence awareness'],
                  [ClipboardCheck, 'Mock Assessments', 'Review your performance'],
                  [Zap, 'Daily Missions', 'Stay consistent with practice'],
                ].map(([Icon, title, description]) => (
                  <div
                    key={title}
                    className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4"
                  >
                    <Icon className="h-6 w-6 shrink-0 text-cyan-400" />

                    <div>
                      <p className="text-sm font-semibold">{title}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {description}
                      </p>
                    </div>

                    <ChevronRight className="ml-auto h-5 w-5 text-slate-600" />
                  </div>
                ))}
              </div>

              <div className="mt-7 rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-5">
                <p className="text-xs font-bold tracking-widest text-cyan-400">
                  YOUR MISSION
                </p>
                <p className="mt-2 text-lg font-semibold">
                  Consistency creates progress.
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  Start preparing. Improve every day.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* CTA */}
        <section id="join" className="scroll-mt-24 px-5 pb-24 lg:px-8">
          <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-[#102b46] to-[#0a1728] px-6 py-16 text-center sm:px-12">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

            <div className="relative">
              <ShieldCheck className="mx-auto h-12 w-12 text-cyan-400" />

              <p className="mt-6 text-xs font-bold tracking-[0.3em] text-cyan-400">
                THE JOURNEY STARTS NOW
              </p>

              <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-black sm:text-5xl">
                Your dream deserves
                <span className="text-cyan-400">
                  {' '}disciplined preparation.
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-xl leading-7 text-slate-400">
                Take the first step towards your goal. Prepare with purpose,
                practise with consistency and keep moving forward.
              </p>

              <Link
                to="/register"
                className="mt-9 inline-flex items-center gap-3 rounded-lg bg-cyan-400 px-8 py-4 font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                Begin Your Journey <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-white/10 bg-[#050c16] px-5 py-10 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 sm:flex-row sm:items-center">

          <div>
            <h2 className="text-lg font-black tracking-widest">
              SSB <span className="text-cyan-400">MISSION</span>
            </h2>
            <p className="mt-2 text-xs text-slate-500">
              Your Journey. Your Commission.
            </p>
          </div>

          <div className="flex flex-wrap gap-6 text-xs text-slate-500">
            <a href="#home" className="hover:text-cyan-400">Home</a>
            <a href="#modules" className="hover:text-cyan-400">Preparation</a>
            <a href="#services" className="hover:text-cyan-400">Services</a>
            <a href="#features" className="hover:text-cyan-400">Features</a>
            <Link to="/login" className="hover:text-cyan-400">Login</Link>
          </div>

          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} SSB MISSION
          </p>
        </div>
      </footer>

    </div>
  )
}
