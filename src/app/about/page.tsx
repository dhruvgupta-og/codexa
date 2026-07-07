import Topbar from "@/components/topbar";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Topbar />
      <section className="max-w-4xl mx-auto px-4 py-12 w-full">
        <h1 className="text-3xl font-extrabold text-foreground mb-4">About Codexa</h1>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Codexa is a focused interview preparation platform designed for developers.
          We organize learning into clear roadmaps and practice sheets so you can
          build depth without getting lost in fragmented resources.
        </p>
        <div className="grid gap-4">
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="font-semibold text-foreground mb-2">What We Do</h2>
            <p className="text-sm text-muted-foreground">
              We curate structured paths for DSA, core CS fundamentals, system design,
              web development, and machine learning. Each roadmap includes practice
              questions and checkpoints to track progress.
            </p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="font-semibold text-foreground mb-2">Who It Is For</h2>
            <p className="text-sm text-muted-foreground">
              Students preparing for placements, working engineers upskilling,
              and anyone targeting product-based interviews.
            </p>
          </div>
        </div>
        <div className="mt-6">
          <Link href="/roadmaps" className="text-sm font-semibold text-primary hover:underline">
            Explore Roadmaps
          </Link>
        </div>
      </section>
    </div>
  );
}
