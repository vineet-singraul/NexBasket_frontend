import type { CarouselItem } from '../pages/UserCarousel.tsx'

export const DEFAULT_ERROR_MESSAGE = 'Something went wrong'

export const ALL_CATEGORY_ID = 'all'
export const ALL_CATEGORY_LABEL = 'All'
export const ALL_CATEGORY_IMAGE = 'https://picsum.photos/seed/nb-all/88'

export const CATEGORY_HEADER_TITLE = 'All Categories'
export const CATEGORY_CART_BADGE_COUNT = 10

export const CATEGORY_SECTION_TITLES = {
  shopByCategory: 'Shop by Category',
  spotlight: 'In the Spotlight',
}

export const FASHION_BANNER_FALLBACK_NAME = 'Fashion'

export const FASHION_BANNER_IMAGES = [
  'https://cdn.dribbble.com/userupload/23230279/file/original-33499aa75dfd0164294ac4bfc8b4ac59.gif',
  'https://cdn.dribbble.com/userupload/42497663/file/original-494bfdf51a06af4b69842f3d484fcc77.gif',
  'https://i.pinimg.com/originals/37/07/6c/37076cce35285997d32d4a4f71f9c4a0.gif',
]

export const emojiTile = (emoji: string, bg: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" rx="24" fill="${bg}"/><text x="50%" y="54%" font-size="100" text-anchor="middle" dominant-baseline="middle">${emoji}</text></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

export const pantsTile = (color: string, bg: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" rx="24" fill="${bg}"/><rect x="72" y="46" width="56" height="14" rx="5" fill="${color}"/><rect x="72" y="58" width="24" height="98" rx="8" fill="${color}"/><rect x="104" y="58" width="24" height="98" rx="8" fill="${color}"/><path d="M96,58 L104,58 L100,78 Z" fill="${bg}"/></svg>`
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

export interface SpotlightItem {
  id: string
  caption: string
  image?: string
  promoClassName?: string
  promoLines?: string[]
}

export const SPOTLIGHT_ITEMS: SpotlightItem[] = [
  {
    id: 'autumn-winter',
    caption: 'New season',
    image: emojiTile('🍁', '#FBEEE4'),
  },
  {
    id: 'festival-sale',
    caption: 'Festival Sale',
    image: emojiTile('🎉', '#FDE2E4'),
  },
  {
    id: 'next-gen',
    caption: 'Next Gen',
    image: emojiTile('🚀', '#E4F0FB'),
  },
  {
    id: 'trending-now',
    caption: 'Trending Now',
    image: emojiTile('🔥', '#FBE4E4'),
  },
  {
    id: 'top-rated',
    caption: 'New Stock',
    image: emojiTile('📦', '#E4FBF6'),
  },
  {
    id: 'flash-deal',
    caption: 'Flash Deal',
    image: emojiTile('⚡', '#FBF6E4'),
  },
]

export interface SubCategoryItem {
  id: string
  name: string
  image: string
}

export const SUBCATEGORY_GROUPS: Record<
  'electronics' | 'fashion' | 'women' | 'grocery' | 'default',
  SubCategoryItem[]
> = {
  electronics: [
    {
      id: 'laptop',
      name: 'Laptop',
      image: emojiTile('💻', '#E4F0FB'),
    },
    {
      id: 'mobile',
      name: 'Mobile',
      image: emojiTile('📱', '#E4E8FB'),
    },
    {
      id: 'headphones',
      name: 'Headphones',
      image: emojiTile('🎧', '#E4FBF6'),
    },
    {
      id: 'camera',
      name: 'Camera',
      image: emojiTile('📷', '#F0FBE4'),
    },
    {
      id: 'smartwatch',
      name: 'Smart Watch',
      image: emojiTile('⌚', '#FBE9E4'),
    },
    {
      id: 'television',
      name: 'Television',
      image: emojiTile('📺', '#E4E4FB'),
    },
  ],
  fashion: [
    {
      id: 'tshirt-men',
      name: 'T-Shirt for Man',
      image: emojiTile('👕', '#E4F0FB'),
    },
    {
      id: 'shirt',
      name: 'Shirt for Man',
      image: emojiTile('👔', '#E4E8FB'),
    },
    {
      id: 'jeans-men',
      name: 'Jeans for Man',
      image: emojiTile('👖', '#E4FBF6'),
    },
    {
      id: 'trousers',
      name: 'Trousers for Man',
      image: pantsTile('#4B5563', '#F0FBE4'),
    },
    {
      id: 'shoes-men',
      name: 'Shoes for Man',
      image: emojiTile('👞', '#FBE9E4'),
    },
    {
      id: 'jacket',
      name: 'Jacket for Man',
      image: emojiTile('🧥', '#E4E4FB'),
    },
  ],
  women: [
    {
      id: 'kurti',
      name: 'Kurti for Woman',
      image: emojiTile('👘', '#FBE4E4'),
    },
    {
      id: 'saree',
      name: 'Saree for Woman',
      image: emojiTile('🥻', '#E4F0FB'),
    },
    {
      id: 'dress',
      name: 'Dress for Woman',
      image: emojiTile('👗', '#FBEEE4'),
    },
    {
      id: 'top',
      name: 'Top for Woman',
      image: emojiTile('👚', '#E4FBEA'),
    },
    {
      id: 'heels-women',
      name: 'Heels for Woman',
      image: emojiTile('👠', '#F4E4FB'),
    },
    {
      id: 'sandals-women',
      name: 'Sandals for Woman',
      image: emojiTile('👡', '#FBEEDB'),
    },
    {
      id: 'handbag',
      name: 'Handbag for Woman',
      image: emojiTile('👜', '#FBF6E4'),
    },
    {
      id: 'jeans-women',
      name: 'Jeans for Woman',
      image: emojiTile('👖', '#E4E8FB'),
    },
    {
      id: 'tshirt-women',
      name: 'T-Shirt for Woman',
      image: emojiTile('👕', '#FBE9E4'),
    },
    {
      id: 'gown',
      name: 'Gown for Woman',
      image: emojiTile('👰', '#E4FBF6'),
    },
    {
      id: 'jumpsuit',
      name: 'Jumpsuit for Woman',
      image: emojiTile('🩱', '#F0E4FB'),
    },
    {
      id: 'co-ord-set',
      name: 'Co-ord Set for Woman',
      image: emojiTile('🎽', '#FBE4F0'),
    },
    {
      id: 'cardigan',
      name: 'Cardigan for Woman',
      image: emojiTile('🥼', '#F6FBE4'),
    },
  ],
  grocery: [
    {
      id: 'fruits-vegetables',
      name: 'Fruits & Veggies',
      image: emojiTile('🥦', '#E4FBEA'),
    },
    {
      id: 'dairy',
      name: 'Dairy',
      image: emojiTile('🥛', '#E4F0FB'),
    },
    {
      id: 'snacks',
      name: 'Snacks',
      image: emojiTile('🍿', '#FBEEE4'),
    },
    {
      id: 'beverages',
      name: 'Beverages',
      image: emojiTile('🥤', '#F4E4FB'),
    },
    {
      id: 'staples',
      name: 'Staples',
      image: emojiTile('🌾', '#FBF6E4'),
    },
    {
      id: 'bakery',
      name: 'Bakery',
      image: emojiTile('🍞', '#FBE4E4'),
    },
  ],
  default: [
    {
      id: 'trending',
      name: 'Trending',
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200&h=200&fit=crop',
    },
    {
      id: 'new-arrivals',
      name: 'New Arrivals',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=200&h=200&fit=crop',
    },
    {
      id: 'best-sellers',
      name: 'Best Sellers',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop',
    },
    {
      id: 'offers',
      name: 'Offers',
      image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=200&h=200&fit=crop',
    },
  ],
}

export const resolveSubCategoryGroup = (name?: string): keyof typeof SUBCATEGORY_GROUPS => {
  if (!name) return 'default'
  const lower = name.toLowerCase()
  if (lower.includes('electr')) return 'electronics'
  if (
    lower.includes('women') ||
    lower.includes('woman') ||
    lower.includes('ladies') ||
    lower.includes('girl')
  )
    return 'women'
  if (
    lower.includes('fashion') ||
    lower.includes('man') ||
    lower.includes('cloth') ||
    lower.includes('wear')
  )
    return 'fashion'
  if (lower.includes('grocery')) return 'grocery'
  return 'default'
}

export const CHANGE_PASSWORD_TEXT = {
  title: 'Change Password',
  oldPasswordLabel: 'Current Password',
  newPasswordLabel: 'New Password',
  confirmPasswordLabel: 'Confirm Password',
  cancelBtn: 'Cancel',
  submitBtn: 'Update Password',
  successMessage: 'Password changed successfully',
  mismatchError: 'New password and confirm password do not match',
}

export const CHANGE_PASSWORD_REDIRECT_DELAY_MS = 2000

export const DEAL_BANNER_TEXT = {
  titleFull: 'Deal of the Day — Handpicked for you',
  titleShort: 'Deal of the Day',
  subtitleFull: "Hurry before it's gone",
  subtitleShort: 'Hurry, limited stock',
}

export const DEAL_COUNTDOWN = ['04', '12', '36']
export const TRENDING_NOW_TITLE = 'Trending now'
export const FILTER_BUTTON_LABEL = 'Filter'
export const BESTSELLER_BADGE_LABEL = 'Bestseller'
export const LOW_STOCK_THRESHOLD = 5

export const PROMO_CARD_TITLES = {
  fashionForYou: "Customers' Most-Loved Fashion for you",
  innerwear: 'Minimum 60% off | Innerwear for all',
  homeImprovements: 'Up to 80% off on Home improvements ',
  lowestPrices: 'Lowest prices on NexBasket ',
}

export const SMART_UPGRADES_TITLE = 'Smart upgrades'
export const SMART_UPGRADES_VISIBLE_COUNT = 7

export const STILL_LOOKING_TITLE = 'Still looking for these?'
export const VIEW_STORE_LABEL = 'View Store'
export const TOP_VALUES_VISIBLE_COUNT = 5

export const NEW_CUSTOMER_LABEL = 'New Customer?'
export const SIGN_OUT_SUCCESS_MESSAGE = 'Signed out successfully'
export const PROFILE_REDIRECT_DELAY_MS = 2000

export const PROFILE_MENU_LABELS = {
  myProfile: 'My Profile',
  plusZone: 'Flipkart Plus Zone',
  orders: 'Orders',
  wishlist: 'Wishlist',
  becomeSeller: 'Become a Seller',
  rewards: 'Rewards',
  giftCards: 'Gift Cards',
  notificationPrefs: 'Notification Preferences',
  customerCare: '24x7 Customer Care',
  changePassword: 'Chnage Password',
  signOut: 'Sing out',
}

export const HOME_CAROUSEL_START_INDEX = 2
export const CAROUSEL_VISIBLE_RANGE = 2

export const HOME_CAROUSEL_ITEMS: CarouselItem[] = [
  {
    id: 1,
    title: 'Eternals',
    description:
      'In 5000 BC, ten superpowered Eternals — Sersi, Ikaris, Kingo, Sprite, Phastos, Makkari, Druig, Ajak, Gilgamesh and Thena — came to Earth.',
    image:
      'https://images.unsplash.com/photo-1570857502809-08184874388e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fFNob3B8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 2,
    title: 'Guardians Of The Galaxy Vol. 2',
    description:
      'A group of intergalactic criminals must pit against a ruthless warrior with plans to purge the universe.',
    image:
      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fFNob3B8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 3,
    title: 'Justice League',
    description:
      "Determined to ensure Superman's ultimate sacrifice was not in vain, Bruce Wayne aligns forces with Diana Prince with plans to recruit a team of metahumans to protect the world.",
    image:
      'https://images.unsplash.com/photo-1674027392887-751d6396b710?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZWNvbW1lcmNlfGVufDB8fDB8fHww',
  },
  {
    id: 4,
    title: 'Spider-Man: Far From Home',
    description:
      'Following the events of Avengers: Endgame (2019), Spider-Man must step up to take on new threats in a world that has changed forever.',
    image:
      'https://plus.unsplash.com/premium_photo-1684785618727-378a3a5e91c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZWNvbW1lcmNlfGVufDB8fDB8fHww',
  },
  {
    id: 5,
    title: 'Aquaman',
    description:
      'Arthur Curry learns that he is the heir to the underwater kingdom of Atlantis, and must step forward to lead his people.',
    image:
      'https://plus.unsplash.com/premium_photo-1681488262364-8aeb1b6aac56?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWNvbW1lcmNlfGVufDB8fDB8fHww',
  },
]

export const PRODUCT_SECTION_BG = '#e5e5e5'
export const PRODUCT_SECTION_PADDING = 5
