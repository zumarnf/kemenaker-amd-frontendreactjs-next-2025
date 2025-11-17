"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Username dan password wajib diisi");
      return;
    }

    try {
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        setError("Username atau password salah");
        return;
      }

      const data = await res.json();

      localStorage.setItem("token", data.token);

      router.push("/dashboard");
    } catch {
      setError("Terjadi kesalahan, coba lagi");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-linear-to-br from-rose-50 to-rose-100 px-4">
      <Card className="w-full max-w-sm shadow-xl border-rose-200">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center bg-linear-to-r from-rose-600 to-rose-400 bg-clip-text text-transparent">
            WantS Inventory Login
          </h1>
        </CardHeader>

        <CardContent>
          {error && (
            <p className="text-red-600 mb-3 text-sm bg-red-50 border border-red-200 p-2 rounded">
              {error}
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label>Username</Label>
              <Input
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="focus-visible:ring-rose-500"
              />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="focus-visible:ring-rose-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-rose-600 hover:bg-rose-700 text-white shadow-md"
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
