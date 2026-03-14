import { listProjects, getProjectStats } from "@/lib/db";
import ProjectsTable from "@/components/admin/ProjectsTable";
import { Briefcase, HandCoins, Receipt, TrendingUp } from "lucide-react";
import RefreshButton from "@/components/admin/RefreshButton";

export const metadata = { title: "Projects | Admin" };
export const dynamic = "force-dynamic";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: { status?: string; source?: string; page?: string };
}) {
  const status = searchParams.status || undefined;
  const source = searchParams.source || undefined;
  const page = parseInt(searchParams.page || "1", 10);
  const [result, stats] = await Promise.all([
    listProjects({ status, source, page, limit: 15 }),
    getProjectStats(),
  ]);

  // Build per-project financial map for the table
  const financialMap: Record<number, { serviceCharges: number; earnedBdt: number; spentBdt: number }> = {};
  for (const p of stats.projectBreakdown) {
    financialMap[p.id] = {
      serviceCharges: p.serviceCharges,
      earnedBdt: p.earnedBdt,
      spentBdt: p.spentBdt,
    };
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">
            Projects
          </h1>
          <p className="text-slate-400 mt-1">Manage all projects</p>
        </div>
        <RefreshButton />
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-slate-400">Total Budget</span>
          </div>
          <p className="text-lg font-bold text-white">৳{stats.totalBudgetBdt.toLocaleString()}</p>
          <p className="text-xs text-slate-500">${stats.totalBudgetUsd.toLocaleString()}</p>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-slate-400">Total Earned</span>
          </div>
          <p className="text-lg font-bold text-white">৳{stats.totalEarnedBdt.toLocaleString()}</p>
          <p className="text-xs text-slate-500">${stats.totalEarnedUsd.toLocaleString()}</p>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Receipt className="w-4 h-4 text-violet-400" />
            <span className="text-xs text-slate-400">Service Charges</span>
          </div>
          <p className="text-lg font-bold text-white">৳{stats.totalServiceCharges.toLocaleString()}</p>
          <p className="text-xs text-slate-500">From {stats.projectBreakdown.filter((p: any) => p.serviceCharges > 0).length} projects</p>
        </div>
        <div className="glass-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <HandCoins className="w-4 h-4 text-amber-400" />
            <span className="text-xs text-slate-400">Avg Budget/Project</span>
          </div>
          <p className="text-lg font-bold text-white">
            ৳{stats.total > 0 ? Math.round(stats.totalBudgetBdt / stats.total).toLocaleString() : 0}
          </p>
          <p className="text-xs text-slate-500">
            ${stats.total > 0 ? Math.round(stats.totalBudgetUsd / stats.total).toLocaleString() : 0}
          </p>
        </div>
      </div>

      <ProjectsTable
        data={result.data}
        total={result.total}
        page={result.page}
        totalPages={result.totalPages}
        currentStatus={status}
        currentSource={source}
        financialMap={financialMap}
      />
    </div>
  );
}
