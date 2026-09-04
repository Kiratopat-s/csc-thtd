import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  getTaskRows,
  getToolRows,
  getVehicleRows,
  getTeamNames,
} from "@/lib/google-sheets";
import SheetSection from "@/components/judge/SheetSection";
import type { IconName } from "@/components/judge/SheetSection";
import EditableName from "@/components/judge/EditableName";
import RefreshButton from "@/components/judge/RefreshButton";

export default async function JudgeDetailPage({
  params,
}: {
  params: Promise<{ rowIndex: string }>;
}) {
  const { rowIndex: rowIndexStr } = await params;
  const rowIndex = parseInt(rowIndexStr, 10);
  if (isNaN(rowIndex) || rowIndex < 1) notFound();

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

  if (!task && !tool && !vehicle) notFound();

  const teamName = teamNames.get(rowIndex) ?? null;

  const taskFields = task
    ? [
        {
          label: "จุดต่อแน่นมั้ย",
          value: task.connectionStatus,
          icon: (task.connectionStatus === "แน่น"
            ? "ShieldCheck"
            : "ShieldAlert") as IconName,
          colorClass:
            task.connectionStatus === "แน่น"
              ? "text-green-600 dark:text-green-400"
              : "text-orange-accent",
        },
      ]
    : [];

  const toolFields = tool
    ? [
        {
          label: "คืนเครื่องมือครบมั้ย",
          value: tool.returnStatus,
          icon: (tool.returnStatus === "ครบ"
            ? "PackageCheck"
            : "PackageX") as IconName,
          colorClass:
            tool.returnStatus === "ครบ"
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400",
        },
        {
          label: "เก็บเข้าที่เดิมเรียบร้อยมั้ย",
          value: tool.storageStatus,
          icon: (tool.storageStatus === "เรียบร้อย"
            ? "CheckCircle"
            : "XCircle") as IconName,
          colorClass:
            tool.storageStatus === "เรียบร้อย"
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400",
        },
      ]
    : [];

  const vehicleFields = vehicle
    ? [
        {
          label: "Boom บน เก็บสนิทมั้ย",
          value: vehicle.boomTopStatus,
          icon: (vehicle.boomTopStatus === "สนิท"
            ? "CheckCircle"
            : "XCircle") as IconName,
          colorClass:
            vehicle.boomTopStatus === "สนิท"
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400",
          imageUrl: vehicle.boomTopImage,
        },
        {
          label: "Boom ล่าง เก็บสนิทมั้ย",
          value: vehicle.boomBottomStatus,
          icon: (vehicle.boomBottomStatus === "สนิท"
            ? "CheckCircle"
            : "XCircle") as IconName,
          colorClass:
            vehicle.boomBottomStatus === "สนิท"
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400",
          imageUrl: vehicle.boomBottomImage,
        },
        {
          label: "ใบกระเช้า นั่งสนิทมั้ย",
          value: vehicle.basketStatus,
          icon: (vehicle.basketStatus === "สนิท"
            ? "CheckCircle"
            : "XCircle") as IconName,
          colorClass:
            vehicle.basketStatus === "สนิท"
              ? "text-green-600 dark:text-green-400"
              : "text-red-600 dark:text-red-400",
          imageUrl: vehicle.basketImage,
        },
        {
          label: "Lock เครนกระเช้ามั้ย",
          value: vehicle.lockStatus,
          icon: (vehicle.lockStatus === "Lock"
            ? "Lock"
            : "Unlock") as IconName,
          colorClass:
            vehicle.lockStatus === "Lock" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400",
          imageUrl: vehicle.lockImage,
        },
      ]
    : [];

  return (
    <main className="min-h-dvh px-4 sm:px-6 lg:px-8 py-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Link
            href="/judge"
            className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-purple-light transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            กลับหน้าสรุป
          </Link>
          <RefreshButton />
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <h1 className="text-2xl font-bold text-foreground">
            รายงานตรวจสอบ — แถวที่ {rowIndex}
          </h1>
          <EditableName rowIndex={rowIndex} initialName={teamName} />
        </div>
      </div>

      <div className="space-y-6">
        {task && (
          <SheetSection
            title="ตรวจสอบสภาพงาน"
            icon="ClipboardCheck"
            fields={taskFields}
            imageFields={[{ label: "รูปงาน 6 มุม", urls: task.images }]}
          />
        )}

        {tool && (
          <SheetSection
            title="ตรวจสอบเครื่องมือ"
            icon="Wrench"
            fields={toolFields}
            imageFields={[
              { label: "รูปจุดวางเครื่องมือ", urls: tool.image },
            ]}
            notes={
              tool.returnStatus === "ไม่ครบ" && tool.missingItems
                ? [{ label: "ขาดอะไรบ้าง", value: tool.missingItems }]
                : undefined
            }
          />
        )}

        {vehicle && (
          <SheetSection
            title="ตรวจสอบสภาพรถ"
            icon="Truck"
            fields={vehicleFields}
            imageFields={[]}
          />
        )}

        {!task && !tool && !vehicle && (
          <div className="text-center py-16 text-text-muted">
            ไม่พบข้อมูลสำหรับแถวที่ {rowIndex}
          </div>
        )}
      </div>
    </main>
  );
}
