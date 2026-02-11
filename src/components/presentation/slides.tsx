import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { SlackPreview } from "./SlackPreview";
import {
  Globe, Users, Newspaper, BookOpen, Filter, ShieldAlert, Send,
  Zap, ArrowDown, ArrowUp, CreditCard, ShoppingCart, Brain, Shield,
  Clock, TrendingUp, Award, Rocket, BarChart3, Target, ChevronRight,
  Hash, MessageSquare
} from "lucide-react";

/* ─── helpers ─── */

const stagger = (i: number, base = 0.15) => ({ delay: i * base });

const FadeUp: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, delay = 0, className = "" }) => (
  <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay, ease: "easeOut" }} className={className}>
    {children}
  </motion.div>
);

const AnimatedCounter: React.FC<{ end: number; suffix?: string; duration?: number; delay?: number }> = ({ end, suffix = "", duration = 2, delay = 0 }) => {
  const [value, setValue] = useState(0);
  const ref = useRef<number>();
  useEffect(() => {
    const timeout = setTimeout(() => {
      const start = performance.now();
      const animate = (now: number) => {
        const progress = Math.min((now - start) / (duration * 1000), 1);
        setValue(Math.floor(progress * end));
        if (progress < 1) ref.current = requestAnimationFrame(animate);
      };
      ref.current = requestAnimationFrame(animate);
    }, delay * 1000);
    return () => { clearTimeout(timeout); if (ref.current) cancelAnimationFrame(ref.current); };
  }, [end, duration, delay]);
  return <span>{value}{suffix}</span>;
};

const GlassCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`glass rounded-xl p-6 ${className}`}>{children}</div>
);

/* ─── SLIDES ─── */

export const Slide1Title: React.FC = () => {
  // Floating particles - increase the number to 50 for more density
  const particles = Array.from({ length: 70 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 0.5, // reduces delay for faster appearance
  }));

  return (
    <div className="h-full slide-gradient-1 flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {/* Particles */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/30"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: p.delay }}
        />
      ))}

      <FadeUp>
        <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-6">News.AI Agent</p>
      </FadeUp>
      <FadeUp delay={0.2}>
        <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground text-center leading-tight max-w-4xl">
          "What Do I <span className="text-primary glow-text-blue">Really</span> Need to Know?"
        </h1>
      </FadeUp>
      <FadeUp delay={0.5}>
        <p className="text-muted-foreground text-lg md:text-xl mt-8 text-center max-w-2xl font-body leading-relaxed">
          An AI agent that cuts through the noise, prioritizes what's important, and delivers the only gig-economy news that matters with source links.
        </p>
      </FadeUp>
      <FadeUp delay={0.8}>
        <div className="flex gap-3 mt-12">
          {["Regulation", "Safety", "Competitors", "Policy", "Innovation"].map((label, i) => (
            <motion.div
              key={label}
              className="glass px-4 py-2 rounded-lg text-sm font-body text-foreground/80"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + i * 0.1 }}
            >
              {label}
            </motion.div>
          ))}
        </div>
      </FadeUp>
      <div className="mt-6 flex justify-center">
        <span className="text-xs font-body text-muted-foreground px-3 py-1 rounded glass">
          Powered by Prosus
        </span>
      </div>
    </div>
  );
};

