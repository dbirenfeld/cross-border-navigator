"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Loader2 } from "lucide-react";
import { isValidVin } from "@/lib/feasibility/vin-decoder";

interface VinInputProps {
  onDecode: (vin: string) => void;
  isLoading: boolean;
}

export function VinInput({ onDecode, isLoading }: VinInputProps) {
  const [vin, setVin] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = vin.trim().toUpperCase();
    if (!isValidVin(cleaned)) {
      setError("Please enter a valid 17-character VIN (no I, O, or Q)");
      return;
    }
    setError("");
    onDecode(cleaned);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="vin-input">Vehicle Identification Number (VIN)</Label>
        <div className="flex gap-2">
          <Input
            id="vin-input"
            value={vin}
            onChange={(e) => {
              setVin(e.target.value.toUpperCase());
              setError("");
            }}
            placeholder="e.g. 1HGCG5655WA006001"
            maxLength={17}
            className="font-mono text-sm sm:text-lg tracking-wide sm:tracking-wider"
          />
          <Button type="submit" disabled={isLoading || vin.length !== 17}>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <p className="text-xs text-muted-foreground">
          Enter the 17-character VIN found on the dashboard or driver&apos;s door frame
        </p>
      </div>
    </form>
  );
}
