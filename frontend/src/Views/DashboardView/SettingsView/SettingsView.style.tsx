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
    grid-template-columns: 1fr;
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

      input, select {
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
`;
