'use client';
import React from 'react';
export function Button({ children, className = '', ...props }: any) {
  return <button className={'px-4 py-2 rounded bg-sky-600 text-white ' + className} {...props}>{children}</button>;
}
