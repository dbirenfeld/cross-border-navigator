"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepIndicatorProps {
  steps: string[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="mb-8">
      {/* Mobile: compact pill with step count */}
      <div className="flex sm:hidden items-center justify-center gap-3 mb-2">
        <span className="text-sm font-medium text-muted-foreground">
          Step {Math.min(currentStep + 1, steps.length)} of {steps.length}
        </span>
        <span className="text-sm font-semibold text-primary">
          {steps[currentStep] ?? "Complete"}
        </span>
      </div>
      <div className="flex sm:hidden gap-1 px-4">
        {steps.map((_, index) => (
          <div
            key={index}
            className={cn(
              "h-1.5 rounded-full flex-1 transition-all",
              index < currentStep
                ? "bg-primary"
                : index === currentStep
                ? "bg-primary/50"
                : "bg-muted"
            )}
          />
        ))}
      </div>

      {/* Desktop: full step circles */}
      <div className="hidden sm:flex items-center justify-center w-full">
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
                  "text-xs mt-1.5 font-medium",
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
                  "w-12 lg:w-20 h-0.5 mx-2",
                  index < currentStep ? "bg-primary" : "bg-muted"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
