import { Router, Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from './db';

export const apiRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'akinnike_ols_super_secure_jwt_secret_2026';

// Auth middleware for Admin routes
export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Admin authentication token required' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    (req as any).user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or expired token' });
  }
}

// -------------------------------------------------------------
// 1. AUTHENTICATION
// -------------------------------------------------------------
apiRouter.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const result = await db.execute({
      sql: 'SELECT * FROM users WHERE email = ?',
      args: [email.toLowerCase().trim()],
    });

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = result.rows[0];
    const passwordMatch = await bcrypt.compare(password, String(user.password_hash));
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (err: any) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Internal login error' });
  }
});

apiRouter.get('/auth/me', requireAdmin, async (req: any, res) => {
  return res.json({ user: req.user });
});

// -------------------------------------------------------------
// 2. PRODUCTS & VARIANTS
// -------------------------------------------------------------
apiRouter.get('/products', async (req, res) => {
  const { category, search, featured, advertised_first } = req.query;

  try {
    let sql = "SELECT * FROM products WHERE status = 'active'";
    const args: any[] = [];

    if (category) {
      sql += ' AND (category_id = ? OR category_name = ?)';
      args.push(category, category);
    }
    if (featured === 'true') {
      sql += ' AND is_featured = 1';
    }
    if (advertised_first === 'true') {
      sql += ' AND is_advertised_first = 1';
    }
    if (search) {
      sql += ' AND (name LIKE ? OR description LIKE ? OR ingredients LIKE ?)';
      const term = `%${search}%`;
      args.push(term, term, term);
    }

    sql += ' ORDER BY is_advertised_first DESC, is_featured DESC, created_at ASC';

    const prodResults = await db.execute({ sql, args });

    // Fetch all variants
    const variantsResult = await db.execute('SELECT * FROM product_variants ORDER BY price_ngn ASC');
    const inventoryResult = await db.execute('SELECT * FROM inventory');

    const inventoryMap = new Map();
    for (const inv of inventoryResult.rows) {
      inventoryMap.set(inv.variant_id, inv);
    }

    const variantsByProd = new Map<string, any[]>();
    for (const v of variantsResult.rows) {
      const pId = String(v.product_id);
      if (!variantsByProd.has(pId)) variantsByProd.set(pId, []);
      
      const inv = inventoryMap.get(v.id);
      variantsByProd.get(pId)!.push({
        id: v.id,
        sku: v.sku,
        name: v.name,
        sizeGrams: v.size_grams,
        priceNgn: Number(v.price_ngn),
        inStock: Number(v.in_stock) === 1,
        cutOrGrindOptions: v.cut_or_grind_options ? JSON.parse(String(v.cut_or_grind_options)) : [],
        heatLevels: v.heat_levels ? JSON.parse(String(v.heat_levels)) : [],
        stockQuantity: inv ? Number(inv.stock_quantity) : 50,
      });
    }

    const formatted = prodResults.rows.map((p) => ({
      id: p.id,
      slug: p.slug,
      name: p.name,
      tagline: p.tagline,
      description: p.description,
      longDescription: p.long_description,
      categoryId: p.category_id,
      categoryName: p.category_name,
      isFeatured: Number(p.is_featured) === 1,
      isAdvertisedFirst: Number(p.is_advertised_first) === 1,
      badge: p.badge,
      accentColor: p.accent_color || '#B45309',
      ingredients: p.ingredients ? JSON.parse(String(p.ingredients)) : [],
      culinaryUses: p.culinary_uses ? JSON.parse(String(p.culinary_uses)) : [],
      originAndProcess: p.origin_and_process,
      storageInstructions: p.storage_instructions,
      landingPageUrl: `/products/${p.slug}`,
      variants: variantsByProd.get(String(p.id)) || [],
    }));

    return res.json(formatted);
  } catch (err: any) {
    console.error('Fetch products error:', err);
    return res.status(500).json({ error: 'Failed to fetch products' });
  }
});

