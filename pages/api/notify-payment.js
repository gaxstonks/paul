import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  const { email, plan, expiresAt } = req.body;
  if (!email || !plan) return res.status(400).json({ message: 'email and plan required' });
  await prisma.user.updateMany({ where: { email }, data: { plan, planActiveUntil: expiresAt ? new Date(expiresAt) : null } });
  res.json({ ok: true });
}
