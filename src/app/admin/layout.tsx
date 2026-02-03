import AdminShell from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // A proteção agora é feita no AdminShell (Client Side) para evitar problemas de cookies no servidor
  return <AdminShell>{children}</AdminShell>;
}
