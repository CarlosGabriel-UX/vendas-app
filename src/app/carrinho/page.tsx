"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCartStore } from "@/store/cartStore";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCartStore();
  const [isClient, setIsClient] = useState(false);

  // Evitar hidratação incorreta do Zustand no Next.js
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Seu Carrinho</h1>

        {items.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-blue-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Seu carrinho está vazio</h2>
            <p className="text-gray-500 mb-8">Parece que você ainda não escolheu seus produtos.</p>
            <Link 
              href="/" 
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition shadow-lg shadow-blue-200"
            >
              Começar a Comprar <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Lista de Produtos */}
            <div className="lg:w-2/3 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-center">
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                    <p className="text-blue-600 font-bold">
                      {item.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:bg-white rounded shadow-sm transition"
                    >
                      <Minus className="w-4 h-4 text-gray-600" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:bg-white rounded shadow-sm transition"
                    >
                      <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  <button 
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition ml-2"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Resumo do Pedido */}
            <div className="lg:w-1/3">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Resumo do Pedido</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>{total().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Frete</span>
                    <span className="text-green-600 font-medium">Grátis</span>
                  </div>
                  <div className="border-t border-gray-100 pt-3 flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>{total().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                  </div>
                </div>

                <Link 
                  href="/checkout"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition transform active:scale-95 flex items-center justify-center gap-2"
                >
                  Finalizar Compra <ArrowRight className="w-5 h-5" />
                </Link>
                
                <div className="mt-4 flex items-center justify-center gap-2 text-gray-400 text-sm">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Compra 100% Segura</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
