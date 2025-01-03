import {Sidebar} from '@/components/dashboard/sidebar';
import {Header} from '@/components/dashboard/header';

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <div className='flex h-screen'>
      <Sidebar />
      <div className='flex-1 flex flex-col'>
        <Header />
        <main className='flex-1 overflow-auto bg-gray-50 p-6'>{children}</main>
      </div>
    </div>
  );
}