export const Slide2Problem: React.FC = () => {
  const headlines = [
    "EU proposes sweeping gig worker protections and new platform responsibilities in Q3 regulations draft",
    "Uber faces new regulatory challenges in Asia amid ongoing disputes over working conditions and ride quotas",
    "DoorDash driver safety concerns escalate after recent attacks prompt new public policy debates and company responses",
    "California AB5 amendments under review, with gig platforms lobbying for classification exceptions and labor group pushback",
    "UK Supreme Court rules on worker status for delivery drivers, a precedent impacting platform obligations nationwide",
    "India gig economy reaches 15M workers, government announces skill training and social security initiatives for platform workforce",
    "Brazil suspends ride-hailing operations in major cities after regulatory dispute over safety, insurance, and driver vetting requirements",
    "Gig worker unions gain momentum globally, pushing for higher wages, benefits, and formalized bargaining rights with major platforms",
    "New Zealand passes platform regulation bill, introducing minimum wage, sick leave, and dispute resolution for gig workers",
    "Instacart IPO raises labor questions about growth strategy, worker buy-in, and regulatory outlook for grocery delivery",
    "Spain's Rider Law enforcement begins, requiring reclassification of food delivery riders as employees with full social protections",
    "Australia proposes gig worker insurance mandates, aiming to close coverage gaps for delivery drivers and independent contractors",
    "Indonesia considers digital platform tax and social protections for ride-hailing gig workers amid rapid sector expansion",
    "South Africa gig workers launch class-action seeking better pay and recognition under local labor codes",
    "US Senate committee debates national standards for gig worker rights, data transparency, and platform accountability",
    "France introduces mandatory algorithms transparency law, affecting app-based ride and delivery platforms",
    "Mexico City taxi app ban sparks protests by drivers, platforms lobby lawmakers to protect ride-hail operations",
    "Canada’s Supreme Court hears landmark case on collective bargaining rights for app-based workers",
    "Singapore updates licensing framework, requiring safety training for gig drivers and stricter vehicle inspections",
    "Germany's Federal Labor Court issues ruling on gig economy worker contracts, clarifying freelancer vs employee distinction",
    "Italy launches universal basic income pilot for gig workers facing income instability and job volatility",
    "Finland introduces mental health support programs for gig workers as burnout and stress rates climb",
    "Japan's Ministry of Labor investigates gig platform payment practices after driver complaints escalate",
    "Portugal fines major platforms for non-compliance with new gig worker benefit laws",
    "Turkey rolls out digital labor rights initiative, including pension contributions for platform workers",
    "Argentina’s government cracks down on wage theft by gig economy food delivery apps",
    "Ireland releases comprehensive report on the future of gig work regulation and socioeconomic impact",
    "Netherlands expands health insurance requirements for all gig workers, regardless of employment classification",
    "Russia plans new taxation scheme for freelancers and gig platform participants",
    "UAE welcomes first official gig worker trade association to protect local and expat labor interests",
    "Greece introduces restrictions on gig platforms operating during public health emergencies",
    "Philippines passes new workplace safety law for delivery riders amid road safety concerns",
    "Thailand launches tax amnesty program for gig workers, hoping to improve sector registration",
    "Belgium fines gig apps for failing to provide adequate training and equipment for food couriers",
    "Poland considers minimum wage mandate for ride-hailing and on-demand drivers",
    "Malaysia debates digital identity verification standards for gig platform onboarding",
    "Hong Kong sets up dispute resolution service for gig worker contract issues and wage disputes",
    "Chile implements environmental standards for gig delivery platforms, targeting emissions reductions",
    "Sweden investigates worker surveillance practices by major delivery apps",
    "Denmark pilots pension contribution matching for qualifying gig workers",
  ];
  const doubled = [...headlines, ...headlines];

  return (
    <div className="h-full slide-gradient-2 flex flex-col items-center justify-center px-8 relative overflow-hidden">
      {/* "Problem Statement" badge/label */}
      <div className="absolute top-6 left-6 z-20">
        <span className="glass px-10 py-2 rounded-md text-s font-semibold text-destructive uppercase tracking-wide shadow-lg">
          Problem Statement
        </span>
      </div>
      {/* Ticker rows */}
      {[0, 1, 2].map(row => (
        <div key={row} className="absolute w-[200%] opacity-10" style={{ top: `${15 + row * 30}%` }}>
          <div className={row % 2 === 0 ? "animate-ticker" : "animate-ticker-fast"}>
            <div className="flex gap-8 whitespace-nowrap">
              {doubled.map((h, i) => (
                <span key={i} className="text-foreground/50 text-sm font-body">{h}</span>
              ))}
            </div>
          </div>
        </div>
      ))}

      <FadeUp className="z-10">
        <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground text-center max-w-4xl leading-tight">
          The Gig Economy Moves Fast.<br />
          <span className="text-destructive">The News Moves Faster.</span>
        </h2>
      </FadeUp>

      <div className="grid grid-cols-2 gap-4 mt-12 z-10 max-w-2xl">
        {[
          { icon: Globe, text: "Regulatory changes across 100+ countries" },
          { icon: Zap, text: "Disruptive platform innovations" },
          { icon: ShieldAlert, text: "Safety incidents and important labor disputes" },
          { icon: BarChart3, text: "Competitor moves — everywhere, all the time" },
        ].map((item, i) => (
          <FadeUp key={i} delay={0.3 + i * 0.15}>
            <GlassCard className="flex items-start gap-3">
              <item.icon className="text-primary mt-0.5 shrink-0" size={18} />
              <p className="text-sm text-foreground/80 font-body">{item.text}</p>
            </GlassCard>
          </FadeUp>
        ))}
      </div>

      <FadeUp delay={1} className="z-10 mt-12">
        <p className="font-display text-2xl md:text-3xl font-bold text-foreground text-center">
          Too much information. <span className="text-muted-foreground">How do you filter through it?</span>
        </p>
      </FadeUp>
    </div>
  );
};

