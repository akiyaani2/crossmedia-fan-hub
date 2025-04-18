'use client';
export default function SearchField({
  placeholder,
  onChange,
}: {
  placeholder: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      placeholder={placeholder}
      className="w-full bg-gray-700/40 border border-medium-gray/50 rounded px-2 py-1 mb-2 text-sm focus:outline-none focus:border-neon-accent/70 focus:ring-1 focus:ring-neon-accent/50 transition-colors duration-150"
      onChange={(e) => onChange(e.target.value)}
    />
  );
} 