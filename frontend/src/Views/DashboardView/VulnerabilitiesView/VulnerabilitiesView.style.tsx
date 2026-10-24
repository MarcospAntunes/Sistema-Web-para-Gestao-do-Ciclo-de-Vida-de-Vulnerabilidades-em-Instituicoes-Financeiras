import styled from "styled-components";
import { themeType } from "@/themes/theme.type";

export const VulnerabilitiesStyle = styled.div<themeType>`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: 16px;

    .title-area {
      display: flex;
      flex-direction: column;
      gap: 6px;

      .tag {
        font-size: 11px;
        font-weight: 700;
        color: ${({ theme }) => theme.primary};
        letter-spacing: 1px;
      }

      h1 {
        font-size: 28px;
        font-weight: 700;
        color: ${({ theme }) => theme.foreground};
        margin: 0;
      }

      p {
        font-size: 14px;
        color: ${({ theme }) => theme["muted-foreground"]};
        margin: 0;
      }
    }

    .header-actions {
      display: flex;
      gap: 12px;

      button {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 16px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .btn-secondary {
        background: transparent;
        border: 1px solid ${({ theme }) => theme.border};
        color: ${({ theme }) => theme.foreground};
        &:hover {
          background-color: ${({ theme }) => theme.card};
        }
      }

      .btn-primary {
        background-color: ${({ theme }) => theme.primary};
        color: ${({ theme }) => theme["primary-foreground"]};
        border: none;
        &:hover {
          background-color: ${({ theme }) => theme["primary-hover"]};
        }
      }
    }
  }

  .filters-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
    background-color: ${({ theme }) => theme.card};
    padding: 16px 20px;
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.border};

    .search-box {
      display: flex;
      align-items: center;
      gap: 10px;
      background-color: ${({ theme }) => theme.background};
      border: 1px solid ${({ theme }) => theme.border};
      padding: 8px 14px;
      border-radius: 8px;
      min-width: 280px;
      flex: 1;

      input {
        background: transparent;
        border: none;
        color: ${({ theme }) => theme.foreground};
        font-size: 14px;
        width: 100%;
        &:focus {
          outline: none;
        }
      }
    }

    .select-group {
      display: flex;
      gap: 12px;

      select {
        background-color: ${({ theme }) => theme.background};
        border: 1px solid ${({ theme }) => theme.border};
        color: ${({ theme }) => theme.foreground};
        padding: 8px 12px;
        border-radius: 8px;
        font-size: 13px;
        cursor: pointer;
        &:focus {
          outline: none;
          border-color: ${({ theme }) => theme.primary};
        }
      }
    }
  }

  .table-card {
    background-color: ${({ theme }) => theme.card};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 12px;
    overflow: hidden;

    table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;

      th {
        padding: 14px 20px;
        font-size: 12px;
        font-weight: 600;
        color: ${({ theme }) => theme["muted-foreground"]};
        text-transform: uppercase;
        letter-spacing: 0.5px;
        border-bottom: 1px solid ${({ theme }) => theme.border};
        background: rgba(255, 255, 255, 0.02);
      }

      td {
        padding: 16px 20px;
        font-size: 14px;
        color: ${({ theme }) => theme.foreground};
        border-bottom: 1px solid ${({ theme }) => theme.border};
        vertical-align: middle;
      }

      tr:last-child td {
        border-bottom: none;
      }

      tr:hover td {
        background: rgba(255, 255, 255, 0.02);
      }
    }
  }

  .badge-risk {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;

    &.crítica, &.critica {
      background-color: ${({ theme }) => theme["critical-soft"]};
      color: ${({ theme }) => theme.critical};
    }
    &.alta {
      background-color: ${({ theme }) => theme["warning-soft"]};
      color: ${({ theme }) => theme["warning-strong"]};
    }
    &.média, &.media {
      background-color: ${({ theme }) => theme["primary-soft"]};
      color: ${({ theme }) => theme.primary};
    }
    &.baixa {
      background-color: ${({ theme }) => theme["success-soft"]};
      color: ${({ theme }) => theme.success};
    }
  }

  .badge-status {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-weight: 500;

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
  }

  .user-badge {
    display: flex;
    align-items: center;
    gap: 8px;

    .avatar-sm {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      background-color: ${({ theme }) => theme.primary};
      color: ${({ theme }) => theme["primary-foreground"]};
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 600;
    }
  }

  .actions-cell {
    display: flex;
    gap: 8px;

    button {
      background: transparent;
      border: 1px solid ${({ theme }) => theme.border};
      color: ${({ theme }) => theme["muted-foreground"]};
      padding: 6px 10px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 12px;
      display: flex;
      align-items: center;
      gap: 4px;
      transition: all 0.2s;

      &:hover {
        color: ${({ theme }) => theme.foreground};
        border-color: ${({ theme }) => theme.primary};
      }

      &.delete:hover {
        color: #ef4444;
        border-color: #ef4444;
      }
    }
  }

  .empty-state {
    padding: 48px 24px;
    text-align: center;
    color: ${({ theme }) => theme["muted-foreground"]};
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;

    svg {
      font-size: 40px;
      color: ${({ theme }) => theme.primary};
    }
  }
`;
