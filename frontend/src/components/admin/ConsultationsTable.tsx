"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, Filter, FolderPlus, Check } from "lucide-react";
import type { ConsultationRequest, Project } from "@/lib/db";
import Pagination from "@/components/admin/Pagination";
import DetailModal from "@/components/admin/DetailModal";
import ProjectForm from "@/components/admin/ProjectForm";

const statuses = ["all", "pending", "reviewed", "completed", "cancelled"];

export default function ConsultationsTable({
  data,
  total,
  page,
  totalPages,
  currentStatus,
  convertedIds = [],
}: {
  data: ConsultationRequest[];
  total: number;
  page: number;
  totalPages: number;
  currentStatus?: string;
  convertedIds?: number[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<ConsultationRequest | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [convertingId, setConvertingId] = useState<number | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const convertedSet = new Set(convertedIds);

  const handleConvertToProject = async (id: number) => {
    if (!confirm("Convert this consultation into a project? You'll be able to set the budget right after.")) return;
    setConvertingId(id);
    try {
      const res = await fetch("/api/admin/projects/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ consultationId: id }),
      });
      if (res.ok) {
        const { data: project } = await res.json();
        setEditingProject(project);
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Failed to convert.");
      }
    } finally {
      setConvertingId(null);
    }
  };

  const handleStatusFilter = (status: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (status === "all") {
      params.delete("status");
    } else {
      params.set("status", status);
    }
    params.delete("page");
    const url = `?${params.toString()}`;
    router.push(url);
    router.refresh();
  };

  const handleStatusUpdate = async (id: number, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/consultations/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        router.refresh();
      }
    } finally {
      setUpdatingId(null);
    }
  };

  const handleView = async (id: number) => {
    const res = await fetch(`/api/admin/consultations/${id}`);
    if (res.ok) {
      const { data } = await res.json();
      setSelected(data);
    }
  };

  return (
    <>
      {/* Status Filters */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        <Filter className="w-4 h-4 text-slate-400" />
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => handleStatusFilter(status)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
              (status === "all" && !currentStatus) ||
              status === currentStatus
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                : "text-slate-400 hover:text-white border border-white/10 hover:border-white/20"
            }`}
          >
            {status}
          </button>
        ))}
        <span className="text-xs text-slate-500 ml-2">
          {total} total
        </span>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider hidden md:table-cell">
                  Email
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider hidden lg:table-cell">
                  Project Type
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider hidden lg:table-cell">
                  Budget
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider hidden sm:table-cell">
                  Date
                </th>
                <th className="text-right px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-slate-500 text-sm"
                  >
                    No consultations found.
                  </td>
                </tr>
              ) : (
                data.map((item) => {
                  const isConverted = convertedSet.has(item.id);
                  return (
                    <tr
                      key={item.id}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-4 py-3 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-white">{item.name}</span>
                          {isConverted && (
                            <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              <Check className="w-2.5 h-2.5" />
                              Project
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-400 hidden md:table-cell">
                        {item.email}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-400 hidden lg:table-cell">
                        {item.project_type}
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-400 hidden lg:table-cell">
                        {item.budget}
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={item.status}
                          onChange={(e) =>
                            handleStatusUpdate(item.id, e.target.value)
                          }
                          disabled={updatingId === item.id}
                          className="bg-transparent text-xs rounded-lg border border-white/10 px-2 py-1 text-slate-300 focus:outline-none focus:ring-1 focus:ring-cyan-500/50 disabled:opacity-50"
                        >
                          {statuses
                            .filter((s) => s !== "all")
                            .map((s) => (
                              <option
                                key={s}
                                value={s}
                                className="bg-navy-950"
                              >
                                {s}
                              </option>
                            ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-500 hidden sm:table-cell">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleView(item.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {isConverted ? (
                            <span
                              className="p-1.5 rounded-lg text-emerald-500/50 cursor-default"
                              title="Already converted to project"
                            >
                              <Check className="w-4 h-4" />
                            </span>
                          ) : (
                            <button
                              onClick={() => handleConvertToProject(item.id)}
                              disabled={convertingId === item.id}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-all disabled:opacity-50"
                              title="Convert to project"
                            >
                              <FolderPlus className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Pagination page={page} totalPages={totalPages} />

      {selected && (
        <DetailModal
          data={selected}
          type="consultation"
          onClose={() => setSelected(null)}
        />
      )}

      {editingProject && (
        <ProjectForm
          project={editingProject}
          onClose={() => {
            setEditingProject(null);
            router.refresh();
          }}
        />
      )}
    </>
  );
}
