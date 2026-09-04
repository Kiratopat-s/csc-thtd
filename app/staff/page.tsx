import { getCurrentUser } from "@/lib/get-current-user";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import FormCard from "@/components/staff/FormCard";
import AuroraBackground from "@/components/backgrounds/AuroraBackground";

const forms = [
  {
    title: "เช็คสภาพรถ",
    iconKey: "truck",
    href: "https://forms.gle/QkPMdobAjuWSHuh99",
  },
  {
    title: "เช็คสภาพงาน",
    iconKey: "clipboard-check",
    href: "https://forms.gle/ynGg4Y1i15tycEYv7",
  },
  {
    title: "เช็คสภาพเครื่องมือ",
    iconKey: "wrench",
    href: "https://forms.gle/tnkt53mVR7kZSsGg8",
  },
];

export default async function StaffDashboard() {
  const user = await getCurrentUser();
  if (!user || user.role !== "staff") redirect("/login");

  return (
    <main className="relative min-h-dvh overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0">
        <AuroraBackground />
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 z-[1] bg-black/50" />

      {/* Content */}
      <div className="relative z-[2] flex flex-col items-center min-h-dvh px-6 py-12">
        {/* Header */}
        <header className="flex flex-col items-center gap-3 mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            การแข่งขันทักษะฝีมือช่าง 2569
          </h1>
          <p className="text-text-muted">
            สวัสดี, {user.username}
          </p>
        </header>

        {/* Form Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-auto">
          {forms.map((form) => (
            <FormCard
              key={form.href}
              title={form.title}
              iconKey={form.iconKey}
              href={form.href}
            />
          ))}
        </div>

        {/* Footer Logout */}
        <div className="mt-12">
          <LogoutButton />
        </div>
      </div>
    </main>
  );
}
