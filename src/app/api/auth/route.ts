import { NextResponse } from "next/server";
import { verifyPassword, setAdminSession, clearAdminSession, isAdminAuthenticated } from "@/lib/auth";

export async function GET() {
  const isAuth = isAdminAuthenticated();
  return NextResponse.json({ authenticated: isAuth });
}

export async function POST(req: Request) {
  try {
    const { password } = await req.json();
    if (!password) {
      return NextResponse.json({ error: "Password required" }, { status: 400 });
    }

    if (verifyPassword(password)) {
      setAdminSession();
      return NextResponse.json({ success: true, message: "Logged in successfully" });
    }

    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  } catch (err) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}

export async function DELETE() {
  clearAdminSession();
  return NextResponse.json({ success: true, message: "Logged out" });
}
