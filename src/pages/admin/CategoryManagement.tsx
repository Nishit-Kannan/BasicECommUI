import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, Plus, Trash2, LogOut } from "lucide-react";
import { toast } from "sonner";

const CategoryManagement = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([
    "Electronics",
    "Books",
    "Footwear",
    "Accessories",
    "Home & Garden"
  ]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userType');
    navigate('/login');
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newCategory = formData.get('category') as string;
    
    if (categories.includes(newCategory)) {
      toast.error('Category already exists');
      return;
    }
    
    setCategories([...categories, newCategory]);
    toast.success('Category added successfully!');
    setOpen(false);
  };

  const handleDeleteCategory = (category: string) => {
    setCategories(categories.filter(c => c !== category));
    toast.success('Category deleted');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => navigate('/admin/dashboard')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="ml-4 text-xl font-semibold">Category Management</h1>
          </div>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container py-8">
        <div className="mb-6 flex justify-between items-center">
          <p className="text-muted-foreground">
            Total Categories: {categories.length}
          </p>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Category</DialogTitle>
                <DialogDescription>
                  Create a new product category for the platform
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddCategory} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category Name</Label>
                  <Input 
                    id="category" 
                    name="category" 
                    placeholder="e.g. Clothing, Sports" 
                    required 
                  />
                </div>
                <Button type="submit" className="w-full">Add Category</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Card key={category}>
              <CardContent className="flex items-center justify-between p-6">
                <span className="font-medium">{category}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteCategory(category)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CategoryManagement;
