import React from "react";
import { Badge } from "@/components/ui/badge";

const slackMessages = [
  {
    risk: "High",
    title: "EU Passes Sweeping Gig Worker Reclassification Directive",
    source: "Reuters",
    summary: "New directive requires platforms to reclassify workers as employees across all 27 member states by Q3 2026.",
  },
  {
    risk: "High",
    title: "Brazil Suspends Ride-Hailing Operations in São Paulo",
    source: "Bloomberg",
    summary: "Regulatory dispute over safety standards leads to 48-hour suspension affecting 200K+ drivers.",
  },
  {
    risk: "Medium",
    title: "DoorDash Launches AI-Powered Driver Safety Program",
    source: "TechCrunch",
    summary: "Competitor rolls out real-time safety monitoring — potential benchmark for industry standards.",
  },
  {
    risk: "Medium",
    title: "India Proposes Social Security Fund for Platform Workers",
    source: "Economic Times",
    summary: "Draft legislation would require 2% platform revenue contribution to worker benefits fund.",
  },
  {
    risk: "Low",
    title: "Australia Updates Gig Worker Insurance Framework",
    source: "Financial Review",
    summary: "Incremental changes to workers' compensation eligibility for independent contractors.",
  },
];

const riskColor = (risk: string) => {
  switch (risk) {
    case "High": return "bg-[hsl(0,72%,51%)] text-white border-transparent";
    case "Medium": return "bg-[hsl(38,92%,50%)] text-black border-transparent";
    case "Low": return "bg-[hsl(152,69%,53%)] text-black border-transparent";
    default: return "";
  }
};

export const SlackPreview: React.FC = () => {
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Slack window chrome */}
      <div className="rounded-xl overflow-hidden border border-[hsla(230,20%,30%,0.3)] shadow-2xl">
        {/* Title bar */}
        <div className="bg-[hsl(270,3%,22%)] px-4 py-2.5 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[hsl(0,70%,55%)]" />
            <div className="w-3 h-3 rounded-full bg-[hsl(45,90%,55%)]" />
            <div className="w-3 h-3 rounded-full bg-[hsl(120,50%,50%)]" />
          </div>
          <span className="ml-2 text-xs text-[hsl(0,0%,65%)] font-body"># gig-news-alerts</span>
        </div>

        {/* Message area */}
        <div className="bg-[hsl(270,3%,18%)] p-4 space-y-1">
          {/* Bot header */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[hsl(217,91%,60%)] to-[hsl(260,60%,50%)] flex items-center justify-center text-white text-xs font-bold font-display">
              GN
            </div>
            <div>
              <span className="text-sm font-semibold text-white font-body">Gig News Agent</span>
              <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-[hsl(217,91%,60%)] text-white uppercase tracking-wider">App</span>
              <span className="ml-2 text-xs text-[hsl(0,0%,50%)]">9:02 AM</span>
            </div>
          </div>

          {/* Message content */}
          <div className="pl-10 space-y-0.5">
            <p className="text-sm text-[hsl(0,0%,85%)] font-body mb-3">
              📰 <strong>Daily Gig Economy Brief</strong> — Tuesday, Feb 10, 2026
            </p>

            {/* News items */}
            <div className="border-l-2 border-[hsl(217,91%,60%)] pl-3 space-y-3">
              {slackMessages.map((msg, i) => (
                <div key={i} className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Badge className={`text-[10px] px-1.5 py-0 h-4 rounded font-bold ${riskColor(msg.risk)}`}>
                      {msg.risk.toUpperCase()}
                    </Badge>
                    <span className="text-sm font-semibold text-white font-body">{msg.title}</span>
                  </div>
                  <p className="text-xs text-[hsl(0,0%,55%)] font-body">{msg.source} · {msg.summary}</p>
                </div>
              ))}
            </div>

            <p className="text-xs text-[hsl(0,0%,45%)] pt-3 font-body">
              🔗 <span className="text-[hsl(217,80%,65%)] underline cursor-pointer">View full report</span> · Next update: Thursday 9:00 AM
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
