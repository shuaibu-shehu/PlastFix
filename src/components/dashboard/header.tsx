'use client';

import React from 'react';
import {Bell, Search} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  return (
    <header className='border-b bg-white px-6 py-3'>
      <div className='flex items-center justify-between'>
        <div className='relative w-96'>
          <Search className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input placeholder='Search resources...' className='pl-8' />
        </div>
        <div className='flex items-center gap-4'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' size='icon'>
                <Bell className='h-5 w-5' />
                <span className='sr-only'>Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem>New tip available!</DropdownMenuItem>
              <DropdownMenuItem>Weekly report ready</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant='default'>Log Plastic Usage</Button>
        </div>
      </div>
    </header>
  );
}
