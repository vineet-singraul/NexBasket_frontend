import { Box, Typography, IconButton, Button } from '@mui/material'
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

interface AllCardsProps {
  products: Product[]
}

const AllCards = ({ products }: AllCardsProps) => {
  return (
    <Box component="section" className={styles.allCardsSection}>
      {/* Deal of the Day banner */}
      <Box className={styles.dealBanner}>
        <Box className={styles.dealBannerLeft}>
          <Box className={styles.dealFireIconBox}>
            <LocalFireDepartmentIcon fontSize="small" />
          </Box>
          <Typography component="span" variant="inherit" className={styles.dealFireEmoji}>
            🔥
          </Typography>

          <Box className={styles.dealTextGroup}>
            <Typography
              variant="inherit"
              className={`${styles.dealTitle} ${styles.dealTitleFull}`}
            >
              {DEAL_BANNER_TEXT.titleFull}
            </Typography>
            <Typography
              variant="inherit"
              className={`${styles.dealTitle} ${styles.dealTitleShort}`}
            >
              {DEAL_BANNER_TEXT.titleShort}
            </Typography>

            <Typography
              variant="inherit"
              className={`${styles.dealSubtitle} ${styles.dealSubtitleFull}`}
            >
              {DEAL_BANNER_TEXT.subtitleFull}
            </Typography>
            <Typography
              variant="inherit"
              className={`${styles.dealSubtitle} ${styles.dealSubtitleShort}`}
            >
              {DEAL_BANNER_TEXT.subtitleShort}
            </Typography>
          </Box>
        </Box>

        <Box className={styles.dealCountdown}>
          {DEAL_COUNTDOWN.map((unit) => (
            <Typography
              key={unit}
              variant="inherit"
              component="span"
              className={styles.dealCountdownBox}
            >
              {unit}
            </Typography>
          ))}
        </Box>
      </Box>

      {/* Trending now + Filter — mobile only */}
      <Box className={styles.trendingRow}>
        <Typography component="h3" variant="inherit" className={styles.trendingTitle}>
          {TRENDING_NOW_TITLE}
        </Typography>
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
                  <Typography component="span" variant="inherit" className={styles.dealBestsellerBadge}>
                    <StarIcon sx={{ fontSize: 11 }} /> {BESTSELLER_BADGE_LABEL}
                  </Typography>
                )}
                {discountPercent > 0 && (
                  <Typography component="span" variant="inherit" className={styles.dealDiscountBadge}>
                    -{discountPercent}%
                  </Typography>
                )}
                <Box
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
                  <Typography variant="inherit" className={styles.dealName}>
                    {product.title}
                  </Typography>
                </Box>

                <Box className={styles.dealPriceRow}>
                  <Typography variant="inherit" className={styles.dealPrice}>
                    {formatINR(product.pricing?.sellingPrice)}
                  </Typography>
                  {product.pricing?.mrp > product.pricing?.sellingPrice && (
                    <Typography variant="inherit" className={styles.dealMrp}>
                      {formatINR(product.pricing.mrp)}
                    </Typography>
                  )}
                  {discountPercent > 0 && (
                    <Typography variant="inherit" className={styles.dealOffPct}>
                      {discountPercent}% off
                    </Typography>
                  )}
                </Box>

                {availableQuantity > 0 && availableQuantity <= LOW_STOCK_THRESHOLD && (
                  <Typography variant="inherit" className={styles.dealStock}>
                    Only {availableQuantity} left
                  </Typography>
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