export const Slide3Business: React.FC = () => (
  <div className="h-full slide-gradient-3 flex flex-col items-center justify-center px-8 relative">
    {/* "Current Situation" tag in top left */}
    <div className="absolute top-6 left-6 z-20">
      <span className="glass px-10 py-2 rounded-md text-s font-semibold text-destructive uppercase tracking-wide shadow-lg">
        Current Situation
      </span>
    </div>
    <FadeUp>
      <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground text-center max-w-4xl">
        Leaders Don't Need More News.<br />They Need the <span className="text-primary">Right</span> News.
      </h2>
    </FadeUp>

    {/* Information overload stat */}
    <FadeUp delay={0.12}>
      <GlassCard className="mt-8 max-w-2xl border-l-4 border-l-primary">
        <p className="text-foreground font-body text-center text-base md:text-lg">
          <strong className="text-primary">"The average person is exposed to information equivalent to 174 newspapers per day."</strong>{" "}
          <span className="text-destructive">This is overwhelming.</span>
        </p>
      </GlassCard>
    </FadeUp>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 max-w-4xl">
      {[
        { value: 100, suffix: "+", label: "Countries", delay: 0.3 },
        { value: 340, suffix: "M+", label: "Gig Workers", delay: 0.5 },
        { value: 2, suffix: "M+", label: "Overall Articles / Day", delay: 0.7 },
        { value: 70, suffix: "%", label: "Leaders & Managers Read News", delay: 0.9 },
      ].map((stat, i) => (
        <FadeUp key={i} delay={stat.delay}>
          <GlassCard className="text-center">
            <p className="font-display text-4xl md:text-5xl font-bold text-primary">
              <AnimatedCounter end={stat.value} suffix={stat.suffix} delay={stat.delay + 0.3} />
            </p>
            <p className="text-sm text-muted-foreground mt-2 font-body">{stat.label}</p>
          </GlassCard>
        </FadeUp>
      ))}
    </div>

    <FadeUp delay={1.3}>
      <GlassCard className="mt-12 max-w-2xl border-l-4 border-l-destructive">
        <p className="text-foreground font-body text-center text-lg">
          Missing the right news = missing <strong className="text-destructive">risk</strong>, <strong className="text-primary">opportunity</strong>, and <strong className="text-accent">accountability</strong>.
        </p>
      </GlassCard>
    </FadeUp>    
  </div>
);

export const Slide4Question: React.FC = () => (
  <div className="h-full slide-gradient-4 flex flex-col items-center justify-center px-8 relative">
    <FadeUp>
      <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground text-center leading-tight max-w-4xl">
        Out of <span className="text-primary">500+</span> articles a day…<br />
        Which <span className="text-accent">5</span> should leadership actually read?
      </h2>
    </FadeUp>

    {/* Funnel */}
    <FadeUp delay={0.6} className="mt-14">
      <div className="flex flex-col items-center gap-2">
        <motion.div className="glass rounded-xl px-16 py-3 text-foreground font-display text-lg font-bold"
          initial={{ width: 0 }} animate={{ width: "auto" }} transition={{ duration: 0.8, delay: 0.8 }}>
          500+ articles
        </motion.div>
        <div className="w-0.5 h-6 bg-muted-foreground/30" />
        <motion.div className="glass rounded-xl px-12 py-2.5 text-foreground/70 font-body text-sm"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
          <Filter size={14} className="inline mr-2 text-primary" />Filter & Rank
        </motion.div>
        <div className="w-0.5 h-6 bg-muted-foreground/30" />
        <motion.div className="glow-blue rounded-xl px-8 py-3 bg-primary/20 border border-primary/40 text-primary font-display text-2xl font-bold"
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 1.5 }}>
          5 insights
        </motion.div>
      </div>
    </FadeUp>
  </div>
);

