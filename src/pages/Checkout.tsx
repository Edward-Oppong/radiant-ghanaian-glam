import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, CreditCard, Smartphone, Banknote, Check } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

type PaymentMethod = 'momo' | 'card' | 'cod';

const paymentMethods = [
  { id: 'momo', name: 'Mobile Money', description: 'MTN MoMo, Vodafone Cash', icon: Smartphone },
  { id: 'card', name: 'Card Payment', description: 'Visa, Mastercard', icon: CreditCard },
  { id: 'cod', name: 'Cash on Delivery', description: 'Pay when you receive', icon: Banknote },
] as const;

const deliveryOptions = [
  { id: 'standard', name: 'Standard Delivery', description: '3-5 business days', price: 30 },
  { id: 'express', name: 'Express Delivery', description: '1-2 business days', price: 60 },
  { id: 'same-day', name: 'Same Day Delivery', description: 'Within 24 hours (Accra only)', price: 100 },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('momo');
  const [deliveryOption, setDeliveryOption] = useState('standard');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = getTotal();
  const delivery = deliveryOptions.find((d) => d.id === deliveryOption)?.price || 0;
  const total = subtotal + delivery;

  const formatPrice = (price: number) => `GH₵${price.toFixed(2)}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate order submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    clearCart();
    toast.success('Order placed successfully!', {
      description: 'You will receive a confirmation email shortly.',
    });
    navigate('/account/orders');
  };

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="font-display text-2xl font-semibold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">
            Add some products to your cart before checking out.
          </p>
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
        {/* Header */}
        <header className="bg-background border-b border-border py-4">
          <div className="container mx-auto px-4">
            <Link
              to="/cart"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              Back to Cart
            </Link>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <h1 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center">
            Checkout
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Form */}
              <div className="lg:col-span-2 space-y-8">
                {/* Contact Information */}
                <section className="bg-background rounded-2xl p-6 shadow-soft">
                  <h2 className="font-display text-lg font-semibold mb-6">
                    Contact Information
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <input
                        type="text"
                        required
                        className="w-full h-12 px-4 bg-secondary rounded-xl border-0 focus:ring-2 focus:ring-accent outline-none"
                        placeholder="Ama"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <input
                        type="text"
                        required
                        className="w-full h-12 px-4 bg-secondary rounded-xl border-0 focus:ring-2 focus:ring-accent outline-none"
                        placeholder="Koranteng"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        required
                        className="w-full h-12 px-4 bg-secondary rounded-xl border-0 focus:ring-2 focus:ring-accent outline-none"
                        placeholder="ama@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <input
                        type="tel"
                        required
                        className="w-full h-12 px-4 bg-secondary rounded-xl border-0 focus:ring-2 focus:ring-accent outline-none"
                        placeholder="+233 24 123 4567"
                      />
                    </div>
                  </div>
                </section>

                {/* Delivery Address */}
                <section className="bg-background rounded-2xl p-6 shadow-soft">
                  <h2 className="font-display text-lg font-semibold mb-6">
                    Delivery Address
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Street Address</label>
                      <input
                        type="text"
                        required
                        className="w-full h-12 px-4 bg-secondary rounded-xl border-0 focus:ring-2 focus:ring-accent outline-none"
                        placeholder="15 Independence Avenue"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">City</label>
                        <input
                          type="text"
                          required
                          className="w-full h-12 px-4 bg-secondary rounded-xl border-0 focus:ring-2 focus:ring-accent outline-none"
                          placeholder="Accra"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Region</label>
                        <select
                          required
                          className="w-full h-12 px-4 bg-secondary rounded-xl border-0 focus:ring-2 focus:ring-accent outline-none appearance-none"
                        >
                          <option value="">Select region</option>
                          <option value="greater-accra">Greater Accra</option>
                          <option value="ashanti">Ashanti</option>
                          <option value="western">Western</option>
                          <option value="eastern">Eastern</option>
                          <option value="central">Central</option>
                          <option value="volta">Volta</option>
                          <option value="northern">Northern</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        rows={3}
                        className="w-full px-4 py-3 bg-secondary rounded-xl border-0 focus:ring-2 focus:ring-accent outline-none resize-none"
                        placeholder="Landmarks, special delivery instructions..."
                      />
                    </div>
                  </div>
                </section>

                {/* Delivery Options */}
                <section className="bg-background rounded-2xl p-6 shadow-soft">
                  <h2 className="font-display text-lg font-semibold mb-6">
                    Delivery Option
                  </h2>
                  <div className="space-y-3">
                    {deliveryOptions.map((option) => (
                      <label
                        key={option.id}
                        className={cn(
                          'flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all',
                          deliveryOption === option.id
                            ? 'bg-accent/10 border-2 border-accent'
                            : 'bg-secondary border-2 border-transparent hover:border-border'
                        )}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={cn(
                              'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                              deliveryOption === option.id
                                ? 'border-accent'
                                : 'border-muted-foreground'
                            )}
                          >
                            {deliveryOption === option.id && (
                              <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{option.name}</p>
                            <p className="text-sm text-muted-foreground">{option.description}</p>
                          </div>
                        </div>
                        <span className="font-semibold">
                          {option.price === 0 ? 'Free' : formatPrice(option.price)}
                        </span>
                        <input
                          type="radio"
                          name="delivery"
                          value={option.id}
                          checked={deliveryOption === option.id}
                          onChange={(e) => setDeliveryOption(e.target.value)}
                          className="sr-only"
                        />
                      </label>
                    ))}
                  </div>
                </section>

                {/* Payment Method */}
                <section className="bg-background rounded-2xl p-6 shadow-soft">
                  <h2 className="font-display text-lg font-semibold mb-6">
                    Payment Method
                  </h2>
                  <div className="space-y-3">
                    {paymentMethods.map((method) => (
                      <label
                        key={method.id}
                        className={cn(
                          'flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all',
                          paymentMethod === method.id
                            ? 'bg-accent/10 border-2 border-accent'
                            : 'bg-secondary border-2 border-transparent hover:border-border'
                        )}
                      >
                        <div
                          className={cn(
                            'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                            paymentMethod === method.id
                              ? 'border-accent'
                              : 'border-muted-foreground'
                          )}
                        >
                          {paymentMethod === method.id && (
                            <div className="w-2.5 h-2.5 rounded-full bg-accent" />
                          )}
                        </div>
                        <method.icon className="w-6 h-6 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{method.name}</p>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                          className="sr-only"
                        />
                      </label>
                    ))}
                  </div>

                  {paymentMethod === 'momo' && (
                    <div className="mt-4 p-4 bg-secondary rounded-xl">
                      <label className="block text-sm font-medium mb-2">
                        Mobile Money Number
                      </label>
                      <input
                        type="tel"
                        required
                        className="w-full h-12 px-4 bg-background rounded-xl border-0 focus:ring-2 focus:ring-accent outline-none"
                        placeholder="024 XXX XXXX"
                      />
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="mt-4 p-4 bg-secondary rounded-xl space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Card Number</label>
                        <input
                          type="text"
                          required
                          className="w-full h-12 px-4 bg-background rounded-xl border-0 focus:ring-2 focus:ring-accent outline-none"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Expiry</label>
                          <input
                            type="text"
                            required
                            className="w-full h-12 px-4 bg-background rounded-xl border-0 focus:ring-2 focus:ring-accent outline-none"
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">CVV</label>
                          <input
                            type="text"
                            required
                            className="w-full h-12 px-4 bg-background rounded-xl border-0 focus:ring-2 focus:ring-accent outline-none"
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </section>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 bg-background rounded-2xl p-6 shadow-soft">
                  <h2 className="font-display text-lg font-semibold mb-6">Order Summary</h2>

                  {/* Items */}
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={`${item.productId}-${item.variant}`} className="flex gap-4">
                        <div className="relative">
                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center font-medium">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-2">{item.product.name}</p>
                          {item.variant && (
                            <p className="text-xs text-muted-foreground">{item.variant}</p>
                          )}
                        </div>
                        <p className="text-sm font-medium">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-border pt-4 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery</span>
                      <span>{formatPrice(delivery)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg pt-3 border-t border-border">
                      <span>Total</span>
                      <span className="text-accent">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="gold"
                    size="lg"
                    className="w-full mt-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Place Order
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    By placing your order, you agree to our{' '}
                    <Link to="/terms" className="text-accent hover:underline">
                      Terms & Conditions
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
