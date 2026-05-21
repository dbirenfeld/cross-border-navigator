"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center w-full mb-8">
      {steps.map((step, index) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all",
                index < currentStep
                  ? "bg-primary border-primary text-primary-foreground"
                  : index === currentStep
                  ? "border-primary text-primary bg-primary/10"
                  : "border-muted text-muted-foreground"
              )}
            >
              {index < currentStep ? (
                <Check className="h-5 w-5" />
              ) : (
                index + 1
              )}
            </div>
            <span
              className={cn(
                "text-xs mt-1.5 font-medium hidden sm:block",
                index <= currentStep
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {step}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                "w-12 sm:w-20 h-0.5 mx-2",
                index < currentStep ? "bg-primary" : "bg-muted"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
