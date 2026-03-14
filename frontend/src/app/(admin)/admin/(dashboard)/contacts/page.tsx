import { listContacts } from "@/lib/db";
import ContactsTable from "@/components/admin/ContactsTable";
import RefreshButton from "@/components/admin/RefreshButton";

export const metadata = { title: "Contacts | Admin" };
export const dynamic = "force-dynamic";

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: { status?: string; page?: string };
}) {
  const status = searchParams.status || undefined;
  const page = parseInt(searchParams.page || "1", 10);
  const result = await listContacts({ status, page, limit: 15 });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">
            Contacts
          </h1>
          <p className="text-slate-400 mt-1">
            Manage contact messages
          </p>
        </div>
        <RefreshButton />
      </div>
      <ContactsTable
        data={result.data}
        total={result.total}
        page={result.page}
        totalPages={result.totalPages}
        currentStatus={status}
      />
    </div>
  );
}
