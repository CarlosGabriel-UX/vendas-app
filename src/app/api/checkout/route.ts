import { NextResponse } from 'next/server';
import MercadoPagoConfig, { Preference } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';

// Inicializa o Mercado Pago
const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN || '' 
});

// Inicializa Supabase Admin (para criar pedido antes de pagar)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { items, user_id, user_email } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Carrinho vazio" }, { status: 400 });
    }

    // 1. Criar o pedido no Supabase como 'pending'
    const total = items.reduce((acc: number, item: any) => acc + (item.price * item.quantity), 0);
    
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id,
        total,
        status: 'pending'
      })
      .select()
      .single();

    if (orderError) throw orderError;

    // 2. Criar a Preferência no Mercado Pago
    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: items.map((item: any) => ({
          id: item.id,
          title: item.name,
          quantity: item.quantity,
          unit_price: Number(item.price),
          picture_url: item.image,
          currency_id: 'BRL'
        })),
        payer: {
          email: user_email
        },
        external_reference: order.id, // ID do pedido para conciliar no webhook
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_BASE_URL}/minha-conta/pedidos?status=success`,
          failure: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout?status=failure`,
          pending: `${process.env.NEXT_PUBLIC_BASE_URL}/minha-conta/pedidos?status=pending`
        },
        auto_return: 'approved',
        notification_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/webhook/mercadopago`
      }
    });

    return NextResponse.json({ url: result.init_point });

  } catch (error: any) {
    console.error("Erro no checkout:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
