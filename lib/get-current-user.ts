import { headers } from "next/headers";
import type { AuthPayload } from "@/lib/auth";

export async function getCurrentUser(): Promise<AuthPayload | null> {
  const headersList = await headers();
  const username = headersList.get("x-user-username");
  const role = headersList.get("x-user-role");

  if (!username || !role) return null;
  return { username, role: role as "judge" | "staff" };
}
