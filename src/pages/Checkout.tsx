import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, MessageCircle } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';

const WHATSAPP_NUMBER = '233593500865';

const formatPrice = (price: number) => `GH₵${price.toFixed(2)}`;

function buildWhatsAppMessage(items: ReturnType<typeof useCartStore.getState>['items'], total: number) {
  let msg = `Hi! I'm interested in buying the following items:\n\n`;
  items.forEach((item, i) => {
    msg += `${i + 1}. ${item.product.name}`;
    if (item.variant) msg += ` (${item.variant})`;
    msg += ` × ${item.quantity} — ${formatPrice(item.product.price * item.quantity)}\n`;
  });
  msg += `\n*Total: ${formatPrice(total)}*\n\nPlease let me know how to proceed. Thank you!`;
  return msg;
}

export default function Checkout() {
  const { items, getTotal, clearCart } = useCartStore();
  const total = getTotal();

  const handleWhatsAppOrder = () => {
    const message = buildWhatsAppMessage(items, total);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    clearCart();
    toast.success('Redirecting to WhatsApp!', {
      description: 'Complete your order via chat with the seller.',
    });
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-display text-2xl font-semibold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Add some products to your cart before checking out.</p>
          <Button variant="gold" asChild>
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout hideFooter>
      <div className="min-h-screen bg-cream">
        <header className="bg-background border-b border-border py-4">
          <div className="container mx-auto px-4">
            <Link to="/cart" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ChevronLeft className="w-5 h-5" />
              Back to Cart
            </Link>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8 max-w-2xl">
          <h1 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center">Order Summary</h1>

          <div className="bg-background rounded-2xl p-6 shadow-soft">
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={`${item.productId}-${item.variant}`} className="flex gap-4">
                  <div className="relative">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-16 h-16 object-cover rounded-lg" />
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-medium">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-2">{item.product.name}</p>
                    {item.variant && <p className="text-xs text-muted-foreground">{item.variant}</p>}
                  </div>
                  <p className="text-sm font-medium">{formatPrice(item.product.price * item.quantity)}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4">
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span className="text-accent">{formatPrice(total)}</span>
              </div>
            </div>

            <Button variant="gold" size="lg" className="w-full mt-6 gap-2" onClick={handleWhatsAppOrder}>
              <MessageCircle className="w-5 h-5" />
              Order via WhatsApp
            </Button>

            <p className="text-xs text-muted-foreground text-center mt-4">
              You'll be redirected to WhatsApp to complete your order directly with the seller.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
