"use server";

export default async function register(name: string, email: string, password: string) {
  const API_URL = process.env.API_URL || "http://127.0.0.1:8080";
  const url = `${API_URL}/api/User/create-user`;

  try {
    const req = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const text = await req.text();
    console.log("Backend response status:", req.status, "for URL:", url);
    console.log("Backend response text:", text);
    
    const data = text ? JSON.parse(text) : {};

    if (!req.ok) {
      const errorMessage = data?.message || data?.title || "Erro ao criar conta";
      throw new Error(errorMessage);
    }

    return { success: true, data };
  } catch (e) {
    console.error("Register Error:", e);
    const message = e instanceof Error ? e.message : "Erro ao criar conta";
    return { success: false, error: message };
  }
}