import { getAuthUser } from "@/lib/auth";
import {
  getTaskRows,
  getToolRows,
  getVehicleRows,
  getTeamNames,
} from "@/lib/google-sheets";
import DashboardTable from "@/components/judge/DashboardTable";

export default async function JudgeDashboard() {
  const user = await getAuthUser();
  if (!user || user.role !== "judge") return null;

  const [tasks, tools, vehicles, teamNames] = await Promise.all([
    getTaskRows(),
    getToolRows(),
    getVehicleRows(),
    getTeamNames(),
  ]);

  const maxRows = Math.max(tasks.length, tools.length, vehicles.length, 1);
  const records = Array.from({ length: maxRows }, (_, i) => {
    const rowIndex = i + 1;
    const task = tasks[i];
    const tool = tools[i];
    const vehicle = vehicles[i];
    return {
      rowIndex,
      teamName: teamNames.get(rowIndex) ?? null,
      task: task
        ? { submitted: true, timestamp: task.timestamp }
        : { submitted: false, timestamp: null },
      tool: tool
        ? { submitted: true, timestamp: tool.timestamp }
        : { submitted: false, timestamp: null },
      vehicle: vehicle
        ? { submitted: true, timestamp: vehicle.timestamp }
        : { submitted: false, timestamp: null },
    };
  });

  return (
    <main className="min-h-dvh px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">
          สรุปผลการตรวจสอบ
        </h1>
        <p className="text-sm text-text-muted mt-1">
          ทั้งหมด {maxRows} รายการ
        </p>
      </div>

      <DashboardTable records={records} />
    </main>
  );
}
