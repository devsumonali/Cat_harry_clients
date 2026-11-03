import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './component/layout/Navbar';
import { Toaster } from 'react-hot-toast';
import Footer from './component/layout/Footer';
import { Suspense } from 'react';

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
          <html lang="en" className={inter.variable} suppressHydrationWarning>
               <head><script dangerouslySetInnerHTML={{ __html: "try{document.documentElement.dataset.theme=localStorage.getItem('studiospace-theme')==='dark'?'dark':'light'}catch(e){}" }} /></head>
               <body className="flex min-h-screen flex-col font-sans antialiased">
                    <Suspense fallback={<div className="h-20 border-b border-[#eee7e3] bg-white" aria-label="Loading navigation" />}>
                         <Navbar />
                    </Suspense>
                    {children}
                    <Toaster position="top-right" />
                    <Footer />
               </body>
          </html>
     );
}
