"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/hooks";
import { resolveTheme } from "@/themes";
import { SidebarStyle } from "./Sidebar.style";
import Logo from "@/components/Logo";
import { 
  FiGrid, 
  FiShield, 
  FiLayout, 
  FiUsers, 
  FiSettings, 
  FiLogOut 
} from "react-icons/fi";

export default function Sidebar() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const currentTheme = resolveTheme(theme);

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/');
  };

  return (
    <SidebarStyle theme={currentTheme}>
      <div className="logo-container">
        <Logo />
      </div>

      <div className="nav-sections">
        <div className="nav-section">
          <span className="section-title">Operações</span>
          <Link href="/dashboard/visao-geral" className={`nav-item ${isActive('/dashboard/visao-geral') ? 'active' : ''}`}>
            <div className="item-content">
              <FiGrid />
              <span>Visão geral</span>
            </div>
          </Link>
          <Link href="/dashboard/vulnerabilidades" className={`nav-item ${isActive('/dashboard/vulnerabilidades') ? 'active' : ''}`}>
            <div className="item-content">
              <FiShield />
              <span>Vulnerabilidades</span>
            </div>
            <span className="badge">23</span>
          </Link>
          <Link href="/dashboard/kanban" className={`nav-item ${isActive('/dashboard/kanban') ? 'active' : ''}`}>
            <div className="item-content">
              <FiLayout />
              <span>Kanban</span>
            </div>
          </Link>
          <Link href="/dashboard/equipe" className={`nav-item ${isActive('/dashboard/equipe') ? 'active' : ''}`}>
            <div className="item-content">
              <FiUsers />
              <span>Equipe</span>
            </div>
          </Link>
        </div>

        <div className="nav-section">
          <span className="section-title">Sistema</span>
          <Link href="/dashboard/configuracoes" className={`nav-item ${isActive('/dashboard/configuracoes') ? 'active' : ''}`}>
            <div className="item-content">
              <FiSettings />
              <span>Configurações</span>
            </div>
          </Link>
          <button 
            type="button" 
            onClick={async () => {
              const { logout } = await import("@/api");
              await logout();
              window.location.href = "/";
            }} 
            className="nav-item"
            style={{ background: "transparent", border: "none", width: "100%", cursor: "pointer", textAlign: "left", fontFamily: "inherit" }}
          >
            <div className="item-content">
              <FiLogOut />
              <span>Sair da conta</span>
            </div>
          </button>
        </div>
      </div>

      <div className="scan-status">
        <div className="status-header">
          <div className="indicator"></div>
          <span>Última varredura</span>
        </div>
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
        <div className="status-text">
          428 de 510 vulnerabilidades triadas
        </div>
      </div>
    </SidebarStyle>
  );
}
