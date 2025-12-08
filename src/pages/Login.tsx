import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { API_ENDPOINTS } from "@/config/api";
import { storeTokens, isAuthenticated } from "@/lib/auth";

const Login = () => {
  const navigate = useNavigate();

  // Redirect if user is already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      const userType = localStorage.getItem('userType');
      if (userType === 'supplier') {
        navigate('/supplier/dashboard', { replace: true });
      } else if (userType === 'admin') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        navigate('/home', { replace: true });
      }
    }
  }, [navigate]);
  const [loading, setLoading] = useState(false);
  const [customerCreds, setCustomerCreds] = useState({ email: '', password: '' });
  const [supplierCreds, setSupplierCreds] = useState({ email: '', password: '' });
  const [adminCreds, setAdminCreds] = useState({ email: '', password: '' });

  const handleCustomerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(API_ENDPOINTS.auth.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: customerCreds.email, 
          password: customerCreds.password 
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      storeTokens(data);
      // Use role from response if available, otherwise default to customer
      const userType = data.role || data.userType || 'customer';
      localStorage.setItem('userType', userType);
      toast.success('Login successful!');
      
      // Redirect based on role
      if (userType === 'admin') {
        navigate('/admin/dashboard');
      } else if (userType === 'supplier') {
        navigate('/supplier/dashboard');
      } else {
        navigate('/home');
      }
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
      const response = await fetch(API_ENDPOINTS.auth.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: supplierCreds.email, 
          password: supplierCreds.password 
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      storeTokens(data);
      // Use role from response if available, otherwise default to supplier
      const userType = data.role || data.userType || 'supplier';
      localStorage.setItem('userType', userType);
      toast.success('Login successful!');
      
      // Redirect based on role
      if (userType === 'admin') {
        navigate('/admin/dashboard');
      } else if (userType === 'supplier') {
        navigate('/supplier/dashboard');
      } else {
        navigate('/home');
      }
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
          email: adminCreds.email, 
          password: adminCreds.password 
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      storeTokens(data);
      // Use role from response if available, otherwise default to admin
      const userType = data.role || data.userType || 'admin';
      localStorage.setItem('userType', userType);
      toast.success('Login successful!');
      
      // Redirect based on role
      if (userType === 'admin') {
        navigate('/admin/dashboard');
      } else if (userType === 'supplier') {
        navigate('/supplier/dashboard');
      } else {
        navigate('/home');
      }
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
                  <Label htmlFor="customer-email">Email</Label>
                  <Input
                    id="customer-email"
                    type="email"
                    placeholder="Enter your email"
                    value={customerCreds.email}
                    onChange={(e) => setCustomerCreds({ ...customerCreds, email: e.target.value })}
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
                  Demo: Use any email and password
                </p>
              </form>
            </TabsContent>
            
            <TabsContent value="supplier">
              <form onSubmit={handleSupplierLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="supplier-email">Email</Label>
                  <Input
                    id="supplier-email"
                    type="email"
                    placeholder="Enter your email"
                    value={supplierCreds.email}
                    onChange={(e) => setSupplierCreds({ ...supplierCreds, email: e.target.value })}
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
                  Demo: supplier@example.com / supplier123
                </p>
              </form>
            </TabsContent>
            
            <TabsContent value="admin">
              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-email">Email</Label>
                  <Input
                    id="admin-email"
                    type="email"
                    placeholder="Enter your email"
                    value={adminCreds.email}
                    onChange={(e) => setAdminCreds({ ...adminCreds, email: e.target.value })}
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
                  Demo: Use any email and password
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
