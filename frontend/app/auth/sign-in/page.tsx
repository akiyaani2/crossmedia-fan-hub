'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignInPage() {
  const supabase = useSupabaseClient();
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    // If already signed in, redirect home using Next Router
    if (session) {
      router.push('/');
    }
  }, [session, router]);

  // If session exists, render null while redirecting
  if (session) {
    return null; 
  }

  // Customize the Auth UI appearance to match the app theme
  const customTheme = {
    ...ThemeSupa, // Start with the default Supa theme
    default: {
      colors: {
        brand: 'hsl(250, 60%, 60%)', // Use cosmic-blue or similar
        brandAccent: 'hsl(250, 70%, 70%)', // Lighter accent
        brandButtonText: 'white',
        defaultButtonBackground: 'hsl(240, 15%, 20%)', // Darker gray like midnight-ink-dark
        defaultButtonBackgroundHover: 'hsl(240, 15%, 30%)',
        defaultButtonBorder: 'hsl(240, 10%, 40%)',
        defaultButtonText: 'hsl(0, 0%, 95%)',
        dividerBackground: 'hsl(240, 10%, 40%)',
        inputBackground: 'hsl(240, 15%, 15%)', // Dark input
        inputBorder: 'hsl(240, 10%, 40%)',
        inputBorderHover: 'hsl(250, 60%, 60%)', // Highlight with brand color
        inputBorderFocus: 'hsl(250, 60%, 60%)',
        inputText: 'hsl(0, 0%, 95%)',
        inputLabelText: 'hsl(240, 5%, 70%)',
        inputPlaceholder: 'hsl(240, 10%, 50%)',
        messageText: 'hsl(0, 0%, 90%)',
        messageTextDanger: 'hsl(0, 80%, 80%)',
        anchorTextColor: 'hsl(180, 80%, 70%)', // Use neon-accent or similar
        anchorTextHoverColor: 'hsl(180, 90%, 80%)',
      },
      space: {
        spaceSmall: '4px',
        spaceMedium: '8px',
        spaceLarge: '16px',
        labelBottomMargin: '8px',
        anchorBottomMargin: '4px',
        emailInputSpacing: '8px',
        socialAuthSpacing: '12px',
        buttonPadding: '10px 15px',
        inputPadding: '10px 12px',
      },
      fontSizes: {
        baseBodySize: '14px',
        baseInputSize: '14px',
        baseLabelSize: '14px',
        baseButtonSize: '14px',
      },
      fonts: {
        bodyFontFamily: `var(--font-inter), sans-serif`,
        buttonFontFamily: `var(--font-inter), sans-serif`,
        inputFontFamily: `var(--font-inter), sans-serif`,
        labelFontFamily: `var(--font-inter), sans-serif`,
      },
      // Add other theme variables if needed
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-midnight-ink px-4 py-12">
      <div className="bg-gray-800/60 border border-medium-gray/30 p-6 md:p-8 rounded-lg shadow-xl w-full max-w-md backdrop-blur-sm">
        {/* Optional: Add your logo or app name here */}
         <h1 className="text-3xl font-bold text-center text-cosmic-blue mb-6 font-headline">Welcome Back</h1> 
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: customTheme }}
          providers={['google', 'github']} // Make sure these are enabled in Supabase Dashboard
          magicLink={true}
          theme="dark" // Use dark variant of the theme
          redirectTo={typeof window !== 'undefined' ? `${window.location.origin}/auth/callback` : undefined}
        />
      </div>
    </div>
  );
} 