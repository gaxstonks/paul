'use client';
import React from 'react';
export function Card({ children, className = '' }: any) {
  return <div className={'p-6 rounded bg-white shadow ' + className}>{children}</div>;
}
