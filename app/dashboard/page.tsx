export const dynamic = "force-dynamic";
import React from 'react';
import { getSubscriptionStatus } from '@/lib/subscription';
import { prisma } from '../../lib/prisma';
import { getServerSession } from 'next-auth/next';

export default async function Dashboard() {
  const session = await getServerSession({});
  if (!session || !session.user?.email) {
    return (<main className='p-8'><h1>Não autenticado</h1><p>Faça login para acessar o dashboard.</p></main>);
  }
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  const status = getSubscriptionStatus(user);
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Olá, {user?.name || user?.email}</p>
      <p>{status.active ? `Plano ativo até ${new Date(status.expires).toLocaleString()}` : 'Sem plano ativo'}</p>
    </main>
  );
}
