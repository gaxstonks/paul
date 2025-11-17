'use client';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';

export default function AuthModal({ isOpen=true, onClose=()=>{}, onSuccess=()=>{} }: any) {
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signup() {
    setLoading(true);
    try {
      const res = await fetch('/api/signup', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password }) });
      const data = await res.json();
      if (!res.ok) { toast.error(data.message || 'Erro'); setLoading(false); return; }
      toast.success('Conta criada. Faça login.');
      setMode('login');
    } catch (e) { toast.error('Erro'); }
    setLoading(false);
  }

  async function login() {
    setLoading(true);
    try {
      const res = await signIn('credentials', { redirect: false, email, password });
      if (res && res.ok) { toast.success('Logado'); onSuccess(); onClose(); }
      else toast.error('Erro ao logar');
    } catch (e) { toast.error('Erro'); }
    setLoading(false);
  }

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 grid place-items-center bg-black/40 z-50">
      <div className="bg-white p-6 rounded-md w-96">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{mode==='login'?'Entrar':'Criar conta'}</h3>
          <button onClick={onClose}>×</button>
        </div>
        {mode==='signup' && (<><label>Nome</label><input className="border p-2 w-full" value={name} onChange={e=>setName(e.target.value)} /></>)}
        <label>Email</label>
        <input className="border p-2 w-full" value={email} onChange={e=>setEmail(e.target.value)} />
        <label>Senha</label>
        <input type="password" className="border p-2 w-full" value={password} onChange={e=>setPassword(e.target.value)} />
        <div className="mt-4 flex gap-2">
          {mode==='login' ? <Button onClick={login} disabled={loading}>Entrar</Button> : <Button onClick={signup} disabled={loading}>Criar conta</Button>}
          <button className="text-sm underline" onClick={()=>setMode(mode==='login'?'signup':'login')}>{mode==='login'?'Criar conta':'Já tenho conta'}</button>
        </div>
      </div>
    </div>
  );
}
