import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingBag, Heart, User } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Shop', href: '/shop', icon: Search },
  { name: 'Cart', href: '/cart', icon: ShoppingBag, showBadge: true },
  { name: 'Wishlist', href: '/wishlist', icon: Heart },
  { name: 'Account', href: '/account', icon: User },
];

export function BottomNav() {
  const location = useLocation();
  const cartItemCount = useCartStore((state) => state.getItemCount());

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 relative',
                isActive ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <div className="relative">
                <item.icon className={cn('w-5 h-5', isActive && 'scale-110')} />
                {item.showBadge && cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-accent text-accent-foreground text-[10px] rounded-full flex items-center justify-center font-medium">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-medium">{item.name}</span>
              {isActive && (
                <span className="absolute -bottom-2 w-1 h-1 bg-accent rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
