import Topbar from "@/components/topbar";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Topbar />
      <section className="max-w-4xl mx-auto px-4 py-12 w-full">
        <h1 className="text-3xl font-extrabold text-foreground mb-4">Your Profile</h1>
        <p className="text-muted-foreground mb-6">
          Profile settings will be available once authentication is connected.
        </p>
        <div className="bg-card border border-border rounded-2xl p-6">
          <div className="text-sm text-muted-foreground">Name</div>
          <div className="text-foreground font-semibold">Guest User</div>
          <div className="mt-4 text-sm text-muted-foreground">Email</div>
          <div className="text-foreground font-semibold">guest@codexa.in</div>
        </div>
      </section>
    </div>
  );
}
