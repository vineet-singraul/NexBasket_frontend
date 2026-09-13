import { useState } from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import styles from '../../../../styles/userStyle/Category.module.css'
import { type Category } from '../../types/category.types.ts'

interface ShimmerImageProps {
  src: string
  alt: string
  wrapClassName: string
  imgClassName: string
}

const isVideoSrc = (src: string) => /\.(mp4|webm|ogg)$/i.test(src)

const ShimmerImage = ({ src, alt, wrapClassName, imgClassName }: ShimmerImageProps) => {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`${wrapClassName} ${loaded ? '' : styles.imageShimmer}`}>
      {!loaded && <img src="/loading-spinner.gif" alt="Loading" className={styles.loaderGif} />}
      {isVideoSrc(src) ? (
        <video
          src={src}
          className={`${imgClassName} ${loaded ? styles.imageLoaded : styles.imageLoading}`}
          onLoadedData={() => setLoaded(true)}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <img
          src={src}
          alt={alt}
          className={`${imgClassName} ${loaded ? styles.imageLoaded : styles.imageLoading}`}
          onLoad={() => setLoaded(true)}
        />
      )}
    </div>
  )
}

interface SpotlightItem {
  id: string
  caption: string
  image?: string
  promoClassName?: string
  promoLines?: string[]
}

const SPOTLIGHT_ITEMS: SpotlightItem[] = [
  {
    id: 'autumn-winter',
    caption: 'New season',
    image:
      'https://cdnl.iconscout.com/lottie/premium/preview-watermark/new-arrival-business-announcement-marketing-promotion-product-launch-retail-sale-company-animation-gif-download-14556782.mp4',
  },
  {
    id: 'festival-sale',
    caption: 'Festival Sale',
    image:
      'https://cdnl.iconscout.com/lottie/free/preview/free-flags-garland-animation-gif-download-3205511.mp4',
  },
  {
    id: 'next-gen',
    caption: 'Next Gen',
    image:
      'https://cdnl.iconscout.com/lottie/premium/preview-watermark/young-leader-building-community-animation-gif-download-12048802.mp4',
  },
  {
    id: 'trending-now',
    caption: 'Trending Now',
    image:
      'https://cdnl.iconscout.com/lottie/premium/preview-watermark/augmented-reality-apps-animation-gif-download-4003619.mp4',
  },
  {
    id: 'top-rated',
    caption: 'New Stock',
    image:
      'https://cdnl.iconscout.com/lottie/premium/preview-watermark/man-holding-a-price-tag-animation-gif-download-6342518.mp4',
  },
]

interface SubCategoryItem {
  id: string
  name: string
  image: string
}

const SUBCATEGORY_GROUPS: Record<
  'electronics' | 'fashion' | 'grocery' | 'default',
  SubCategoryItem[]
