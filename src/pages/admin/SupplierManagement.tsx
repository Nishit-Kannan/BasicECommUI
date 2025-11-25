import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Plus, LogOut } from "lucide-react";
import { toast } from "sonner";

interface Supplier {
  id: string;
  name: string;
  email: string;
  enabled: boolean;
}

const SupplierManagement = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    { id: '1', name: 'TechSupply Co', email: 'contact@techsupply.com', enabled: true },
    { id: '2', name: 'Fashion Goods Ltd', email: 'info@fashiongoods.com', enabled: true },
    { id: '3', name: 'Home Essentials', email: 'sales@homeessentials.com', enabled: false },
  ]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userType');
    navigate('/login');
  };

  const handleAddSupplier = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const newSupplier: Supplier = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      enabled: true,
    };
    setSuppliers([...suppliers, newSupplier]);
    toast.success('Supplier onboarded successfully!');
    setOpen(false);
  };

  const toggleSupplier = (id: string) => {
    setSuppliers(suppliers.map(s => 
      s.id === id ? { ...s, enabled: !s.enabled } : s
    ));
    toast.success('Supplier status updated');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => navigate('/admin/dashboard')}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="ml-4 text-xl font-semibold">Supplier Management</h1>
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
            Total Suppliers: {suppliers.length}
          </p>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Onboard Supplier
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Onboard New Supplier</DialogTitle>
                <DialogDescription>
                  Add a new supplier to the platform
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleAddSupplier} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Supplier Name</Label>
                  <Input id="name" name="name" placeholder="Company Name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="contact@company.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact Person</Label>
                  <Input id="contact" name="contact" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" type="tel" placeholder="+1234567890" required />
                </div>
                <Button type="submit" className="w-full">Onboard Supplier</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-4">
          {suppliers.map((supplier) => (
            <Card key={supplier.id}>
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <h3 className="font-semibold">{supplier.name}</h3>
                  <p className="text-sm text-muted-foreground">{supplier.email}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {supplier.enabled ? 'Enabled' : 'Disabled'}
                  </span>
                  <Switch
                    checked={supplier.enabled}
                    onCheckedChange={() => toggleSupplier(supplier.id)}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default SupplierManagement;
