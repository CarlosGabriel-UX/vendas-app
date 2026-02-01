"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, MapPin, Phone, Clock, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => setIsSent(false), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Entre em Contato</h1>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Tem alguma dúvida ou sugestão? Nossa equipe está pronta para te atender.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Informações de Contato */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Canais de Atendimento</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Telefone</h4>
                    <p className="text-gray-500">(11) 99999-9999</p>
                    <p className="text-xs text-blue-600 mt-1">Seg a Sex, 9h às 18h</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 p-3 rounded-full text-green-600">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-500">contato@lojavendas.com.br</p>
                    <p className="text-xs text-blue-600 mt-1">Respondemos em até 24h</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Endereço</h4>
                    <p className="text-gray-500">Av. Paulista, 1000 - Bela Vista</p>
                    <p className="text-gray-500">São Paulo - SP</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-600 p-8 rounded-2xl shadow-lg text-white">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" /> Horário de Funcionamento
              </h3>
              <ul className="space-y-2 text-blue-100">
                <li className="flex justify-between">
                  <span>Segunda a Sexta</span>
                  <span>09:00 - 18:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Sábado</span>
                  <span>09:00 - 13:00</span>
                </li>
                <li className="flex justify-between">
                  <span>Domingo</span>
                  <span>Fechado</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Formulário */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-fit">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Envie uma mensagem</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Nome</label>
                  <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
                </div>
              </div>
              
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Assunto</label>
                <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Dúvida sobre produto</option>
                  <option>Status do pedido</option>
                  <option>Trocas e devoluções</option>
                  <option>Outros</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Mensagem</label>
                <textarea rows={5} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required></textarea>
              </div>

              <button 
                type="submit" 
                className={`w-full font-bold py-3 rounded-lg transition flex items-center justify-center gap-2 ${
                  isSent 
                    ? "bg-green-600 hover:bg-green-700 text-white" 
                    : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200"
                }`}
              >
                {isSent ? "Mensagem Enviada!" : (
                  <>
                    Enviar Mensagem <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
