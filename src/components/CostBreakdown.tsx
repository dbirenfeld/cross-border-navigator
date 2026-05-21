"use client";

import { CalculationResult } from "@/types";
import { formatCurrency } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  DollarSign,
  Ship,
  Shield,
  Landmark,
  Receipt,
  Anchor,
  Wrench,
  FileText,
  Clock,
  AlertTriangle,
} from "lucide-react";

interface CostBreakdownProps {
  result: CalculationResult;
}

export function CostBreakdown({ result }: CostBreakdownProps) {
  const { breakdown, totalLandedCost, cifValue, estimatedTransitDays } = result;
  const totalModifications = breakdown.modifications.reduce(
    (sum, mod) => sum + mod.amount,
    0
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">Your Estimated Landed Cost</h2>
        <p className="text-muted-foreground mt-1">
          Complete cost breakdown for your import
        </p>
      </div>

      <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
        <div className="text-center">
          <p className="text-sm text-muted-foreground uppercase tracking-wide font-medium">
            Total Estimated Landed Cost
          </p>
          <p className="text-4xl font-bold text-primary mt-2">
            {formatCurrency(totalLandedCost)}
          </p>
          <div className="flex items-center justify-center gap-2 mt-3">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Estimated transit: {estimatedTransitDays.min}-{estimatedTransitDays.max} days
            </span>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Cost Breakdown</h3>

        <div className="space-y-3">
          <CostRow
            icon={<DollarSign className="h-4 w-4" />}
            label="Base Item Price"
            amount={breakdown.basePrice}
          />

          <CostRow
            icon={<Ship className="h-4 w-4" />}
            label={`International Shipping (${result.input.shippingMethod === "roro" ? "RoRo" : "Container"})`}
            amount={breakdown.shipping}
          />

          <CostRow
            icon={<Shield className="h-4 w-4" />}
            label="Marine Insurance (1.5% CIF)"
            amount={breakdown.insurance}
          />

          <Separator className="my-2" />

          <div className="flex justify-between items-center text-sm py-1 text-muted-foreground">
            <span className="font-medium">CIF Value</span>
            <span>{formatCurrency(cifValue)}</span>
          </div>

          <Separator className="my-2" />

          <CostRow
            icon={<Landmark className="h-4 w-4" />}
            label="Customs Duty"
            amount={breakdown.customsDuty}
          />

          {breakdown.purchaseTax > 0 && (
            <CostRow
              icon={<Landmark className="h-4 w-4" />}
              label="Purchase Tax"
              amount={breakdown.purchaseTax}
            />
          )}

          <CostRow
            icon={<Receipt className="h-4 w-4" />}
            label="VAT"
            amount={breakdown.vat}
          />

          <CostRow
            icon={<Anchor className="h-4 w-4" />}
            label="Port Handling & Clearance"
            amount={breakdown.portHandling}
          />

          {breakdown.modifications.length > 0 && (
            <>
              <Separator className="my-2" />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">
                    Required Modifications
                  </span>
                  <Badge variant="secondary" className="ml-auto">
                    {formatCurrency(totalModifications)}
                  </Badge>
                </div>
                {breakdown.modifications.map((mod) => (
                  <div
                    key={mod.label}
                    className="flex justify-between items-center text-sm pl-6 text-muted-foreground"
                  >
                    <span>{mod.label}</span>
                    <span>{formatCurrency(mod.amount)}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          <CostRow
            icon={<FileText className="h-4 w-4" />}
            label="Documentation & Processing"
            amount={breakdown.documentation}
          />
        </div>

        <Separator className="my-4" />

        <div className="flex justify-between items-center font-bold text-lg">
          <span>Total Landed Cost</span>
          <span className="text-primary">{formatCurrency(totalLandedCost)}</span>
        </div>
      </Card>

      <Card className="p-4 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30">
        <div className="flex gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800 dark:text-amber-300">Disclaimer</p>
            <p className="text-xs text-amber-700 dark:text-amber-400 mt-1">{result.disclaimer}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function CostRow({
  icon,
  label,
  amount,
}: {
  icon: React.ReactNode;
  label: string;
  amount: number;
}) {
  return (
    <div className="flex justify-between items-center text-sm py-1">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">{icon}</span>
        <span>{label}</span>
      </div>
      <span className="font-medium">{formatCurrency(amount)}</span>
    </div>
  );
}
