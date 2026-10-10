import { Box, IconButton } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import styles from '../../../../styles/userStyle/homePage.module.css'
import type { Product } from '../../types/common.types.ts'
import { getProductImage } from '../../utils/productDisplay.ts'
import {
  STILL_LOOKING_TITLE,
  TOP_VALUES_VISIBLE_COUNT,
  VIEW_STORE_LABEL,
} from '../../utils/context.ts'

interface TopValuesProps {
  products: Product[]
}

const TopValues = ({ products }: TopValuesProps) => {
  return (
    <Box component="section" className={styles.valuesSection}>
      <Box component="h3" className={styles.valuesHeader}>
        {STILL_LOOKING_TITLE}
      </Box>

      <Box className={styles.valuesRow}>
        {products.slice(0, TOP_VALUES_VISIBLE_COUNT).map((product) => (
          <Box className={styles.valueCard} key={product._id}>
            <Box className={styles.valueImageWrap}>
              <Box
                component="img"
                className={styles.valueImage}
                src={getProductImage(product)}
                alt={product.title}
              />
              {product.pricing?.discountPercent > 0 && (
                <Box component="span" className={styles.valueDiscountBadge}>
                  ↓{product.pricing.discountPercent}%
                </Box>
              )}
            </Box>
            <Box className={styles.valueCaption}>
              <Box className={styles.valueCategory}>{product.title}</Box>
              <Box className={styles.valueLink}>{VIEW_STORE_LABEL}</Box>
            </Box>
          </Box>
        ))}
      </Box>

      <IconButton size="small" className={styles.valuesNextBtn}>
        <ChevronRightIcon fontSize="small" />
      </IconButton>
    </Box>
  )
}

export default TopValues
