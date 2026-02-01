"use client";

import { ArrowLeft, Save, Upload, Loader2, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function EditProductPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image_url: ""
  });

  useEffect(() => {
    fetchProduct();
  }, []);

  async function fetchProduct() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error) throw error;

      if (data) {
        setFormData({
          name: data.name,
          description: data.description || "",
          price: data.price?.toString() || "",
          category: data.category || "",
          stock: data.stock?.toString() || "0",
          image_url: data.image_url || ""
        });
      }
    } catch (error) {
      toast.error("Erro ao carregar produto");
      router.push("/admin/produtos");
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const { error } = await supabase
        .from('products')
        .update({
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price.replace(',', '.')),
          category: formData.category,
          stock: parseInt(formData.stock) || 0,
          image_url: formData.image_url
        })
        .eq('id', params.id);

      if (error) throw error;

      toast.success("Produto atualizado com sucesso!");
      router.push("/admin/produtos");
    } catch (error: any) {
      toast.error("Erro ao atualizar: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;
    
    toast.promise(
      async () => {
        const { error } = await supabase.from('products').delete().eq('id', params.id);
        if (error) throw error;
        router.push("/admin/produtos");
      },
      {
        loading: 'Excluindo...',
        success: 'Produto excluído',
        error: 'Erro ao excluir'
      }
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <header className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/produtos" className="p-2 hover:bg-white dark:hover:bg-slate-800 rounded-full transition text-slate-500 dark:text-slate-400">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Editar Produto</h1>
            <p className="text-slate-500 dark:text-slate-400">Atualize as informações do item</p>
          </div>
        </div>
        <button 
          onClick={handleDelete}
          className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
          title="Excluir Produto"
        >
          <Trash2 className="w-6 h-6" />
        </button>
      </header>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Nome do Produto *</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
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
                  value={formData.image_url}
                  onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                />
              </div>
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
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition shadow-lg shadow-blue-200 dark:shadow-none flex items-center gap-2 disabled:opacity-70 w-full sm:w-auto justify-center"
          >
            {saving ? (
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
  );
}
