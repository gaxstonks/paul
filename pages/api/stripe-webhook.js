import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2022-11-15' });
const prisma = new PrismaClient();

export default async function handler(req, res) {
  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'] || '';
  try {
    const event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET || '');
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const email = session.customer_details?.email;
      const metadata = session.metadata || {};
      const plan = metadata.plan || 'pro';
      const expiresAt = metadata.expiresAt || null;
      if (email) {
        await prisma.user.updateMany({ where: { email }, data: { plan, planActiveUntil: expiresAt ? new Date(expiresAt) : null } });
      }
    }
    res.json({ received: true });
  } catch (e) {
    res.status(400).send(`Webhook Error: ${e.message}`);
  }
}

// small helper to parse buffer
import { Readable } from 'stream';
async function buffer(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  return Buffer.concat(chunks);
}
