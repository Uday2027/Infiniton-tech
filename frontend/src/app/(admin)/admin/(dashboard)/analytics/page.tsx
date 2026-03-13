import { getAnalyticsData, getFinanceSummary } from "@/lib/db";
import { Printer, TrendingUp, TrendingDown, DollarSign, Briefcase } from "lucide-react";
import RevenueChart from "@/components/admin/RevenueChart";
import IncomeExpenseChart from "@/components/admin/IncomeExpenseChart";
import ProjectStatusChart from "@/components/admin/ProjectStatusChart";
import PrintButton from "@/components/admin/PrintButton";

export const metadata = { title: "Analytics | Admin" };

export default async function AnalyticsPage() {
  const [analytics, summary] = await Promise.all([
    getAnalyticsData(),
    getFinanceSummary(),
  ]);

  const { projectStats, monthlyData } = analytics;

  return (
    <div className="print:bg-white print:text-black">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white print:text-black">
            Analytics
          </h1>
          <p className="text-slate-400 mt-1 print:text-gray-600">
            Company performance overview
          </p>
        </div>
        <PrintButton />
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="glass-card p-4 print:border print:border-gray-300">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-emerald-400 print:text-emerald-600" />
            <span className="text-xs text-slate-400 print:text-gray-600">Total Income</span>
          </div>
          <p className="text-lg font-bold text-white print:text-black">
            ৳{summary.totalIncomeBdt.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-slate-500 print:text-gray-500">
            ${summary.totalIncomeUsd.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="glass-card p-4 print:border print:border-gray-300">
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown className="w-4 h-4 text-red-400 print:text-red-600" />
            <span className="text-xs text-slate-400 print:text-gray-600">Total Expenses</span>
          </div>
          <p className="text-lg font-bold text-white print:text-black">
            ৳{summary.totalExpenseBdt.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-slate-500 print:text-gray-500">
            ${summary.totalExpenseUsd.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="glass-card p-4 print:border print:border-gray-300">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-cyan-400 print:text-cyan-600" />
            <span className="text-xs text-slate-400 print:text-gray-600">Net Profit</span>
          </div>
          <p className={`text-lg font-bold ${summary.profitBdt >= 0 ? "text-emerald-400 print:text-emerald-600" : "text-red-400 print:text-red-600"}`}>
            ৳{summary.profitBdt.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-slate-500 print:text-gray-500">
            ${summary.profitUsd.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="glass-card p-4 print:border print:border-gray-300">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="w-4 h-4 text-cyan-400 print:text-cyan-600" />
            <span className="text-xs text-slate-400 print:text-gray-600">Total Projects</span>
          </div>
          <p className="text-lg font-bold text-white print:text-black">{projectStats.total}</p>
          <p className="text-xs text-slate-500 print:text-gray-500">
            {projectStats.completed} completed
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="glass-card p-6 print:border print:border-gray-300">
          <h3 className="text-sm font-medium text-slate-300 mb-4 print:text-gray-700">
            Revenue Trend
          </h3>
          <RevenueChart monthlyData={monthlyData} />
        </div>

        <div className="glass-card p-6 print:border print:border-gray-300">
          <h3 className="text-sm font-medium text-slate-300 mb-4 print:text-gray-700">
            Income vs Expenses
          </h3>
          <IncomeExpenseChart monthlyData={monthlyData} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6 print:border print:border-gray-300">
          <h3 className="text-sm font-medium text-slate-300 mb-4 print:text-gray-700">
            Project Status Breakdown
          </h3>
          <div className="max-w-xs mx-auto">
            <ProjectStatusChart projectStats={projectStats} />
          </div>
        </div>

        <div className="glass-card p-6 print:border print:border-gray-300">
          <h3 className="text-sm font-medium text-slate-300 mb-4 print:text-gray-700">
            Monthly Summary
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 print:border-gray-300">
                  <th className="text-left py-2 text-slate-400 print:text-gray-600">Month</th>
                  <th className="text-right py-2 text-emerald-400 print:text-emerald-600">Income</th>
                  <th className="text-right py-2 text-red-400 print:text-red-600">Expense</th>
                  <th className="text-right py-2 text-cyan-400 print:text-cyan-600">Profit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 print:divide-gray-200">
                {monthlyData.map((m) => {
                  const profit = m.incomeBdt - m.expenseBdt;
                  return (
                    <tr key={m.label}>
                      <td className="py-2 text-slate-300 print:text-gray-700">{m.label}</td>
                      <td className="py-2 text-right text-slate-300 print:text-gray-700">
                        ৳{m.incomeBdt.toLocaleString()}
                      </td>
                      <td className="py-2 text-right text-slate-300 print:text-gray-700">
                        ৳{m.expenseBdt.toLocaleString()}
                      </td>
                      <td className={`py-2 text-right font-medium ${profit >= 0 ? "text-emerald-400 print:text-emerald-600" : "text-red-400 print:text-red-600"}`}>
                        ৳{profit.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