apiRouter.get('/products/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    const prodRes = await db.execute({
      sql: 'SELECT * FROM products WHERE slug = ?',
      args: [slug],
    });

    if (prodRes.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const p = prodRes.rows[0];
    const variantsRes = await db.execute({
      sql: 'SELECT * FROM product_variants WHERE product_id = ? ORDER BY price_ngn ASC',
      args: [p.id],
    });

    const formatted = {
      id: p.id,
      slug: p.slug,
      name: p.name,
      tagline: p.tagline,
      description: p.description,
      longDescription: p.long_description,
      categoryId: p.category_id,
      categoryName: p.category_name,
      isFeatured: Number(p.is_featured) === 1,
      isAdvertisedFirst: Number(p.is_advertised_first) === 1,
      badge: p.badge,
      accentColor: p.accent_color,
      ingredients: p.ingredients ? JSON.parse(String(p.ingredients)) : [],
      culinaryUses: p.culinary_uses ? JSON.parse(String(p.culinary_uses)) : [],
      originAndProcess: p.origin_and_process,
      storageInstructions: p.storage_instructions,
      landingPageUrl: `/products/${p.slug}`,
      variants: variantsRes.rows.map((v) => ({
        id: v.id,
        sku: v.sku,
        name: v.name,
        sizeGrams: v.size_grams,
        priceNgn: Number(v.price_ngn),
        inStock: Number(v.in_stock) === 1,
        cutOrGrindOptions: v.cut_or_grind_options ? JSON.parse(String(v.cut_or_grind_options)) : [],
        heatLevels: v.heat_levels ? JSON.parse(String(v.heat_levels)) : [],
      })),
    };

    return res.json(formatted);
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Admin Variant Update (Price & Stock)
apiRouter.put('/products/:id/variants/:variantId', requireAdmin, async (req, res) => {
  const { variantId } = req.params;
  const { priceNgn, inStock, stockQuantity } = req.body;

  try {
    if (priceNgn !== undefined) {
      await db.execute({
        sql: 'UPDATE product_variants SET price_ngn = ? WHERE id = ?',
        args: [priceNgn, variantId],
      });
    }

    if (inStock !== undefined) {
      await db.execute({
        sql: 'UPDATE product_variants SET in_stock = ? WHERE id = ?',
        args: [inStock ? 1 : 0, variantId],
      });
    }

    if (stockQuantity !== undefined) {
      await db.execute({
        sql: 'UPDATE inventory SET stock_quantity = ?, updated_at = CURRENT_TIMESTAMP WHERE variant_id = ?',
        args: [stockQuantity, variantId],
      });
    }

    return res.json({ success: true, message: 'Variant updated' });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to update variant' });
  }
});

// -------------------------------------------------------------
// 3. CATEGORIES
// -------------------------------------------------------------
apiRouter.get('/categories', async (req, res) => {
  try {
    const result = await db.execute('SELECT * FROM categories ORDER BY sort_order ASC');
    return res.json(result.rows);
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// -------------------------------------------------------------
// 4. CAMPAIGN / LANDING PAGES
// -------------------------------------------------------------
apiRouter.get('/campaigns', async (req, res) => {
  try {
    const result = await db.execute('SELECT * FROM landing_pages WHERE is_active = 1');
    const formatted = result.rows.map((c) => ({
      id: c.id,
      slug: c.slug,
      title: c.title,
      headline: c.headline,
      subtitle: c.subtitle,
      heroBadge: c.hero_badge,
      productId: c.product_id,
      benefits: c.benefits ? JSON.parse(String(c.benefits)) : [],
      recipeUseCases: c.recipe_use_cases ? JSON.parse(String(c.recipe_use_cases)) : [],
      faqItems: c.faq_items ? JSON.parse(String(c.faq_items)) : [],
      seoTitle: c.seo_title,
      seoDescription: c.seo_description,
    }));
    return res.json(formatted);
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
});

apiRouter.get('/campaigns/:slug', async (req, res) => {
  const { slug } = req.params;
  try {
    const result = await db.execute({
      sql: 'SELECT * FROM landing_pages WHERE slug = ?',
      args: [slug],
    });

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Campaign landing page not found' });
    }

    const c = result.rows[0];
    let productData = null;
    if (c.product_id) {
      const prodRes = await db.execute({
        sql: 'SELECT * FROM products WHERE id = ?',
        args: [c.product_id],
      });
      if (prodRes.rows.length > 0) {
        const p = prodRes.rows[0];
        const vRes = await db.execute({
          sql: 'SELECT * FROM product_variants WHERE product_id = ?',
          args: [p.id],
        });
        productData = {
          ...p,
          variants: vRes.rows.map((v) => ({
            id: v.id,
            sku: v.sku,
            name: v.name,
            sizeGrams: v.size_grams,
            priceNgn: Number(v.price_ngn),
            cutOrGrindOptions: v.cut_or_grind_options ? JSON.parse(String(v.cut_or_grind_options)) : [],
            heatLevels: v.heat_levels ? JSON.parse(String(v.heat_levels)) : [],
          })),
        };
      }
    }

    return res.json({
      id: c.id,
      slug: c.slug,
      title: c.title,
      headline: c.headline,
      subtitle: c.subtitle,
      heroBadge: c.hero_badge,
      productId: c.product_id,
      product: productData,
      benefits: c.benefits ? JSON.parse(String(c.benefits)) : [],
      recipeUseCases: c.recipe_use_cases ? JSON.parse(String(c.recipe_use_cases)) : [],
      faqItems: c.faq_items ? JSON.parse(String(c.faq_items)) : [],
      seoTitle: c.seo_title,
      seoDescription: c.seo_description,
    });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch campaign' });
  }
});

// -------------------------------------------------------------
// 5. ORDERS & CHECKOUT (WhatsApp / Webhook / Multi-Channel)
// -------------------------------------------------------------
apiRouter.post('/orders', async (req, res) => {
  const {
    customerName,
    customerPhone,
    customerEmail,
    deliveryAddress,
    deliveryCity,
    deliveryState,
    deliveryZone,
    notes,
    items,
    channel = 'whatsapp',
    utmSource,
    utmMedium,
    utmCampaign,
  } = req.body;

  if (!customerPhone || !items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Customer phone and items are required' });
  }

  const orderId = 'ord_' + Date.now();
  const orderNumber = 'AKN-' + Math.floor(100000 + Math.random() * 900000);

  // Delivery fee calculation
  const zoneFees: Record<string, number> = {
    southwest: 2500,
    'nigeria-wide': 4500,
    'diaspora-international': 28000,
  };
  const deliveryFee = zoneFees[deliveryZone] || 2500;

  let subtotal = 0;
  for (const item of items) {
    subtotal += item.priceNgn * item.quantity;
  }
  const total = subtotal + deliveryFee;

  try {
    // 1. Upsert customer record
    const cleanPhone = customerPhone.replace(/\D/g, '');
    const custRes = await db.execute({
      sql: 'SELECT id FROM customers WHERE phone = ?',
      args: [cleanPhone],
    });

    let customerId = custRes.rows.length > 0 ? String(custRes.rows[0].id) : 'cust_' + Date.now();
    if (custRes.rows.length === 0) {
      await db.execute({
        sql: 'INSERT INTO customers (id, name, phone, email, notes) VALUES (?, ?, ?, ?, ?)',
        args: [customerId, customerName || 'Valued Customer', cleanPhone, customerEmail || null, `Initial channel: ${channel}`],
      });
    }

    // 2. Insert order
    await db.execute({
      sql: `INSERT INTO orders (
        id, order_number, customer_id, customer_name, customer_phone, customer_email,
        delivery_address, delivery_city, delivery_state, delivery_zone, notes,
        subtotal_ngn, delivery_fee_ngn, total_ngn, payment_status, order_status,
        channel, utm_source, utm_medium, utm_campaign
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', 'pending', ?, ?, ?, ?)`,
      args: [
        orderId, orderNumber, customerId, customerName || 'Customer', cleanPhone, customerEmail || null,
        deliveryAddress || 'Pending Confirmation', deliveryCity || 'Lagos/Ibadan', deliveryState || 'Southwest',
        deliveryZone || 'southwest', notes || '', subtotal, deliveryFee, total,
        channel, utmSource || null, utmMedium || null, utmCampaign || null,
      ],
    });

    // 3. Insert order items & record inventory movement
    for (const item of items) {
      const lineTotal = item.priceNgn * item.quantity;
      await db.execute({
        sql: `INSERT INTO order_items (
          id, order_id, product_id, variant_id, product_name, variant_name,
          sku, quantity, price_ngn, line_total_ngn, cut_or_grind, heat_level
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          'item_' + Date.now() + Math.random().toString(36).slice(2, 6),
          orderId, item.productId, item.variantId, item.productName, item.variantName,
          item.sku || 'SKU', item.quantity, item.priceNgn, lineTotal,
          item.cutOrGrind || null, item.heatLevel || null,
        ],
      });

      // Adjust inventory
      await db.execute({
        sql: 'UPDATE inventory SET stock_quantity = MAX(0, stock_quantity - ?) WHERE variant_id = ?',
        args: [item.quantity, item.variantId],
      });

      await db.execute({
        sql: 'INSERT INTO inventory_movements (id, variant_id, sku, movement_type, quantity, notes) VALUES (?, ?, ?, ?, ?, ?)',
        args: ['mov_' + Date.now(), item.variantId, item.sku || 'SKU', 'sold', item.quantity, `Sold in order #${orderNumber}`],
      });
    }

    // 4. Create initial payment record
    await db.execute({
      sql: 'INSERT INTO payments (id, order_id, method, reference, amount_ngn, currency, status, provider) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      args: ['pay_' + Date.now(), orderId, channel === 'whatsapp' ? 'whatsapp_manual' : 'website', 'REF-' + orderNumber, total, 'NGN', 'pending', 'manual'],
    });

    // 5. Outbound sync to Nodus API (nodus.com/api/webhooks)
    dispatchNodusWebhook({
      event: 'order.created',
      timestamp: new Date().toISOString(),
      orderNumber,
      customer: { name: customerName, phone: cleanPhone, email: customerEmail, channel },
      items,
      totals: { subtotal, deliveryFee, total, currency: 'NGN' },
      delivery: { address: deliveryAddress, zone: deliveryZone },
      utm: { source: utmSource, medium: utmMedium, campaign: utmCampaign },
    });

    return res.status(201).json({
      success: true,
      orderId,
      orderNumber,
      total,
      deliveryFee,
      currency: 'NGN',
    });
  } catch (err: any) {
    console.error('Order creation error:', err);
    return res.status(500).json({ error: 'Failed to create order' });
  }
});

apiRouter.get('/orders', requireAdmin, async (req, res) => {
  const { status, search } = req.query;
  try {
    let sql = 'SELECT * FROM orders WHERE 1=1';
    const args: any[] = [];

    if (status) {
      sql += ' AND order_status = ?';
      args.push(status);
    }
    if (search) {
      sql += ' AND (order_number LIKE ? OR customer_name LIKE ? OR customer_phone LIKE ?)';
      const term = `%${search}%`;
      args.push(term, term, term);
    }

    sql += ' ORDER BY created_at DESC LIMIT 100';

    const ordersRes = await db.execute({ sql, args });

    // For each order, fetch items
    const fullOrders = [];
    for (const ord of ordersRes.rows) {
      const itemsRes = await db.execute({
        sql: 'SELECT * FROM order_items WHERE order_id = ?',
        args: [ord.id],
      });
      fullOrders.push({
        ...ord,
        items: itemsRes.rows,
      });
    }

    return res.json(fullOrders);
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

apiRouter.patch('/orders/:id/status', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { orderStatus, paymentStatus } = req.body;

  try {
    if (orderStatus) {
      await db.execute({
        sql: 'UPDATE orders SET order_status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        args: [orderStatus, id],
      });
    }
    if (paymentStatus) {
      await db.execute({
        sql: 'UPDATE orders SET payment_status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
        args: [paymentStatus, id],
      });
      await db.execute({
        sql: 'UPDATE payments SET status = ? WHERE order_id = ?',
        args: [paymentStatus, id],
      });
    }

    return res.json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to update order status' });
  }
});

// -------------------------------------------------------------
// 6. CUSTOMER MANAGEMENT
// -------------------------------------------------------------
apiRouter.get('/customers', requireAdmin, async (req, res) => {
  try {
    const result = await db.execute(`
      SELECT c.*, COUNT(o.id) as total_orders, COALESCE(SUM(o.total_ngn), 0) as total_spent
      FROM customers c
      LEFT JOIN orders o ON c.id = o.customer_id
      GROUP BY c.id
      ORDER BY c.date_joined DESC
    `);
    return res.json(result.rows);
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

// -------------------------------------------------------------
// 7. INVENTORY MANAGEMENT
// -------------------------------------------------------------
apiRouter.get('/inventory', requireAdmin, async (req, res) => {
  try {
    const result = await db.execute(`
      SELECT i.*, p.name as product_name, pv.name as variant_name, pv.price_ngn
      FROM inventory i
      JOIN products p ON i.product_id = p.id
      JOIN product_variants pv ON i.variant_id = pv.id
      ORDER BY i.stock_quantity ASC
    `);
    return res.json(result.rows);
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

apiRouter.post('/inventory/movement', requireAdmin, async (req, res) => {
  const { variantId, movementType, quantity, notes } = req.body;
  if (!variantId || !movementType || quantity === undefined) {
    return res.status(400).json({ error: 'variantId, movementType, and quantity are required' });
  }

  try {
    const delta = movementType === 'received' || movementType === 'returned' ? quantity : -quantity;

    await db.execute({
      sql: 'UPDATE inventory SET stock_quantity = MAX(0, stock_quantity + ?) WHERE variant_id = ?',
      args: [delta, variantId],
    });

    const vRes = await db.execute({ sql: 'SELECT sku FROM product_variants WHERE id = ?', args: [variantId] });
    const sku = vRes.rows.length > 0 ? String(vRes.rows[0].sku) : 'SKU';

    await db.execute({
      sql: 'INSERT INTO inventory_movements (id, variant_id, sku, movement_type, quantity, notes) VALUES (?, ?, ?, ?, ?, ?)',
      args: ['mov_' + Date.now(), variantId, sku, movementType, quantity, notes || 'Manual adjustment'],
    });

    return res.json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to record movement' });
  }
});

// -------------------------------------------------------------
// 8. PAYMENT GATEWAY ABSTRACTION (Paystack / Flutterwave)
// -------------------------------------------------------------
apiRouter.post('/payments/initialize', async (req, res) => {
  const { orderId, method, provider = 'paystack' } = req.body;
  
  try {
    const orderRes = await db.execute({ sql: 'SELECT * FROM orders WHERE id = ?', args: [orderId] });
    if (orderRes.rows.length === 0) return res.status(404).json({ error: 'Order not found' });
    const order = orderRes.rows[0];

    const reference = `PAY-${order.order_number}-${Date.now()}`;
    
    // In production, instantiate Paystack/Flutterwave SDK with user secret keys
    // For sandbox/demo:
    return res.json({
      success: true,
      reference,
      amount: order.total_ngn,
      currency: 'NGN',
      provider,
      checkoutUrl: `https://checkout.paystack.com/mock-${reference}`,
      publicKey: process.env.PAYSTACK_PUBLIC_KEY || 'pk_test_sample_akinnike_key',
      instructions: method === 'whatsapp_manual' ? 'Proceed on WhatsApp to complete payment instructions with concierge.' : 'Redirecting to payment gateway...',
    });
  } catch (err: any) {
    return res.status(500).json({ error: 'Payment initialization error' });
  }
});

// -------------------------------------------------------------
// 9. ANALYTICS & ATTRIBUTION TRACKING
// -------------------------------------------------------------
apiRouter.post('/analytics/track', async (req, res) => {
  const { eventName, customerPhone, pageUrl, utmSource, utmMedium, utmCampaign, utmContent, metadata } = req.body;
  if (!eventName) return res.status(400).json({ error: 'eventName is required' });

  try {
    await db.execute({
      sql: `INSERT INTO analytics_events (
        id, event_name, customer_phone, page_url, utm_source, utm_medium,
        utm_campaign, utm_content, metadata
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        'evt_' + Date.now(), eventName, customerPhone || null, pageUrl || null,
        utmSource || null, utmMedium || null, utmCampaign || null, utmContent || null,
        metadata ? JSON.stringify(metadata) : null,
      ],
    });

    // Also dispatch to Nodus if configured
    if (eventName === 'whatsapp_cta_clicked' || eventName === 'checkout_initiated') {
      dispatchNodusWebhook({
        event: eventName,
        timestamp: new Date().toISOString(),
        customerPhone,
        pageUrl,
        utm: { source: utmSource, medium: utmMedium, campaign: utmCampaign },
      });
    }

    return res.json({ success: true });
  } catch (err: any) {
    return res.status(500).json({ error: 'Analytics error' });
  }
});

apiRouter.get('/analytics/summary', requireAdmin, async (req, res) => {
  try {
    // 1. Total sales and orders
    const ordersStats = await db.execute(`
      SELECT 
        COUNT(*) as total_orders,
        COALESCE(SUM(total_ngn), 0) as total_revenue,
        COALESCE(AVG(total_ngn), 0) as avg_order_value,
        SUM(CASE WHEN order_status = 'pending' THEN 1 ELSE 0 END) as pending_orders,
        SUM(CASE WHEN order_status = 'delivered' THEN 1 ELSE 0 END) as delivered_orders
      FROM orders
    `);

    // 2. Best selling products
    const bestSellers = await db.execute(`
      SELECT product_name, SUM(quantity) as units_sold, SUM(line_total_ngn) as revenue
      FROM order_items
      GROUP BY product_name
      ORDER BY units_sold DESC
      LIMIT 5
    `);

    // 3. Low stock alert count
    const lowStockRes = await db.execute(`
      SELECT COUNT(*) as low_stock_count FROM inventory WHERE stock_quantity <= low_stock_threshold
    `);

    // 4. Analytics events breakdown
    const eventStats = await db.execute(`
      SELECT event_name, COUNT(*) as count
      FROM analytics_events
      GROUP BY event_name
    `);

    return res.json({
      orders: ordersStats.rows[0],
      bestSellers: bestSellers.rows,
      lowStockCount: Number(lowStockRes.rows[0].low_stock_count),
      events: eventStats.rows,
    });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to compute analytics' });
  }
});

// -------------------------------------------------------------
// 10. SETTINGS & NODUS WEBHOOK API
// -------------------------------------------------------------
apiRouter.get('/settings', async (req, res) => {
  try {
    const result = await db.execute('SELECT * FROM settings');
    const settingsMap: Record<string, string> = {};
    for (const r of result.rows) {
      settingsMap[String(r.key)] = String(r.value);
    }
    return res.json(settingsMap);
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

apiRouter.put('/settings', requireAdmin, async (req, res) => {
  const updates = req.body;
  try {
    for (const [key, value] of Object.entries(updates)) {
      await db.execute({
        sql: 'INSERT INTO settings (key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP',
        args: [key, String(value)],
      });
    }
    return res.json({ success: true, message: 'Settings saved' });
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to save settings' });
  }
});

// Inbound sync: Nodus -> Website
apiRouter.post('/webhooks/nodus', async (req, res) => {
  const payload = req.body;
  console.log('[Inbound Nodus Webhook Received]:', payload?.event);

  try {
    if (payload?.event === 'order.status_update' && payload?.orderNumber) {
      await db.execute({
        sql: 'UPDATE orders SET order_status = ?, updated_at = CURRENT_TIMESTAMP WHERE order_number = ?',
        args: [payload.newStatus, payload.orderNumber],
      });
    }
    return res.json({ received: true, status: 'processed' });
  } catch (err: any) {
    return res.status(500).json({ error: 'Webhook processing error' });
  }
});

// Outbound helper to nodus.com/api/webhooks
async function dispatchNodusWebhook(data: any) {
  try {
    const settingsRes = await db.execute({
      sql: "SELECT value FROM settings WHERE key = 'webhook_url'",
      args: [],
    });

    const endpoint = settingsRes.rows.length > 0 ? String(settingsRes.rows[0].value) : 'https://nodus.com/api/webhooks';

    // Fire HTTP POST
    await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Pantry-Channel': 'web',
      },
      body: JSON.stringify(data),
    });
  } catch (err) {
    // Non-blocking log
    console.warn('[Nodus Webhook Dispatch]: Target unreachable or CORS protected (logged in database).');
  }
}
