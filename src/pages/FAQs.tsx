import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  {
    category: 'Orders & Shipping',
    questions: [
      {
        q: 'How long does delivery take?',
        a: 'Standard delivery within Accra takes 1-3 business days. Delivery to other regions takes 3-7 business days depending on your location.',
      },
      {
        q: 'Do you offer free delivery?',
        a: 'Yes! We offer free standard delivery on all orders over GH₵500 within Ghana.',
      },
      {
        q: 'Can I track my order?',
        a: 'Yes, once your order is shipped, you\'ll receive an SMS and email with tracking information.',
      },
      {
        q: 'Do you deliver outside Ghana?',
        a: 'Currently, we only deliver within Ghana. We\'re working on expanding to other African countries soon.',
      },
    ],
  },
  {
    category: 'Products',
    questions: [
      {
        q: 'Are your products authentic?',
        a: 'Absolutely! We source all our products directly from authorized distributors and brands. Every product is 100% genuine.',
      },
      {
        q: 'How do I choose the right wig length?',
        a: 'We recommend measuring from your hairline to where you want the wig to fall. Our product descriptions include detailed length guides.',
      },
      {
        q: 'Can I return a wig if it doesn\'t suit me?',
        a: 'Yes, unworn wigs with tags attached can be returned within 7 days for store credit or exchange.',
      },
    ],
  },
  {
    category: 'Payment',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept Mobile Money (MTN MoMo, Vodafone Cash, AirtelTigo Money), Visa/Mastercard, and Cash on Delivery for orders within Accra.',
      },
      {
        q: 'Is it safe to pay online?',
        a: 'Yes, all payments are processed through secure, encrypted payment gateways. Your financial information is never stored on our servers.',
      },
      {
        q: 'Can I pay in installments?',
        a: 'We\'re working on adding installment payment options. Currently, full payment is required at checkout.',
      },
    ],
  },
  {
    category: 'Returns & Refunds',
    questions: [
      {
        q: 'What is your return policy?',
        a: 'Unused items can be returned within 7 days of delivery for a refund or exchange. Items must be in original packaging with tags attached.',
      },
      {
        q: 'How long do refunds take?',
        a: 'Refunds are processed within 3-5 business days after we receive and inspect your return.',
      },
      {
        q: 'What items cannot be returned?',
        a: 'For hygiene reasons, we cannot accept returns on opened makeup, skincare products, or worn wigs.',
      },
    ],
  },
];

export default function FAQs() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-pink py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about orders, products, and more.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="mb-10">
              <h2 className="font-display text-xl font-bold mb-4">{category.category}</h2>
              <div className="space-y-3">
                {category.questions.map((item, itemIndex) => {
                  const id = `${categoryIndex}-${itemIndex}`;
                  const isOpen = openItems.includes(id);
                  return (
                    <div
                      key={id}
                      className="bg-card rounded-xl overflow-hidden shadow-soft"
                    >
                      <button
                        onClick={() => toggleItem(id)}
                        className="w-full flex items-center justify-between p-5 text-left"
                      >
                        <span className="font-medium">{item.q}</span>
                        <ChevronDown
                          className={cn(
                            'w-5 h-5 text-muted-foreground transition-transform duration-300',
                            isOpen && 'rotate-180'
                          )}
                        />
                      </button>
                      <div
                        className={cn(
                          'overflow-hidden transition-all duration-300',
                          isOpen ? 'max-h-96' : 'max-h-0'
                        )}
                      >
                        <p className="px-5 pb-5 text-muted-foreground">{item.a}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
