'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {cn} from '@/lib/utils';
import {
  BarChart3,
  BookOpen,
  Leaf,
  LayoutDashboard,
  Plus,
  Settings,
  LogOut,
} from 'lucide-react';
import { Button } from '../ui/button';
import { signOut } from 'next-auth/react';

const links = [
  {name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard},
  {name: 'Log Usage', href: '/log', icon: Plus},
  {name: 'Reports', href: '/dashboard/reports', icon: BarChart3},
  {name: 'Resources', href: '/dashboard/resource', icon: BookOpen},
  {name: 'Tips', href: '/tips', icon: Leaf},
];

export function Sidebar() {
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut(); // Assuming signOut is the function to log out
    window.location.href = '/login'; // Redirect to the login page after logout
  }


  return (
    <div className='flex h-full w-56 flex-col border-r bg-white'>
      <div className='p-6'>
        <Link
          href='/'
          className='flex items-center gap-2 font-semibold text-green-600'>
          <Leaf className='h-6 w-6' />
          <span>EcoTracker</span>
        </Link>
      </div>
      <nav className='flex-1 space-y-1 px-3'>
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium',
                pathname === link.href
                  ? 'bg-green-50 text-green-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              )}>
              <Icon className='h-5 w-5' />
              {link.name}
            </Link>
          );
        })}
      </nav>
      <div className='border-t p-3'>
        <Link
          href='/settings'
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          )}>
          <Settings className='h-5 w-5' />
          Settings
        </Link>
        <Button
          variant={'outline'}
          onClick={() => {
            handleLogout()
          }}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          )}>
          <LogOut className='h-5 w-5' />
          Logout
        </Button>
      </div>
    </div>
  );
}
