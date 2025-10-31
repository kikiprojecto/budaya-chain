import QRCode from 'qrcode';

/**
 * QR Code Generator
 * Generates QR codes for product verification
 */

export interface ProductQRData {
  nftAddress: string;
  productId: string;
  artisanWallet: string;
  metadataHash: string;
  timestamp: number;
}

/**
 * Generate QR code data string
 */
export function generateQRData(data: ProductQRData): string {
  return JSON.stringify({
    v: 1, // Version
    nft: data.nftAddress,
    pid: data.productId,
    art: data.artisanWallet,
    hash: data.metadataHash,
    ts: data.timestamp,
  });
}

/**
 * Parse QR code data
 */
export function parseQRData(qrString: string): ProductQRData | null {
  try {
    const parsed = JSON.parse(qrString);
    
    if (parsed.v !== 1) {
      throw new Error('Unsupported QR version');
    }

    return {
      nftAddress: parsed.nft,
      productId: parsed.pid,
      artisanWallet: parsed.art,
      metadataHash: parsed.hash,
      timestamp: parsed.ts,
    };
  } catch (error) {
    console.error('Error parsing QR data:', error);
    return null;
  }
}

/**
 * Generate QR code as data URL
 */
export async function generateQRCode(
  data: ProductQRData,
  options?: {
    width?: number;
    margin?: number;
    color?: {
      dark?: string;
      light?: string;
    };
  }
): Promise<string> {
  const qrData = generateQRData(data);
  
  const qrOptions = {
    width: options?.width || 512,
    margin: options?.margin || 2,
    color: {
      dark: options?.color?.dark || '#000000',
      light: options?.color?.light || '#FFFFFF',
    },
    errorCorrectionLevel: 'H' as const,
  };

  try {
    const dataUrl = await QRCode.toDataURL(qrData, qrOptions);
    return dataUrl;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
}

/**
 * Generate QR code as canvas
 */
export async function generateQRCanvas(
  data: ProductQRData,
  canvas: HTMLCanvasElement,
  options?: {
    width?: number;
    margin?: number;
  }
): Promise<void> {
  const qrData = generateQRData(data);
  
  const qrOptions = {
    width: options?.width || 512,
    margin: options?.margin || 2,
    errorCorrectionLevel: 'H' as const,
  };

  try {
    await QRCode.toCanvas(canvas, qrData, qrOptions);
  } catch (error) {
    console.error('Error generating QR canvas:', error);
    throw new Error('Failed to generate QR code');
  }
}

/**
 * Download QR code as PNG
 */
export async function downloadQRCode(
  data: ProductQRData,
  filename: string = 'product-qr.png'
): Promise<void> {
  try {
    const dataUrl = await generateQRCode(data, { width: 1024 });
    
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Error downloading QR code:', error);
    throw new Error('Failed to download QR code');
  }
}

/**
 * Generate printable QR code with product info
 */
export async function generatePrintableQR(
  data: ProductQRData,
  productInfo: {
    title: string;
    artisanName: string;
    category: string;
  }
): Promise<string> {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) {
    throw new Error('Canvas context not available');
  }

  // Set canvas size
  canvas.width = 800;
  canvas.height = 1000;

  // White background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Generate QR code
  const qrCanvas = document.createElement('canvas');
  await generateQRCanvas(data, qrCanvas, { width: 600 });

  // Draw QR code centered
  ctx.drawImage(qrCanvas, 100, 100);

  // Add text information
  ctx.fillStyle = '#000000';
  ctx.font = 'bold 32px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('BUDAYA CHAIN', canvas.width / 2, 50);

  ctx.font = '24px Arial';
  ctx.fillText('Authentic Cultural Product', canvas.width / 2, 80);

  // Product info
  ctx.font = 'bold 28px Arial';
  ctx.fillText(productInfo.title, canvas.width / 2, 750);

  ctx.font = '20px Arial';
  ctx.fillText(`by ${productInfo.artisanName}`, canvas.width / 2, 790);
  ctx.fillText(productInfo.category, canvas.width / 2, 820);

  // Instructions
  ctx.font = '16px Arial';
  ctx.fillText('Scan to verify authenticity', canvas.width / 2, 870);
  ctx.fillText('budayachain.vercel.app', canvas.width / 2, 900);

  // NFT Address (truncated)
  ctx.font = '14px monospace';
  const truncatedNFT = `${data.nftAddress.slice(0, 8)}...${data.nftAddress.slice(-8)}`;
  ctx.fillText(`NFT: ${truncatedNFT}`, canvas.width / 2, 940);

  return canvas.toDataURL('image/png');
}

/**
 * Verify QR code authenticity
 */
export async function verifyQRCode(qrData: ProductQRData): Promise<{
  valid: boolean;
  message: string;
  product?: any;
}> {
  try {
    // Verify timestamp is not too old (e.g., within 5 years)
    const fiveYearsAgo = Date.now() - (5 * 365 * 24 * 60 * 60 * 1000);
    if (qrData.timestamp < fiveYearsAgo) {
      return {
        valid: false,
        message: 'QR code is too old',
      };
    }

    // Verify NFT exists on blockchain
    const response = await fetch(`/api/products/${qrData.productId}`);
    const result = await response.json();

    if (!result.success) {
      return {
        valid: false,
        message: 'Product not found',
      };
    }

    // Verify NFT address matches
    if (result.data.nft_address !== qrData.nftAddress) {
      return {
        valid: false,
        message: 'NFT address mismatch - possible counterfeit',
      };
    }

    return {
      valid: true,
      message: 'Product verified as authentic',
      product: result.data,
    };
  } catch (error) {
    console.error('Error verifying QR code:', error);
    return {
      valid: false,
      message: 'Verification failed',
    };
  }
}
