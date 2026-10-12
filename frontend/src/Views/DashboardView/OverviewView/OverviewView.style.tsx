import styled from "styled-components";
import { themeType } from "@/themes/theme.type";

export const OverviewStyle = styled.div<themeType>`
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

      .date {
        font-size: 11px;
        font-weight: 700;
        color: ${({ theme }) => theme.primary};
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
      background-color: ${({ theme }) => theme.primary};
      color: ${({ theme }) => theme["primary-foreground"]};
      padding: 10px 16px;
      border-radius: 8px;
      border: none;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background-color: ${({ theme }) => theme["primary-hover"]};
      }
    }
  }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }

  .stat-card {
    background-color: ${({ theme }) => theme.card};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 12px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 120px;

    .card-top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      .card-title {
        font-size: 13px;
        color: ${({ theme }) => theme["card-foreground"]};
      }

      .icon-container {
        width: 32px;
        height: 32px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
      }
    }

    .card-bottom {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .card-value {
        font-size: 32px;
        font-weight: 700;
        color: ${({ theme }) => theme.foreground};
        line-height: 1;
      }

      .card-subtitle {
        font-size: 12px;
        font-weight: 600;
      }
    }
  }

  .charts-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 16px;
  }

  .chart-card {
    background-color: ${({ theme }) => theme.card};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 12px;
    padding: 20px;
    display: flex;
    flex-direction: column;

    .chart-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 24px;

      .chart-titles {
        h3 {
          font-size: 16px;
          font-weight: 600;
          color: ${({ theme }) => theme.foreground};
          margin-bottom: 4px;
        }
        p {
          font-size: 12px;
          color: ${({ theme }) => theme["muted-foreground"]};
        }
      }

      .chart-actions {
        font-size: 12px;
        color: ${({ theme }) => theme["muted-foreground"]};
        display: flex;
        align-items: center;
        gap: 4px;
        cursor: pointer;
      }
    }

    .chart-content {
      flex: 1;
      min-height: 200px;
      position: relative;
    }
  }

  .donut-legend {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-left: 20px;
    justify-content: center;

    .legend-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 13px;

      .legend-left {
        display: flex;
        align-items: center;
        gap: 8px;
        color: ${({ theme }) => theme.foreground};

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
      }

      .legend-value {
        font-weight: 600;
        color: ${({ theme }) => theme.foreground};
      }
    }
  }

  .list-section {
    background-color: ${({ theme }) => theme.card};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 12px;
    padding: 20px;

    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;

      .titles {
        h3 {
          font-size: 16px;
          font-weight: 600;
          color: ${({ theme }) => theme.foreground};
          margin-bottom: 4px;
        }
        p {
          font-size: 12px;
          color: ${({ theme }) => theme["muted-foreground"]};
        }
      }

      .search-box {
        display: flex;
        align-items: center;
        background-color: ${({ theme }) => theme.background};
        border: 1px solid ${({ theme }) => theme.border};
        border-radius: 8px;
        padding: 8px 12px;
        gap: 8px;
        width: 250px;

        input {
          background: transparent;
          border: none;
          outline: none;
          color: ${({ theme }) => theme.foreground};
          font-size: 13px;
          width: 100%;

          &::placeholder {
            color: ${({ theme }) => theme["muted-foreground"]};
          }
        }
      }
    }

    table {
      width: 100%;
      border-collapse: collapse;

      th {
        text-align: left;
        font-size: 10px;
        text-transform: uppercase;
        color: ${({ theme }) => theme["muted-foreground"]};
        padding-bottom: 16px;
        border-bottom: 1px solid ${({ theme }) => theme.border};
        font-weight: 600;
        letter-spacing: 0.5px;
      }

      td {
        padding: 16px 0;
        border-bottom: 1px solid ${({ theme }) => theme.border};
        font-size: 13px;
        color: ${({ theme }) => theme.foreground};
      }

      tr:last-child td {
        border-bottom: none;
        padding-bottom: 0;
      }
    }
  }

  .badge-risk {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;

    &.critica {
      background-color: ${({ theme }) => theme["critical-soft"]};
      color: ${({ theme }) => theme.critical};
      border: 1px solid ${({ theme }) => theme.critical};
    }
    &.alta {
      background-color: ${({ theme }) => theme["warning-soft"]};
      color: ${({ theme }) => theme["warning-strong"]};
      border: 1px solid ${({ theme }) => theme["warning-strong"]};
    }
  }

  .user-badge {
    display: flex;
    align-items: center;
    gap: 8px;

    .avatar-sm {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: ${({ theme }) => theme.avatar};
      color: ${({ theme }) => theme["avatar-foreground"]};
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 10px;
      font-weight: 700;
    }
  }
`;
