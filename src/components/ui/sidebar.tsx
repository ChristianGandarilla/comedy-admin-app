
'use client';

import * as React from 'react';
import { Menu } from 'lucide-react';

import { Button, type ButtonProps } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarContextProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarContext = React.createContext<SidebarContextProps | undefined>(undefined);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="flex h-screen w-full">{children}</div>
    </SidebarContext.Provider>
  );
}

export const Sidebar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const isMobile = useIsMobile();
    const { isOpen, setIsOpen } = useSidebar();

    if (isMobile) {
      return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="left" className="p-0 w-72">
            <div className="flex h-full flex-col">{children}</div>
          </SheetContent>
        </Sheet>
      );
    }

    return (
      <aside
        ref={ref}
        className={cn('relative hidden h-full w-72 flex-col border-r bg-background sm:flex', className)}
        {...props}
      >
        {children}
      </aside>
    );
  }
);
Sidebar.displayName = 'Sidebar';


export const SidebarInset = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex-1', className)}
        {...props}
      />
    );
  }
);
SidebarInset.displayName = 'SidebarInset';


export const SidebarTrigger = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => {
    const { setIsOpen } = useSidebar();
    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        className={cn('sm:hidden', className)}
        onClick={() => setIsOpen(true)}
        {...props}
      >
        <Menu />
        <span className="sr-only">Toggle Menu</span>
      </Button>
    );
  }
);
SidebarTrigger.displayName = 'SidebarTrigger';


export const SidebarHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
      return (
        <div
          ref={ref}
          className={cn('border-b', className)}
          {...props}
        />
      );
    }
);
SidebarHeader.displayName = 'SidebarHeader';

export const SidebarContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn('flex-1 overflow-y-auto', className)}
                {...props}
            />
        );
    }
);
SidebarContent.displayName = 'SidebarContent';


export const SidebarMenu = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
    ({ className, ...props }, ref) => {
        return (
            <ul
                ref={ref}
                className={cn('flex flex-col gap-1', className)}
                {...props}
            />
        );
    }
);
SidebarMenu.displayName = 'SidebarMenu';

export const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
    ({ className, ...props }, ref) => {
        return (
            <li
                ref={ref}
                className={cn('', className)}
                {...props}
            />
        );
    }
);
SidebarMenuItem.displayName = 'SidebarMenuItem';

export const SidebarMenuButton = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button> & {
    isActive?: boolean
  }
>(({ className, isActive, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      variant={isActive ? 'secondary' : 'ghost'}
      className={cn('w-full', className)}
      {...props}
    />
  )
})
SidebarMenuButton.displayName = 'SidebarMenuButton'

export const SidebarFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => {
      return (
        <div
          ref={ref}
          className={cn('mt-auto border-t', className)}
          {...props}
        />
      );
    }
);
SidebarFooter.displayName = 'SidebarFooter';
