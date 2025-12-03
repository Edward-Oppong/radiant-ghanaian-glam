import { Link } from 'react-router-dom';
import { orders } from '@/data/mockData';
import { cn } from '@/lib/utils';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function AdminOrders() {
  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-background border-b border-border py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="font-display text-2xl font-bold text-gradient-gold">Lumière Admin</Link>
          <nav className="flex gap-6">
            <Link to="/admin" className="text-muted-foreground hover:text-foreground">Dashboard</Link>
            <Link to="/admin/products" className="text-muted-foreground hover:text-foreground">Products</Link>
            <Link to="/admin/orders" className="text-accent font-medium">Orders</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-2xl font-bold mb-8">Orders</h1>
        
        <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left py-4 px-6 font-medium">Order ID</th>
                <th className="text-left py-4 px-6 font-medium">Customer</th>
                <th className="text-left py-4 px-6 font-medium">Items</th>
                <th className="text-left py-4 px-6 font-medium">Total</th>
                <th className="text-left py-4 px-6 font-medium">Status</th>
                <th className="text-left py-4 px-6 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-t border-border">
                  <td className="py-4 px-6 font-medium">{order.id}</td>
                  <td className="py-4 px-6">{order.shippingAddress.fullName}</td>
                  <td className="py-4 px-6">{order.items.length} items</td>
                  <td className="py-4 px-6 font-semibold">GH₵{order.total.toFixed(2)}</td>
                  <td className="py-4 px-6">
                    <span className={cn('px-3 py-1 rounded-full text-sm capitalize', statusColors[order.status])}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-muted-foreground">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
