import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import {
  getTaskRows,
  getToolRows,
  getVehicleRows,
  getTeamNames,
} from "@/lib/google-sheets";

export async function GET() {
  const user = await getAuthUser();
  if (!user || user.role !== "judge") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [tasks, tools, vehicles, teamNames] = await Promise.all([
      getTaskRows(),
      getToolRows(),
      getVehicleRows(),
      getTeamNames(),
    ]);

    const maxRows = Math.max(tasks.length, tools.length, vehicles.length);
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

    return NextResponse.json({ records });
  } catch (err) {
    console.error("Failed to fetch sheets summary:", err);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
