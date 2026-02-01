"use client";

import Link from "next/link";
import { ShoppingCart, Check, Heart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Evita navegar para o produto ao clicar no botão
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden relative">
      {/* Botão de Favorito (Visual) */}
      <button className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-500 shadow-sm">
        <Heart className="w-4 h-4" />
      </button>

      {/* Image Container */}
      <Link href={`/produto/${product.id}`} className="block relative aspect-[4/3] overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="object-contain w-full h-full p-6 group-hover:scale-110 transition-transform duration-500 mix-blend-multiply"
        />
        {/* Badge de Oferta (Simulação) */}
        {product.price > 1000 && (
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg shadow-blue-200">
            DESTAQUE
          </span>
        )}
      </Link>

      {/* Content */}
      <div className="p-5">
        <div className="mb-3">
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase tracking-wider">
            {product.category}
          </span>
        </div>
        
        <Link href={`/produto/${product.id}`}>
          <h3 className="text-gray-900 font-bold text-lg mb-1 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2 min-h-[3rem]">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-end justify-between mt-4">
          <div className="flex flex-col">
            <span className="text-gray-400 text-xs line-through mb-0.5">
              {(product.price * 1.2).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
            <span className="text-slate-900 font-black text-xl">
              {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
            <span className="text-[10px] text-green-600 font-medium">
              à vista no PIX
            </span>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className={`p-3 rounded-xl transition-all shadow-lg active:scale-95 flex items-center justify-center ${
              isAdded 
                ? 'bg-green-500 text-white shadow-green-200 w-12' 
                : 'bg-slate-900 hover:bg-blue-600 text-white shadow-slate-200 w-12 group-hover:w-auto group-hover:px-4 gap-2'
            }`}
          >
            {isAdded ? (
              <Check className="w-5 h-5" />
            ) : (
              <>
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden group-hover:inline text-sm font-bold whitespace-nowrap">Comprar</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
