"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileUploadZone, StoredDocument, DocCategory } from "@/components/paperwork/FileUploadZone";
import { DocumentList } from "@/components/paperwork/DocumentList";
import { FolderOpen, FileText, Lock } from "lucide-react";
import Link from "next/link";

const VAULT_KEY = "cbn_documents";

export default function VaultPage() {
  const [documents, setDocuments] = useState<StoredDocument[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(VAULT_KEY);
    if (stored) setDocuments(JSON.parse(stored));
  }, []);

  const saveDocuments = (docs: StoredDocument[]) => {
    setDocuments(docs);
    localStorage.setItem(VAULT_KEY, JSON.stringify(docs));
  };

  const handleFilesAdded = (files: File[]) => {
    const newDocs: StoredDocument[] = files.map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      type: file.type,
      category: "other" as DocCategory,
      addedAt: new Date().toISOString(),
    }));
    saveDocuments([...documents, ...newDocs]);
  };

  const handleDelete = (id: string) => {
    saveDocuments(documents.filter((d) => d.id !== id));
  };

  const handleCategoryChange = (id: string, category: DocCategory) => {
    saveDocuments(
      documents.map((d) => (d.id === id ? { ...d, category } : d))
    );
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <FolderOpen className="h-4 w-4" />
            Document Vault
          </div>
          <h1 className="text-3xl font-bold">Import Document Vault</h1>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            Upload and organize all your import documents in one secure place.
            Categorize titles, bills of lading, invoices, and export certificates.
          </p>
        </div>

        <div className="space-y-6">
          <FileUploadZone onFilesAdded={handleFilesAdded} />

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Your Documents ({documents.length})
              </h2>
            </div>
            <DocumentList
              documents={documents}
              onDelete={handleDelete}
              onCategoryChange={handleCategoryChange}
            />
          </Card>

          {/* E-Signature Placeholder */}
          <Card className="p-6 border-dashed">
            <div className="text-center">
              <Lock className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
              <h3 className="font-semibold">E-Signature & Power of Attorney</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
                Digitally sign customs declarations and Power of Attorney documents
                so port agents can clear cargo on your behalf.
              </p>
              <p className="text-xs text-muted-foreground mt-3">Coming soon</p>
            </div>
          </Card>

          <div className="text-center">
            <Link href="/paperwork">
              <Button variant="outline">
                Back to Declaration Generator
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
