"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StoredDocument, DocCategory } from "./FileUploadZone";
import { FileText, Trash2, File } from "lucide-react";

const CATEGORY_LABELS: Record<DocCategory, string> = {
  title: "Vehicle Title",
  bill_of_lading: "Bill of Lading",
  invoice: "Invoice",
  insurance: "Insurance",
  export_cert: "Export Certificate",
  other: "Other",
};

interface DocumentListProps {
  documents: StoredDocument[];
  onDelete: (id: string) => void;
  onCategoryChange: (id: string, category: DocCategory) => void;
}

export function DocumentList({ documents, onDelete, onCategoryChange }: DocumentListProps) {
  if (documents.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">No documents uploaded yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {documents.map((doc) => (
        <Card key={doc.id} className="p-3 flex items-center gap-3">
          <File className="h-8 w-8 text-muted-foreground shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{doc.name}</p>
            <p className="text-xs text-muted-foreground">
              {(doc.size / 1024).toFixed(1)} KB | Added {new Date(doc.addedAt).toLocaleDateString()}
            </p>
          </div>
          <select
            value={doc.category}
            onChange={(e) => onCategoryChange(doc.id, e.target.value as DocCategory)}
            className="text-xs border rounded px-2 py-1 bg-background"
          >
            {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7 text-muted-foreground hover:text-destructive shrink-0"
            onClick={() => onDelete(doc.id)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </Card>
      ))}
    </div>
  );
}
