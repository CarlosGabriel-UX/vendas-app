"use client";

import AdminSidebar from "@/components/admin/Sidebar";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 md:relative md:translate-x-0 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <AdminSidebar />
        {/* Close Button Mobile */}
        <button 
          onClick={() => setIsSidebarOpen(false)}
          className="absolute top-4 right-4 text-white md:hidden p-2 hover:bg-white/10 rounded-full"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-slate-900 text-white p-4 flex items-center justify-between sticky top-0 z-30 shadow-md">
          <h1 className="font-bold text-lg">Painel Admin</h1>
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-white/10 rounded-lg">
            <Menu className="w-6 h-6" />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
