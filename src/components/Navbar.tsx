"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${
          scrolled
            ? "bg-rose-600/70 shadow-sm dark:bg-black/30"
            : "bg-rose-600 dark:bg-black/10"
        } 
      `}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/dashboard" className="text-2xl font-bold text-amber-200">
          WantS
        </Link>

        <div className="flex items-center gap-6">
          <Link
            href="/dashboard"
            className="text-white hover:text-amber-200 transition"
          >
            Home
          </Link>

          <Link
            href="/products"
            className="text-white hover:text-amber-200 transition"
          >
            Product
          </Link>

          <Button
            variant="destructive"
            className="bg-amber-100 text-rose-700 hover:text-amber-100"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
