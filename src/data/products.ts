import { Product, IntegrationSettings } from '../types';

export const DEFAULT_INTEGRATION_SETTINGS: IntegrationSettings = {
  whatsappNumber: '07051377659',
  whatsappCountryCode: '234',
  whatsappConciergeName: 'Akinnike Ols Concierge',
  webhookUrl: 'https://nodus.com/api/webhooks',
  webhookSecretToken: 'akinnike_pantry_live_key_9942',
  enableAutoWebhookDispatch: true,
  businessEmail: 'orders@akinnikeolspantry.com',
  businessPhoneDisplay: '+234 705 137 7659',
  physicalLocation: 'Southwest Hub (Lagos & Ibadan Logistics), Nigeria',
  shippingZones: [
    {
      id: 'southwest',
      name: 'Southwest Nigeria (Primary Express)',
      estimatedDays: '1 - 2 Business Days',
      feeNgn: 2500,
      description: 'Same-day / next-day delivery across Lagos, Ibadan, Ogun, Osun, Ondo, and Ekiti.'
    },
    {
      id: 'nigeria-wide',
      name: 'Nationwide Nigeria (Interstate Courier)',
      estimatedDays: '2 - 4 Business Days',
      feeNgn: 4500,
      description: 'Reliable air/road freight to Abuja, Port Harcourt, Kano, Enugu, and all states.'
    },
    {
      id: 'diaspora-international',
      name: 'African Continental & Diaspora Express (UK / US / Canada / Europe)',
      estimatedDays: '4 - 7 Business Days (DHL/FedEx)',
      feeNgn: 28000,
      description: 'Hermetically vacuum-sealed, certified export packaging for African and international delivery.'
    }
  ]
};

