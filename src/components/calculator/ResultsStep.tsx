"use client";

import { useState } from "react";
import { CalculationResult } from "@/types";
import { CostBreakdown } from "@/components/CostBreakdown";
import { HomologationWarnings } from "@/components/calculator/HomologationWarnings";
import { DocumentPackageGenerator } from "@/components/calculator/DocumentPackageGenerator";
import { LeadCapture } from "@/components/calculator/LeadCapture";
import { DownloadPdfButton } from "@/components/calculator/DownloadPdfButton";
import { Button } from "@/components/ui/button";
import { RotateCcw, FileText } from "lucide-react";

interface ResultsStepProps {
  result: CalculationResult | null;
  isLoading: boolean;
  onReset: () => void;
}

export function ResultsStep({ result, isLoading, onReset }: ResultsStepProps) {
  const [showDocGen, setShowDocGen] = useState(false);
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin h-12 w-12 border-4 border-primary/30 border-t-primary rounded-full" />
        <p className="text-muted-foreground mt-4">Calculating your landed cost...</p>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          Something went wrong. Please try again.
        </p>
        <Button onClick={onReset} variant="outline" className="mt-4">
          <RotateCcw className="h-4 w-4 mr-2" />
          Start Over
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CostBreakdown result={result} />

      {result.homologationWarnings && result.homologationWarnings.length > 0 && (
        <HomologationWarnings warnings={result.homologationWarnings} />
      )}

      <div className="flex flex-col sm:flex-row justify-center gap-3">
        <DownloadPdfButton result={result} />
        <Button onClick={() => setShowDocGen(true)} variant="outline">
          <FileText className="h-4 w-4 mr-2" />
          Generate Paperwork
        </Button>
        <Button onClick={onReset} variant="outline">
          <RotateCcw className="h-4 w-4 mr-2" />
          Calculate Another
        </Button>
      </div>

      <LeadCapture />

      {showDocGen && (
        <DocumentPackageGenerator result={result} onClose={() => setShowDocGen(false)} />
      )}
    </div>
  );
}
