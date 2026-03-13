import { listProjects } from "@/lib/db";
import ProjectsTable from "@/components/admin/ProjectsTable";

export const metadata = { title: "Projects | Admin" };

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: { status?: string; source?: string; page?: string };
}) {
  const status = searchParams.status || undefined;
  const source = searchParams.source || undefined;
  const page = parseInt(searchParams.page || "1", 10);
  const result = await listProjects({ status, source, page, limit: 15 });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-white">
            Projects
          </h1>
          <p className="text-slate-400 mt-1">Manage all projects</p>
        </div>
      </div>
      <ProjectsTable
        data={result.data}
        total={result.total}
        page={result.page}
        totalPages={result.totalPages}
        currentStatus={status}
        currentSource={source}
      />
    </div>
  );
}
