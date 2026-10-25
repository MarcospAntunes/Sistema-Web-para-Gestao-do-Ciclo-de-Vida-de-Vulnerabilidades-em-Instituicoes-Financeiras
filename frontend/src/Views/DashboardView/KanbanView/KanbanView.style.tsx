import styled from "styled-components";
import { themeType } from "@/themes/theme.type";

export const KanbanStyle = styled.div<themeType>`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  min-width: 0;
  min-height: 0;
  height: 100%;
  box-sizing: border-box;

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 16px;
    min-width: 0;

    .header-info {
      display: flex;
      flex-direction: column;
      gap: 6px;
      min-width: 0;
      flex: 1 1 260px;

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
        line-height: 1.25;
        margin: 0;
        overflow-wrap: anywhere;
      }

      p {
        font-size: 14px;
        color: ${({ theme }) => theme["muted-foreground"]};
        margin: 0;
        line-height: 1.5;
        overflow-wrap: anywhere;
      }
    }

    .header-actions {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 0 1 auto;
      min-width: 0;
      max-width: 100%;

      .search-box {
        display: flex;
        align-items: center;
        gap: 8px;
        min-width: 0;
        background-color: ${({ theme }) => theme.card};
        border: 1px solid ${({ theme }) => theme.border};
        border-radius: 8px;
        padding: 8px 14px;
        color: ${({ theme }) => theme.foreground};

        svg {
          color: ${({ theme }) => theme["muted-foreground"]};
          flex-shrink: 0;
        }

        input {
          background: transparent;
          border: none;
          outline: none;
          color: ${({ theme }) => theme.foreground};
          font-size: 13px;
          width: 220px;
          min-width: 0;
          max-width: 100%;

          &::placeholder {
            color: ${({ theme }) => theme["muted-foreground"]};
          }
        }

        &:focus-within {
          border-color: ${({ theme }) => theme.primary};
          box-shadow: 0 0 0 2px ${({ theme }) => theme.primary}20;
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
        white-space: nowrap;
        flex-shrink: 0;

        strong {
          color: ${({ theme }) => theme.primary};
        }
      }
    }
  }

  .kanban-board {
    display: flex;
    gap: 16px;
    flex: 1 1 auto;
    min-width: 0;
    min-height: 0;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 16px;
    align-items: stretch;
    overscroll-behavior-x: contain;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.border} transparent;

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
      flex: 0 0 310px;
      min-height: 0;
      max-height: calc(100vh - 200px);
      max-height: min(720px, calc(100dvh - 200px));
      transition: border-color 0.2s ease, background-color 0.2s ease,
        box-shadow 0.2s ease;

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
        gap: 10px;
        padding: 14px 16px;
        border-bottom: 1px solid ${({ theme }) => theme.border};
        flex-shrink: 0;
        min-width: 0;

        .column-title {
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 0;
          font-weight: 600;
          font-size: 14px;
          color: ${({ theme }) => theme.foreground};
          overflow-wrap: anywhere;

          .dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            flex-shrink: 0;
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
          flex-shrink: 0;
        }
      }

      .column-content {
        padding: 14px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        overflow-y: auto;
        overflow-x: hidden;
        flex: 1 1 auto;
        min-height: 80px;
        min-width: 0;
        overscroll-behavior-y: contain;
        scrollbar-width: thin;
        scrollbar-color: ${({ theme }) => theme.border} transparent;

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
          overflow-wrap: anywhere;
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
        overflow-wrap: anywhere;
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
    min-width: 0;
    cursor: grab;
    transition: border-color 0.2s ease, box-shadow 0.2s ease,
      transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    position: relative;
    user-select: none;

    &:active {
      cursor: grabbing;
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        border-color: ${({ theme }) => theme.primary};
        transform: translateY(-2px);
        box-shadow: 0 8px 20px -6px rgba(0, 0, 0, 0.35);
      }
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
      align-items: flex-start;
      gap: 8px;
      min-width: 0;

      .card-id-group {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
        min-width: 0;

        .card-id {
          font-size: 11px;
          font-weight: 700;
          color: ${({ theme }) => theme["muted-foreground"]};
          letter-spacing: 0.3px;
          overflow-wrap: anywhere;
        }

        .card-cve {
          font-size: 10px;
          color: ${({ theme }) => theme.primary};
          background-color: ${({ theme }) => theme["primary-soft"]};
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 600;
          overflow-wrap: anywhere;
        }
      }

      .badge-risk {
        padding: 3px 8px;
        border-radius: 4px;
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        flex-shrink: 0;

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
      min-width: 0;

      .card-title {
        font-size: 13px;
        font-weight: 600;
        color: ${({ theme }) => theme.foreground};
        margin: 0 0 4px;
        line-height: 1.4;
        overflow-wrap: anywhere;
      }

      .card-system {
        font-size: 11px;
        color: ${({ theme }) => theme["muted-foreground"]};
        display: flex;
        align-items: flex-start;
        gap: 4px;
        min-width: 0;
        overflow-wrap: anywhere;

        svg {
          flex-shrink: 0;
        }
      }
    }

    .card-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;
      min-width: 0;

      .card-tag {
        font-size: 9px;
        font-weight: 600;
        background-color: ${({ theme }) => theme.muted}80;
        color: ${({ theme }) => theme["muted-foreground"]};
        padding: 2px 6px;
        border-radius: 4px;
        max-width: 100%;
        overflow-wrap: anywhere;
      }
    }

    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      margin-top: 4px;
      padding-top: 8px;
      border-top: 1px solid ${({ theme }) => theme.border}50;
      min-width: 0;

      .assignee {
        display: flex;
        align-items: center;
        gap: 6px;
        min-width: 0;

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
          flex-shrink: 0;
        }

        .name {
          font-size: 11px;
          color: ${({ theme }) => theme["muted-foreground"]};
          overflow-wrap: anywhere;
          min-width: 0;
        }
      }

      .cvss {
        font-size: 12px;
        font-weight: 700;
        color: ${({ theme }) => theme.foreground};
        white-space: nowrap;
        flex-shrink: 0;

        span {
          font-size: 10px;
          font-weight: 600;
          color: ${({ theme }) => theme["muted-foreground"]};
          margin-right: 4px;
        }
      }
    }
  }

  /* Tablets */
  @media (max-width: 1024px) {
    gap: 16px;

    .header {
      align-items: stretch;

      .header-info {
        flex-basis: 100%;

        h1 {
          font-size: 25px;
        }
      }

      .header-actions {
        width: 100%;
        flex: 1 1 100%;

        .search-box {
          flex: 1 1 auto;

          input {
            width: 100%;
          }
        }
      }
    }

    .kanban-board {
      gap: 12px;

      .kanban-column {
        max-height: calc(100vh - 250px);
        max-height: min(680px, calc(100dvh - 250px));
      }
    }
  }

  /* Phones */
  @media (max-width: 600px) {
    gap: 14px;

    .header {
      gap: 12px;

      .header-info {
        gap: 5px;

        .subtitle {
          font-size: 10px;
          letter-spacing: 0.8px;
        }

        h1 {
          font-size: 22px;
        }

        p {
          font-size: 13px;
        }
      }

      .header-actions {
        flex-direction: column;
        align-items: stretch;
        gap: 8px;

        .search-box {
          width: 100%;
          padding: 10px 12px;

          input {
            width: 100%;
            font-size: 13px;
          }
        }

        .total-pill {
          align-self: flex-start;
          padding: 7px 10px;
        }
      }
    }

    .kanban-board {
      gap: 10px;
      padding-bottom: 12px;
      align-items: stretch;
      scroll-snap-type: x proximity;

      .kanban-column {
        width: min(86vw, 310px);
        min-width: min(86vw, 270px);
        max-width: min(86vw, 310px);
        flex-basis: min(86vw, 310px);
        max-height: calc(100vh - 260px);
        max-height: min(620px, calc(100dvh - 260px));
        scroll-snap-align: start;

        .column-header {
          padding: 12px;
        }

        .column-content {
          padding: 10px;
          gap: 10px;
        }
      }
    }

    .kanban-card {
      padding: 12px;
      gap: 9px;

      .card-footer {
        align-items: flex-start;

        .assignee {
          flex: 1 1 auto;
        }
      }
    }
  }

  /* Very narrow phones */
  @media (max-width: 360px) {
    .header {
      .header-info {
        h1 {
          font-size: 20px;
        }
      }

      .header-actions {
        .total-pill {
          white-space: normal;
        }
      }
    }

    .kanban-board {
      .kanban-column {
        width: 84vw;
        min-width: 250px;
        max-width: 290px;
        flex-basis: 84vw;
      }
    }

    .kanban-card {
      .card-top {
        flex-wrap: wrap;
      }

      .card-footer {
        flex-wrap: wrap;
      }
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .kanban-column,
    .kanban-card {
      transition: none;
    }

    .kanban-card:hover,
    .kanban-card.drag-over-card {
      transform: none;
    }
  }
`;
