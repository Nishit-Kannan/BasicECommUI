import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { mockApi, Product } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filter states
  const [priceRange, setPriceRange] = useState<number[]>([0, 500]);
  const [selectedSuppliers, setSelectedSuppliers] = useState<string[]>([]);
  const [selectedManufacturers, setSelectedManufacturers] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const searchProducts = async () => {
      setLoading(true);
      try {
        const results = await mockApi.searchProducts(query);
        setProducts(results);
        setFilteredProducts(results);
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      searchProducts();
    }
  }, [query]);

  // Apply filters
  useEffect(() => {
    let filtered = [...products];

    // Price filter
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Supplier filter
    if (selectedSuppliers.length > 0) {
      filtered = filtered.filter(p => p.supplier && selectedSuppliers.includes(p.supplier));
    }

    // Manufacturer filter
    if (selectedManufacturers.length > 0) {
      filtered = filtered.filter(p => p.manufacturer && selectedManufacturers.includes(p.manufacturer));
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    setFilteredProducts(filtered);
  }, [products, priceRange, selectedSuppliers, selectedManufacturers, selectedCategories]);

  // Get unique values for filters
  const suppliers = Array.from(new Set(products.map(p => p.supplier).filter(Boolean))) as string[];
  const manufacturers = Array.from(new Set(products.map(p => p.manufacturer).filter(Boolean))) as string[];
  const categories = Array.from(new Set(products.map(p => p.category)));

  const toggleFilter = (value: string, selectedList: string[], setSelected: (list: string[]) => void) => {
    if (selectedList.includes(value)) {
      setSelected(selectedList.filter(item => item !== value));
    } else {
      setSelected([...selectedList, value]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartItemCount={0} showSearch />
      
      <main className="container py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">Search Results</h1>
          <p className="text-muted-foreground">
            {loading ? 'Searching...' : `${filteredProducts.length} results for "${query}"`}
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : products.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-lg text-muted-foreground">
              No products found matching your search.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            {/* Filters Sidebar */}
            <aside className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Price Range */}
                  <div className="space-y-3">
                    <Label>Price Range</Label>
                    <Slider
                      min={0}
                      max={500}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>

                  {/* Categories */}
                  {categories.length > 0 && (
                    <div className="space-y-3">
                      <Label>Categories</Label>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <div key={category} className="flex items-center space-x-2">
                            <Checkbox
                              id={`cat-${category}`}
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={() => toggleFilter(category, selectedCategories, setSelectedCategories)}
                            />
                            <label
                              htmlFor={`cat-${category}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Suppliers */}
                  {suppliers.length > 0 && (
                    <div className="space-y-3">
                      <Label>Suppliers</Label>
                      <div className="space-y-2">
                        {suppliers.map((supplier) => (
                          <div key={supplier} className="flex items-center space-x-2">
                            <Checkbox
                              id={`sup-${supplier}`}
                              checked={selectedSuppliers.includes(supplier)}
                              onCheckedChange={() => toggleFilter(supplier, selectedSuppliers, setSelectedSuppliers)}
                            />
                            <label
                              htmlFor={`sup-${supplier}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              {supplier}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Manufacturers */}
                  {manufacturers.length > 0 && (
                    <div className="space-y-3">
                      <Label>Manufacturers</Label>
                      <div className="space-y-2">
                        {manufacturers.map((manufacturer) => (
                          <div key={manufacturer} className="flex items-center space-x-2">
                            <Checkbox
                              id={`man-${manufacturer}`}
                              checked={selectedManufacturers.includes(manufacturer)}
                              onCheckedChange={() => toggleFilter(manufacturer, selectedManufacturers, setSelectedManufacturers)}
                            />
                            <label
                              htmlFor={`man-${manufacturer}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              {manufacturer}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </aside>

            {/* Products Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchResults;
