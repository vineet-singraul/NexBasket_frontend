import { Box, Typography, IconButton } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import styles from '../../../../styles/userStyle/homePage.module.css'
import type { Product } from '../../types/common.types.ts'
import { getProductImage, formatINR } from '../../utils/productDisplay.ts'

interface TopUpgratesProps {
  products: Product[]
}

const UPGRADE_BG_CLASSES = [
  styles.upgradeBg1,
  styles.upgradeBg2,
  styles.upgradeBg3,
  styles.upgradeBg4,
  styles.upgradeBg5,
  styles.upgradeBg6,
  styles.upgradeBg7,
]

const TopUpgrates = ({ products }: TopUpgratesProps) => {
  return (
    <Box component="section" className={styles.upgradesSection}>
      <Typography component="h3" variant="inherit" className={styles.upgradesHeader}>
        Smart upgrades
      </Typography>

      <Box className={styles.upgradesRow}>
        {products.slice(0, 7).map((product, index) => (
          <Box className={styles.upgradeCard} key={product._id}>
            <Box
              className={`${styles.upgradeImageWrap} ${UPGRADE_BG_CLASSES[index % UPGRADE_BG_CLASSES.length]}`}
            >
              <Box
                component="img"
                className={styles.upgradeImage}
                src={getProductImage(product)}
                alt={product.title}
              />
            </Box>
            <Box className={styles.upgradeCaption}>
              <Typography variant="inherit" className={styles.upgradeCategory}>
                {product.title}
              </Typography>
              <Typography variant="inherit" className={styles.upgradePrice}>
                From {formatINR(product.pricing?.sellingPrice)}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <IconButton size="small" className={`${styles.upgradesNavBtn} ${styles.upgradesPrevBtn}`}>
        <ChevronLeftIcon fontSize="small" />
      </IconButton>
      <IconButton size="small" className={`${styles.upgradesNavBtn} ${styles.upgradesNextBtn}`}>
        <ChevronRightIcon fontSize="small" />
      </IconButton>
    </Box>
  )
}

export default TopUpgrates
