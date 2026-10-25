"use client";

import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import { useTheme } from "@/hooks";
import { resolveTheme } from "@/themes";
import { DashboardLayoutStyle } from "./DashboardLayout.style";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { theme } = useTheme();
  const currentTheme = resolveTheme(theme);

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <DashboardLayoutStyle theme={currentTheme}>
      <Sidebar isOpen={menuOpen} onClose={closeMenu} />

      {menuOpen && (
        <button
          type="button"
          className="sidebar-overlay"
          aria-label="Fechar menu"
          onClick={closeMenu}
        />
      )}

      <div className="dashboard-main">
        <header className="mobile-header">
          <button
            type="button"
            className="mobile-menu-button"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>

          <span className="mobile-header-title">Dashboard</span>
        </header>

        <Topbar />

        <div className="dashboard-content">{children}</div>
      </div>
    </DashboardLayoutStyle>
  );
}

