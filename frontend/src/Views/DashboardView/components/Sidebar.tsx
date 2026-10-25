"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiGrid,
  FiShield,
  FiLayout,
  FiUsers,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import { useTheme } from "@/hooks";
import { resolveTheme } from "@/themes";
import { SidebarStyle } from "./Sidebar.style";
import Logo from "@/components/Logo";

type SidebarProps = {
  isOpen?: boolean;
  onClose?: () => void;
};

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { theme } = useTheme();
  const currentTheme = resolveTheme(theme);

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + "/");

  useEffect(() => {
    onClose?.();
  }, [pathname]);

  const handleLogout = async () => {
    const { logout } = await import("@/api");
    await logout();
    window.location.href = "/";
  };

  return (
    <>
      <SidebarStyle
        theme={currentTheme}
        className={isOpen ? "open" : ""}
        aria-label="Menu principal"
        aria-hidden={
          !isOpen && typeof window !== "undefined" && window.innerWidth <= 768
        }
      >
        <div className="logo-container">
          <Logo />
        </div>

        <div className="nav-sections">
          <div className="nav-section">
            <span className="section-title">Operações</span>

            <Link
              href="/dashboard/visao-geral"
              className={`nav-item ${
                isActive("/dashboard/visao-geral") ? "active" : ""
              }`}
            >
              <div className="item-content">
                <FiGrid />
                <span>Visão geral</span>
              </div>
            </Link>

            <Link
              href="/dashboard/vulnerabilidades"
              className={`nav-item ${
                isActive("/dashboard/vulnerabilidades") ? "active" : ""
              }`}
            >
              <div className="item-content">
                <FiShield />
                <span>Vulnerabilidades</span>
              </div>
              <span className="badge">23</span>
            </Link>

            <Link
              href="/dashboard/kanban"
              className={`nav-item ${
                isActive("/dashboard/kanban") ? "active" : ""
              }`}
            >
              <div className="item-content">
                <FiLayout />
                <span>Kanban</span>
              </div>
            </Link>

            <Link
              href="/dashboard/equipe"
              className={`nav-item ${
                isActive("/dashboard/equipe") ? "active" : ""
              }`}
            >
              <div className="item-content">
                <FiUsers />
                <span>Equipe</span>
              </div>
            </Link>
          </div>

          <div className="nav-section">
            <span className="section-title">Sistema</span>

            <Link
              href="/dashboard/configuracoes"
              className={`nav-item ${
                isActive("/dashboard/configuracoes") ? "active" : ""
              }`}
            >
              <div className="item-content">
                <FiSettings />
                <span>Configurações</span>
              </div>
            </Link>

            <button type="button" className="nav-item" onClick={handleLogout}>
              <div className="item-content">
                <FiLogOut />
                <span>Sair da conta</span>
              </div>
            </button>
          </div>
        </div>

        <div className="scan-status">
          <div className="status-header">
            <div className="indicator" />
            <span>Última varredura</span>
          </div>

          <div className="progress-bar">
            <div className="progress-fill" />
          </div>

          <div className="status-text">428 de 510 vulnerabilidades triadas</div>
        </div>
      </SidebarStyle>
    </>
  );
}
