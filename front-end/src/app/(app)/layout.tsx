import type { ReactNode } from 'react';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/dashboard/sidebar-nav';
import { Header } from '@/components/dashboard/header';
import { CondoVoteLogo } from '@/components/icons/logo';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { currentUser } from '@/lib/placeholder-data';

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="flex items-center justify-between">
          <CondoVoteLogo className="text-sidebar-foreground" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav />
        </SidebarContent>
        <SidebarFooter className="flex-col items-start gap-4 p-4">
            <div className="flex w-full items-center gap-2 rounded-lg bg-sidebar-accent p-2">
                <Avatar>
                    <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                    <p className="truncate text-sm font-semibold text-sidebar-accent-foreground">{currentUser.name}</p>
                    <p className="truncate text-xs text-sidebar-accent-foreground/70">{currentUser.email}</p>
                </div>
            </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <Header />
        <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
