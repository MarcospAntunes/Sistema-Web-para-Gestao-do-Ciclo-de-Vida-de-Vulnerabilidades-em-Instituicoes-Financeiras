import styled, { keyframes } from "styled-components";
import { themeType } from "@/themes/theme.type";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(18px) scale(0.985);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

export const ModalOverlay = styled.div<themeType>`
  position: fixed;
  inset: 0;
  background-color: ${({ theme }) => theme.overlay || "rgba(10, 8, 20, 0.75)"};
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: ${fadeIn} 0.2s cubic-bezier(0.16, 1, 0.3, 1);
`;

export const ModalContainer = styled.div<themeType>`
  background-color: ${({ theme }) => theme.card};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 16px;
  width: 100%;
  max-width: 960px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 24px 60px -12px rgba(0, 0, 0, 0.55),
    0 0 1px 1px rgba(255, 255, 255, 0.05);
  overflow: hidden;
  animation: ${slideUp} 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
`;

export const ModalHeader = styled.div<themeType>`
  padding: 24px 28px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: ${({ theme }) => theme.sidebar};

  .top-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;

    .meta-left {
      display: flex;
      align-items: center;
      gap: 10px;
      flex-wrap: wrap;

      .badge-id {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background-color: ${({ theme }) => theme.muted};
        color: ${({ theme }) => theme.foreground};
        font-size: 12px;
        font-weight: 700;
        padding: 4px 10px;
        border-radius: 6px;
        border: 1px solid ${({ theme }) => theme.border};
        letter-spacing: 0.5px;
      }

      .badge-cve {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background-color: ${({ theme }) => theme["primary-soft"]};
        color: ${({ theme }) => theme.primary};
        font-size: 12px;
        font-weight: 600;
        padding: 4px 10px;
        border-radius: 6px;
        border: 1px solid ${({ theme }) => theme.primary}40;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          background-color: ${({ theme }) => theme.primary};
          color: ${({ theme }) => theme["primary-foreground"]};
        }
      }

      .badge-risk {
        padding: 4px 10px;
        border-radius: 6px;
        font-size: 11px;
        font-weight: 700;
        text-transform: uppercase;
        display: inline-flex;
        align-items: center;
        gap: 5px;

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

      .badge-sla {
        display: inline-flex;
        align-items: center;
        gap: 5px;
        font-size: 11px;
        font-weight: 600;
        padding: 4px 8px;
        border-radius: 6px;

        &.vencendo {
          background-color: ${({ theme }) => theme["critical-soft"]};
          color: ${({ theme }) => theme.critical};
        }
        &.normal {
          background-color: ${({ theme }) => theme.muted};
          color: ${({ theme }) => theme["muted-foreground"]};
        }
      }
    }

    .close-btn {
      background: transparent;
      border: 1px solid transparent;
      color: ${({ theme }) => theme["muted-foreground"]};
      width: 34px;
      height: 34px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background-color: ${({ theme }) => theme.muted};
        color: ${({ theme }) => theme.foreground};
        border-color: ${({ theme }) => theme.border};
      }
    }
  }

  .title-row {
    h2 {
      font-size: 22px;
      font-weight: 700;
      color: ${({ theme }) => theme.foreground};
      line-height: 1.35;
      margin: 0;
    }
  }

  .subtitle-meta {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 12px;
    color: ${({ theme }) => theme["muted-foreground"]};
    flex-wrap: wrap;

    span {
      display: inline-flex;
      align-items: center;
      gap: 5px;
    }

    strong {
      color: ${({ theme }) => theme.foreground};
      font-weight: 600;
    }
  }
`;

