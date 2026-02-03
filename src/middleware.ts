import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADMIN_EMAIL = 'carlosgabriel8058@gmail.com';

export async function middleware(req: NextRequest) {
  try {
    const res = NextResponse.next();
    
    // Fallback seguro: se não tiver chaves, não tenta crashar o supabase
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error("Middleware: Chaves do Supabase não encontradas!");
      // Se for rota protegida e não tiver chave, redireciona para home ou login para evitar crash
      if (req.nextUrl.pathname.startsWith('/admin') || req.nextUrl.pathname.startsWith('/minha-conta')) {
         return NextResponse.redirect(new URL('/login', req.url));
      }
      return res;
    }

    const supabase = createMiddlewareClient({ req, res });

    const {
      data: { session },
    } = await supabase.auth.getSession();

    // Proteção da rota /admin
    if (req.nextUrl.pathname.startsWith('/admin')) {
      if (!session) {
        return NextResponse.redirect(new URL('/login', req.url));
      }

      if (session.user.email !== ADMIN_EMAIL) {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }

    // Proteção da rota /minha-conta
    if (req.nextUrl.pathname.startsWith('/minha-conta')) {
      if (!session) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }

    return res;
  } catch (error) {
    console.error("Erro fatal no Middleware:", error);
    // Em caso de erro grave, redireciona para login para não quebrar o site
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/admin/:path*', '/minha-conta/:path*'],
};
