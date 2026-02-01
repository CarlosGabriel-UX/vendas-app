import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { Laptop, Headphones, Watch, Camera, Gamepad, Smartphone } from "lucide-react";

const CATEGORIES = [
  {
    name: "Computadores",
    icon: Laptop,
    count: 120,
    color: "bg-blue-100 text-blue-600",
    description: "Notebooks, Desktops e Acessórios"
  },
  {
    name: "Smartphones",
    icon: Smartphone,
    count: 85,
    color: "bg-purple-100 text-purple-600",
    description: "Android, iOS e Acessórios"
  },
  {
    name: "Áudio",
    icon: Headphones,
    count: 45,
    color: "bg-green-100 text-green-600",
    description: "Fones, Caixas de Som e Home Theater"
  },
  {
    name: "Wearables",
    icon: Watch,
    count: 32,
    color: "bg-orange-100 text-orange-600",
    description: "Smartwatches e Pulseiras Inteligentes"
  },
  {
    name: "Fotografia",
    icon: Camera,
    count: 28,
    color: "bg-pink-100 text-pink-600",
    description: "Câmeras, Lentes e Drones"
  },
  {
    name: "Games",
    icon: Gamepad,
    count: 64,
    color: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
    description: "Consoles, Jogos e Periféricos"
  }
];

export default function CategoriesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Categorias</h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Explore nossa ampla seleção de produtos organizados por departamento. 
            Tudo o que você precisa em tecnologia está aqui.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => (
            <Link 
              href={`/produtos?search=${encodeURIComponent(category.name)}`}
              key={category.name}
              className="group bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800 transition duration-300 flex items-start gap-6"
            >
              <div className={`p-4 rounded-xl ${category.color} group-hover:scale-110 transition duration-300`}>
                <category.icon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                  {category.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{category.description}</p>
                <span className="text-xs font-semibold bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded text-gray-600 dark:text-gray-300">
                  {category.count} produtos
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
