"use client";

import React, { useState, useRef } from "react";
import styled from "styled-components";
import { FiUploadCloud, FiX, FiCheckCircle, FiAlertCircle, FiDownload, FiFileText } from "react-icons/fi";
import { importVulnerabilitiesCsv } from "@/api/vulnerabilities";

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
`;

interface ImportCsvModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess?: () => void;
}

export default function ImportCsvModal({ isOpen, onClose, onImportSuccess }: ImportCsvModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const dropped = e.dataTransfer.files[0];
      if (dropped.name.endsWith(".csv")) {
        setFile(dropped);
        setResult(null);
      } else {
        setResult({ success: false, message: "Por favor, selecione um arquivo no formato .CSV" });
      }
    }
  };

  const handleDownloadTemplate = () => {
    const csvContent =
      "Title,Description,CVE,CveScore,CvssVersion,CvssVector,Severity\n" +
      '"Execução remota de código no Apache Struts","Falha crítica permitindo RCE via OGNL","CVE-2023-50164",9.8,3.1,"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H","Crítica"\n' +
      '"Injeção de SQL no endpoint de autenticação","Parâmetro username vulnerável a boolean-based blind SQLi","CVE-2024-21413",8.8,3.1,"CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:H","Alta"\n' +
      '"Cross-Site Scripting (XSS) refletido","Vulnerabilidade XSS na barra de busca de agências","CVE-2024-3094",6.1,3.1,"CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N","Média"\n' +
      '"Criptografia fraca em cookies de sessão","Cookie sem atributo Secure e SameSite incorreto","CVE-2023-38545",3.5,3.1,"CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:L/I:N/A:N","Baixa"';

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "modelo_vulnerabilidades.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    const res = await importVulnerabilitiesCsv(formData);
    setIsUploading(false);

    if (res.success && res.data) {
      setResult({
        success: true,
        message: `Importação concluída! ${res.data.imported} vulnerabilidade(s) importada(s) e classificadas automaticamente com sucesso.`,
      });
      setFile(null);
      if (onImportSuccess) onImportSuccess();
    } else {
      setResult({
        success: false,
        message: res.error || "Erro ao processar o relatório CSV. Verifique o layout do arquivo.",
      });
    }
  };

  return (
    <Overlay onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <Header>
          <h3>Importar Relatório de Vulnerabilidades (CSV)</h3>
          <button onClick={onClose} aria-label="Fechar">
            <FiX />
          </button>
        </Header>

        <Body>
          <p style={{ margin: 0, fontSize: "0.9rem", color: "#94a3b8" }}>
            O sistema fará a normalização dos dados e a <strong>classificação automática de risco</strong>, calculando prioridade e prazos de SLA segundo as diretrizes de instituições financeiras.
          </p>

          <DropArea
            $isDragOver={isDragOver}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <FiUploadCloud />
            <p>Arraste e solte o arquivo CSV do scanner aqui</p>
            <span>ou clique para selecionar do seu computador (máx. 10MB)</span>
            <input
              type="file"
              ref={fileInputRef}
              accept=".csv"
              style={{ display: "none" }}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setFile(e.target.files[0]);
                  setResult(null);
                }
              }}
            />
          </DropArea>

          {file && (
            <FileInfo>
              <div className="name">
                <FiFileText color="#3b82f6" />
                <span>{file.name} ({(file.size / 1024).toFixed(1)} KB)</span>
              </div>
              <button className="remove" onClick={() => setFile(null)}>
                Remover
              </button>
            </FileInfo>
          )}

          {result && (
            <ResultCard $isSuccess={result.success}>
              {result.success ? <FiCheckCircle /> : <FiAlertCircle />}
              <div>{result.message}</div>
            </ResultCard>
          )}
        </Body>

        <Footer>
          <button className="template-btn" onClick={handleDownloadTemplate}>
            <FiDownload />
            Baixar modelo CSV
          </button>

          <div className="actions">
            <button className="cancel" onClick={onClose}>
              Fechar
            </button>
            <button
              className="submit"
              onClick={handleUpload}
              disabled={!file || isUploading}
            >
              {isUploading ? "Processando..." : "Classificar e Importar"}
            </button>
          </div>
        </Footer>
      </ModalCard>
    </Overlay>
  );
}
