import { NextResponse } from 'next/server';
import MercadoPagoConfig, { Payment } from 'mercadopago';
import { createClient } from '@supabase/supabase-js';

const client = new MercadoPagoConfig({ 
  accessToken: process.env.MP_ACCESS_TOKEN || '' 
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const topic = url.searchParams.get('topic') || url.searchParams.get('type');
    const id = url.searchParams.get('id') || url.searchParams.get('data.id');

    if (topic === 'payment' && id) {
      const payment = new Payment(client);
      const paymentData = await payment.get({ id });

      const orderId = paymentData.external_reference;
      const status = paymentData.status === 'approved' ? 'paid' : paymentData.status;

      // Atualizar pedido no banco
      if (orderId) {
        await supabase
          .from('orders')
          .update({ 
            status: status === 'paid' ? 'processing' : 'pending', // 'processing' = pago e aguardando envio
            payment_id: id
          })
          .eq('id', orderId);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Webhook Failed" }, { status: 500 });
  }
}
