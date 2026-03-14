"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { ServiceCharge, Project } from "@/lib/db";
import Pagination from "@/components/admin/Pagination";
import ServiceChargeForm from "@/components/admin/ServiceChargeForm";

export default function ServiceChargesTable({
  data,
  total,
  page,
  totalPages,
  projects,
}: {
  data: ServiceCharge[];
  total: number;
  page: number;
  totalPages: number;
  projects: Project[];
}) {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [editingCharge, setEditingCharge] = useState<ServiceCharge | null>(null);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this service charge?")) return;
    const res = await fetch(`/api/admin/service-charges/${id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingCharge(null);
    router.refresh();
  };

  const getProjectName = (projectId: number) => {
    return projects.find((p) => p.id === projectId)?.name || "Unknown Project";
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <button
          onClick={() => { setEditingCharge(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-sm font-medium transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Service Charge
        </button>
        <span className="text-xs text-slate-500">{total} total</span>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Project</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Amount (৳)</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Date</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider hidden md:table-cell">Description</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-500 text-sm">
                    No service charges found.
                  </td>
                </tr>
              ) : (
                data.map((charge) => (
                  <tr key={charge.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-sm text-white font-medium">
                      {getProjectName(charge.projectId)}
                    </td>
                    <td className="px-4 py-3 text-sm text-right font-medium text-cyan-400">
                      ৳{Number(charge.amount).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-400">
                      {new Date(charge.chargeDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-400 hidden md:table-cell truncate max-w-[200px]">
                      {charge.description || "-"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => { setEditingCharge(charge); setShowForm(true); }}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(charge.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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
        <ServiceChargeForm
          charge={editingCharge}
          projects={projects}
          onClose={handleFormClose}
        />
      )}
    </>
  );
}
