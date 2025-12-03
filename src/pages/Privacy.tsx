import { Layout } from '@/components/layout/Layout';

export default function Privacy() {
  return (
    <Layout>
      <section className="bg-gradient-pink py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">Privacy Policy</h1>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl prose prose-lg">
          <h2>Your Privacy Matters</h2>
          <p>Lumière Beauty is committed to protecting your personal information.</p>
          <h3>Information We Collect</h3>
          <p>We collect information you provide when creating an account, placing orders, or contacting us.</p>
          <h3>How We Use Your Information</h3>
          <p>Your information is used to process orders, improve our services, and send promotional communications (with your consent).</p>
          <h3>Data Security</h3>
          <p>We implement industry-standard security measures to protect your data.</p>
        </div>
      </section>
    </Layout>
  );
}
