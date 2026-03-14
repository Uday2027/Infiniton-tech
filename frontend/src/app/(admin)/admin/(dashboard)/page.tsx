import { getDashboardStats } from "@/lib/db";
import type { ConsultationRequest, ContactMessage } from "@/lib/db";
import Link from "next/link";
import {
  FileText,
  Clock,
  MessageSquare,
  AlertCircle,
  ArrowRight,
  Briefcase,
  DollarSign,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";
import RefreshButton from "@/components/admin/RefreshButton";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">
            Dashboard
          </h1>
          <p className="text-slate-400 mt-1">Overview of your admin panel</p>
        </div>
        <RefreshButton />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <StatCard
          label="Total Consultations"
          value={stats.totalConsultations}
          icon={<FileText className="w-5 h-5" />}
          color="cyan"
        />
        <StatCard
          label="Pending"
          value={stats.pendingConsultations}
          icon={<Clock className="w-5 h-5" />}
          color="amber"
        />
        <StatCard
          label="Total Contacts"
          value={stats.totalContacts}
          icon={<MessageSquare className="w-5 h-5" />}
          color="cyan"
        />
        <StatCard
          label="Unread"
          value={stats.unreadContacts}
          icon={<AlertCircle className="w-5 h-5" />}
          color="amber"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          label="Total Projects"
          value={stats.totalProjects}
          icon={<Briefcase className="w-5 h-5" />}
          color="cyan"
        />
        <StatCard
          label="Revenue This Month (৳)"
          value={stats.monthlyRevenue}
          icon={<DollarSign className="w-5 h-5" />}
          color="emerald"
          isCurrency
        />
        <StatCard
          label="Expenses This Month (৳)"
          value={stats.monthlyExpense}
          icon={<TrendingDown className="w-5 h-5" />}
          color="red"
          isCurrency
        />
        <StatCard
          label="Profit This Month (৳)"
          value={stats.monthlyProfit}
          icon={<TrendingUp className="w-5 h-5" />}
          color={stats.monthlyProfit >= 0 ? "emerald" : "red"}
          isCurrency
        />
      </div>

      {/* Recent Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Consultations */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">
              Recent Consultations
            </h2>
            <Link
              href="/admin/consultations"
              className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-1 transition-colors"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {stats.recentConsultations.length === 0 ? (
            <p className="text-slate-500 text-sm">No consultations yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.recentConsultations.map(
                (item: ConsultationRequest) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-slate-400 truncate">
                        {item.project_type} &middot; {item.budget}
                      </p>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* Recent Contacts */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">
              Recent Contacts
            </h2>
            <Link
              href="/admin/contacts"
              className="text-cyan-400 hover:text-cyan-300 text-sm flex items-center gap-1 transition-colors"
            >
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          {stats.recentContacts.length === 0 ? (
            <p className="text-slate-500 text-sm">No contacts yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.recentContacts.map((item: ContactMessage) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {item.name}
                    </p>
                    <p className="text-xs text-slate-400 truncate">
                      {item.subject}
                    </p>
                  </div>
                  <StatusBadge status={item.status} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  color,
  isCurrency,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: "cyan" | "amber" | "emerald" | "red";
  isCurrency?: boolean;
}) {
  const colorClasses = {
    cyan: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    red: "bg-red-500/10 text-red-400 border-red-500/20",
  };

  const displayValue = isCurrency
    ? `৳${value.toLocaleString("en-US", { minimumFractionDigits: 0 })}`
    : value.toString();

  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-3 mb-3">
        <div
          className={`p-2 rounded-lg border ${colorClasses[color]}`}
        >
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold text-white">{displayValue}</p>
      <p className="text-sm text-slate-400 mt-1">{label}</p>
    </div>
  );
}
