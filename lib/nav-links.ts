import { LayoutDashboard, type LucideIcon } from "lucide-react";
import type { AuthPayload } from "@/lib/auth";

export interface NavLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const NAV_LINKS: Record<AuthPayload["role"], NavLink[]> = {
  staff: [{ label: "แดชบอร์ด", href: "/staff", icon: LayoutDashboard }],
  judge: [{ label: "แดชบอร์ด", href: "/judge", icon: LayoutDashboard }],
};
