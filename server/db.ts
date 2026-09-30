import { createClient, type Client } from '@libsql/client';
import bcrypt from 'bcryptjs';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'pantry.db');
export const db: Client = createClient({
  url: `file:${dbPath}`,
});

export async function initDatabase() {
  console.log('[DB] Initializing SQLite database at:', dbPath);

  // Enable WAL and foreign keys
  await db.execute('PRAGMA foreign_keys = ON;');

  // 1. Users (Admin auth)
  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT DEFAULT 'admin',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 2. Customers
  await db.execute(`
    CREATE TABLE IF NOT EXISTS customers (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT UNIQUE NOT NULL,
      email TEXT,
      date_joined DATETIME DEFAULT CURRENT_TIMESTAMP,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 3. Addresses
  await db.execute(`
    CREATE TABLE IF NOT EXISTS addresses (
      id TEXT PRIMARY KEY,
      customer_id TEXT NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
      address_line TEXT NOT NULL,
      city TEXT NOT NULL,
      state TEXT NOT NULL,
      country TEXT DEFAULT 'Nigeria',
      zone TEXT DEFAULT 'southwest',
      is_default INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 4. Categories
  await db.execute(`
    CREATE TABLE IF NOT EXISTS categories (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      image_url TEXT,
      seo_title TEXT,
      seo_description TEXT,
      sort_order INTEGER DEFAULT 0
    );
  `);

  // 5. Products
  await db.execute(`
    CREATE TABLE IF NOT EXISTS products (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      tagline TEXT,
      description TEXT NOT NULL,
      long_description TEXT,
      category_id TEXT NOT NULL REFERENCES categories(id),
      category_name TEXT,
      is_featured INTEGER DEFAULT 0,
      is_advertised_first INTEGER DEFAULT 0,
      badge TEXT,
      origin_and_process TEXT,
      storage_instructions TEXT,
      ingredients TEXT, -- JSON array
      culinary_uses TEXT, -- JSON array
      status TEXT DEFAULT 'active',
      accent_color TEXT DEFAULT '#B45309',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 6. Product Variants
  await db.execute(`
    CREATE TABLE IF NOT EXISTS product_variants (
      id TEXT PRIMARY KEY,
      product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      sku TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      size_grams INTEGER,
      price_ngn INTEGER NOT NULL,
      cut_or_grind_options TEXT, -- JSON array
      heat_levels TEXT, -- JSON array
      in_stock INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 7. Inventory
  await db.execute(`
    CREATE TABLE IF NOT EXISTS inventory (
      id TEXT PRIMARY KEY,
      product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
      variant_id TEXT NOT NULL REFERENCES product_variants(id) ON DELETE CASCADE,
      sku TEXT NOT NULL,
      stock_quantity INTEGER DEFAULT 100,
      reserved_quantity INTEGER DEFAULT 0,
      low_stock_threshold INTEGER DEFAULT 10,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 8. Inventory Movements
  await db.execute(`
    CREATE TABLE IF NOT EXISTS inventory_movements (
      id TEXT PRIMARY KEY,
      variant_id TEXT NOT NULL REFERENCES product_variants(id),
      sku TEXT NOT NULL,
      movement_type TEXT NOT NULL, -- 'received', 'adjustment', 'sold', 'returned'
      quantity INTEGER NOT NULL,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 9. Carts & Cart Items
  await db.execute(`
    CREATE TABLE IF NOT EXISTS carts (
      id TEXT PRIMARY KEY,
      session_id TEXT UNIQUE NOT NULL,
      customer_id TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.execute(`
    CREATE TABLE IF NOT EXISTS cart_items (
      id TEXT PRIMARY KEY,
      cart_id TEXT NOT NULL REFERENCES carts(id) ON DELETE CASCADE,
      product_id TEXT NOT NULL,
      variant_id TEXT NOT NULL,
      quantity INTEGER NOT NULL DEFAULT 1,
      cut_or_grind TEXT,
      heat_level TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 10. Orders
  await db.execute(`
    CREATE TABLE IF NOT EXISTS orders (
      id TEXT PRIMARY KEY,
      order_number TEXT UNIQUE NOT NULL,
      customer_id TEXT,
      customer_name TEXT NOT NULL,
      customer_phone TEXT NOT NULL,
      customer_email TEXT,
      delivery_address TEXT NOT NULL,
      delivery_city TEXT,
      delivery_state TEXT,
      delivery_zone TEXT DEFAULT 'southwest',
      notes TEXT,
      subtotal_ngn INTEGER NOT NULL,
      delivery_fee_ngn INTEGER NOT NULL,
      total_ngn INTEGER NOT NULL,
      payment_status TEXT DEFAULT 'pending', -- 'pending', 'paid', 'refunded'
      order_status TEXT DEFAULT 'pending',   -- 'pending', 'confirmed', 'paid', 'processing', 'ready', 'dispatched', 'delivered', 'cancelled'
      channel TEXT DEFAULT 'whatsapp',      -- 'whatsapp', 'website', 'telegram', 'meta'
      utm_source TEXT,
      utm_medium TEXT,
      utm_campaign TEXT,
      webhook_dispatched INTEGER DEFAULT 0,
      webhook_response_code INTEGER,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 11. Order Items
  await db.execute(`
    CREATE TABLE IF NOT EXISTS order_items (
      id TEXT PRIMARY KEY,
      order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
      product_id TEXT NOT NULL,
      variant_id TEXT NOT NULL,
      product_name TEXT NOT NULL,
      variant_name TEXT NOT NULL,
      sku TEXT NOT NULL,
      quantity INTEGER NOT NULL,
      price_ngn INTEGER NOT NULL,
      line_total_ngn INTEGER NOT NULL,
      cut_or_grind TEXT,
      heat_level TEXT
    );
  `);

  // 12. Payments
  await db.execute(`
    CREATE TABLE IF NOT EXISTS payments (
      id TEXT PRIMARY KEY,
      order_id TEXT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
      method TEXT NOT NULL, -- 'whatsapp_manual', 'paystack', 'flutterwave', 'bank_transfer'
      reference TEXT UNIQUE NOT NULL,
      amount_ngn INTEGER NOT NULL,
      currency TEXT DEFAULT 'NGN',
      status TEXT DEFAULT 'pending', -- 'pending', 'successful', 'failed'
      provider TEXT DEFAULT 'manual',
      raw_payload TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 13. Campaign / Landing Pages
  await db.execute(`
    CREATE TABLE IF NOT EXISTS landing_pages (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      headline TEXT NOT NULL,
      subtitle TEXT,
      hero_badge TEXT,
      product_id TEXT REFERENCES products(id),
      benefits TEXT, -- JSON array
      recipe_use_cases TEXT, -- JSON array
      faq_items TEXT, -- JSON array
      seo_title TEXT,
      seo_description TEXT,
      is_active INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 14. Coupons
  await db.execute(`
    CREATE TABLE IF NOT EXISTS coupons (
      id TEXT PRIMARY KEY,
      code TEXT UNIQUE NOT NULL,
      discount_type TEXT NOT NULL, -- 'percentage' or 'fixed'
      discount_value INTEGER NOT NULL,
      min_order_amount INTEGER DEFAULT 0,
      is_active INTEGER DEFAULT 1,
      usage_count INTEGER DEFAULT 0,
      max_uses INTEGER DEFAULT 100,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 15. Settings
  await db.execute(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 16. Audit Logs
  await db.execute(`
    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      action TEXT NOT NULL,
      entity_type TEXT NOT NULL,
      entity_id TEXT,
      details TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // 17. Analytics Events (UTM attribution, CTA tracking)
  await db.execute(`
    CREATE TABLE IF NOT EXISTS analytics_events (
      id TEXT PRIMARY KEY,
      event_name TEXT NOT NULL,
      customer_phone TEXT,
      page_url TEXT,
      utm_source TEXT,
      utm_medium TEXT,
      utm_campaign TEXT,
      utm_content TEXT,
      metadata TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Pre-seed default Admin user
  const adminCheck = await db.execute({
    sql: 'SELECT * FROM users WHERE email = ?',
    args: ['admin@akinnikeols.com'],
  });

  if (adminCheck.rows.length === 0) {
    const passwordHash = await bcrypt.hash('AkinnikePantry2026!', 10);
    await db.execute({
      sql: `INSERT INTO users (id, email, password_hash, name, role) VALUES (?, ?, ?, ?, ?)`,
      args: ['usr_admin_01', 'admin@akinnikeols.com', passwordHash, 'Akinnike Ols Administrator', 'admin'],
    });
    console.log('[DB] Pre-seeded default admin: admin@akinnikeols.com / AkinnikePantry2026!');
  }

  // Pre-seed default settings
  const defaultSettings: Record<string, string> = {
    whatsapp_number: '07051377659',
    whatsapp_country_code: '234',
    webhook_url: 'https://nodus.com/api/webhooks',
    webhook_secret: 'akinnike_nodus_live_2026',
    auto_webhook_dispatch: 'true',
    shipping_southwest_fee: '2500',
    shipping_nigeria_fee: '4500',
    shipping_diaspora_fee: '28000',
    brand_name: 'Akinnike Ols Pantry & Apothecary',
  };

  for (const [key, val] of Object.entries(defaultSettings)) {
    await db.execute({
      sql: `INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)`,
      args: [key, val],
    });
  }

  // Pre-seed Categories & Products
  await seedCategoriesAndProducts();

  console.log('[DB] Database initialization complete.');
}

async function seedCategoriesAndProducts() {
  const catCount = await db.execute('SELECT COUNT(*) as count FROM categories');
  if (Number(catCount.rows[0].count) > 0) return;

  console.log('[DB] Seeding categories and products...');

  // Categories
  const categories = [
    {
      id: 'cat_concoctions',
      slug: 'signature-concoctions',
      name: 'Signature Concoctions',
      description: 'Ancestral one-pot soul blends, smoked aromatics, iru crystals, and medicinal soup spices.',
      seo_title: 'Signature Nigerian Soup & Concoction Blends | Akinnike Ols',
      seo_description: 'Authentic stone-ground Nigerian soup spices. Concoction Blend, Native Soup, and Pepper Soup.',
      sort_order: 1,
    },
    {
      id: 'cat_proteins',
      slug: 'flavoured-proteins',
      name: 'Flavoured Proteins',
      description: 'Slow-dehydrated grass-fed prime beef and tender chicken shreds infused with artisanal seasonings.',
      seo_title: 'Artisanal Flavoured Shredded & Chunked Beef & Chicken | Akinnike Ols',
      seo_description: 'High-protein pantry essentials with zero preservatives, cured with real heritage herbs.',
      sort_order: 2,
    },
    {
      id: 'cat_essentials',
      slug: 'pantry-essentials',
      name: 'Pantry Essentials',
      description: 'Small-batch Suya yaji spice, clean concentrated bone broth bases, and daily culinary staples.',
      seo_title: 'Artisan Suya Spice & Clean Broth Blends | Akinnike Ols',
      seo_description: 'Northern heritage roasted peanut kuli-kuli Yaji and natural bouillon alternatives.',
      sort_order: 3,
    },
    {
      id: 'cat_teas',
      slug: 'botanical-teas',
      name: 'Botanical Teas & Infusions',
      description: 'Sun-dried Kaduna ginger root, whole Zobo hibiscus calyces, and wild lemongrass infusions.',
      seo_title: 'Botanical Teas & Restorative Infusions | Akinnike Ols',
      seo_description: 'Pure loose-leaf and pyramid herbal teas with wild African aromatics.',
      sort_order: 4,
    },
  ];

  for (const cat of categories) {
    await db.execute({
      sql: `INSERT INTO categories (id, slug, name, description, seo_title, seo_description, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [cat.id, cat.slug, cat.name, cat.description, cat.seo_title, cat.seo_description, cat.sort_order],
    });
  }

  // Products
  const products = [
    {
      id: 'prod_concoction',
      slug: 'concoction-blend',
      name: 'Signature Concoction Blend',
      tagline: 'The ancestral one-pot soul blend of smoked aromatics, iru essence, and wild herbs',
      category_id: 'cat_concoctions',
      category_name: 'Signature Concoctions',
      is_featured: 1,
      is_advertised_first: 1,
      badge: 'Flagship Apothecary Blend',
      description: 'An artisanal alchemy of sun-dried coastal crayfish, slow-cured fermented locust beans (iru crystals), wild uziza seed, smoked bonga fish aromatics, and dehydrated native scent leaf.',
      long_description: 'Crafted for the modern home seeking the deep, comforting complexity of traditional Nigerian cooking without hours of tedious prep. Our Signature Concoction Blend captures the soul of native rice, yam porridge, seafood okro, and village pottage in one fragrant teaspoon. Each batch is stone-ground in small runs and immediately sealed in amber glass or UV-shielded pouches.',
      ingredients: JSON.stringify([
        'Fermented locust beans (Iru Woro crystals)',
        'Sun-dried Nigerian coastal crayfish powder',
        'Wild smoked bonga fish flakes',
        'African black peppercorn (Uziza seeds)',
        'Grains of Selim (Uda)',
        'Sun-dehydrated native scent leaves (Efirin/Nchuanwu)',
        'Alligator pepper pod botanicals',
        'Organic mineral sea salt',
      ]),
      culinary_uses: JSON.stringify([
        'One-pot Native Concoction Rice & Asaro (Yam Pottage)',
        'Native Jollof, Seafood Okro, and Ofe Nsala broths',
        'Stir-fried indigenous vegetables and garden egg sauces',
        'Morning plantain and egg herbal scrambles',
      ]),
      origin_and_process: 'Small-batch blended in Southwest Nigeria using heritage sun-drying and cool stone-milling.',
      storage_instructions: 'Store in cool, dry pantry away from direct heat. Keeps fresh for up to 18 months.',
      accent_color: '#B45309',
      variants: [
        {
          id: 'var_conc_100',
          sku: 'AKN-CONC-100G',
          name: '100g Amber Glass Apothecary Jar',
          size_grams: 100,
          price_ngn: 4500,
          cut_or_grind_options: JSON.stringify(['Fine Stone-Ground Silk', 'Coarse Rustic Mortar Crush']),
          heat_levels: JSON.stringify(['Gentle Savoury Warmth', 'Traditional Native Heat', 'Extra Fiery Pepper']),
          stock: 85,
        },
        {
          id: 'var_conc_250',
          sku: 'AKN-CONC-250G',
          name: '250g Aromalock Craft Pouch (Most Popular)',
          size_grams: 250,
          price_ngn: 9800,
          cut_or_grind_options: JSON.stringify(['Fine Stone-Ground Silk', 'Coarse Rustic Mortar Crush']),
          heat_levels: JSON.stringify(['Gentle Savoury Warmth', 'Traditional Native Heat', 'Extra Fiery Pepper']),
          stock: 120,
        },
        {
          id: 'var_conc_500',
          sku: 'AKN-CONC-500G',
          name: '500g Chef Pantry Feast Tub',
          size_grams: 500,
          price_ngn: 18500,
          cut_or_grind_options: JSON.stringify(['Fine Stone-Ground Silk', 'Coarse Rustic Mortar Crush']),
          heat_levels: JSON.stringify(['Gentle Savoury Warmth', 'Traditional Native Heat', 'Extra Fiery Pepper']),
          stock: 45,
        },
      ],
    },
    {
      id: 'prod_beef',
      slug: 'flavoured-beef',
      name: 'Flavoured Shredded & Chunked Beef',
      tagline: 'Artisanal slow-dehydrated grass-fed prime beef seasoned with heritage aromatics',
      category_id: 'cat_proteins',
      category_name: 'Flavoured Proteins',
      is_featured: 1,
      is_advertised_first: 1,
      badge: 'High-Protein Pantry Essential',
      description: 'Tender prime beef, slow-dehydrated over low botanical heat to create crunchy shards or succulent chunks, infused with suya aromatics, smoked garlic, and wild herbs.',
      long_description: 'Our signature cured beef pantry protein redefines homemade convenience. Prepared from 100% grass-fed Nigerian prime beef, each strip is trimmed lean, hand-seasoned with our house apothecary marinade, and dehydrated slowly over 18 hours. Available in both pulled shredded strands and chunky bites. Zero chemical preservatives, zero MSG fillers.',
      ingredients: JSON.stringify([
        '100% Grass-fed lean beef silverside',
        'Artisan Suya spice (kuli-kuli peanut extract, ginger, chili)',
        'Slow-roasted garlic & sweet red onion essence',
        'Sun-dried African black pepper',
        'Sea salt crystals & cold-pressed sesame oil glaze',
      ]),
      culinary_uses: JSON.stringify([
        'Ready-to-eat savoury high-protein snack on the go',
        'Instant protein topping for jollof rice, fried rice, and noodles',
        'Reconstitutes quickly in efo riro, egusi, and okro soups',
        'Pantry emergency protein for fast family dinners',
      ]),
      origin_and_process: 'Sourced from verified humane cattle ranches; marinated and cured in sanitary kitchens in Ibadan.',
      storage_instructions: 'Keep in airtight resealable bag at ambient room temperature. No refrigeration required.',
      accent_color: '#991B1B',
      variants: [
        {
          id: 'var_beef_shred_150',
          sku: 'AKN-BEEF-SHRED-150',
          name: '150g Shredded Strands (Crispy Pulled Flakes)',
          size_grams: 150,
          price_ngn: 6500,
          cut_or_grind_options: JSON.stringify(['Delicate Shredded Flakes (Snack & Topping)']),
          heat_levels: JSON.stringify(['Signature Mild Pepper', 'Bold Street Fire']),
          stock: 60,
        },
        {
          id: 'var_beef_chunk_150',
          sku: 'AKN-BEEF-CHUNK-150',
          name: '150g Chunked Bites (Thick Meaty Cubes)',
          size_grams: 150,
          price_ngn: 6500,
          cut_or_grind_options: JSON.stringify(['Tender Meaty Chunks (Soup & Stew Ready)']),
          heat_levels: JSON.stringify(['Signature Mild Pepper', 'Bold Street Fire']),
          stock: 75,
        },
        {
          id: 'var_beef_duo_300',
          sku: 'AKN-BEEF-DUO-300',
          name: '300g Family Pantry Duo Pack (150g Shred + 150g Chunk)',
          size_grams: 300,
          price_ngn: 12500,
          cut_or_grind_options: JSON.stringify(['Duo Pack (Shredded + Chunked)']),
          heat_levels: JSON.stringify(['Signature Mild Pepper', 'Bold Street Fire']),
          stock: 40,
        },
      ],
    },
    {
      id: 'prod_peppersoup',
      slug: 'pepper-soup-blend',
      name: 'Ancestral Pepper Soup Blend',
      tagline: 'Therapeutic and warming medicinal spices, stone-ground with ehuru and wild uda',
      category_id: 'cat_concoctions',
      category_name: 'Signature Concoctions',
      is_featured: 1,
      is_advertised_first: 1,
      badge: 'Therapeutic & Warming',
      description: 'A restorative botanical blend of roasted African nutmeg (ehuru), aromatic Selim seeds (uda pods), alligator pepper, uziza seeds, and sun-dried wild lemon grass.',
      long_description: 'In traditional Nigerian herbal lore, Pepper Soup is more than a meal—it is a soothing, circulation-restoring tonic. Perfectly calibrated to produce that crystal-clear, intensely aromatic broth for catfish, goat meat, chicken, or healing vegetable broths.',
      ingredients: JSON.stringify([
        'Slow-roasted calabash nutmeg (Ehuru)',
        'Grains of Selim (Uda seeds, cracked & de-bittered)',
        'Wild Uziza peppercorns',
        'Alligator pepper grains (Atare)',
        'Dehydrated wild lemongrass cuts',
        'Ginger root & African dry thyme crystals',
      ]),
      culinary_uses: JSON.stringify([
        'Authentic Point & Kill Catfish Pepper Soup',
        'Restorative Goat Meat or Oxtail Herbal Broths',
        'Postpartum & Rainy Season Comfort Soups',
        'Morning hot herbal sipping broth',
      ]),
      origin_and_process: 'Carefully roasted over clay heat tiles before stone milling, unlocking medicinal essential oils.',
      storage_instructions: 'Store in airtight apothecary jar in a cool cupboard.',
      accent_color: '#C2410C',
      variants: [
        {
          id: 'var_ps_100',
          sku: 'AKN-PS-100G',
          name: '100g Apothecary Amber Glass Jar',
          size_grams: 100,
          price_ngn: 4200,
          cut_or_grind_options: JSON.stringify(['Fine Silky Mill', 'Traditional Coarse Cracked Pods']),
          heat_levels: JSON.stringify(['Gentle Restorative Warmth', 'Traditional Lagos Pepper Heat', 'Fiery Fisherman Strength']),
          stock: 90,
        },
        {
          id: 'var_ps_250',
          sku: 'AKN-PS-250G',
          name: '250g Aromalock Craft Pouch',
          size_grams: 250,
          price_ngn: 9200,
          cut_or_grind_options: JSON.stringify(['Fine Silky Mill', 'Traditional Coarse Cracked Pods']),
          heat_levels: JSON.stringify(['Gentle Restorative Warmth', 'Traditional Lagos Pepper Heat', 'Fiery Fisherman Strength']),
          stock: 65,
        },
      ],
    },
    {
      id: 'prod_suya',
      slug: 'suya-blend',
      name: 'Artisan Suya Spice Blend (Yaji)',
      tagline: 'Northern heritage roasted kuli-kuli peanut powder, ginger, chili, and clove',
      category_id: 'cat_essentials',
      category_name: 'Pantry Essentials',
      is_featured: 1,
      is_advertised_first: 1,
      badge: 'Street Craft Gourmet Edition',
      description: 'Authentic Nigerian street grill spice made from double-roasted defatted peanut paste (kuli-kuli), sharp ginger, smoked red chili, and whole ground spices.',
      long_description: 'The crown jewel of West African grilling. Double-roasted defatted peanut pressings blended with fiery Scotch bonnet chili, sweet ginger, garlic, and cloves. Sprinkle it directly onto grilled steak, roasted chicken, suya beef skewers, fried plantains (dodo), or oven-roasted sweet potatoes.',
      ingredients: JSON.stringify([
        'Double-roasted defatted groundnut cake (Kuli-kuli)',
        'High-grade Nigerian dried ginger root',
        'Sun-dried red chili pepper flakes',
        'Whole sweet cloves (Kanunfari)',
        'Black peppercorn & white pepper',
        'Garlic powder & mineral sea salt',
      ]),
      culinary_uses: JSON.stringify([
        'Dry rub for beef skewers, lamb chops, and whole grilled fish',
        'Finishing seasoning for fried plantain (Dodo), yam fries, and popcorn',
        'Suya roast chicken wings and barbecue glaze',
        'Stirred into yogurt or mayonnaise for an artisan dipping sauce',
      ]),
      origin_and_process: 'Triple-sifted for an ultra-fine, lump-free gourmet sprinkle that clings evenly to hot proteins.',
      storage_instructions: 'Keep airtight in your dry spice rack. Contains groundnuts (peanut allergen notice).',
      accent_color: '#D97706',
      variants: [
        {
          id: 'var_suya_120',
          sku: 'AKN-SUYA-120G',
          name: '120g Tabletop Spice Shaker Jar',
          size_grams: 120,
          price_ngn: 3800,
          heat_levels: JSON.stringify(['Classic Street Heat (Traditional)', 'Mild & Sweet Savoury', 'Extra Hot Suya Master']),
          stock: 110,
        },
        {
          id: 'var_suya_250',
          sku: 'AKN-SUYA-250G',
          name: '250g Kitchen Refill Pouch',
          size_grams: 250,
          price_ngn: 7500,
          heat_levels: JSON.stringify(['Classic Street Heat (Traditional)', 'Mild & Sweet Savoury', 'Extra Hot Suya Master']),
          stock: 95,
        },
      ],
    },
    {
      id: 'prod_chicken',
      slug: 'flavoured-chicken',
      name: 'Flavoured Shredded & Chunked Chicken',
      tagline: 'Slow-dried tender chicken breast with lemon-ginger and fragrant scent leaf',
      category_id: 'cat_proteins',
      category_name: 'Flavoured Proteins',
      is_featured: 0,
      is_advertised_first: 0,
      badge: 'Lean Artisanal Protein',
      description: 'Lean farm-fresh chicken breast seasoned with sun-dried lemon peel, sharp ginger root, native scent leaf, and mild smoked chili.',
      long_description: 'A light, savoury protein companion for salads, stir-fries, breakfast omelettes, or quick evening broths. Dehydrated at delicate temperatures to retain lean protein bio-availability.',
      ingredients: JSON.stringify([
        '100% Lean farm-raised chicken breast',
        'Dehydrated wild scent leaf (Efirin)',
        'Crushed ginger root & roasted garlic',
        'Sun-dried lemon zest crystals',
        'Pure sea salt & cold-pressed coconut oil',
      ]),
      culinary_uses: JSON.stringify([
        'Toss directly into vegetable salads and noodles',
        'Simmer in light pepper soups or chicken sweetcorn broth',
        'Healthy gourmet gym snack',
      ]),
      origin_and_process: 'Oven-cured in small batches; zero hormones or artificial curing salts.',
      storage_instructions: 'Store in cool, dry place. Reseal bag tightly.',
      accent_color: '#CA8A04',
      variants: [
        {
          id: 'var_chk_150',
          sku: 'AKN-CHK-SHRED-150',
          name: '150g Shredded Golden Strands',
          size_grams: 150,
          price_ngn: 5800,
          stock: 50,
        },
      ],
    },
    {
      id: 'prod_tea',
      slug: 'ginger-botanical-tea',
      name: 'Wild Ginger & Botanical Tea',
      tagline: 'Sun-dried Kaduna ginger root, crimson Zobo hibiscus, and wild lemongrass',
      category_id: 'cat_teas',
      category_name: 'Botanical Teas',
      is_featured: 0,
      is_advertised_first: 0,
      badge: 'Restorative Infusion',
      description: 'A vibrant ruby-crimson herbal infusion blending spicy sundried Kaduna ginger, whole organic hibiscus flowers (Zobo), and citrusy wild lemongrass.',
      long_description: 'An invigorating, caffeine-free infusion designed for morning vitality and evening digestive comfort. Spicy, tart, and deeply refreshing whether steeped piping hot or brewed as a chilled iced botanical cooler.',
      ingredients: JSON.stringify([
        'Wild sun-dried Kaduna ginger slices',
        'Whole dried organic Zobo (Hibiscus sabdariffa) calyces',
        'Wild highland lemongrass',
        'Cinnamon bark quill shavings',
        'Dehydrated orange peel peelings',
      ]),
      culinary_uses: JSON.stringify([
        'Hot morning immune-boosting tea with raw honey',
        'Artisan chilled Zobo iced tea base for entertaining',
        'Post-meal digestive tonic',
      ]),
      origin_and_process: 'Hand-picked from organic botanical farmers in Northern and Southwest Nigeria.',
      storage_instructions: 'Store in dry tea caddy away from moisture.',
      accent_color: '#BE123C',
      variants: [
        {
          id: 'var_tea_20p',
          sku: 'AKN-TEA-20P',
          name: '20 Biodegradable Pyramid Tea Bags',
          size_grams: 60,
          price_ngn: 4200,
          stock: 80,
        },
      ],
    },
  ];

  for (const p of products) {
    await db.execute({
      sql: `INSERT INTO products (
        id, slug, name, tagline, description, long_description,
        category_id, category_name, is_featured, is_advertised_first,
        badge, origin_and_process, storage_instructions, ingredients,
        culinary_uses, accent_color
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        p.id, p.slug, p.name, p.tagline, p.description, p.long_description,
        p.category_id, p.category_name, p.is_featured, p.is_advertised_first,
        p.badge, p.origin_and_process, p.storage_instructions, p.ingredients,
        p.culinary_uses, p.accent_color,
      ],
    });

    for (const v of p.variants) {
      await db.execute({
        sql: `INSERT INTO product_variants (
          id, product_id, sku, name, size_grams, price_ngn,
          cut_or_grind_options, heat_levels, in_stock
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          v.id, p.id, v.sku, v.name, v.size_grams, v.price_ngn,
          (v as any).cut_or_grind_options || null,
          (v as any).heat_levels || null,
          1,
        ],
      });

      await db.execute({
        sql: `INSERT INTO inventory (id, product_id, variant_id, sku, stock_quantity) VALUES (?, ?, ?, ?, ?)`,
        args: ['inv_' + v.id, p.id, v.id, v.sku, v.stock],
      });
    }
  }

  // Pre-seed Campaign Landing Pages
  const campaignPages = [
    {
      id: 'camp_concoction',
      slug: 'concoction',
      title: 'Ancestral Concoction Blend Campaign',
      headline: 'The Secret to Village Pottage & Native Jollof in 20 Minutes',
      subtitle: 'Sun-dried coastal crayfish, slow-fermented iru crystals, and wild uziza seed stone-ground into pure umami.',
      hero_badge: 'Southwest Chef Favorite',
      product_id: 'prod_concoction',
      benefits: JSON.stringify([
        'Zero artificial seasoning cubes or chemical bouillon',
        'Smoked woodfire flavor without lighting firewood',
        'Stone-ground in small runs for intense aroma retention',
        'Delivered anywhere in Southwest Nigeria within 24-48 hours',
      ]),
      recipe_use_cases: JSON.stringify([
        'Village Native Rice Pottage',
        'Seafood Okro & Ofe Nsala',
        'Asaro (Yam Pottage with leafy greens)',
      ]),
      faq_items: JSON.stringify([
        { q: 'Does it contain salt?', a: 'Only unrefined mineral sea salt in balanced trace amounts.' },
        { q: 'How long does one jar last?', a: 'One 250g pouch provides seasoning for 18–25 family pots.' },
      ]),
      seo_title: 'Order Authentic Nigerian Concoction Blend | Akinnike Ols',
      seo_description: 'Pure artisanal stone-ground concoction spice blend with iru, crayfish, and smoked fish.',
    },
    {
      id: 'camp_beef',
      slug: 'shredded-beef',
      headline: '100% Grass-Fed Cured Beef Shards & Meaty Chunks',
      title: 'Artisan Flavoured Dehydrated Prime Beef',
      subtitle: 'Slow-dehydrated over botanical heat, seasoned with authentic Suya Yaji and wild garlic.',
      hero_badge: 'High-Protein Clean Snack & Topping',
      product_id: 'prod_beef',
      benefits: JSON.stringify([
        'No refrigeration needed — shelf stable for 4+ weeks after opening',
        'Ready to eat as a clean high-protein snack',
        'Reconstitutes in hot soups or fried rice in 3 minutes',
        '100% Grass-fed prime beef with zero chemical curing nitrites',
      ]),
      recipe_use_cases: JSON.stringify([
        'Gourmet high-protein snack right from the pouch',
        'Tossed into warm Party Jollof or Fried Rice',
        'Dropped into Egusi or Efo Riro soups',
      ]),
      faq_items: JSON.stringify([
        { q: 'Is it spicy?', a: 'We offer both Mild Savoury and Street Fiery variations.' },
        { q: 'Is it tough?', a: 'Slow dehydration leaves the meat crispy yet easily chewable.' },
      ]),
      seo_title: 'Flavoured Shredded & Chunked Beef | Akinnike Ols Pantry',
      seo_description: 'Artisanal cured beef protein staples. Ready to eat or simmer in soups.',
    },
    {
      id: 'camp_suya',
      slug: 'suya',
      title: 'Real Northern Craft Suya Yaji Spice',
      headline: 'Double-Roasted Kuli-Kuli Peanut Powder, Ginger & Clove',
      subtitle: 'Triple-sifted for an ultra-fine gourmet sprinkle that clings evenly to barbecue, dodo, and meats.',
      hero_badge: 'Master Grill Edition',
      product_id: 'prod_suya',
      benefits: JSON.stringify([
        'Double-roasted defatted groundnut cake for deep nutty savoriness',
        'No stale flour fillers — 100% authentic spice',
        'Available in convenient tabletop shakers and kitchen refills',
      ]),
      recipe_use_cases: JSON.stringify([
        'Grilled Beef, Chicken, and Ram Suya skewers',
        'Fried Plantain (Dodo) and Sweet Potato finishing dust',
        'Suya Mayonnaise dipping sauce',
      ]),
      faq_items: JSON.stringify([
        { q: 'Contains peanuts?', a: 'Yes, this product contains groundnut/peanut allergens.' },
      ]),
      seo_title: 'Artisan Suya Spice Blend (Yaji) | Akinnike Ols',
      seo_description: 'Authentic Nigerian street grill spice made from double-roasted peanut paste and ginger.',
    },
    {
      id: 'camp_peppersoup',
      slug: 'pepper-soup',
      title: 'Ancestral Therapeutic Pepper Soup Blend',
      headline: 'Roasted Calabash Nutmeg, Cracked Uda Pods & Uziza',
      subtitle: 'Restorative and warming medicinal spices, balanced to produce crystal-clear therapeutic broths.',
      hero_badge: 'Restorative Broth',
      product_id: 'prod_peppersoup',
      benefits: JSON.stringify([
        'Cracked and roasted to unlock medicinal essential oils',
        'Gentle botanical warmth without burning your throat',
        'Perfect for catfish, goat meat, and soothing postpartum broths',
      ]),
      recipe_use_cases: JSON.stringify([
        'Point & Kill Fresh Catfish Pepper Soup',
        'Soothing Goat Meat & Oxtail Herbal Broths',
        'Morning herbal hot sipping cup',
      ]),
      faq_items: JSON.stringify([
        { q: 'Can I drink this as herbal tea?', a: 'Yes! Steep half a teaspoon in boiling water with a squeeze of lime.' },
      ]),
      seo_title: 'Ancestral Pepper Soup Spices | Akinnike Ols',
      seo_description: 'Traditional Nigerian pepper soup blend with ehuru, uda, and wild lemongrass.',
    },
  ];

  for (const c of campaignPages) {
    await db.execute({
      sql: `INSERT INTO landing_pages (
        id, slug, title, headline, subtitle, hero_badge,
        product_id, benefits, recipe_use_cases, faq_items,
        seo_title, seo_description
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        c.id, c.slug, c.title, c.headline, c.subtitle, c.hero_badge,
        c.product_id, c.benefits, c.recipe_use_cases, c.faq_items,
        c.seo_title, c.seo_description,
      ],
    });
  }

  console.log('[DB] Seeding finished successfully.');
}
