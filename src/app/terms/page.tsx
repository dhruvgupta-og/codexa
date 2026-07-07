import Topbar from "@/components/topbar";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Topbar />
      <section className="max-w-4xl mx-auto px-4 py-12 w-full">
        <h1 className="text-3xl font-extrabold text-foreground mb-4">Terms of Service</h1>
        <p className="text-muted-foreground leading-relaxed mb-6">
          By using Codexa, you agree to use the platform responsibly and respect the
          intellectual property of contributors and partners.
        </p>
        <div className="grid gap-4 text-sm text-muted-foreground">
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="text-foreground font-semibold mb-2">Acceptable Use</div>
            <div>Do not misuse the platform, scrape content, or attempt unauthorized access.</div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="text-foreground font-semibold mb-2">Account Security</div>
            <div>You are responsible for maintaining the confidentiality of your account.</div>
          </div>
        </div>
      </section>
    </div>
  );
}
