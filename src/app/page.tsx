"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Topbar from "@/components/topbar";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { SUBJECT_MAP } from "@/lib/roadmap-data";
import {
  ArrowRight,
  Code2,
  LayoutDashboard,
  BookOpen,
  Cpu,
  Globe,
  Brain,
  FileText,
  CheckCircle2,
  Flame,
  Star,
  Layers,
  Quote,
} from "lucide-react";

const modules = [
  {
    icon: <Code2 className="w-6 h-6" />,
    color: "text-orange-500 bg-orange-50 dark:bg-orange-950/30",
    title: "Data Structures & Algorithms",
    desc: "Master recursion, dynamic programming, and complex data structures with 450+ curated problems.",
    id: "dsa",
    href: "/roadmaps/dsa",
  },
  {
    icon: <FileText className="w-6 h-6" />,
    color: "text-red-500 bg-red-50 dark:bg-red-950/30",
    title: "Coding Practice Sheets",
    desc: "SDE sheets from top organisations like Google, Amazon, and Microsoft to boost your interview prep.",
    id: "striver-sde",
    href: "/sheets",
  },
  {
    icon: <Cpu className="w-6 h-6" />,
    color: "text-blue-500 bg-blue-50 dark:bg-blue-950/30",
    title: "Core CS Fundamentals",
    desc: "In-depth guides on Operating Systems, Database Management (DBMS), and Computer Networks.",
    id: "cs",
    href: "/roadmaps/cs",
  },
  {
    icon: <LayoutDashboard className="w-6 h-6" />,
    color: "text-purple-500 bg-purple-50 dark:bg-purple-950/30",
    title: "System Design (HLD/LLD)",
    desc: "Learn to build scalable architectures, microservices, and object-oriented design patterns.",
    id: "system-design",
    href: "/roadmaps/system-design",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    color: "text-green-500 bg-green-50 dark:bg-green-950/30",
    title: "Web Development",
    desc: "Full-stack development with React, Node.js, and modern CSS frameworks like Tailwind.",
    id: "web",
    href: "/roadmaps/web",
  },
  {
    icon: <Brain className="w-6 h-6" />,
    color: "text-pink-500 bg-pink-50 dark:bg-pink-950/30",
    title: "Machine Learning",
    desc: "Foundations of AI, mathematical concepts, and building predictive models with Python.",
    id: "ml",
    href: "/roadmaps/ml",
  },
];

const sheets = [
  {
    title: "Striver's A2Z DSA Sheet",
    desc: "A complete A-to-Z DSA roadmap with practice problems and checkpoints.",
    href: "/roadmaps/dsa",
  },
  {
    title: "Striver's SDE Sheet",
    desc: "190 most asked interview questions structured day-wise.",
    href: "/roadmaps/striver-sde",
  },
  {
    title: "Blind 75 Sheet",
    desc: "The must-do 75 problems to cover core interview patterns.",
    href: "/roadmaps/blind75",
  },
];

const highlights = [
  "Curated roadmaps with practical checkpoints",
  "Practice sheets organized by topic and difficulty",
  "System design, CS fundamentals, and web dev paths",
  "Progress tracking and focused revisions",
];

const testimonials = [
  {
    name: "Aarav Sharma",
    role: "SDE-1 at Product Company",
    quote:
      "Codexa's A2Z roadmap made my prep structured and stress-free. The stepwise flow just works.",
  },
  {
    name: "Meera Joshi",
    role: "Final Year CS Student",
    quote:
      "I stopped hopping between resources. The sheets and checklists kept me consistent.",
  },
  {
    name: "Vikram Rao",
    role: "Backend Engineer",
    quote:
      "The system design and core CS sections helped me fill gaps before interviews.",
  },
];

const faqs = [
  {
    q: "Is Codexa free to use?",
    a: "Yes. The roadmap content and practice sheets are freely accessible.",
  },
  {
    q: "Which roadmap should I start with?",
    a: "Begin with the A2Z DSA roadmap, then move to SDE sheet and system design.",
  },
  {
    q: "How much time does it take to finish A2Z?",
    a: "Most learners complete it in 8-12 weeks with consistent practice.",
  },
  {
    q: "Do you update sheets regularly?",
    a: "Yes. We update content to match current interview trends and patterns.",
  },
];

