"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Topbar from "@/components/topbar";
import { useEffect, useState, useMemo } from "react";
import { useAuth } from "@/components/auth-provider";
import { db } from "@/lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { SUBJECT_MAP, type SubjectData } from "@/lib/roadmap-data";
import { computeStreak, toDateKey } from "@/lib/streak";
import {
  Flame, BookOpen, Code2, ArrowRight, CheckCircle2,
  TrendingUp, Trophy, Lightbulb, Target
} from "lucide-react";

// ─── Helpers ────────────────────────────────────────────────────────

/** All roadmap keys we track progress for */
const ROADMAP_KEYS = Object.keys(SUBJECT_MAP);

/** Count total problems in a given roadmap */
function getTotal(key: string): number {
  const subject = SUBJECT_MAP[key];
  if (!subject) return 0;
  let total = 0;
  subject.steps.forEach(s => s.topics.forEach(t => (total += t.problems.length)));
  return total;
}

/** Aggregate progress data from the user's Firestore document */
function aggregateProgress(allProgress: Record<string, Record<string, boolean>>) {
  let totalSolved = 0;
  let totalProblems = 0;
  let topicsCompleted = 0;
  let totalTopics = 0;
  const roadmapPercents: Record<string, number> = {};

  // Per-topic breakdown for DSA (used in Topic Breakdown section)
  const topicBreakdowns: { label: string; pct: number; solved: number; total: number }[] = [];

  for (const key of ROADMAP_KEYS) {
    const subject = SUBJECT_MAP[key];
    if (!subject) continue;

    const progMap = allProgress[key] || {};
    const solved = Object.values(progMap).filter(Boolean).length;
    const total = getTotal(key);

    totalSolved += solved;
    totalProblems += total;
    roadmapPercents[key] = total > 0 ? Math.round((solved / total) * 100) : 0;

    // Count topics completed (a topic is "completed" when all its problems are done)
    subject.steps.forEach((step, stepIndex) => {
      step.topics.forEach((topic, topicIndex) => {
        totalTopics += 1;
        const topicKeys = topic.problems.map((_, pi) => `${stepIndex}-${topicIndex}-${pi}`);
        const topicSolved = topicKeys.filter(k => progMap[k]).length;

        if (topicSolved === topicKeys.length && topicKeys.length > 0) {
          topicsCompleted += 1;
        }

        // Only track DSA topics for the breakdown panel
        if (key === "dsa") {
          topicBreakdowns.push({
            label: topic.name,
            pct: topicKeys.length > 0 ? Math.round((topicSolved / topicKeys.length) * 100) : 0,
            solved: topicSolved,
            total: topicKeys.length,
          });
        }
      });
    });
  }

  return { totalSolved, totalProblems, topicsCompleted, totalTopics, roadmapPercents, topicBreakdowns };
}

/** Find the weakest started topic across all roadmaps → suggest next problem */
function getRecommendation(allProgress: Record<string, Record<string, boolean>>): {
  roadmapKey: string;
  topicName: string;
  problemName: string;
  problemHref: string;
  pct: number;
} | null {
  type WeakestType = { roadmapKey: string; topicName: string; pct: number; firstUnsolved: { name: string; key: string } };
  let weakest: WeakestType | null = null;

  for (const key of ROADMAP_KEYS) {
    const subject = SUBJECT_MAP[key];
    if (!subject) continue;
    const progMap = allProgress[key] || {};

    subject.steps.forEach((step, stepIndex) => {
      step.topics.forEach((topic, topicIndex) => {
        const topicKeys = topic.problems.map((_, pi) => `${stepIndex}-${topicIndex}-${pi}`);
        const topicSolved = topicKeys.filter(k => progMap[k]).length;
        const topicTotal = topicKeys.length;

        if (topicTotal === 0) return;
        const pct = Math.round((topicSolved / topicTotal) * 100);

        // We want the weakest *started but not finished* topic
        // or if nothing is started, the very first topic with 0%
        if (pct < 100) {
          const firstUnsolvedIndex = topicKeys.findIndex(k => !progMap[k]);
          if (firstUnsolvedIndex === -1) return;

          const problem = topic.problems[firstUnsolvedIndex];

          if (!weakest || pct < weakest.pct || (pct === weakest.pct && topicSolved > 0)) {
            weakest = {
              roadmapKey: key,
              topicName: topic.name,
              pct,
              firstUnsolved: { name: problem.name, key: topicKeys[firstUnsolvedIndex] },
            };
          }
        }
      });
    });
  }

  if (!weakest) return null;
  const w = weakest as WeakestType;
  return {
    roadmapKey: w.roadmapKey,
    topicName: w.topicName,
    problemName: w.firstUnsolved.name,
    problemHref: `/roadmaps/${w.roadmapKey}`,
    pct: w.pct,
  };
}


