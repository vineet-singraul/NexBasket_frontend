import { Box, Typography, IconButton } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import styles from '../../../../styles/userStyle/homePage.module.css'
import type { Product } from '../../types/common.types.ts'
import { getProductImage } from '../../utils/productDisplay.ts'

interface TopValuesProps {
  products: Product[]
}

const TopValues = ({ products }: TopValuesProps) => {
  return (
    <Box component="section" className={styles.valuesSection}>
      <Typography component="h3" variant="inherit" className={styles.valuesHeader}>
        Still looking for these?
      </Typography>

      <Box className={styles.valuesRow}>
        {products.slice(0, 5).map((product) => (
          <Box className={styles.valueCard} key={product._id}>
            <Box className={styles.valueImageWrap}>
              <Box
                component="img"
                className={styles.valueImage}
                src={getProductImage(product)}
                alt={product.title}
              />
              {product.pricing?.discountPercent > 0 && (
                <Typography variant="inherit" component="span" className={styles.valueDiscountBadge}>
                  ↓{product.pricing.discountPercent}%
                </Typography>
              )}
            </Box>
            <Box className={styles.valueCaption}>
              <Typography variant="inherit" className={styles.valueCategory}>
                {product.title}
              </Typography>
              <Typography variant="inherit" className={styles.valueLink}>
                View Store
              </Typography>
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
