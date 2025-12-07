import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, ShoppingCart, Users, TrendingUp, LogOut, Loader2, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
}

interface RecentOrder {
  id: string;
  total: number;
  status: string;
  created_at: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  shipping_address: any;
}

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function AdminDashboard() {
  const { signOut, user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    // Fetch products count
    const { count: productsCount } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true });

    // Fetch orders count and revenue
    const { data: ordersData } = await supabase
      .from('orders')
      .select('total, status');

    const totalOrders = ordersData?.length || 0;
    const totalRevenue = ordersData?.reduce((sum, order) => sum + Number(order.total), 0) || 0;

    // Fetch customers count (unique user_ids from orders)
    const { data: customersData } = await supabase
      .from('profiles')
      .select('id', { count: 'exact' });

    // Fetch recent orders
    const { data: recentOrdersData } = await supabase
      .from('orders')
      .select('id, total, status, created_at, shipping_address')
      .order('created_at', { ascending: false })
      .limit(5);

    setStats({
      totalProducts: productsCount || 0,
      totalOrders,
      totalCustomers: customersData?.length || 0,
      totalRevenue,
    });

    setRecentOrders(recentOrdersData || []);
    setLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-background border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="font-display text-xl font-bold text-gradient-gold">
              Lumière
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="font-medium">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {user?.email}
            </span>
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-background rounded-2xl p-6 border border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalProducts}</p>
                <p className="text-sm text-muted-foreground">Products</p>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-2xl p-6 border border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-pink/20 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-pink" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalOrders}</p>
                <p className="text-sm text-muted-foreground">Orders</p>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-2xl p-6 border border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalCustomers}</p>
                <p className="text-sm text-muted-foreground">Customers</p>
              </div>
            </div>
          </div>

          <div className="bg-background rounded-2xl p-6 border border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">GH₵{stats.totalRevenue.toFixed(0)}</p>
                <p className="text-sm text-muted-foreground">Revenue</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            to="/admin/products"
            className="bg-background rounded-2xl p-6 border border-border hover:border-accent transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center group-hover:bg-accent/30 transition-colors">
                <Package className="w-7 h-7 text-accent" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold">Manage Products</h3>
                <p className="text-sm text-muted-foreground">Add, edit, or delete products</p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/categories"
            className="bg-background rounded-2xl p-6 border border-border hover:border-accent transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <FolderOpen className="w-7 h-7 text-green-600" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold">Manage Categories</h3>
                <p className="text-sm text-muted-foreground">Organize your product categories</p>
              </div>
            </div>
          </Link>

          <Link
            to="/admin/orders"
            className="bg-background rounded-2xl p-6 border border-border hover:border-accent transition-colors group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-pink/20 rounded-xl flex items-center justify-center group-hover:bg-pink/30 transition-colors">
                <ShoppingCart className="w-7 h-7 text-pink" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold">Manage Orders</h3>
                <p className="text-sm text-muted-foreground">View and update order status</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Orders */}
        <div className="bg-background rounded-2xl border border-border">
          <div className="p-6 border-b border-border">
            <h2 className="font-display text-lg font-semibold">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="text-left p-4 font-medium">Order ID</th>
                  <th className="text-left p-4 font-medium hidden sm:table-cell">Customer</th>
                  <th className="text-left p-4 font-medium">Total</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium hidden md:table-cell">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center p-8 text-muted-foreground">
                      No orders yet.
                    </td>
                  </tr>
                ) : (
                  recentOrders.map((order) => (
                    <tr key={order.id} className="border-t border-border">
                      <td className="p-4">
                        <p className="font-mono text-sm">#{order.id.slice(0, 8)}</p>
                      </td>
                      <td className="p-4 hidden sm:table-cell">
                        <p className="font-medium">
                          {(order.shipping_address as any)?.firstName} {(order.shipping_address as any)?.lastName}
                        </p>
                      </td>
                      <td className="p-4">
                        <p className="font-medium">GH₵{order.total.toFixed(2)}</p>
                      </td>
                      <td className="p-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${statusColors[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="p-4 hidden md:table-cell">
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
