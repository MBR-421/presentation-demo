import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import UserBadge from "./components/UserBadge.jsx";
import KPI from "./components/KPI";
import Tag from "./components/Tag";
import { Card } from "./components/Card";
import { Timeline, TimelineItem } from "./components/Timeline";
import Progress from "./components/Progress";
import ProjectCard from "./components/ProjectCard";


const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "state", label: "Current State" },
  { id: "development", label: "Development" },
  { id: "priorities", label: "Priorities" },
  { id: "projects", label: "Projects" },
  { id: "evidence", label: "Evidence" },
];

const NAV = [{ id: "top", label: "Top" }, ...SECTIONS];

function useActiveSection(ids, rootEl) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (els.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { 
        root: rootEl || null,
        threshold: [0.55] 
      }
    );
    els.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [ids, rootEl]);
  return [active, setActive];
}

function SectionShell({ id, eyebrow, title, children }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.6 });

  return (
    <section
      id={id}
      className="snap-start min-h-[calc(100dvh-112px)] flex items-center pt-28"
      aria-labelledby={`${id}-title`}
    >
      {/* container to restore left/right space */}
      <div className="mx-auto max-w-6xl px-4 w-full">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24, scale: 0.985 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.3, y: 24, scale: 0.985 }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
          className="max-w-4xl mx-auto"
        >
          <p className="text-[11px] uppercase tracking-widest text-sky-700/80">{eyebrow}</p>
          <h2
            id={`${id}-title`}
            className="mt-2 text-3xl md:text-5xl font-semibold tracking-tight text-slate-900 text-balance"
          >
            {title}
          </h2>

          <div className="mt-6 rounded-3xl border border-slate-200/80 bg-white/90 backdrop-blur p-6 md:p-8 shadow-[0_10px_30px_-10px_rgba(15,23,42,.12)]">
            {children}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


