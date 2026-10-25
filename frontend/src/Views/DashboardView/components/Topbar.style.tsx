import styled from "styled-components";
import { themeType } from "@/themes/theme.type";

export const TopbarStyle = styled.header<themeType>`
  max-height: 100px;
  display: flex;
  flex-wrap: wrap-reverse;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.background};

  .topbar-left {
    display: flex;
    align-items: center;
    flex: 1;
    gap: 16px;

    .sidebar-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
      color: ${({ theme }) => theme["muted-foreground"]};
      background: transparent;
      border: 1px solid transparent;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background-color: ${({ theme }) => theme.muted};
        color: ${({ theme }) => theme.foreground};
      }

      svg {
        font-size: 18px;
      }
    }

    .breadcrumbs {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13px;
      color: ${({ theme }) => theme["muted-foreground"]};

      .separator {
        font-size: 10px;
        opacity: 0.6;
      }

      .current {
        color: ${({ theme }) => theme.foreground};
        font-weight: 500;
      }
    }
  }

  .topbar-right {
    display: flex;
    align-items: center;
    gap: 16px;

    .icon-button {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 8px;
      color: ${({ theme }) => theme["muted-foreground"]};
      background-color: ${({ theme }) => theme.sidebar};
      border: 1px solid ${({ theme }) => theme["sidebar-border"]};
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background-color: ${({ theme }) => theme.muted};
        color: ${({ theme }) => theme.foreground};
      }

      svg {
        font-size: 18px;
      }

      .notification-dot {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: ${({ theme }) => theme.critical};
      }
    }

    .user-profile {
      display: flex;
      align-items: center;
      gap: 12px;

      .avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background-color: ${({ theme }) => theme.avatar};
        color: ${({ theme }) => theme["avatar-foreground"]};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 600;
      }

      .user-info {
        display: flex;
        flex-direction: column;

        .user-name {
          font-size: 13px;
          font-weight: 600;
          color: ${({ theme }) => theme.foreground};
        }

        .user-role {
          font-size: 11px;
          color: ${({ theme }) => theme["muted-foreground"]};
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    .topbar-left {
      justify-content: center;
    }
  }
`;
