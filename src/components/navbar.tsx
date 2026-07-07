"use client"

import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useTheme } from "next-themes"
import { Moon, Sun, Monitor, Code } from "lucide-react"

export default function Navbar() {
  const { user } = useAuth()
  const { theme, setTheme } = useTheme()

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 sticky top-0">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 text-primary font-bold text-xl tracking-tight">
          <Code className="h-6 w-6" />
          <span>Codexa</span>
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/roadmaps/dsa" className="text-sm font-medium hover:text-primary transition-colors">DSA</Link>
          <Link href="/sheets" className="text-sm font-medium hover:text-primary transition-colors">Sheets</Link>
          <Link href="/roadmaps/cs" className="text-sm font-medium hover:text-primary transition-colors">Core CS</Link>
          <Link href="/roadmaps/system-design" className="text-sm font-medium hover:text-primary transition-colors">System Design</Link>
          
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-accent hover:text-accent-foreground"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">Dashboard</Link>
              <button onClick={() => signOut(auth)} className="text-sm font-medium bg-secondary text-secondary-foreground px-4 py-2 rounded-md hover:opacity-80 transition-opacity">
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-sm font-medium hover:text-primary transition-colors">Login</Link>
              <Link href="/signup" className="text-sm font-medium bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors shadow-sm">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
