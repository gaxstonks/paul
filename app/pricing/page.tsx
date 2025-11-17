'use client';
import React from 'react';

export default function Pricing() {
  async function handleCheckout() {
    const res = await fetch('/api/create-checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'user@example.com', priceId: 'price_XXXX' }) });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
    else alert('Erro ao criar checkout');
  }

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Planos</h1>
      <p className="mt-2">Escolha um plano para liberar downloads.</p>
      <div className="mt-4">
        <button onClick={handleCheckout} className="px-4 py-2 bg-sky-600 text-white rounded">Comprar exemplo</button>
      </div>
    </main>
  );
}
