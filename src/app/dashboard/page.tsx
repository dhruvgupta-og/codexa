"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Topbar from "@/components/topbar";
import {
  Flame, BookOpen, Code2, ArrowRight, CheckCircle2,
  PlayCircle, Bell, Clock, Video, MessageSquare,
  TrendingUp, Trophy
} from "lucide-react";

//  Circular Progress 
function CircleProgress({ pct, label, sub }: { pct: number; label: string; sub: string }) {
  const r = 40;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-28 h-28">
        <svg className="w-28 h-28 -rotate-90" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r={r} fill="none" stroke="currentColor" strokeWidth="8" className="text-secondary" />
          <circle
            cx="48" cy="48" r={r} fill="none"
            stroke="currentColor" strokeWidth="8"
            className="text-primary"
            strokeDasharray={`${dash} ${circ}`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-extrabold text-foreground">{pct}%</span>
        </div>
      </div>
      <p className="font-semibold text-sm text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground uppercase tracking-wide">{sub}</p>
    </div>
  );
}

//  Progress Bar 
function ProgressBar({ label, pct }: { label: string; pct: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="font-medium text-foreground">{label}</span>
        <span className="text-muted-foreground">{pct}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

const recentActivity = [
  { icon: <CheckCircle2 className="w-4 h-4 text-green-500" />, text: 'Solved "Longest Substring"', sub: "Medium  2 hours ago" },
  { icon: <PlayCircle    className="w-4 h-4 text-blue-500"  />, text: 'Started "React Advanced Patterns"', sub: "Video Lesson  5 hours ago" },
  { icon: <Trophy        className="w-4 h-4 text-yellow-500"/>, text: 'Earned "Hash Master" Badge', sub: "Milestone  Yesterday" },
  { icon: <MessageSquare className="w-4 h-4 text-purple-500"/>, text: "Replied to Thread", sub: "Community  2 days ago" },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Topbar />

      <main className="max-w-7xl mx-auto px-4 py-8 w-full flex-1">
        {/*  Heading  */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-foreground">Student Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back, Alex! You&apos;re on a roll.</p>
        </div>

        {/*  Top Stats  */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "LEARNING STREAK", icon: <Flame className="w-10 h-10 text-orange-300" />, value: "15 Days", sub: "+2% today", subColor: "text-green-500" },
            { label: "TOPICS COMPLETED", icon: <BookOpen className="w-10 h-10 text-orange-300" />, value: "12 / 50", bar: 24 },
            { label: "PROBLEMS SOLVED", icon: <Code2 className="w-10 h-10 text-orange-300" />, value: "120 / 500", sub: "24% of your total goal reached", subColor: "text-muted-foreground" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-2xl border border-border p-5 flex items-center justify-between"
            >
              <div>
                <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-3xl font-extrabold text-foreground mb-1">{stat.value}</p>
                {stat.bar !== undefined && (
                  <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden mt-2">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${stat.bar}%` }} />
                  </div>
                )}
                {stat.sub && <p className={`text-xs mt-1 font-medium ${stat.subColor}`}>{stat.sub}</p>}
              </div>
              <div className="opacity-30 shrink-0">{stat.icon}</div>
            </motion.div>
          ))}
        </div>

        {/*  Main grid  */}
        <div className="grid lg:grid-cols-5 gap-6">
          {/* Left column (3/5) */}
          <div className="lg:col-span-3 space-y-6">
            {/* Skill Proficiency */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-foreground text-lg">Skill Proficiency</h2>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <CircleProgress pct={65}  label="DSA"       sub="Data Structures" />
                <CircleProgress pct={40}  label="Core CS"   sub="OS, DBMS, CN"    />
                <CircleProgress pct={85}  label="Coding Sheets" sub="Daily Practice" />
              </div>
            </div>

            {/* Topic Breakdown */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-foreground text-lg">Topic Breakdown</h2>
                <Link href="/roadmaps/dsa" className="text-sm text-primary font-semibold hover:underline flex items-center gap-1">
                  View Detailed Report <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="space-y-4">
                <ProgressBar label="Array & Hashing"      pct={90} />
                <ProgressBar label="Binary Search"        pct={45} />
                <ProgressBar label="Dynamic Programming"  pct={12} />
              </div>
            </div>
          </div>

          {/* Right column (2/5) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Activity */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-2 mb-5">
                <Bell className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-foreground text-lg">Recent Activity</h2>
              </div>
              <div className="space-y-4">
                {recentActivity.map((a, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">{a.icon}</div>
                    <div>
                      <p className="text-sm font-semibold text-foreground leading-tight">{a.text}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{a.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-5 py-2 text-sm font-semibold border border-border rounded-xl hover:bg-secondary transition-colors text-muted-foreground">
                VIEW ALL ACTIVITY
              </button>
            </div>

            {/* CTA Upgrade */}
            <div className="relative bg-primary rounded-2xl p-6 overflow-hidden text-white">
              <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10" />
              <div className="absolute -right-2 bottom-4 w-20 h-20 rounded-full bg-white/5" />
              <h3 className="font-extrabold text-xl mb-1 relative">Ready to go Pro?</h3>
              <p className="text-sm text-orange-100 mb-5 relative">
                Unlock unlimited coding challenges and 1-on-1 mentorship.
              </p>
              <button className="relative px-5 py-2.5 rounded-xl bg-white text-primary font-bold text-sm hover:bg-orange-50 transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer strip */}
      <footer className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        2026 Codexa Learning Inc. &nbsp;&nbsp;
        <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link> &nbsp;&nbsp;
        <Link href="/terms" className="hover:text-foreground">Terms of Service</Link> &nbsp;&nbsp;
        <Link href="/help" className="text-primary hover:underline">Help Center</Link>
      </footer>
    </div>
  );
}
