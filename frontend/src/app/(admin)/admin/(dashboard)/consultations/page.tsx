import { listConsultations } from "@/lib/db";
import ConsultationsTable from "@/components/admin/ConsultationsTable";

export const metadata = { title: "Consultations | Admin" };

export default async function ConsultationsPage({
  searchParams,
}: {
  searchParams: { status?: string; page?: string };
}) {
  const status = searchParams.status || undefined;
  const page = parseInt(searchParams.page || "1", 10);
  const result = await listConsultations({ status, page, limit: 15 });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-white">
          Consultations
        </h1>
        <p className="text-slate-400 mt-1">
          Manage consultation requests
        </p>
      </div>
      <ConsultationsTable
        data={result.data}
        total={result.total}
        page={result.page}
        totalPages={result.totalPages}
        currentStatus={status}
      />
    </div>
  );
}
