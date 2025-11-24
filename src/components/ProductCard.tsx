import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Product } from "@/lib/mockData";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  return (
    <Card 
      className="group cursor-pointer overflow-hidden transition-all hover:shadow-hover"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <div className="mb-2 flex items-start justify-between">
          <h3 className="font-semibold line-clamp-2">{product.name}</h3>
          {!product.inStock && (
            <Badge variant="secondary" className="ml-2 shrink-0">
              Out of Stock
            </Badge>
          )}
        </div>
        <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Star className="h-4 w-4 fill-primary text-primary" />
          <span className="font-medium text-foreground">{product.rating}</span>
          <span>({product.reviews})</span>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-4">
        <span className="text-2xl font-bold">${product.price}</span>
        <Button 
          variant="default" 
          size="sm"
          disabled={!product.inStock}
          onClick={(e) => {
            e.stopPropagation();
            // Add to cart logic will be handled in the product page
            navigate(`/product/${product.id}`);
          }}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};
