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
      // Server-side admin role verification
      supabase.rpc('has_role', { _user_id: user.id, _role: 'admin' })
        .then(({ data }) => {
          setAdminVerified(!!data);
        })
        .catch(() => {
          setAdminVerified(false);
        });
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
