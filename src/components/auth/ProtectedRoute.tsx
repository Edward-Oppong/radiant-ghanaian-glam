import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [adminVerified, setAdminVerified] = useState<boolean | null>(requireAdmin ? null : true);

  useEffect(() => {
    if (requireAdmin && user) {
      const verifyAdmin = async () => {
        try {
          const { data } = await supabase.rpc('has_role', { _role: 'admin' });
          setAdminVerified(!!data);
        } catch {
          setAdminVerified(false);
        }
      };
      verifyAdmin();
    }
  }, [requireAdmin, user]);

  if (loading || adminVerified === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !adminVerified) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
