import { getAnalyticsData, getFinanceSummary } from "@/lib/db";
import { TrendingUp, TrendingDown, DollarSign, Briefcase, Receipt, FolderPlus, HandCoins, Users, Percent, BarChart3 } from "lucide-react";
import RevenueChart from "@/components/admin/RevenueChart";
import IncomeExpenseChart from "@/components/admin/IncomeExpenseChart";
import ProjectStatusChart from "@/components/admin/ProjectStatusChart";
import PrintButton from "@/components/admin/PrintButton";
import RefreshButton from "@/components/admin/RefreshButton";

export const metadata = { title: "Analytics | Admin" };
export const dynamic = "force-dynamic";

function StatCard({ icon, label, value, sub, color }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
  color: string;
}) {
  return (
    <div className="glass-card p-4 print:border print:border-gray-300">
      <div className="flex items-center gap-2 mb-2">
        <span className={color}>{icon}</span>
        <span className="text-xs text-slate-400 print:text-gray-600">{label}</span>
      </div>
      <p className="text-lg font-bold text-white print:text-black">{value}</p>
      {sub && <p className="text-xs text-slate-500 print:text-gray-500">{sub}</p>}
    </div>
  );
}

export default async function AnalyticsPage() {
  const [analytics, summary] = await Promise.all([
    getAnalyticsData(),
    getFinanceSummary(),
  ]);

  const { projectStats, monthlyData, consultationStats } = analytics;

  const profitMargin = summary.totalIncomeBdt > 0
    ? Math.round((summary.profitBdt / summary.totalIncomeBdt) * 100) : 0;
  const completionRate = projectStats.total > 0
    ? Math.round((projectStats.completed / projectStats.total) * 100) : 0;
  const budgetUtilization = projectStats.totalBudgetBdt > 0
    ? Math.round((projectStats.totalEarnedBdt / projectStats.totalBudgetBdt) * 100) : 0;

  return (
    <div className="print:bg-white print:text-black">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white print:text-black">Analytics</h1>
          <p className="text-slate-400 mt-1 print:text-gray-600">Company performance overview</p>
        </div>
        <div className="flex items-center gap-3">
          <RefreshButton />
          <PrintButton />
        </div>
      </div>

      {/* ── Consultation Funnel ── */}
      <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3 print:text-gray-600">Consultation Pipeline</h2>
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatCard icon={<Users className="w-4 h-4" />} label="Total Requests" value={String(consultationStats.total)} sub={`${consultationStats.pending} pending`} color="text-cyan-400" />
        <StatCard icon={<BarChart3 className="w-4 h-4" />} label="Reviewed" value={String(consultationStats.reviewed)} color="text-blue-400" />
        <StatCard icon={<FolderPlus className="w-4 h-4" />} label="Converted to Project" value={String(consultationStats.converted)} sub={`${consultationStats.conversionRate}% conversion rate`} color="text-emerald-400" />
        <StatCard icon={<TrendingUp className="w-4 h-4" />} label="Completed" value={String(consultationStats.completed)} color="text-emerald-400" />
        <StatCard icon={<TrendingDown className="w-4 h-4" />} label="Cancelled" value={String(consultationStats.cancelled)} color="text-red-400" />
      </div>

      {/* ── Finance Overview (same numbers as Finance page) ── */}
      <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3 print:text-gray-600">Finance Overview</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="glass-card p-4 print:border print:border-gray-300">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-slate-400">Total Income</span>
          </div>
          <p className="text-lg font-bold text-white print:text-black">৳{summary.totalIncomeBdt.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
          <p className="text-xs text-slate-500">${summary.totalIncomeUsd.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
          {summary.serviceChargeTotalBdt > 0 && (
            <p className="text-[10px] text-slate-500 mt-1">Incl. ৳{summary.serviceChargeTotalBdt.toLocaleString()} service charges</p>
          )}
        </div>
        <div className="glass-card p-4 print:border print:border-gray-300">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-red-400" />
            <span className="text-xs text-slate-400">Total Expenses</span>
          </div>
          <p className="text-lg font-bold text-white print:text-black">৳{summary.totalExpenseBdt.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
          <p className="text-xs text-slate-500">${summary.totalExpenseUsd.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="glass-card p-4 print:border print:border-gray-300">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-cyan-400" />
            <span className="text-xs text-slate-400">Net Profit</span>
          </div>
          <p className={`text-lg font-bold ${summary.profitBdt >= 0 ? "text-emerald-400" : "text-red-400"}`}>
            ৳{summary.profitBdt.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-slate-500">${summary.profitUsd.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
        </div>
        <StatCard icon={<Percent className="w-4 h-4" />} label="Profit Margin" value={`${profitMargin}%`} sub={profitMargin >= 0 ? "Healthy" : "Loss"} color={profitMargin >= 0 ? "text-emerald-400" : "text-red-400"} />
      </div>

      {/* Budget vs Earned Row (aligned with Finance + Projects) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<Briefcase className="w-4 h-4" />} label="Total Budget" value={`৳${projectStats.totalBudgetBdt.toLocaleString()}`} sub={`$${projectStats.totalBudgetUsd.toLocaleString()}`} color="text-amber-400" />
        <StatCard icon={<HandCoins className="w-4 h-4" />} label="Total Earned" value={`৳${projectStats.totalEarnedBdt.toLocaleString()}`} sub={`$${projectStats.totalEarnedUsd.toLocaleString()}`} color="text-emerald-400" />
        <StatCard icon={<Receipt className="w-4 h-4" />} label="Service Charges" value={`৳${projectStats.totalServiceCharges.toLocaleString()}`} sub={`From ${projectStats.projectBreakdown.filter((p: any) => p.serviceCharges > 0).length} projects`} color="text-violet-400" />
        <StatCard icon={<Percent className="w-4 h-4" />} label="Budget Utilization" value={`${budgetUtilization}%`} sub="Earned vs allocated" color="text-cyan-400" />
      </div>

      {/* ── Project Stats ── */}
      <h2 className="text-sm font-medium text-slate-400 uppercase tracking-wider mb-3 print:text-gray-600">Project Metrics</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<Briefcase className="w-4 h-4" />} label="Total Projects" value={String(projectStats.total)} sub={`${completionRate}% completion rate`} color="text-cyan-400" />
        <StatCard icon={<Briefcase className="w-4 h-4" />} label="Manual Projects" value={String(projectStats.manualCount)} color="text-blue-400" />
        <StatCard icon={<FolderPlus className="w-4 h-4" />} label="From Consultations" value={String(projectStats.consultationCount)} color="text-emerald-400" />
        <StatCard icon={<TrendingUp className="w-4 h-4" />} label="In Progress" value={String(projectStats.inProgress)} sub={`${projectStats.cancelled} cancelled`} color="text-blue-400" />
      </div>

      {/* ── Charts ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="glass-card p-6 print:border print:border-gray-300">
          <h3 className="text-sm font-medium text-slate-300 mb-4 print:text-gray-700">Revenue Trend</h3>
          <RevenueChart monthlyData={monthlyData} />
        </div>
        <div className="glass-card p-6 print:border print:border-gray-300">
          <h3 className="text-sm font-medium text-slate-300 mb-4 print:text-gray-700">Income vs Expenses</h3>
          <IncomeExpenseChart monthlyData={monthlyData} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="glass-card p-6 print:border print:border-gray-300">
          <h3 className="text-sm font-medium text-slate-300 mb-4 print:text-gray-700">Project Status Breakdown</h3>
          <div className="max-w-xs mx-auto">
            <ProjectStatusChart projectStats={projectStats} />
          </div>
        </div>

        {/* Monthly Summary — columns are clear and non-overlapping */}
        <div className="glass-card p-6 print:border print:border-gray-300">
          <h3 className="text-sm font-medium text-slate-300 mb-4 print:text-gray-700">Monthly Summary</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 print:border-gray-300">
                  <th className="text-left py-2 text-slate-400 print:text-gray-600">Month</th>
                  <th className="text-right py-2 text-slate-400 print:text-gray-600">Txn Income</th>
                  <th className="text-right py-2 text-violet-400 print:text-violet-600">Svc Chg</th>
                  <th className="text-right py-2 text-emerald-400 print:text-emerald-600">Total</th>
                  <th className="text-right py-2 text-red-400 print:text-red-600">Expense</th>
                  <th className="text-right py-2 text-cyan-400 print:text-cyan-600">Profit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 print:divide-gray-200">
                {monthlyData.map((m) => {
                  const txnIncome = m.incomeBdt - m.serviceChargesBdt;
                  const profit = m.incomeBdt - m.expenseBdt;
                  return (
                    <tr key={m.label}>
                      <td className="py-2 text-slate-300 print:text-gray-700">{m.label}</td>
                      <td className="py-2 text-right text-slate-300 print:text-gray-700">৳{txnIncome.toLocaleString()}</td>
                      <td className="py-2 text-right text-violet-300 print:text-violet-700">৳{m.serviceChargesBdt.toLocaleString()}</td>
                      <td className="py-2 text-right text-emerald-400 font-medium print:text-emerald-700">৳{m.incomeBdt.toLocaleString()}</td>
                      <td className="py-2 text-right text-red-300 print:text-red-700">৳{m.expenseBdt.toLocaleString()}</td>
                      <td className={`py-2 text-right font-medium ${profit >= 0 ? "text-emerald-400" : "text-red-400"}`}>৳{profit.toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Project Breakdown Table ── */}
      <div className="glass-card p-6 print:border print:border-gray-300">
        <h3 className="text-sm font-medium text-slate-300 mb-4 print:text-gray-700">Project Financial Breakdown</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 print:border-gray-300">
                <th className="text-left px-3 py-2 text-xs font-medium text-slate-400 uppercase tracking-wider">Project</th>
                <th className="text-left px-3 py-2 text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                <th className="text-left px-3 py-2 text-xs font-medium text-slate-400 uppercase tracking-wider hidden sm:table-cell">Source</th>
                <th className="text-right px-3 py-2 text-xs font-medium text-slate-400 uppercase tracking-wider">Budget (৳)</th>
                <th className="text-right px-3 py-2 text-xs font-medium text-slate-400 uppercase tracking-wider">Earned (৳)</th>
                <th className="text-right px-3 py-2 text-xs font-medium text-slate-400 uppercase tracking-wider hidden sm:table-cell">Svc Charges (৳)</th>
                <th className="text-right px-3 py-2 text-xs font-medium text-slate-400 uppercase tracking-wider hidden sm:table-cell">Spent (৳)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 print:divide-gray-200">
              {projectStats.projectBreakdown.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-3 py-8 text-center text-slate-500 text-sm">No projects found.</td>
                </tr>
              ) : (
                projectStats.projectBreakdown.map((p: any) => (
                  <tr key={p.id} className="hover:bg-white/5 transition-colors print:hover:bg-transparent">
                    <td className="px-3 py-2 text-white font-medium print:text-black">{p.name}</td>
                    <td className="px-3 py-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border capitalize ${
                        p.status === "completed" ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" :
                        p.status === "in_progress" ? "bg-blue-500/20 text-blue-400 border-blue-500/30" :
                        p.status === "pending" ? "bg-amber-500/20 text-amber-400 border-amber-500/30" :
                        "bg-red-500/20 text-red-400 border-red-500/30"
                      }`}>{p.status.replace("_", " ")}</span>
                    </td>
                    <td className="px-3 py-2 text-slate-400 capitalize hidden sm:table-cell">{p.source}</td>
                    <td className="px-3 py-2 text-right text-amber-300 font-medium">৳{p.budgetBdt.toLocaleString()}</td>
                    <td className={`px-3 py-2 text-right font-medium ${p.earnedBdt > 0 ? "text-emerald-400" : "text-slate-500"}`}>৳{p.earnedBdt.toLocaleString()}</td>
                    <td className={`px-3 py-2 text-right font-medium hidden sm:table-cell ${p.serviceCharges > 0 ? "text-violet-400" : "text-slate-500"}`}>৳{p.serviceCharges.toLocaleString()}</td>
                    <td className={`px-3 py-2 text-right font-medium hidden sm:table-cell ${p.spentBdt > 0 ? "text-red-400" : "text-slate-500"}`}>৳{p.spentBdt.toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
            {projectStats.projectBreakdown.length > 0 && (
              <tfoot>
                <tr className="border-t border-white/10 print:border-gray-300">
                  <td colSpan={3} className="px-3 py-2 text-sm font-bold text-white print:text-black">Total</td>
                  <td className="px-3 py-2 text-right text-sm font-bold text-amber-300">৳{projectStats.totalBudgetBdt.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right text-sm font-bold text-emerald-400">৳{projectStats.totalEarnedBdt.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right text-sm font-bold text-violet-400 hidden sm:table-cell">৳{projectStats.totalServiceCharges.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right text-sm font-bold text-red-400 hidden sm:table-cell">
                    ৳{projectStats.projectBreakdown.reduce((s: number, p: any) => s + p.spentBdt, 0).toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