function getTotal(key: string) {
  const subject = SUBJECT_MAP[key];
  if (!subject) return 0;
  let total = 0;
  subject.steps.forEach(s => s.topics.forEach(t => total += t.problems.length));
  return total;
}

export default function Home() {
  const { user } = useAuth();
  const [progresses, setProgresses] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!user || !user.uid) {
      setProgresses({});
      return;
    }
    const fetchProgress = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const snap = await getDoc(docRef);
        let allProgress: Record<string, Record<string, boolean>> = {};
        if (snap.exists()) {
          allProgress = snap.data().progress || {};
        }

        const newProgs: Record<string, number> = {};
        for (const mod of modules) {
          const modProgMap = allProgress[mod.id] || {};
          const completed = Object.values(modProgMap).filter(Boolean).length;
          const total = getTotal(mod.id);
          newProgs[mod.id] = total > 0 ? Math.round((completed / total) * 100) : 0;
        }
        setProgresses(newProgs);
      } catch (e) {
        console.error(e);
      }
    };
    fetchProgress();
  }, [user]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Topbar />

      {/* -- HERO -- */}
      <section className="relative overflow-hidden border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-14 md:py-20 flex flex-col md:flex-row items-center gap-12">
          {/* Left copy */}
          <motion.div
            className="flex-1 max-w-xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800 text-orange-600 text-xs font-semibold mb-6">
              <Star className="w-3 h-3 fill-orange-500" />
              NOW LIVE: LLD MASTERY COURSE
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-foreground mb-4">
              Complete Developer <span className="text-primary">Interview</span> Preparation Platform
            </h1>

            <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed">
              Master Data Structures, Algorithms, System Design, and Core CS Fundamentals with curated roadmaps, 1000+
              problems, and expert-led resources.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Link href="/signup">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-md shadow-orange-200 dark:shadow-orange-900/30"
                >
                  Start Learning <ArrowRight className="w-4 h-4" />
                </motion.button>
              </Link>
              <Link href="/roadmaps/dsa">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-6 py-3 bg-card border-2 border-border font-semibold rounded-xl hover:border-primary/50 hover:text-primary transition-colors"
                >
                  Explore Roadmaps
                </motion.button>
              </Link>
            </div>

            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {"ARMS".split("").map((l, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center text-xs font-bold text-primary"
                  >
                    {l}
                  </div>
                ))}
              </div>
              <span>
                Join <strong className="text-foreground">26,000+</strong> engineers worldwide
              </span>
            </div>
          </motion.div>

          {/* Right - hero card */}
          <motion.div
            className="flex-1 max-w-sm w-full"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="bg-background rounded-2xl border border-border shadow-xl p-6">
              <div className="aspect-video bg-secondary rounded-xl flex items-center justify-center mb-6 border border-border">
                <div className="text-center">
                  <Code2 className="w-12 h-12 text-primary mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">DSA Fundamentals</p>
                </div>
              </div>
              <div className="bg-orange-50 dark:bg-orange-950/30 rounded-xl p-4 flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">DSA Progress</span>
                    <span className="text-xs font-bold text-primary">{progresses["dsa"] || 0}%</span>
                  </div>
                  <div className="h-2 w-full bg-orange-100 dark:bg-orange-900/40 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${progresses["dsa"] || 0}%` }} />
                  </div>
                </div>
                <Link href="/roadmaps/dsa" className="text-xs font-bold text-primary whitespace-nowrap hover:underline">
                  RESUME &rarr;
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* -- TRUST + HIGHLIGHTS -- */}
      <section className="max-w-7xl mx-auto px-4 py-10 w-full">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-2xl p-6">
            <div className="text-sm text-muted-foreground mb-1">Trusted by learners</div>
            <div className="text-3xl font-extrabold text-foreground">26,000+</div>
            <p className="text-sm text-muted-foreground mt-2">
              Engineers and students use Codexa to build interview-ready skills.
            </p>
          </div>
          <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Why Codexa?</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {highlights.map(item => (
                <div key={item} className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* -- LEARNING MODULES -- */}
      <section className="max-w-7xl mx-auto px-4 py-14 w-full">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-1">Learning Modules</h2>
          <p className="text-muted-foreground">Comprehensive curriculum designed by top industry experts.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((mod, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <Link href={mod.href} className="group block h-full">
                <div className="h-full bg-card rounded-2xl border border-border p-6 hover:border-primary/40 hover:shadow-lg transition-all duration-200 flex flex-col">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${mod.color}`}>
                    {mod.icon}
                  </div>
                  <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {mod.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-5 flex-1 leading-relaxed">{mod.desc}</p>

                  {/* Progress bar */}
                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Progress</span>
                      <span className="text-[11px] font-bold text-primary">{progresses[mod.id] || 0}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-700"
                        style={{ width: `${progresses[mod.id] || 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* -- POPULAR SHEETS -- */}
      <section className="max-w-7xl mx-auto px-4 pb-14 w-full">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-1">Popular Sheets</h2>
            <p className="text-muted-foreground">Start with the most asked interview problem sets.</p>
          </div>
          <Link href="/sheets" className="text-sm font-semibold text-primary hover:underline">
            View all
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {sheets.map(sheet => (
            <Link key={sheet.title} href={sheet.href} className="group block h-full">
              <div className="h-full bg-card border border-border rounded-2xl p-6 hover:border-primary/60 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-950/30 text-orange-600 flex items-center justify-center mb-4">
                  <Layers className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {sheet.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">{sheet.desc}</p>
                <div className="text-sm font-semibold text-primary flex items-center gap-1">
                  Start Sheet <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* -- TESTIMONIALS -- */}
      <section className="max-w-7xl mx-auto px-4 pb-14 w-full">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-1">What Learners Say</h2>
          <p className="text-muted-foreground">Real feedback from Codexa users.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map(t => (
            <div key={t.name} className="bg-card border border-border rounded-2xl p-6">
              <Quote className="w-5 h-5 text-primary mb-3" />
              <p className="text-sm text-foreground mb-4">"{t.quote}"</p>
              <div className="text-sm font-semibold text-foreground">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* -- FAQ -- */}
      <section className="max-w-7xl mx-auto px-4 pb-14 w-full">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-1">Frequently Asked Questions</h2>
          <p className="text-muted-foreground">Quick answers to common questions.</p>
        </div>
        <div className="grid gap-4">
          {faqs.map(item => (
            <div key={item.q} className="bg-card border border-border rounded-2xl p-5">
              <h3 className="font-semibold text-foreground mb-2">{item.q}</h3>
              <p className="text-sm text-muted-foreground">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* -- CTA -- */}
      <section className="max-w-7xl mx-auto px-4 pb-16 w-full">
        <div className="bg-card border border-border rounded-2xl p-8 md:p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Ready to start?</h2>
            <p className="text-muted-foreground">Pick a roadmap and build a consistent prep routine.</p>
          </div>
          <Link
            href="/roadmaps/dsa"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
          >
            Start A2Z DSA <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* -- FOOTER -- */}
      <footer className="mt-auto border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
                <Code2 className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-foreground">Codexa</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              The ultimate destination for developers to learn, practice and crack interviews at top tech companies.
            </p>
          </div>
          {[
            {
              heading: "PLATFORM",
              links: [
                { label: "DSA Roadmap", href: "/roadmaps/dsa" },
                { label: "System Design", href: "/roadmaps/system-design" },
                { label: "Web Development", href: "/roadmaps/web" },
              ],
            },
            {
              heading: "RESOURCES",
              links: [
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
                { label: "GitHub", href: "https://github.com" },
              ],
            },
            {
              heading: "LEGAL",
              links: [
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Service", href: "/terms" },
                { label: "Cookie Policy", href: "/cookies" },
              ],
            },
          ].map(col => (
            <div key={col.heading}>
              <h4 className="text-xs font-bold text-muted-foreground tracking-widest mb-4">{col.heading}</h4>
              <ul className="space-y-2">
                {col.links.map(l => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>(c) 2026 Codexa. All rights reserved.</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
              Systems Operational
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