export default function AppShell() {
  
  const mainRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (mainRef.current && !ready) setReady(true);
  }, [ready]);

  const { scrollYProgress } = useScroll({ container: mainRef });

  const [active] = useActiveSection(
  NAV.map((s) => s.id),
  ready ? mainRef.current : null
  );

  const layerY1 = useTransform(scrollYProgress, [0, 1], [0, -120]);   // slow
  const layerY2 = useTransform(scrollYProgress, [0, 1], [0, -240]);   // medium
  const layerY3 = useTransform(scrollYProgress, [0, 1], [0, -360]);   // faster accent

  const scrollTo = (id) => {
  if (id === "top") {
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};


  const progressWidth = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  return (
    <div className="relative min-h-dvh overflow-hidden">
      {/* PARALLAX BACKGROUND LAYERS */}
      <motion.div
        aria-hidden
        style={{ y: layerY1 }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="h-full w-full bg-[radial-gradient(1000px_600px_at_10%_-10%,theme(colors.blue.200/.22),transparent_60%)]" />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ y: layerY2 }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="h-full w-full bg-[radial-gradient(900px_500px_at_90%_10%,theme(colors.violet.200/.18),transparent_60%)]" />
      </motion.div>
      <motion.div
        aria-hidden
        style={{ y: layerY3 }}
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="h-full w-full bg-[linear-gradient(180deg,transparent,white_45%)]" />
      </motion.div>

{/* FIXED HEADER */}
<motion.header
  className="fixed top-0 left-0 right-0 z-30 backdrop-blur"
  style={{
    backgroundColor: useTransform(scrollYProgress, [0, 1], ["rgba(255,255,255,0.85)", "rgba(255,255,255,0.65)"]),
    borderBottomColor: useTransform(scrollYProgress, [0, 1], ["rgba(226,232,240,0.9)", "rgba(226,232,240,0.6)"]),
  }}
>
  <div className="h-0.5 w-full bg-gradient-to-r from-sky-400/70 via-violet-400/70 to-fuchsia-400/70" />
  <motion.div
    className="mx-auto max-w-6xl px-4 flex items-center justify-between"
    style={{ height: useTransform(scrollYProgress, [0, 1], [72, 56]) }}
    transition={{ type: "spring", stiffness: 250, damping: 28 }}
  >
    <div className="flex items-center gap-3">
      <div className="h-9 w-9 rounded-2xl bg-white/90 border border-slate-200 shadow-sm grid place-items-center">
        <span className="text-[11px] font-semibold tracking-wider text-slate-800">MR</span>
      </div>
      <div className="leading-tight">
        <div className="text-[11px] uppercase tracking-widest text-slate-500">Matt Rose</div>
        <h1 className="text-lg md:text-xl font-semibold tracking-tight text-slate-900">
          Core Systems &amp; Innovation
        </h1>
      </div>
    </div>
    <UserBadge />
  </motion.div>

  {/* centered pill nav */}
  <div className="mx-auto max-w-6xl px-4 pb-2">
    <nav className="hidden md:flex items-center justify-center">
      <div className="rounded-full border border-slate-200/80 bg-white/80 shadow-sm backdrop-blur px-1 py-1">
        <ul className="flex items-center gap-1">
          {SECTIONS.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id}>
                <button
                  onClick={() => scrollTo(s.id)}
                  className={[
                    "relative px-3.5 py-1.5 text-sm rounded-full transition",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60",
                    isActive ? "bg-slate-900 text-white shadow-sm" : "text-slate-700 hover:text-slate-900 hover:bg-white",
                  ].join(" ")}
                >
                  {s.label}
                  {isActive && (
                    <span className="absolute left-3 right-3 -bottom-[6px] h-[2px] rounded-full bg-gradient-to-r from-sky-400 via-violet-400 to-fuchsia-400" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  </div>

  {/* progress bar (track + indicator) */}
<div className="relative h-1.5 md:h-2 bg-slate-200/90 dark:bg-slate-700/60">
  <motion.div
    className="absolute inset-y-0 left-0 rounded-r-full
               bg-gradient-to-r from-sky-500 via-violet-500 to-fuchsia-500"
    style={{ width: progressWidth }}
  />
  {/* soft glow */}
  <motion.div
    className="pointer-events-none absolute inset-y-0 left-0 blur
               bg-gradient-to-r from-sky-400/50 via-violet-400/50 to-fuchsia-400/50"
    style={{ width: progressWidth }}
  />
</div>
</motion.header>

{/* spacer to offset fixed header (matches 72px tall header at top) */}
<div aria-hidden className="h-[96px] md:h-[112px]" />

      {/* SNAP SCROLL CONTAINER */}
<main
  ref={mainRef}
  className="snap-y snap-mandatory h-[calc(100dvh-112px)] overflow-y-scroll scroll-smooth"
>
  {/* HERO */}
<section
  id="top"
  className="snap-start min-h-[calc(100dvh-112px)] flex items-center justify-center px-4"
>
  <div className="mx-auto max-w-6xl px-4 w-full">
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="absolute -top-1/2 left-1/3 h-[200%] w-1/2 rotate-12 bg-gradient-to-b from-white/60 to-transparent" />
      <div className="relative px-6 py-12 md:px-10 md:py-16">
        <h2 className="mt-2 text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 text-balance text-center">
          Vision, infrastructure, delivery<br />
          <br />
          Aligning platforms, automation, data, and frontend workflows so staff and students benefit where it counts.
        </h2>
      </div>
    </div>
  </div>
</section>


<SectionShell id="overview" eyebrow="Overview" title="Responsibility area at a glance">
  <Card>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <KPI label="Platforms managed" value="6" hint="Canvas, Zoom, Panopto, Turnitin, Padlet, Vimeo" />
      <KPI label="Admin hours saved" value="100+" hint="Rolling 12 months via automation" />
      <KPI label="Active pilots" value="3" hint="Learning Analytics, Assignment Planner, Curriculum Builder" />
      <KPI label="Stakeholders Engaged" value="+80" hint="Project Feedback, VLE Review, Training" />
    </div>

    <div className="mt-6 grid md:grid-cols-2 gap-6">
      <Card>
        <div className="text-sm font-semibold text-slate-900 mb-2">Framing</div>
        <p className="text-slate-700">
          I align system and process architecture, data and automation to turn ideas into resilient, scalable digital learning services, with pedagogy and user experience at their heart.
        </p>
      </Card>

      <Card>
        <div className="text-sm font-semibold text-slate-900 mb-2">Scope (what I own)</div>
        <ul className="space-y-2 text-sm text-slate-700">
          <li>Learning platform management (Canvas, Panopto, Zoom, Turnitin, Padlet, Vimeo)</li>
          <li>Automation of key processes (Blueprints, Reporting, VLE Review)</li>
          <li>Data foundations & analytics prototypes (models, predictive, ML)</li>
          <li>Early frontend pilots (Curriculum Builder, Assignment Planner, Digital Learning Hub)</li>
        </ul>
      </Card>
    </div>
  </Card>
</SectionShell>


  {/* CURRENT STATE */}
<SectionShell id="state" eyebrow="Current State" title="What exists, what works, and the constraints">
  <div className="grid md:grid-cols-3 gap-4">
    <Card>
      <div className="text-sm font-semibold text-slate-900 mb-2">What’s working</div>
      <ul className="space-y-2 text-sm text-slate-700">
        <li>Automation visibly reducing friction and turbocharging capability</li> 
        <li>ROI and surfacing insights</li>
        <li>Growing capability to build institution-fit frontend prototypes</li>
        <li>Momentum for data-led prioritisation & adoption</li>
      </ul>
    </Card>
    
    <Card>
      <div className="text-sm font-semibold text-slate-900 mb-2">Where we are (numbers)</div>
      <ul className="space-y-2 text-sm text-slate-700">
        <li>6 platforms actively managed</li>
        <li>~100 admin hours saved (12 months)</li>
        <li>3 pilots in steady progress</li>
      </ul>
    </Card>

    <Card>
      <div className="text-sm font-semibold text-slate-900 mb-2">Key challenges</div>
      <ul className="space-y-2 text-sm text-slate-700">
        <li>Infra gap: no shared hosting/scheduling; fragmented auth/secrets/logging</li>
        <li>Cultural engagement uneven - tools & initiatives under-used</li>
        <li>Data infrastructure patchy → inconsistent models</li>
      </ul>
    </Card>

  </div>
</SectionShell>


  {/* DEVELOPMENT */}
<SectionShell id="development" eyebrow="Development" title="My growth areas to lead at scale">
  <div className="grid md:grid-cols-2 gap-6">
    <Card>
      <div className="text-sm font-semibold text-slate-900 mb-3">Skills to deepen</div>
      <ul className="space-y-2 text-sm text-slate-700">
        <li>Digital strategy & leadership</li>
        <li>UX design & accessibility</li>
        <li>Cloud ops (Azure/AWS), monitoring, deployment patterns</li>
      </ul>

      <div className="text-sm font-semibold text-slate-900 mt-6 mb-3">Resources / learning</div>
      <ul className="space-y-2 text-sm text-slate-700">
        <li>FutureLearn - Introduction to UX Design, Digital Leadership</li>
        <li>Pilot groups</li>
        <li>User forums (Teams channels?)</li>
      </ul>
    </Card>

    <Card>
      <div className="text-sm font-semibold text-slate-900 mb-3">Relationships to build</div>
      <ul className="space-y-2 text-sm text-slate-700">
        <li>Technology partnership on shared infra patterns</li>
        <li>Academic champions - co-creation & early adopters</li>
        <li>Leadership sponsors - align on ROI metrics & cadence</li>
      </ul>

      <div className="text-sm font-semibold text-slate-900 mt-6 mb-3">Capability ladder</div>
      <Timeline>
        <TimelineItem when="Q1" title="Platform patterns">
          Entra SSO, secrets, CI/CD templates, logging/alerts.
        </TimelineItem>
        <TimelineItem when="Q2" title="Data foundations">
          Source → bronze/silver → metrics layer (<Tag tone="violet">dbt</Tag> or equivalent).
        </TimelineItem>
        <TimelineItem when="Q3" title="Governed access">
          Role-based datasets for ops & leadership dashboards.
        </TimelineItem>
        <TimelineItem when="Q4" title="Scale & handover">
          SRE guardrails, runbooks, ownership clarified.
        </TimelineItem>
      </Timeline>
    </Card>
  </div>
</SectionShell>


  {/* PRIORITIES */}
<SectionShell id="priorities" eyebrow="Priorities" title="Quick wins & longer-term enhancements">
  <div className="grid md:grid-cols-2 gap-6">
    <Card>
      <div className="text-sm font-semibold text-slate-900 mb-3">Quick wins (next 3–6 months)</div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between">
            <div className="font-medium text-slate-900">
              Secure hosting for full-stack development
            </div>
            <Tag tone="rose">Required</Tag>
          </div>
          <div className="mt-2"><Progress value={75} /></div>
          <div className="mt-1 text-xs text-slate-500">Move prototypes off local machines; stable CI/CD.</div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <div className="font-medium text-slate-900">
              Assignment Planner: prototype → pilot → beta (2 departments)
            </div>
            <Tag tone="emerald">Beta</Tag>
          </div>
          <div className="mt-2"><Progress value={65} /></div>
          <div className="mt-1 text-xs text-slate-500">Safe, useful AI embedded in real workflows.</div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <div className="font-medium text-slate-900">
              Impact dashboard (live)
            </div>
            <Tag tone="amber">Prototype</Tag>
          </div>
          <div className="mt-2"><Progress value={40} /></div>
          <div className="mt-1 text-xs text-slate-500">
            <span className="italic">&lt;60s</span> answers to exec questions; adoption & risk posture.
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <div className="font-medium text-slate-900">Licence monitoring automation</div>
            <Tag tone="amber">Prototype</Tag>
          </div>
          <div className="mt-2"><Progress value={40} /></div>
          <div className="mt-1 text-xs text-slate-500">Alerts on under/over-utilisation and renewal timing.</div>
        </div>

        
      </div>
    </Card>

    <Card>
      <div className="text-sm font-semibold text-slate-900 mb-3">Longer-term development</div>
      <ul className="space-y-2 text-sm text-slate-700">

        <li>Cross functional refresh of our <strong>digital infrastructure</strong> - making targetted enhancements and tidy ups</li>
        <li>Roll out <strong>Assignment Planner</strong> at scale</li>
        <li>Begin development of <strong>Curriculum Builder</strong> into a supported product</li>
        <li><strong>Lightweight governance</strong> for prototype → pilot → product</li>
        <li>Team documentation & <strong>upskilling</strong> for resilience & scale</li>
      </ul>
    </Card>
  </div>
</SectionShell>

  {/* PROJECTS */}
<SectionShell id="projects" eyebrow="Projects" title="Portfolio">
  <div className="grid md:grid-cols-2 gap-4">
    
    <ProjectCard
      name="Digital Learning Hub / Learner Analytics"
      stack="Collectors • Metrics layer • Dashboards"
      status={{ label: "Pilot", tone: "emerald" }}
      progress={40}
      notes="Data contracts, lineage, KPIs for leadership; early cohorts live."
    />
    <ProjectCard
      name="Assignment Planner"
      stack="Canvas LTI + AI assist"
      status={{ label: "Prototype", tone: "amber" }}
      progress={65}
      notes="Scaffold assignments, align to outcomes, push to LMS."
    />
    <ProjectCard
      name="Blueprint & Word→Canvas Automation"
      stack="Queue workers • Headless transforms"
      status={{ label: "Complete", tone: "emerald" }}
      progress={100}
      notes="Reduce manual course setup; traceable, repeatable changes."
    />
    <ProjectCard
  name="Curriculum Builder"
  stack="React + FastAPI + Postgres • Entra SSO"
  status={{ label: "Prototype", tone: "sky" }}
  progress={5}
  notes={
        <>
          Replace Word docs with structured data<br />
          Map modules → outcomes; draft → approve → publish to Canvas.
        </>
      }
    />

  </div>
</SectionShell>


{/* `NEXT STEPS` */}
<SectionShell id="evidence" eyebrow="Evidence" title="Next Steps">
  <div className="grid md:grid-cols-2 gap-4">
    <Card>
      <div className="font-semibold text-slate-900">Demo bundle (30s each)</div>
      <ul className="mt-3 space-y-2 text-sm text-slate-700">
        <li>📊 Learning Analytics - build on the PowerBI pilot</li>
        <li>💡 Curriculum Builder - draft → approve → publish</li>
        <li>📈 Digital Learning Hub - platform insights, licence alerts and impact snapshot</li>
      </ul>
    </Card>

    <Card>
      <div className="font-semibold text-slate-900">What I need to go faster</div>
      <ul className="mt-3 space-y-2 text-sm text-slate-700">
        <li>Hosting infrastructure (scheduler, secrets, logging)</li>
        <li>Data engineering capacity (dbt/ETL patterns/additional API platforms)</li>
        <li>Lightweight governance and ways of working with Technology for pilots → product</li>
      </ul>
    </Card>
  </div>

  {/* Opportunities + Risks */}
  <div className="mt-6 grid md:grid-cols-2 gap-4">
    <Card>
      <div className="font-semibold text-slate-900">Opportunities</div>
      <ul className="mt-3 space-y-2 text-sm text-slate-700">
        <li><Tag tone="emerald">Efficiency</Tag> - scale automation from hours saved → FTE capacity freed.</li>
        <li><Tag tone="sky">Insight</Tag> - predictive analytics + executive dashboards influence strategy.</li>
        <li><Tag tone="violet">Innovation</Tag> - become a testbed for sector-leading frontend tools.</li>
      </ul>
    </Card>

    <Card>
      <div className="font-semibold text-slate-900">Risks</div>
      <ul className="mt-3 space-y-2 text-sm text-slate-700">
        <li><Tag tone="rose">Infrastructure gap</Tag> - fragile local hosting limits credibility & resilience.</li>
        <li><Tag tone="amber">Adoption</Tag> - low academic engagement risks tools staying niche.</li>
        <li><Tag tone="slate">Capacity</Tag> - small team stretched across build + BAU support.</li>
      </ul>
    </Card>
  </div>

  <div className="mt-6">
    <Card>
      <div className="text-slate-800">
        <strong>Summary: </strong>Let's move from isolated wins to a coherent ecosystem - resilient, scalable, and human-centred.
      </div>
    </Card>
  </div>
</SectionShell>

</main>


      {/* RIGHT-SIDE DOT RAIL */}
      <nav
  aria-label="Section progress"
  className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-3"
>
  {NAV.map((s, idx) => {
    const isActive = active === s.id;
    const isTop = s.id === "top";
    return (
      <button
        key={s.id}
        onClick={() => scrollTo(s.id)}
        className={`group relative ${isTop ? "h-4 w-4" : "h-3.5 w-3.5"} rounded-full border border-slate-300 bg-white/90 backdrop-blur shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/60`}
        title={s.label}
        aria-label={s.label}
      >
        <motion.span
          layoutId="dot"
          className={`absolute inset-[-6px] rounded-full ${isActive ? "bg-sky-400/25" : "bg-transparent"}`}
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
        />
        <span
          className={`absolute inset-0 m-auto ${isTop ? "h-2.5 w-2.5" : "h-2 w-2"} rounded-full ${
            isActive ? "bg-sky-500" : "bg-slate-400 group-hover:bg-slate-600"
          }`}
        />
        <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 translate-x-2 opacity-0 group-hover:opacity-100 transition text-xs bg-slate-900 text-white px-2 py-1 rounded-md shadow-sm">
          {idx}. {s.label}
        </span>
      </button>
    );
  })}
</nav>

      {/* FOOTER */}
      <footer className="border-t border-slate-200/60 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-3 text-sm text-slate-500">
          Scroll (snap) or use the right rail to jump between sections.
        </div>
      </footer>
    </div>
  );
}
