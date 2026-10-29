import { useNavigate } from 'react-router-dom'
import { Box, Button } from '@mui/material'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import styles from '../../../../styles/userStyle/account.module.css'
import type { AccountProps } from '../../types/common.types.ts'
import { formatINR, getProductImage } from '../../utils/productDisplay.ts'
import { ACCOUNT_TEXT } from '../../utils/context.ts'

const WishList = ({ userWishList = [] }: AccountProps) => {
  const navigate = useNavigate()

  if (userWishList.length === 0) {
    return (
      <Box className={styles.empty}>
        <FavoriteBorderIcon className={styles.emptyIcon} />
        <Box className={styles.emptyTitle}>{ACCOUNT_TEXT.emptyWishlist}</Box>
        <Box className={styles.emptySubtitle}>{ACCOUNT_TEXT.emptyWishlistSubtitle}</Box>
        <Button className={styles.shopBtn} onClick={() => navigate('/')}>
          {ACCOUNT_TEXT.shopNow}
        </Button>
      </Box>
    )
  }

  return (
    <Box className={styles.wishGrid}>
      {userWishList.map((item) => {
        const sellingPrice = item.pricing?.sellingPrice ?? 0
        const mrp = item.pricing?.mrp ?? 0
        const discountPercent = item.pricing?.discountPercent ?? 0
        const inStock = item.inventory?.stockStatus !== 'out_of_stock'

        return (
          <Box
            key={item._id}
            className={styles.wishCard}
            onClick={() => navigate(`/Productdetails/${item._id}`)}
          >
            <Box className={styles.wishImageWrap}>
              <Box
                component="img"
                className={styles.wishImage}
                src={getProductImage(item)}
                alt={item.title}
                loading="lazy"
              />
              <FavoriteIcon className={styles.heartIcon} />
              {!inStock && <Box className={styles.outOfStock}>{ACCOUNT_TEXT.outOfStock}</Box>}
            </Box>

            <Box className={styles.wishInfo}>
              {item.brand && <Box className={styles.brand}>{item.brand}</Box>}
              <Box className={styles.wishTitle}>{item.title}</Box>
              <Box className={styles.priceRow}>
                <Box className={styles.price}>{formatINR(sellingPrice)}</Box>
                {mrp > sellingPrice && <Box className={styles.mrp}>{formatINR(mrp)}</Box>}
                {discountPercent > 0 && (
                  <Box className={styles.offPct}>
                    {discountPercent}% {ACCOUNT_TEXT.off}
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        )
      })}
    </Box>
  )
}

export default WishList
