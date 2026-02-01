export const dynamic = 'force-dynamic'; // Força atualização a cada refresh
export const revalidate = 0;

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Filter, SlidersHorizontal } from "lucide-react";
import { supabase } from "@/lib/supabase";

const CATEGORIES = ["Todos", "Eletrônicos", "Áudio", "Wearables", "Fotografia", "Computadores"];

async function getProducts(search?: string) {
  let query = supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (search) {
    query = query.ilike('name', `%${search}%`);
  }

  const { data: products, error } = await query;
  
  if (error) {
    console.error("❌ ERRO AO BUSCAR PRODUTOS:", error.message);
  } else {
    console.log("✅ PRODUTOS ENCONTRADOS:", products?.length);
    if (products?.length === 0) console.log("⚠️ A busca retornou 0 itens. Verifique RLS ou filtros.");
  }

  return products || [];
}

export default async function ProductsPage({ searchParams }: { searchParams: { search?: string } }) {
  const products = await getProducts(searchParams.search);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {searchParams.search ? `Resultados para "${searchParams.search}"` : "Todos os Produtos"}
            </h1>
            <p className="text-gray-500 mt-1">
              {products.length} produtos encontrados
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 md:hidden">
            <Filter className="w-4 h-4" /> Filtros
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filtros (Desktop) */}
          <aside className="w-full md:w-64 hidden md:block space-y-8">
            <div>
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" /> Filtros
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2 text-sm">Categorias</h4>
                  <ul className="space-y-2">
                    {CATEGORIES.map((cat) => (
                      <li key={cat}>
                        <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <span className="text-sm text-gray-600">{cat}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-2 text-sm">Preço</h4>
                  <div className="flex items-center gap-2">
                    <input type="number" placeholder="Min" className="w-full px-3 py-1 border border-gray-300 rounded text-sm" />
                    <span className="text-gray-400">-</span>
                    <input type="number" placeholder="Max" className="w-full px-3 py-1 border border-gray-300 rounded text-sm" />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Grid de Produtos */}
          <div className="flex-1">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={{
                    ...product,
                    price: product.price || 0,
                    image: product.image_url || 'https://via.placeholder.com/300'
                  }} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-100">
                <p className="text-gray-500">Nenhum produto encontrado.</p>
                <p className="text-sm text-gray-400 mt-2">Tente limpar os filtros ou volte mais tarde.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
