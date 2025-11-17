import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2022-11-15' });

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, priceId } = req.body;
  if (!email || !priceId) return res.status(400).json({ error: 'email and priceId required' });
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/payment-success`,
    cancel_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/pricing`,
    metadata: { email, priceId }
  });
  res.json({ url: session.url });
}
