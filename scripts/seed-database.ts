import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials');
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedDatabase() {
  console.log('🌱 Starting database seeding...\n');

  try {
    // Seed Artisans
    console.log('👨‍🎨 Seeding artisans...');
    const artisans = [
      {
        wallet_address: '7xK9mXoB4qP3vW8fT2nR6zL1yH5dA9cE3sF4gN7jM2kU',
        name: 'Siti Aminah',
        category: 'Batik',
        region: 'Yogyakarta',
        bio: 'Traditional Batik Tulis master, learning from grandmother since childhood. Specializing in Parang and Kawung motifs with natural dyes.',
        portfolio_images: [
          'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800',
          'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800'
        ],
        verified: true
      },
      {
        wallet_address: '9mL3nP5qR7sT2vX4zB6cD8eF1gH3jK5mN7pQ9rS1tU3',
        name: 'Budi Santoso',
        category: 'Wayang',
        region: 'Bali',
        bio: 'Shadow puppet craftsman specializing in traditional Balinese characters. Third generation puppet maker.',
        portfolio_images: [
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
        ],
        verified: true
      },
      {
        wallet_address: '2nQ4rT6vX8zA1cE3gH5jL7mP9qS1uW3yB5dF7hK9nM1',
        name: 'Dewi Lestari',
        category: 'Tenun',
        region: 'Palembang',
        bio: 'Songket weaver using traditional techniques passed down through generations. Expert in gold thread weaving.',
        portfolio_images: [
          'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800',
          'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=800'
        ],
        verified: false
      },
      {
        wallet_address: '4pS6tV8xZ1aC3eG5iK7mO9qR2uW4yB6dF8hJ1lN3pQ5',
        name: 'Ahmad Hidayat',
        category: 'Ukiran Kayu',
        region: 'Jawa Tengah',
        bio: 'Wood carving artisan creating intricate Jepara-style furniture and decorative pieces.',
        portfolio_images: [
          'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800'
        ],
        verified: true
      },
      {
        wallet_address: '5rU7wY9aB2dF4hJ6lN8pR1tV3xZ5cE7gI9kM2oQ4sU6',
        name: 'Kartini Wijaya',
        category: 'Keramik',
        region: 'Bali',
        bio: 'Ceramic artist blending traditional Balinese motifs with contemporary designs.',
        portfolio_images: [
          'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800'
        ],
        verified: true
      }
    ];

    const { data: insertedArtisans, error: artisanError } = await supabase
      .from('artisans')
      .upsert(artisans, { onConflict: 'wallet_address' })
      .select();

    if (artisanError) {
      console.error('❌ Error seeding artisans:', artisanError);
      throw artisanError;
    }

    console.log(`✅ Seeded ${insertedArtisans.length} artisans\n`);

    // Seed Products
    console.log('🎨 Seeding products...');
    const products = [
      {
        artisan_id: insertedArtisans[0].id,
        title: 'Traditional Batik Tulis - Parang Motif',
        description: 'Hand-drawn batik using traditional wax-resist dyeing technique. Features the iconic Parang motif, symbolizing strength and continuity. Made with natural dyes from indigo and soga.',
        images: [
          'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800',
          'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=800'
        ],
        category: 'Batik',
        region: 'Yogyakarta',
        price: 5.5,
        royalty_bps: 1500,
        status: 'listed' as const,
        nft_address: 'BATik1234567890abcdefghijklmnopqrstuvwxyz'
      },
      {
        artisan_id: insertedArtisans[1].id,
        title: 'Wayang Kulit - Arjuna Character',
        description: 'Handcrafted shadow puppet depicting Arjuna from Mahabharata. Made from buffalo hide with intricate details and traditional painting.',
        images: [
          'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
        ],
        category: 'Wayang',
        region: 'Bali',
        price: 8.0,
        royalty_bps: 1200,
        status: 'listed' as const,
        nft_address: 'WAYng2345678901bcdefghijklmnopqrstuvwxyza'
      },
      {
        artisan_id: insertedArtisans[0].id,
        title: 'Batik Cap - Modern Floral Design',
        description: 'Stamped batik with contemporary floral patterns, blending tradition with modern aesthetics. Perfect for casual wear.',
        images: [
          'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800'
        ],
        category: 'Batik',
        region: 'Yogyakarta',
        price: 3.2,
        royalty_bps: 1000,
        status: 'listed' as const,
        nft_address: 'BATik3456789012cdefghijklmnopqrstuvwxyzab'
      },
      {
        artisan_id: insertedArtisans[2].id,
        title: 'Songket Palembang - Gold Thread',
        description: 'Luxurious songket fabric woven with gold threads. Traditional Palembang patterns with modern color combinations.',
        images: [
          'https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=800'
        ],
        category: 'Tenun',
        region: 'Palembang',
        price: 12.5,
        royalty_bps: 1800,
        status: 'draft' as const
      },
      {
        artisan_id: insertedArtisans[3].id,
        title: 'Jepara Wood Carving - Floral Panel',
        description: 'Intricate wood carving panel featuring traditional Jepara floral motifs. Hand-carved from premium teak wood.',
        images: [
          'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800'
        ],
        category: 'Ukiran Kayu',
        region: 'Jawa Tengah',
        price: 15.0,
        royalty_bps: 2000,
        status: 'listed' as const,
        nft_address: 'UKIRan4567890123defghijklmnopqrstuvwxyzabc'
      },
      {
        artisan_id: insertedArtisans[4].id,
        title: 'Balinese Ceramic Vase',
        description: 'Hand-thrown ceramic vase with traditional Balinese motifs. Glazed in earth tones with gold accents.',
        images: [
          'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800'
        ],
        category: 'Keramik',
        region: 'Bali',
        price: 6.8,
        royalty_bps: 1300,
        status: 'listed' as const,
        nft_address: 'KERamik567890124efghijklmnopqrstuvwxyzabcd'
      }
    ];

    const { data: insertedProducts, error: productError } = await supabase
      .from('products')
      .insert(products)
      .select();

    if (productError) {
      console.error('❌ Error seeding products:', productError);
      throw productError;
    }

    console.log(`✅ Seeded ${insertedProducts.length} products\n`);

    // Seed DAO Proposals
    console.log('🗳️  Seeding DAO proposals...');
    const now = new Date();
    const proposals = [
      {
        title: 'Fund Batik Workshop in Yogyakarta',
        description: 'Proposal to fund a 3-month workshop teaching traditional Batik Tulis techniques to 20 young artisans. The workshop will cover traditional dyeing methods, pattern design, and business skills.',
        proposal_type: 'funding' as const,
        votes_for: 156,
        votes_against: 44,
        status: 'active' as const,
        created_by: insertedArtisans[0].wallet_address,
        ends_at: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        title: 'Partnership with Museum Nasional',
        description: 'Establish partnership to digitize museum artifacts as NFTs with proceeds supporting artisan community. This will increase visibility of Indonesian cultural heritage globally.',
        proposal_type: 'partnership' as const,
        votes_for: 234,
        votes_against: 66,
        status: 'active' as const,
        created_by: insertedArtisans[1].wallet_address,
        ends_at: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        title: 'Implement Quality Standards for Verification',
        description: 'Proposal to establish clear quality standards and verification criteria for artisan registration. This will ensure authenticity and maintain platform credibility.',
        proposal_type: 'policy' as const,
        votes_for: 189,
        votes_against: 91,
        status: 'active' as const,
        created_by: insertedArtisans[3].wallet_address,
        ends_at: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];

    const { data: insertedProposals, error: proposalError } = await supabase
      .from('dao_proposals')
      .insert(proposals)
      .select();

    if (proposalError) {
      console.error('❌ Error seeding proposals:', proposalError);
      throw proposalError;
    }

    console.log(`✅ Seeded ${insertedProposals.length} DAO proposals\n`);

    // Seed some transactions
    console.log('💰 Seeding transactions...');
    const transactions = [
      {
        product_id: insertedProducts[0].id,
        buyer_wallet: '8nM4oP6qR8sT3vX5zB7cD9eF2gH4jK6mN8pQ1rS2tU4',
        seller_wallet: insertedArtisans[0].wallet_address,
        amount: 5.5,
        royalty_paid: 0.825,
        tx_signature: 'TX1sig1234567890abcdefghijklmnopqrstuvwxyz'
      },
      {
        product_id: insertedProducts[1].id,
        buyer_wallet: '3oQ5rT7vX9zA2cE4gH6jL8mP1qS3uW5yB7dF9hK2nM4',
        seller_wallet: insertedArtisans[1].wallet_address,
        amount: 8.0,
        royalty_paid: 0.96,
        tx_signature: 'TX2sig2345678901bcdefghijklmnopqrstuvwxyza'
      }
    ];

    const { data: insertedTransactions, error: transactionError } = await supabase
      .from('transactions')
      .insert(transactions)
      .select();

    if (transactionError) {
      console.error('❌ Error seeding transactions:', transactionError);
      throw transactionError;
    }

    console.log(`✅ Seeded ${insertedTransactions.length} transactions\n`);

    console.log('🎉 Database seeding complete!\n');
    console.log('📊 Summary:');
    console.log(`   - ${insertedArtisans.length} artisans`);
    console.log(`   - ${insertedProducts.length} products`);
    console.log(`   - ${insertedProposals.length} DAO proposals`);
    console.log(`   - ${insertedTransactions.length} transactions`);

  } catch (error) {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase();
