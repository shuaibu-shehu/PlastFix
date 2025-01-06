import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Leaf } from 'lucide-react';

interface HeroSectionProps {
    isLoggedIn: boolean;
    onSignIn: () => void;
    onSignOut: () => void;
}

export function NavBar({ isLoggedIn, onSignIn, onSignOut }: HeroSectionProps) {
    return (
        <nav className='fixed top-0 left-0 right-0 z-50 bg-transparent'>
            <div className='container mx-auto px-20'>
                <div className='flex items-center justify-between h-16'>
                    <Link href='/' className='flex items-center space-x-2'>
                        <Leaf className='h-8 w-8 text-green-500' />
                        <span className='text-2xl font-bold text-green-500'>
                            EcoTracker
                        </span>
                    </Link>

                    <div className='hidden md:flex items-center space-x-8 font-bold'>
                        <Link
                            href='/'
                            className='text-gray-300 hover:text-green-700'></Link>
                        <Link
                            href='/about'
                            className='text-gray-300 hover:text-green-700'></Link>
                        <Link
                            href='/features'
                            className='text-gray-300 hover:text-green-700'></Link>
                    </div>

                    <div className='flex items-center space-x-4'>
                        <Button
                            variant='secondary'
                            className='bg-green-100 hover:bg-green-200 text-green-700'>
                            Donate
                        </Button>
                        <Button
                            variant='secondary'
                            className='bg-green-100 hover:bg-green-200 text-green-700 hover:scale-90'
                            onClick={isLoggedIn ? onSignOut : onSignIn}>
                            {' '}
                            {isLoggedIn ? 'Logout' : 'Login'}
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
}