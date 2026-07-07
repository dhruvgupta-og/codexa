import Topbar from "@/components/topbar";
import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";

const roadmapCards = [
  { key: "dsa", title: "DSA Roadmap (A2Z)", desc: "Step-by-step DSA preparation from basics to advanced." },
  { key: "cs", title: "Core CS Fundamentals", desc: "OS, DBMS, and Computer Networks for interviews." },
  { key: "system-design", title: "System Design", desc: "HLD + LLD practice with real-world designs." },
  { key: "web", title: "Web Development", desc: "Frontend, backend, and deployment roadmap." },
  { key: "ml", title: "Machine Learning", desc: "ML foundations to deep learning track." },
  { key: "blind75", title: "Blind 75 Sheet", desc: "Most popular 75 interview problems." },
  { key: "striver-sde", title: "Striver's SDE Sheet", desc: "190 hand-picked SDE interview questions." },
];

export default function RoadmapsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Topbar />

      <section className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center text-orange-600">
              <BookOpen className="w-5 h-5" />
            </div>
            <h1 className="text-3xl font-extrabold text-foreground">All Roadmaps</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Choose a track and follow the guided steps. Every roadmap includes curated practice questions and checkpoints.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10 w-full">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {roadmapCards.map(card => (
            <Link key={card.key} href={`/roadmaps/${card.key}`} className="group block h-full">
              <div className="h-full bg-card border border-border rounded-2xl p-6 hover:border-primary/60 hover:shadow-lg transition-all">
                <h2 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {card.title}
                </h2>
                <p className="text-sm text-muted-foreground mb-4">{card.desc}</p>
                <div className="flex items-center gap-2 text-sm text-primary font-semibold">
                  Open Roadmap <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
