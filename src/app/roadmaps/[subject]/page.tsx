"use client";

import Topbar from "@/components/topbar";
import { SUBJECT_MAP, type SubjectData } from "@/lib/roadmap-data";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BookOpen, CheckCircle2, Circle, ExternalLink, Flame, Layers, ChevronDown, RotateCcw, PenTool, Flag, Save, Loader2, PlayCircle } from "lucide-react";
import { useEffect, useMemo, useState, useRef } from "react";
import { useAuth } from "@/components/auth-provider";
import { db } from "@/lib/firebase";
import { doc, onSnapshot, setDoc, getDoc } from "firebase/firestore";
import { computeStreak, toDateKey } from "@/lib/streak";
import { motion, AnimatePresence } from "framer-motion";
import { ProgressMap, ProgressState, isSolved, getStatus, getNotes, isFlagged } from "@/lib/progress";

type FlatProblem = {
  key: string;
  stepIndex: number;
  topicIndex: number;
  problemIndex: number;
  name: string;
};

function getStats(subject: SubjectData) {
  let total = 0;
  let easy = 0;
  let medium = 0;
  let hard = 0;
  subject.steps.forEach(step =>
    step.topics.forEach(topic =>
      topic.problems.forEach(p => {
        total += 1;
        if (p.difficulty === "Easy") easy += 1;
        if (p.difficulty === "Medium") medium += 1;
        if (p.difficulty === "Hard") hard += 1;
      })
    )
  );
  return { total, easy, medium, hard };
}

function limitProblems(subject: SubjectData, limit: number): SubjectData {
  let remaining = limit;
  const steps = subject.steps
    .map(step => {
      const topics = step.topics
        .map(topic => {
          if (remaining <= 0) return null;
          const slice = topic.problems.slice(0, remaining);
          remaining -= slice.length;
          if (slice.length === 0) return null;
          return { ...topic, problems: slice };
        })
        .filter(Boolean) as SubjectData["steps"][number]["topics"];

      return { ...step, topics };
    })
    .filter(step => step.topics.length > 0);

  return { ...subject, steps };
}

function resolveSubjectKey(raw: string) {
  const key = (raw || "").toLowerCase().trim();
  const direct = SUBJECT_MAP[key];
  if (direct) return key;

  const normalized = key.replace(/\s+/g, "-");
  if (SUBJECT_MAP[normalized]) return normalized;

  const aliases: Record<string, string> = {
    systemdesign: "system-design",
    "system-design": "system-design",
    "core-cs": "cs",
    corecs: "cs",
    "blind-75": "blind75",
    blind75: "blind75",
    "sde-sheet": "striver-sde",
    "striver-sde": "striver-sde",
    a2z: "dsa",
    "a2z-dsa": "dsa",
  };

  return aliases[normalized] ?? aliases[key];
}

function flattenProblems(subject: SubjectData): FlatProblem[] {
  const items: FlatProblem[] = [];
  subject.steps.forEach((step, stepIndex) => {
    step.topics.forEach((topic, topicIndex) => {
      topic.problems.forEach((problem, problemIndex) => {
        items.push({
          key: `${stepIndex}-${topicIndex}-${problemIndex}`,
          stepIndex,
          topicIndex,
          problemIndex,
          name: problem.name,
        });
      });
    });
  });
  return items;
}


// --- UI Components ---

