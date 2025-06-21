'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  Calendar,
  Building,
  Mic,
  DollarSign,
  Sparkles,
  Settings,
  HelpCircle,
} from 'lucide-react';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/shows', label: 'Shows', icon: Calendar },
  { href: '/venues', label: 'Venues', icon: Building },
  { href: '/comedians', label: 'Comedians', icon: Mic },
  { href: '/finances', label: 'Finances', icon: DollarSign },
  { href: '/schedule-optimizer', label: 'AI Optimizer', icon: Sparkles },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="flex items-center gap-2">
            <div className="p-2 bg-primary rounded-lg">
                <Mic className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-headline font-bold text-primary">
                Comedy Co.
            </h1>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                className="justify-start"
              >
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild className="justify-start">
                    <Link href="#"><Settings className="h-4 w-4"/><span>Settings</span></Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild className="justify-start">
                    <Link href="#"><HelpCircle className="h-4 w-4"/><span>Help</span></Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
