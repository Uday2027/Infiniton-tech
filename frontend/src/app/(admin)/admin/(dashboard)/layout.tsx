import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin Panel | Infiniton Tech",
};

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAdminUser();
  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="flex h-screen bg-navy-950">
      <AdminSidebar />
      <main className="flex-1 overflow-y-auto bg-navy-950">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}
