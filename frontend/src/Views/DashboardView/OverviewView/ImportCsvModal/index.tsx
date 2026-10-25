"use client";

import React, { useState, useRef } from "react";
import { importVulnerabilitiesCsv } from "@/api/vulnerabilities";
import ImportCsvModalProps from "./ImportCsvModal.type";
import { 
  FiUploadCloud, 
  FiX, 
  FiCheckCircle, 
  FiAlertCircle, 
  FiDownload, 
  FiFileText 
} from "react-icons/fi";
import { 
  Body, 
  DropArea, 
  FileInfo, 
  Footer, 
  Header, 
  ModalCard, 
  Overlay, 
  ResultCard 
} from "./ImportCsvModal.style";

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
