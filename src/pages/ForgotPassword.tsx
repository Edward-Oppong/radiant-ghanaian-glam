import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await resetPassword(email);

    if (error) {
      toast.error(error.message || 'Failed to send reset email');
    } else {
      setIsSubmitted(true);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-cream">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-block mb-8">
          <span className="font-display text-3xl font-bold text-gradient-gold">Lumière</span>
        </Link>

        {!isSubmitted ? (
          <>
            <h1 className="font-display text-2xl md:text-3xl font-bold mb-2">Forgot password?</h1>
            <p className="text-muted-foreground mb-8">
              No worries, we'll send you reset instructions.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 pl-12 pr-4 bg-background rounded-xl border-0 focus:ring-2 focus:ring-accent outline-none"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="gold"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Reset Password'}
              </Button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="font-display text-2xl font-bold mb-2">Check your email</h1>
            <p className="text-muted-foreground mb-8">
              We sent a password reset link to your email address.
            </p>
            <Button variant="outline" size="lg" className="w-full" asChild>
              <Link to="/login">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Sign In
              </Link>
            </Button>
          </div>
        )}

        {!isSubmitted && (
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground mt-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </Link>
        )}
      </div>
    </div>
  );
}
