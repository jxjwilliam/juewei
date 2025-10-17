export interface Product {
  id: number
  name: string
  nameEn: string
  image: string
  price: string
  weight: string
  description: string
  features: string[]
  category: string
  spicy: number
  popular: boolean
  // R2 Image properties
  r2Image?: {
    path: string
    url: string
    version?: string
    metadata?: Record<string, string>
  }
  // Carousel-specific properties
  title?: string
  subtitle?: string
  content?: string
  cta?: string
  ctaLink?: string
  ctaSecondary?: string
  ctaSecondaryLink?: string
  floatingImage?: string
  floatingImageAlt?: string
  badge?: string
  specifications?: {
    weight: string
    packaging: string
    shelfLife: string
    storage: string
  }
}

export const products: Product[] = [
  {
    id: 1,
    name: "麻辣虾球",
    nameEn: "Spicy Shrimp Balls",
    image: "/images/products/product-01-e1759979489647.webp",
    price: "$12.99",
    weight: "400g",
    description: "精选湖北潜江小龙虾尾，浓郁鲜香，Q弹劲爽！",
    features: ["液氮速冻", "解冻即食", "无防腐剂"],
    category: "海鲜类",
    spicy: 5,
    popular: true,
    // Carousel properties
    title: "麻辣虾球",
    subtitle: "Spicy Shrimp Balls",
    content: "浓郁鲜香，Q弹劲爽！液氮速冻技术，解冻即食，无防腐剂添加，让您享受最新鲜的美味。",
    cta: "立即订购",
    ctaLink: "/contact",
    ctaSecondary: "了解更多",
    ctaSecondaryLink: "/products",
    floatingImage: "/images/products/product-01-e1759979489647.webp",
    floatingImageAlt: "产品展示",
    badge: "热门推荐",
    specifications: {
      weight: "400g",
      packaging: "纸盒装",
      shelfLife: "6个月",
      storage: "≤ -18°C"
    }
  },
  {
    id: 2,
    name: "麻辣鱿鱼须",
    nameEn: "Spicy Squid Tentacles",
    image: "/images/products/product-02-e1759979514429.webp",
    price: "$15.99",
    weight: "350g",
    description: "精选优质鱿鱼须，富含胶原蛋白，鲜嫩多汁！",
    features: ["富含胶原蛋白", "鲜嫩多汁", "无防腐剂"],
    category: "海鲜类",
    spicy: 4,
    popular: true,
    // Carousel properties
    title: "麻辣鱿鱼须",
    subtitle: "Spicy Squid Tentacles",
    content: "精选优质鱿鱼须，富含胶原蛋白，鲜嫩多汁！",
    cta: "立即订购",
    ctaLink: "/contact",
    ctaSecondary: "了解更多",
    ctaSecondaryLink: "/products",
    floatingImage: "/images/products/product-02-e1759979514429.webp",
    floatingImageAlt: "麻辣鱿鱼须",
    badge: "CFIA认证",
    specifications: {
      weight: "350g",
      packaging: "纸盒装",
      shelfLife: "6个月",
      storage: "≤ -18°C"
    }
  },
  {
    id: 3,
    name: "麻辣鲍鱼",
    nameEn: "Spicy Abalone",
    image: "/images/products/product-03-e1759979541108.webp",
    price: "$28.99",
    weight: "300g",
    description: "肉质细嫩 X 鲜美多汁",
    features: ["肉质细嫩", "鲜美多汁", "无防腐剂"],
    category: "海鲜类",
    spicy: 3,
    popular: false,
    // Carousel properties
    title: "麻辣鲍鱼",
    subtitle: "Spicy Abalone",
    content: "肉质细嫩 X 鲜美多汁",
    cta: "查看菜单",
    ctaLink: "/products",
    ctaSecondary: "联系我们",
    ctaSecondaryLink: "/contact",
    floatingImage: "/images/products/product-03-e1759979541108.webp",
    floatingImageAlt: "产品展示",
    badge: "CFIA认证",
    specifications: {
      weight: "300g",
      packaging: "纸盒装",
      shelfLife: "6个月",
      storage: "≤ -18°C"
    }
  },
  {
    id: 4,
    name: "麻辣鱼豆腐",
    nameEn: "Spicy Fish Tofu",
    image: "/images/products/product-04-e1759979443542.webp",
    price: "$11.99",
    weight: "400g",
    description: "富含优质带鱼鱼糜，口感软嫩绵密，越吃越爱",
    features: ["优质带鱼鱼糜", "口感软嫩绵密", "无防腐剂"],
    category: "豆制品",
    spicy: 4,
    popular: false,
    specifications: {
      weight: "400g",
      packaging: "纸盒装",
      shelfLife: "6个月",
      storage: "≤ -18°C"
    }
  },
  {
    id: 5,
    name: "麻辣海蒂结",
    nameEn: "Spicy Seaweed Knots",
    image: "/images/products/product-05-e1759979420985.webp",
    price: "$9.99",
    weight: "300g",
    description: "原料甄选 X 高纤低卡",
    features: ["原料甄选", "高纤低卡", "无防腐剂"],
    category: "蔬菜类",
    spicy: 3,
    popular: false,
    specifications: {
      weight: "300g",
      packaging: "纸盒装",
      shelfLife: "6个月",
      storage: "≤ -18°C"
    }
  },
  {
    id: 6,
    name: "麻辣贡菜",
    nameEn: "Spicy Gong Cai",
    image: "/images/products/product-06-e1759979377379.webp",
    price: "$8.99",
    weight: "350g",
    description: "嚼劲十足 X 清脆可口",
    features: ["嚼劲十足", "清脆可口", "无防腐剂"],
    category: "蔬菜类",
    spicy: 3,
    popular: false,
    specifications: {
      weight: "350g",
      packaging: "纸盒装",
      shelfLife: "6个月",
      storage: "≤ -18°C"
    }
  },
  {
    id: 7,
    name: "麻辣毛豆",
    nameEn: "Spicy Edamame",
    image: "/images/products/product-07-e1759979563713.webp",
    price: "$8.99",
    weight: "350g",
    description: "甜鲜爽口，卤汁丰富，下酒绝配！",
    features: ["甜鲜爽口", "卤汁丰富", "下酒绝配"],
    category: "蔬菜类",
    spicy: 2,
    popular: false,
    specifications: {
      weight: "350g",
      packaging: "纸盒装",
      shelfLife: "6个月",
      storage: "≤ -18°C"
    }
  },
  {
    id: 8,
    name: "麻辣豆腐千张",
    nameEn: "Spicy Tofu Sheets",
    image: "/images/products/product-08-e1759979600714.webp",
    price: "$9.99",
    weight: "300g",
    description: "精选辽宁葫芦岛优质豆皮，豆香四溢，爽嫩入味！",
    features: ["优质豆皮", "豆香四溢", "爽嫩入味"],
    category: "豆制品",
    spicy: 3,
    popular: false,
    specifications: {
      weight: "300g",
      packaging: "纸盒装",
      shelfLife: "6个月",
      storage: "≤ -18°C"
    }
  },
  {
    id: 9,
    name: "麻辣腐竹",
    nameEn: "Spicy Tofu Skin",
    image: "/images/products/product-09-e1759979622649.webp",
    price: "$9.99",
    weight: "300g",
    description: "嫩滑细腻，卤汁饱满，回味无穷！",
    features: ["嫩滑细腻", "卤汁饱满", "回味无穷"],
    category: "豆制品",
    spicy: 3,
    popular: false,
    specifications: {
      weight: "300g",
      packaging: "纸盒装",
      shelfLife: "6个月",
      storage: "≤ -18°C"
    }
  },
  {
    id: 10,
    name: "麻辣豆脯",
    nameEn: "Spicy Tofu Puffs",
    image: "/images/products/product-10-e1759979640979.webp",
    price: "$10.99",
    weight: "350g",
    description: "先炸后卤的工艺，带来多层次的丰富口感！",
    features: ["先炸后卤", "多层次口感", "无防腐剂"],
    category: "豆制品",
    spicy: 3,
    popular: false,
    specifications: {
      weight: "350g",
      packaging: "纸盒装",
      shelfLife: "6个月",
      storage: "≤ -18°C"
    }
  },
  {
    id: 11,
    name: "甜辣豆干",
    nameEn: "Sweet Spicy Tofu",
    image: "/images/products/product-11-e1759979662994.webp",
    price: "$8.99",
    weight: "300g",
    description: "卤汁饱满 X 韧软相宜",
    features: ["卤汁饱满", "韧软相宜", "无防腐剂"],
    category: "豆制品",
    spicy: 2,
    popular: false,
    specifications: {
      weight: "300g",
      packaging: "纸盒装",
      shelfLife: "6个月",
      storage: "≤ -18°C"
    }
  },
  {
    id: 12,
    name: "甜辣香菇",
    nameEn: "Sweet Spicy Mushrooms",
    image: "/images/products/product-12-e1759979685665.webp",
    price: "$9.99",
    weight: "300g",
    description: "百搭佐餐 X 鲜嫩Q弹",
    features: ["百搭佐餐", "鲜嫩Q弹", "无防腐剂"],
    category: "蔬菜类",
    spicy: 2,
    popular: false,
    specifications: {
      weight: "300g",
      packaging: "纸盒装",
      shelfLife: "6个月",
      storage: "≤ -18°C"
    }
  }
]

