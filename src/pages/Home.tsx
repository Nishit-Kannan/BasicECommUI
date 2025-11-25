import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { mockApi, Product } from "@/lib/mockData";
import { toast } from "sonner";

const Home = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecommendations = async () => {
      try {
        const data = await mockApi.getUserRecommendations();
        setRecommendations(data);
      } catch (error) {
        toast.error('Failed to load recommendations');
      } finally {
        setLoading(false);
      }
    };

    loadRecommendations();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header cartItemCount={0} showSearch />
      
      <main className="container py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">
            Welcome to Your Marketplace
          </h1>
          <p className="mb-8 text-lg text-muted-foreground">
            Discover amazing products tailored just for you
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mx-auto max-w-2xl">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="lg">
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>
          </form>
        </div>

        {/* Personalized Recommendations */}
        <section>
          <h2 className="mb-6 text-2xl font-bold">Recommended For You</h2>
          
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-96 animate-pulse rounded-lg bg-muted" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {recommendations.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
