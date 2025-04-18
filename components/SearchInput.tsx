'use client';
import { ChangeEvent } from 'react';

interface Props { value: string; onChange(v: string): void }
export default function SearchInput({ value, onChange }: Props) {
  return (
    <input
      placeholder="Search titles…"
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      className="w-full mb-4 rounded border border-gray-300 px-4 py-2"
    />
  );
} 