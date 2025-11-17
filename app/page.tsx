'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
const AuthModal = dynamic(() => import('./components/custom/auth-modal'), { ssr: false });

export default function HomePage() {
  const [showAuth, setShowAuth] = useState(true);
  return (
    <>
      {showAuth && <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} onSuccess={() => setShowAuth(false)} />}
      <main className="min-h-screen flex items-center justify-center p-12">
        <div className="max-w-4xl text-center">
          <h1 className="text-4xl font-bold mb-4">GAX Currículo</h1>
          <p className="text-lg text-gray-600">Crie currículos profissionais em minutos.</p>
        </div>
      </main>
    </>
  );
}
