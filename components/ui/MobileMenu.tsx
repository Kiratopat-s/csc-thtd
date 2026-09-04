"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import LogoutButton from "@/components/LogoutButton";
import TextSizeToggle from "@/components/ui/TextSizeToggle";
import ThemeToggle from "@/components/ui/ThemeToggle";
import type { NavLink } from "@/lib/nav-links";
import type { AuthPayload } from "@/lib/auth";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: AuthPayload;
  links: NavLink[];
}

export default function MobileMenu({
  isOpen,
  onClose,
  user,
  links,
}: MobileMenuProps) {
  const pathname = usePathname();

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Close on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/30 dark:bg-black/60 backdrop-blur-sm md:hidden"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            role="dialog"
            aria-label="เมนูนำทาง"
            className="fixed top-0 right-0 z-50 h-full w-72 bg-surface/95 backdrop-blur-xl border-l border-border-subtle flex flex-col md:hidden"
          >
            {/* Close button */}
            <div className="flex justify-end p-4">
              <button
                onClick={onClose}
                className="p-2 rounded-lg text-text-muted hover:text-foreground hover:bg-surface-elevated transition-colors"
                aria-label="ปิดเมนู"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User info */}
            <div className="px-6 pb-6 border-b border-border-subtle">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-medium/20 flex items-center justify-center text-purple-light font-semibold text-sm">
                  {user.username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {user.username}
                  </p>
                  <p className="text-xs text-text-muted capitalize">
                    {user.role}
                  </p>
                </div>
              </div>
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-3 py-4 space-y-1">
              {links.map(({ label, href, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  aria-current={isActive(href) ? "page" : undefined}
                  className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    isActive(href)
                      ? "bg-purple-medium/20 text-purple-light"
                      : "text-text-muted hover:text-foreground hover:bg-surface-elevated"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </Link>
              ))}
            </nav>

            {/* Text size toggle */}
            <div className="px-6 py-4 border-t border-border-subtle">
              <p className="text-xs text-text-muted mb-2">ขนาดตัวอักษร</p>
              <TextSizeToggle />
              <p className="text-xs text-text-muted mb-2 mt-4">ธีม</p>
              <ThemeToggle />
            </div>

            {/* Logout at bottom */}
            <div className="p-6 border-t border-border-subtle">
              <LogoutButton />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
