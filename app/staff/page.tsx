import { getCurrentUser } from "@/lib/get-current-user";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export default async function StaffDashboard() {
  const user = await getCurrentUser();
  if (!user || user.role !== "staff") redirect("/login");

  return (
    <main className="min-h-dvh flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Staff Dashboard</h1>
      <p>สวัสดี, {user.username}</p>
      <LogoutButton />
    </main>
  );
}
