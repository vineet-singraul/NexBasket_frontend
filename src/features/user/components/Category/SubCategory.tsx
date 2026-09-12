import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import styles from '../../../../styles/userStyle/Category.module.css'
import { type Category } from '../../types/category.types.ts'

interface SpotlightItem {
  id: string
  caption: string
  image?: string
  promoClassName?: string
  promoLines?: string[]
}

const SPOTLIGHT_ITEMS: SpotlightItem[] = [
  { id: 'autumn-winter', caption: 'New season', promoClassName: styles.promoAutumn, promoLines: ['Autumn', "Winter '26"] },
]

interface SubCategoryItem {
  id: string
  name: string
  image: string
}

const SUBCATEGORY_GROUPS: Record<'electronics' | 'fashion' | 'grocery' | 'default', SubCategoryItem[]> = {
  electronics: [
    { id: 'laptop', name: 'Laptop', image: 'https://picsum.photos/seed/nb-laptop/200' },
    { id: 'mobile', name: 'Mobile', image: 'https://picsum.photos/seed/nb-mobile/200' },
    { id: 'headphones', name: 'Headphones', image: 'https://picsum.photos/seed/nb-headphones/200' },
    { id: 'camera', name: 'Camera', image: 'https://picsum.photos/seed/nb-camera/200' },
    { id: 'smartwatch', name: 'Smart Watch', image: 'https://picsum.photos/seed/nb-smartwatch/200' },
    { id: 'television', name: 'Television', image: 'https://picsum.photos/seed/nb-television/200' },
  ],
  fashion: [
    { id: 'tshirt', name: 'T-Shirt', image: 'https://picsum.photos/seed/nb-tshirt/200' },
    { id: 'shirt', name: 'Shirt', image: 'https://picsum.photos/seed/nb-shirt/200' },
    { id: 'jeans', name: 'Jeans', image: 'https://picsum.photos/seed/nb-jeans/200' },
    { id: 'trousers', name: 'Trousers', image: 'https://picsum.photos/seed/nb-trousers/200' },
    { id: 'shoes', name: 'Shoes', image: 'https://picsum.photos/seed/nb-shoes/200' },
    { id: 'jacket', name: 'Jacket', image: 'https://picsum.photos/seed/nb-jacket/200' },
  ],
  grocery: [
    { id: 'fruits-vegetables', name: 'Fruits & Veggies', image: 'https://picsum.photos/seed/nb-fruits/200' },
    { id: 'dairy', name: 'Dairy', image: 'https://picsum.photos/seed/nb-dairy/200' },
    { id: 'snacks', name: 'Snacks', image: 'https://picsum.photos/seed/nb-snacks/200' },
    { id: 'beverages', name: 'Beverages', image: 'https://picsum.photos/seed/nb-beverages/200' },
    { id: 'staples', name: 'Staples', image: 'https://picsum.photos/seed/nb-staples/200' },
    { id: 'bakery', name: 'Bakery', image: 'https://picsum.photos/seed/nb-bakery/200' },
  ],
  default: [
    { id: 'trending', name: 'Trending', image: 'https://picsum.photos/seed/nb-trending/200' },
    { id: 'new-arrivals', name: 'New Arrivals', image: 'https://picsum.photos/seed/nb-new-arrivals/200' },
    { id: 'best-sellers', name: 'Best Sellers', image: 'https://picsum.photos/seed/nb-best-sellers/200' },
    { id: 'offers', name: 'Offers', image: 'https://picsum.photos/seed/nb-offers/200' },
  ],
}

const resolveSubCategoryGroup = (name?: string): keyof typeof SUBCATEGORY_GROUPS => {
  if (!name) return 'default'
  const lower = name.toLowerCase()
  if (lower.includes('electr')) return 'electronics'
  if (lower.includes('fashion') || lower.includes('man') || lower.includes('cloth') || lower.includes('wear')) return 'fashion'
  if (lower.includes('grocery')) return 'grocery'
  return 'default'
}

interface SubCategoryProps {
  categoryId: string
  category?: Category | null
}

const SubCategory = ({ category }: SubCategoryProps) => {
  const subCategoryItems = SUBCATEGORY_GROUPS[resolveSubCategoryGroup(category?.name)]

  return (
    <div className={styles.subCategoryContent}>
      <section className={styles.fashionBanner}>
        <div className={styles.bannerText}>
          <h2 className={styles.bannerTitle}>{category?.name ?? 'Fashion'}</h2>
          <button type="button" className={styles.bannerShopBtn} aria-label="Shop Fashion now">
            <ArrowForwardIcon fontSize="small" />
          </button>
        </div>
        <img
          src="https://picsum.photos/seed/nb-fashion-banner/220/200"
          alt="Fashion"
          className={styles.bannerImage}
        />
      </section>

      <section>
        <h3 className={styles.sectionTitle}>Shop by Category</h3>
        <div className={styles.mensGrid}>
          {subCategoryItems.map((item) => (
            <div key={item.id} className={styles.mensItem}>
              <div className={styles.mensImageWrap}>
                <img src={item.image} alt={item.name} className={styles.mensImage} />
              </div>
              <p className={styles.mensCaption}>{item.name}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className={styles.sectionTitle}>In the Spotlight</h3>
        <div className={styles.spotlightGrid}>
          {SPOTLIGHT_ITEMS.map((item) => (
            <div key={item.id} className={styles.spotlightItem}>
              <div className={styles.spotlightImageWrap}>
                {item.promoLines ? (
                  <div className={`${styles.spotlightPromo} ${item.promoClassName}`}>
                    {item.promoLines.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </div>
                ) : (
                  <img src={item.image} alt={item.caption} className={styles.spotlightPhoto} />
                )}
              </div>
              <p className={styles.spotlightCaption}>{item.caption}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default SubCategory
