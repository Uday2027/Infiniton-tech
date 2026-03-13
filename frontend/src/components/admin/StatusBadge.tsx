const statusColors: Record<string, string> = {
  pending: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  reviewed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  completed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  cancelled: "bg-red-500/20 text-red-400 border-red-500/30",
  unread: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  read: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  replied: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

export default function StatusBadge({ status }: { status: string }) {
  const colors =
    statusColors[status] ||
    "bg-slate-500/20 text-slate-400 border-slate-500/30";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors} capitalize`}
    >
      {status}
    </span>
  );
}