export const Slide5Solution: React.FC = () => {
  const steps = [
    { icon: Globe, label: "Scans the Web", sub: "Multiple reliable News APIs" },
    { icon: Newspaper, label: "500+ Articles", sub: "Per Run with sources" },
    { icon: Filter, label: "Filters", sub: "Gig-Economy Only or Custom" },
    { icon: ShieldAlert, label: <span style={{ color: "red" }}>Risk Assessment</span>, sub: "High / Med / Low" },
    { icon: Send, label: "Slack Integration", sub: "Slack App that sends news" },
  ];

  return (
    <div className="h-full slide-gradient-1 flex flex-col items-center justify-center px-4 md:px-8 relative">
      {/* "Solution" tag in top left */}
      <div className="absolute top-6 left-6 z-20">
        <span className="glass px-10 py-2 rounded-md text-s font-semibold text-green-600 uppercase tracking-wide shadow-lg">
          Solution
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full items-center">
        {/* Workflow cards */}
        <FadeUp delay={0.2}>
          <div>
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4">
              {steps.map((step, i) => (
                <React.Fragment key={i}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + i * 0.2 }}
                  >
                    <GlassCard
                      className={
                        "text-center w-36 md:w-40 " +
                        // Highlight the 4th (Risk Assessment) card in red glow
                        (step.label === "Risk Assessment" ? "glow-red" : "glow-blue")
                      }
                    >
                      <step.icon size={28} className="text-primary mx-auto mb-2" />
                      <p className="font-display font-bold text-foreground text-sm">{step.label}</p>
                      <p className="text-xs text-muted-foreground font-body">{step.sub}</p>
                    </GlassCard>
                  </motion.div>
                  {i < steps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 + i * 0.2 }}
                    >
                      <ChevronRight className="text-primary/50" size={20} />
                    </motion.div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Slack Frame */}
        <FadeUp delay={0.4}>
          <SlackPreview />
        </FadeUp>
      </div>
    </div>
  );
};

export const Slide7TechStack: React.FC = () => (
  <div className="h-full slide-gradient-1 flex flex-col items-center justify-center px-8">
    <FadeUp>
      <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground text-center mb-12">
        Built to Scale, Built to <span className="text-primary">Trust</span>
      </h2>
    </FadeUp>

    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 max-w-4xl">
      {[
        { icon: Globe, label: "News APIs", sub: "≈30 calls/run", color: "text-accent" },
        { icon: ChevronRight, label: "", sub: "", hidden: true },
        { icon: Zap, label: "Python Agent", sub: "AWS Hosted", color: "text-primary" },
        { icon: ChevronRight, label: "", sub: "", hidden: true },
        { icon: MessageSquare, label: "Slack", sub: "Workflow Delivery", color: "text-secondary" },
      ].map((item, i) => item.hidden ? (
        <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 + i * 0.15 }}>
          <ChevronRight className="text-muted-foreground/40" size={24} />
        </motion.div>
      ) : (
        <FadeUp key={i} delay={0.3 + i * 0.15}>
          <GlassCard className="text-center w-44 glow-blue">
            <item.icon size={32} className={`${item.color} mx-auto mb-3`} />
            <p className="font-display font-bold text-foreground">{item.label}</p>
            <p className="text-xs text-muted-foreground font-body mt-1">{item.sub}</p>
          </GlassCard>
        </FadeUp>
      ))}
    </div>

    <FadeUp delay={1}>
      <div className="flex flex-wrap justify-center gap-3 mt-12">
        {["Python", "AWS Lambda", "NewsAPI", "Bing News", "Slack SDK", "Custom NLP"].map((tech, i) => (
          <span key={i} className="glass px-3 py-1.5 rounded-lg text-xs font-body text-muted-foreground">
            {tech}
          </span>
        ))}
      </div>
    </FadeUp>
  </div>
);

