import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Target, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-gray-900 dark:text-gray-100">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero */}
        <div className="bg-blue-600 dark:bg-blue-900 py-20 text-center text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Sobre a LojaVendas</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Nossa missão é democratizar o acesso à tecnologia de ponta com preços justos e atendimento de excelência.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600 dark:text-blue-400">
                <Target className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Missão</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Oferecer os melhores produtos eletrônicos do mercado, garantindo qualidade, procedência e a satisfação total dos nossos clientes em cada compra.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-purple-600 dark:text-purple-400">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Valores</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Transparência em todas as etapas, respeito ao consumidor, inovação constante e paixão por tecnologia são os pilares que nos movem.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-400">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Equipe</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Somos um time apaixonado por tecnologia, sempre pronto para ajudar você a encontrar o produto perfeito para suas necessidades.
              </p>
            </div>
          </div>
        </div>

        {/* Story */}
        <div className="bg-gray-50 dark:bg-slate-900 py-16">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Nosso escritório" 
                className="rounded-2xl shadow-xl"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Nossa História</h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-400">
                <p>
                  Fundada em 2024, a LojaVendas nasceu da necessidade de encontrar produtos tecnológicos de alta qualidade em um único lugar, com garantia real e suporte em português.
                </p>
                <p>
                  Começamos como uma pequena startup em São Paulo e hoje atendemos milhares de clientes em todo o Brasil, sempre mantendo o compromisso com a agilidade na entrega e o respeito ao consumidor.
                </p>
                <p>
                  Acreditamos que a tecnologia deve ser facilitadora, e por isso trabalhamos incansavelmente para trazer as últimas novidades do mercado global diretamente para sua casa.
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
