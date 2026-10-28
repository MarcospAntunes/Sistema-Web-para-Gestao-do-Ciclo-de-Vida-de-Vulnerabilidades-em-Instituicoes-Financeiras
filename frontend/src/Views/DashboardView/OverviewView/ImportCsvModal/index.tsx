"use client";

import React, { useState, useRef } from "react";
import { importVulnerabilitiesCsv } from "@/api/vulnerabilities";
import {
  ImportSummary,
  ImportCsvModalProps,
  Tone,
} from "./ImportCsvModal.type";
import {
  FiUploadCloud,
  FiX,
  FiCheckCircle,
  FiAlertCircle,
  FiDownload,
  FiFileText,
  FiAlertTriangle,
} from "react-icons/fi";
import {
  Body,
  DropArea,
  FileInfo,
  Footer,
  Header,
  ModalCard,
  Overlay,
  ResultCard,
} from "./ImportCsvModal.style";

const MAX_FILE_BYTES = 10 * 1024 * 1024;

export default function ImportCsvModal({
  isOpen,
  onClose,
  onImportSuccess,
}: ImportCsvModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [result, setResult] = useState<ImportSummary | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const showError = (message: string) => {
    setResult({ tone: "error", headline: message, errors: [], warnings: [] });
  };
  const acceptFile = (candidate: File) => {
    if (!candidate.name.toLowerCase().endsWith(".csv")) {
      showError("Por favor, selecione um arquivo no formato .CSV");
      return;
    }
    if (candidate.size > MAX_FILE_BYTES) {
      showError(
        "O arquivo excede o limite de 10 MB. Divida o relatório em partes menores.",
      );
      return;
    }
    setFile(candidate);
    setResult(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      acceptFile(e.dataTransfer.files[0]);
    }
  };

  const handleDownloadTemplate = () => {
    const csvContent =
      "\uFEFF" +
      "Title,Description,CVE,CveScore,CvssVersion,CvssVector,Severity,Asset,AssetEnvironment,AssetCriticality,Exposure\n" +
      '"Execução remota de código no Apache Struts","Falha crítica permitindo RCE via OGNL","CVE-2023-50164",9.8,3.1,"CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H","Crítica","api-pagamentos-01","Produção","Crítica","Internet"\n' +
      '"Injeção de SQL no endpoint de autenticação","Parâmetro username vulnerável a boolean-based blind SQLi","CVE-2024-21413",8.8,3.1,"CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:H","Alta","gateway-transacoes","Produção","Alta","Rede interna"\n' +
      '"Cross-Site Scripting (XSS) refletido","Vulnerabilidade XSS na barra de busca de agências","CVE-2024-3094",6.1,3.1,"CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N","Média","portal-agencias","Homologação","Média","Internet"\n' +
      '"Criptografia fraca em cookies de sessão","Cookie sem atributo Secure e SameSite incorreto","CVE-2023-38545",3.5,3.1,"CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:U/C:L/I:N/A:N","Baixa","intranet-rh","Produção","Baixa","Isolado"';

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "modelo_vulnerabilidades.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    const res = await importVulnerabilitiesCsv(formData);
    setIsUploading(false);

    if (!res.success || !res.data) {
      showError(
        res.error ||
          "Erro ao processar o relatório CSV. Verifique o layout do arquivo.",
      );
      return;
    }

    const data = res.data;
    const imported: number = data.imported ?? 0;
    const duplicates: number = data.duplicates ?? 0;
    const skipped: number = data.skipped ?? 0;
    const errors: string[] = data.errors ?? [];
    const warnings: string[] = data.warnings ?? [];

    let tone: Tone;
    let headline: string;

    if (imported === 0) {
      if (duplicates > 0 && skipped === 0) {
        tone = "warning";
        headline = `Nenhuma vulnerabilidade nova: ${
          duplicates === 1
            ? "a linha já existia"
            : `as ${duplicates} linhas já existiam`
        } em aberto.`;
      } else if (duplicates > 0) {
        tone = "warning";
        headline = `Nenhuma vulnerabilidade nova: ${duplicates} ${
          duplicates === 1 ? "linha já existia" : "linhas já existiam"
        } em aberto e ${skipped} ${skipped === 1 ? "foi rejeitada" : "foram rejeitadas"}.`;
      } else {
        tone = "error";
        headline =
          skipped > 0
            ? `Nenhuma vulnerabilidade foi importada: ${
                skipped === 1
                  ? "a linha foi rejeitada"
                  : `as ${skipped} linhas foram rejeitadas`
              }. Veja os detalhes abaixo.`
            : "Nenhuma vulnerabilidade foi importada. Veja os detalhes abaixo.";
      }
    } else if (skipped > 0 || duplicates > 0 || warnings.length > 0) {
      tone = "warning";
      headline = `Importação concluída com avisos: ${imported} vulnerabilidade(s) importada(s) e classificada(s) automaticamente.`;
    } else {
      tone = "success";
      headline = `Importação concluída! ${imported} vulnerabilidade(s) importada(s) e classificada(s) automaticamente.`;
    }

    setResult({
      tone,
      headline,
      stats: {
        total: data.totalRows ?? imported + duplicates + skipped,
        imported,
        duplicates,
        skipped,
      },
      errors,
      warnings,
    });

    if (imported > 0) {
      setFile(null);
      if (onImportSuccess) onImportSuccess();
    }
  };

  const ResultIcon =
    result?.tone === "success"
      ? FiCheckCircle
      : result?.tone === "warning"
        ? FiAlertTriangle
        : FiAlertCircle;

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
            O sistema normaliza os dados e faz a{" "}
            <strong>classificação automática de risco</strong>: a severidade vem
            do score CVSS, e a prioridade e o prazo de SLA consideram também a
            criticidade do ativo e a exposição. Aceita separador vírgula, ponto
            e vírgula ou tab, e datas em dd/MM/aaaa ou aaaa-MM-dd.
            Vulnerabilidades já abertas com o mesmo CVE e ativo são ignoradas.
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
            <span>
              ou clique para selecionar do seu computador (máx. 10MB, até 5.000
              linhas)
            </span>
            <input
              type="file"
              ref={fileInputRef}
              accept=".csv"
              style={{ display: "none" }}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  acceptFile(e.target.files[0]);
                }
                e.target.value = "";
              }}
            />
          </DropArea>

          {file && (
            <FileInfo>
              <div className="name">
                <FiFileText color="#3b82f6" />
                <span>
                  {file.name} ({(file.size / 1024).toFixed(1)} KB)
                </span>
              </div>
              <button className="remove" onClick={() => setFile(null)}>
                Remover
              </button>
            </FileInfo>
          )}

          {result && (
            <ResultCard $tone={result.tone}>
              <div className="headline">
                <ResultIcon />
                <div>{result.headline}</div>
              </div>

              {result.stats && (
                <div className="stats">
                  <div className="stat">
                    <strong>{result.stats.total}</strong>
                    <span>linhas lidas</span>
                  </div>
                  <div className="stat">
                    <strong>{result.stats.imported}</strong>
                    <span>importadas</span>
                  </div>
                  <div className="stat">
                    <strong>{result.stats.duplicates}</strong>
                    <span>duplicadas</span>
                  </div>
                  <div className="stat">
                    <strong>{result.stats.skipped}</strong>
                    <span>rejeitadas</span>
                  </div>
                </div>
              )}

              {result.errors.length > 0 && (
                <details open={result.tone === "error"}>
                  <summary>Linhas rejeitadas ({result.errors.length})</summary>
                  <ul>
                    {result.errors.map((message, index) => (
                      <li key={`e-${index}`}>{message}</li>
                    ))}
                  </ul>
                </details>
              )}

              {result.warnings.length > 0 && (
                <details>
                  <summary>
                    Avisos e duplicadas ({result.warnings.length})
                  </summary>
                  <ul>
                    {result.warnings.map((message, index) => (
                      <li key={`w-${index}`}>{message}</li>
                    ))}
                  </ul>
                </details>
              )}
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
