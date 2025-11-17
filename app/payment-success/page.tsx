import React from 'react';
import { Card } from '../components/ui/card';

export default function PaymentSuccess() {
  return (
    <main className="p-8">
      <Card>
        <h1 className="text-2xl font-bold">Pagamento confirmado</h1>
        <p>Seu plano está ativo. Obrigado!</p>
      </Card>
    </main>
  );
}
