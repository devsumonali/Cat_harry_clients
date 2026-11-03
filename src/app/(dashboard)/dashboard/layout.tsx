import type { DashboardLayoutProps } from '@/app/types/type';
import Sidebar from "@/app/component/layout/Sidebar";

export default function DashboardLayout({ children }: DashboardLayoutProps) {
     return (
          <div className="flex-1 bg-[#fcfaf9]">
               <div className="container mx-auto flex flex-col gap-6 px-4 py-8 lg:flex-row lg:gap-7 lg:px-0">
                    <Sidebar />
                    <main className="min-w-0 flex-1">{children}</main>
               </div>
          </div>
     );
}
