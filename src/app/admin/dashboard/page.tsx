"use client";

import AdminSidebar from "@/components/admin/Sidebar";
import { DollarSign, ShoppingBag, Package, TrendingUp, ArrowUpRight, ArrowDownRight, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState({
    totalSales: 0,
    ordersCount: 0,
    productsCount: 0,
    recentOrders: [] as any[]
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
  }, []);

  async function fetchMetrics() {
    // 1. Total de Vendas e Pedidos
    const { data: orders } = await supabase
      .from('orders')
      .select('*');
    
    const totalSales = orders?.reduce((acc, order) => acc + (order.total || 0), 0) || 0;
    const ordersCount = orders?.length || 0;

    // 2. Total de Produtos
    const { count: productsCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    // 3. Pedidos Recentes
    const { data: recentOrders } = await supabase
      .from('orders')
      .select(`
        *,
        users (name, email)
      `)
      .order('created_at', { ascending: false })
      .limit(5);

    setMetrics({
      totalSales,
      ordersCount,
      productsCount: productsCount || 0,
      recentOrders: recentOrders || []
    });
    setLoading(false);
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'shipped': return 'bg-blue-100 text-blue-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-yellow-100 text-yellow-700';
    }
  };

  const getStatusLabel = (status: string) => {
    const labels: {[key: string]: string} = {
      'delivered': 'Entregue',
      'shipped': 'Enviado',
      'cancelled': 'Cancelado',
      'pending': 'Pendente',
      'processing': 'Processando'
    };
    return labels[status] || status;
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Visão Geral</h1>
          <p className="text-slate-500 dark:text-slate-400">Bem-vindo ao painel de controle</p>
        </div>
        <div className="flex items-center gap-4 bg-white dark:bg-slate-800 p-2 pr-4 rounded-full shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-300 font-bold uppercase">
            {user?.email?.charAt(0) || 'A'}
          </div>
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{user?.user_metadata?.name || 'Administrador'}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
          </div>
        </div>
      </header>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg text-green-600 dark:text-green-400">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Vendas Totais</p>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
            {loading ? "..." : metrics.totalSales.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg text-blue-600 dark:text-blue-400">
              <ShoppingBag className="w-6 h-6" />
            </div>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Total de Pedidos</p>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
            {loading ? "..." : metrics.ordersCount}
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg text-purple-600 dark:text-purple-400">
              <Package className="w-6 h-6" />
            </div>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Produtos Cadastrados</p>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
            {loading ? "..." : metrics.productsCount}
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg text-orange-600 dark:text-orange-400">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">Ticket Médio</p>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
            {loading ? "..." : (metrics.ordersCount > 0 ? (metrics.totalSales / metrics.ordersCount) : 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </h3>
        </div>
      </div>

      {/* Tabela de Pedidos Recentes */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
          <h3 className="font-bold text-lg text-slate-800 dark:text-white">Pedidos Recentes</h3>
        </div>
        {loading ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">Carregando dados...</div>
        ) : metrics.recentOrders.length === 0 ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">Nenhum pedido realizado ainda.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-semibold uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 whitespace-nowrap">ID do Pedido</th>
                  <th className="px-6 py-4 whitespace-nowrap">Cliente</th>
                  <th className="px-6 py-4 whitespace-nowrap">Data</th>
                  <th className="px-6 py-4 whitespace-nowrap">Status</th>
                  <th className="px-6 py-4 whitespace-nowrap text-right">Valor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {metrics.recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition">
                    <td className="px-6 py-4 font-medium text-xs font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      #{order.id.slice(0, 8)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-slate-900 dark:text-white">{order.users?.name || 'Cliente'}</div>
                      <div className="text-xs text-slate-400">{order.users?.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(order.created_at).toLocaleDateString('pt-BR')} <br/>
                      <span className="text-xs text-slate-400">{new Date(order.created_at).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                        {getStatusLabel(order.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-slate-800 dark:text-white whitespace-nowrap">
                      {order.total?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
