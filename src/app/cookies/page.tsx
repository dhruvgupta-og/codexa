import Topbar from "@/components/topbar";

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Topbar />
      <section className="max-w-4xl mx-auto px-4 py-12 w-full">
        <h1 className="text-3xl font-extrabold text-foreground mb-4">Cookie Policy</h1>
        <p className="text-muted-foreground leading-relaxed mb-6">
          We use cookies to keep you signed in and improve the overall experience.
        </p>
        <div className="grid gap-4 text-sm text-muted-foreground">
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="text-foreground font-semibold mb-2">Essential Cookies</div>
            <div>Used for authentication and basic site functionality.</div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-5">
            <div className="text-foreground font-semibold mb-2">Analytics Cookies</div>
            <div>Help us understand usage patterns to improve the platform.</div>
          </div>
        </div>
      </section>
    </div>
  );
}
