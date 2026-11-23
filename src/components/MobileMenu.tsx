"use client";

import { useState } from "react";

import CmsNav from "@/components/cms/CmsNav";
import { Menu, X } from "lucide-react";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-lg p-2 text-foreground hover:bg-muted"
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <div className="fixed inset-x-0 top-20 z-40 border-b border-border bg-background px-6 py-4 shadow-lg">
          <nav className="flex flex-col gap-4">
            <CmsNav kind="header" className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground" onNavigate={() => setOpen(false)} />
            </nav>
          </div>
      )}
    </div>
  );
}
