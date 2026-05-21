"use client";

import Link from "next/link";
import { Ship } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Ship className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">CrossBorder Navigator</span>
        </Link>
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/calculate"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Calculator
          </Link>
          <Link
            href="/paperwork"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Paperwork
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            How It Works
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
