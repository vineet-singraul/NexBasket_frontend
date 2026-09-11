import { Box, Typography, IconButton, Button } from '@mui/material'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import StarIcon from '@mui/icons-material/Star'
import FilterListIcon from '@mui/icons-material/FilterList'
import styles from '../../../../styles/userStyle/homePage.module.css'
import type { Product } from '../../types/common.types.ts'
import { getProductImage, formatINR } from '../../utils/productDisplay.ts'

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
              Deal of the Day — Handpicked for you
            </Typography>
            <Typography
              variant="inherit"
              className={`${styles.dealTitle} ${styles.dealTitleShort}`}
            >
              Deal of the Day
            </Typography>

            <Typography
              variant="inherit"
              className={`${styles.dealSubtitle} ${styles.dealSubtitleFull}`}
            >
              Hurry before it&apos;s gone
            </Typography>
            <Typography
              variant="inherit"
              className={`${styles.dealSubtitle} ${styles.dealSubtitleShort}`}
            >
              Hurry, limited stock
            </Typography>
          </Box>
        </Box>

        <Box className={styles.dealCountdown}>
          <Typography variant="inherit" component="span" className={styles.dealCountdownBox}>
            04
          </Typography>
          <Typography variant="inherit" component="span" className={styles.dealCountdownBox}>
            12
          </Typography>
          <Typography variant="inherit" component="span" className={styles.dealCountdownBox}>
            36
          </Typography>
        </Box>
      </Box>

      {/* Trending now + Filter — mobile only */}
      <Box className={styles.trendingRow}>
        <Typography component="h3" variant="inherit" className={styles.trendingTitle}>
          Trending now
        </Typography>
        <Button size="small" className={styles.filterBtn}>
          <FilterListIcon fontSize="small" />
          Filter
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
                    <StarIcon sx={{ fontSize: 11 }} /> Bestseller
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

                {availableQuantity > 0 && availableQuantity <= 5 && (
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
