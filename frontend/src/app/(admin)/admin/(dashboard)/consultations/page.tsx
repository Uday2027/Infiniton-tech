import { listConsultations, getConvertedConsultationIds } from "@/lib/db";
import ConsultationsTable from "@/components/admin/ConsultationsTable";
import RefreshButton from "@/components/admin/RefreshButton";

export const metadata = { title: "Consultations | Admin" };
export const dynamic = "force-dynamic";

export default async function ConsultationsPage({
  searchParams,
}: {
  searchParams: { status?: string; page?: string };
}) {
  const status = searchParams.status || undefined;
  const page = parseInt(searchParams.page || "1", 10);
  const [result, convertedIds] = await Promise.all([
    listConsultations({ status, page, limit: 15 }),
    getConvertedConsultationIds(),
  ]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">
            Consultations
          </h1>
          <p className="text-slate-400 mt-1">
            Manage consultation requests
          </p>
        </div>
        <RefreshButton />
      </div>
      <ConsultationsTable
        data={result.data}
        total={result.total}
        page={result.page}
        totalPages={result.totalPages}
        currentStatus={status}
        convertedIds={Array.from(convertedIds)}
      />
    </div>
  );
}