> = {
  electronics: [
    {
      id: 'laptop',
      name: 'Laptop',
      image: 'https://i.pinimg.com/originals/d7/3d/a1/d73da1de105b57de036e62fc45f2a9ae.gif',
    },
    {
      id: 'mobile',
      name: 'Mobile',
      image: 'https://i.pinimg.com/originals/03/c0/38/03c038d16263b1edbd846b4d2cc4ed28.gif',
    },
    {
      id: 'headphones',
      name: 'Headphones',
      image: 'https://i.pinimg.com/originals/da/20/31/da20312efe0a46878a078b5cab93d2f6.gif',
    },
    {
      id: 'camera',
      name: 'Camera',
      image:
        'https://cdn.dribbble.com/userupload/24472964/file/original-b8ee915db918496dcb28817fb3332c1b.gif',
    },
    {
      id: 'smartwatch',
      name: 'Smart Watch',
      image: 'https://media4.giphy.com/media/ggKFiQyFrhY1jWZ1Me/giphy.webp',
    },
    {
      id: 'television',
      name: 'Television',
      image:
        'https://cdn.dribbble.com/userupload/19883684/file/original-547a602d5a009135090318faf61a0b14.gif',
    },
  ],
  fashion: [
    {
      id: 'tshirt',
      name: 'T-Shirt',
      image: 'https://i.gifer.com/MMMU.gif',
    },
    {
      id: 'shirt',
      name: 'Shirt',
      image:
        'https://cdn.dribbble.com/userupload/19731079/file/original-8e0eb21315a4912e579f5194bd153726.gif',
    },
    {
      id: 'jeans',
      name: 'Jeans',
      image: 'https://media.baamboozle.com/uploads/images/197603/1618666272_374573.gif',
    },
    {
      id: 'trousers',
      name: 'Trousers',
      image:
        'https://cdn.dribbble.com/userupload/26905949/file/original-fe635e0655ab733f9553faeb1038fa2c.gif',
    },
    {
      id: 'shoes',
      name: 'Shoes',
      image:
        'https://upload.wikimedia.org/wikipedia/commons/0/0c/Bally_shoe_animation.gif?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=original',
    },
    {
      id: 'jacket',
      name: 'Jacket',
      image:
        'https://cdn.dribbble.com/userupload/23371916/file/original-d0ff4d2d4bd7803e173ffb1a499b5615.gif',
    },
  ],
  grocery: [
    {
      id: 'fruits-vegetables',
      name: 'Fruits & Veggies',
      image: 'https://media.tenor.com/IBjVQvRBSSYAAAAM/fruits-pineapple.gif',
    },
    {
      id: 'dairy',
      name: 'Dairy',
      image: 'https://i.pinimg.com/originals/5d/4e/2d/5d4e2d6cea13713cb13da4a5ce63e344.gif',
    },
    {
      id: 'snacks',
      name: 'Snacks',
      image: 'https://i.pinimg.com/originals/ed/ee/9a/edee9ab554faea05d92400633221cec0.gif',
    },
    {
      id: 'beverages',
      name: 'Beverages',
      image: 'https://i.pinimg.com/originals/18/ca/52/18ca529bc971f6cea2a1268ef43be085.gif',
    },
    {
      id: 'staples',
      name: 'Staples',
      image: 'https://cdn-icons-gif.flaticon.com/11545/11545401.gif',
    },
    {
      id: 'bakery',
      name: 'Bakery',
      image:
        'https://cdn.dribbble.com/userupload/23832730/file/original-0a3120c96a9860e7a7877a2fef86b3b7.gif',
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

const resolveSubCategoryGroup = (name?: string): keyof typeof SUBCATEGORY_GROUPS => {
  if (!name) return 'default'
  const lower = name.toLowerCase()
  if (lower.includes('electr')) return 'electronics'
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
        <div className={styles.bannerImages}>
          <ShimmerImage
            src="https://cdn.dribbble.com/userupload/23230279/file/original-33499aa75dfd0164294ac4bfc8b4ac59.gif"
            alt="Fashion"
            wrapClassName={styles.bannerImageWrap}
            imgClassName={styles.bannerImage}
          />

          <ShimmerImage
            src="https://cdn.dribbble.com/userupload/42497663/file/original-494bfdf51a06af4b69842f3d484fcc77.gif"
            alt="Fashion"
            wrapClassName={styles.bannerImageWrap}
            imgClassName={styles.bannerImage}
          />

          <ShimmerImage
            src="https://i.pinimg.com/originals/37/07/6c/37076cce35285997d32d4a4f71f9c4a0.gif"
            alt="Fashion"
            wrapClassName={styles.bannerImageWrap}
            imgClassName={styles.bannerImage}
          />
        </div>
      </section>

      <section>
        <h3 className={styles.sectionTitle}>Shop by Category</h3>
        <div className={styles.mensGrid}>
          {subCategoryItems.map((item) => (
            <div key={item.id} className={styles.mensItem}>
              <ShimmerImage
                src={item.image}
                alt={item.name}
                wrapClassName={styles.mensImageWrap}
                imgClassName={styles.mensImage}
              />
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
              {item.promoLines ? (
                <div className={styles.spotlightImageWrap}>
                  <div className={`${styles.spotlightPromo} ${item.promoClassName}`}>
                    {item.promoLines.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </div>
                </div>
              ) : (
                <ShimmerImage
                  src={item.image ?? ''}
                  alt={item.caption}
                  wrapClassName={styles.spotlightImageWrap}
                  imgClassName={styles.spotlightPhoto}
                />
              )}
              <p className={styles.spotlightCaption}>{item.caption}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default SubCategory
