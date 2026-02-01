"use client";

import { Plus, Edit, Trash2, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (data) setProducts(data);
    setLoading(false);
  }

  async function handleDelete(id: string) {
    // Usando toast com promise para feedback visual melhor
    toast.promise(
      async () => {
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (error) throw error;
        fetchProducts(); // Recarrega a lista
      },
      {
        loading: 'Excluindo produto...',
        success: 'Produto excluído com sucesso!',
        error: 'Erro ao excluir produto',
      }
    );
  }

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Produtos</h1>
          <p className="text-slate-500 dark:text-slate-400">Gerencie o catálogo da sua loja</p>
        </div>
        <Link 
          href="/admin/produtos/novo" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition w-full sm:w-auto justify-center"
        >
          <Plus className="w-5 h-5" />
          Novo Produto
        </Link>
      </header>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        {/* Barra de Busca (Visual) */}
        <div className="p-4 border-b border-slate-100 dark:border-slate-700">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Buscar produtos..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:border-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">Carregando produtos...</div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-4">Você ainda não tem produtos cadastrados.</p>
            <Link href="/admin/produtos/novo" className="text-blue-600 font-bold hover:underline">
              Cadastrar o primeiro produto
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-semibold uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 whitespace-nowrap">Produto</th>
                  <th className="px-6 py-4 whitespace-nowrap">Categoria</th>
                  <th className="px-6 py-4 whitespace-nowrap">Preço</th>
                  <th className="px-6 py-4 whitespace-nowrap">Estoque</th>
                  <th className="px-6 py-4 whitespace-nowrap text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition">
                    <td className="px-6 py-4 min-w-[250px]">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-slate-700 rounded-md overflow-hidden flex-shrink-0">
                          {product.image_url ? (
                            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gray-200 dark:bg-slate-600" />
                          )}
                        </div>
                        <span className="font-medium text-slate-900 dark:text-white truncate">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                    <td className="px-6 py-4 font-bold text-slate-800 dark:text-white whitespace-nowrap">
                      {Number(product.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                        product.stock > 0 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}>
                        {product.stock > 0 ? `${product.stock} un` : 'Esgotado'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <Link 
                        href={`/admin/produtos/${product.id}`}
                        className="text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-2 rounded-lg transition mr-1 inline-block"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 p-2 rounded-lg transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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
