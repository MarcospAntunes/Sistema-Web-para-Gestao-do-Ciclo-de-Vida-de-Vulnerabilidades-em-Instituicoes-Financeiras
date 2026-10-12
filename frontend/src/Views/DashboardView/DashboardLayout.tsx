"use client";

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

  return (
    <DashboardLayoutStyle theme={currentTheme}>
      <Sidebar />
      <div className="dashboard-main">
        <Topbar />
        <div className="dashboard-content">{children}</div>
      </div>
    </DashboardLayoutStyle>
  );
}
