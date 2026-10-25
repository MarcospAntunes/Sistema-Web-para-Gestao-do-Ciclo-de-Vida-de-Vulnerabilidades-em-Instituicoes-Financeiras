import styled from "styled-components";
import { themeType } from "@/themes/theme.type";

export const TeamStyle = styled.div<themeType>`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .title-area {
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

    button {
      display: flex;
      align-items: center;
      gap: 8px;
      background-color: transparent;
      color: ${({ theme }) => theme.primary};
      border: 1px solid ${({ theme }) => theme.primary};
      padding: 10px 16px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background-color: ${({ theme }) => theme["primary-soft"]};
      }
    }
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  .stat-card {
    background-color: ${({ theme }) => theme.card};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 12px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .stat-content {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .stat-title {
        font-size: 13px;
        color: ${({ theme }) => theme["card-foreground"]};
      }

      .stat-value {
        font-size: 32px;
        font-weight: 700;
        color: ${({ theme }) => theme.foreground};
        line-height: 1;
      }
    }

    .icon-container {
      width: 48px;
      height: 48px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
    }
  }

  .team-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .member-card {
    background-color: ${({ theme }) => theme.card};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 12px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 20px;

    .member-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      .member-info {
        display: flex;
        align-items: center;
        gap: 16px;

        .avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: ${({ theme }) => theme.avatar};
          color: ${({ theme }) => theme["avatar-foreground"]};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 700;
        }

        .details {
          display: flex;
          flex-direction: column;
          gap: 2px;

          .name {
            font-size: 16px;
            font-weight: 600;
            color: ${({ theme }) => theme.foreground};
          }

          .role {
            font-size: 13px;
            color: ${({ theme }) => theme["muted-foreground"]};
          }

          .email {
            font-size: 12px;
            color: ${({ theme }) => theme["muted-foreground"]};
            display: flex;
            align-items: center;
            gap: 4px;
            margin-top: 4px;
          }
        }
      }

      .status-badge {
        font-size: 10px;
        font-weight: 700;
        padding: 4px 8px;
        border-radius: 4px;
        text-transform: uppercase;
        
        &.ativa {
          color: ${({ theme }) => theme.success};
          background-color: ${({ theme }) => theme["success-soft"]};
        }
        &.ferias {
          color: ${({ theme }) => theme.info};
          background-color: ${({ theme }) => theme["info-soft"]};
        }
      }
    }

    .member-tags {
      display: flex;
      gap: 8px;
      align-items: center;

      .specialty {
        background-color: ${({ theme }) => theme["primary-soft"]};
        color: ${({ theme }) => theme.primary};
        font-size: 11px;
        font-weight: 600;
        padding: 4px 10px;
        border-radius: 12px;
      }

      .workload {
        background-color: ${({ theme }) => theme.sidebar};
        color: ${({ theme }) => theme["muted-foreground"]};
        border: 1px solid ${({ theme }) => theme.border};
        font-size: 11px;
        font-weight: 500;
        padding: 3px 10px;
        border-radius: 12px;
      }
    }

    .sla-section {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .sla-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;

        span {
          color: ${({ theme }) => theme["muted-foreground"]};
        }
        
        strong {
          color: ${({ theme }) => theme.foreground};
        }
      }

      .sla-bar {
        height: 6px;
        background-color: ${({ theme }) => theme.muted};
        border-radius: 3px;
        overflow: hidden;

        .sla-fill {
          height: 100%;
          border-radius: 3px;
        }
      }
    }
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  padding: 16px;
`;

export const ModalBox = styled.div`
  background: #121824;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  width: 100%;
  max-width: 480px;
  padding: 24px;
  color: #fff;

  .modal-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    h3 { margin: 0; font-size: 1.15rem; }
    button { background: transparent; border: none; color: #94a3b8; cursor: pointer; font-size: 1.25rem; }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 14px;

    label {
      font-size: 0.85rem;
      color: #cbd5e1;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }

    input, select {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-radius: 6px;
      padding: 10px 12px;
      color: #fff;
      font-size: 0.9rem;
      &:focus { outline: none; border-color: #3b82f6; }
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
      margin-top: 12px;

      button {
        padding: 9px 18px;
        border-radius: 6px;
        font-size: 0.9rem;
        cursor: pointer;
        font-weight: 500;
      }
      .btn-cancel {
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: #cbd5e1;
      }
      .btn-submit {
        background: #2563eb;
        border: none;
        color: #fff;
        &:hover { background: #1d4ed8; }
      }
    }
  }
`;
