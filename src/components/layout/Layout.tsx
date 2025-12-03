import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { BottomNav } from './BottomNav';
import { CartDrawer } from '@/components/cart/CartDrawer';

interface LayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
}

export function Layout({ children, hideFooter = false }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pb-20 lg:pb-0">{children}</main>
      {!hideFooter && <Footer />}
      <BottomNav />
      <CartDrawer />
    </div>
  );
}
