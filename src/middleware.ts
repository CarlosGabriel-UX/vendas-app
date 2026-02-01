import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ADMIN_EMAIL = 'carlosgabriel8058@gmail.com';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Proteção da rota /admin
  if (req.nextUrl.pathname.startsWith('/admin')) {
    // Se não estiver logado, manda pro login
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url));
    }

    // Se estiver logado mas NÃO for o admin, manda pra home com aviso (query param opcional)
    if (session.user.email !== ADMIN_EMAIL) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // Proteção da rota /minha-conta (precisa estar logado)
  if (req.nextUrl.pathname.startsWith('/minha-conta')) {
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*', '/minha-conta/:path*'],
};
