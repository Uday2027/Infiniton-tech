"use client";

import { useState, FormEvent } from "react";
import { X, Loader2 } from "lucide-react";
import type { ServiceCharge, Project } from "@/lib/db";

export default function ServiceChargeForm({
  charge,
  projects,
  onClose,
}: {
  charge: ServiceCharge | null;
  projects: Project[];
  onClose: () => void;
}) {
  const isEdit = !!charge;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    projectId: charge?.projectId?.toString() || (projects[0]?.id?.toString() ?? ""),
    amount: charge?.amount?.toString() || "",
    chargeDate: charge?.chargeDate
      ? new Date(charge.chargeDate).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    description: charge?.description || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        projectId: parseInt(form.projectId, 10),
        amount: parseFloat(form.amount) || 0,
        chargeDate: form.chargeDate ? new Date(form.chargeDate).toISOString() : undefined,
        description: form.description || undefined,
      };

      const url = isEdit
        ? `/api/admin/service-charges/${charge.id}`
        : "/api/admin/service-charges";
      const method = isEdit ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to save.");
        return;
      }

      onClose();
    } catch {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 text-sm";

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-heading font-bold text-white">
            {isEdit ? "Edit Service Charge" : "Add Service Charge"}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">Project *</label>
            <select name="projectId" value={form.projectId} onChange={handleChange} className={inputClass} required>
              {projects.map((p) => (
                <option key={p.id} value={p.id} className="bg-navy-950">{p.name}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Amount (৳) *</label>
              <input name="amount" type="number" step="0.01" value={form.amount} onChange={handleChange} className={inputClass} placeholder="0.00" required />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Date *</label>
              <input name="chargeDate" type="date" value={form.chargeDate} onChange={handleChange} className={inputClass} required />
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={2} className={inputClass} placeholder="Optional description" />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl border border-white/10 text-slate-400 hover:text-white text-sm transition-all">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-sm font-medium transition-all disabled:opacity-50 flex items-center gap-2">
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isEdit ? "Update" : "Add"} Service Charge
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
