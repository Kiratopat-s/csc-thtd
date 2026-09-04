"use client";

import Link from "next/link";
import { Eye } from "lucide-react";
import StatusBadge from "./StatusBadge";
import EditableName from "./EditableName";

interface Record {
  rowIndex: number;
  teamName: string | null;
  task: { submitted: boolean; timestamp: string | null };
  tool: { submitted: boolean; timestamp: string | null };
  vehicle: { submitted: boolean; timestamp: string | null };
}

interface DashboardTableProps {
  records: Record[];
}

export default function DashboardTable({ records }: DashboardTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border-subtle">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-surface-elevated text-text-muted text-xs uppercase tracking-wide">
            <th className="px-4 py-3 text-left font-medium">#</th>
            <th className="px-4 py-3 text-left font-medium">ชื่อทีม</th>
            <th className="px-4 py-3 text-center font-medium">ตรวจสอบรถ</th>
            <th className="px-4 py-3 text-center font-medium">ตรวจสอบงาน</th>
            <th className="px-4 py-3 text-center font-medium">
              ตรวจสอบเครื่องมือ
            </th>
            <th className="px-4 py-3 text-center font-medium">
              ดูรายละเอียด
            </th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, i) => (
            <tr
              key={r.rowIndex}
              className={`border-t border-border-subtle transition-colors hover:bg-surface-elevated/50 ${
                i % 2 === 0 ? "bg-surface" : "bg-surface/50"
              }`}
            >
              <td className="px-4 py-3 text-text-muted font-mono text-xs">
                {r.rowIndex}
              </td>
              <td className="px-4 py-3">
                <EditableName
                  rowIndex={r.rowIndex}
                  initialName={r.teamName}
                />
              </td>
              <td className="px-4 py-3 text-center">
                <div className="flex justify-center">
                  <StatusBadge submitted={r.vehicle.submitted} />
                </div>
              </td>
              <td className="px-4 py-3 text-center">
                <div className="flex justify-center">
                  <StatusBadge submitted={r.task.submitted} />
                </div>
              </td>
              <td className="px-4 py-3 text-center">
                <div className="flex justify-center">
                  <StatusBadge submitted={r.tool.submitted} />
                </div>
              </td>
              <td className="px-4 py-3 text-center">
                <Link
                  href={`/judge/${r.rowIndex}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-purple-medium/20 text-purple-light hover:bg-purple-medium/30 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  ดูรายละเอียด
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
