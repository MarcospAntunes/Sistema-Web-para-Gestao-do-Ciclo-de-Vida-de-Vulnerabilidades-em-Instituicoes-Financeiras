import styled from "styled-components";
import { themeType } from "@/themes/theme.type";

export const SidebarStyle = styled.aside<themeType>`
  width: 260px;
  height: 100%;
  min-height: 0;
  background-color: ${({ theme }) => theme.sidebar};
  border-right: 1px solid ${({ theme }) => theme["sidebar-border"]};
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;
  transition:
    width 0.25s ease,
    transform 0.25s ease;
  z-index: 100;

  .logo-container {
    height: 72px;
    min-height: 72px;
    display: flex;
    align-items: center;
    padding: 0 24px;
    border-bottom: 1px solid ${({ theme }) => theme["sidebar-border"]};
    overflow: hidden;

    > div {
      transform: scale(0.85);
      transform-origin: left center;
      flex-shrink: 0;
    }
  }

  .nav-sections {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 24px 16px;
    display: flex;
    flex-direction: column;
    gap: 32px;
    scrollbar-width: thin;
  }

  .nav-section {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .section-title {
      font-size: 11px;
      font-weight: 700;
      color: ${({ theme }) => theme["muted-foreground"]};
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding-left: 12px;
      margin-bottom: 4px;
      white-space: nowrap;
    }
  }

  .nav-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    width: 100%;
    min-width: 0;
    box-sizing: border-box;
    padding: 10px 12px;
    border: none;
    border-radius: 8px;
    color: ${({ theme }) => theme["muted-foreground"]};
    background: transparent;
    text-decoration: none;
    font: inherit;
    text-align: left;
    transition:
      background-color 0.2s ease,
      color 0.2s ease;
    cursor: pointer;

    .item-content {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
      font-size: 14px;
      font-weight: 500;

      svg {
        width: 18px;
        height: 18px;
        min-width: 18px;
        flex-shrink: 0;
      }

      span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    &:hover {
      background-color: ${({ theme }) => theme["sidebar-accent"]};
      color: ${({ theme }) => theme["sidebar-accent-foreground"]};
    }

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.primary};
      outline-offset: -2px;
    }

    &.active {
      background-color: ${({ theme }) => theme["sidebar-accent"]};
      color: ${({ theme }) => theme["sidebar-accent-foreground"]};
      position: relative;

      &::before {
        content: "";
        position: absolute;
        left: -16px;
        top: 50%;
        transform: translateY(-50%);
        height: 24px;
        width: 4px;
        background-color: ${({ theme }) => theme.primary};
        border-radius: 0 4px 4px 0;
      }
    }
  }

  .badge {
    flex-shrink: 0;
    background-color: ${({ theme }) => theme["critical-soft"]};
    color: ${({ theme }) => theme.critical};
    font-size: 11px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 12px;
  }

  .scan-status {
    flex-shrink: 0;
    padding: 24px 20px;
    border-top: 1px solid ${({ theme }) => theme["sidebar-border"]};

    .status-header {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      font-weight: 600;
      color: ${({ theme }) => theme.foreground};
      margin-bottom: 8px;

      .indicator {
        width: 8px;
        height: 8px;
        min-width: 8px;
        border-radius: 50%;
        background-color: ${({ theme }) => theme.success};
      }
    }

    .progress-bar {
      height: 4px;
      background-color: ${({ theme }) => theme.muted};
      border-radius: 2px;
      margin-bottom: 8px;
      overflow: hidden;

      .progress-fill {
        height: 100%;
        width: 84%;
        background-color: ${({ theme }) => theme.primary};
      }
    }

    .status-text {
      font-size: 11px;
      line-height: 1.5;
      color: ${({ theme }) => theme["muted-foreground"]};
    }
  }

  @media (min-width: 769px) and (max-width: 1024px) {
    width: 220px;

    .logo-container {
      padding: 0 16px;
    }

    .nav-sections {
      padding: 20px 12px;
      gap: 24px;
    }

    .scan-status {
      padding: 20px 14px;
    }
  }

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;

    width: min(280px, 85vw);
    height: 100vh;
    height: 100dvh;

    z-index: 100;

    transform: translateX(-100%);
    opacity: 0;
    pointer-events: none;

    transition:
      transform 0.4s ease-in-out,
      opacity 0.3s ease-in-out;

    &.open {
      transform: translateX(0);
      opacity: 1;
      pointer-events: auto;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    @media (max-width: 768px) {
      &,
      &.open {
        transition: none;
      }
    }
  }
`;
