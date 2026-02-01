import Link from "next/link";
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, LogOut } from "lucide-react";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-slate-800">
        <h2 className="text-2xl font-bold text-blue-400">Painel Vendedor</h2>
      </div>

      <nav className="flex-grow p-4 space-y-2">
        <Link href="/admin/dashboard" className="flex items-center gap-3 px-4 py-3 bg-blue-600 rounded-lg text-white font-medium shadow-lg shadow-blue-900/20">
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </Link>
        
        <Link href="/admin/produtos" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition">
          <Package className="w-5 h-5" />
          Produtos
        </Link>

        <Link href="/admin/pedidos" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition">
          <ShoppingCart className="w-5 h-5" />
          Pedidos
          <span className="ml-auto bg-blue-600 text-xs font-bold px-2 py-0.5 rounded-full">3</span>
        </Link>

        <Link href="/admin/clientes" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition">
          <Users className="w-5 h-5" />
          Clientes
        </Link>

        <Link href="/admin/configuracoes" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition">
          <Settings className="w-5 h-5" />
          Configurações
        </Link>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-900/20 w-full rounded-lg transition">
          <LogOut className="w-5 h-5" />
          Sair
        </button>
      </div>
    </aside>
  );
}
