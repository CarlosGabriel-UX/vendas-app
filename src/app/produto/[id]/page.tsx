import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddToCart from "@/components/AddToCart";
import { Star, Truck, ShieldCheck, Heart, Share2 } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

// Busca dados do produto no servidor (Server Component)
async function getProduct(id: string) {
  const { data: product } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  
  return product;
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
            <Link href="/" className="text-blue-600 hover:underline">Voltar para Home</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Adapter para garantir campos
  const displayProduct = {
    ...product,
    price: product.price || 0,
    images: product.image_url ? [product.image_url] : ['https://via.placeholder.com/600'],
    specs: ["Garantia de 1 ano", "Nota Fiscal", "Original", "Entrega Rápida"] // Specs genéricas por enquanto
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Coluna da Esquerda - Imagens */}
          <div className="lg:w-3/5 space-y-4">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 relative group">
              <img 
                src={displayProduct.images[0]} 
                alt={displayProduct.name} 
                className="w-full h-full object-contain mix-blend-multiply p-8 group-hover:scale-105 transition duration-500"
              />
              <div className="absolute top-4 right-4 space-y-2">
                <button className="p-2 bg-white rounded-full shadow-md hover:text-red-500 transition">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-2 bg-white rounded-full shadow-md hover:text-blue-500 transition">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Coluna da Direita - Detalhes */}
          <div className="lg:w-2/5 space-y-8">
            <div>
              <span className="text-blue-600 font-semibold tracking-wide text-sm uppercase">{displayProduct.category}</span>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2 mb-4">{displayProduct.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current text-gray-300" />
                </div>
                <span className="text-gray-500 text-sm">(Novo)</span>
              </div>

              <div className="border-t border-b border-gray-100 py-6 space-y-2">
                <p className="text-gray-500 line-through text-lg">
                  {(displayProduct.price * 1.2).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-bold text-blue-700">
                    {Number(displayProduct.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                  <span className="text-green-600 font-medium mb-1">5% OFF no PIX</span>
                </div>
                <p className="text-gray-500 text-sm">
                  ou 10x de {(displayProduct.price / 10).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} sem juros
                </p>
              </div>
            </div>

            {/* Botão de Adicionar ao Carrinho (Client Component) */}
            <AddToCart product={{
              id: displayProduct.id,
              name: displayProduct.name,
              price: displayProduct.price,
              image: displayProduct.images[0]
            }} />

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <Truck className="w-6 h-6 text-blue-600 shrink-0" />
                <div>
                  <p className="font-bold text-gray-900">Frete Grátis</p>
                  <p className="text-gray-500">Para todo o Brasil</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0" />
                <div>
                  <p className="font-bold text-gray-900">Garantia</p>
                  <p className="text-gray-500">12 meses de fábrica</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <h3 className="font-bold text-gray-900 mb-3">Sobre o produto</h3>
              <p className="text-gray-600 leading-relaxed">
                {displayProduct.description}
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
