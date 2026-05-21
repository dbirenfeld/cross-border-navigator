"use client";

import { CalculationResult } from "@/types";
import { CostBreakdown } from "@/components/CostBreakdown";
import { HomologationWarnings } from "@/components/calculator/HomologationWarnings";
import { LeadCapture } from "@/components/calculator/LeadCapture";
import { DownloadPdfButton } from "@/components/calculator/DownloadPdfButton";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface ResultsStepProps {
  result: CalculationResult | null;
  isLoading: boolean;
  onReset: () => void;
}

export function ResultsStep({ result, isLoading, onReset }: ResultsStepProps) {
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
        <Button onClick={onReset} variant="outline">
          <RotateCcw className="h-4 w-4 mr-2" />
          Calculate Another
        </Button>
      </div>

      <LeadCapture />
    </div>
  );
}
