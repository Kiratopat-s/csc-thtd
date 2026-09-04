import { google } from "googleapis";

const SPREADSHEET_ID = "1Mlmhp4kTYAXkIX2QkrDKXMzyosqIaSPuDJSkWHWn9sI";

function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return google.sheets({ version: "v4", auth });
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
