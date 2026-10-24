"use server";

import { cookies } from "next/headers";

const API_URL = process.env.API_URL || "http://127.0.0.1:8080";

async function getAuthHeaders(): Promise<HeadersInit> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access")?.value;
  return {
    "Content-Type": "application/json",
    ...(token ? { Cookie: `access=${token}` } : {}),
  };
}

export async function getUsers() {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/api/User/get-all`, {
      headers,
      cache: "no-store",
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      throw new Error(err?.message || "Erro ao buscar usuários");
    }

    const json = await res.json();
    return { success: true, data: json.data || [] };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
      data: [],
    };
  }
}

export async function getLoggedUser() {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/api/User/logged-user`, {
      headers,
      cache: "no-store",
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      throw new Error(err?.message || "Erro ao obter usuário logado");
    }

    const json = await res.json();
    return { success: true, data: json.data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

export async function deleteUser(id: number) {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/api/User/${id}`, {
      method: "DELETE",
      headers,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      throw new Error(err?.message || "Erro ao excluir usuário");
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}