// Helper functions
export const getProductsByCategory = (category: string) => {
  if (category === "all") return products
  return products.filter(product => product.category === category)
}

export const getCarouselSlides = () => {
  return products.filter(product => product.title && product.subtitle)
}

// R2 Image helper functions
export const getProductImageUrl = (product: Product): string => {
  // Use R2 image URL if available, fallback to local image
  return product.r2Image?.url || product.image
}

export const getProductImagePath = (product: Product): string => {
  // Use R2 image path if available, fallback to local image
  return product.r2Image?.path || product.image
}

export const updateProductImage = (product: Product, r2Image: {
  path: string
  url: string
  version?: string
  metadata?: Record<string, string>
}): Product => {
  return {
    ...product,
    r2Image: {
      path: r2Image.path,
      url: r2Image.url,
      version: r2Image.version,
      metadata: r2Image.metadata
    }
  }
}

export const addProductWithR2Image = (productData: Omit<Product, 'id' | 'r2Image'>, r2Image: {
  path: string
  url: string
  version?: string
  metadata?: Record<string, string>
}): Product => {
  const newId = Math.max(...products.map(p => p.id)) + 1
  return {
    ...productData,
    id: newId,
    r2Image: {
      path: r2Image.path,
      url: r2Image.url,
      version: r2Image.version,
      metadata: r2Image.metadata
    }
  }
}

export const getProductsWithR2Images = () => {
  return products.filter(product => product.r2Image)
}

export const getProductsWithoutR2Images = () => {
  return products.filter(product => !product.r2Image)
}
