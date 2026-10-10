import { Box, IconButton, Button } from '@mui/material'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import StarIcon from '@mui/icons-material/Star'
import FilterListIcon from '@mui/icons-material/FilterList'
import styles from '../../../../styles/userStyle/homePage.module.css'
import type { Product } from '../../types/common.types.ts'
import { getProductImage, formatINR } from '../../utils/productDisplay.ts'
import {
  BESTSELLER_BADGE_LABEL,
  DEAL_BANNER_TEXT,
  DEAL_COUNTDOWN,
  FILTER_BUTTON_LABEL,
  LOW_STOCK_THRESHOLD,
  TRENDING_NOW_TITLE,
} from '../../utils/context.ts'
import { useNavigate } from 'react-router-dom'

interface AllCardsProps {
  products: Product[]
}

const AllCards = ({ products }: AllCardsProps) => {
  const navigate = useNavigate()

  const handleShowSingleProduct = (id: string) => {
    navigate(`/Productdetails/${id}`)
  }

  return (
    <Box component="section" className={styles.allCardsSection}>
      {/* Deal of the Day banner */}
      <Box className={styles.dealBanner}>
        <Box className={styles.dealBannerLeft}>
          <Box className={styles.dealFireIconBox}>
            <LocalFireDepartmentIcon fontSize="small" />
          </Box>
          <Box component="span" className={styles.dealFireEmoji}>
            🔥
          </Box>

          <Box className={styles.dealTextGroup}>
            <Box className={`${styles.dealTitle} ${styles.dealTitleFull}`}>
              {DEAL_BANNER_TEXT.titleFull}
            </Box>
            <Box className={`${styles.dealTitle} ${styles.dealTitleShort}`}>
              {DEAL_BANNER_TEXT.titleShort}
            </Box>

            <Box className={`${styles.dealSubtitle} ${styles.dealSubtitleFull}`}>
              {DEAL_BANNER_TEXT.subtitleFull}
            </Box>
            <Box className={`${styles.dealSubtitle} ${styles.dealSubtitleShort}`}>
              {DEAL_BANNER_TEXT.subtitleShort}
            </Box>
          </Box>
        </Box>

        <Box className={styles.dealCountdown}>
          {DEAL_COUNTDOWN.map((unit) => (
            <Box key={unit} component="span" className={styles.dealCountdownBox}>
              {unit}
            </Box>
          ))}
        </Box>
      </Box>

      {/* Trending now + Filter — mobile only */}
      <Box className={styles.trendingRow}>
        <Box component="h3" className={styles.trendingTitle}>
          {TRENDING_NOW_TITLE}
        </Box>
        <Button size="small" className={styles.filterBtn}>
          <FilterListIcon fontSize="small" />
          {FILTER_BUTTON_LABEL}
        </Button>
      </Box>

      {/* Product cards */}
      <Box className={styles.dealCardsGrid}>
        {products.map((product) => {
          const discountPercent = product.pricing?.discountPercent ?? 0
          const availableQuantity = product.availableQuantity ?? 0

          return (
            <Box className={styles.dealCard} key={product._id}>
              <Box className={styles.dealImageArea}>
                {product.isFeatured && (
                  <Box component="span" className={styles.dealBestsellerBadge}>
                    <StarIcon sx={{ fontSize: 11 }} /> {BESTSELLER_BADGE_LABEL}
                  </Box>
                )}
                {discountPercent > 0 && (
                  <Box component="span" className={styles.dealDiscountBadge}>
                    -{discountPercent}%
                  </Box>
                )}
                <Box
                  onClick={() => {
                    handleShowSingleProduct(product._id)
                  }}
                  component="img"
                  src={getProductImage(product)}
                  alt={product.title}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <IconButton size="small" className={styles.dealWishlistBtn}>
                  <FavoriteBorderIcon />
                </IconButton>
              </Box>

              <Box className={styles.dealInfo}>
                <Box className={styles.dealNameRow}>
                  <Box className={styles.dealName}>{product.title}</Box>
                </Box>

                <Box className={styles.dealPriceRow}>
                  <Box className={styles.dealPrice}>{formatINR(product.pricing?.sellingPrice)}</Box>
                  {product.pricing?.mrp > product.pricing?.sellingPrice && (
                    <Box className={styles.dealMrp}>{formatINR(product.pricing.mrp)}</Box>
                  )}
                  {discountPercent > 0 && (
                    <Box className={styles.dealOffPct}>{discountPercent}% off</Box>
                  )}
                </Box>

                {availableQuantity > 0 && availableQuantity <= LOW_STOCK_THRESHOLD && (
                  <Box className={styles.dealStock}>Only {availableQuantity} left</Box>
                )}
              </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default AllCards
