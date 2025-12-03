import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Package, Heart, MapPin, LogOut, ChevronRight, Edit2 } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { orders } from '@/data/mockData';
import { useWishlistStore } from '@/store/wishlistStore';
import { cn } from '@/lib/utils';

type Tab = 'profile' | 'orders' | 'wishlist' | 'addresses';

const tabs = [
  { id: 'profile', name: 'Profile', icon: User },
  { id: 'orders', name: 'Orders', icon: Package },
  { id: 'wishlist', name: 'Wishlist', icon: Heart },
  { id: 'addresses', name: 'Addresses', icon: MapPin },
] as const;

const mockUser = {
  firstName: 'Ama',
  lastName: 'Koranteng',
  email: 'ama.k@email.com',
  phone: '+233 24 123 4567',
};

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-purple-100 text-purple-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function Account() {
  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const wishlistItems = useWishlistStore((state) => state.items);

  const formatPrice = (price: number) => `GH₵${price.toFixed(2)}`;
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="font-display text-2xl md:text-3xl font-bold mb-8">My Account</h1>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-6 shadow-soft">
              {/* User Info */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                <div className="w-16 h-16 rounded-full bg-gradient-gold flex items-center justify-center">
                  <span className="text-2xl font-bold text-accent-foreground">
                    {mockUser.firstName[0]}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold">
                    {mockUser.firstName} {mockUser.lastName}
                  </h3>
                  <p className="text-sm text-muted-foreground">{mockUser.email}</p>
                </div>
              </div>

              {/* Tabs */}
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all',
                      activeTab === tab.id
                        ? 'bg-accent text-accent-foreground'
                        : 'hover:bg-secondary'
                    )}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.name}
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </button>
                ))}
                <Link
                  to="/login"
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-destructive hover:bg-destructive/10 transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </Link>
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === 'profile' && (
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl font-semibold">Profile Details</h2>
                  <Button variant="outline" size="sm">
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-1">First Name</label>
                    <p className="font-medium">{mockUser.firstName}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-1">Last Name</label>
                    <p className="font-medium">{mockUser.lastName}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-1">Email</label>
                    <p className="font-medium">{mockUser.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-1">Phone</label>
                    <p className="font-medium">{mockUser.phone}</p>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-border">
                  <h3 className="font-semibold mb-4">Password</h3>
                  <Button variant="outline">Change Password</Button>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="bg-card rounded-2xl p-6 shadow-soft">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <div>
                        <p className="font-semibold">{order.id}</p>
                        <p className="text-sm text-muted-foreground">
                          Placed on {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <span
                        className={cn(
                          'px-3 py-1 rounded-full text-sm font-medium capitalize',
                          statusColors[order.status]
                        )}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 mb-4">
                      {order.items.map((item, index) => (
                        <img
                          key={index}
                          src={item.image}
                          alt={item.productName}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <p className="text-sm text-muted-foreground">
                        {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                      </p>
                      <p className="font-semibold">{formatPrice(order.total)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'wishlist' && (
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                {wishlistItems.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {wishlistItems.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.slug}`}
                        className="group"
                      >
                        <div className="aspect-square rounded-xl overflow-hidden bg-secondary mb-2">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <p className="font-medium text-sm line-clamp-1">{product.name}</p>
                        <p className="text-accent font-semibold">{formatPrice(product.price)}</p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">Your wishlist is empty</p>
                    <Button variant="gold" className="mt-4" asChild>
                      <Link to="/shop">Start Shopping</Link>
                    </Button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="bg-card rounded-2xl p-6 shadow-soft">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl font-semibold">Saved Addresses</h2>
                  <Button variant="outline" size="sm">
                    Add New
                  </Button>
                </div>
                <div className="border border-border rounded-xl p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">Home</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Ama Koranteng<br />
                        15 Independence Avenue<br />
                        Accra, Greater Accra<br />
                        Ghana<br />
                        +233 24 123 4567
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                    </div>
                  </div>
                  <span className="inline-block mt-3 px-2 py-1 bg-accent/20 text-accent text-xs rounded">
                    Default
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
