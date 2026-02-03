import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  try {
    const supabase = createServerComponentClient({ cookies });
    
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      redirect("/login");
    }

    if (session.user.email !== 'carlosgabriel8058@gmail.com') {
      redirect("/");
    }

    return <AdminShell>{children}</AdminShell>;
  } catch (error) {
    console.error("Erro no AdminLayout:", error);
    // Se for erro de redirect, deixa passar (é normal do Next.js)
    if (error instanceof Error && error.message === "NEXT_REDIRECT") {
      throw error;
    }
    // Qualquer outro erro (como o do Supabase), manda pro login por segurança
    redirect("/login");
  }
}
