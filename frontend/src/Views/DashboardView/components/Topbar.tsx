"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "@/hooks";
import { resolveTheme } from "@/themes";
import { TopbarStyle } from "./Topbar.style";
import ChangeThemeButton from "@/components/ChangeThemeButton";
import { getLoggedUser } from "@/api/users";
import { FiSidebar, FiChevronRight, FiBell } from "react-icons/fi";

const roleLabels: Record<number, string> = {
  1: "Administrador",
  2: "Analista de segurança",
  3: "Visualizador",
};

export default function Topbar() {
  const { theme } = useTheme();
  const currentTheme = resolveTheme(theme);
  const pathname = usePathname();

  const [user, setUser] = useState<{ name: string; roleId: number } | null>(
    null,
  );

  useEffect(() => {
    let isMounted = true;
    getLoggedUser().then((res) => {
      if (isMounted && res.success && res.data) {
        setUser({ name: res.data.name, roleId: res.data.roleId });
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const pathParts = pathname.split("/").filter(Boolean);
  const currentPath = pathParts[pathParts.length - 1];

  const formatPath = (str: string) => {
    const formatted = str.replace(/-/g, " ");
    if (str === "visao-geral") return "Visão geral";
    if (str === "configuracoes") return "Configurações";
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  const title = currentPath ? formatPath(currentPath) : "Dashboard";

  const initials = (user?.name ?? "")
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <TopbarStyle theme={currentTheme}>
      <div className="topbar-left">
        <button className="sidebar-toggle">
          <FiSidebar />
        </button>
        <div className="breadcrumbs">
          <span>Operações</span>
          <FiChevronRight className="separator" />
          <span className="current">{title}</span>
        </div>
      </div>

      <div className="topbar-right">
        <ChangeThemeButton />

        <button className="icon-button">
          <FiBell />
          <div className="notification-dot"></div>
        </button>

        <div className="user-profile">
          <div className="avatar">{initials || "…"}</div>
          <div className="user-info">
            <span className="user-name">{user?.name ?? "Carregando..."}</span>
            <span className="user-role">
              {user ? (roleLabels[user.roleId] ?? "Sem perfil") : ""}
            </span>
          </div>
        </div>
      </div>
    </TopbarStyle>
  );
}
