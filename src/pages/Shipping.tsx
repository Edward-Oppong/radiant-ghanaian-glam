import { Layout } from '@/components/layout/Layout';

export default function Shipping() {
  return (
    <Layout>
      <section className="bg-gradient-pink py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">Shipping Policy</h1>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl prose prose-lg">
          <h2>Delivery Information</h2>
          <p>We deliver nationwide across Ghana. Standard delivery takes 1-3 days within Accra and 3-7 days for other regions.</p>
          <h3>Free Delivery</h3>
          <p>Enjoy free standard delivery on orders over GH₵500.</p>
          <h3>Express Delivery</h3>
          <p>Need it faster? Choose express delivery at checkout for 1-2 day delivery.</p>
        </div>
      </section>
    </Layout>
  );
}
