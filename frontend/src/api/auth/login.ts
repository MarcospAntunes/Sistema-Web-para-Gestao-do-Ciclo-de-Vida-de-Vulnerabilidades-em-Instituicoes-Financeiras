"use server";

import { cookies } from "next/headers";

export default async function login(email: string, password: string) {
  const API_URL = process.env.API_URL || "http://localhost:8080";
  const TOKEN_MAX_AGE_SECONDS = 60 * 120;

  try {
    const req = await fetch(`${API_URL}/api/User/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if(!req.ok) throw new Error("Credenciais inválidas");

    const setCookieHeader = req.headers.get("set-cookie");

    if(setCookieHeader) {
      const tokenMatch = setCookieHeader.match(/access=([^;]+)/);
      const tokenValue = tokenMatch ? tokenMatch[1] : null;

      if(tokenValue) {
        const cookieStore = await cookies();
        cookieStore.set("access", tokenValue, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: TOKEN_MAX_AGE_SECONDS
        });
      }
    }

    const data = await req.json();
    return { success: true, data };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Erro ao realizar login";
    return { success: false, error: message };
  }
}

