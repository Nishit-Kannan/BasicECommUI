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

const CATEGORIES = ['Phones', 'Books', 'Footwear'];

const SupplierCatalog = () => {
  const navigate = useNavigate();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [productImages, setProductImages] = useState<string[]>([]);
  const [coverImageIndex, setCoverImageIndex] = useState<number>(0);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userType');
    navigate('/login');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProductImages(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setProductImages(prev => prev.filter((_, i) => i !== index));
    if (coverImageIndex === index) {
      setCoverImageIndex(0);
    } else if (coverImageIndex > index) {
      setCoverImageIndex(prev => prev - 1);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Product added successfully');
    setShowAddDialog(false);
    setSelectedCategory("");
    setProductImages([]);
    setCoverImageIndex(0);
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
                    <Label htmlFor="category">Category *</Label>
                    <Select required value={selectedCategory} onValueChange={setSelectedCategory}>
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

                  {selectedCategory && (
                    <>
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

                      {/* Category-specific fields */}
                      {selectedCategory === 'Phones' && (
                        <div className="space-y-4 border rounded-lg p-4 bg-muted/50">
                          <h3 className="font-medium">Phone Specifications</h3>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="phoneColor">Color</Label>
                              <Input id="phoneColor" placeholder="e.g., Midnight Black" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="phoneSize">Size</Label>
                              <Input id="phoneSize" placeholder="e.g., 6.7 inches" />
                            </div>
                          </div>
                        </div>
                      )}

                      {selectedCategory === 'Books' && (
                        <div className="space-y-4 border rounded-lg p-4 bg-muted/50">
                          <h3 className="font-medium">Book Specifications</h3>
                          <div className="space-y-2">
                            <Label htmlFor="bookFormat">Format</Label>
                            <Input id="bookFormat" placeholder="e.g., Hardcover, Paperback, E-book" />
                          </div>
                        </div>
                      )}

                      {selectedCategory === 'Footwear' && (
                        <div className="space-y-4 border rounded-lg p-4 bg-muted/50">
                          <h3 className="font-medium">Footwear Specifications</h3>
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor="footwearColor">Color</Label>
                              <Input id="footwearColor" placeholder="e.g., Navy Blue" />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="footwearSize">Size</Label>
                              <Input id="footwearSize" placeholder="e.g., US 9, EU 42" />
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="price">Price</Label>
                          <Input id="price" type="number" step="0.01" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="stock">Initial Stock</Label>
                          <Input id="stock" type="number" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="images">Product Images *</Label>
                        <div className="flex flex-col gap-2">
                          <Input 
                            id="images" 
                            type="file" 
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            className="cursor-pointer"
                          />
                          {productImages.length > 0 && (
                            <div className="grid grid-cols-3 gap-2">
                              {productImages.map((img, index) => (
                                <div key={index} className="relative aspect-square overflow-hidden rounded-md border">
                                  <img src={img} alt={`Product ${index + 1}`} className="h-full w-full object-cover" />
                                  <div className="absolute top-1 right-1 flex gap-1">
                                    <Button
                                      type="button"
                                      size="icon"
                                      variant={coverImageIndex === index ? "default" : "secondary"}
                                      className="h-6 w-6"
                                      onClick={() => setCoverImageIndex(index)}
                                    >
                                      {coverImageIndex === index ? "★" : "☆"}
                                    </Button>
                                    <Button
                                      type="button"
                                      size="icon"
                                      variant="destructive"
                                      className="h-6 w-6"
                                      onClick={() => handleRemoveImage(index)}
                                    >
                                      ×
                                    </Button>
                                  </div>
                                  {coverImageIndex === index && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-primary/90 text-primary-foreground text-xs text-center py-1">
                                      Cover
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                          <p className="text-xs text-muted-foreground">Upload multiple images. Click the star to set cover image.</p>
                        </div>
                      </div>
                    </>
                  )}

                  <Button type="submit" className="w-full" disabled={!selectedCategory}>
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
