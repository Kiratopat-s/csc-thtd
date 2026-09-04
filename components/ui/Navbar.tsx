"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Zap, Menu, X } from "lucide-react";
import LogoutButton from "@/components/LogoutButton";
import MobileMenu from "@/components/ui/MobileMenu";
import TextSizeToggle from "@/components/ui/TextSizeToggle";
import { NAV_LINKS } from "@/lib/nav-links";
import type { AuthPayload } from "@/lib/auth";

interface NavbarProps {
  user: AuthPayload;
}

export default function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const links = NAV_LINKS[user.role];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-border-subtle bg-surface/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Brand */}
            <Link href="/" className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-orange-accent" />
              <span className="text-sm font-semibold text-foreground hidden sm:inline">
                การแข่งขันทักษะฝีมือช่าง 2569
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1">
              {links.map(({ label, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive(href)
                      ? "bg-purple-medium/20 text-purple-light"
                      : "text-text-muted hover:text-foreground hover:bg-surface-elevated"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              ))}
            </div>

            {/* Desktop right side */}
            <div className="hidden md:flex items-center gap-4">
              <TextSizeToggle />
              <span className="text-sm text-text-muted">
                สวัสดี, {user.username}
              </span>
              <LogoutButton />
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-text-muted hover:text-foreground hover:bg-surface-elevated transition-colors"
              aria-label={mobileOpen ? "ปิดเมนู" : "เปิดเมนู"}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        user={user}
        links={links}
      />
    </>
  );
}
