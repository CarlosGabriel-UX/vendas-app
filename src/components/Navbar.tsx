"use client";

import Link from "next/link";
import { ShoppingCart, User, Menu, Search, LogOut, ChevronDown, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const items = useCartStore((state) => state.items);
  const [mounted, setMounted] = useState(false);
  const { user, signOut } = useAuth();
  const router = useRouter(); // Importar useRouter do next/navigation

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/produtos?search=${encodeURIComponent(searchTerm)}`);
    }
  };

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const handleSignOut = async () => {
    await signOut();
    setIsUserMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200/50 dark:border-white/10 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
              V
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-400">
              VendasApp
            </span>
          </Link>

          {/* Desktop Navigation - Pill Style */}
          <nav className="hidden md:flex items-center gap-1 bg-gray-100/50 dark:bg-white/5 p-1.5 rounded-full border border-gray-200/50 dark:border-white/10">
            <Link href="/" className="px-4 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/10 rounded-full transition-all">Home</Link>
            <Link href="/produtos" className="px-4 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/10 rounded-full transition-all">Produtos</Link>
            <Link href="/categorias" className="px-4 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/10 rounded-full transition-all">Categorias</Link>
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex items-center flex-1 max-w-sm mx-8 group">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Buscar..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100/50 dark:bg-white/5 border border-transparent group-hover:border-gray-200 dark:group-hover:border-white/10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white dark:focus:bg-slate-900 transition-all text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="absolute left-3 top-2.5 text-gray-400 group-hover:text-blue-500 transition-colors">
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            <Link href="/carrinho" className="relative p-2.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 rounded-full transition-colors group">
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {mounted && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-lg shadow-blue-500/30 animate-in zoom-in">
                  {totalItems}
                </span>
              )}
            </Link>
            {/* User Menu */}
            {mounted && user ? (
              <div className="relative hidden md:block">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition focus:outline-none"
                >
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-700 dark:text-blue-300 font-bold">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[100px] truncate">{user.user_metadata?.name || user.email?.split('@')[0]}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 py-1 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-3 border-b border-gray-50 dark:border-slate-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">Minha Conta</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                    </div>

                    <Link 
                      href="/minha-conta/pedidos" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Meus Pedidos
                    </Link>
                    
                    <Link 
                      href="/admin/dashboard" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Painel Admin
                    </Link>
                    
                    <button 
                      onClick={handleSignOut}
                      className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/login" className="hidden md:flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
                <User className="h-6 w-6" />
                <span>Entrar</span>
              </Link>
            )}
            <button 
              className="md:hidden p-2 text-gray-700 dark:text-gray-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 dark:border-slate-800">
            <div className="flex flex-col space-y-4">
              <input
                type="text"
                placeholder="Buscar produtos..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500 bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100"
              />
              <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
              <Link href="/produtos" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Produtos</Link>
              <Link href="/categorias" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Categorias</Link>
              
              {mounted && user ? (
                <>
                  <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-700 dark:text-blue-300 font-bold">
                        {user.email?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{user.user_metadata?.name || "Usuário"}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                    </div>
                    <Link href="/admin/dashboard" className="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
                      Painel Admin
                    </Link>
                    <button 
                      onClick={handleSignOut}
                      className="block w-full text-left py-2 text-red-600"
                    >
                      Sair da Conta
                    </button>
                  </div>
                </>
              ) : (
                <Link href="/login" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">Minha Conta</Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
