import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream p-4">
      <div className="text-center">
        <h1 className="font-display text-8xl md:text-9xl font-bold text-gradient-gold mb-4">404</h1>
        <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="gold" size="lg" asChild>
            <Link to="/"><Home className="w-5 h-5 mr-2" /> Go Home</Link>
          </Button>
          <Button variant="outline" size="lg" onClick={() => window.history.back()}>
            <ArrowLeft className="w-5 h-5 mr-2" /> Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
