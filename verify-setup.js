#!/usr/bin/env node

/**
 * Budaya Chain - Setup Verification Script
 * Checks if all dependencies and configuration are correct
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 BUDAYA CHAIN - Setup Verification\n');
console.log('=' .repeat(50));

let errors = 0;
let warnings = 0;

// Check 1: Node modules
console.log('\n📦 Checking Dependencies...');
const nodeModulesPath = path.join(__dirname, 'node_modules');
if (fs.existsSync(nodeModulesPath)) {
  console.log('✅ node_modules folder exists');
  
  // Check critical packages
  const criticalPackages = [
    '@solana/web3.js',
    '@solana/wallet-adapter-react',
    '@supabase/supabase-js',
    'next',
    'react',
  ];
  
  criticalPackages.forEach(pkg => {
    const pkgPath = path.join(nodeModulesPath, pkg);
    if (fs.existsSync(pkgPath)) {
      console.log(`✅ ${pkg} installed`);
    } else {
      console.log(`❌ ${pkg} NOT installed`);
      errors++;
    }
  });
} else {
  console.log('❌ node_modules not found - run: npm install --legacy-peer-deps');
  errors++;
}

// Check 2: Environment variables
console.log('\n🔐 Checking Environment Variables...');
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  console.log('✅ .env.local file exists');
  
  const envContent = fs.readFileSync(envPath, 'utf8');
  const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  ];
  
  requiredVars.forEach(varName => {
    if (envContent.includes(varName)) {
      const value = envContent.match(new RegExp(`${varName}=(.+)`))?.[1];
      if (value && !value.includes('your-') && !value.includes('Here')) {
        console.log(`✅ ${varName} is configured`);
      } else {
        console.log(`⚠️  ${varName} needs a real value`);
        warnings++;
      }
    } else {
      console.log(`❌ ${varName} is missing`);
      errors++;
    }
  });
} else {
  console.log('⚠️  .env.local not found - create it from ENV_TEMPLATE.md');
  warnings++;
}

// Check 3: Core files
console.log('\n📄 Checking Core Files...');
const coreFiles = [
  'lib/solana-config.ts',
  'lib/supabase.ts',
  'services/blockchain.ts',
  'services/database.ts',
  'hooks/useWallet.ts',
];

coreFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} missing`);
    errors++;
  }
});

// Check 4: API routes
console.log('\n🔌 Checking API Routes...');
const apiRoutes = [
  'app/api/artisans/register/route.ts',
  'app/api/products/create/route.ts',
  'app/api/products/list/route.ts',
  'app/api/dao/proposals/route.ts',
];

apiRoutes.forEach(route => {
  const routePath = path.join(__dirname, route);
  if (fs.existsSync(routePath)) {
    console.log(`✅ ${route}`);
  } else {
    console.log(`❌ ${route} missing`);
    errors++;
  }
});

// Check 5: Documentation
console.log('\n📚 Checking Documentation...');
const docs = [
  'README.md',
  'QUICK_START.md',
  'DEPLOYMENT_GUIDE.md',
  'SUPABASE_SETUP.sql',
];

docs.forEach(doc => {
  const docPath = path.join(__dirname, doc);
  if (fs.existsSync(docPath)) {
    console.log(`✅ ${doc}`);
  } else {
    console.log(`⚠️  ${doc} missing`);
    warnings++;
  }
});

// Summary
console.log('\n' + '='.repeat(50));
console.log('\n📊 VERIFICATION SUMMARY\n');

if (errors === 0 && warnings === 0) {
  console.log('🎉 Perfect! Everything is set up correctly!');
  console.log('\nNext steps:');
  console.log('1. npm run dev');
  console.log('2. Open http://localhost:3000');
  console.log('3. Connect your wallet');
  process.exit(0);
} else if (errors === 0) {
  console.log(`⚠️  Setup is mostly complete with ${warnings} warning(s)`);
  console.log('\nYou can proceed but should address warnings:');
  console.log('- Create .env.local with your Supabase credentials');
  console.log('- Review QUICK_START.md for setup instructions');
  process.exit(0);
} else {
  console.log(`❌ Setup incomplete: ${errors} error(s), ${warnings} warning(s)`);
  console.log('\nRequired actions:');
  if (errors > 0) {
    console.log('1. Run: npm install --legacy-peer-deps');
  }
  if (warnings > 0) {
    console.log('2. Create .env.local from ENV_TEMPLATE.md');
    console.log('3. Set up Supabase using SUPABASE_SETUP.sql');
  }
  console.log('\nSee QUICK_START.md for detailed instructions');
  process.exit(1);
}
