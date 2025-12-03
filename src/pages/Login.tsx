import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { API_ENDPOINTS } from "@/config/api";
import { storeTokens } from "@/lib/auth";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [customerCreds, setCustomerCreds] = useState({ userId: '', password: '' });
  const [supplierCreds, setSupplierCreds] = useState({ userId: '', password: '' });
  const [adminCreds, setAdminCreds] = useState({ userId: '', password: '' });

  const handleCustomerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(API_ENDPOINTS.auth.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: customerCreds.userId, 
          password: customerCreds.password 
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      storeTokens(data);
      localStorage.setItem('userType', 'customer');
      toast.success('Login successful!');
      navigate('/home');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleSupplierLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(API_ENDPOINTS.supplier.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: supplierCreds.userId, 
          password: supplierCreds.password 
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      storeTokens(data);
      localStorage.setItem('userType', 'supplier');
      toast.success('Login successful!');
      navigate('/supplier/dashboard');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(API_ENDPOINTS.auth.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          userId: adminCreds.userId, 
          password: adminCreds.password 
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      storeTokens(data);
      localStorage.setItem('userType', 'admin');
      toast.success('Admin login successful!');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-hero p-4">
      <Card className="w-full max-w-md shadow-elegant">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-gradient-primary" />
          <CardTitle className="text-2xl">Welcome Back</CardTitle>
          <CardDescription>Sign in to your account to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="customer" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="customer">Customer</TabsTrigger>
              <TabsTrigger value="supplier">Supplier</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>
            
            <TabsContent value="customer">
              <form onSubmit={handleCustomerLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customer-userId">User ID</Label>
                  <Input
                    id="customer-userId"
                    type="text"
                    placeholder="Enter your user ID"
                    value={customerCreds.userId}
                    onChange={(e) => setCustomerCreds({ ...customerCreds, userId: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customer-password">Password</Label>
                  <Input
                    id="customer-password"
                    type="password"
                    placeholder="Enter your password"
                    value={customerCreds.password}
                    onChange={(e) => setCustomerCreds({ ...customerCreds, password: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Demo: Use any user ID and password
                </p>
              </form>
            </TabsContent>
            
            <TabsContent value="supplier">
              <form onSubmit={handleSupplierLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="supplier-userId">Supplier ID</Label>
                  <Input
                    id="supplier-userId"
                    type="text"
                    placeholder="Enter your supplier ID"
                    value={supplierCreds.userId}
                    onChange={(e) => setSupplierCreds({ ...supplierCreds, userId: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supplier-password">Password</Label>
                  <Input
                    id="supplier-password"
                    type="password"
                    placeholder="Enter your password"
                    value={supplierCreds.password}
                    onChange={(e) => setSupplierCreds({ ...supplierCreds, password: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Demo: Use any supplier ID and password
                </p>
              </form>
            </TabsContent>
            
            <TabsContent value="admin">
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-userId">Admin ID</Label>
                  <Input
                    id="admin-userId"
                    type="text"
                    placeholder="Enter admin ID"
                    value={adminCreds.userId}
                    onChange={(e) => setAdminCreds({ ...adminCreds, userId: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="admin-password">Password</Label>
                  <Input
                    id="admin-password"
                    type="password"
                    placeholder="Enter password"
                    value={adminCreds.password}
                    onChange={(e) => setAdminCreds({ ...adminCreds, password: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Demo: admin / admin
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
