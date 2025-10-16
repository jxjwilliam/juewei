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
    image: "/carousel2/hero-01.webp",
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
    floatingImage: "/carousel2/product6.webp",
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
    name: "麻辣鸭脖",
    nameEn: "Spicy Duck Neck",
    image: "/carousel2/product6.webp",
    price: "$15.99",
    weight: "500g",
    description: "传统工艺制作，麻辣鲜香，回味无穷",
    features: ["传统工艺", "麻辣鲜香", "无防腐剂"],
    category: "禽肉类",
    spicy: 4,
    popular: true,
    // Carousel properties
    title: "麻辣鸭脖",
    subtitle: "Spicy Duck Neck",
    content: "麻辣鲜香，回味无穷。采用传统工艺，每一口都是对美味的极致追求。",
    cta: "立即订购",
    ctaLink: "/contact",
    ctaSecondary: "了解更多",
    ctaSecondaryLink: "/products",
    floatingImage: "/carousel2/hero-01.webp",
    floatingImageAlt: "麻辣虾球",
    badge: "CFIA认证",
    specifications: {
      weight: "500g",
      packaging: "纸盒装",
      shelfLife: "6个月",
      storage: "≤ -18°C"
    }
  },
  {
    id: 3,
    name: "麻辣龙虾",
    nameEn: "Spicy Lobster",
    image: "/carousel2/spicy-lobster6.webp",
    price: "$28.99",
    weight: "300g",
    description: "精选优质龙虾，口感鲜嫩，营养丰富",
    features: ["优质龙虾", "营养丰富", "无防腐剂"],
    category: "海鲜类",
    spicy: 3,
    popular: false,
    // Carousel properties
    title: "麻辣龙虾",
    subtitle: "Spicy Lobster",
    content: "麻辣鲜香，回味无穷。采用传统工艺，每一口都是对美味的极致追求。",
    cta: "查看菜单",
    ctaLink: "/products",
    ctaSecondary: "联系我们",
    ctaSecondaryLink: "/contact",
    floatingImage: "/carousel2/branch2.webp",
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
    name: "麻辣鲍鱼",
    nameEn: "Spicy Abalone",
    image: "/carousel2/product6.webp",
    price: "$28.99",
    weight: "300g",
    description: "精选优质鲍鱼，口感鲜嫩，营养丰富",
    features: ["优质鲍鱼", "营养丰富", "无防腐剂"],
    category: "海鲜类",
    spicy: 3,
    popular: false
  },
  {
    id: 5,
    name: "麻辣毛豆",
    nameEn: "Spicy Edamame",
    image: "/carousel2/product6.webp",
    price: "$8.99",
    weight: "350g",
    description: "新鲜毛豆，清香爽口，健康美味",
    features: ["新鲜毛豆", "清香爽口", "无防腐剂"],
    category: "蔬菜类",
    spicy: 2,
    popular: false
  },
  {
    id: 6,
    name: "麻辣腐竹",
    nameEn: "Spicy Tofu Skin",
    image: "/carousel2/product6.webp",
    price: "$9.99",
    weight: "300g",
    description: "传统豆制品，口感丰富，营养均衡",
    features: ["传统工艺", "营养均衡", "无防腐剂"],
    category: "豆制品",
    spicy: 3,
    popular: false
  },
  {
    id: 7,
    name: "麻辣鱼豆腐",
    nameEn: "Spicy Fish Tofu",
    image: "/carousel2/product6.webp",
    price: "$11.99",
    weight: "400g",
    description: "精选鱼肉制作，口感嫩滑，味道鲜美",
    features: ["精选鱼肉", "口感嫩滑", "无防腐剂"],
    category: "豆制品",
    spicy: 4,
    popular: false
  },
  {
    id: 8,
    name: "绝味品牌",
    nameEn: "Juewei Brand",
    image: "/carousel2/branch2.webp",
    price: "多种规格",
    weight: "标准化包装",
    description: "全球16,000+门店",
    features: ["全球领先", "标准化包装", "无防腐剂"],
    category: "品牌",
    spicy: 0,
    popular: true,
    // Carousel properties
    title: "绝味品牌",
    subtitle: "Juewei Brand",
    content: "绝味食品拥有全球16,000+门店，遍布全国各地，是中国卤制品行业的领军品牌之一。",
    cta: "成为合作伙伴",
    ctaLink: "/partnership",
    ctaSecondary: "了解更多",
    ctaSecondaryLink: "/about",
    floatingImage: "/carousel2/no-preservatives.png",
    floatingImageAlt: "无防腐剂认证",
    badge: "全球领先",
    specifications: {
      weight: "多种规格",
      packaging: "标准化包装",
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
