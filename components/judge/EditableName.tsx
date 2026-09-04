"use client";

import { useState, useRef, useEffect } from "react";
import { Pencil, Check, X } from "lucide-react";

interface EditableNameProps {
  rowIndex: number;
  initialName: string | null;
}

export default function EditableName({
  rowIndex,
  initialName,
}: EditableNameProps) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(initialName ?? "");
  const [saving, setSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  async function save() {
    setEditing(false);
    const trimmed = name.trim();
    if (trimmed === (initialName ?? "")) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/sheets/${rowIndex}/name`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmed }),
      });
      if (!res.ok) setName(initialName ?? "");
    } catch {
      setName(initialName ?? "");
    } finally {
      setSaving(false);
    }
  }

  if (editing) {
    return (
      <div className="flex items-center gap-1">
        <input
          ref={inputRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") save();
            if (e.key === "Escape") {
              setName(initialName ?? "");
              setEditing(false);
            }
          }}
          onBlur={save}
          className="bg-surface-elevated border border-border-subtle rounded px-2 py-1 text-sm text-foreground w-32 outline-none focus:border-purple-medium"
          placeholder="ชื่อทีม"
        />
        <button
          onClick={save}
          className="p-1 text-green-600 dark:text-green-400 hover:text-green-500 dark:hover:text-green-300"
        >
          <Check className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => {
            setName(initialName ?? "");
            setEditing(false);
          }}
          className="p-1 text-text-muted hover:text-foreground"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setEditing(true)}
      disabled={saving}
      className="group inline-flex items-center gap-1.5 text-sm text-foreground hover:text-purple-light transition-colors disabled:opacity-50"
    >
      <span>{name || "—"}</span>
      <Pencil className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-text-muted" />
    </button>
  );
}
