"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCartStore } from "@/store/cartStore";
import { Lock, CreditCard, Truck, User, MapPin, CheckCircle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

type CheckoutFormData = {
  fullName: string;
  email: string;
  cpf: string;
  phone: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  paymentMethod: "credit_card" | "pix" | "boleto";
};

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();
  const { user } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormData>();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onSubmit = async (data: CheckoutFormData) => {
    if (!user) {
      alert("Você precisa estar logado para finalizar a compra.");
      router.push("/login?redirect=/checkout");
      return;
    }

    setLoading(true);

    try {
      // Tentar checkout via API (Mercado Pago)
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items,
          user_id: user.id,
          user_email: user.email
        })
      });

      const result = await response.json();

      if (response.ok && result.url) {
        // Redirecionar para o Mercado Pago
        window.location.href = result.url;
        return;
      }

      // Se falhar (ex: sem token configurado), fallback para método simples
      console.warn("API de Checkout indisponível, usando fallback local:", result.error);
      
      // 1. Criar o pedido localmente
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          total: total(),
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      clearCart();
      alert(`Pedido #${order.id.slice(0, 8)} realizado com sucesso! (Modo Simulação)`);
      router.push("/minha-conta/pedidos");
      
    } catch (error: any) {
      alert("Erro ao processar pedido: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <div className="flex-grow flex items-center justify-center p-4">
          <div className="text-center bg-white p-8 rounded-xl shadow-sm">
            <h1 className="text-2xl font-bold mb-4">Seu carrinho está vazio</h1>
            <Link href="/" className="text-blue-600 hover:underline font-medium">
              Voltar para a loja
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-700">LojaVendas</Link>
          <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm font-medium">
            <Lock className="w-4 h-4" />
            Ambiente Seguro
          </div>
        </div>
      </div>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Formulário de Checkout */}
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              {/* Etapa 1: Dados Pessoais */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Dados Pessoais
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Nome Completo</label>
                    <input 
                      {...register("fullName", { required: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="Seu nome"
                    />
                    {errors.fullName && <span className="text-red-500 text-xs">Obrigatório</span>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <input 
                      {...register("email", { required: true })}
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="seu@email.com"
                    />
                    {errors.email && <span className="text-red-500 text-xs">Obrigatório</span>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">CPF</label>
                    <input 
                      {...register("cpf", { required: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="000.000.000-00"
                    />
                    {errors.cpf && <span className="text-red-500 text-xs">Obrigatório</span>}
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Telefone</label>
                    <input 
                      {...register("phone", { required: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                      placeholder="(11) 99999-9999"
                    />
                    {errors.phone && <span className="text-red-500 text-xs">Obrigatório</span>}
                  </div>
                </div>
              </div>

              {/* Etapa 2: Endereço */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  Endereço de Entrega
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">CEP</label>
                    <div className="flex gap-2">
                      <input 
                        {...register("cep", { required: true })}
                        className="w-40 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="00000-000"
                      />
                      <button type="button" className="text-blue-600 text-sm font-medium hover:underline">
                        Não sei meu CEP
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1 md:col-span-2">
                    <label className="text-sm font-medium text-gray-700">Rua</label>
                    <input 
                      {...register("street", { required: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Número</label>
                    <input 
                      {...register("number", { required: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Complemento</label>
                    <input 
                      {...register("complement")}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Bairro</label>
                    <input 
                      {...register("neighborhood", { required: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Cidade</label>
                    <input 
                      {...register("city", { required: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Etapa 3: Pagamento */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                  Pagamento
                </h2>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <label className="cursor-pointer">
                    <input type="radio" value="credit_card" {...register("paymentMethod")} className="peer sr-only" defaultChecked />
                    <div className="border-2 border-gray-200 peer-checked:border-blue-600 peer-checked:bg-blue-50 rounded-lg p-4 text-center transition hover:border-blue-300">
                      <CreditCard className="w-6 h-6 mx-auto mb-2 text-gray-600 peer-checked:text-blue-600" />
                      <span className="text-sm font-medium block">Cartão</span>
                    </div>
                  </label>
                  <label className="cursor-pointer">
                    <input type="radio" value="pix" {...register("paymentMethod")} className="peer sr-only" />
                    <div className="border-2 border-gray-200 peer-checked:border-blue-600 peer-checked:bg-blue-50 rounded-lg p-4 text-center transition hover:border-blue-300">
                      <div className="w-6 h-6 mx-auto mb-2 font-bold text-gray-600 peer-checked:text-blue-600 text-xs flex items-center justify-center border border-current rounded">PIX</div>
                      <span className="text-sm font-medium block">PIX</span>
                    </div>
                  </label>
                  <label className="cursor-pointer">
                    <input type="radio" value="boleto" {...register("paymentMethod")} className="peer sr-only" />
                    <div className="border-2 border-gray-200 peer-checked:border-blue-600 peer-checked:bg-blue-50 rounded-lg p-4 text-center transition hover:border-blue-300">
                      <div className="w-6 h-6 mx-auto mb-2 font-bold text-gray-600 peer-checked:text-blue-600 text-xs flex items-center justify-center border border-current rounded">BAR</div>
                      <span className="text-sm font-medium block">Boleto</span>
                    </div>
                  </label>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600 flex items-start gap-3">
                  <Lock className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <p>
                    Seus dados de pagamento são processados de forma segura pelo Stripe. 
                    Nós não armazenamos os dados do seu cartão.
                  </p>
                </div>
              </div>
            </form>
          </div>

          {/* Resumo da Compra Lateral */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-4">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Resumo da Compra</h2>
              
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-sm">
                      <p className="font-medium text-gray-900 line-clamp-2">{item.name}</p>
                      <p className="text-gray-500">Qtd: {item.quantity}</p>
                      <p className="font-semibold text-blue-600">
                        {(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>{total().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Frete</span>
                  <span className="text-green-600 font-medium">Grátis</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-2">
                  <span>Total</span>
                  <span>{total().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                </div>
              </div>

              <button 
                onClick={handleSubmit(onSubmit)}
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-green-200 transition transform active:scale-95 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Confirmar Pagamento
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
