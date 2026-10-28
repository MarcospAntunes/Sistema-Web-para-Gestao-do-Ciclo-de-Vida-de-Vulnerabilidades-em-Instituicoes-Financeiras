import styled from "styled-components";
import { Tone } from "./ImportCsvModal.type";

const toneColors: Record<Tone, { bg: string; border: string; text: string }> = {
  success: {
    bg: "rgba(16, 185, 129, 0.12)",
    border: "#10b981",
    text: "#6ee7b7",
  },
  warning: {
    bg: "rgba(245, 158, 11, 0.12)",
    border: "#f59e0b",
    text: "#fcd34d",
  },
  error: { bg: "rgba(239, 68, 68, 0.12)", border: "#ef4444", text: "#fca5a5" },
};

const Overlay = styled.div`
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

const ModalCard = styled.div`
  background: #121824;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  width: 100%;
  max-width: 540px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  color: #fff;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  h3 {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 600;
  }

  button {
    background: transparent;
    border: none;
    color: #94a3b8;
    cursor: pointer;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    &:hover {
      color: #fff;
    }
  }
`;

const Body = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DropArea = styled.div<{ $isDragOver: boolean }>`
  border: 2px dashed
    ${(props) => (props.$isDragOver ? "#3b82f6" : "rgba(255, 255, 255, 0.15)")};
  background: ${(props) =>
    props.$isDragOver
      ? "rgba(59, 130, 246, 0.1)"
      : "rgba(255, 255, 255, 0.02)"};
  border-radius: 8px;
  padding: 32px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #3b82f6;
    background: rgba(59, 130, 246, 0.05);
  }

  svg {
    font-size: 2.5rem;
    color: #3b82f6;
    margin-bottom: 12px;
  }

  p {
    margin: 0;
    font-size: 0.95rem;
    color: #cbd5e1;
  }

  span {
    display: block;
    margin-top: 6px;
    font-size: 0.8rem;
    color: #64748b;
  }
`;

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.05);
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 0.9rem;

  .name {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #e2e8f0;
  }

  .remove {
    background: transparent;
    border: none;
    color: #ef4444;
    cursor: pointer;
  }
`;

const ResultCard = styled.div<{ $tone: Tone }>`
  padding: 14px 16px;
  border-radius: 6px;
  font-size: 0.88rem;
  background: ${(props) => toneColors[props.$tone].bg};
  border: 1px solid ${(props) => toneColors[props.$tone].border};
  color: ${(props) => toneColors[props.$tone].text};
  display: flex;
  flex-direction: column;
  gap: 10px;

  .headline {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-weight: 600;

    svg {
      font-size: 1.2rem;
      flex-shrink: 0;
      margin-top: 1px;
    }
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;

    .stat {
      background: rgba(0, 0, 0, 0.25);
      border-radius: 6px;
      padding: 8px 10px;
      display: flex;
      flex-direction: column;
      gap: 2px;

      strong {
        font-size: 1.1rem;
        color: #fff;
      }

      span {
        font-size: 0.72rem;
        color: #cbd5e1;
      }
    }
  }

  details {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 6px;
    padding: 8px 10px;

    summary {
      cursor: pointer;
      font-weight: 600;
    }

    ul {
      margin: 8px 0 0;
      padding-left: 18px;
      max-height: 160px;
      overflow-y: auto;
      color: #e2e8f0;
      font-size: 0.8rem;
      line-height: 1.5;
    }
  }
`;

const Footer = styled.div`
  padding: 16px 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap-reverse;

  .template-btn {
    background: transparent;
    border: none;
    color: #60a5fa;
    font-size: 0.85rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    &:hover {
      text-decoration: underline;
    }
  }

  .actions {
    display: flex;
    gap: 12px;

    button {
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 0.9rem;
      cursor: pointer;
      font-weight: 500;
      transition: all 0.2s;
    }

    .cancel {
      background: transparent;
      border: 1px solid rgba(255, 255, 255, 0.2);
      color: #cbd5e1;
      &:hover {
        background: rgba(255, 255, 255, 0.05);
      }
    }

    .submit {
      background: #2563eb;
      border: none;
      color: #fff;
      &:hover {
        background: #1d4ed8;
      }
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }

  @media screen and (max-width: 780px) {
    justify-content: center;
    gap: 12px;
  }
`;

export {
  Body,
  DropArea,
  FileInfo,
  Footer,
  Header,
  Overlay,
  ResultCard,
  ModalCard,
};
