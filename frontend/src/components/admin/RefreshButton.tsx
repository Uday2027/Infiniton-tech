"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";

export default function RefreshButton() {
  const router = useRouter();
  const [spinning, setSpinning] = useState(false);

  const handleRefresh = () => {
    setSpinning(true);
    router.refresh();
    setTimeout(() => setSpinning(false), 800);
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={spinning}
      className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-slate-400 hover:text-white hover:border-white/20 text-sm transition-all disabled:opacity-50"
      title="Refresh data"
    >
      <RefreshCw className={`w-4 h-4 ${spinning ? "animate-spin" : ""}`} />
      Refresh
    </button>
  );
}
