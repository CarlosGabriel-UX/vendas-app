"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { User, MapPin, Phone, Save, Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    cep: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: ""
  });

  useEffect(() => {
    if (user) {
      const meta = user.user_metadata || {};
      setFormData({
        fullName: meta.full_name || meta.name || "",
        phone: meta.phone || "",
        cep: meta.address?.cep || "",
        street: meta.address?.street || "",
        number: meta.address?.number || "",
        complement: meta.address?.complement || "",
        neighborhood: meta.address?.neighborhood || "",
        city: meta.address?.city || "",
        state: meta.address?.state || ""
      });
    }
  }, [user]);

  const handleCepBlur = async () => {
    if (formData.cep.length >= 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${formData.cep}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setFormData(prev => ({
            ...prev,
            street: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
            state: data.uf
          }));
        }
      } catch (error) {
        // Silently fail or log
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: formData.fullName,
          phone: formData.phone,
          address: {
            cep: formData.cep,
            street: formData.street,
            number: formData.number,
            complement: formData.complement,
            neighborhood: formData.neighborhood,
            city: formData.city,
            state: formData.state
          }
        }
      });

      if (error) throw error;
      toast.success("Perfil atualizado com sucesso!");
    } catch (error: any) {
      toast.error("Erro ao atualizar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <User className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            Meu Perfil
          </h1>

          <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-8">
            
            {/* Dados Pessoais */}
            <div className="mb-10">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-slate-800">
                <User className="w-5 h-5 text-blue-600" />
                Dados Pessoais
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Nome Completo</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 bg-transparent"
                    value={formData.fullName}
                    onChange={e => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Email</label>
                  <input
                    type="email"
                    disabled
                    className="w-full px-4 py-2 border border-gray-200 dark:border-slate-800 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-500 cursor-not-allowed"
                    value={user?.email || ''}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Telefone / WhatsApp</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 bg-transparent"
                      placeholder="(00) 00000-0000"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Endereço */}
            <div>
              <h2 className="text-lg font-bold mb-6 flex items-center gap-2 pb-2 border-b border-gray-100 dark:border-slate-800">
                <MapPin className="w-5 h-5 text-blue-600" />
                Endereço de Entrega
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">CEP</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 bg-transparent"
                    placeholder="00000-000"
                    value={formData.cep}
                    onChange={e => setFormData({...formData, cep: e.target.value})}
                    onBlur={handleCepBlur}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Rua / Logradouro</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 bg-transparent"
                    value={formData.street}
                    onChange={e => setFormData({...formData, street: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Número</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 bg-transparent"
                    value={formData.number}
                    onChange={e => setFormData({...formData, number: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Complemento</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 bg-transparent"
                    placeholder="Apto, Bloco, etc"
                    value={formData.complement}
                    onChange={e => setFormData({...formData, complement: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Bairro</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 bg-transparent"
                    value={formData.neighborhood}
                    onChange={e => setFormData({...formData, neighborhood: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Cidade</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 bg-transparent"
                    value={formData.city}
                    onChange={e => setFormData({...formData, city: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Estado</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 bg-transparent"
                    maxLength={2}
                    value={formData.state}
                    onChange={e => setFormData({...formData, state: e.target.value.toUpperCase()})}
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-100 dark:border-slate-800 flex justify-end">
              <button 
                type="submit" 
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition shadow-lg shadow-blue-200 dark:shadow-none flex items-center gap-2 disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Salvar Alterações
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
