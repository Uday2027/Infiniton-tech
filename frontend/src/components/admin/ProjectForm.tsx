"use client";

import { useState, FormEvent } from "react";
import { X, Loader2 } from "lucide-react";
import type { Project } from "@/lib/db";

export default function ProjectForm({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const isEdit = !!project;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: project?.name || "",
    client_name: project?.client_name || "",
    client_email: project?.client_email || "",
    description: project?.description || "",
    project_type: project?.project_type || "Web Development",
    status: project?.status || "pending",
    budget_bdt: project?.budget_bdt?.toString() || "0",
    budget_usd: project?.budget_usd?.toString() || "0",
    start_date: project?.start_date || "",
    end_date: project?.end_date || "",
    notes: project?.notes || "",
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
        budget_bdt: parseFloat(form.budget_bdt) || 0,
        budget_usd: parseFloat(form.budget_usd) || 0,
        start_date: form.start_date || null,
        end_date: form.end_date || null,
      };

      const url = isEdit ? `/api/admin/projects/${project.id}` : "/api/admin/projects";
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
      <div className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-heading font-bold text-white">
            {isEdit ? "Edit Project" : "Add New Project"}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Project Name *</label>
              <input name="name" value={form.name} onChange={handleChange} className={inputClass} required />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Project Type *</label>
              <select name="project_type" value={form.project_type} onChange={handleChange} className={inputClass}>
                <option value="Web Development" className="bg-navy-950">Web Development</option>
                <option value="Mobile App" className="bg-navy-950">Mobile App</option>
                <option value="AI/ML" className="bg-navy-950">AI/ML</option>
                <option value="SaaS" className="bg-navy-950">SaaS</option>
                <option value="E-commerce" className="bg-navy-950">E-commerce</option>
                <option value="Automation" className="bg-navy-950">Automation</option>
                <option value="Consulting" className="bg-navy-950">Consulting</option>
                <option value="Other" className="bg-navy-950">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Client Name *</label>
              <input name="client_name" value={form.client_name} onChange={handleChange} className={inputClass} required />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Client Email</label>
              <input name="client_email" type="email" value={form.client_email} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Budget (BDT ৳)</label>
              <input name="budget_bdt" type="number" step="0.01" value={form.budget_bdt} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Budget (USD $)</label>
              <input name="budget_usd" type="number" step="0.01" value={form.budget_usd} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Start Date</label>
              <input name="start_date" type="date" value={form.start_date} onChange={handleChange} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">End Date</label>
              <input name="end_date" type="date" value={form.end_date} onChange={handleChange} className={inputClass} />
            </div>
            {isEdit && (
              <div>
                <label className="block text-sm text-slate-300 mb-1">Status</label>
                <select name="status" value={form.status} onChange={handleChange} className={inputClass}>
                  <option value="pending" className="bg-navy-950">Pending</option>
                  <option value="in_progress" className="bg-navy-950">In Progress</option>
                  <option value="completed" className="bg-navy-950">Completed</option>
                  <option value="cancelled" className="bg-navy-950">Cancelled</option>
                </select>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3} className={inputClass} />
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
              {isEdit ? "Update" : "Create"} Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
