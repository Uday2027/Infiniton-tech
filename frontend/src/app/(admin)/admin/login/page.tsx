import { Metadata } from "next";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Login | Infiniton Tech",
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center px-4">
      <AdminLoginForm />
    </div>
  );
}
