'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { parseQRData, verifyQRCode, ProductQRData } from '@/lib/qr-generator';
import { toast } from 'sonner';
import jsQR from 'jsqr';

/**
 * AR Scanner Component
 * Scans QR codes and verifies product authenticity
 */

interface ARScannerProps {
  onVerified?: (product: any) => void;
  onClose?: () => void;
}

export function ARScanner({ onVerified, onClose }: ARScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanning, setScanning] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [result, setResult] = useState<{
    valid: boolean;
    message: string;
    product?: any;
    qrData?: ProductQRData;
  } | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  const startScanning = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
        setStream(mediaStream);
        setScanning(true);
        setResult(null);
        scanQRCode();
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast.error('Failed to access camera. Please check permissions.');
    }
  };

  const stopScanning = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    setScanning(false);
  };

  const scanQRCode = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    const scan = () => {
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert',
        });

        if (code) {
          handleQRDetected(code.data);
          return;
        }
      }

      animationFrameRef.current = requestAnimationFrame(scan);
    };

    scan();
  };

  const handleQRDetected = async (qrString: string) => {
    stopScanning();
    setVerifying(true);

    try {
      const qrData = parseQRData(qrString);

      if (!qrData) {
        setResult({
          valid: false,
          message: 'Invalid QR code format',
        });
        toast.error('Invalid QR code');
        return;
      }

      const verification = await verifyQRCode(qrData);
      setResult({
        ...verification,
        qrData,
      });

      if (verification.valid) {
        toast.success('Product verified as authentic!');
        if (onVerified && verification.product) {
          onVerified(verification.product);
        }
      } else {
        toast.error(verification.message);
      }
    } catch (error) {
      console.error('Error verifying QR code:', error);
      setResult({
        valid: false,
        message: 'Verification failed',
      });
      toast.error('Failed to verify product');
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">AR Product Verification</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          {!scanning && !result && (
            <Card className="max-w-md w-full">
              <CardHeader>
                <CardTitle>Scan Product QR Code</CardTitle>
                <CardDescription>
                  Point your camera at the QR code on the product to verify its authenticity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={startScanning} className="w-full" size="lg">
                  <Camera className="mr-2 h-5 w-5" />
                  Start Camera
                </Button>
              </CardContent>
            </Card>
          )}

          {scanning && (
            <div className="relative max-w-2xl w-full">
              <video
                ref={videoRef}
                className="w-full rounded-lg shadow-2xl"
                playsInline
                muted
              />
              <canvas ref={canvasRef} className="hidden" />
              
              {/* Scanning overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-64 h-64 border-4 border-primary rounded-lg animate-pulse">
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary" />
                </div>
              </div>

              <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                <Button onClick={stopScanning} variant="secondary">
                  Cancel Scan
                </Button>
              </div>
            </div>
          )}

          {verifying && (
            <Card className="max-w-md w-full">
              <CardContent className="p-8 flex flex-col items-center gap-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-lg font-medium">Verifying on blockchain...</p>
              </CardContent>
            </Card>
          )}

          {result && (
            <Card className={`max-w-md w-full ${result.valid ? 'border-green-500' : 'border-destructive'}`}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  {result.valid ? (
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  ) : (
                    <AlertCircle className="h-8 w-8 text-destructive" />
                  )}
                  <div>
                    <CardTitle>
                      {result.valid ? 'Authentic Product' : 'Verification Failed'}
                    </CardTitle>
                    <CardDescription>{result.message}</CardDescription>
                  </div>
                </div>
              </CardHeader>

              {result.valid && result.product && (
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Product</div>
                    <div className="font-semibold text-lg">{result.product.title}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Category</div>
                      <Badge variant="secondary">{result.product.category}</Badge>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Region</div>
                      <Badge variant="secondary">{result.product.region}</Badge>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-1">Artisan</div>
                    <div className="font-medium">{result.product.artisan?.name || 'Unknown'}</div>
                  </div>

                  {result.qrData && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">NFT Address</div>
                      <div className="font-mono text-xs break-all bg-muted p-2 rounded">
                        {result.qrData.nftAddress}
                      </div>
                    </div>
                  )}

                  <div className="pt-4 flex gap-2">
                    <Button onClick={() => setResult(null)} variant="outline" className="flex-1">
                      Scan Another
                    </Button>
                    <Button onClick={onClose} className="flex-1">
                      Close
                    </Button>
                  </div>
                </CardContent>
              )}

              {!result.valid && (
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      This product could not be verified. It may be counterfeit or the QR code may be damaged.
                    </p>
                    <div className="flex gap-2">
                      <Button onClick={startScanning} variant="outline" className="flex-1">
                        Try Again
                      </Button>
                      <Button onClick={onClose} variant="secondary" className="flex-1">
                        Close
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * AR Scanner Button
 * Trigger button for opening the scanner
 */
export function ARScannerButton() {
  const [showScanner, setShowScanner] = useState(false);

  return (
    <>
      <Button onClick={() => setShowScanner(true)} variant="outline">
        <Camera className="mr-2 h-4 w-4" />
        Verify Product
      </Button>

      {showScanner && (
        <ARScanner
          onClose={() => setShowScanner(false)}
          onVerified={(product) => {
            console.log('Verified product:', product);
          }}
        />
      )}
    </>
  );
}
