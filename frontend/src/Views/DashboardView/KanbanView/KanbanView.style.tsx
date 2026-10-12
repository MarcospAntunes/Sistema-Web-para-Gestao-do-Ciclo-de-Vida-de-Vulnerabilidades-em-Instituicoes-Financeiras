import styled from "styled-components";
import { themeType } from "@/themes/theme.type";

export const KanbanStyle = styled.div<themeType>`
  display: flex;
  flex-direction: column;
  gap: 24px;
  height: 100%;

  .header {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .subtitle {
      font-size: 11px;
      font-weight: 700;
      color: ${({ theme }) => theme.primary};
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    h1 {
      font-size: 28px;
      font-weight: 700;
      color: ${({ theme }) => theme.foreground};
    }

    p {
      font-size: 14px;
      color: ${({ theme }) => theme["muted-foreground"]};
    }
  }

  .kanban-board {
    display: flex;
    gap: 16px;
    flex: 1;
    overflow-x: auto;
    padding-bottom: 16px;

    .kanban-column {
      background-color: ${({ theme }) => theme.sidebar};
      border-radius: 12px;
      min-width: 300px;
      width: 300px;
      display: flex;
      flex-direction: column;
      
      .column-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px;
        border-bottom: 1px solid ${({ theme }) => theme.border};

        .column-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
          font-size: 14px;
          color: ${({ theme }) => theme.foreground};

          .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
          }
        }

        .column-count {
          background-color: ${({ theme }) => theme.card};
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          color: ${({ theme }) => theme["muted-foreground"]};
        }
      }

      .column-content {
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        overflow-y: auto;
        flex: 1;
      }
    }
  }

  .kanban-card {
    background-color: ${({ theme }) => theme.card};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 8px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: ${({ theme }) => theme["muted-foreground"]};
    }

    .card-top {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .card-id {
        font-size: 11px;
        color: ${({ theme }) => theme["muted-foreground"]};
      }
      
      .badge-risk {
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;

        &.crítica {
          background-color: ${({ theme }) => theme["critical-soft"]};
          color: ${({ theme }) => theme.critical};
          border: 1px solid ${({ theme }) => theme.critical};
        }
        &.alta {
          background-color: ${({ theme }) => theme["warning-soft"]};
          color: ${({ theme }) => theme["warning-strong"]};
          border: 1px solid ${({ theme }) => theme["warning-strong"]};
        }
        &.média {
          background-color: ${({ theme }) => theme["info-soft"]};
          color: ${({ theme }) => theme.info};
          border: 1px solid ${({ theme }) => theme.info};
        }
        &.baixa {
          background-color: ${({ theme }) => theme["success-soft"]};
          color: ${({ theme }) => theme.success};
          border: 1px solid ${({ theme }) => theme.success};
        }
      }
    }

    .card-body {
      .card-title {
        font-size: 14px;
        font-weight: 600;
        color: ${({ theme }) => theme.foreground};
        margin-bottom: 4px;
        line-height: 1.4;
      }
      .card-system {
        font-size: 12px;
        color: ${({ theme }) => theme["muted-foreground"]};
      }
    }

    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 4px;

      .assignee {
        display: flex;
        align-items: center;
        gap: 8px;

        .avatar-sm {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background-color: ${({ theme }) => theme.avatar};
          color: ${({ theme }) => theme["avatar-foreground"]};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 9px;
          font-weight: 700;
        }

        .name {
          font-size: 12px;
          color: ${({ theme }) => theme["muted-foreground"]};
        }
      }

      .cvss {
        font-size: 12px;
        font-weight: 700;
        color: ${({ theme }) => theme.foreground};
        span {
          font-size: 10px;
          font-weight: 600;
          color: ${({ theme }) => theme["muted-foreground"]};
          margin-right: 4px;
        }
      }
    }
  }
`;
