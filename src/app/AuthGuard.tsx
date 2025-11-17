"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const isLoginPage = pathname === "/login";

    if (!token && !isLoginPage) {
      router.replace("/login");
    }

    if (token && isLoginPage) {
      router.replace("/dashboard");
    }
  }, [pathname, router]);

  return <>{children}</>;
}
