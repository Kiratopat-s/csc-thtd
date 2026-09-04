"use client";

import { useState } from "react";
import { Zap, Lock, User } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: implement auth logic
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-md flex flex-col items-center gap-8">
        {/* Icon */}
        <Zap className="w-12 h-12 text-orange-accent" strokeWidth={1.5} />

        {/* Title */}
        <h1 className="text-2xl font-bold text-foreground">เข้าสู่ระบบ</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          {/* Username */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="ชื่อผู้ใช้"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-surface-elevated border border-border-subtle rounded-xl text-foreground placeholder:text-text-muted focus:outline-none focus:border-purple-medium"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="password"
              placeholder="รหัสผ่าน"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-surface-elevated border border-border-subtle rounded-xl text-foreground placeholder:text-text-muted focus:outline-none focus:border-purple-medium"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-purple-medium hover:bg-purple-light text-white font-semibold rounded-xl transition-colors"
          >
            เข้าสู่ระบบ
          </button>
        </form>

        {/* Back Link */}
        <Link
          href="/"
          className="text-text-muted text-sm hover:text-purple-light transition-colors"
        >
          กลับหน้าหลัก
        </Link>
      </div>
    </section>
  );
}
