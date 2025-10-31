'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useWallet } from '@/hooks/useWallet';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import {
  Loader2,
  ShoppingCart,
  Verified,
  MapPin,
  Tag,
  TrendingUp,
  ExternalLink,
  Shield,
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

/**
 * Product Detail Page
 * Displays product information and handles purchases
 */
export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { connected, publicKey, balance } = useWallet();
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/${params.id}`);
      const result = await response.json();
      
      if (result.success) {
        setProduct(result.data);
      } else {
        toast.error('Product not found');
        router.push('/marketplace');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = async () => {
    if (!connected || !publicKey) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!balance || balance < product.price) {
      toast.error('Insufficient SOL balance');
      return;
    }

    setPurchasing(true);

    try {
      // TODO: Execute blockchain transaction
      // const result = await purchaseWithRoyalty(...)

      // Record transaction in database
      const response = await fetch('/api/transactions/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: product.id,
          buyer_wallet: publicKey.toBase58(),
          seller_wallet: product.artisan.wallet_address,
          amount: product.price,
          royalty_paid: (product.price * product.royalty_bps) / 10000,
          tx_signature: 'temp-signature', // TODO: Use actual signature
        }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success('Purchase successful!');
        setShowPurchaseDialog(false);
        // TODO: Show transaction details
      } else {
        toast.error(result.error || 'Purchase failed');
      }
    } catch (error) {
      console.error('Purchase error:', error);
      toast.error('Failed to complete purchase');
    } finally {
      setPurchasing(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const royaltyAmount = (product.price * product.royalty_bps) / 10000;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg bg-muted">
            {product.images[selectedImage] ? (
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                No Image
              </div>
            )}
            {product.nft_address && (
              <Badge className="absolute top-4 right-4 bg-primary/90">
                <Verified className="h-4 w-4 mr-1" />
                Verified NFT
              </Badge>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image: string, index: number) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index
                      ? 'border-primary'
                      : 'border-transparent hover:border-muted-foreground'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{product.category}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                {product.region}
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4">{product.title}</h1>
            <p className="text-muted-foreground text-lg">{product.description}</p>
          </div>

          <Separator />

          {/* Artisan Info */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Created by</div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-lg">{product.artisan.name}</span>
                    {product.artisan.verified && (
                      <Verified className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Price & Purchase */}
          <Card>
            <CardContent className="p-6 space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Price</div>
                <div className="text-4xl font-bold">{product.price} SOL</div>
                <div className="text-sm text-muted-foreground">
                  ≈ ${(product.price * 100).toFixed(2)} USD
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span>
                  {(product.royalty_bps / 100).toFixed(1)}% royalty on future sales
                </span>
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={() => setShowPurchaseDialog(true)}
                disabled={!connected || product.status !== 'listed'}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {connected ? 'Buy Now' : 'Connect Wallet to Purchase'}
              </Button>

              {product.nft_address && (
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a
                    href={`https://explorer.solana.com/address/${product.nft_address}?cluster=devnet`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View on Solana Explorer
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Authenticity Badge */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4 flex items-start gap-3">
              <Shield className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold mb-1">Authenticity Guaranteed</div>
                <div className="text-sm text-muted-foreground">
                  This product is verified on the Solana blockchain and comes with a unique NFT
                  certificate of authenticity.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Purchase Confirmation Dialog */}
      <Dialog open={showPurchaseDialog} onOpenChange={setShowPurchaseDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Purchase</DialogTitle>
            <DialogDescription>
              Review your purchase details before confirming
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Product</span>
              <span className="font-medium">{product.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Price</span>
              <span className="font-medium">{product.price} SOL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Artisan Royalty</span>
              <span className="font-medium">{royaltyAmount.toFixed(4)} SOL</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>{product.price} SOL</span>
            </div>
            {balance !== null && (
              <div className="text-sm text-muted-foreground">
                Your balance: {balance.toFixed(4)} SOL
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowPurchaseDialog(false)}
              disabled={purchasing}
            >
              Cancel
            </Button>
            <Button onClick={handlePurchase} disabled={purchasing}>
              {purchasing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Confirm Purchase'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
