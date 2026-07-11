import Link from "next/link";
import Topbar from "@/components/topbar";
import { ArrowLeft, Code2 } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Topbar />
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-8">
          <Code2 className="w-10 h-10 text-primary" />
        </div>
        <h1 className="text-8xl font-black text-foreground mb-4 tracking-tighter">404</h1>
        <h2 className="text-2xl font-bold text-foreground mb-4">Page not found</h2>
        <p className="text-muted-foreground max-w-sm mb-8">
          The problem or roadmap you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
