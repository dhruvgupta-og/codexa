"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Topbar from "@/components/topbar";
import { Layers, Clock, Star, ArrowRight } from "lucide-react";

const sheets = [
  {
    id: "dsa",
    title: "Striver's A2Z DSA Sheet",
    tag: "Most Popular",
    tagColor: "bg-orange-50 text-orange-600 border-orange-200 dark:bg-orange-950/30 dark:border-orange-800",
    desc: "Step-by-step DSA roadmap from basics to advanced with curated practice problems.",
    count: 450,
    time: "8-12 Weeks",
    color: "border-primary/40",
    iconBg: "bg-orange-50 dark:bg-orange-950/30 text-primary",
  },
  {
    id: "striver-sde",
    title: "Striver's SDE Sheet",
    tag: "Comprehensive",
    tagColor: "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-950/30 dark:border-blue-800",
    desc: "190 hand-picked questions recommended for top product-based companies like Google and Amazon.",
    count: 190,
    time: "2 Months",
    color: "border-blue-400/40",
    iconBg: "bg-blue-50 dark:bg-blue-950/30 text-blue-500",
  },
  {
    id: "blind75",
    title: "Blind 75",
    tag: "Structured",
    tagColor: "bg-green-50 text-green-600 border-green-200 dark:bg-green-950/30 dark:border-green-800",
    desc: "75 carefully curated problems that cover most interview patterns.",
    count: 75,
    time: "2-4 Weeks",
    color: "border-green-400/40",
    iconBg: "bg-green-50 dark:bg-green-950/30 text-green-500",
  },
];

export default function SheetsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Topbar />
      <div className="max-w-5xl mx-auto px-4 py-12 w-full">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-foreground mb-2">Coding Sheets</h1>
          <p className="text-muted-foreground">
            Curated problem sets to master algorithms efficiently for FAANG and product-based interviews.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {sheets.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/roadmaps/${s.id}`} className="group block h-full">
                <div className={`h-full bg-card rounded-2xl border-2 ${s.color} p-6 hover:shadow-lg transition-all flex flex-col`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.iconBg}`}>
                      <Layers className="w-6 h-6" />
                    </div>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${s.tagColor}`}>
                      {s.tag}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {s.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-6 flex-1 leading-relaxed">{s.desc}</p>

                  <div className="flex items-center justify-between text-sm border-t border-border pt-4">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-semibold">{s.count} Problems</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{s.time}</span>
                    </div>
                  </div>

                  <button className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 bg-primary text-white font-semibold rounded-xl text-sm hover:bg-primary/90 transition-colors">
                    Start Sheet <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
