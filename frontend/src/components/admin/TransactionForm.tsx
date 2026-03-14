"use client";

import { useState, FormEvent } from "react";
import { X, Loader2 } from "lucide-react";
import type { Transaction, Project } from "@/lib/db";

const categories = [
  "Project Payment",
  "Freelance",
  "Subscription",
  "Salary",
  "Office Rent",
  "Utilities",
  "Software/Tools",
  "Marketing",
  "Hardware",
  "Travel",
  "Miscellaneous",
];

export default function TransactionForm({
  transaction,
  projects,
  onClose,
}: {
  transaction: Transaction | null;
  projects?: Project[];
  onClose: () => void;
}) {
  const isEdit = !!transaction;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    type: transaction?.type || "income",
    category: transaction?.category || categories[0],
    description: transaction?.description || "",
    amount_bdt: transaction?.amount_bdt?.toString() || "0",
    amount_usd: transaction?.amount_usd?.toString() || "0",
    project_id: transaction?.project_id?.toString() || "",
    date: transaction?.date || new Date().toISOString().split("T")[0],
    payment_method: transaction?.payment_method || "",
    reference: transaction?.reference || "",
    notes: transaction?.notes || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const payload = {
        ...form,
        amount_bdt: parseFloat(form.amount_bdt) || 0,
        amount_usd: parseFloat(form.amount_usd) || 0,
        project_id: form.project_id ? parseInt(form.project_id) : null,
      };

      const url = isEdit ? `/api/admin/transactions/${transaction.id}` : "/api/admin/transactions";
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
            {isEdit ? "Edit Transaction" : "Add Transaction"}
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Type *</label>
              <select name="type" value={form.type} onChange={handleChange} className={inputClass}>
                <option value="income" className="bg-navy-950">Income</option>
                <option value="expense" className="bg-navy-950">Expense</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Category *</label>
              <select name="category" value={form.category} onChange={handleChange} className={inputClass}>
                {categories.map((c) => (
                  <option key={c} value={c} className="bg-navy-950">{c}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">Project</label>
            <select name="project_id" value={form.project_id} onChange={handleChange} className={inputClass}>
              <option value="" className="bg-navy-950">None (Manual)</option>
              {(projects || []).map((p) => (
                <option key={p.id} value={p.id} className="bg-navy-950">{p.name} — {p.client_name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">Description</label>
            <input name="description" value={form.description} onChange={handleChange} className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Amount BDT (৳) *</label>
              <input name="amount_bdt" type="number" step="0.01" value={form.amount_bdt} onChange={handleChange} className={inputClass} required />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Amount USD ($) *</label>
              <input name="amount_usd" type="number" step="0.01" value={form.amount_usd} onChange={handleChange} className={inputClass} required />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Date *</label>
              <input name="date" type="date" value={form.date} onChange={handleChange} className={inputClass} required />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Payment Method</label>
              <input name="payment_method" value={form.payment_method} onChange={handleChange} className={inputClass} placeholder="e.g., Bank Transfer, Cash" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">Reference</label>
            <input name="reference" value={form.reference} onChange={handleChange} className={inputClass} placeholder="Invoice/receipt number" />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">Notes</label>
            <textarea name="notes" value={form.notes} onChange={handleChange} rows={2} className={inputClass} />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl border border-white/10 text-slate-400 hover:text-white text-sm transition-all">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-sm font-medium transition-all disabled:opacity-50 flex items-center gap-2">
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isEdit ? "Update" : "Add"} Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
