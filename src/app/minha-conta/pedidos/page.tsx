"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";
import { Package, Clock, CheckCircle, XCircle, Truck } from "lucide-react";
import Link from "next/link";

export default function MyOrdersPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  async function fetchOrders() {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false });

    if (data) setOrders(data);
    setLoading(false);
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700 border-green-200';
      case 'shipped': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'delivered': return 'Entregue';
      case 'shipped': return 'Enviado';
      case 'cancelled': return 'Cancelado';
      case 'pending': return 'Pendente';
      case 'processing': return 'Processando';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <Package className="w-8 h-8 text-blue-600" />
          Meus Pedidos
        </h1>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-500">Carregando seus pedidos...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-blue-300" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Você ainda não tem pedidos</h2>
            <p className="text-gray-500 mb-8">Aproveite nossas ofertas e faça sua primeira compra!</p>
            <Link href="/" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-200">
              Começar a Comprar
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Pedido #{order.id.slice(0, 8).toUpperCase()}</p>
                      <p className="text-sm text-gray-400">
                        Realizado em {new Date(order.created_at).toLocaleDateString('pt-BR')} às {new Date(order.created_at).toLocaleTimeString('pt-BR', {hour: '2-digit', minute:'2-digit'})}
                      </p>
                    </div>
                    
                    <div className={`px-4 py-2 rounded-full border flex items-center gap-2 text-sm font-bold uppercase tracking-wide ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {getStatusLabel(order.status)}
                    </div>
                  </div>

                  <div className="border-t border-gray-50 pt-4 flex justify-between items-end">
                    <div>
                      <p className="text-sm text-gray-500">Total do Pedido</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {order.total?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </p>
                    </div>
                    {/* Futuramente: Botão para ver detalhes/itens */}
                    {/* <button className="text-blue-600 font-medium hover:underline text-sm">Ver Detalhes</button> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
