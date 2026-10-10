import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import StarIcon from '@mui/icons-material/Star'
import { apiGet } from '../../../api/userApi'
import { USER_CATEGORY_PAGE } from '../../../api/endpoints'
import styles from '../../../styles/userStyle/ShowCategory.module.css'
import MobileBottomNav from './MobileBottomNav'
import Loader from '../../../utils/Loader'
import Notification from '../../../utils/Notification'
import type { NotificationInterfacce } from '../../../auth/types/auth.types.ts'
import type { Product } from '../types/common.types.ts'
import { getProductImage, formatINR, getDeliveryCharge } from '../utils/productDisplay.ts'
import {
  BESTSELLER_BADGE_LABEL,
  CATEGORY_PRODUCTS_TEXT,
  DEFAULT_ERROR_MESSAGE,
  LOW_STOCK_THRESHOLD,
  PRODUCT_DETAILS_TEXT,
} from '../utils/context.ts'

const ShowCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>()
  const navigate = useNavigate()

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [notification, setNotification] = useState<NotificationInterfacce | null>(null)

  useEffect(() => {
    const fetchProductByCategoryId = async (categoryId: string) => {
      try {
        setLoading(true)
        const response = await apiGet<{ data: Product[] }>(
          USER_CATEGORY_PAGE.GET_PRODUCT_BY_CATEGORY_ID(categoryId),
        )
        // Products without any image are not shown
        setProducts((response.data ?? []).filter((product) => product.images?.length > 0))
      } catch (error) {
        setProducts([])
        setNotification({
          open: true,
          message: error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE,
          severity: 'error',
        })
      } finally {
        setLoading(false)
      }
    }

    if (categoryId) {
      fetchProductByCategoryId(categoryId)
    }
  }, [categoryId])

  const handleShowSingleProduct = (id: string) => {
    navigate(`/Productdetails/${id}`)
  }

  return (
    <div className={styles.root}>
      <Box component="main" className={styles.page}>
        <Box className={styles.container}>
          <Box className={styles.headingRow}>
            <IconButton
              size="small"
              className={styles.backBtn}
              aria-label={CATEGORY_PRODUCTS_TEXT.back}
              onClick={() => {
                navigate(-1)
              }}
            >
              <ArrowBackIcon fontSize="small" />
            </IconButton>
            <Box component="h1" className={styles.heading}>
              {CATEGORY_PRODUCTS_TEXT.title}
            </Box>
            {products.length > 0 && (
              <Box component="span" className={styles.count}>
                {products.length}
              </Box>
            )}
          </Box>

          <Box className={styles.grid}>
            {products.map((product) => {
              const sellingPrice = product.pricing?.sellingPrice ?? 0
              const discountPercent = product.pricing?.discountPercent ?? 0
              const availableQuantity = product.availableQuantity ?? 0

              return (
                <Box
                  className={styles.card}
                  key={product._id}
                  onClick={() => {
                    handleShowSingleProduct(product._id)
                  }}
                >
                  <Box className={styles.imageWrap}>
                    {product.isFeatured && (
                      <Box component="span" className={styles.bestsellerBadge}>
                        <StarIcon sx={{ fontSize: 11 }} /> {BESTSELLER_BADGE_LABEL}
                      </Box>
                    )}
                    <Box
                      component="img"
                      className={styles.image}
                      src={getProductImage(product)}
                      alt={product.title}
                      loading="lazy"
                    />
                    <IconButton
                      size="small"
                      className={styles.wishlistBtn}
                      onClick={(event) => {
                        event.stopPropagation()
                      }}
                    >
                      <FavoriteBorderIcon />
                    </IconButton>
                  </Box>

                  <Box className={styles.info}>
                    {product.brand && <Box className={styles.brand}>{product.brand}</Box>}
                    <Box className={styles.title}>{product.title}</Box>

                    <Box className={styles.priceRow}>
                      <Box className={styles.price}>{formatINR(sellingPrice)}</Box>
                      {product.pricing?.mrp > sellingPrice && (
                        <Box className={styles.mrp}>{formatINR(product.pricing.mrp)}</Box>
                      )}
                      {discountPercent > 0 && (
                        <Box className={styles.offPct}>{discountPercent}% off</Box>
                      )}
                    </Box>

                    {getDeliveryCharge(sellingPrice) === 0 && (
                      <Box className={styles.delivery}>{PRODUCT_DETAILS_TEXT.freeDelivery}</Box>
                    )}

                    {availableQuantity > 0 && availableQuantity <= LOW_STOCK_THRESHOLD && (
                      <Box className={styles.stock}>Only {availableQuantity} left</Box>
                    )}
                  </Box>
                </Box>
              )
            })}
          </Box>

          {products.length === 0 && !loading && (
            <Box className={styles.empty}>{CATEGORY_PRODUCTS_TEXT.empty}</Box>
          )}
        </Box>
      </Box>

      <MobileBottomNav />
      <Box
        sx={{
          display: { xs: 'block', sm: 'none' },
          height: 'calc(58px + env(safe-area-inset-bottom))',
        }}
      />

      {loading && <Loader />}
      {notification && (
        <Notification
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          onClose={() => {
            setNotification(null)
          }}
        />
      )}
    </div>
  )
}

export default ShowCategory
