import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';

export default function Cart() {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();
  const formatPrice = (price: number) => `GH₵${price.toFixed(2)}`;

  const subtotal = getTotal();
  const deliveryEstimate = subtotal >= 500 ? 0 : 30;
  const total = subtotal + deliveryEstimate;

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-12 h-12 text-muted-foreground" />
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold mb-4">
            Your cart is empty
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Looks like you haven't added anything to your cart yet. Start shopping to fill it up!
          </p>
          <Button variant="gold" size="lg" asChild>
            <Link to="/shop">
              Start Shopping
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-display text-2xl md:text-3xl font-bold mb-8">
          Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={`${item.productId}-${item.variant}`}
                className="flex gap-4 p-4 bg-card rounded-2xl shadow-soft"
              >
                <Link to={`/product/${item.product.slug}`} className="shrink-0">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link
                    to={`/product/${item.product.slug}`}
                    className="font-medium text-foreground hover:text-accent transition-colors line-clamp-2"
                  >
                    {item.product.name}
                  </Link>
                  {item.variant && (
                    <p className="text-sm text-muted-foreground mt-1">{item.variant}</p>
                  )}
                  <p className="text-lg font-semibold text-accent mt-2">
                    {formatPrice(item.product.price)}
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center border border-border rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1, item.variant)
                        }
                        className="w-9 h-9 flex items-center justify-center hover:bg-secondary transition-colors rounded-l-lg"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-10 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1, item.variant)
                        }
                        className="w-9 h-9 flex items-center justify-center hover:bg-secondary transition-colors rounded-r-lg"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.productId, item.variant)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-secondary rounded-2xl p-6">
              <h2 className="font-display text-xl font-semibold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="font-medium">
                    {deliveryEstimate === 0 ? (
                      <span className="text-accent">Free</span>
                    ) : (
                      formatPrice(deliveryEstimate)
                    )}
                  </span>
                </div>
                {subtotal < 500 && (
                  <p className="text-sm text-muted-foreground bg-primary/50 rounded-lg p-3">
                    Add {formatPrice(500 - subtotal)} more for free delivery!
                  </p>
                )}
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="text-xl font-bold text-accent">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <Button variant="gold" size="lg" className="w-full mb-4" asChild>
                <Link to="/checkout">
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>

              <Button variant="outline" className="w-full" asChild>
                <Link to="/shop">Continue Shopping</Link>
              </Button>

              {/* Promo Code */}
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-sm font-medium mb-3">Have a promo code?</p>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 h-10 px-4 bg-background rounded-lg border-0 focus:ring-2 focus:ring-accent outline-none text-sm"
                  />
                  <Button variant="secondary">Apply</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
