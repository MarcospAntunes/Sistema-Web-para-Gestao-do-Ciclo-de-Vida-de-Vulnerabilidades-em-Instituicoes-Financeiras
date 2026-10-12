import styled from "styled-components";
import { themeType } from "@/themes/theme.type";

export const KanbanStyle = styled.div<themeType>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 100%;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 16px;

    .header-info {
      display: flex;
      flex-direction: column;
      gap: 6px;

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

    .header-actions {
      display: flex;
      align-items: center;
      gap: 12px;

      .search-box {
        display: flex;
        align-items: center;
        gap: 8px;
        background-color: ${({ theme }) => theme.card};
        border: 1px solid ${({ theme }) => theme.border};
        border-radius: 8px;
        padding: 8px 14px;
        color: ${({ theme }) => theme.foreground};

        svg {
          color: ${({ theme }) => theme["muted-foreground"]};
        }

        input {
          background: transparent;
          border: none;
          outline: none;
          color: ${({ theme }) => theme.foreground};
          font-size: 13px;
          width: 220px;

          &::placeholder {
            color: ${({ theme }) => theme["muted-foreground"]};
          }
        }
      }

      .total-pill {
        background-color: ${({ theme }) => theme.sidebar};
        border: 1px solid ${({ theme }) => theme.border};
        border-radius: 8px;
        padding: 8px 14px;
        font-size: 12px;
        font-weight: 600;
        color: ${({ theme }) => theme["muted-foreground"]};

        strong {
          color: ${({ theme }) => theme.primary};
        }
      }
    }
  }

  .kanban-board {
    display: flex;
    gap: 16px;
    flex: 1;
    overflow-x: auto;
    padding-bottom: 16px;
    align-items: flex-start;

    /* Custom scrollbar */
    &::-webkit-scrollbar {
      height: 8px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.border};
      border-radius: 4px;
    }

    .kanban-column {
      background-color: ${({ theme }) => theme.sidebar};
      border: 1px solid ${({ theme }) => theme.border}60;
      border-radius: 12px;
      min-width: 310px;
      width: 310px;
      max-width: 310px;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      max-height: calc(100vh - 200px);
      transition: all 0.2s ease;

      &.drag-over {
        border-color: ${({ theme }) => theme.primary};
        background-color: ${({ theme }) => theme["sidebar-accent"]}35;
        box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}40,
          0 10px 28px -6px rgba(0, 0, 0, 0.4);
      }

      .column-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 14px 16px;
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
          font-weight: 700;
          color: ${({ theme }) => theme["muted-foreground"]};
          border: 1px solid ${({ theme }) => theme.border}80;
        }
      }

      .column-content {
        padding: 14px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        overflow-y: auto;
        flex: 1;
        min-height: 80px;

        &::-webkit-scrollbar {
          width: 5px;
        }
        &::-webkit-scrollbar-track {
          background: transparent;
        }
        &::-webkit-scrollbar-thumb {
          background: ${({ theme }) => theme.border};
          border-radius: 3px;
        }

        .drop-zone {
          padding: 12px;
          border: 2px dashed ${({ theme }) => theme.primary};
          background-color: ${({ theme }) => theme["primary-soft"]}25;
          border-radius: 8px;
          color: ${({ theme }) => theme.primary};
          font-size: 11px;
          font-weight: 700;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
      }

      .empty-column {
        padding: 24px 16px;
        text-align: center;
        font-size: 12px;
        color: ${({ theme }) => theme["muted-foreground"]};
        border: 1px dashed ${({ theme }) => theme.border};
        border-radius: 8px;
        margin: 6px 0;
      }
    }
  }

  .kanban-card {
    background-color: ${({ theme }) => theme.card};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 10px;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    cursor: grab;
    transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    user-select: none;

    &:active {
      cursor: grabbing;
    }

    &:hover {
      border-color: ${({ theme }) => theme.primary};
      transform: translateY(-2px);
      box-shadow: 0 8px 20px -6px rgba(0, 0, 0, 0.35);
    }

    &.is-dragging {
      opacity: 0.3;
      border: 1px dashed ${({ theme }) => theme.primary};
      transform: scale(0.98);
      box-shadow: none;
    }

    &.drag-over-card {
      border-top: 2px solid ${({ theme }) => theme.primary};
      transform: translateY(2px);
    }

    .card-top {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .card-id-group {
        display: flex;
        align-items: center;
        gap: 6px;

        .card-id {
          font-size: 11px;
          font-weight: 700;
          color: ${({ theme }) => theme["muted-foreground"]};
          letter-spacing: 0.3px;
        }

        .card-cve {
          font-size: 10px;
          color: ${({ theme }) => theme.primary};
          background-color: ${({ theme }) => theme["primary-soft"]};
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 600;
        }
      }

      .badge-risk {
        padding: 3px 8px;
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
        font-size: 13px;
        font-weight: 600;
        color: ${({ theme }) => theme.foreground};
        margin-bottom: 4px;
        line-height: 1.4;
      }
      .card-system {
        font-size: 11px;
        color: ${({ theme }) => theme["muted-foreground"]};
        display: flex;
        align-items: center;
        gap: 4px;
      }
    }

    .card-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;

      .card-tag {
        font-size: 9px;
        font-weight: 600;
        background-color: ${({ theme }) => theme.muted}80;
        color: ${({ theme }) => theme["muted-foreground"]};
        padding: 2px 6px;
        border-radius: 4px;
      }
    }

    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 4px;
      padding-top: 8px;
      border-top: 1px solid ${({ theme }) => theme.border}50;

      .assignee {
        display: flex;
        align-items: center;
        gap: 6px;

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
          font-size: 11px;
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
