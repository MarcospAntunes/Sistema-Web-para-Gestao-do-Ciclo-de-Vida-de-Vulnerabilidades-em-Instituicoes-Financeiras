"use server";

export default async function register(name: string, email: string, password: string) {
  const API_URL = process.env.API_URL || "http://localhost:8080";

  try {
    const req = await fetch(`${API_URL}/api/User/create-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await req.json();

    if (!req.ok) {
      const errorMessage = data?.message || data?.title || "Erro ao criar conta";
      throw new Error(errorMessage);
    }

    return { success: true, data };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Erro ao criar conta";
    return { success: false, error: message };
  }
}