export const MetricsStrip = styled.div<themeType>`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  padding: 16px 28px;
  background-color: ${({ theme }) => theme.secondary}60;
  border-bottom: 1px solid ${({ theme }) => theme.border};

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  .metric-card {
    background-color: ${({ theme }) => theme.card};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 10px;
    padding: 12px 14px;
    display: flex;
    flex-direction: column;
    gap: 4px;

    .label {
      font-size: 11px;
      font-weight: 600;
      color: ${({ theme }) => theme["muted-foreground"]};
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .value {
      font-size: 15px;
      font-weight: 700;
      color: ${({ theme }) => theme.foreground};
      display: flex;
      align-items: center;
      gap: 6px;

      .sub {
        font-size: 12px;
        font-weight: 500;
        color: ${({ theme }) => theme["muted-foreground"]};
      }
    }

    .cvss-score {
      font-size: 18px;
      font-weight: 800;
      display: flex;
      align-items: baseline;
      gap: 4px;

      &.critical {
        color: ${({ theme }) => theme.critical};
      }
      &.high {
        color: ${({ theme }) => theme["warning-strong"]};
      }
      &.medium {
        color: ${({ theme }) => theme.info};
      }
      &.low {
        color: ${({ theme }) => theme.success};
      }

      .scale {
        font-size: 11px;
        color: ${({ theme }) => theme["muted-foreground"]};
        font-weight: 600;
      }
    }
  }
`;

export const TabsNav = styled.div<themeType>`
  display: flex;
  padding: 0 28px;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.card};
  gap: 8px;

  .tab-btn {
    background: none;
    border: none;
    border-bottom: 2px solid transparent;
    padding: 12px 16px;
    font-size: 13px;
    font-weight: 600;
    color: ${({ theme }) => theme["muted-foreground"]};
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s ease;
    margin-bottom: -1px;

    &:hover {
      color: ${({ theme }) => theme.foreground};
    }

    &.active {
      color: ${({ theme }) => theme.primary};
      border-bottom-color: ${({ theme }) => theme.primary};
    }

    .count-badge {
      background-color: ${({ theme }) => theme.muted};
      padding: 1px 6px;
      border-radius: 10px;
      font-size: 11px;
    }
  }
`;

