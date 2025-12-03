import { Layout } from '@/components/layout/Layout';

export default function Returns() {
  return (
    <Layout>
      <section className="bg-gradient-pink py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">Return Policy</h1>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl prose prose-lg">
          <h2>Easy Returns</h2>
          <p>We want you to love your purchase. If you're not satisfied, return unused items within 7 days.</p>
          <h3>How to Return</h3>
          <ul>
            <li>Contact our support team</li>
            <li>Ship items back in original packaging</li>
            <li>Refund processed within 3-5 business days</li>
          </ul>
          <h3>Non-Returnable Items</h3>
          <p>For hygiene reasons, opened makeup, skincare, and worn wigs cannot be returned.</p>
        </div>
      </section>
    </Layout>
  );
}
