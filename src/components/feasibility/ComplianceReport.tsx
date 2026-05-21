"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ComplianceItem } from "@/lib/feasibility/compliance";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

interface ComplianceReportProps {
  items: ComplianceItem[];
  legalityResult: { allowed: boolean; warnings: string[]; notes: string };
}

export function ComplianceReport({ items, legalityResult }: ComplianceReportProps) {
  const passCount = items.filter((i) => i.status === "pass").length;
  const warnCount = items.filter((i) => i.status === "warning").length;
  const failCount = items.filter((i) => i.status === "fail").length;
  const totalEstCost = items.reduce((sum, i) => {
    if (i.estimatedCost && i.status !== "pass") {
      return sum + Math.round((i.estimatedCost.min + i.estimatedCost.max) / 2);
    }
    return sum;
  }, 0);

  return (
    <div className="space-y-4">
      {/* Legality Check */}
      <Card className={`p-4 ${legalityResult.allowed
        ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30"
        : "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30"}`}
      >
        <div className="flex items-center gap-3">
          {legalityResult.allowed ? (
            <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400" />
          ) : (
            <XCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
          )}
          <div>
            <p className={`font-semibold ${legalityResult.allowed ? "text-green-800 dark:text-green-300" : "text-red-800 dark:text-red-300"}`}>
              {legalityResult.allowed ? "Import Permitted" : "Import Not Permitted"}
            </p>
            <p className="text-sm text-muted-foreground">{legalityResult.notes}</p>
          </div>
        </div>
        {legalityResult.warnings.map((w, i) => (
          <p key={i} className="text-sm text-red-700 dark:text-red-400 mt-2 ml-9">{w}</p>
        ))}
      </Card>

      {/* Summary */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h3 className="font-semibold">Compliance Summary</h3>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="secondary" className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
              {passCount} Pass
            </Badge>
            <Badge variant="secondary" className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200">
              {warnCount} Action Needed
            </Badge>
            {failCount > 0 && (
              <Badge variant="secondary" className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
                {failCount} Fail
              </Badge>
            )}
          </div>
        </div>
        {totalEstCost > 0 && (
          <p className="text-sm text-muted-foreground mt-2">
            Estimated compliance cost: {formatCurrency(totalEstCost)}
          </p>
        )}
      </Card>

      {/* Detailed Items */}
      <Card className="p-4 space-y-3">
        <h3 className="font-semibold">Detailed Compliance Check</h3>
        <Separator />
        {items.map((item) => (
          <div key={item.id} className="flex items-start gap-3 py-2">
            <div className="mt-0.5">
              {item.status === "pass" && <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />}
              {item.status === "warning" && <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />}
              {item.status === "fail" && <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">{item.description}</p>
                <Badge variant="outline" className="text-xs ml-2 shrink-0">
                  {item.category}
                </Badge>
              </div>
              {item.action && (
                <p className="text-xs text-muted-foreground mt-1">{item.action}</p>
              )}
              {item.estimatedCost && item.status !== "pass" && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  Est. cost: {formatCurrency(item.estimatedCost.min)} - {formatCurrency(item.estimatedCost.max)}
                </p>
              )}
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}
