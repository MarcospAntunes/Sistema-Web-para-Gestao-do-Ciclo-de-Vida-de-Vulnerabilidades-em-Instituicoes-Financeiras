"use client";

import { usePathname } from "next/navigation";
import { useTheme } from "@/hooks";
import { resolveTheme } from "@/themes";
import { TopbarStyle } from "./Topbar.style";
import ChangeThemeButton from "@/components/ChangeThemeButton";
import { FiSidebar, FiChevronRight, FiBell } from "react-icons/fi";

export default function Topbar() {
  const { theme } = useTheme();
  const currentTheme = resolveTheme(theme);
  const pathname = usePathname();

  // Simple breadcrumb logic based on pathname
  const pathParts = pathname.split('/').filter(Boolean);
  const currentPath = pathParts[pathParts.length - 1];
  
  // Format string from "visao-geral" to "Visão geral"
  const formatPath = (str: string) => {
    const formatted = str.replace(/-/g, ' ');
    if (str === 'visao-geral') return 'Visão geral';
    if (str === 'configuracoes') return 'Configurações';
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  const title = currentPath ? formatPath(currentPath) : 'Dashboard';

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
          <div className="avatar">MA</div>
          <div className="user-info">
            <span className="user-name">Marcos Antunes</span>
            <span className="user-role">Analista de segurança</span>
          </div>
        </div>
      </div>
    </TopbarStyle>
  );
}
