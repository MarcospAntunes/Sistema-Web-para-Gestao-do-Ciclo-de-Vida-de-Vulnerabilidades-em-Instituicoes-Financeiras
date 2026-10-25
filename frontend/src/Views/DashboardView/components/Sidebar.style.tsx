import styled from "styled-components";
import { themeType } from "@/themes/theme.type";

export const SidebarStyle = styled.aside<themeType>`
  width: 260px;
  height: 100%;
  background-color: ${({ theme }) => theme.sidebar};
  border-right: 1px solid ${({ theme }) => theme["sidebar-border"]};
  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  .logo-container {
    height: 72px;
    display: flex;
    align-items: center;
    padding: 0 24px;
    border-bottom: 1px solid ${({ theme }) => theme["sidebar-border"]};

    > div {
      transform: scale(0.85);
      transform-origin: left center;
    }
  }

  .nav-sections {
    flex: 1;
    overflow-y: auto;
    padding: 24px 16px;
    display: flex;
    flex-direction: column;
    gap: 32px;
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
    }
  }

  .nav-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 12px;
    border-radius: 8px;
    color: ${({ theme }) => theme["muted-foreground"]};
    text-decoration: none;
    transition: all 0.2s ease;
    cursor: pointer;

    .item-content {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 14px;
      font-weight: 500;

      svg {
        font-size: 18px;
      }
    }

    &:hover {
      background-color: ${({ theme }) => theme["sidebar-accent"]};
      color: ${({ theme }) => theme["sidebar-accent-foreground"]};
    }

    &.active {
      background-color: ${({ theme }) => theme["sidebar-accent"]};
      color: ${({ theme }) => theme["sidebar-accent-foreground"]};
      position: relative;
      
      &::before {
        content: '';
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
    background-color: ${({ theme }) => theme["critical-soft"]};
    color: ${({ theme }) => theme.critical};
    font-size: 11px;
    font-weight: 700;
    padding: 2px 8px;
    border-radius: 12px;
  }

  .scan-status {
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
      color: ${({ theme }) => theme["muted-foreground"]};
    }
  }
`;
