import styled from "styled-components";

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
  border: 2px dashed ${(props) => (props.$isDragOver ? "#3b82f6" : "rgba(255, 255, 255, 0.15)")};
  background: ${(props) => (props.$isDragOver ? "rgba(59, 130, 246, 0.1)" : "rgba(255, 255, 255, 0.02)")};
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

const ResultCard = styled.div<{ $isSuccess: boolean }>`
  padding: 14px 16px;
  border-radius: 6px;
  font-size: 0.88rem;
  background: ${(props) => (props.$isSuccess ? "rgba(16, 185, 129, 0.12)" : "rgba(239, 68, 68, 0.12)")};
  border: 1px solid ${(props) => (props.$isSuccess ? "#10b981" : "#ef4444")};
  color: ${(props) => (props.$isSuccess ? "#6ee7b7" : "#fca5a5")};
  display: flex;
  align-items: flex-start;
  gap: 10px;

  svg {
    font-size: 1.2rem;
    flex-shrink: 0;
    margin-top: 2px;
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
    ModalCard
}