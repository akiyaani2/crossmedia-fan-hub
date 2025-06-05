'use client';

import { useState } from 'react';
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';
import { Toaster } from 'sonner'; // Keep Toaster here as it needs client context

export default function SupabaseProvider({
  children,
  // initialSession, // Passed from server if using SSR helpers
}: {
  children: React.ReactNode;
  // initialSession: Session | null;
}) {
  // Create a new supabase browser client on every render.
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      // initialSession={initialSession} // Pass initial session if using SSR
    >
      {children}
      <Toaster richColors position="bottom-right" /> {/* Add Toaster */} 
    </SessionContextProvider>
  );
} 