export const PRODUCTS: Product[] = [
  {
    id: 'concoction-blend',
    slug: 'concoction-blend',
    name: 'Signature Concoction Blend',
    tagline: 'The ancestral one-pot soul blend of smoked aromatics, iru essence, and wild herbs',
    category: 'signature-concoctions',
    categoryName: 'Signature Concoctions',
    advertisedFirst: true,
    landingPageUrl: '/landing/concoction-blend',
    badge: 'Flagship Apothecary Blend',
    description: 'An artisanal alchemy of sun-dried river crayfish, slow-cured fermented locust beans (iru crystals), wild uziza seed, smoked bonga fish aromatics, and dehydrated native scent leaf.',
    longDescription: 'Crafted for the modern home seeking the deep, comforting complexity of traditional Nigerian cooking without hours of tedious prep. Our Signature Concoction Blend captures the soul of native rice, yam porridge, seafood okro, and village pottage in one single fragrant teaspoon. Each batch is stone-ground in small runs and immediately sealed in amber glass or UV-shielded pouches to lock in volatile essential oils.',
    ingredients: [
      'Fermented locust beans (Iru Woro crystals)',
      'Sun-dried Nigerian coastal crayfish powder',
      'Wild smoked bonga fish flakes',
      'African black peppercorn (Uziza seeds)',
      'Grains of Selim (Uda)',
      'Sun-dehydrated native scent leaves (Efirin/Nchuanwu)',
      'Alligator pepper pod botanicals',
      'Organic mineral sea salt'
    ],
    culinaryUses: [
      'One-pot Native Concoction Rice & Asaro (Yam Pottage)',
      'Native Jollof, Seafood Okro, and Ofe Nsala broths',
      'Stir-fried indigenous vegetables and garden egg sauces',
      'Morning plantain and egg herbal scrambles'
    ],
    originAndProcess: 'Small-batch blended in Southwest Nigeria using heritage sun-drying and cool stone-milling to prevent nutrient degradation.',
    storageInstructions: 'Store in a cool, dry pantry away from direct sunlight. Reseal pouch tightly after opening. Keeps fresh for up to 18 months.',
    accentColor: '#B45309', // warm amber/terracotta
    iconType: 'soup',
    variations: [
      {
        id: 'concoction-100g',
        name: '100g Amber Apothecary Glass Jar',
        sizeGrams: 100,
        priceNgn: 4500,
        inStock: true,
        sku: 'AKN-CONC-100G',
        cutOrGrindOptions: ['Fine Stone-Ground Silk', 'Coarse Rustic Mortar Crush'],
        heatLevels: ['Gentle Savoury Warmth', 'Traditional Native Heat', 'Extra Fiery Pepper']
      },
      {
        id: 'concoction-250g',
        name: '250g Aromalock Craft Pouch (Most Popular)',
        sizeGrams: 250,
        priceNgn: 9800,
        inStock: true,
        sku: 'AKN-CONC-250G',
        cutOrGrindOptions: ['Fine Stone-Ground Silk', 'Coarse Rustic Mortar Crush'],
        heatLevels: ['Gentle Savoury Warmth', 'Traditional Native Heat', 'Extra Fiery Pepper']
      },
      {
        id: 'concoction-500g',
        name: '500g Chef Pantry Feast Tub',
        sizeGrams: 500,
        priceNgn: 18500,
        inStock: true,
        sku: 'AKN-CONC-500G',
        cutOrGrindOptions: ['Fine Stone-Ground Silk', 'Coarse Rustic Mortar Crush'],
        heatLevels: ['Gentle Savoury Warmth', 'Traditional Native Heat', 'Extra Fiery Pepper']
      }
    ],
    featuredReviews: [
      {
        author: 'Dr. Folashade A.',
        location: 'Victoria Island, Lagos',
        rating: 5,
        quote: 'Takes me straight back to my grandmother’s kitchen in Ondo. The aroma of real iru and smoked fish without artificial bouillon cubes is unmatched.'
      },
      {
        author: 'Chef Kene O.',
        location: 'London, UK (Diaspora Delivery)',
        rating: 5,
        quote: 'The 250g pouch arrived in London in pristine airtight condition. Incredible umami depth for native rice.'
      }
    ]
  },
  {
    id: 'flavoured-beef',
    slug: 'flavoured-beef',
    name: 'Flavoured Shredded & Chunked Beef',
    tagline: 'Artisanal slow-dehydrated grass-fed prime beef seasoned with heritage aromatics',
    category: 'flavoured-proteins',
    categoryName: 'Flavoured Proteins',
    advertisedFirst: true,
    landingPageUrl: '/landing/flavoured-beef',
    badge: 'High-Protein Pantry Essential',
    description: 'Tender prime beef, slow-dehydrated over low botanical heat to create crunchy shards or succulent chunks, infused with suya aromatics, smoked garlic, and wild herbs.',
    longDescription: 'Our signature cured beef pantry protein redefines homemade convenience. Prepared from 100% grass-fed Nigerian prime beef, each strip is trimmed lean, hand-seasoned with our house apothecary marinade, and dehydrated slowly over 18 hours. Available in both pulled shredded strands (perfect for tossing into fried rice, pasta, or snacking) and chunky bites (ready to drop directly into soups or stews). Zero chemical preservatives, zero MSG fillers.',
    ingredients: [
      '100% Grass-fed lean beef silverside',
      'Artisan Suya spice (kuli-kuli peanut extract, ginger, chili)',
      'Slow-roasted garlic & sweet red onion essence',
      'Sun-dried African black pepper',
      'Sea salt crystals & cold-pressed sesame oil glaze'
    ],
    culinaryUses: [
      'Ready-to-eat savoury high-protein snack on the go',
      'Instant protein topping for jollof rice, fried rice, and noodles',
      'Reconstitutes quickly in efo riro, egusi, and okro soups',
      'Pantry emergency protein for fast family dinners'
    ],
    originAndProcess: 'Sourced from verified humane cattle ranches; marinated and cured in certified sanitary commercial apothecary kitchens in Ibadan.',
    storageInstructions: 'Keep in airtight resealable bag at ambient room temperature. No refrigeration required. Once opened, consume within 4 weeks.',
    accentColor: '#991B1B', // deep rich rust/burgundy
    iconType: 'protein',
    variations: [
      {
        id: 'beef-shredded-150g',
        name: '150g Shredded Strands (Crispy Pulled Flakes)',
        sizeGrams: 150,
        priceNgn: 6500,
        inStock: true,
        sku: 'AKN-BEEF-SHRED-150',
        cutOrGrindOptions: ['Delicate Shredded Flakes (Snack & Topping)'],
        heatLevels: ['Signature Mild Pepper', 'Bold Street Fire'],
        flavourNotes: ['Smoky Suya Infused', 'Roasted Garlic & Native Herb']
      },
      {
        id: 'beef-chunked-150g',
        name: '150g Chunked Bites (Thick Meaty Cubes)',
        sizeGrams: 150,
        priceNgn: 6500,
        inStock: true,
        sku: 'AKN-BEEF-CHUNK-150',
        cutOrGrindOptions: ['Tender Meaty Chunks (Soup & Stew Ready)'],
        heatLevels: ['Signature Mild Pepper', 'Bold Street Fire'],
        flavourNotes: ['Smoky Suya Infused', 'Roasted Garlic & Native Herb']
      },
      {
        id: 'beef-combo-300g',
        name: '300g Family Pantry Duo Pack (150g Shred + 150g Chunk)',
        sizeGrams: 300,
        priceNgn: 12500,
        inStock: true,
        sku: 'AKN-BEEF-DUO-300',
        cutOrGrindOptions: ['Duo Pack (Shredded + Chunked)'],
        heatLevels: ['Signature Mild Pepper', 'Bold Street Fire'],
        flavourNotes: ['Smoky Suya Infused', 'Roasted Garlic & Native Herb']
      },
      {
        id: 'beef-bulk-600g',
        name: '600g Feast Value Bag',
        sizeGrams: 600,
        priceNgn: 23500,
        inStock: true,
        sku: 'AKN-BEEF-BULK-600',
        cutOrGrindOptions: ['All Chunky Bites', 'All Shredded Strands', 'Half & Half'],
        heatLevels: ['Signature Mild Pepper', 'Bold Street Fire'],
        flavourNotes: ['Smoky Suya Infused', 'Roasted Garlic & Native Herb']
      }
    ],
    featuredReviews: [
      {
        author: 'Engr. Damilola B.',
        location: 'Ibadan, Oyo State',
        rating: 5,
        quote: 'My children finish the shredded beef as snacks before I can even put it into jollof rice! Tender, deeply flavoured, and cleanly packaged.'
      },
      {
        author: 'Amina Y.',
        location: 'Abuja, FCT',
        rating: 5,
        quote: 'The chunked beef softens up in egusi soup within 5 minutes of simmering. Real time saver for working mothers.'
      }
    ]
  },
  {
    id: 'pepper-soup-blend',
    slug: 'pepper-soup-blend',
    name: 'Ancestral Pepper Soup Blend',
    tagline: 'Therapeutic and warming medicinal spices, stone-ground with ehuru and wild uda',
    category: 'signature-concoctions',
    categoryName: 'Signature Concoctions',
    advertisedFirst: true,
    landingPageUrl: '/landing/pepper-soup-blend',
    badge: 'Therapeutic & Warming',
    description: 'A restorative botanical blend of roasted African nutmeg (ehuru), aromatic Selim seeds (uda pods), alligator pepper, uziza seeds, and sun-dried wild lemon grass.',
    longDescription: 'In traditional Nigerian herbal lore, Pepper Soup is more than a meal—it is a soothing, circulation-restoring tonic. Our Ancestral Pepper Soup Blend balances the deep roasted nuttiness of calabash nutmeg with the camphor-tinged warmth of cracked uda pods and the citrusy lift of dried lemongrass. Perfectly calibrated to produce that unmistakable crystal-clear, intensely aromatic broth for catfish, goat meat, chicken, or healing vegetable broths.',
    ingredients: [
      'Slow-roasted calabash nutmeg (Ehuru)',
      'Grains of Selim (Uda seeds, cracked & de-bittered)',
      'Wild Uziza peppercorns',
      'Alligator pepper grains (Atare)',
      'Dehydrated wild lemongrass cuts',
      'Ginger root & African dry thyme crystals'
    ],
    culinaryUses: [
      'Authentic Point & Kill Catfish Pepper Soup',
      'Restorative Goat Meat or Oxtail Herbal Broths',
      'Postpartum & Rainy Season Comfort Soups',
      'Morning hot herbal sipping broth'
    ],
    originAndProcess: 'Carefully roasted over clay heat tiles before stone milling, unlocking medicinal essential oils and removing raw bitterness.',
    storageInstructions: 'Store in airtight apothecary jar in a cool cupboard. Retains therapeutic aroma for 24 months.',
    accentColor: '#C2410C', // vivid terracotta spice
    iconType: 'soup',
    variations: [
      {
        id: 'peppersoup-100g',
        name: '100g Apothecary Amber Glass Jar',
        sizeGrams: 100,
        priceNgn: 4200,
        inStock: true,
        sku: 'AKN-PS-100G',
        cutOrGrindOptions: ['Fine Silky Mill', 'Traditional Coarse Cracked Pods'],
        heatLevels: ['Gentle Restorative Warmth', 'Traditional Lagos Pepper Heat', 'Fiery Fisherman Strength']
      },
      {
        id: 'peppersoup-250g',
        name: '250g Aromalock Craft Pouch',
        sizeGrams: 250,
        priceNgn: 9200,
        inStock: true,
        sku: 'AKN-PS-250G',
        cutOrGrindOptions: ['Fine Silky Mill', 'Traditional Coarse Cracked Pods'],
        heatLevels: ['Gentle Restorative Warmth', 'Traditional Lagos Pepper Heat', 'Fiery Fisherman Strength']
      },
      {
        id: 'peppersoup-500g',
        name: '500g Feast Chef Pack',
        sizeGrams: 500,
        priceNgn: 17000,
        inStock: true,
        sku: 'AKN-PS-500G',
        cutOrGrindOptions: ['Fine Silky Mill', 'Traditional Coarse Cracked Pods'],
        heatLevels: ['Gentle Restorative Warmth', 'Traditional Lagos Pepper Heat', 'Fiery Fisherman Strength']
      }
    ],
    featuredReviews: [
      {
        author: 'Mama Nneka U.',
        location: 'Lekki Phase 1, Lagos',
        rating: 5,
        quote: 'The scent that filled my home when I opened the jar brought tears to my eyes. Authentic, pure ehuru and uda with zero sand or fillers.'
      }
    ]
  },
  {
    id: 'suya-blend',
    slug: 'suya-blend',
    name: 'Artisan Suya Spice Blend (Yaji)',
    tagline: 'Northern heritage roasted kuli-kuli peanut powder, ginger, chili, and clove',
    category: 'pantry-essentials',
    categoryName: 'Pantry Essentials',
    advertisedFirst: true,
    landingPageUrl: '/landing/suya-blend',
    badge: 'Street Craft Gourmet Edition',
    description: 'Authentic Nigerian street grill spice made from double-roasted defatted peanut paste (kuli-kuli), sharp ginger, smoked red chili, and whole ground spices.',
    longDescription: 'The crown jewel of West African grilling. We source pure, defatted peanut pressings from verified small-holder cooperatives, roast them a second time for an intense nutty depth, and blend them with fiery Scotch bonnet chili, sweet ginger, pungent garlic, and crushed cloves. Sprinkle it directly onto grilled steak, roasted chicken, suya beef skewers, fried plantains (dodo), or oven-roasted sweet potatoes for instant culinary fireworks.',
    ingredients: [
      'Double-roasted defatted groundnut cake (Kuli-kuli)',
      'High-grade Nigerian dried ginger root',
      'Sun-dried red chili pepper flakes',
      'Whole sweet cloves (Kanunfari)',
      'Black peppercorn & white pepper',
      'Garlic powder & mineral sea salt'
    ],
    culinaryUses: [
      'Dry rub for beef skewers, lamb chops, and whole grilled fish',
      'Finishing seasoning for fried plantain (Dodo), yam fries, and popcorn',
      'Suya roast chicken wings and barbecue glaze',
      'Stirred into yogurt or mayonnaise for an artisan dipping sauce'
    ],
    originAndProcess: 'Triple-sifted for an ultra-fine, lump-free gourmet sprinkle that clings evenly to hot proteins.',
    storageInstructions: 'Keep airtight in your dry spice rack. Contains groundnuts (peanut allergen notice).',
    accentColor: '#D97706', // golden ochre
    iconType: 'spice',
    variations: [
      {
        id: 'suya-120g',
        name: '120g Tabletop Spice Shaker Jar',
        sizeGrams: 120,
        priceNgn: 3800,
        inStock: true,
        sku: 'AKN-SUYA-120G',
        heatLevels: ['Classic Street Heat (Traditional)', 'Mild & Sweet Savoury', 'Extra Hot Suya Master']
      },
      {
        id: 'suya-250g',
        name: '250g Kitchen Refill Pouch',
        sizeGrams: 250,
        priceNgn: 7500,
        inStock: true,
        sku: 'AKN-SUYA-250G',
        heatLevels: ['Classic Street Heat (Traditional)', 'Mild & Sweet Savoury', 'Extra Hot Suya Master']
      },
      {
        id: 'suya-500g',
        name: '500g Pitmaster Barbecue Tub',
        sizeGrams: 500,
        priceNgn: 14000,
        inStock: true,
        sku: 'AKN-SUYA-500G',
        heatLevels: ['Classic Street Heat (Traditional)', 'Mild & Sweet Savoury', 'Extra Hot Suya Master']
      }
    ],
    featuredReviews: [
      {
        author: 'Tunde & Simi K.',
        location: 'Ikeja GRA, Lagos',
        rating: 5,
        quote: 'Best Yaji on the market. Doesn’t have that stale flour taste other commercial brands have. You can taste the freshly roasted peanuts and real ginger.'
      }
    ]
  },
  {
    id: 'native-soup-blend',
    slug: 'native-soup-blend',
    name: 'Heritage Native Soup Blend',
    tagline: 'Stone-milled ogbono pearls, wild egusi, smoked crayfish, and dehydrated bitterleaf',
    category: 'signature-concoctions',
    categoryName: 'Signature Concoctions',
    advertisedFirst: false,
    landingPageUrl: '/landing/native-soup-blend',
    badge: 'Ancestral Thickener & Broth',
    description: 'A harmonious blend of roasted wild bush mango seeds (ogbono), golden melon seeds (egusi), crayfish essence, and tender dehydrated bitterleaf dust.',
    longDescription: 'Designed for cooks who love authentic draw and rich seed texture without spending hours picking, peeling, and grinding seeds. Blended to provide immediate silkiness, umami depth, and the characteristic restorative slight bitterness treasured in Delta, Yoruba, and Igbo traditional soup traditions.',
    ingredients: [
      'Hand-selected sun-dried ogbono seeds',
      'Golden machine-peeled egusi melon seed flour',
      'Smoked crayfish and dry shrimp essence',
      'Washed and sun-dried micro bitterleaf flakes',
      'Wild yellow chili (Nsukka pepper)'
    ],
    culinaryUses: [
      'Fast-cooking Native Draw Soup and Seafood Okro',
      'Rich Egusi Soup base without clumping',
      'Ofe Owerri and Ofe Nsala thickening agent'
    ],
    originAndProcess: 'Freshly milled to prevent seed rancidity; packed with natural oxygen absorbers.',
    storageInstructions: 'Store in cool pantry or refrigerator crisper drawer after opening.',
    accentColor: '#4D7C0F', // deep botanical olive
    iconType: 'soup',
    variations: [
      {
        id: 'native-100g',
        name: '100g Apothecary Jar',
        sizeGrams: 100,
        priceNgn: 4800,
        inStock: true,
        sku: 'AKN-NAT-100G'
      },
      {
        id: 'native-250g',
        name: '250g Pouch',
        sizeGrams: 250,
        priceNgn: 10500,
        inStock: true,
        sku: 'AKN-NAT-250G'
      }
    ]
  },
  {
    id: 'flavoured-chicken',
    slug: 'flavoured-chicken',
    name: 'Flavoured Shredded & Chunked Chicken',
    tagline: 'Slow-dried tender chicken breast with lemon-ginger and fragrant scent leaf',
    category: 'flavoured-proteins',
    categoryName: 'Flavoured Proteins',
    advertisedFirst: false,
    landingPageUrl: '/landing/flavoured-chicken',
    badge: 'Lean Artisanal Protein',
    description: 'Lean farm-fresh chicken breast seasoned with sun-dried lemon peel, sharp ginger root, native scent leaf, and mild smoked chili.',
    longDescription: 'A light, savoury protein companion for salads, stir-fries, breakfast omelettes, or quick evening broths. Dehydrated at delicate temperatures to retain lean protein bio-availability while achieving an irresistible chewy tenderness.',
    ingredients: [
      '100% Lean farm-raised chicken breast',
      'Dehydrated wild scent leaf (Efirin)',
      'Crushed ginger root & roasted garlic',
      'Sun-dried lemon zest crystals',
      'Pure sea salt & cold-pressed coconut oil'
    ],
    culinaryUses: [
      'Toss directly into vegetable salads and noodles',
      'Simmer in light pepper soups or chicken sweetcorn broth',
      'Healthy gourmet gym snack'
    ],
    originAndProcess: 'Oven-cured in small batches; zero hormones or artificial curing salts.',
    storageInstructions: 'Store in cool, dry place. Reseal bag tightly.',
    accentColor: '#CA8A04', // warm turmeric gold
    iconType: 'protein',
    variations: [
      {
        id: 'chicken-shred-150g',
        name: '150g Shredded Golden Strands',
        sizeGrams: 150,
        priceNgn: 5800,
        inStock: true,
        sku: 'AKN-CHK-SHRED-150'
      },
      {
        id: 'chicken-chunk-150g',
        name: '150g Roasted Breast Chunks',
        sizeGrams: 150,
        priceNgn: 5800,
        inStock: true,
        sku: 'AKN-CHK-CHUNK-150'
      },
      {
        id: 'chicken-300g',
        name: '300g Family Pantry Pouch',
        sizeGrams: 300,
        priceNgn: 11000,
        inStock: true,
        sku: 'AKN-CHK-300G'
      }
    ]
  },
  {
    id: 'stock-broth-blend',
    slug: 'stock-broth-blend',
    name: 'Artisan Stock & Broth Blend',
    tagline: 'Concentrated clean umami base from slow-roasted bones, mushrooms, and herbs',
    category: 'pantry-essentials',
    categoryName: 'Pantry Essentials',
    advertisedFirst: false,
    landingPageUrl: '/landing/stock-broth-blend',
    badge: '100% Clean Bouillon Alternative',
    description: 'The natural alternative to industrial seasoning cubes. Pure concentrated vegetable and bone broth crystals with sea salt and garden aromatics.',
    longDescription: 'Say goodbye to artificial chemical flavour enhancers. Our Stock & Broth Blend is crafted by slowly simmering roasted pasture marrow bones, wild mushrooms, shallots, thyme, and celery, then dehydrating the resulting bone-reduction into a fine, shelf-stable golden powder that dissolves instantly in hot water.',
    ingredients: [
      'Concentrated roasted beef bone marrow essence',
      'Wild forest mushroom powder',
      'Roasted sweet shallots & garlic',
      'Sun-dried garden thyme and bay leaf',
      'Unrefined coastal sea salt'
    ],
    culinaryUses: [
      'Instant restorative hot drinking broth',
      'Flavour base for party Jollof rice and fried rice',
      'Sauces, gravies, and braised vegetables'
    ],
    originAndProcess: '48-hour slow reduction followed by low-heat lyophilisation.',
    storageInstructions: 'Keep jar sealed to prevent moisture absorption.',
    accentColor: '#854D0E', // warm broth amber
    iconType: 'broth',
    variations: [
      {
        id: 'broth-150g',
        name: '150g Apothecary Jar',
        sizeGrams: 150,
        priceNgn: 4500,
        inStock: true,
        sku: 'AKN-BROTH-150G'
      },
      {
        id: 'broth-300g',
        name: '300g Pantry Refill Pouch',
        sizeGrams: 300,
        priceNgn: 8500,
        inStock: true,
        sku: 'AKN-BROTH-300G'
      }
    ]
  },
  {
    id: 'ginger-botanical-tea',
    slug: 'ginger-botanical-tea',
    name: 'Wild Ginger & Botanical Tea',
    tagline: 'Sun-dried Kaduna ginger root, crimson Zobo hibiscus, and wild lemongrass',
    category: 'botanical-teas',
    categoryName: 'Botanical Teas',
    advertisedFirst: false,
    landingPageUrl: '/landing/ginger-botanical-tea',
    badge: 'Restorative Infusion',
    description: 'A vibrant ruby-crimson herbal infusion blending spicy sundried Kaduna ginger, whole organic hibiscus flowers (Zobo), and citrusy wild lemongrass.',
    longDescription: 'An invigorating, caffeine-free infusion designed for morning vitality and evening digestive comfort. Spicy, tart, and deeply refreshing whether steeped piping hot or brewed as a chilled iced botanical cooler with fresh citrus slices.',
    ingredients: [
      'Wild sun-dried Kaduna ginger slices',
      'Whole dried organic Zobo (Hibiscus sabdariffa) calyces',
      'Wild highland lemongrass',
      'Cinnamon bark quill shavings',
      'Dehydrated orange peel peelings'
    ],
    culinaryUses: [
      'Hot morning immune-boosting tea with raw honey',
      'Artisan chilled Zobo iced tea base for entertaining',
      'Post-meal digestive tonic'
    ],
    originAndProcess: 'Hand-picked from organic botanical farmers in Northern and Southwest Nigeria.',
    storageInstructions: 'Store in dry tea caddy away from moisture.',
    accentColor: '#BE123C', // vibrant hibiscus ruby
    iconType: 'tea',
    variations: [
      {
        id: 'tea-20pyramids',
        name: '20 Biodegradable Pyramid Tea Bags',
        sizeGrams: 60,
        priceNgn: 4200,
        inStock: true,
        sku: 'AKN-TEA-20P'
      },
      {
        id: 'tea-100g-loose',
        name: '100g Loose Leaf Apothecary Jar',
        sizeGrams: 100,
        priceNgn: 5000,
        inStock: true,
        sku: 'AKN-TEA-100G'
      },
      {
        id: 'tea-250g-pouch',
        name: '250g Bulk Botanical Pouch',
        sizeGrams: 250,
        priceNgn: 9500,
        inStock: true,
        sku: 'AKN-TEA-250G'
      }
    ]
  }
];