function ProblemRow({
  problem,
  pKey,
  progressVal,
  onUpdate,
}: {
  problem: any;
  pKey: string;
  progressVal: boolean | ProgressState | undefined;
  onUpdate: (pKey: string, newState: Partial<ProgressState>) => void;
}) {
  const status = getStatus(progressVal);
  const flag = isFlagged(progressVal);
  const initialNotes = getNotes(progressVal);

  const [showNotes, setShowNotes] = useState(false);
  const [localNotes, setLocalNotes] = useState(initialNotes);
  const [isSaving, setIsSaving] = useState(false);

  // Sync local notes if external data changes and we aren't focused
  useEffect(() => {
    setLocalNotes(initialNotes);
  }, [initialNotes]);

  const handleStatusChange = (newStatus: "unstarted" | "attempted" | "solved") => {
    onUpdate(pKey, { status: newStatus });
  };

  const handleToggleFlag = () => {
    onUpdate(pKey, { flagRevision: !flag });
  };

  const handleSaveNotes = async () => {
    setIsSaving(true);
    await onUpdate(pKey, { notes: localNotes });
    setIsSaving(false);
  };

  return (
    <li className="flex flex-col gap-2 p-2 border-b border-border/50 last:border-0 rounded-lg hover:bg-secondary/20 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 flex-1">
          {/* Status buttons */}
          <div className="flex items-center bg-secondary/30 rounded-lg p-1 mr-2">
            <button
              onClick={() => handleStatusChange(status === "unstarted" ? "attempted" : "unstarted")}
              className={`p-1.5 rounded-md transition-all ${status === "attempted" ? "bg-yellow-500/20 text-yellow-600 dark:text-yellow-500" : "hover:bg-secondary text-muted-foreground"}`}
              title="Mark as attempted"
            >
              <PlayCircle className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleStatusChange(status === "solved" ? "unstarted" : "solved")}
              className={`p-1.5 rounded-md transition-all ${status === "solved" ? "bg-green-500/20 text-green-600 dark:text-green-500" : "hover:bg-secondary text-muted-foreground"}`}
              title="Mark as solved"
            >
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>

          <span className={`text-sm font-medium ${status === "solved" ? "text-muted-foreground line-through" : "text-foreground"}`}>
            {problem.name}
          </span>
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
            {problem.difficulty}
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs flex-wrap">
          <button
            onClick={handleToggleFlag}
            className={`inline-flex items-center gap-1 px-2 py-1.5 rounded-md border transition-colors ${flag ? "border-orange-500 bg-orange-500/10 text-orange-600 dark:text-orange-400" : "border-border hover:bg-secondary"}`}
          >
            <Flag className={`w-3.5 h-3.5 ${flag ? "fill-orange-500" : ""}`} />
            {flag ? "Revise" : "Flag"}
          </button>
          
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`inline-flex items-center gap-1 px-2 py-1.5 rounded-md border transition-colors ${localNotes ? "border-primary/50 text-primary bg-primary/5" : "border-border hover:bg-secondary"}`}
          >
            <PenTool className="w-3.5 h-3.5" />
            Notes
          </button>

          {problem.leetcode && (
            <a href={problem.leetcode} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 px-2 py-1.5 rounded-md border border-border hover:bg-secondary transition-colors">
              Solve <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showNotes && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-2 bg-secondary/20 p-3 rounded-xl border border-border">
              <textarea
                value={localNotes}
                onChange={(e) => setLocalNotes(e.target.value)}
                placeholder="Write your approach, edge cases, and mistakes here..."
                className="w-full bg-transparent text-sm text-foreground outline-none resize-y min-h-[80px]"
              />
              <div className="flex justify-end mt-2">
                <button
                  onClick={handleSaveNotes}
                  disabled={isSaving}
                  className="flex items-center gap-1.5 bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-xs font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                  Save Note
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}


// --- Main Page ---

export default function RoadmapPage() {
  const { user } = useAuth();
  const params = useParams();
  const slug = typeof params?.subject === "string" ? params.subject : Array.isArray(params?.subject) ? params.subject[0] : "";
  const key = resolveSubjectKey(slug || "");
  const subject = key ? SUBJECT_MAP[key] : undefined;
  
  const [progress, setProgress] = useState<ProgressMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !key) return;

    const docRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setProgress(docSnap.data().progress?.[key] || {});
      } else {
        setProgress({});
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user, key]);

  const updateProgress = async (pKey: string, newState: Partial<ProgressState>) => {
    if (!user || !key) return;

    // Merge with existing state gracefully
    const currentVal = progress[pKey];
    let mergedState: ProgressState = {
      status: getStatus(currentVal),
      notes: getNotes(currentVal),
      flagRevision: isFlagged(currentVal),
      ...newState,
    };

    const newProgress = { ...progress, [pKey]: mergedState };
    const docRef = doc(db, "users", user.uid);
    
    try {
      const updateData: Record<string, any> = {
        progress: { [key]: newProgress },
        updatedAt: new Date().toISOString(),
      };

      // Streak logic: if status changed to "solved"
      if (newState.status === "solved") {
        const snap = await getDoc(docRef);
        const data = snap.exists() ? snap.data() : {};
        const currentStreak = data.streak || 0;
        const lastActiveDate = data.lastActiveDate || null;

        const { newStreak, isNewDay } = computeStreak(currentStreak, lastActiveDate);
        if (isNewDay) {
          updateData.streak = newStreak;
          updateData.lastActiveDate = toDateKey(new Date());
        }

        // Activity Log for Heatmap
        const todayKey = toDateKey(new Date());
        const activityLog = data.activityLog || {};
        activityLog[todayKey] = (activityLog[todayKey] || 0) + 1;
        updateData.activityLog = activityLog;
      }

      await setDoc(docRef, updateData, { merge: true });
    } catch (err) {
      console.error("Error updating progress:", err);
    }
  };

  const handleReset = async () => {
    if (!confirm("Are you sure you want to reset all progress for this roadmap?")) return;
    if (!user || !key) return;

    const docRef = doc(db, "users", user.uid);
    try {
      await setDoc(docRef, { progress: { [key]: {} }, updatedAt: new Date().toISOString() }, { merge: true });
    } catch (err) {
      console.error("Error resetting progress:", err);
    }
  };

  if (!subject) return null;

  const displaySubject = key === "blind75" ? limitProblems(subject, 75) : subject;
  const flat = useMemo(() => flattenProblems(displaySubject), [displaySubject]);
  const completed = flat.filter(p => isSolved(progress[p.key])).length;
  const total = flat.length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
  const stats = getStats(displaySubject);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Topbar />

      <section className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-14">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 text-orange-600 text-xs font-semibold mb-4">
                <Flame className="w-3 h-3" />
                CODING ROADMAP
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
                {displaySubject.title}
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                {displaySubject.subtitle}
              </p>
              <div className="mt-5">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-semibold text-foreground">Progress</span>
                  <span className="text-muted-foreground">{completed} / {total} ({percent}%)</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${percent}%` }} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "Problems", value: stats.total },
                { label: "Easy", value: stats.easy },
                { label: "Medium", value: stats.medium },
                { label: "Hard", value: stats.hard },
              ].map(card => (
                <div
                  key={card.label}
                  className="bg-background border border-border rounded-xl px-4 py-3 text-center"
                >
                  <div className="text-lg font-bold text-foreground">{card.value}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">
                    {card.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
            <Link href="/sheets" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors">
              Explore Sheets <Layers className="w-4 h-4" />
            </Link>
            <Link href="/roadmaps" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border hover:border-primary/60 hover:text-primary transition-colors">
              All Roadmaps <BookOpen className="w-4 h-4" />
            </Link>
            <button 
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors"
            >
              Reset Progress <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10 w-full">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p>Syncing your progress...</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {displaySubject.steps.map((step, stepIndex) => (
              <details
                key={step.step}
                className="bg-card border border-border rounded-2xl p-5 open:shadow-sm group"
                open={stepIndex === 0}
              >
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center text-orange-600 font-bold text-sm">
                      {stepIndex + 1}
                    </div>
                    <h2 className="text-lg font-bold text-foreground">{step.step}</h2>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>

                <div className="mt-5 grid gap-5">
                  {step.topics.map((topic, topicIndex) => {
                    const topicKeys = topic.problems.map((_, problemIndex) => `${stepIndex}-${topicIndex}-${problemIndex}`);
                    const topicCompleted = topicKeys.filter(k => isSolved(progress[k])).length;
                    const topicTotal = topicKeys.length;
                    const topicPercent = topicTotal === 0 ? 0 : Math.round((topicCompleted / topicTotal) * 100);
                    const topicQuery = encodeURIComponent(`${topic.name} interview questions`);

                    return (
                      <div key={topic.name} className="border border-border rounded-xl p-4 bg-background">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
                          <div>
                            <h3 className="font-semibold text-foreground">{topic.name}</h3>
                            <div className="text-xs text-muted-foreground mt-1">
                              {topicCompleted} / {topicTotal} solved
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <a
                              href={`https://www.google.com/search?q=${topicQuery}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-border hover:border-primary/60 hover:text-primary transition-colors"
                            >
                              Resources <ExternalLink className="w-3 h-3" />
                            </a>
                            <a
                              href={`https://www.youtube.com/results?search_query=${topicQuery}`}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-border hover:border-primary/60 hover:text-primary transition-colors"
                            >
                              Videos <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </div>
                        <div className="h-1.5 bg-secondary rounded-full overflow-hidden mb-4">
                          <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${topicPercent}%` }} />
                        </div>
                        <ul className="grid gap-1">
                          {topic.problems.map((problem, problemIndex) => {
                            const pKey = `${stepIndex}-${topicIndex}-${problemIndex}`;
                            return (
                              <ProblemRow
                                key={problem.name}
                                problem={problem}
                                pKey={pKey}
                                progressVal={progress[pKey]}
                                onUpdate={updateProgress}
                              />
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </details>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
