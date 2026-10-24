"use server";

import { cookies } from "next/headers";

export default async function logout() {
  const API_URL = process.env.API_URL || "http://127.0.0.1:8080";

  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access")?.value;

    if (token) {
      await fetch(`${API_URL}/api/User/logout`, {
        method: "POST",
        headers: {
          Cookie: `access=${token}`,
        },
      }).catch(() => null);
    }

    cookieStore.delete("access");
    return { success: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Erro ao realizar logout";
    return { success: false, error: message };
  }
}
