"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, Plus, Pencil, Trash2 } from "lucide-react";
import type { Transaction, Project } from "@/lib/db";
import Pagination from "@/components/admin/Pagination";
import TransactionForm from "@/components/admin/TransactionForm";

const types = ["all", "income", "expense"];

export default function TransactionsTable({
  data,
  total,
  page,
  totalPages,
  currentType,
  projects,
}: {
  data: Transaction[];
  total: number;
  page: number;
  totalPages: number;
  currentType?: string;
  projects?: Project[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const projectMap: Record<number, string> = {};
  for (const p of projects || []) {
    projectMap[p.id] = p.name;
  }

  const handleTypeFilter = (type: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (type === "all") {
      params.delete("type");
    } else {
      params.set("type", type);
    }
    params.delete("page");
    const url = `?${params.toString()}`;
    router.push(url);
    router.refresh();
  };

  const handleEdit = async (id: number) => {
    const res = await fetch(`/api/admin/transactions/${id}`);
    if (res.ok) {
      const { data } = await res.json();
      setEditingTransaction(data);
      setShowForm(true);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this transaction?")) return;
    const res = await fetch(`/api/admin/transactions/${id}`, { method: "DELETE" });
    if (res.ok) router.refresh();
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingTransaction(null);
    router.refresh();
  };

  return (
    <>
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <button
          onClick={() => { setEditingTransaction(null); setShowForm(true); }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white text-sm font-medium transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Transaction
        </button>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          {types.map((type) => (
            <button
              key={type}
              onClick={() => handleTypeFilter(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all ${
                (type === "all" && !currentType) || type === currentType
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                  : "text-slate-400 hover:text-white border border-white/10 hover:border-white/20"
              }`}
            >
              {type}
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
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Date</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Type</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider hidden lg:table-cell">Description</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider hidden md:table-cell">Project</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">BDT (৳)</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider hidden sm:table-cell">USD ($)</th>
                <th className="text-right px-4 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-slate-500 text-sm">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-sm text-slate-400">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        item.type === "income"
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                          : "bg-red-500/20 text-red-400 border-red-500/30"
                      }`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-400 hidden md:table-cell">{item.category}</td>
                    <td className="px-4 py-3 text-sm text-slate-400 hidden lg:table-cell truncate max-w-[200px]">
                      {item.description}
                    </td>
                    <td className="px-4 py-3 text-sm hidden md:table-cell">
                      {item.project_id && projectMap[item.project_id] ? (
                        <span className="text-cyan-400">{projectMap[item.project_id]}</span>
                      ) : (
                        <span className="text-slate-500">—</span>
                      )}
                    </td>
                    <td className={`px-4 py-3 text-sm text-right font-medium ${
                      item.type === "income" ? "text-emerald-400" : "text-red-400"
                    }`}>
                      {item.type === "income" ? "+" : "-"}৳{Number(item.amount_bdt).toLocaleString()}
                    </td>
                    <td className={`px-4 py-3 text-sm text-right font-medium hidden sm:table-cell ${
                      item.type === "income" ? "text-emerald-400" : "text-red-400"
                    }`}>
                      {item.type === "income" ? "+" : "-"}${Number(item.amount_usd).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleEdit(item.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"
                          title="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
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
        <TransactionForm
          transaction={editingTransaction}
          projects={projects}
          onClose={handleFormClose}
        />
      )}
    </>
  );
}
