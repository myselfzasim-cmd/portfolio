import { cookies } from "next/headers";

const ADMIN_PASS = process.env.ADMIN_PASSWORD || "zasim@pran2026";
const COOKIE_NAME = "zasim_admin_token";
const TOKEN_VALUE = "zasim_authenticated_session_secret";

export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASS;
}

export function setAdminSession() {
  cookies().set(COOKIE_NAME, TOKEN_VALUE, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

export function clearAdminSession() {
  cookies().delete(COOKIE_NAME);
}

export function isAdminAuthenticated(): boolean {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME);
  return token?.value === TOKEN_VALUE;
}