// ─── UI Components ──────────────────────────────────────────────────

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

function ProgressBar({ label, pct }: { label: string; pct: number }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="font-medium text-foreground">{label}</span>
        <span className="text-muted-foreground">{pct}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}


// ─── Main Page ──────────────────────────────────────────────────────

export default function DashboardPage() {
  const { user } = useAuth();
  const [allProgress, setAllProgress] = useState<Record<string, Record<string, boolean>>>({});
  const [streak, setStreak] = useState(0);
  const [lastActiveDate, setLastActiveDate] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);

  // Real-time listener
  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const docRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(docRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setAllProgress(data.progress || {});
        setLastActiveDate(data.lastActiveDate || null);
        setUserName(data.name || user.displayName || "");

        // Validate streak on load: if lastActiveDate is older than yesterday, streak is broken
        const storedStreak = data.streak || 0;
        const { newStreak } = computeStreak(storedStreak, data.lastActiveDate || null);
        // Only show the computed streak (if they haven't been active today, it might be lower)
        const todayKey = toDateKey(new Date());
        if (data.lastActiveDate === todayKey) {
          setStreak(storedStreak);
        } else {
          // Check if yesterday
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yKey = toDateKey(yesterday);
          if (data.lastActiveDate === yKey) {
            setStreak(storedStreak); // Streak is still alive, just not yet incremented today
          } else {
            setStreak(0); // Streak is broken
          }
        }
      } else {
        setAllProgress({});
        setStreak(0);
        setUserName(user.displayName || "");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Aggregate stats
  const stats = useMemo(() => aggregateProgress(allProgress), [allProgress]);
  const recommendation = useMemo(() => getRecommendation(allProgress), [allProgress]);

  // Sort topic breakdowns: show weakest first (started > 0% but < 100%, then 0%)
  const sortedTopics = useMemo(() => {
    return [...stats.topicBreakdowns]
      .sort((a, b) => {
        // Started but incomplete first
        if (a.pct > 0 && a.pct < 100 && (b.pct === 0 || b.pct === 100)) return -1;
        if (b.pct > 0 && b.pct < 100 && (a.pct === 0 || a.pct === 100)) return 1;
        return a.pct - b.pct;
      })
      .slice(0, 6); // Show top 6
  }, [stats.topicBreakdowns]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Topbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Topbar />

      <main className="max-w-7xl mx-auto px-4 py-8 w-full flex-1">
        {/*  Heading  */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-foreground">Student Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Welcome back{userName ? `, ${userName}` : ""}! {streak > 0 ? "You're on a roll." : "Start solving to build your streak."}
          </p>
        </div>

        {/*  Top Stats  */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            {
              label: "LEARNING STREAK",
              icon: <Flame className="w-10 h-10 text-orange-300" />,
              value: `${streak} Day${streak !== 1 ? "s" : ""}`,
              sub: streak > 0 ? "Keep it going!" : "Solve a problem today!",
              subColor: streak > 0 ? "text-green-500" : "text-muted-foreground",
            },
            {
              label: "TOPICS COMPLETED",
              icon: <BookOpen className="w-10 h-10 text-orange-300" />,
              value: `${stats.topicsCompleted} / ${stats.totalTopics}`,
              bar: stats.totalTopics > 0 ? Math.round((stats.topicsCompleted / stats.totalTopics) * 100) : 0,
            },
            {
              label: "PROBLEMS SOLVED",
              icon: <Code2 className="w-10 h-10 text-orange-300" />,
              value: `${stats.totalSolved} / ${stats.totalProblems}`,
              sub: stats.totalProblems > 0
                ? `${Math.round((stats.totalSolved / stats.totalProblems) * 100)}% of your total goal reached`
                : "0% completed",
              subColor: "text-muted-foreground",
            },
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
                    <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${stat.bar}%` }} />
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
                <CircleProgress pct={stats.roadmapPercents["dsa"] || 0}  label="DSA"       sub="Data Structures" />
                <CircleProgress pct={stats.roadmapPercents["cs"] || 0}  label="Core CS"   sub="OS, DBMS, CN"    />
                <CircleProgress pct={stats.roadmapPercents["system-design"] || 0}  label="System Design" sub="HLD / LLD" />
              </div>
            </div>

            {/* Topic Breakdown */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-bold text-foreground text-lg">Topic Breakdown (DSA)</h2>
                <Link href="/roadmaps/dsa" className="text-sm text-primary font-semibold hover:underline flex items-center gap-1">
                  View Full Roadmap <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              {sortedTopics.length > 0 ? (
                <div className="space-y-4">
                  {sortedTopics.map((topic) => (
                    <ProgressBar key={topic.label} label={topic.label} pct={topic.pct} />
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No progress yet. Start solving problems in the DSA roadmap!
                </p>
              )}
            </div>
          </div>

          {/* Right column (2/5) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Suggested Next Problem */}
            {recommendation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-2xl border border-border p-6"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-yellow-500" />
                  <h2 className="font-bold text-foreground text-lg">Suggested Next</h2>
                </div>
                <div className="bg-orange-50 dark:bg-orange-950/30 rounded-xl p-4 mb-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Weakest Topic</p>
                  <p className="font-semibold text-foreground">{recommendation.topicName}</p>
                  <p className="text-xs text-muted-foreground mt-1">{recommendation.pct}% complete in <span className="capitalize">{recommendation.roadmapKey}</span></p>
                </div>
                <div className="flex items-center gap-3">
                  <Target className="w-4 h-4 text-primary shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-foreground">{recommendation.problemName}</p>
                    <p className="text-xs text-muted-foreground">Next unsolved problem</p>
                  </div>
                </div>
                <Link
                  href={recommendation.problemHref}
                  className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-primary text-white rounded-xl font-semibold text-sm hover:bg-primary/90 transition-colors"
                >
                  Go to Roadmap <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            )}

            {/* Roadmap Progress Overview */}
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center gap-2 mb-5">
                <Trophy className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-foreground text-lg">All Roadmaps</h2>
              </div>
              <div className="space-y-4">
                {ROADMAP_KEYS.filter(k => SUBJECT_MAP[k]).map((key) => (
                  <Link key={key} href={`/roadmaps/${key}`} className="block group">
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors capitalize">
                        {SUBJECT_MAP[key].title}
                      </span>
                      <span className="text-muted-foreground">{stats.roadmapPercents[key] || 0}%</span>
                    </div>
                    <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-700"
                        style={{ width: `${stats.roadmapPercents[key] || 0}%` }}
                      />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="relative bg-primary rounded-2xl p-6 overflow-hidden text-white">
              <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10" />
              <div className="absolute -right-2 bottom-4 w-20 h-20 rounded-full bg-white/5" />
              <h3 className="font-extrabold text-xl mb-1 relative">Keep Pushing!</h3>
              <p className="text-sm text-orange-100 mb-5 relative">
                Consistency beats talent. Solve at least one problem daily.
              </p>
              <Link
                href="/roadmaps/dsa"
                className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-primary font-bold text-sm hover:bg-orange-50 transition-colors"
              >
                Continue DSA <ArrowRight className="w-4 h-4" />
              </Link>
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
