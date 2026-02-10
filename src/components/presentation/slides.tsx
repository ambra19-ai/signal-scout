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
  // Floating particles
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 2,
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
        <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-6">Gig Work News Agent</p>
      </FadeUp>
      <FadeUp delay={0.2}>
        <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground text-center leading-tight max-w-4xl">
          "What Do I <span className="text-primary glow-text-blue">Really</span> Need to Know?"
        </h1>
      </FadeUp>
      <FadeUp delay={0.5}>
        <p className="text-muted-foreground text-lg md:text-xl mt-8 text-center max-w-2xl font-body leading-relaxed">
          An AI agent that cuts through the noise and delivers the only gig-economy news that matters.
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
    </div>
  );
};

export const Slide2Problem: React.FC = () => {
  const headlines = [
    "EU proposes sweeping gig worker protections",
    "Uber faces new regulatory challenges in Asia",
    "DoorDash driver safety concerns escalate",
    "California AB5 amendments under review",
    "UK Supreme Court rules on worker status",
    "India gig economy reaches 15M workers",
    "Brazil suspends ride-hailing operations",
    "Gig worker unions gain momentum globally",
    "New Zealand passes platform regulation bill",
    "Instacart IPO raises labor questions",
    "Spain's Rider Law enforcement begins",
    "Australia proposes gig worker insurance",
  ];
  const doubled = [...headlines, ...headlines];

  return (
    <div className="h-full slide-gradient-2 flex flex-col items-center justify-center px-8 relative overflow-hidden">
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
          { icon: ShieldAlert, text: "Safety incidents and labor disputes" },
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
          Too much information. <span className="text-muted-foreground">Not enough signal.</span>
        </p>
      </FadeUp>
    </div>
  );
};

