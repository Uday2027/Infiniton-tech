"use client";

import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:border-white/20 text-sm transition-all print:hidden"
    >
      <Printer className="w-4 h-4" />
      Print Report
    </button>
  );
}
