import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2 } from 'lucide-react';
import { products } from '@/data/mockData';
import { Button } from '@/components/ui/button';

export default function AdminProducts() {
  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-background border-b border-border py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="font-display text-2xl font-bold text-gradient-gold">Lumière Admin</Link>
          <nav className="flex gap-6">
            <Link to="/admin" className="text-muted-foreground hover:text-foreground">Dashboard</Link>
            <Link to="/admin/products" className="text-accent font-medium">Products</Link>
            <Link to="/admin/orders" className="text-muted-foreground hover:text-foreground">Orders</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-2xl font-bold">Products</h1>
          <Button variant="gold"><Plus className="w-4 h-4 mr-2" /> Add Product</Button>
        </div>
        
        <div className="bg-card rounded-2xl shadow-soft overflow-hidden">
          <table className="w-full">
            <thead className="bg-secondary">
              <tr>
                <th className="text-left py-4 px-6 font-medium">Product</th>
                <th className="text-left py-4 px-6 font-medium">Category</th>
                <th className="text-left py-4 px-6 font-medium">Price</th>
                <th className="text-left py-4 px-6 font-medium">Stock</th>
                <th className="text-right py-4 px-6 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-border">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 capitalize">{product.category.replace('-', ' ')}</td>
                  <td className="py-4 px-6 font-semibold">GH₵{product.price}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded text-sm ${product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-2 hover:bg-secondary rounded-lg"><Edit2 className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-destructive/10 text-destructive rounded-lg"><Trash2 className="w-4 h-4" /></button>
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
