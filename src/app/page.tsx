import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { ArrowRight, CheckCircle, Shield, Truck } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// Função para buscar produtos do banco
async function getFeaturedProducts() {
  try {
    const { data: products } = await supabase
      .from('products')
      .select('*')
      .limit(4); // Pegar 4 destaques
    
    return products || [];
  } catch (error) {
    console.error("Erro ao buscar produtos (pode ser ignorado no build):", error);
    return [];
  }
}

export default async function Home() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section Ultra Futurista */}
        <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-white dark:bg-[#030014] transition-colors duration-500">
          {/* Fundo Cibernético (Apenas Dark Mode) */}
          <div className="absolute inset-0 z-0 opacity-0 dark:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] animate-pulse-slow"></div>
            <div className="absolute bottom-[-20%] right-[10%] w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>
          </div>

          {/* Fundo Clean (Light Mode) */}
          <div className="absolute inset-0 z-0 opacity-100 dark:opacity-0 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-50 via-white to-white"></div>

          <div className="container mx-auto px-4 relative z-10 pt-20 pb-32">
            <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
              {/* Badge Neon */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 dark:border-purple-500/30 bg-blue-50/50 dark:bg-purple-900/10 backdrop-blur-xl mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 dark:bg-purple-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500 dark:bg-purple-500"></span>
                </span>
                <span className="text-blue-700 dark:text-purple-200 text-xs font-bold tracking-wider uppercase">Nova Coleção 2026</span>
              </div>

              {/* Título Principal */}
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-slate-900 dark:text-white mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
                Tecnologia que <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
                  Transforma
                </span>
              </h1>

              <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200 fill-mode-both">
                Descubra gadgets de alta performance, design premiado e a qualidade que você merece. O futuro chegou e está disponível agora.
              </p>

              {/* Botões */}
              <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300 fill-mode-both">
                <Link href="/produtos" className="group relative px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20">
                  <span className="relative z-10 flex items-center gap-2">
                    Explorar Loja <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                
                <Link href="/categorias" className="px-8 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-bold rounded-full hover:bg-slate-50 dark:hover:bg-white/10 transition-all hover:border-slate-300 dark:hover:border-white/20">
                  Ver Categorias
                </Link>
              </div>
            </div>
          </div>
          
          {/* Decoração Inferior (Fade) */}
          <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-gray-50 dark:from-slate-950 to-transparent z-20 pointer-events-none"></div>
        </section>

        {/* Benefits Section */}
        <section className="py-12 bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 transition-colors duration-300">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex items-center gap-4 p-6 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full text-blue-600 dark:text-blue-300">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Frete Grátis</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Para compras acima de R$ 299</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full text-green-600 dark:text-green-300">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Pagamento Seguro</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">100% protegido via Stripe</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700">
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full text-purple-600 dark:text-purple-300">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">Garantia Total</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">30 dias para devolução</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 bg-transparent">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Produtos em Destaque</h2>
                <p className="text-gray-500 dark:text-gray-400">As melhores ofertas selecionadas para você</p>
              </div>
              <Link href="/produtos" className="hidden md:flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-800 dark:hover:text-blue-300 transition">
                Ver todos <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.length > 0 ? (
                featuredProducts.map((product: any) => (
                  <ProductCard key={product.id} product={{
                    ...product,
                    // Adaptação caso o banco use price ou price_cents
                    price: product.price || (product.price_cents ? product.price_cents / 100 : 0),
                    // Adaptação para imagem
                    image: product.image_url || product.images?.[0] || 'https://via.placeholder.com/300'
                  }} />
                ))
              ) : (
                <div className="col-span-4 text-center py-10 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">Nenhum produto em destaque no momento.</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">Adicione produtos no painel administrativo.</p>
                </div>
              )}
            </div>
            
            <div className="mt-12 text-center md:hidden">
              <Link href="/produtos" className="inline-flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-800 dark:hover:text-blue-300 transition">
                Ver todos os produtos <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter (Já está escura por padrão, não precisa mudar) */}
        <section className="bg-gray-900 text-white py-20">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="text-3xl font-bold mb-4">Fique por dentro das ofertas</h2>
            <p className="text-gray-400 mb-8">Cadastre-se para receber descontos exclusivos e novidades em primeira mão.</p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Seu melhor email" 
                className="flex-1 px-6 py-3 rounded-full bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 text-white"
              />
              <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-bold transition shadow-lg shadow-blue-900/50">
                Inscrever-se
              </button>
            </form>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
