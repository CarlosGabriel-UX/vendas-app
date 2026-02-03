"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function FixImagesPage() {
  const [status, setStatus] = useState("Aguardando...");

  useEffect(() => {
    const fix = async () => {
      setStatus("Corrigindo...");

      // 1. Buscar produtos com imagem ruim
      const { data: products } = await supabase.from("products").select("*");

      if (!products) {
        setStatus("Erro ao buscar produtos.");
        return;
      }

      let count = 0;

      for (const p of products) {
        let newUrl = p.image_url;

        // Correção Unsplash
        if (p.image_url.includes("unsplash.com/photos")) {
          // Substitui por uma imagem válida de tecnologia
          newUrl = "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop";
        }

        // Correção Placeholder
        if (p.image_url.includes("via.placeholder.com")) {
            newUrl = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop";
        }
        
        // Correção Wikipedia (Logo Pix)
        if (p.image_url.includes("wikimedia.org")) {
             newUrl = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop";
        }

        if (newUrl !== p.image_url) {
          await supabase.from("products").update({ image_url: newUrl }).eq("id", p.id);
          count++;
        }
      }

      setStatus(`Pronto! ${count} imagens corrigidas.`);
    };

    fix();
  }, []);

  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold mb-4">Ferramenta de Correção de Imagens</h1>
      <p className="text-xl">{status}</p>
    </div>
  );
}