export const Slide8Slack: React.FC = () => (
  <div className="h-full slide-gradient-4 flex flex-col items-center justify-center px-8">
    <FadeUp>
      <div className="glass w-20 h-20 rounded-2xl flex items-center justify-center mb-8 glow-blue">
        <Hash size={40} className="text-primary" />
      </div>
    </FadeUp>
    <FadeUp delay={0.2}>
      <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground text-center mb-12">
        Insight Where Work <span className="text-primary">Already Happens</span>
      </h2>
    </FadeUp>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
      {[
        { icon: Zap, text: "Zero new tools to learn" },
        { icon: Send, text: "Push, not pull" },
        { icon: Target, text: "Information arrives in context" },
        { icon: Rocket, text: "Easy to act, forward, or escalate" },
      ].map((item, i) => (
        <FadeUp key={i} delay={0.4 + i * 0.12}>
          <GlassCard className="flex items-center gap-3 py-4">
            <item.icon size={18} className="text-accent shrink-0" />
            <span className="text-foreground/80 font-body text-sm">{item.text}</span>
          </GlassCard>
        </FadeUp>
      ))}
    </div>

    <FadeUp delay={1}>
      <p className="font-display text-2xl md:text-3xl font-bold text-foreground text-center mt-12">
        If it's not in Slack, <span className="text-muted-foreground">it doesn't exist.</span>
      </p>
    </FadeUp>
  </div>
);

export const Slide9Impact: React.FC = () => (
  <div className="h-full slide-gradient-3 flex flex-col items-center justify-center px-8">
    <FadeUp>
      <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground text-center mb-12">
        From Information Overload to<br /><span className="text-primary">Executive Clarity</span>
      </h2>
    </FadeUp>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
      {[
        "Faster awareness of regulatory risk",
        "Early visibility into incidents & labor issues",
        "Smarter competitive monitoring",
        "Less time scanning, more time deciding",
      ].map((text, i) => (
        <FadeUp key={i} delay={0.3 + i * 0.12}>
          <GlassCard className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-accent shrink-0" />
            <span className="text-foreground/80 font-body text-sm">{text}</span>
          </GlassCard>
        </FadeUp>
      ))}
    </div>

    <div className="flex flex-wrap justify-center gap-6 mt-12">
      {[
        { icon: ArrowDown, label: "Time monitoring", color: "text-accent" },
        { icon: ArrowUp, label: "Response speed", color: "text-primary" },
        { icon: ArrowUp, label: "Strategic confidence", color: "text-primary" },
      ].map((m, i) => (
        <FadeUp key={i} delay={0.8 + i * 0.15}>
          <GlassCard className="flex items-center gap-2 py-3 px-5">
            <m.icon size={20} className={m.color} />
            <span className="text-foreground font-body text-sm font-semibold">{m.label}</span>
          </GlassCard>
        </FadeUp>
      ))}
    </div>
  </div>
);

import ReactConfetti from "react-confetti";
import { useWindowSize } from "react-use";

