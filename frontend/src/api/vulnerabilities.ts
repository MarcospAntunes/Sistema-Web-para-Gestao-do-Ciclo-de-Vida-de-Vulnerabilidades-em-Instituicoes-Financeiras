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

type VulnerabilityPayload = {
  title: string;
  description: string;
  cve: string;
  cveScore: number;
  cvssVersion?: string;
  cvssVector?: string;
  status: number;
  assignedUserId: number;
  severity?: number;
  priority?: number;
  discoveredAt?: string;
  dueDate?: string;
  asset?: string;
  assetEnvironment?: string;
  assetCriticality?: number;
  exposure?: number;
};

export async function getVulnerabilities(params?: {
  status?: number;
  severity?: number;
  search?: string;
}) {
  try {
    const headers = await getAuthHeaders();
    const searchParams = new URLSearchParams();

    if (params?.status !== undefined)
      searchParams.append("status", params.status.toString());
    if (params?.severity !== undefined)
      searchParams.append("severity", params.severity.toString());
    if (params?.search) searchParams.append("search", params.search);

    const query = searchParams.toString() ? `?${searchParams.toString()}` : "";
    const res = await fetch(`${API_URL}/api/Vulnerability${query}`, {
      headers,
      cache: "no-store",
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      throw new Error(err?.message || "Erro ao buscar vulnerabilidades");
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

export async function getVulnerabilityStats() {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/api/Vulnerability/stats`, {
      headers,
      cache: "no-store",
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      throw new Error(err?.message || "Erro ao buscar estatísticas");
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

export async function getVulnerability(id: number) {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/api/Vulnerability/${id}`, {
      headers,
      cache: "no-store",
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      throw new Error(err?.message || "Erro ao buscar vulnerabilidade");
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

export async function classifyVulnerability(payload: {
  cveScore: number;
  assetCriticality?: number;
  exposure?: number;
}) {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/api/Vulnerability/classify`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const json = await res.json().catch(() => null);
    if (!res.ok) {
      throw new Error(json?.message || "Erro ao calcular a classificação");
    }

    return { success: true, data: json?.data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

export async function createVulnerability(payload: VulnerabilityPayload) {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/api/Vulnerability`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const json = await res.json().catch(() => null);
    if (!res.ok) {
      throw new Error(json?.message || "Erro ao cadastrar vulnerabilidade");
    }

    return { success: true, data: json?.data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

export async function updateVulnerability(
  id: number,
  payload: VulnerabilityPayload,
) {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/api/Vulnerability/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(payload),
    });

    const json = await res.json().catch(() => null);
    if (!res.ok) {
      throw new Error(json?.message || "Erro ao atualizar vulnerabilidade");
    }

    return { success: true, data: json?.data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

export async function updateVulnerabilityStatus(id: number, status: number) {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/api/Vulnerability/${id}/status`, {
      method: "PUT",
      headers,
      body: JSON.stringify({ status }),
    });

    const json = await res.json().catch(() => null);
    if (!res.ok) {
      throw new Error(json?.message || "Erro ao atualizar status");
    }

    return { success: true, data: json?.data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

export async function deleteVulnerability(id: number) {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/api/Vulnerability/${id}`, {
      method: "DELETE",
      headers,
    });

    const json = await res.json().catch(() => null);
    if (!res.ok) {
      throw new Error(json?.message || "Erro ao excluir vulnerabilidade");
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

export async function getVulnerabilityHistory(id: number) {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/api/Vulnerability/${id}/history`, {
      headers,
      cache: "no-store",
    });

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      throw new Error(err?.message || "Erro ao buscar histórico");
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

export async function addVulnerabilityHistory(
  id: number,
  payload: { action: string; comment?: string },
) {
  try {
    const headers = await getAuthHeaders();
    const res = await fetch(`${API_URL}/api/Vulnerability/${id}/history`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    const json = await res.json().catch(() => null);
    if (!res.ok) {
      throw new Error(json?.message || "Erro ao adicionar histórico");
    }

    return { success: true, data: json?.data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

export async function importVulnerabilitiesCsv(formData: FormData) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("access")?.value;

    const res = await fetch(`${API_URL}/api/Vulnerability/import-csv`, {
      method: "POST",
      headers: {
        ...(token ? { Cookie: `access=${token}` } : {}),
      },
      body: formData,
    });

    const json = await res.json().catch(() => null);
    if (!res.ok) {
      throw new Error(json?.message || "Erro ao processar arquivo CSV");
    }

    return { success: true, data: json?.data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}
