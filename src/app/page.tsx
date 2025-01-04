'use client';
import {HeroSection} from '@/components/landing/hero';
import {NavBar} from '@/components/landing/nav-bar';
import {OrbSection} from '@/components/landing/orb-section';

import {signOut, signIn, useSession} from 'next-auth/react';

// LandingPage.tsx
//rem vid
export default function LandingPage() {
  const {data: session} = useSession();
  const user = session?.user;

  const handleSignIn = () => {
    signIn('google', {callbackUrl: '/dashboard'});
  };

  const handleSignOut = () => {
    signOut();
  };

  return (
    <div className='min-h-screen'>
      <NavBar
        isLoggedIn={!!user}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
      />
      <HeroSection
        isLoggedIn={!!user}
        onSignIn={handleSignIn}
        onSignOut={handleSignOut}
      />
      <OrbSection />
    </div>
  );
}
