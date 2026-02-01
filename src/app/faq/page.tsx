import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQS = [
  {
    question: "Qual o prazo de entrega?",
    answer: "O prazo varia de acordo com o seu CEP e a modalidade de frete escolhida. Normalmente, para capitais, o prazo é de 2 a 5 dias úteis. Você pode simular o prazo exato na página do produto."
  },
  {
    question: "Quais as formas de pagamento?",
    answer: "Aceitamos cartão de crédito em até 12x, PIX com 5% de desconto e boleto bancário. Todas as transações são seguras e criptografadas."
  },
  {
    question: "É seguro comprar na LojaVendas?",
    answer: "Sim! Utilizamos tecnologia de ponta para proteger seus dados. Possuímos certificado SSL e processamos pagamentos através do Stripe, uma das maiores plataformas de pagamento do mundo."
  },
  {
    question: "Como acompanho meu pedido?",
    answer: "Após a compra, você receberá emails com cada atualização. Além disso, você pode acessar a área 'Meus Pedidos' no menu do usuário para ver o status em tempo real."
  },
  {
    question: "Vocês enviam para todo o Brasil?",
    answer: "Sim, entregamos em todo o território nacional através dos Correios e transportadoras parceiras."
  }
];

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
            <HelpCircle className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            Perguntas Frequentes
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Tire suas dúvidas sobre nossos produtos e serviços
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden">
              <details className="group">
                <summary className="flex justify-between items-center font-medium cursor-pointer list-none p-6 text-lg hover:text-blue-600 dark:hover:text-blue-400 transition">
                  {faq.question}
                  <span className="transition group-open:rotate-180">
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </span>
                </summary>
                <div className="text-gray-600 dark:text-gray-400 px-6 pb-6 leading-relaxed border-t border-gray-50 dark:border-slate-800/50 pt-4">
                  {faq.answer}
                </div>
              </details>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
