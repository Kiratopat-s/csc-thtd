import { google, drive_v3 } from "googleapis";

const SPREADSHEET_ID = "1Mlmhp4kTYAXkIX2QkrDKXMzyosqIaSPuDJSkWHWn9sI";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.readonly",
  ],
});

function getSheetsClient() {
  return google.sheets({ version: "v4", auth });
}

export function getDriveClient(): drive_v3.Drive {
  return google.drive({ version: "v3", auth });
}

export interface SheetUser {
  username: string;
  password: string;
  role: "judge" | "staff";
}

export interface LogEntry {
  timestamp: string;
  username: string;
  role: string;
  action: "LOGIN" | "LOGOUT";
  ipAddress: string;
  userAgent: string;
}

export async function getUsers(): Promise<SheetUser[]> {
  const sheets = getSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "USER!A:C",
  });

  const rows = res.data.values;
  if (!rows || rows.length < 2) return [];

  return rows.slice(1).map((row) => ({
    username: row[0]?.trim() ?? "",
    password: row[1]?.trim() ?? "",
    role: row[2]?.trim().toLowerCase() as "judge" | "staff",
  }));
}

export async function appendLog(entry: LogEntry): Promise<void> {
  const sheets = getSheetsClient();
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: "WEBAPP_LOGS!A:F",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          entry.timestamp,
          entry.username,
          entry.role,
          entry.action,
          entry.ipAddress,
          entry.userAgent,
        ],
      ],
    },
  });
}

// ── Inspection sheet types ──

export interface TaskRow {
  timestamp: string;
  images: string; // comma-separated Drive URLs
  connectionStatus: string; // แน่น | ไม่แน่น
}

export interface ToolRow {
  timestamp: string;
  image: string;
  storageStatus: string; // เรียบร้อย | ไม่เรียบร้อย | ของหาย
}

export interface VehicleRow {
  timestamp: string;
  boomTopImage: string;
  boomTopStatus: string; // สนิท | ไม่สนิท
  boomBottomImage: string;
  boomBottomStatus: string; // สนิท | ไม่สนิท
  basketImage: string;
  basketStatus: string; // สนิท | ไม่สนิท
  lockImage: string;
  lockStatus: string; // Lock | ลืม Lock
}

// ── Inspection sheet readers ──

export async function getTaskRows(): Promise<TaskRow[]> {
  const sheets = getSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "TASK!A:C",
  });
  const rows = res.data.values;
  if (!rows || rows.length < 2) return [];
  return rows.slice(1).map((row) => ({
    timestamp: row[0]?.trim() ?? "",
    images: row[1]?.trim() ?? "",
    connectionStatus: row[2]?.trim() ?? "",
  }));
}

export async function getToolRows(): Promise<ToolRow[]> {
  const sheets = getSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "TOOL!A:C",
  });
  const rows = res.data.values;
  if (!rows || rows.length < 2) return [];
  return rows.slice(1).map((row) => ({
    timestamp: row[0]?.trim() ?? "",
    image: row[1]?.trim() ?? "",
    storageStatus: row[2]?.trim() ?? "",
  }));
}

export async function getVehicleRows(): Promise<VehicleRow[]> {
  const sheets = getSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "VEHICLE!A:I",
  });
  const rows = res.data.values;
  if (!rows || rows.length < 2) return [];
  return rows.slice(1).map((row) => ({
    timestamp: row[0]?.trim() ?? "",
    boomTopImage: row[1]?.trim() ?? "",
    boomTopStatus: row[2]?.trim() ?? "",
    boomBottomImage: row[3]?.trim() ?? "",
    boomBottomStatus: row[4]?.trim() ?? "",
    basketImage: row[5]?.trim() ?? "",
    basketStatus: row[6]?.trim() ?? "",
    lockImage: row[7]?.trim() ?? "",
    lockStatus: row[8]?.trim() ?? "",
  }));
}

// ── TEAM sheet (judge-managed) ──

export async function getTeamNames(): Promise<Map<number, string>> {
  const sheets = getSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "TEAM!A:B",
  });
  const rows = res.data.values;
  const map = new Map<number, string>();
  if (!rows || rows.length < 2) return map;
  for (const row of rows.slice(1)) {
    const idx = parseInt(row[0], 10);
    if (!isNaN(idx) && row[1]) map.set(idx, row[1].trim());
  }
  return map;
}

export async function updateTeamName(
  rowIndex: number,
  name: string,
): Promise<void> {
  const sheets = getSheetsClient();
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "TEAM!A:B",
  });
  const rows = res.data.values ?? [];
  let targetRow = -1;
  for (let i = 1; i < rows.length; i++) {
    if (parseInt(rows[i][0], 10) === rowIndex) {
      targetRow = i + 1; // 1-indexed sheet row
      break;
    }
  }
  if (targetRow > 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `TEAM!B${targetRow}`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [[name]] },
    });
  } else {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "TEAM!A:B",
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [[rowIndex, name]] },
    });
  }
}
