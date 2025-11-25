import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, ArrowLeft, LogOut } from "lucide-react";
import { toast } from "sonner";

const CATEGORIES = ['Electronics', 'Books', 'Footwear', 'Accessories', 'Home & Garden'];

const SupplierCatalog = () => {
  const navigate = useNavigate();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [productImage, setProductImage] = useState<string>("");

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userType');
    navigate('/login');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Product added successfully');
    setShowAddDialog(false);
    setProductImage("");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate('/supplier/dashboard')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold">Product Catalog</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAddProduct} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="productName">Product Name</Label>
                    <Input id="productName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU</Label>
                    <Input id="sku" placeholder="e.g., WH-1000XM5" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manufacturer">Manufacturer</Label>
                    <Input id="manufacturer" placeholder="e.g., AudioTech" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Input id="description" required />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price</Label>
                      <Input id="price" type="number" step="0.01" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select required>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stock">Initial Stock</Label>
                    <Input id="stock" type="number" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="image">Product Image</Label>
                    <div className="flex flex-col gap-2">
                      <Input 
                        id="image" 
                        type="file" 
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="cursor-pointer"
                      />
                      {productImage && (
                        <div className="relative aspect-square w-32 overflow-hidden rounded-md border">
                          <img src={productImage} alt="Product preview" className="h-full w-full object-cover" />
                        </div>
                      )}
                    </div>
                  </div>
                  <Button type="submit" className="w-full">
                    Add Product
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
            
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <Card>
          <CardHeader>
            <CardTitle>Your Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground py-8">
              No products yet. Click "Add Product" to get started.
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SupplierCatalog;
