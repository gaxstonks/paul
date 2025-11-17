import './globals.css';
import React from 'react';
import { Toaster } from 'sonner';

export const metadata = { title: 'GAX Currículo', description: 'Plataforma de currículos' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
