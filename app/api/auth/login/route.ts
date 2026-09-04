import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUsers, appendLog } from "@/lib/google-sheets";
import { signToken, COOKIE_NAME } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "กรุณากรอกชื่อผู้ใช้และรหัสผ่าน" },
        { status: 400 }
      );
    }

    const users = await getUsers();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) {
      return NextResponse.json(
        { error: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" },
        { status: 401 }
      );
    }

    const token = await signToken({ username: user.username, role: user.role });
    const redirectUrl = user.role === "staff" ? "/staff" : "/judge";
    const response = NextResponse.json({ success: true, redirect: redirectUrl });

    response.cookies.set({
      name: COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8,
    });

    const ip =
      request.headers.get("x-forwarded-for") ??
      request.headers.get("x-real-ip") ??
      "unknown";
    const ua = request.headers.get("user-agent") ?? "unknown";
    appendLog({
      timestamp: new Date().toISOString(),
      username: user.username,
      role: user.role,
      action: "LOGIN",
      ipAddress: ip,
      userAgent: ua,
    }).catch((err) => console.error("Failed to log LOGIN:", err));

    return response;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" },
      { status: 500 }
    );
  }
}
