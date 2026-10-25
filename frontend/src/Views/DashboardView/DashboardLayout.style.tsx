import styled from "styled-components";
import { themeType } from "@/themes/theme.type";

export const DashboardLayoutStyle = styled.div<themeType>`
  display: flex;
  height: 100vh;
  height: 100dvh;
  width: 100%;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.foreground};
  overflow: hidden;

  .dashboard-main {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
  }

  .dashboard-content {
    flex: 1;
    min-width: 0;
    min-height: 0;
    padding: 24px;
    overflow-y: auto;
    overflow-x: hidden;
    overscroll-behavior: contain;
  }

  .sidebar-overlay {
    display: none;
  }

  .mobile-header {
    display: none;
  }

  .mobile-menu-button {
    display: none;
  }

  @media (max-width: 768px) {
    .sidebar-overlay {
      display: block;
      position: fixed;
      inset: 0;
      z-index: 99;
      width: 100%;
      height: 100%;
      padding: 0;
      border: none;
      background: rgba(0, 0, 0, 0.45);
      cursor: pointer;

      opacity: 0;
      animation: overlayFadeIn 0.3s ease forwards;
    }

    .mobile-header {
      display: flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;
      min-height: 56px;
      padding: 0 16px;
      background: ${({ theme }) => theme.sidebar};
      border-bottom: 1px solid ${({ theme }) => theme["sidebar-border"]};
    }

    .mobile-menu-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      flex-shrink: 0;
      border: none;
      border-radius: 8px;
      background: transparent;
      color: ${({ theme }) => theme.foreground};
      cursor: pointer;
    }

    .mobile-menu-button:hover {
      background: ${({ theme }) => theme["sidebar-accent"]};
    }

    .mobile-menu-button:focus-visible {
      outline: 2px solid ${({ theme }) => theme.primary};
      outline-offset: 2px;
    }

    .mobile-header-title {
      font-size: 16px;
      font-weight: 600;
      color: ${({ theme }) => theme.foreground};
    }

    .dashboard-content {
      padding: 16px;
    }
  }

  @keyframes overlayFadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .sidebar-overlay {
      animation: none;
      opacity: 1;
    }

    .mobile-menu-button {
      transition: none;
    }
  }
`;
