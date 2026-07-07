"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter, usePathname } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  userData: any;
  setUserData: (data: any) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  userData: null,
  setUserData: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // 1. Auth State Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            setUserData(null);
          }
        } catch (error) {
          console.error("Firestore fetch error:", error);
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. Redirection Logic
  useEffect(() => {
    if (loading) return;

    const isAuthPage = pathname === "/login" || pathname === "/signup" || pathname === "/onboarding";

    if (user) {
      // Logged in: Check for profile completeness
      if (!isAuthPage && (!userData || !userData.name || !userData.phone)) {
        router.push("/onboarding");
      }
    } else {
      // Not logged in: Protect routes
      const protectedRoutes = ["/roadmaps", "/sheets", "/dashboard", "/profile"];
      if (protectedRoutes.some(route => pathname.startsWith(route))) {
        router.push("/login");
      }
    }
  }, [user, userData, loading, pathname, router]);

  return (
    <AuthContext.Provider value={{ user, loading, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
