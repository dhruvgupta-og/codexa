import Topbar from "@/components/topbar";

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Topbar />
      <section className="max-w-4xl mx-auto px-4 py-12 w-full">
        <h1 className="text-3xl font-extrabold text-foreground mb-4">Help Center</h1>
        <p className="text-muted-foreground mb-6">
          Need help? Check the FAQs or contact support.
        </p>
        <div className="grid gap-4">
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="font-semibold text-foreground mb-2">Account</h2>
            <p className="text-sm text-muted-foreground">Login and signup issues, password reset.</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="font-semibold text-foreground mb-2">Roadmaps</h2>
            <p className="text-sm text-muted-foreground">How to follow a roadmap and track progress.</p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="font-semibold text-foreground mb-2">Contact Support</h2>
            <p className="text-sm text-muted-foreground">Email support@codexa.in</p>
          </div>
        </div>
      </section>
    </div>
  );
}
