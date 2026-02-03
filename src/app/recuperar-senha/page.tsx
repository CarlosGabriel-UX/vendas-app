"use client";

import Link from "next/link";
import { Mail, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase"; // Cliente padrão (sem auth-helpers)

export const dynamic = "force-dynamic";

export default function RecoverPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // URL para onde o usuário será redirecionado após clicar no email
      // Importante: Essa URL deve ser permitida no painel do Supabase (Authentication > URL Configuration)
      const redirectTo = `${window.location.origin}/atualizar-senha`;

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo,
      });

      if (error) {
        console.error("Erro detalhado do Supabase:", error);
        throw error;
      }

      setIsSuccess(true);
    } catch (err: any) {
      console.error("Erro ao enviar email:", err);
      // Mostra a mensagem real do erro se disponível
      setError(err.message || "Ocorreu um erro ao tentar enviar o email. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden p-8 text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Enviado!</h2>
          <p className="text-gray-600 mb-8">
            Verifique sua caixa de entrada (e spam) para encontrar o link de recuperação de senha.
          </p>
          <Link 
            href="/login" 
            className="inline-flex items-center text-blue-600 font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para o Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Recuperar Senha</h1>
            <p className="text-gray-500 text-sm">
              Digite seu email e enviaremos um link para você redefinir sua senha.
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition shadow-lg shadow-blue-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Enviando..." : "Enviar Link"}
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link href="/login" className="text-sm text-gray-500 hover:text-gray-700 inline-flex items-center">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Voltar para o Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
