'use client';
import {Button} from '@/components/ui/button';
import {useEffect, useRef} from 'react';

interface HeroSectionProps {
  isLoggedIn: boolean;
  onSignIn: () => void;
  onSignOut: () => void;
}

export function HeroSection({
  isLoggedIn,
  onSignIn,
  onSignOut,
}: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75;
    }
  }, []);

  return (
    <div className='relative min-h-screen overflow-hidden'>
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className='absolute top-0 left-0 w-full h-full object-cover blur-[1px]'>
        <source src='/vid.mp4' type='video/mp4' />
        Your browser does not support the video tag.
      </video>

      {/* Side Gradient Overlay */}
      <div className='absolute inset-0 bg-gradient-to-r from-black/20 to-transparent' />

      {/* Bottom Gradient Overlay */}
      <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40' />

      {/* Content */}
      <div className='relative'>
        <div className='container mx-auto px-24 pt-44'>
          <div className='max-w-2xl'>
            <h1 className='text-5xl md:text-6xl font-bold text-green-600 leading-tight mb-6 drop-shadow-lg'>
              Your Path
              <br />
              to a Greener Future
            </h1>
            <p className='text-xl text-gray-50 mb-8 max-w-xl font-medium drop-shadow'>
              Empower yourself to make a difference. Track, analyze, and reduce
              your plastic footprint with our intuitive web tool.
            </p>
            <Button
              variant='secondary'
              className='text-lg px-8 py-4 bg-[#E3E6C3] hover:bg-[#D1D4B1] text-slate-900 shadow-md hover:scale-90'
              onClick={isLoggedIn ? onSignOut : onSignIn}>
              {' '}
              {isLoggedIn ? 'Logout' : 'Get Started'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
