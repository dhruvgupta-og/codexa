"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth-provider";
import { db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Phone, Code2, ArrowRight } from "lucide-react";

export default function OnboardingPage() {
  const { user, userData, setUserData } = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (userData?.name && userData?.phone) {
      router.push("/");
    }
    if (user?.displayName) {
      setName(user.displayName);
    }
  }, [userData, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    setIsSubmitting(true);
    try {
      const data = {
        uid: user?.uid,
        email: user?.email,
        name: name.trim(),
        phone: phone,
        updatedAt: new Date().toISOString(),
      };
      await setDoc(doc(db, "users", user!.uid), data, { merge: true });
      setUserData(data);
      router.push("/");
    } catch (err) {
      console.error(err);
      setError("Failed to save profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return null; // Or a loading spinner
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-card border border-border rounded-2xl p-8 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
            <Code2 className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-2xl text-foreground">Codexa</span>
        </div>

        <h1 className="text-2xl font-extrabold text-foreground mb-2">Complete your profile</h1>
        <p className="text-muted-foreground mb-8">Just a few more details to get you started.</p>

        {error && (
          <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-lg mb-6 border border-destructive/20">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Chen"
                className="w-full bg-secondary/50 border border-border rounded-xl pl-10 pr-4 py-3 text-sm focus:border-primary outline-none transition-colors"
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-foreground">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="10 digit number"
                className="w-full bg-secondary/50 border border-border rounded-xl pl-10 pr-4 py-3 text-sm focus:border-primary outline-none transition-colors"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 mt-4"
          >
            {isSubmitting ? "Saving..." : "Start Learning"} <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </motion.div>
    </div>
  );
}
