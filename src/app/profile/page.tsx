"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth-provider";
import { db } from "@/lib/firebase";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import Topbar from "@/components/topbar";
import { motion } from "framer-motion";
import { User, Mail, Phone, Building2, CalendarClock, Save, CheckCircle2 } from "lucide-react";

export default function ProfilePage() {
  const { user, userData } = useAuth();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [targetCompany, setTargetCompany] = useState("");
  const [goalDate, setGoalDate] = useState("");
  const [streak, setStreak] = useState(0);
  const [totalSolved, setTotalSolved] = useState(0);

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Hydrate from Firestore in real-time
  useEffect(() => {
    if (!user) return;

    const docRef = doc(db, "users", user.uid);
    const unsubscribe = onSnapshot(docRef, (snap) => {
      if (snap.exists()) {
        const d = snap.data();
        setName(d.name || user.displayName || "");
        setPhone(d.phone || "");
        setTargetCompany(d.targetCompany || "");
        setGoalDate(d.goalDate || "");
        setStreak(d.streak || 0);

        // Count total solved across all roadmaps
        const progress = d.progress || {};
        let solved = 0;
        for (const roadmapKey of Object.keys(progress)) {
          const map = progress[roadmapKey] || {};
          solved += Object.values(map).filter(Boolean).length;
        }
        setTotalSolved(solved);
      } else {
        setName(user.displayName || "");
      }
    });

    return () => unsubscribe();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setSaved(false);
    try {
      const docRef = doc(db, "users", user.uid);
      await setDoc(
        docRef,
        {
          name: name.trim(),
          phone,
          targetCompany: targetCompany.trim(),
          goalDate,
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.error("Error saving profile:", err);
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Topbar />
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Topbar />

      <main className="max-w-3xl mx-auto px-4 py-10 w-full flex-1">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          {/* Header */}
          <div className="flex items-center gap-5 mb-10">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="Avatar"
                className="w-20 h-20 rounded-full border-4 border-primary/20"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-3xl font-bold text-primary">
                {(user.displayName || user.email || "U")[0].toUpperCase()}
              </div>
            )}
            <div>
              <h1 className="text-2xl font-extrabold text-foreground">
                {name || user.displayName || "Your Profile"}
              </h1>
              <p className="text-muted-foreground text-sm">{user.email}</p>
              <div className="flex items-center gap-4 mt-2 text-sm">
                <span className="flex items-center gap-1 text-orange-500 font-semibold">
                  🔥 {streak} day streak
                </span>
                <span className="text-muted-foreground">
                  {totalSolved} problems solved
                </span>
              </div>
            </div>
          </div>

          {/* Editable Fields */}
          <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
            <h2 className="text-lg font-bold text-foreground mb-1">Profile Settings</h2>

            {/* Name */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" /> Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-sm focus:border-primary outline-none transition-colors"
                placeholder="Your name"
              />
            </div>

            {/* Email (read-only) */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" /> Email
              </label>
              <input
                type="email"
                value={user.email || ""}
                readOnly
                className="w-full bg-secondary/30 border border-border rounded-xl px-4 py-3 text-sm text-muted-foreground cursor-not-allowed"
              />
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" /> Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-sm focus:border-primary outline-none transition-colors"
                placeholder="10 digit number"
              />
            </div>

            {/* Target Company */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Building2 className="w-4 h-4 text-muted-foreground" /> Target Company
              </label>
              <input
                type="text"
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
                className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-sm focus:border-primary outline-none transition-colors"
                placeholder="e.g. Google, Amazon, Microsoft"
              />
            </div>

            {/* Goal Date */}
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-foreground flex items-center gap-2">
                <CalendarClock className="w-4 h-4 text-muted-foreground" /> Goal Date
              </label>
              <input
                type="date"
                value={goalDate}
                onChange={(e) => setGoalDate(e.target.value)}
                className="w-full bg-secondary/50 border border-border rounded-xl px-4 py-3 text-sm focus:border-primary outline-none transition-colors"
              />
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50"
            >
              {saved ? (
                <>
                  <CheckCircle2 className="w-4 h-4" /> Saved!
                </>
              ) : saving ? (
                "Saving..."
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save Changes
                </>
              )}
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