export const Slide10Scales: React.FC = () => {
  const sectors = [
    { icon: Shield, title: "Data Privacy", sub: "Regulations & transparency monitoring", color: "text-pink-500" },
    { icon: Zap, title: "Innovation & Disruption", sub: "Tracking tech news & competitor moves", color: "text-yellow-400" },
    { icon: MessageSquare, title: "Communications", sub: "Sentiment analysis on news & PR", color: "text-blue-500" },
    { icon: Brain, title: "AI & Platform Governance", sub: "Compliance tracking and monitoring", color: "text-emerald-500" },
  ];
  const { width, height } = useWindowSize();

  return (
    <div className="h-full slide-gradient-1 flex flex-col items-center justify-center px-8 relative">
      {/* Confetti effect */}
      <div className="pointer-events-none fixed inset-0 z-50">
        <ReactConfetti width={width} height={height} numberOfPieces={210} recycle={false} gravity={0.15} />
      </div>
      {/* "Impact & Scale" tag in top left */}
      <div className="absolute top-6 left-6 z-20">
        <span className="glass px-10 py-2 rounded-md text-s font-semibold text-pink-600 uppercase tracking-wide shadow-lg">
          Next Steps
        </span>
      </div>

      <FadeUp>
        <p className="font-display text-base md:text-lg text-muted-foreground text-center mb-2">
          From Slack App to ... <span className="text-primary">More!</span>
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground text-center mb-12">
          One Platform, <span className="text-primary">Multiple Sectors</span>
        </h2>
      </FadeUp>

      {/* Top row of sectors */}
      <div className="flex items-center justify-center gap-3 mb-4 max-w-6xl">
        {sectors.slice(0, 2).map((sector, i) => (
          <React.Fragment key={i}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.15 }}
            >
              <GlassCard className="text-center w-48 md:w-56 glow-pink">
                <sector.icon size={32} className={`${sector.color} mx-auto mb-2`} />
                <p className="font-display font-bold text-foreground text-sm mb-1">{sector.title}</p>
                <p className="text-xs text-muted-foreground font-body">{sector.sub}</p>
              </GlassCard>
            </motion.div>
            {i === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <ChevronRight className="text-primary/50" size={20} />
              </motion.div>
            )}
          </React.Fragment>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="flex flex-col items-center"
        >
          <ChevronRight className="text-primary/50 rotate-90" size={20} />
        </motion.div>
      </div>

      {/* Central Prosus Ecosystem News App Card */}
      <FadeUp delay={0.8}>
        <GlassCard className="text-center w-80 md:w-96 glow-green my-6 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl" />
          <div className="relative">
            <div className="bg-gradient-to-br from-primary to-accent rounded-full p-4 mx-auto mb-3 w-fit">
              <Brain size={36} className="text-white" />
            </div>
            <p className="font-display font-bold text-foreground text-xl md:text-2xl mb-2">
              Prosus Ecosystem<br />News App
            </p>
            <p className="text-sm text-muted-foreground font-body">
              One agent approach, multiple business verticals
            </p>
          </div>
        </GlassCard>
      </FadeUp>

      {/* Bottom row of sectors */}
      <div className="flex items-center justify-center gap-3 mt-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.95 }}
          className="flex flex-col items-center"
        >
          <ChevronRight className="text-primary/50 -rotate-90" size={20} />
        </motion.div>
        {sectors.slice(2, 4).map((sector, i) => (
          <React.Fragment key={i + 2}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.05 + i * 0.15 }}
            >
              <GlassCard className="text-center w-48 md:w-56 glow-blue">
                <sector.icon size={32} className={`${sector.color} mx-auto mb-2`} />
                <p className="font-display font-bold text-foreground text-sm mb-1">{sector.title}</p>
                <p className="text-xs text-muted-foreground font-body">{sector.sub}</p>
              </GlassCard>
            </motion.div>
            {i === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.25 }}
              >
                <ChevronRight className="text-primary/50" size={20} />
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>

      <FadeUp delay={1.5}>
        <p className="font-display text-lg md:text-xl font-bold text-foreground text-center mt-12 max-w-3xl">
          This agent approach is flexible & repeatable.
          {/* <span className="text-accent"> Value grows with <span className="font-display underline underline-offset-4 decoration-accent">each new vertical</span>.</span> */}
        </p>
      </FadeUp>
    </div>
  );
};

