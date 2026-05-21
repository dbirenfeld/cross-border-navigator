"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalculationResult } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { AlertTriangle, XCircle, Info, ShieldAlert } from "lucide-react";

interface HomologationWarningsProps {
  warnings: CalculationResult["homologationWarnings"];
}

export function HomologationWarnings({ warnings }: HomologationWarningsProps) {
  if (!warnings || warnings.length === 0) return null;

  const criticalCount = warnings.filter((w) => w.severity === "critical").length;
  const warningCount = warnings.filter((w) => w.severity === "warning").length;

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <ShieldAlert className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        <h3 className="font-semibold text-lg">Compliance Warnings</h3>
        <div className="flex gap-1.5 ml-auto">
          {criticalCount > 0 && (
            <Badge variant="secondary" className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs">
              {criticalCount} Critical
            </Badge>
          )}
          {warningCount > 0 && (
            <Badge variant="secondary" className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 text-xs">
              {warningCount} Warning
            </Badge>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {warnings.map((warning) => (
          <div
            key={warning.id}
            className={`flex items-start gap-3 p-3 rounded-lg border ${
              warning.severity === "critical"
                ? "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30"
                : warning.severity === "warning"
                ? "border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30"
                : "border-muted bg-muted/30"
            }`}
          >
            <div className="mt-0.5 shrink-0">
              {warning.severity === "critical" && <XCircle className="h-4 w-4 text-red-600 dark:text-red-400" />}
              {warning.severity === "warning" && <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />}
              {warning.severity === "info" && <Info className="h-4 w-4 text-muted-foreground" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="text-sm font-medium">{warning.title}</p>
                <Badge variant="outline" className="text-xs">{warning.category}</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{warning.description}</p>
              <p className="text-xs font-medium mt-1.5">{warning.action}</p>
              {warning.estimatedCost && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  Est. cost: {formatCurrency(warning.estimatedCost.min)} - {formatCurrency(warning.estimatedCost.max)}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
