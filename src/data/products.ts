import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    id: 'prod_concoction_blend',
    slug: 'concoction-blend',
    name: 'Signature Concoction Blend',
    tagline: 'River crayfish, sun-fermented iru crystals, and smoked bonga flakes stone-ground for ancestral one-pot magic.',
    category: 'signature-concoctions',
    categoryName: 'Signature Concoctions',
    advertisedFirst: true,
    badge: 'Flagship Umami',
    description: 'The definitive soul of Yoruba village cooking. Handcrafted from slow-fermented locust bean (iru woro) crystals, coastal river crayfish, kiln-smoked bonga fish, and sun-dried scent leaves.',
    longDescription: 'Created for homes that desire the nostalgic depth of traditional outdoor woodfire cooking without the laborious hours of sorting iru, cleaning crayfish sand, or grinding peppers. We source whole fermented locust beans from artisan cooperatives in Osun and Oyo, solar-dehydrate them gently, and cool stone-mill them with dried Cameroon pepper and aromatic botanicals.',
    originAndProcess: 'Sourced from Osun & Oyo smallholders. Solar-dehydrated below 42°C, granite stone-milled in small 15kg weekly batches.',
    ingredients: [
      'Fermented Locust Bean (Iru Woro) Crystals',
      'Wild Coastal River Crayfish (Sand-Free Cleaned)',
      'Kiln-Smoked Bonga Fish Flakes',
      'Sun-Dried Indigenous Scent Leaves (Efirin)',
      'Aromatic Cameroon Sweet Peppers',
      'Wild African Nutmeg (Ehuru Roasted)'
    ],
    culinaryUses: [
      'Native Concoction Rice (Iresi Asapo): Stir 2-3 tablespoons into hot palm oil base before adding washed rice and broth.',
      'Yam Pottage (Asaro): Infuse during the simmer phase to emulsify with yam starch into golden savory rich gravy.',
      'One-Pot Native Pasta / Spaghetti: Elevates modern noodles with rich ancestral depth.',
      'Vegetable Stew (Efo Riro / Ila Alasepo): Provides authentic umami without needing commercial bouillon cubes.'
    ],
    storageInstructions: 'Store in an airtight jar away from direct stove steam. Retains peak aroma for 18 months.',
    landingPageUrl: '/landing/concoction-blend',
    variations: [
      {
        id: 'var_concoction_100g_jar',
        sku: 'AKN-CONC-100J',
        name: '100g Amber Apothecary Glass Jar',
        sizeGrams: 100,
        priceNgn: 4500,
        inStock: true,
        cutOrGrindOptions: ['Fine Stone-Ground Silk', 'Coarse Rustic Mortar Crush'],
        heatLevels: ['Mild Warmth', 'Traditional Native Heat', 'Extra Fiery'],
        dietaryBadges: ['Zero Fillers', 'No Added MSG', 'Contains Shellfish (Crayfish)']
      },
      {
        id: 'var_concoction_250g_pouch',
        sku: 'AKN-CONC-250P',
        name: '250g Aromalock Craft Pouch',
        sizeGrams: 250,
        priceNgn: 9800,
        inStock: true,
        cutOrGrindOptions: ['Fine Stone-Ground Silk', 'Coarse Rustic Mortar Crush'],
        heatLevels: ['Mild Warmth', 'Traditional Native Heat', 'Extra Fiery'],
        dietaryBadges: ['Zero Fillers', 'Hermetic Seal', 'No Added Salt']
      },
      {
        id: 'var_concoction_500g_tub',
        sku: 'AKN-CONC-500T',
        name: '500g Family Pantry & Chef Tub',
        sizeGrams: 500,
        priceNgn: 18500,
        inStock: true,
        cutOrGrindOptions: ['Fine Stone-Ground Silk', 'Coarse Rustic Mortar Crush'],
        heatLevels: ['Mild Warmth', 'Traditional Native Heat', 'Extra Fiery'],
        dietaryBadges: ['Catering Value', 'Long Shelf Life']
      }
    ],
    featuredReviews: [
      {
        author: 'Mrs. Folashade Adeyemi',
        location: 'Lekki Phase 1, Lagos',
        quote: 'This concoction blend gave my native jollof the exact scent of my grandmother’s kitchen in Ibadan. Zero chemical aftertaste!',
        rating: 5
      },
      {
        author: 'Chef Olumide K.',
        location: 'London, UK (Diaspora Dispatch)',
        quote: 'The export vacuum packaging reached London in 4 days. When I unsealed the pouch, the whole kitchen smelled of freshly roasted iru and sweet fish.',
        rating: 5
      }
    ]
  },
  {
    id: 'prod_flavoured_beef',
    slug: 'flavoured-beef',
    name: 'Flavoured Shredded & Chunked Beef',
    tagline: 'Slow-dehydrated grass-fed prime beef cuts infused with roasted herbs, suya aromatics, and savory smoke.',
    category: 'flavoured-proteins',
    categoryName: 'Flavoured Proteins',
    advertisedFirst: true,
    badge: 'Artisanal Protein',
    description: 'Cured and slow-dried grass-fed prime Nigerian beef. Available as delicate savory shredded strands or tender chewy chunked stew bites.',
    longDescription: 'We take pasture-raised prime beef, trim every trace of gristle, marinade in roasted garlic, ginger, and cold-pressed cold-smoked peppers, then dehydrate gently for 36 hours. The crispy shreds add instant crunch and umami to salads, rice, and snacks, while the hearty chunks rehydrate beautifully in hot egusi, light soups, or tomato sauce within 3 minutes.',
    originAndProcess: '100% pasture-raised cattle from Oyo and Northern ranches. 36-hour slow solar dehydration, zero nitrates or artificial binders.',
    ingredients: [
      'Prime Grass-Fed Beef Silverside',
      'Sun-Dried Garlic & Ginger Roots',
      'Cold-Pressed Northern Spices (Yaji Botanicals)',
      'Smoked Sweet Chili Pods',
      'Wild Mineral Sea Salt',
      'Fresh Rosemary & Thyme Infusion'
    ],
    culinaryUses: [
      'Crisp Snack: Eat directly from the craft pouch as an ultra-clean, high-protein snack.',
      'Instant Soup Protein: Drop a handful into boiling pepper soup, okra, or egusi; rehydrates to juicy tenderness in 3 minutes.',
      'Jollof & Fried Rice Topping: Sprinkle crispy shreds on hot jollof rice for incredible texture contrast.',
      'Breakfast Eggs & Dodo: Toss into scrambled eggs or over fried plantains.'
    ],
    storageInstructions: 'Reseal airtight pouch after opening. Consume within 60 days of unsealing, or keep in pantry up to 12 months unopened.',
    landingPageUrl: '/landing/flavoured-beef',
    variations: [
      {
        id: 'var_beef_150g',
        sku: 'AKN-BEEF-150',
        name: '150g Snacking & Pantry Craft Pouch',
        sizeGrams: 150,
        priceNgn: 6500,
        inStock: true,
        cutOrGrindOptions: ['Shredded Strands (Crispy Pulled Flakes)', 'Chunked Bites (Hearty Stew Cubes)', 'Duo Combo (Half Shred / Half Chunks)'],
        heatLevels: ['Smoky Suya Infused', 'Roasted Garlic & Native Herb (Mild)'],
        dietaryBadges: ['100% Grass-Fed', 'High Protein (62%)', 'Zero Nitrates']
      },
      {
        id: 'var_beef_300g',
        sku: 'AKN-BEEF-300',
        name: '300g Family Reserve Bag',
        sizeGrams: 300,
        priceNgn: 12500,
        inStock: true,
        cutOrGrindOptions: ['Shredded Strands (Crispy Pulled Flakes)', 'Chunked Bites (Hearty Stew Cubes)', 'Duo Combo (Half Shred / Half Chunks)'],
        heatLevels: ['Smoky Suya Infused', 'Roasted Garlic & Native Herb (Mild)'],
        dietaryBadges: ['Family Pack', 'Keto Friendly', 'Gluten Free']
      },
      {
        id: 'var_beef_600g',
        sku: 'AKN-BEEF-600',
        name: '600g Feast Value Bag',
        sizeGrams: 600,
        priceNgn: 23500,
        inStock: true,
        cutOrGrindOptions: ['Shredded Strands (Crispy Pulled Flakes)', 'Chunked Bites (Hearty Stew Cubes)', 'Duo Combo (Half Shred / Half Chunks)'],
        heatLevels: ['Smoky Suya Infused', 'Roasted Garlic & Native Herb (Mild)'],
        dietaryBadges: ['Value Tier', 'Resealable Zip']
      },
      {
        id: 'var_beef_1kg',
        sku: 'AKN-BEEF-1KG',
        name: '1kg Feast, Catering & Diaspora Bulk Pack',
        sizeGrams: 1000,
        priceNgn: 38000,
        inStock: true,
        cutOrGrindOptions: ['Shredded Strands (Crispy Pulled Flakes)', 'Chunked Bites (Hearty Stew Cubes)', 'Duo Combo (Half Shred / Half Chunks)'],
        heatLevels: ['Smoky Suya Infused', 'Roasted Garlic & Native Herb (Mild)'],
        dietaryBadges: ['Catering & Export Grade', 'Hermetically Vacuum Sealed', 'Max Savings']
      }
    ],
    featuredReviews: [
      {
        author: 'Dr. Tunde Bamgbose',
        location: 'Victoria Island, Lagos',
        quote: 'The shredded beef is addictive. My kids snack on it straight from the pouch, and I throw chunks into quick weekday okra soups.',
        rating: 5
      }
    ]
  },
  {
    id: 'prod_pepper_soup_blend',
    slug: 'pepper-soup-blend',
    name: 'Ancestral Pepper Soup Blend',
    tagline: 'Whole roasted ehuru, cracked uda pods, and uziza peppercorns stone-ground for therapeutic warmth.',
    category: 'signature-concoctions',
    categoryName: 'Signature Concoctions',
    advertisedFirst: true,
    badge: 'Therapeutic Broth',
    description: 'Traditional restorative spice blend formulated with wild forest aromatics. Calibrated to deliver deep therapeutic warmth that clears the chest and soothes the spirit.',
    longDescription: 'Unlike commercial pepper soup powders that are overpowered with cheap table salt and harsh dried chili dust, our ancestral blend focuses on the medicinal terpenes of Ehuru (African nutmeg), Uda (Grains of Selim), and aromatic Uziza peppercorns. We toast whole pods over slow heat before stone-milling, creating a clear, aromatic, invigorating broth.',
    originAndProcess: 'Forest botanicals gathered from Ondo and Cross River rain forests. Whole pan-toasted, then stone-milled into a fine fragrant dust.',
    ingredients: [
      'Pan-Toasted Ehuru (Wild African Nutmeg)',
      'Cracked Uda (Grains of Selim) Pods',
      'Uziza Peppercorns (Piper Guineense)',
      'Dried Lemongrass Stalks',
      'Solar-Dried Ginger & Garlic',
      'Wild Alligator Pepper (Atare) Pearls'
    ],
    culinaryUses: [
      'Traditional Catfish & Goat Meat Pepper Soup: 1 heaped tablespoon per 1 liter of boiling broth.',
      'Healing Chicken & Herb Broth: Simmer with bone-in chicken for convalescence or rainy evenings.',
      'Oxtail & Assorted Meat Stews: Adds rich warming spice that cuts through fatty meats.',
      'Steamed Fish En Papillote: Rub over fresh fish before foil roasting.'
    ],
    storageInstructions: 'Keep in cool dry darkness. Essential volatile oils remain potent for 24 months.',
    landingPageUrl: '/landing/pepper-soup-blend',
    variations: [
      {
        id: 'var_peppersoup_100g_jar',
        sku: 'AKN-PS-100J',
        name: '100g Amber Glass Apothecary Jar',
        sizeGrams: 100,
        priceNgn: 4200,
        inStock: true,
        cutOrGrindOptions: ['Fine Silky Mill', 'Traditional Cracked Pods (Rustic)'],
        heatLevels: ['Restorative Warmth (Gentle)', 'Traditional Lagos Pepper Heat (Fiery)'],
        dietaryBadges: ['100% Herbal Botanicals', 'No Fillers', 'Salt-Free']
      },
      {
        id: 'var_peppersoup_250g_pouch',
        sku: 'AKN-PS-250P',
        name: '250g Aromalock Craft Pouch',
        sizeGrams: 250,
        priceNgn: 8900,
        inStock: true,
        cutOrGrindOptions: ['Fine Silky Mill', 'Traditional Cracked Pods (Rustic)'],
        heatLevels: ['Restorative Warmth (Gentle)', 'Traditional Lagos Pepper Heat (Fiery)'],
        dietaryBadges: ['Aromalock Seal', 'Holistic Wellness']
      },
      {
        id: 'var_peppersoup_500g_tub',
        sku: 'AKN-PS-500T',
        name: '500g Kitchen & Catering Tub',
        sizeGrams: 500,
        priceNgn: 16800,
        inStock: true,
        cutOrGrindOptions: ['Fine Silky Mill', 'Traditional Cracked Pods (Rustic)'],
        heatLevels: ['Restorative Warmth (Gentle)', 'Traditional Lagos Pepper Heat (Fiery)'],
        dietaryBadges: ['Chef Pantry Size']
      }
    ],
    featuredReviews: [
      {
        author: 'Amaka Eze',
        location: 'Abuja FCT',
        quote: 'The aroma of the toasted ehuru hits you the second you open the amber jar. The finest pepper soup blend I have ever used.',
        rating: 5
      }
    ]
  },
  {
    id: 'prod_suya_blend',
    slug: 'suya-blend',
    name: 'Artisan Suya Spice Blend (Yaji)',
    tagline: 'Triple-sifted roasted groundnut cake (kuli-kuli), sweet ginger, and clove embers for street-style barbecue perfection.',
    category: 'pantry-essentials',
    categoryName: 'Pantry Essentials',
    advertisedFirst: true,
    badge: 'Street Craft Yaji',
    description: 'Northern Nigeria barbecue master yaji formulation. Made from defatted double-roasted peanut cake (kuli-kuli), sharp ginger, whole cloves, and dried habanero chili.',
    longDescription: 'Authentic Suya spice requires real roasted groundnut press-cake (kuli-kuli) to create that signature savory crust on grilled meats. We double-roast our groundnut cakes, remove excess surface oil, and mill them with slow-dried hot chilies, ginger root, and clove spice.',
    originAndProcess: 'Sourced from artisanal pressers in Kano and Niger state. Triple-sifted for uniform fine cling.',
    ingredients: [
      'Double-Roasted Groundnut Cake (Kuli-Kuli Powder)',
      'Dried Red African Habanero Peppers',
      'Whole Sun-Dried Ginger Root',
      'Aromatic Zanzibar Cloves (Kanunfari)',
      'Wild African Nutmeg (Ehuru)',
      'Fine Sea Salt'
    ],
    culinaryUses: [
      'Beef, Chicken & Goat Suya Skewers: Generously coat raw skewered meat before and during charcoal grilling.',
      'Fried Plantains (Dodo) Seasoning: Dust over piping hot fried plantains for sweet and spicy contrast.',
      'Roasted Potatoes & Yams: Toss cut wedges in olive oil and Suya Yaji before oven baking.',
      'Popcorn & Roasted Corn Dust: Sprinkle over hot buttered snacks.'
    ],
    storageInstructions: 'Keep in dry cupboard. Stir occasionally if natural groundnut oils settle.',
    landingPageUrl: '/landing/suya-blend',
    variations: [
      {
        id: 'var_suya_120g_shaker',
        sku: 'AKN-SUYA-120S',
        name: '120g Tabletop Perforated Glass Shaker',
        sizeGrams: 120,
        priceNgn: 3800,
        inStock: true,
        cutOrGrindOptions: ['Fine Cling Powder (Barbecue Style)'],
        heatLevels: ['Classic Street Heat (Traditional)', 'Mild & Savoury', 'Extra Hot Suya Master'],
        dietaryBadges: ['Contains Peanuts (Groundnut)', 'Authentic Kuli-Kuli']
      },
      {
        id: 'var_suya_250g_pouch',
        sku: 'AKN-SUYA-250P',
        name: '250g Kitchen Refill Craft Pouch',
        sizeGrams: 250,
        priceNgn: 7500,
        inStock: true,
        cutOrGrindOptions: ['Fine Cling Powder (Barbecue Style)'],
        heatLevels: ['Classic Street Heat (Traditional)', 'Mild & Savoury', 'Extra Hot Suya Master'],
        dietaryBadges: ['Contains Peanuts', 'Zero Fillers']
      },
      {
        id: 'var_suya_500g_tub',
        sku: 'AKN-SUYA-500T',
        name: '500g Pitmaster Barbecue Tub',
        sizeGrams: 500,
        priceNgn: 14200,
        inStock: true,
        cutOrGrindOptions: ['Fine Cling Powder (Barbecue Style)'],
        heatLevels: ['Classic Street Heat (Traditional)', 'Mild & Savoury', 'Extra Hot Suya Master'],
        dietaryBadges: ['Pitmaster Bulk', 'Air-Tight Screw Lid']
      }
    ]
  },
  {
    id: 'prod_flavoured_chicken',
    slug: 'flavoured-chicken',
    name: 'Flavoured Shredded & Chunked Chicken',
    tagline: 'Slow-dehydrated free-range chicken breast cured with lemon herb, roasted garlic, and mild chili.',
    category: 'flavoured-proteins',
    categoryName: 'Flavoured Proteins',
    advertisedFirst: false,
    badge: 'Lean Protein',
    description: 'Tender solar-dehydrated free-range poultry seasoned with lemon zest, thyme, and roasted garlic.',
    longDescription: 'Pasture-fed local chicken breast pulled into succulent shreds and cubes, seasoned with natural culinary herbs. Perfect for high-protein snacking, fried rice, and quick vegetable sauces.',
    originAndProcess: 'Local free-range poultry from Southwest farms, slow-dehydrated at low heat to maintain tenderness.',
    ingredients: [
      'Free-Range Chicken Breast',
      'Wild Lemon Thyme',
      'Roasted Garlic & Sweet Onions',
      'Mild Cameroonian Red Pepper',
      'Sea Salt Pearls'
    ],
    culinaryUses: [
      'Stir-fries and pasta toppings',
      'Instant chicken broth and vegetable soups',
      'Clean fitness protein snack'
    ],
    storageInstructions: 'Store in cool dry cupboard. Reseal airtight.',
    landingPageUrl: '/landing/flavoured-chicken',
    variations: [
      {
        id: 'var_chicken_150g',
        sku: 'AKN-CHK-150',
        name: '150g Snacking Craft Pouch',
        sizeGrams: 150,
        priceNgn: 5800,
        inStock: true,
        cutOrGrindOptions: ['Shredded Strands', 'Tender Chunked Bites'],
        heatLevels: ['Mild Lemon Herb', 'Zesty Pepper Spiced'],
        dietaryBadges: ['Free-Range', 'High Protein (68%)']
      },
      {
        id: 'var_chicken_300g',
        sku: 'AKN-CHK-300',
        name: '300g Family Bag',
        sizeGrams: 300,
        priceNgn: 11000,
        inStock: true,
        cutOrGrindOptions: ['Shredded Strands', 'Tender Chunked Bites'],
        heatLevels: ['Mild Lemon Herb', 'Zesty Pepper Spiced'],
        dietaryBadges: ['Family Size']
      },
      {
        id: 'var_chicken_1kg',
        sku: 'AKN-CHK-1KG',
        name: '1kg Catering & Diaspora Bulk Pack',
        sizeGrams: 1000,
        priceNgn: 34000,
        inStock: true,
        cutOrGrindOptions: ['Shredded Strands', 'Tender Chunked Bites'],
        heatLevels: ['Mild Lemon Herb', 'Zesty Pepper Spiced'],
        dietaryBadges: ['Catering & Export Grade', 'Vacuum Sealed']
      }
    ]
  },
  {
    id: 'prod_native_soup_blend',
    slug: 'native-soup-blend',
    name: 'Native Soup & Egusi Seasoning Blend',
    tagline: 'Smoked catfish powders, dried ogbono, and bitterleaf aromatics for heritage pot soups.',
    category: 'signature-concoctions',
    categoryName: 'Signature Concoctions',
    advertisedFirst: false,
    badge: 'Soup Master',
    description: 'The foundation for classic Egusi, Ogbono, and Afang soups. Stone-ground smoked fish and wild herb leaves.',
    longDescription: 'Specially created for authentic thickness and mouthfeel in traditional soups. Blended with smoked river catfish, crayfish, wild seeds, and ground scent leaf.',
    originAndProcess: 'Smoked with acacia wood in Lagos coastal creeks, ground in cool granite mills.',
    ingredients: [
      'Wood-Smoked Catfish Meat',
      'River Crayfish Flour',
      'Wild African Nutmeg',
      'Sun-Dried Scent Leaf',
      'Sweet Dried Bell Pepper'
    ],
    culinaryUses: [
      'Egusi and Ogbono soups',
      'Vegetable and Afang soups'
    ],
    storageInstructions: 'Airtight dry storage away from steam.',
    landingPageUrl: '/landing/native-soup-blend',
    variations: [
      {
        id: 'var_native_200g',
        sku: 'AKN-NAT-200',
        name: '200g Craft Pouch',
        sizeGrams: 200,
        priceNgn: 6200,
        inStock: true,
        cutOrGrindOptions: ['Fine Silk Mill'],
        heatLevels: ['Traditional Heat'],
        dietaryBadges: ['Contains Seafood', 'Zero MSG']
      }
    ]
  },
  {
    id: 'prod_stock_broth_blend',
    slug: 'stock-broth-blend',
    name: 'All-Natural Stock & Broth Blend',
    tagline: 'Pure roasted marrow vegetables, ginger, sweet peppers, and sea salt. Zero synthetic bouillon cubes.',
    category: 'pantry-essentials',
    categoryName: 'Pantry Essentials',
    advertisedFirst: false,
    badge: 'Clean Base',
    description: 'Replace commercial chemical seasoning cubes with stone-ground dried carrots, celery, sweet peppers, and aromatics.',
    longDescription: 'Crafted for families seeking a 100% natural, cube-free seasoning alternative for everyday rice, gravies, eggs, and stews.',
    originAndProcess: 'Farm vegetables dehydrated at peak sweetness and pulverized with natural sea salt.',
    ingredients: [
      'Sun-Dried Sweet Onions & Garlic',
      'Dehydrated Sweet Orange Carrots',
      'Parsley & Thyme Herbs',
      'Mineral Sea Salt',
      'Roasted Coriander & White Pepper'
    ],
    culinaryUses: ['Daily everyday cooking in place of MSG seasoning cubes.'],
    storageInstructions: 'Keep dry and sealed.',
    landingPageUrl: '/landing/stock-broth-blend',
    variations: [
      {
        id: 'var_stock_250g',
        sku: 'AKN-STK-250',
        name: '250g Glass Jar',
        sizeGrams: 250,
        priceNgn: 5200,
        inStock: true,
        cutOrGrindOptions: ['Fine Granule Powder'],
        heatLevels: ['Gentle Savoury'],
        dietaryBadges: ['100% Vegan', 'Cube-Free', 'No MSG']
      }
    ]
  },
  {
    id: 'prod_ginger_botanical_tea',
    slug: 'ginger-botanical-tea',
    name: 'Ginger & Lemongrass Botanical Infusion',
    tagline: 'Solar-dried Kaduna ginger root, wild lemongrass, and Nigerian hibiscus calyces.',
    category: 'botanical-teas',
    categoryName: 'Botanical Teas',
    advertisedFirst: false,
    badge: 'Restorative Infusion',
    description: 'Invigorating loose-leaf botanical tea formulated with solar-dried ginger, lemongrass, and antioxidant-rich hibiscus.',
    longDescription: 'Spicy, zesty, and naturally caffeine-free. Brew hot with raw honey or chill over ice as a refreshing zobo-ginger tonic.',
    originAndProcess: 'Solar-cured organic ginger from Southern Kaduna, loose-cut for whole aromatic brewing.',
    ingredients: [
      'Cracked Sun-Dried Yellow Ginger',
      'Wild Lemongrass Stalks',
      'Nigerian Hibiscus (Zobo) Flowers',
      'Sweet Dried Orange Peel'
    ],
    culinaryUses: ['Hot herbal wellness tea or chilled iced botanical refresher.'],
    storageInstructions: 'Keep tightly sealed in tin or pouch.',
    landingPageUrl: '/landing/ginger-botanical-tea',
    variations: [
      {
        id: 'var_tea_150g',
        sku: 'AKN-TEA-150',
        name: '150g Botanical Loose-Leaf Apothecary Jar',
        sizeGrams: 150,
        priceNgn: 4500,
        inStock: true,
        dietaryBadges: ['Caffeine Free', 'Rich in Antioxidants']
      }
    ]
  }
];