export const Slide11WhyNow: React.FC = () => {
  // Confetti logic removed from here
  return (
    <div className="h-full slide-gradient-2 flex flex-col items-center justify-center px-8 relative">
      {/* Impact tag in top left */}
      <div className="absolute top-6 left-6 z-20">
        <span className="glass px-10 py-2 rounded-md text-s font-semibold text-primary uppercase tracking-wide shadow-lg">
          Impact
        </span>
      </div>
      <FadeUp>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground text-center mb-12">
          The Impact of Getting the Right News<br /><span className="text-destructive">Faster</span>
        </h2>
      </FadeUp>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
        {[
          {
            icon: Clock,
            metric: "1 hr/day",
            description: "Saved from reading news<br/>by surfacing key insights 3x a week"
          },
          {
            icon: Filter,
            metric: "28+ members",
            description: `In the channel, from <span class="font-bold text-primary">Prosus</span>, <span class="font-bold text-red-600">iFood</span> and <span class="font-bold text-white">Takealot</span>!`
          },
          {
            icon: Zap,
            metric: "Instant Access",
            description: "You don't even need to have the agent on Toqan. Just join the channel and you'll get the news."
          },
        ].map((item, i) => (
          <FadeUp key={i} delay={0.3 + i * 0.2}>
            <GlassCard className="flex flex-col items-center gap-3 py-8 glow-blue">
              <item.icon size={36} className="text-primary mb-3" />
              <div className="font-display text-2xl md:text-3xl font-bold text-foreground mb-1 text-center" dangerouslySetInnerHTML={{__html: item.metric}} />
              <div className="text-sm text-muted-foreground font-body text-center" dangerouslySetInnerHTML={{__html: item.description}} />
            </GlassCard>
          </FadeUp>
        ))}
      </div>

      <FadeUp delay={1.2}>
        <div className="mt-14 text-center">
          <p className="font-display text-3xl md:text-5xl font-extrabold text-blue-500 drop-shadow-lg glow-text">
            If the future is right here, <span className="text-white font-extrabold glow-text"> then what are you waiting for?</span>
          </p>
          {/* <p className="font-display text-2xl md:text-3xl font-bold text-foreground mt-2">
            What could you do with<span className="text-primary"> faster, smarter news?</span>
          </p> */}
        </div>
      </FadeUp>
    </div>
  );
};

export const Slide12CTA: React.FC = () => {
  const { width, height } = useWindowSize?.() || { width: undefined, height: undefined };

  return (
    <div className="h-full slide-gradient-4 flex flex-col items-center justify-center px-8 relative">
      {/* Confetti effect */}
      <div className="pointer-events-none fixed inset-0 z-50">
        {/* Show confetti only if window size is available */}
        {typeof width === "number" && typeof height === "number" && (
          <ReactConfetti width={width} height={height} numberOfPieces={180} recycle={false} gravity={0.12} />
        )}
      </div>
      {/* "Next Steps" tag in top left */}
      <div className="absolute top-6 left-6 z-20">
        <span className="glass px-10 py-2 rounded-md text-s font-semibold text-pink-600 uppercase tracking-wide shadow-lg">
          Next Steps
        </span>
      </div>
      <FadeUp>
        <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground text-center leading-tight">
          Connecting the <span className="text-primary">Prosus Ecosystem</span><br />
          From <span className="text-accent">Local</span> Insights to <span className="text-primary">Global</span> Impact
        </h2>
      </FadeUp>

      <div className="flex flex-wrap justify-center gap-4 mt-12">
        {[
          {
            icon: Globe,
            title: "Global & Local Trends",
            sub: "Track market sentiment worldwide and compare to your ecosystem."
          },
          {
            icon: Rocket,
            title: "Sentiment Analysis Reports",
            sub: "Monitor trends over time, see positive & negative movements, opportunity & risk."
          },
          {
            icon: Award,
            title: "Ecosystem Intelligence",
            sub: "Inform all teams in Prosus and beyond, fostering collaboration & actionable insight."
          },
        ].map((cta, i) => (
          <FadeUp key={i} delay={0.4 + i * 0.15}>
            <GlassCard className="text-center w-56 hover:border-primary/30 transition-colors cursor-default glow-blue">
              <cta.icon size={28} className="text-primary mx-auto mb-3" />
              <p className="font-display font-bold text-foreground text-sm">{cta.title}</p>
              <p className="text-xs text-muted-foreground font-body mt-1">{cta.sub}</p>
            </GlassCard>
          </FadeUp>
        ))}
      </div>

      <FadeUp delay={1}>
        <p className="font-display text-xl md:text-2xl font-bold text-primary text-center mt-14">
          Bringing global perspectives home. <br />
          <span className="text-muted-foreground">Sentiment analysis reports keep every team aligned on the trends that matter most—across Prosus, in every country.</span>
        </p>
      </FadeUp>
    </div>
  );
};