export const Slide3Business: React.FC = () => (
  <div className="h-full slide-gradient-3 flex flex-col items-center justify-center px-8">
    <FadeUp>
      <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground text-center max-w-4xl">
        Leaders Don't Need More News.<br />They Need the <span className="text-primary">Right</span> News.
      </h2>
    </FadeUp>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 max-w-4xl">
      {[
        { value: 100, suffix: "+", label: "Countries", delay: 0.3 },
        { value: 6, suffix: "M+", label: "Gig Workers", delay: 0.5 },
        { value: 500, suffix: "+", label: "Articles / Day", delay: 0.7 },
        { value: 5, suffix: "–10", label: "Leaders Read", delay: 0.9 },
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

export const Slide5Solution: React.FC = () => (
  <div className="h-full slide-gradient-1 flex flex-col items-center justify-center px-4 md:px-8">
    <FadeUp>
      <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-4">The Solution</p>
    </FadeUp>
    <FadeUp delay={0.1}>
      <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground text-center mb-3">
        Meet the Gig Work News Agent
      </h2>
    </FadeUp>
    <FadeUp delay={0.2}>
      <p className="text-muted-foreground text-base md:text-lg text-center max-w-2xl mb-8 font-body">
        A fully autonomous AI agent that delivers prioritized, actionable gig-economy news directly in Slack.
      </p>
    </FadeUp>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full items-start">
      <FadeUp delay={0.4}>
        <div className="space-y-3">
          {[
            { icon: Filter, text: "Filters for gig-worker-relevant news only" },
            { icon: ShieldAlert, text: "Ranks content by High / Medium / Low risk" },
            { icon: BookOpen, text: "Links directly to sources for deeper dives" },
            { icon: Clock, text: "Runs automatically 3× per week" },
          ].map((f, i) => (
            <GlassCard key={i} className="flex items-center gap-3 py-3 px-4">
              <f.icon size={18} className="text-primary shrink-0" />
              <span className="text-sm text-foreground/80 font-body">{f.text}</span>
            </GlassCard>
          ))}
        </div>
      </FadeUp>

      <FadeUp delay={0.6}>
        <SlackPreview />
      </FadeUp>
    </div>
  </div>
);

export const Slide6HowItWorks: React.FC = () => {
  const steps = [
    { icon: Globe, label: "Scans the Web", sub: "Multiple News APIs" },
    { icon: Newspaper, label: "500+ Articles", sub: "Per Run" },
    { icon: Filter, label: "Filters", sub: "Gig-Economy Only" },
    { icon: ShieldAlert, label: "Risk Assessment", sub: "High / Med / Low" },
    { icon: Send, label: "Slack Delivery", sub: "Ranked Summary" },
  ];

  return (
    <div className="h-full slide-gradient-3 flex flex-col items-center justify-center px-8">
      <FadeUp>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground text-center mb-4">
          From <span className="text-primary">500</span> Articles to <span className="text-accent">5</span> Insights
        </h2>
        <p className="text-muted-foreground text-center font-body mb-12">Automatically.</p>
      </FadeUp>

      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 max-w-5xl">
        {steps.map((step, i) => (
          <React.Fragment key={i}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.2 }}
            >
              <GlassCard className="text-center w-36 md:w-40">
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

      <FadeUp delay={1.6}>
        <GlassCard className="mt-12 max-w-lg text-center">
          <p className="text-foreground/80 font-body text-sm">No manual input. No dashboards. No chasing updates.</p>
        </GlassCard>
      </FadeUp>
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

export const Slide10Scales: React.FC = () => (
  <div className="h-full slide-gradient-1 flex flex-col items-center justify-center px-8">
    <FadeUp>
      <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground text-center mb-12">
        This Is Bigger Than <span className="text-primary">Gig Work</span>
      </h2>
    </FadeUp>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
      {[
        { icon: CreditCard, title: "Payments & Fintech", sub: "Regulation monitoring" },
        { icon: ShoppingCart, title: "E-commerce", sub: "Policy changes" },
        { icon: Brain, title: "AI & Platform Governance", sub: "Compliance tracking" },
        { icon: Shield, title: "Trust & Safety", sub: "Incident monitoring" },
      ].map((item, i) => (
        <FadeUp key={i} delay={0.3 + i * 0.15}>
          <GlassCard className="flex items-start gap-4 hover:border-primary/30 transition-colors cursor-default">
            <div className="glass p-2.5 rounded-lg">
              <item.icon size={20} className="text-primary" />
            </div>
            <div>
              <p className="font-display font-bold text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground font-body">{item.sub}</p>
            </div>
          </GlassCard>
        </FadeUp>
      ))}
    </div>

    <FadeUp delay={1}>
      <p className="font-display text-xl md:text-2xl font-bold text-foreground text-center mt-12">
        The agent pattern is reusable. <span className="text-accent">The value compounds.</span>
      </p>
    </FadeUp>
  </div>
);

export const Slide11WhyNow: React.FC = () => (
  <div className="h-full slide-gradient-2 flex flex-col items-center justify-center px-8">
    <FadeUp>
      <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground text-center mb-12">
        The Cost of Missing the Signal<br /><span className="text-destructive">Is Rising</span>
      </h2>
    </FadeUp>

    <div className="space-y-4 max-w-xl">
      {[
        { icon: TrendingUp, text: "Regulation is accelerating" },
        { icon: Users, text: "Public scrutiny is increasing" },
        { icon: Clock, text: "Decisions are becoming more time-sensitive" },
      ].map((item, i) => (
        <FadeUp key={i} delay={0.4 + i * 0.2}>
          <GlassCard className="flex items-center gap-4">
            <item.icon size={22} className="text-destructive shrink-0" />
            <span className="text-foreground font-body">{item.text}</span>
          </GlassCard>
        </FadeUp>
      ))}
    </div>

    <FadeUp delay={1.2}>
      <div className="mt-14 text-center">
        <p className="text-muted-foreground font-body text-lg">The question isn't "can we monitor this?"</p>
        <p className="font-display text-2xl md:text-3xl font-bold text-foreground mt-2">
          It's <span className="text-destructive">"can we afford not to?"</span>
        </p>
      </div>
    </FadeUp>
  </div>
);

export const Slide12CTA: React.FC = () => (
  <div className="h-full slide-gradient-4 flex flex-col items-center justify-center px-8">
    <FadeUp>
      <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground text-center leading-tight">
        From News to <span className="text-primary">Insight</span>.<br />
        From Insight to <span className="text-accent">Action</span>.
      </h2>
    </FadeUp>

    <div className="flex flex-wrap justify-center gap-4 mt-12">
      {[
        { icon: Globe, title: "Scale Across Regions", sub: "Expand monitoring globally" },
        { icon: Rocket, title: "New Verticals", sub: "Payments, e-commerce, AI" },
        { icon: Award, title: "Alerts & Recommendations", sub: "Turn insights into actions" },
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
      <p className="font-display text-xl md:text-2xl font-bold text-muted-foreground text-center mt-14">
        This is what <span className="text-foreground">applied AI for leadership</span> looks like.
      </p>
    </FadeUp>
  </div>
);
