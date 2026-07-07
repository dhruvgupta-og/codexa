import Topbar from "@/components/topbar";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Topbar />
      <section className="max-w-4xl mx-auto px-4 py-12 w-full">
        <h1 className="text-3xl font-extrabold text-foreground mb-4">Contact Us</h1>
        <p className="text-muted-foreground leading-relaxed mb-6">
          Have feedback or want to suggest improvements? Reach out and we will get back to you.
        </p>
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="grid gap-4 text-sm text-muted-foreground">
            <div>
              <div className="text-foreground font-semibold">Email</div>
              <div>support@codexa.in</div>
            </div>
            <div>
              <div className="text-foreground font-semibold">Response Time</div>
              <div>Within 24-48 hours on business days</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
