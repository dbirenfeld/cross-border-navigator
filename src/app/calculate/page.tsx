"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StepIndicator } from "@/components/calculator/StepIndicator";
import { ItemTypeStep } from "@/components/calculator/ItemTypeStep";
import { VehicleDetailsStep } from "@/components/calculator/VehicleDetailsStep";
import { OriginStep } from "@/components/calculator/OriginStep";
import { DestinationStep } from "@/components/calculator/DestinationStep";
import { trackEvent } from "@/lib/analytics";
import { ResultsStep } from "@/components/calculator/ResultsStep";
import { Header } from "@/components/Header";
import {
  ItemType,
  OriginCountry,
  DestinationCountry,
  ShippingMethod,
  CalculationResult,
} from "@/types";
import { ArrowLeft, ArrowRight, Calculator } from "lucide-react";

const STEPS = ["Item Type", "Details", "Origin", "Destination", "Results"];

interface FormData {
  itemType: ItemType | null;
  itemValue: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleTrim: string;
  vehicleFuelType: string;
  isOleh: boolean;
  originCountry: OriginCountry | "";
  originRegion: string;
  shippingMethod: ShippingMethod;
  destinationCountry: DestinationCountry | "";
  destinationCity: string;
}

const initialFormData: FormData = {
  itemType: null,
  itemValue: "",
  vehicleYear: "",
  vehicleMake: "",
  vehicleModel: "",
  vehicleTrim: "",
  vehicleFuelType: "gasoline",
  isOleh: false,
  originCountry: "",
  originRegion: "",
  shippingMethod: "roro",
  destinationCountry: "",
  destinationCity: "",
};

export default function CalculatePage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 0:
        return formData.itemType !== null;
      case 1:
        if (!formData.itemValue || Number(formData.itemValue) < 100) return false;
        if (formData.itemType === "vehicle") {
          return !!(formData.vehicleYear && formData.vehicleMake && formData.vehicleModel && formData.vehicleFuelType);
        }
        return true;
      case 2:
        return !!(formData.originCountry && formData.originRegion);
      case 3:
        return !!(formData.destinationCountry && formData.destinationCity);
      default:
        return false;
    }
  };

  const handleNext = async () => {
    trackEvent("calculator_step_completed", { step: currentStep });
    if (currentStep === 3) {
      await calculateCost();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setCurrentStep(0);
    setResult(null);
  };

  const calculateCost = async () => {
    setIsLoading(true);
    setCurrentStep(4);

    try {
      const response = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemType: formData.itemType,
          itemValue: Number(formData.itemValue),
          vehicleYear: formData.vehicleYear ? Number(formData.vehicleYear) : undefined,
          vehicleMake: formData.vehicleMake || undefined,
          vehicleModel: formData.vehicleModel || undefined,
          vehicleTrim: formData.vehicleTrim || undefined,
          vehicleFuelType: formData.vehicleFuelType || undefined,
          isOleh: formData.isOleh || undefined,
          originCountry: formData.originCountry,
          originRegion: formData.originRegion,
          destinationCountry: formData.destinationCountry,
          destinationCity: formData.destinationCity,
          shippingMethod: formData.shippingMethod,
        }),
      });

      if (!response.ok) throw new Error("Calculation failed");

      const data = await response.json();
      setResult(data);
      trackEvent("calculator_completed", {
        itemType: formData.itemType ?? "",
        destination: formData.destinationCountry,
        totalCost: data.totalLandedCost,
      });
    } catch {
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <StepIndicator steps={STEPS} currentStep={currentStep} />

        <Card className="p-6 sm:p-8">
          {currentStep === 0 && (
            <ItemTypeStep
              value={formData.itemType}
              onChange={(type) => updateField("itemType", type)}
            />
          )}

          {currentStep === 1 && (
            <VehicleDetailsStep
              itemType={formData.itemType!}
              itemValue={formData.itemValue}
              vehicleYear={formData.vehicleYear}
              vehicleMake={formData.vehicleMake}
              vehicleModel={formData.vehicleModel}
              vehicleTrim={formData.vehicleTrim}
              vehicleFuelType={formData.vehicleFuelType}
              onChange={updateField}
            />
          )}

          {currentStep === 2 && (
            <OriginStep
              originCountry={formData.originCountry}
              originRegion={formData.originRegion}
              shippingMethod={formData.shippingMethod}
              onChange={updateField}
            />
          )}

          {currentStep === 3 && (
            <DestinationStep
              destinationCountry={formData.destinationCountry}
              destinationCity={formData.destinationCity}
              isOleh={formData.isOleh}
              onChange={updateField}
              onToggleOleh={(value) => setFormData((prev) => ({ ...prev, isOleh: value }))}
            />
          )}

          {currentStep === 4 && (
            <ResultsStep
              result={result}
              isLoading={isLoading}
              onReset={handleReset}
            />
          )}

          {currentStep < 4 && (
            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button onClick={handleNext} disabled={!canProceed()}>
                {currentStep === 3 ? (
                  <>
                    <Calculator className="h-4 w-4 mr-2" />
                    Calculate Cost
                  </>
                ) : (
                  <>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          )}
        </Card>
      </main>
    </div>
  );
}
