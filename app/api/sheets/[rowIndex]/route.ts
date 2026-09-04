import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import {
  getTaskRows,
  getToolRows,
  getVehicleRows,
  getTeamNames,
} from "@/lib/google-sheets";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ rowIndex: string }> },
) {
  const user = await getAuthUser();
  if (!user || user.role !== "judge") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { rowIndex: rowIndexStr } = await params;
  const rowIndex = parseInt(rowIndexStr, 10);
  if (isNaN(rowIndex) || rowIndex < 1) {
    return NextResponse.json({ error: "Invalid rowIndex" }, { status: 400 });
  }

  try {
    const [tasks, tools, vehicles, teamNames] = await Promise.all([
      getTaskRows(),
      getToolRows(),
      getVehicleRows(),
      getTeamNames(),
    ]);

    const idx = rowIndex - 1;
    const task = tasks[idx] ?? null;
    const tool = tools[idx] ?? null;
    const vehicle = vehicles[idx] ?? null;

    return NextResponse.json({
      rowIndex,
      teamName: teamNames.get(rowIndex) ?? null,
      task,
      tool,
      vehicle,
    });
  } catch (err) {
    console.error(`Failed to fetch detail for row ${rowIndex}:`, err);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
