"use client";

import { useCartStore } from "@/store/cartStore";
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
  const addItem = useCartStore((state) => state.addItem);

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
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
