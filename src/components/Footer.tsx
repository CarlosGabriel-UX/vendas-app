"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, CreditCard, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-gray-300 pt-20 pb-10 border-t border-gray-800">
      <div className="container mx-auto px-4">
        
        {/* Newsletter Section */}
        <div className="bg-blue-600 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 mb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          <div className="relative z-10 max-w-lg">
            <h3 className="text-white text-3xl font-bold mb-2">Fique por dentro das ofertas!</h3>
            <p className="text-blue-100">Cadastre-se para receber descontos exclusivos e novidades em primeira mão.</p>
          </div>
          <div className="relative z-10 w-full max-w-md">
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Seu melhor email" 
                className="flex-1 px-6 py-4 rounded-full bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 shadow-lg"
              />
              <button className="bg-slate-900 text-white px-8 py-4 rounded-full font-bold hover:bg-slate-800 transition shadow-lg flex items-center gap-2">
                Assinar <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">V</span>
              </div>
              <h3 className="text-white text-2xl font-bold tracking-tight">Vendas<span className="text-blue-500">App</span></h3>
            </div>
            <p className="text-sm leading-relaxed text-gray-400">
              Transformando a maneira como você compra tecnologia. 
              Produtos selecionados, garantia estendida e suporte premium.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all duration-300"><Instagram className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all duration-300"><Twitter className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Navegação</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-blue-400 transition flex items-center gap-2">Home</Link></li>
              <li><Link href="/produtos" className="hover:text-blue-400 transition flex items-center gap-2">Todos os Produtos</Link></li>
              <li><Link href="/categorias" className="hover:text-blue-400 transition flex items-center gap-2">Categorias</Link></li>
              <li><Link href="/sobre" className="hover:text-blue-400 transition flex items-center gap-2">Quem Somos</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Ajuda</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/minha-conta/pedidos" className="hover:text-blue-400 transition">Meus Pedidos</Link></li>
              <li><Link href="/trocas" className="hover:text-blue-400 transition">Trocas e Devoluções</Link></li>
              <li><Link href="/faq" className="hover:text-blue-400 transition">Perguntas Frequentes</Link></li>
              <li><Link href="/contato" className="hover:text-blue-400 transition">Fale Conosco</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Contato</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3 text-gray-400">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span>Av. Paulista, 1000 - Bela Vista<br/>São Paulo - SP, 01310-100</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                <span>(11) 99999-9999</span>
              </li>
              <li className="flex items-center gap-3 text-gray-400">
                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                <span>suporte@vendasapp.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
          <p>&copy; {new Date().getFullYear()} VendasApp. Todos os direitos reservados.</p>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 opacity-70 grayscale hover:grayscale-0 transition duration-300">
              <CreditCard className="w-6 h-6" />
              <span className="font-semibold">Pagamento Seguro</span>
            </div>
            <div className="flex gap-3">
              <div className="h-8 w-12 bg-white rounded flex items-center justify-center"><img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" /></div>
              <div className="h-8 w-12 bg-white rounded flex items-center justify-center"><img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5" /></div>
              <div className="h-8 w-12 bg-white rounded flex items-center justify-center"><img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo%E2%80%94pix_powered_by_Banco_Central_%28Brazil%2C_2020%29.svg" alt="Pix" className="h-4" /></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
