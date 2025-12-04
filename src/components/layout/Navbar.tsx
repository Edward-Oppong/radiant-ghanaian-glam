import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search, ShoppingBag, Heart, User, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'Wigs & Hair', href: '/shop?category=wigs-hair' },
  { name: 'Beauty', href: '/shop?category=beauty-makeup' },
  { name: 'Accessories', href: '/shop?category=bags-purses' },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const cartItemCount = useCartStore((state) => state.getItemCount());
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const openCart = useCartStore((state) => state.openCart);
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border">
      {/* Top Bar */}
      <div className="bg-accent text-accent-foreground text-center py-2 text-sm">
        <p className="animate-fade-in">✨ Free delivery on orders over GH₵500 | Use code LUMIERE10 for 10% off</p>
      </div>

      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 hover:bg-primary rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-2xl md:text-3xl font-bold text-gradient-gold">
              Lumière
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-accent transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-primary rounded-lg transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="hidden sm:flex p-2 hover:bg-primary rounded-lg transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-medium">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Account / Login */}
            {user ? (
              <Link
                to="/account"
                className="hidden sm:flex p-2 hover:bg-primary rounded-lg transition-colors"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </Link>
            ) : (
              <Link
                to="/login"
                className="hidden sm:flex p-2 hover:bg-primary rounded-lg transition-colors"
                aria-label="Login"
              >
                <LogIn className="w-5 h-5" />
              </Link>
            )}

            {/* Cart */}
            <button
              onClick={openCart}
              className="p-2 hover:bg-primary rounded-lg transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-medium animate-scale-in">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div
          className={cn(
            'overflow-hidden transition-all duration-300',
            isSearchOpen ? 'max-h-20 py-4' : 'max-h-0'
          )}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search for wigs, makeup, accessories..."
              className="w-full h-12 pl-12 pr-4 bg-secondary rounded-xl border-0 focus:ring-2 focus:ring-accent outline-none transition-all"
            />
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          'lg:hidden fixed inset-x-0 top-[calc(4rem+40px)] bg-background border-b border-border shadow-large transition-all duration-300 overflow-hidden',
          isMenuOpen ? 'max-h-96' : 'max-h-0'
        )}
      >
        <div className="container mx-auto px-4 py-4 space-y-2">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="block py-3 px-4 text-foreground hover:bg-primary rounded-lg transition-colors animate-fade-up"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 border-t border-border space-y-2">
            {user ? (
              <Link
                to="/account"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 py-3 px-4 text-foreground hover:bg-primary rounded-lg transition-colors"
              >
                <User className="w-5 h-5" />
                My Account
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-3 py-3 px-4 text-foreground hover:bg-primary rounded-lg transition-colors"
              >
                <LogIn className="w-5 h-5" />
                Sign In
              </Link>
            )}
            <Link
              to="/wishlist"
              onClick={() => setIsMenuOpen(false)}
              className="flex items-center gap-3 py-3 px-4 text-foreground hover:bg-primary rounded-lg transition-colors"
            >
              <Heart className="w-5 h-5" />
              Wishlist ({wishlistCount})
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
