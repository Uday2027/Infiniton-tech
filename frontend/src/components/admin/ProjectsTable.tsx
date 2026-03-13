"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, Filter, Plus, ArrowRightLeft } from "lucide-react";
import type { Project } from "@/lib/db";
import StatusBadge from "@/components/admin/StatusBadge";
import Pagination from "@/components/admin/Pagination";
import ProjectForm from "@/components/admin/ProjectForm";

const statuses = ["all", "pending", "in_progress", "completed", "cancelled"];
const sources = ["all", "manual", "consultation"];

export default function ProjectsTable({
  data,
  total,
  page,
  totalPages,
  currentStatus,
  currentSource,
}: {
  data: Project[];
  total: number;
  page: number;
  totalPages: number;
  currentStatus?: string;
  currentSource?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    params.delete("page");
    router.push(`?${params.toString()}`);
  };

  const handleStatusUpdate = async (id: number, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/projects/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) router.refresh();
    } finally {
      setUpdatingId(null);
    }
  };

  const handleView = async (id: number) => {
    const res = await fetch(`/api/admin/projects/${id}`);
    if (res.ok) {
      const { data } = await res.json();
      setEditingProject(data);
      setShowForm(true);
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingProject(null);
    router.refresh();
  };

  const formatCurrency = (bdt: number, usd: number) => {
    return `৳${bdt.toLocaleString()} / $${usd.toLocaleString()}`;
  };

  return (
    <>
      {/* Actions & Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <button
          onClick={() => { setEditingProject(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-sm font-medium transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => handleFilter("status", status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                (status === "all" && !currentStatus) || status === currentStatus
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  : "text-slate-400 hover:text-white border border-white/10 hover:border-white/20"
              }`}
            >
              {status.replace("_", " ")}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ArrowRightLeft className="w-4 h-4 text-slate-400" />
          {sources.map((source) => (
            <button
              key={source}
              onClick={() => handleFilter("source", source)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                (source === "all" && !currentSource) || source === currentSource
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  : "text-slate-400 hover:text-white border border-white/10 hover:border-white/20"
              }`}
            >
              {source}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-500">{total} total</span>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Name</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider hidden md:table-cell">Client</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider hidden lg:table-cell">Type</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider hidden lg:table-cell">Budget</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider hidden sm:table-cell">Source</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-500 text-sm">
                    No projects found.
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-sm text-white">{item.name}</td>
                    <td className="px-4 py-3 text-sm text-slate-400 hidden md:table-cell">{item.client_name}</td>
                    <td className="px-4 py-3 text-sm text-slate-400 hidden lg:table-cell">{item.project_type}</td>
                    <td className="px-4 py-3 text-sm text-slate-400 hidden lg:table-cell">
                      {formatCurrency(item.budget_bdt, item.budget_usd)}
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusUpdate(item.id, e.target.value)}
                        disabled={updatingId === item.id}
                        className="bg-transparent text-xs rounded-lg border border-white/10 px-2 py-1 text-slate-300 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 disabled:opacity-50"
                      >
                        {statuses.filter((s) => s !== "all").map((s) => (
                          <option key={s} value={s} className="bg-navy-950">
                            {s.replace("_", " ")}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <StatusBadge status={item.source} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleView(item.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"
                        title="View/Edit"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination page={page} totalPages={totalPages} />

      {showForm && (
        <ProjectForm
          project={editingProject}
          onClose={handleFormClose}
        />
      )}
    </>
  );
}
