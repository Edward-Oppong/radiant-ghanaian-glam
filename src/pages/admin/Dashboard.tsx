import { Link } from 'react-router-dom';
import { Package, ShoppingCart, Users, DollarSign, TrendingUp, ArrowUpRight } from 'lucide-react';
import { orders, products } from '@/data/mockData';

const stats = [
  { name: 'Total Revenue', value: 'GH₵45,230', change: '+12.5%', icon: DollarSign },
  { name: 'Orders', value: '156', change: '+8.2%', icon: ShoppingCart },
  { name: 'Products', value: '142', change: '+3', icon: Package },
  { name: 'Customers', value: '1,234', change: '+18.7%', icon: Users },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-background border-b border-border py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="font-display text-2xl font-bold text-gradient-gold">Lumière Admin</Link>
          <nav className="flex gap-6">
            <Link to="/admin" className="text-accent font-medium">Dashboard</Link>
            <Link to="/admin/products" className="text-muted-foreground hover:text-foreground">Products</Link>
            <Link to="/admin/orders" className="text-muted-foreground hover:text-foreground">Orders</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-2xl font-bold mb-8">Dashboard</h1>
        
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-card rounded-2xl p-6 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-accent" />
                </div>
                <span className="text-green-600 text-sm font-medium flex items-center">
                  {stat.change} <TrendingUp className="w-4 h-4 ml-1" />
                </span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-muted-foreground text-sm">{stat.name}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-2xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Recent Orders</h2>
              <Link to="/admin/orders" className="text-accent text-sm flex items-center">View all <ArrowUpRight className="w-4 h-4 ml-1" /></Link>
            </div>
            <div className="space-y-4">
              {orders.slice(0, 3).map((order) => (
                <div key={order.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">{order.items.length} items</p>
                  </div>
                  <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm capitalize">{order.status}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-2xl p-6 shadow-soft">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">Top Products</h2>
              <Link to="/admin/products" className="text-accent text-sm flex items-center">View all <ArrowUpRight className="w-4 h-4 ml-1" /></Link>
            </div>
            <div className="space-y-4">
              {products.filter(p => p.bestseller).slice(0, 4).map((product) => (
                <div key={product.id} className="flex items-center gap-4">
                  <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{product.name}</p>
                    <p className="text-accent font-semibold">GH₵{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
