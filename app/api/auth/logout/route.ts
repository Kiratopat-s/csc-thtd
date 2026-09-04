import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken, COOKIE_NAME } from "@/lib/auth";
import { appendLog } from "@/lib/google-sheets";

export async function POST(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;

  let username = "unknown";
  let role = "unknown";
  if (token) {
    const payload = await verifyToken(token);
    if (payload) {
      username = payload.username;
      role = payload.role;
    }
  }

  const ip =
    request.headers.get("x-forwarded-for") ??
    request.headers.get("x-real-ip") ??
    "unknown";
  const ua = request.headers.get("user-agent") ?? "unknown";
  appendLog({
    timestamp: new Date().toISOString(),
    username,
    role,
    action: "LOGOUT",
    ipAddress: ip,
    userAgent: ua,
  }).catch((err) => console.error("Failed to log LOGOUT:", err));

  const response = NextResponse.json({ success: true, redirect: "/login" });
  response.cookies.set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return response;
}