export const ModalBody = styled.div<themeType>`
  padding: 24px 28px;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.border};
    border-radius: 3px;
  }

  .content-section {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .section-title {
      font-size: 13px;
      font-weight: 700;
      color: ${({ theme }) => theme.foreground};
      text-transform: uppercase;
      letter-spacing: 0.6px;
      display: flex;
      align-items: center;
      gap: 8px;

      svg {
        color: ${({ theme }) => theme.primary};
      }
    }

    .section-box {
      background-color: ${({ theme }) => theme.secondary}40;
      border: 1px solid ${({ theme }) => theme.border};
      border-radius: 10px;
      padding: 16px;
      font-size: 13px;
      line-height: 1.6;
      color: ${({ theme }) => theme.foreground};

      &.highlight {
        border-left: 4px solid ${({ theme }) => theme.primary};
      }

      &.danger {
        border-left: 4px solid ${({ theme }) => theme.critical};
        background-color: ${({ theme }) => theme["critical-soft"]}25;
      }

      &.success {
        border-left: 4px solid ${({ theme }) => theme.success};
        background-color: ${({ theme }) => theme["success-soft"]}25;
      }

      pre {
        white-space: pre-wrap;
        font-family: inherit;
        margin: 0;
      }
    }
  }

  .grid-two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .cvss-vector-box {
    background-color: ${({ theme }) => theme.sidebar};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 10px;
    padding: 14px 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .vector-label {
      font-size: 11px;
      font-weight: 700;
      color: ${({ theme }) => theme["muted-foreground"]};
      text-transform: uppercase;
    }

    .vector-string {
      font-family: monospace;
      font-size: 12px;
      color: ${({ theme }) => theme.primary};
      background-color: ${({ theme }) => theme.muted};
      padding: 6px 10px;
      border-radius: 6px;
      word-break: break-all;
    }
  }

  .cvss-metrics-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    .metric-pill {
      background-color: ${({ theme }) => theme.muted}60;
      border: 1px solid ${({ theme }) => theme.border};
      border-radius: 8px;
      padding: 8px 10px;
      display: flex;
      flex-direction: column;
      gap: 3px;

      .label {
        font-size: 10px;
        color: ${({ theme }) => theme["muted-foreground"]};
        font-weight: 600;
      }

      .val {
        font-size: 12px;
        font-weight: 700;
        color: ${({ theme }) => theme.foreground};
      }
    }
  }

  .tags-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .tag-item {
      background-color: ${({ theme }) => theme.muted};
      border: 1px solid ${({ theme }) => theme.border};
      color: ${({ theme }) => theme["muted-foreground"]};
      font-size: 11px;
      font-weight: 600;
      padding: 4px 10px;
      border-radius: 6px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
  }

  .compliance-list {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .compliance-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      background-color: ${({ theme }) => theme.secondary}40;
      border: 1px solid ${({ theme }) => theme.border};
      border-radius: 8px;
      font-size: 12px;
      color: ${({ theme }) => theme.foreground};

      svg {
        color: ${({ theme }) => theme.primary};
        flex-shrink: 0;
      }
    }
  }

  .timeline-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
    position: relative;
    padding-left: 24px;

    &::before {
      content: "";
      position: absolute;
      left: 7px;
      top: 8px;
      bottom: 8px;
      width: 2px;
      background-color: ${({ theme }) => theme.border};
    }

    .timeline-item {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 6px;

      .timeline-dot {
        position: absolute;
        left: -24px;
        top: 4px;
        width: 16px;
        height: 16px;
        border-radius: 50%;
        background-color: ${({ theme }) => theme.card};
        border: 2px solid ${({ theme }) => theme.primary};
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .timeline-header {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 12px;

        .author {
          font-weight: 700;
          color: ${({ theme }) => theme.foreground};
        }

        .time {
          color: ${({ theme }) => theme["muted-foreground"]};
          font-size: 11px;
        }
      }

      .timeline-action {
        font-size: 13px;
        color: ${({ theme }) => theme.foreground};
        font-weight: 500;
      }

      .timeline-comment {
        background-color: ${({ theme }) => theme.sidebar};
        border: 1px solid ${({ theme }) => theme.border};
        border-radius: 8px;
        padding: 10px 12px;
        font-size: 12px;
        color: ${({ theme }) => theme["card-foreground"]};
        line-height: 1.5;
        margin-top: 4px;
      }
    }
  }

  .comment-input-area {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: ${({ theme }) => theme.sidebar};
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 10px;
    padding: 14px;

    textarea {
      background-color: ${({ theme }) => theme.card};
      border: 1px solid ${({ theme }) => theme.border};
      border-radius: 8px;
      padding: 10px 12px;
      color: ${({ theme }) => theme.foreground};
      font-size: 13px;
      resize: vertical;
      min-height: 70px;
      outline: none;
      font-family: inherit;

      &:focus {
        border-color: ${({ theme }) => theme.primary};
      }

      &::placeholder {
        color: ${({ theme }) => theme["muted-foreground"]};
      }
    }

    .comment-actions {
      display: flex;
      justify-content: flex-end;

      button {
        background-color: ${({ theme }) => theme.primary};
        color: ${({ theme }) => theme["primary-foreground"]};
        border: none;
        border-radius: 6px;
        padding: 8px 16px;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 6px;
        transition: all 0.2s ease;

        &:hover {
          background-color: ${({ theme }) => theme["primary-hover"]};
        }

        &:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      }
    }
  }
`;

export const ModalFooter = styled.div<themeType>`
  padding: 16px 28px;
  border-top: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.sidebar};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;

  .footer-status-select {
    display: flex;
    align-items: center;
    gap: 10px;

    span {
      font-size: 12px;
      font-weight: 600;
      color: ${({ theme }) => theme["muted-foreground"]};
    }

    .status-buttons {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;

      button {
        background-color: ${({ theme }) => theme.card};
        border: 1px solid ${({ theme }) => theme.border};
        color: ${({ theme }) => theme["muted-foreground"]};
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease;

        &:hover {
          color: ${({ theme }) => theme.foreground};
          border-color: ${({ theme }) => theme.primary};
        }

        &.active {
          background-color: ${({ theme }) => theme.primary};
          color: ${({ theme }) => theme["primary-foreground"]};
          border-color: ${({ theme }) => theme.primary};
        }
      }
    }
  }

  .footer-actions {
    display: flex;
    align-items: center;
    gap: 10px;

    .btn-close {
      background-color: ${({ theme }) => theme.card};
      border: 1px solid ${({ theme }) => theme.border};
      color: ${({ theme }) => theme.foreground};
      padding: 8px 18px;
      border-radius: 8px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background-color: ${({ theme }) => theme.muted};
      }
    }
  }
`;
