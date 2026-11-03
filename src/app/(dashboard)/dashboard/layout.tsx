import type { DashboardLayoutProps } from '@/app/types/type';
import Sidebar from "@/app/component/layout/Sidebar";
import { Suspense } from 'react';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getSession } from '@/app/libs/session';

async function DashboardContent({ children }: DashboardLayoutProps) {
     const session = await getSession(await headers());
     if (!session) redirect('/login?callbackURL=%2Fdashboard%2Foverview');
     return (
          <div className="flex-1 bg-[#fcfaf9]">
               <div className="container mx-auto flex flex-col gap-6 px-4 py-8 lg:flex-row lg:gap-7 lg:px-0">
                    <Sidebar name={session.user.name} role={session.user.email} bookingCount={0} hasUnreadMessages={false} />
                    <main className="min-w-0 flex-1">{children}</main>
               </div>
          </div>
     );
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
     return (
          <Suspense fallback={<div className="flex-1 bg-[#fcfaf9] p-12 text-center" role="status">Loading your dashboard…</div>}>
               <DashboardContent>{children}</DashboardContent>
          </Suspense>
     );
}
