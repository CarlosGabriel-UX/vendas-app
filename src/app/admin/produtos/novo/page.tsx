"use client";

import { ArrowLeft, Save, Upload, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image_url: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Validação básica
    if (!formData.name || !formData.price) {
      toast.error("Preencha os campos obrigatórios (Nome e Preço)");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.from('products').insert([
        {
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price.replace(',', '.')), // Converte para número
          category: formData.category,
          stock: parseInt(formData.stock) || 0,
          image_url: formData.image_url
        }
      ]);

      if (error) throw error;

      toast.success("Produto cadastrado com sucesso!");
      router.push("/admin/produtos");
    } catch (error: any) {
      toast.error("Erro ao cadastrar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <header className="flex items-center gap-4 mb-8">
        <Link href="/admin/produtos" className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-full transition text-slate-500 dark:text-slate-400">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Novo Produto</h1>
          <p className="text-slate-500 dark:text-slate-400">Adicione um novo item ao catálogo</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nome do Produto *</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                placeholder="Ex: Smartphone XYZ"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Preço (R$) *</label>
              <input 
                type="number" 
                step="0.01"
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Categoria</label>
                <select 
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="">Selecione...</option>
                  <option value="Eletrônicos">Eletrônicos</option>
                  <option value="Computadores">Computadores</option>
                  <option value="Smartphones">Smartphones</option>
                  <option value="Áudio">Áudio</option>
                  <option value="Wearables">Wearables</option>
                  <option value="Fotografia">Fotografia</option>
                  <option value="Games">Games</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Estoque</label>
                <input 
                  type="number" 
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  placeholder="0"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Descrição</label>
              <textarea 
                rows={4} 
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                placeholder="Detalhes técnicos e características..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">URL da Imagem</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                  placeholder="https://..."
                  value={formData.image_url}
                  onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">Cole um link direto de uma imagem (Unsplash, Imgur, etc)</p>
            </div>

            {/* Preview da Imagem */}
            <div className="aspect-square bg-gray-50 dark:bg-slate-900 border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-xl flex items-center justify-center overflow-hidden">
              {formData.image_url ? (
                <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/400?text=Erro+na+Imagem")} />
              ) : (
                <div className="text-center text-gray-400 dark:text-slate-600">
                  <Upload className="w-10 h-10 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Preview da imagem</p>
                </div>
              )}
            </div>
          </div>

        </div>

        <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700 flex justify-end">
          <button 
            type="submit" 
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition shadow-lg shadow-blue-200 dark:shadow-none flex items-center gap-2 disabled:opacity-70 w-full sm:w-auto justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                Salvar Produto
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
