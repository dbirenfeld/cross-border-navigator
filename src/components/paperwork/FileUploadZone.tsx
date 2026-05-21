"use client";

import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Upload, FileText } from "lucide-react";

export type DocCategory = "title" | "bill_of_lading" | "invoice" | "insurance" | "export_cert" | "other";

export interface StoredDocument {
  id: string;
  name: string;
  size: number;
  type: string;
  category: DocCategory;
  addedAt: string;
}

interface FileUploadZoneProps {
  onFilesAdded: (files: File[]) => void;
}

export function FileUploadZone({ onFilesAdded }: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragIn = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOut = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length) onFilesAdded(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length) onFilesAdded(files);
    e.target.value = "";
  };

  return (
    <Card
      className={`p-8 border-2 border-dashed transition-colors cursor-pointer ${
        isDragging
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/25 hover:border-primary/50"
      }`}
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <div className="text-center">
        <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
        <p className="font-medium">Drag & drop documents here</p>
        <p className="text-sm text-muted-foreground mt-1">
          or click to browse files
        </p>
        <p className="text-xs text-muted-foreground mt-3">
          Supports PDF, images, and common document formats
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileSelect}
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
      />
    </Card>
  );
}
