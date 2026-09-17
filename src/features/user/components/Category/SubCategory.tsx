import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import styles from '../../../../styles/userStyle/Category.module.css'
import { type Category } from '../../types/category.types.ts'
import {
  CATEGORY_SECTION_TITLES,
  FASHION_BANNER_FALLBACK_NAME,
  FASHION_BANNER_IMAGES,
  resolveSubCategoryGroup,
  SPOTLIGHT_ITEMS,
  SUBCATEGORY_GROUPS,
} from '../../utils/context.ts'

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

interface SubCategoryProps {
  categoryId: string
  category?: Category | null
}

const SubCategory = ({ category }: SubCategoryProps) => {
  const navigate = useNavigate()
  const subCategoryItems = SUBCATEGORY_GROUPS[resolveSubCategoryGroup(category?.name)]

  return (
    <div className={styles.subCategoryContent}>
      <section className={styles.fashionBanner}>
        <div className={styles.bannerText}>
          <h2 className={styles.bannerTitle}>{category?.name ?? FASHION_BANNER_FALLBACK_NAME}</h2>
          <button type="button" className={styles.bannerShopBtn} aria-label="Shop Fashion now">
            <ArrowForwardIcon fontSize="small" />
          </button>
        </div>
        <div className={styles.bannerImages}>
          {FASHION_BANNER_IMAGES.map((src) => (
            <ShimmerImage
              key={src}
              src={src}
              alt="Fashion"
              wrapClassName={styles.bannerImageWrap}
              imgClassName={styles.bannerImage}
            />
          ))}
        </div>
      </section>

      <section>
        <h3 className={styles.sectionTitle}>{CATEGORY_SECTION_TITLES.shopByCategory}</h3>
        <div className={styles.mensGrid}>
          {subCategoryItems.map((item) => (
            <div
              key={item.id}
              className={styles.mensItem}
              onClick={() => navigate(`/Filters/${item.id}`)}
              role="button"
              tabIndex={0}
              style={{ cursor: 'pointer' }}
            >
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
        <h3 className={styles.sectionTitle}>{CATEGORY_SECTION_TITLES.spotlight}</h3>
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
