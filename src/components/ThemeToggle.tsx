"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evita hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" />; // Placeholder
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      title="Alternar Tema"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5 text-yellow-400 transition-all hover:rotate-90" />
      ) : (
        <Moon className="h-5 w-5 text-slate-700 transition-all hover:-rotate-12" />
      )}
      <span className="sr-only">Alternar tema</span>
    </button>
  );
}
