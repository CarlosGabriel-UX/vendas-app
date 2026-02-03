import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProtectedRoute from "@/components/ProtectedRoute"; // Vou criar este componente

export const dynamic = "force-dynamic";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}
