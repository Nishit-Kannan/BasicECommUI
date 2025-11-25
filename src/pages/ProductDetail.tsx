import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockApi, Product } from "@/lib/mockData";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [selectedSupplier, setSelectedSupplier] = useState<string>("");

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) return;
      
      try {
        const data = await mockApi.getProduct(id);
        setProduct(data || null);
        if (data?.variants && data.variants.length > 0) {
          setSelectedVariant(data.variants[0].id);
        }
        if (data?.suppliers && data.suppliers.length > 0) {
          setSelectedSupplier(data.suppliers[0].id);
        }
      } catch (error) {
        toast.error('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
    // In a real app, this would call an API
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    toast.success(`Added ${quantity} item(s) to cart`);
  };

  const currentVariant = product?.variants?.find(v => v.id === selectedVariant);
  const currentSupplier = product?.suppliers?.find(s => s.id === selectedSupplier);
  const displayPrice = currentVariant?.price || currentSupplier?.price || product?.price || 0;
  const isInStock = currentVariant?.inStock ?? product?.inStock ?? false;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartItemCount={0} showSearch />
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header cartItemCount={0} showSearch />
        <div className="container py-12 text-center">
          <h1 className="mb-4 text-2xl font-bold">Product Not Found</h1>
          <Button onClick={() => navigate('/home')}>Return to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={0} showSearch />
      
      <main className="container py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden rounded-lg bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="mb-2 flex items-start justify-between">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                {!isInStock && (
                  <Badge variant="secondary">Out of Stock</Badge>
                )}
              </div>
              
              <div className="mb-4 flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-primary text-primary" />
                  <span className="font-semibold">{product.rating}</span>
                </div>
                <span className="text-muted-foreground">
                  ({product.reviews} reviews)
                </span>
              </div>

              <p className="text-4xl font-bold">${displayPrice.toFixed(2)}</p>
            </div>

            <div className="border-t pt-6">
              <h2 className="mb-2 text-lg font-semibold">Description</h2>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <div className="border-t pt-6 space-y-4">
              {product.variants && product.variants.length > 0 && (
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Select Variant
                  </label>
                  <Select value={selectedVariant} onValueChange={setSelectedVariant}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a variant" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.variants.map((variant) => (
                        <SelectItem key={variant.id} value={variant.id}>
                          {variant.name} - ${variant.price.toFixed(2)} {!variant.inStock && '(Out of Stock)'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {product.suppliers && product.suppliers.length > 0 && (
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Select Supplier
                  </label>
                  <Select value={selectedSupplier} onValueChange={setSelectedSupplier}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.suppliers.map((supplier) => (
                        <SelectItem key={supplier.id} value={supplier.id}>
                          {supplier.name} - ${supplier.price.toFixed(2)} (★{supplier.rating} - {supplier.deliveryTime})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Quantity
                </label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={!isInStock}
                  >
                    -
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    disabled={!isInStock}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={!isInStock}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => {
                    handleAddToCart();
                    navigate('/cart');
                  }}
                  disabled={!isInStock}
                >
                  Buy Now
                </Button>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                Category
              </h3>
              <Badge variant="secondary">{product.category}</Badge>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetail;
