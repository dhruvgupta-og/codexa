import Topbar from "@/components/topbar";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Topbar />
      <section className="max-w-4xl mx-auto px-4 py-12 w-full">
        <h1 className="text-3xl font-extrabold text-foreground mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Codexa respects your privacy. We collect only the data required to provide the
          service, such as authentication details and usage analytics for product improvement.
        </p>
        <div className="grid gap-4 text-sm text-muted-foreground">
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="text-foreground font-semibold mb-2">Data We Collect</div>
            <div>Account info, progress metadata, and optional feedback submissions.</div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="text-foreground font-semibold mb-2">How We Use It</div>
            <div>To personalize your roadmap experience and improve platform quality.</div>
          </div>
        </div>
      </section>
    </div>
  );
}
