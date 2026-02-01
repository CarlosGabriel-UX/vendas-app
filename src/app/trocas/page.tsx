import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { RefreshCw, ShieldCheck, Truck, AlertCircle } from "lucide-react";

export default function ReturnsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-8 md:p-12">
          <h1 className="text-3xl font-bold mb-8 text-center">Política de Trocas e Devoluções</h1>
          
          <div className="space-y-12">
            <section>
              <div className="flex items-center gap-3 mb-4 text-blue-600 dark:text-blue-400">
                <RefreshCw className="w-6 h-6" />
                <h2 className="text-xl font-bold">Troca por Arrependimento</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                De acordo com o Código de Defesa do Consumidor, você tem até <strong>7 dias corridos</strong> após o recebimento do produto para solicitar a troca ou devolução por arrependimento. O produto deve estar em sua embalagem original, sem indícios de uso e com todos os acessórios.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4 text-green-600 dark:text-green-400">
                <ShieldCheck className="w-6 h-6" />
                <h2 className="text-xl font-bold">Garantia e Defeito</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Todos os nossos produtos possuem garantia de <strong>90 dias a 1 ano</strong> (dependendo do fabricante). Caso o produto apresente defeito de fabricação, entre em contato conosco imediatamente. Faremos a análise técnica e, confirmado o defeito, realizaremos a troca ou reparo sem custos.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4 text-purple-600 dark:text-purple-400">
                <Truck className="w-6 h-6" />
                <h2 className="text-xl font-bold">Como Enviar</h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                Após solicitar a troca pelo nosso canal de atendimento, você receberá um código de postagem reversa dos Correios. Basta levar o produto embalado até uma agência e apresentar o código. O frete da primeira troca é por nossa conta.
              </p>
            </section>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6 flex gap-4">
              <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-500 shrink-0" />
              <div>
                <h3 className="font-bold text-yellow-800 dark:text-yellow-400 mb-2">Atenção</h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  Não aceitamos devoluções de produtos com indícios de mau uso, dano acidental ou sem a embalagem original. Verifique o produto no ato da entrega e recuse o recebimento caso a embalagem esteja violada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
