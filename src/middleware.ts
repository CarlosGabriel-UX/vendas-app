import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  try {
    // Se não tiver URL do supabase configurada, ignora o middleware (modo de segurança)
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return res;
    }

    const supabase = createMiddlewareClient({ req, res });
    
    // Tenta pegar a sessão
    const { data: { session } } = await supabase.auth.getSession();

    // Se der erro ou não tiver sessão, session será null.
    // O código abaixo lida com isso.

    const path = req.nextUrl.pathname;

    // Proteção Admin
    if (path.startsWith('/admin')) {
      if (!session) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
      if (session.user.email !== 'carlosgabriel8058@gmail.com') {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }

    // Proteção Minha Conta
    if (path.startsWith('/minha-conta')) {
      if (!session) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }

  } catch (e) {
    // Se o Supabase falhar (ex: URL inválida), deixa passar ou redireciona para login
    console.error("Middleware Error:", e);
    // Não vamos bloquear o site todo por erro no middleware
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*', '/minha-conta/:path*'],
};
