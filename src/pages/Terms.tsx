import { Layout } from '@/components/layout/Layout';

export default function Terms() {
  return (
    <Layout>
      <section className="bg-gradient-pink py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">Terms & Conditions</h1>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl prose prose-lg">
          <h2>Terms of Service</h2>
          <p>By using Lumière Beauty, you agree to these terms.</p>
          <h3>Orders</h3>
          <p>All orders are subject to availability and confirmation. Prices may change without notice.</p>
          <h3>Payment</h3>
          <p>Payment must be made in full at the time of purchase unless otherwise agreed.</p>
          <h3>Intellectual Property</h3>
          <p>All content on this site is the property of Lumière Beauty and may not be reproduced without permission.</p>
        </div>
      </section>
    </Layout>
  );
}
