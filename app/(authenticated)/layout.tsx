import { redirect } from "next/navigation";
import { getAuthUser } from "@/lib/auth";
import Navbar from "@/components/ui/Navbar";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthUser();
  if (!user) redirect("/login");

  return (
    <div suppressHydrationWarning>
      <Navbar user={user} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
