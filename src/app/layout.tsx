import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import AuthGuard from "./AuthGuard";
import Navbar from "@/components/Navbar";

// Register Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Product Management App",
  description: "Skill Test Frontend Kemenaker 2025",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* Apply poppins globally */}
      <body className={`${poppins.variable} font-poppins antialiased`}>
        {/* Protect pages with authentication */}
        <AuthGuard>
          {/* Navbar appears on all pages except login */}
          <Navbar />

          <main className="pt-4">{children}</main>
        </AuthGuard>
      </body>
    </html>
  );
}
