import { Metaplex, keypairIdentity, toMetaplexFile } from '@metaplex-foundation/js';
import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { RPC_ENDPOINT } from './solana-config';

/**
 * Metaplex NFT Management
 * Handles NFT creation, metadata upload, and minting
 */

/**
 * NFT Metadata for upload
 */
export interface NFTMetadataInput {
  name: string;
  symbol: string;
  description: string;
  image: File | string;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
  properties?: {
    category: string;
    creators: Array<{
      address: string;
      share: number;
    }>;
  };
  sellerFeeBasisPoints: number;
}

/**
 * NFT Creation Result
 */
export interface NFTCreationResult {
  mintAddress: string;
  metadataUri: string;
  transactionSignature: string;
}

/**
 * Initialize Metaplex instance
 */
export function createMetaplexInstance(
  connection: Connection,
  payer: Keypair
): Metaplex {
  return Metaplex.make(connection)
    .use(keypairIdentity(payer));
}

/**
 * Upload image to Arweave via Bundlr
 */
export async function uploadImage(
  metaplex: Metaplex,
  image: File
): Promise<string> {
  try {
    const buffer = await image.arrayBuffer();
    const file = toMetaplexFile(Buffer.from(buffer), image.name);
    
    const imageUri = await metaplex.storage().upload(file);
    return imageUri;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image to Arweave');
  }
}

/**
 * Upload metadata to Arweave
 */
export async function uploadMetadata(
  metaplex: Metaplex,
  metadata: Omit<NFTMetadataInput, 'image'> & { image: string }
): Promise<string> {
  try {
    const { uri } = await metaplex.nfts().uploadMetadata(metadata);
    return uri;
  } catch (error) {
    console.error('Error uploading metadata:', error);
    throw new Error('Failed to upload metadata to Arweave');
  }
}

/**
 * Create and mint NFT
 */
export async function createNFT(
  connection: Connection,
  payer: Keypair,
  metadata: NFTMetadataInput
): Promise<NFTCreationResult> {
  try {
    const metaplex = createMetaplexInstance(connection, payer);

    // Upload image if it's a File
    let imageUri: string;
    if (metadata.image instanceof File) {
      imageUri = await uploadImage(metaplex, metadata.image);
    } else {
      imageUri = metadata.image;
    }

    // Prepare metadata with image URI
    const metadataToUpload = {
      name: metadata.name,
      symbol: metadata.symbol,
      description: metadata.description,
      image: imageUri,
      attributes: metadata.attributes || [],
      properties: metadata.properties || {
        category: 'image',
        creators: [
          {
            address: payer.publicKey.toBase58(),
            share: 100,
          },
        ],
      },
      sellerFeeBasisPoints: metadata.sellerFeeBasisPoints,
    };

    // Upload metadata
    const metadataUri = await uploadMetadata(metaplex, metadataToUpload);

    // Create NFT
    const { nft } = await metaplex.nfts().create({
      uri: metadataUri,
      name: metadata.name,
      symbol: metadata.symbol,
      sellerFeeBasisPoints: metadata.sellerFeeBasisPoints,
      creators: metadata.properties?.creators.map(c => ({
        address: new PublicKey(c.address),
        share: c.share,
      })) || [
        {
          address: payer.publicKey,
          share: 100,
        },
      ],
    });

    return {
      mintAddress: nft.address.toBase58(),
      metadataUri,
      transactionSignature: nft.address.toBase58(), // Placeholder
    };
  } catch (error) {
    console.error('Error creating NFT:', error);
    throw new Error('Failed to create NFT');
  }
}

/**
 * Fetch NFT metadata from chain
 */
export async function fetchNFTMetadata(
  connection: Connection,
  mintAddress: string
): Promise<any> {
  try {
    const metaplex = Metaplex.make(connection);
    const nft = await metaplex.nfts().findByMint({
      mintAddress: new PublicKey(mintAddress),
    });

    return {
      name: nft.name,
      symbol: nft.symbol,
      uri: nft.uri,
      sellerFeeBasisPoints: nft.sellerFeeBasisPoints,
      creators: nft.creators,
      metadata: nft.json,
    };
  } catch (error) {
    console.error('Error fetching NFT metadata:', error);
    throw new Error('Failed to fetch NFT metadata');
  }
}

/**
 * Update NFT metadata
 */
export async function updateNFTMetadata(
  connection: Connection,
  payer: Keypair,
  mintAddress: string,
  newMetadata: Partial<NFTMetadataInput>
): Promise<string> {
  try {
    const metaplex = createMetaplexInstance(connection, payer);
    
    const nft = await metaplex.nfts().findByMint({
      mintAddress: new PublicKey(mintAddress),
    });

    // Upload new image if provided
    let imageUri = nft.json?.image;
    if (newMetadata.image instanceof File) {
      imageUri = await uploadImage(metaplex, newMetadata.image);
    }

    // Prepare updated metadata
    const updatedMetadata = {
      ...nft.json,
      name: newMetadata.name || nft.name,
      symbol: newMetadata.symbol || nft.symbol,
      description: newMetadata.description || nft.json?.description,
      image: imageUri,
      attributes: newMetadata.attributes || nft.json?.attributes,
    };

    // Upload updated metadata
    const metadataUri = await uploadMetadata(metaplex, updatedMetadata);

    // Update NFT
    await metaplex.nfts().update({
      nftOrSft: nft,
      uri: metadataUri,
    });

    return metadataUri;
  } catch (error) {
    console.error('Error updating NFT metadata:', error);
    throw new Error('Failed to update NFT metadata');
  }
}

/**
 * Verify NFT creator
 */
export async function verifyNFTCreator(
  connection: Connection,
  payer: Keypair,
  mintAddress: string
): Promise<boolean> {
  try {
    const metaplex = createMetaplexInstance(connection, payer);
    
    const nft = await metaplex.nfts().findByMint({
      mintAddress: new PublicKey(mintAddress),
    });

    // Check if payer is a creator
    const isCreator = nft.creators.some(
      creator => creator.address.equals(payer.publicKey)
    );

    if (!isCreator) {
      throw new Error('Payer is not a creator of this NFT');
    }

    // Verify creator
    await metaplex.nfts().verifyCreator({
      mintAddress: new PublicKey(mintAddress),
      creator: payer,
    });

    return true;
  } catch (error) {
    console.error('Error verifying NFT creator:', error);
    return false;
  }
}
