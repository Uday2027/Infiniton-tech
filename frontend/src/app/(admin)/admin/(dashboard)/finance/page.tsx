import { listTransactions, getFinanceSummary } from "@/lib/db";
import TransactionsTable from "@/components/admin/TransactionsTable";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

export const metadata = { title: "Finance | Admin" };

function SummaryCard({
  label,
  bdt,
  usd,
  color,
  icon,
}: {
  label: string;
  bdt: number;
  usd: number;
  color: "green" | "red" | "blue";
  icon: React.ReactNode;
}) {
  const colorMap = {
    green: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
    red: "bg-red-500/10 border-red-500/20 text-red-400",
    blue: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
  };

  return (
    <div className="glass-card p-6">
      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border ${colorMap[color]} mb-3`}>
        {icon}
      </div>
      <p className="text-sm text-slate-400 mb-1">{label}</p>
      <p className="text-xl font-bold text-white">৳{bdt.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
      <p className="text-sm text-slate-500">${usd.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
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

  const [result, summary] = await Promise.all([
    listTransactions({ type, category, page, limit: 15, startDate: searchParams.startDate, endDate: searchParams.endDate }),
    getFinanceSummary({ startDate: searchParams.startDate, endDate: searchParams.endDate }),
  ]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-white">Finance</h1>
        <p className="text-slate-400 mt-1">Track income and expenses</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <SummaryCard
          label="Total Income"
          bdt={summary.totalIncomeBdt}
          usd={summary.totalIncomeUsd}
          color="green"
          icon={<TrendingUp className="w-5 h-5" />}
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
        />
      </div>

      <TransactionsTable
        data={result.data}
        total={result.total}
        page={result.page}
        totalPages={result.totalPages}
        currentType={type}
      />
    </div>
  );
}
