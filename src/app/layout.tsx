import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './component/layout/Navbar';
import { Toaster } from 'react-hot-toast';

const inter = Inter({
     subsets: ['latin'],
     display: 'swap',
     variable: '--font-inter',
});

export const metadata: Metadata = {
     title: 'StudioSpace | Creative Studio Booking',
     description:
          'Discover and book creative studios, photography spaces, podcast rooms, and production workspaces.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
     return (
          <html lang="en" className={inter.variable}>
               <body className="flex min-h-screen flex-col font-sans antialiased">
                    <Navbar />
                    {children}
                    <Toaster position="top-right" />
               </body>
          </html>
     );
}
