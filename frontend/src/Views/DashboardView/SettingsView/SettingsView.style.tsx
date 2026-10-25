import styled from "styled-components";
import { themeType } from "@/themes/theme.type";

export const SettingsStyle = styled.div<themeType>`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1000px;
  margin: 0 auto;

  .header {
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

  .settings-grid {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 20px;
  }

  .settings-card {
    background-color: ${({ theme }) => theme.card};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 12px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .card-header {
      display: flex;
      align-items: center;
      gap: 12px;
      border-bottom: 1px solid ${({ theme }) => theme.border};
      padding-bottom: 16px;

      svg {
        font-size: 22px;
        color: ${({ theme }) => theme.primary};
      }

      h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 600;
        color: ${({ theme }) => theme.foreground};
      }

      p {
        margin: 2px 0 0;
        font-size: 13px;
        color: ${({ theme }) => theme["muted-foreground"]};
      }
    }

    .theme-options {
      display: flex;
      flex-wrap: wrap;
      gap: 16px;

      .theme-option-button {
        width: 240px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 12px 20px;
        border-radius: 8px;
        cursor: pointer;
        font-family: inherit;
        font-size: 14px;
        font-weight: 600;
        transition:
          background-color 0.2s ease,
          color 0.2s ease,
          border-color 0.2s ease;

        background: transparent;
        color: ${({ theme }) => theme.foreground};
        border: 1px solid ${({ theme }) => theme.border};

        &[data-active="true"] {
          background: ${({ theme }) => theme.primary};
          color: ${({ theme }) => theme["primary-foreground"]};
          border-color: ${({ theme }) => theme.primary};
        }

        &:hover:not([data-active="true"]) {
          background: ${({ theme }) => theme["sidebar-accent"]};
        }

        &:focus-visible {
          outline: 2px solid ${({ theme }) => theme.primary};
          outline-offset: 3px;
        }
      }
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      @media (max-width: 600px) {
        grid-template-columns: 1fr;
      }
    }

    .field {
      display: flex;
      flex-direction: column;
      gap: 6px;

      label {
        font-size: 13px;
        font-weight: 500;
        color: ${({ theme }) => theme["muted-foreground"]};
      }

      input,
      select {
        background-color: ${({ theme }) => theme.background};
        border: 1px solid ${({ theme }) => theme.border};
        border-radius: 8px;
        padding: 10px 14px;
        color: ${({ theme }) => theme.foreground};
        font-size: 14px;
        &:focus {
          outline: none;
          border-color: ${({ theme }) => theme.primary};
        }
      }
    }

    .sla-table {
      width: 100%;
      border-collapse: collapse;

      th {
        font-size: 12px;
        text-transform: uppercase;
        color: ${({ theme }) => theme["muted-foreground"]};
        padding: 10px 12px;
        text-align: left;
        border-bottom: 1px solid ${({ theme }) => theme.border};
      }

      td {
        padding: 12px;
        font-size: 13px;
        border-bottom: 1px solid ${({ theme }) => theme.border};
        color: ${({ theme }) => theme.foreground};
      }
    }

    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;

      button {
        padding: 10px 18px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
      }

      .btn-save {
        background-color: ${({ theme }) => theme.primary};
        color: ${({ theme }) => theme["primary-foreground"]};
        border: none;
        &:hover {
          background-color: ${({ theme }) => theme["primary-hover"]};
        }
      }
    }
  }

  @media (max-width: 768px) {
    gap: 20px;

    .header {
      h1 {
        font-size: 24px;
        overflow-wrap: anywhere;
      }

      p {
        line-height: 1.5;
      }
    }

    .settings-grid {
      gap: 16px;
    }

    .theme-options {
      justify-content: center;
    }

    .settings-card {
      min-width: 0;
      padding: 18px;
      gap: 16px;

      .card-header {
        align-items: flex-start;

        svg {
          flex-shrink: 0;
        }
      }

      .form-row {
        grid-template-columns: minmax(0, 1fr);
        gap: 14px;
      }

      .field {
        min-width: 0;

        input,
        select {
          box-sizing: border-box;
          width: 100%;
          min-width: 0;
        }
      }

      .sla-table {
        display: block;
        overflow-x: auto;
        max-width: 100%;
        white-space: nowrap;
        -webkit-overflow-scrolling: touch;
      }

      .actions {
        flex-wrap: wrap;

        button {
          max-width: 100%;
        }
      }
    }
  }

  @media (max-width: 480px) {
    .settings-card {
      padding: 14px;
      border-radius: 10px;

      .card-header {
        gap: 8px;

        h3 {
          font-size: 15px;
        }
      }

      .actions {
        flex-direction: column-reverse;
        align-items: stretch;

        button {
          width: 100%;
        }
      }
    }
  }
`;
