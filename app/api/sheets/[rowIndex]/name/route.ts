import { NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";
import { updateTeamName } from "@/lib/google-sheets";

export async function PATCH(
  request: Request,
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
    const { name } = await request.json();
    if (typeof name !== "string") {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }
    await updateTeamName(rowIndex, name.trim());
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(`Failed to update name for row ${rowIndex}:`, err);
    return NextResponse.json(
      { error: "Failed to update name" },
      { status: 500 },
    );
  }
}
