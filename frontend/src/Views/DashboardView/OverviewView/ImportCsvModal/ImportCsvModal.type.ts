type Tone = "success" | "warning" | "error";

interface ImportCsvModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImportSuccess?: () => void;
}

interface ImportSummary {
  tone: Tone;
  headline: string;
  stats?: {
    total: number;
    imported: number;
    duplicates: number;
    skipped: number;
  };
  errors: string[];
  warnings: string[];
}

export type { ImportCsvModalProps, ImportSummary, Tone };
