"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, Gavel, Users, Handshake, Building2 } from "lucide-react"

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"

const menuItems = [
  { href: "/dashboard", label: "Painel", icon: LayoutDashboard },
  { href: "/dashboard/voting", label: "Votação", icon: Gavel },
]

const userMenuItems = [
    { href: "/dashboard/proxies", label: "Procuradores", icon: Handshake },
]

const adminMenuItems = [
    { href: "/dashboard/admin/users", label: "Titulares", icon: Users },
    { href: "/dashboard/admin/properties", label: "Unidades", icon: Building2 },
]

export function SidebarNav() {
  const pathname = usePathname()

  const isActive = (href: string) => pathname === href

  return (
    <div className="flex w-full flex-col gap-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.label}>
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          {userMenuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.label}>
                    <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      
        <SidebarGroup>
            <SidebarGroupLabel>Admin</SidebarGroupLabel>
            <SidebarMenu>
            {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={isActive(item.href)} tooltip={item.label}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
            </SidebarMenu>
        </SidebarGroup>
    </div>
  )
}
