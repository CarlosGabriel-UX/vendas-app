"use client";

import { useCart } from "@/store/cartStore";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";

interface AddToCartProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
}

export default function AddToCart({ product }: AddToCartProps) {
  const addToCart = useCart((state) => state.addToCart);

  const handleAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
    toast.success("Adicionado ao carrinho!");
  };

  return (
    <button 
      onClick={handleAdd}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-blue-200"
    >
      <ShoppingCart className="w-5 h-5" />
      Adicionar ao Carrinho
    </button>
  );
}
