import { listTransactions, getFinanceSummary, listServiceCharges, listProjects, getProjectStats } from "@/lib/db";
import TransactionsTable from "@/components/admin/TransactionsTable";
import { TrendingUp, TrendingDown, DollarSign, Receipt, Briefcase, Percent } from "lucide-react";
import ServiceChargesTable from "@/components/admin/ServiceChargesTable";
import RefreshButton from "@/components/admin/RefreshButton";

export const metadata = { title: "Finance | Admin" };
export const dynamic = "force-dynamic";

function SummaryCard({
  label,
  bdt,
  usd,
  color,
  icon,
  subtitle,
}: {
  label: string;
  bdt: number;
  usd?: number;
  color: "green" | "red" | "blue" | "purple" | "amber";
  icon: React.ReactNode;
  subtitle?: string;
}) {
  const colorMap = {
    green: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    red: "bg-red-500/10 border-red-500/20 text-red-400",
    blue: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
    purple: "bg-violet-500/10 border-violet-500/20 text-violet-400",
    amber: "bg-amber-500/10 border-amber-500/20 text-amber-400",
  };

  return (
    <div className="glass-card p-6">
      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border ${colorMap[color]} mb-3`}>
        {icon}
      </div>
      <p className="text-sm text-slate-400 mb-1">{label}</p>
      <p className="text-xl font-bold text-white">৳{bdt.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
      {usd !== undefined && (
        <p className="text-sm text-slate-500">${usd.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
      )}
      {subtitle && (
        <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
      )}
    </div>
  );
}

export default async function FinancePage({
  searchParams,
}: {
  searchParams: { type?: string; category?: string; page?: string; startDate?: string; endDate?: string };
}) {
  const type = searchParams.type || undefined;
  const category = searchParams.category || undefined;
  const page = parseInt(searchParams.page || "1", 10);

  const [result, summary, serviceCharges, projects, projectStats] = await Promise.all([
    listTransactions({ type, category, page, limit: 15, startDate: searchParams.startDate, endDate: searchParams.endDate }),
    getFinanceSummary({ startDate: searchParams.startDate, endDate: searchParams.endDate }),
    listServiceCharges({ page: 1, limit: 10 }),
    listProjects({ limit: 100 }),
    getProjectStats(),
  ]);

  const profitMargin = summary.totalIncomeBdt > 0
    ? Math.round((summary.profitBdt / summary.totalIncomeBdt) * 100)
    : 0;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">Finance</h1>
          <p className="text-slate-400 mt-1">Track income, expenses, and project budgets</p>
        </div>
        <RefreshButton />
      </div>

      {/* Income / Expenses / Profit Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <SummaryCard
          label="Total Income"
          bdt={summary.totalIncomeBdt}
          usd={summary.totalIncomeUsd}
          color="green"
          icon={<TrendingUp className="w-5 h-5" />}
          subtitle={summary.serviceChargeTotalBdt > 0 ? `Includes ৳${summary.serviceChargeTotalBdt.toLocaleString()} service charges` : undefined}
        />
        <SummaryCard
          label="Total Expenses"
          bdt={summary.totalExpenseBdt}
          usd={summary.totalExpenseUsd}
          color="red"
          icon={<TrendingDown className="w-5 h-5" />}
        />
        <SummaryCard
          label="Net Profit"
          bdt={summary.profitBdt}
          usd={summary.profitUsd}
          color="blue"
          icon={<DollarSign className="w-5 h-5" />}
          subtitle={`${profitMargin}% margin`}
        />
        <SummaryCard
          label="Service Charges"
          bdt={summary.serviceChargeTotalBdt}
          color="purple"
          icon={<Receipt className="w-5 h-5" />}
          subtitle={`From ${projectStats.projectBreakdown.filter((p: any) => p.serviceCharges > 0).length} projects`}
        />
      </div>

      {/* Budget Context Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <SummaryCard
          label="Total Project Budget"
          bdt={projectStats.totalBudgetBdt}
          usd={projectStats.totalBudgetUsd}
          color="amber"
          icon={<Briefcase className="w-5 h-5" />}
          subtitle={`${projectStats.total} projects`}
        />
        <SummaryCard
          label="Total Earned (Projects)"
          bdt={projectStats.totalEarnedBdt}
          usd={projectStats.totalEarnedUsd}
          color="green"
          icon={<TrendingUp className="w-5 h-5" />}
          subtitle="Transaction income + service charges"
        />
        <div className="glass-card p-6">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl border bg-cyan-500/10 border-cyan-500/20 text-cyan-400 mb-3">
            <Percent className="w-5 h-5" />
          </div>
          <p className="text-sm text-slate-400 mb-1">Budget Utilization</p>
          <p className="text-xl font-bold text-white">
            {projectStats.totalBudgetBdt > 0
              ? `${Math.round((projectStats.totalEarnedBdt / projectStats.totalBudgetBdt) * 100)}%`
              : "N/A"}
          </p>
          <p className="text-xs text-slate-500">Earned vs allocated budget</p>
        </div>
      </div>

      <TransactionsTable
        data={result.data}
        total={result.total}
        page={result.page}
        totalPages={result.totalPages}
        currentType={type}
        projects={projects.data}
      />
      <div className="mt-10">
        <ServiceChargesTable
          data={serviceCharges.data}
          total={serviceCharges.total}
          page={serviceCharges.page}
          totalPages={serviceCharges.totalPages}
          projects={projects.data}
        />
      </div>
    </div>
  );
}
