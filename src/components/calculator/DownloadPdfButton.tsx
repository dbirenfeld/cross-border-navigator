"use client";

import { useState } from "react";
import { pdf } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { CalculationResult } from "@/types";
import { PdfReport } from "./PdfReport";

interface DownloadPdfButtonProps {
  result: CalculationResult;
}

export function DownloadPdfButton({ result }: DownloadPdfButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const blob = await pdf(<PdfReport result={result} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `import-estimate-${result.input.destinationCountry}-${Date.now()}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button onClick={handleDownload} disabled={isGenerating} variant="outline">
      {isGenerating ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <Download className="h-4 w-4 mr-2" />
      )}
      {isGenerating ? "Generating PDF..." : "Download PDF Report"}
    </Button>
  );
}
