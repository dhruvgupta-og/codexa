"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useAuth } from "./auth-provider";
import { auth } from "@/lib/firebase";
import {
  Moon,
  Sun,
  Search,
  Menu,
  X,
  Code2,
  ChevronDown,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "A2Z DSA", href: "/roadmaps/dsa" },
  { label: "SDE Sheet", href: "/roadmaps/striver-sde" },
  { label: "Blind 75", href: "/roadmaps/blind75" },
  { label: "Core CS", href: "/roadmaps/cs" },
  { label: "System Design", href: "/roadmaps/system-design" },
  { label: "Web Dev", href: "/roadmaps/web" },
  { label: "Roadmaps", href: "/roadmaps" },
  { label: "Sheets", href: "/sheets" },
];

export default function Topbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { user, userData } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleSignOut = async () => {
    await auth.signOut();
    window.location.reload();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2 mr-4 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Code2 className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-lg text-foreground hidden sm:block">Codexa</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 flex-1 overflow-x-auto">
          {navLinks.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-colors whitespace-nowrap ${
                pathname === l.href
                  ? "text-primary bg-orange-50 dark:bg-orange-950/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2 flex-1 max-w-xs bg-secondary rounded-lg px-3 py-1.5 border border-border">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input
            type="text"
            placeholder="Search topics..."
            className="bg-transparent text-sm outline-none w-full text-foreground placeholder:text-muted-foreground"
          />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
            aria-label="Toggle theme"
          >
            {mounted ? (theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />) : <Moon className="w-4 h-4" />}
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(o => !o)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border hover:bg-secondary transition-colors text-sm font-medium"
              >
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold overflow-hidden">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    (userData?.name || user.displayName)?.[0]?.toUpperCase() ?? "U"
                  )}
                </div>
                <span className="hidden sm:block">
                  {(userData?.name || user.displayName)?.split(" ")[0] || "User"}
                </span>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-card border border-border rounded-xl shadow-lg py-1 z-50">
                  <Link
                    href="/dashboard"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-secondary transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-secondary transition-colors"
                  >
                    <User className="w-4 h-4" /> Profile
                  </Link>
                  <hr className="my-1 border-border" />
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-destructive hover:bg-secondary w-full transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-1.5 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              Login
            </Link>
          )}

          <button onClick={() => setMobileOpen(o => !o)} className="lg:hidden p-2 rounded-lg hover:bg-secondary">
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-card px-4 py-3 space-y-1">
          {navLinks.map(l => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                pathname === l.href ? "text-primary bg-orange-50" : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
