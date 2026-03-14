"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, Filter } from "lucide-react";
import type { ContactMessage } from "@/lib/db";
import StatusBadge from "@/components/admin/StatusBadge";
import Pagination from "@/components/admin/Pagination";
import DetailModal from "@/components/admin/DetailModal";

const statuses = ["all", "unread", "read", "replied"];

export default function ContactsTable({
  data,
  total,
  page,
  totalPages,
  currentStatus,
}: {
  data: ContactMessage[];
  total: number;
  page: number;
  totalPages: number;
  currentStatus?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [updatingId, setUpdatingId] = useState<number | null>(null);

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
      const res = await fetch(`/api/admin/contacts/${id}/status`, {
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
    const res = await fetch(`/api/admin/contacts/${id}`);
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
                  Subject
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
                    colSpan={6}
                    className="px-4 py-8 text-center text-slate-500 text-sm"
                  >
                    No contacts found.
                  </td>
                </tr>
              ) : (
                data.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-white/5 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-white">
                      {item.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-400 hidden md:table-cell">
                      {item.email}
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-400 hidden lg:table-cell truncate max-w-[200px]">
                      {item.subject}
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
                      <button
                        onClick={() => handleView(item.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all"
                        title="View details"
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

      {selected && (
        <DetailModal
          data={selected}
          type="contact"
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
