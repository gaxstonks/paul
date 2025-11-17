import React from 'react';
import { getServerSession } from 'next-auth/next';

export default async function Downloads() {
  const session = await getServerSession({});
  if (!session || !session.user?.email) {
    return (<main className='p-8'><h1>Não autenticado</h1><p>Faça login para acessar os downloads.</p></main>);
  }
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Downloads</h1>
      <ul className="mt-4 list-disc ml-6">
        <li><a href="/public/downloads-sample-cv.pdf" className="underline">Currículo Modelo (PDF)</a></li>
      </ul>
    </main>
  );
}
