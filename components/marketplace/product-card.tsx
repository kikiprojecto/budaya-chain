'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Verified, MapPin } from 'lucide-react';

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  category: string;
  region: string;
  artisan: {
    name: string;
    verified: boolean;
  };
  nft_address?: string;
}

export function ProductCard({ product }: { product: ProductCardProps }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/products/${product.id}`}>
        <div className="aspect-square relative overflow-hidden bg-muted">
          {product.images[0] ? (
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No Image
            </div>
          )}
          {product.nft_address && (
            <Badge className="absolute top-2 right-2 bg-primary/90">
              <Verified className="h-3 w-3 mr-1" />
              NFT
            </Badge>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-lg mb-1 line-clamp-1 hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {product.description}
        </p>

        <div className="flex items-center gap-2 text-sm mb-2">
          <Badge variant="secondary">{product.category}</Badge>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="h-3 w-3 mr-1" />
            {product.region}
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">by</span>
          <span className="font-medium">{product.artisan.name}</span>
          {product.artisan.verified && (
            <Verified className="h-4 w-4 text-primary" />
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold">{product.price} SOL</div>
          <div className="text-xs text-muted-foreground">
            ≈ ${(product.price * 100).toFixed(2)} USD
          </div>
        </div>
        <Button asChild>
          <Link href={`/products/${product.id}`}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            View
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
