import { Box } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import styles from '../../../../styles/userStyle/ShowSingleProduct.module.css'
import { PRODUCT_DETAILS_TEXT } from '../../utils/context.ts'

interface HeightLigtsProps {
  highlights: string[]
}

const HeightLigts = ({ highlights }: HeightLigtsProps) => {
  if (highlights.length === 0) return null

  return (
    <Box component="section" className={styles.section}>
      <Box component="h2" className={styles.sectionTitle}>
        {PRODUCT_DETAILS_TEXT.highlights}
      </Box>
      <Box className={styles.highlightGrid}>
        {highlights.map((highlight) => (
          <Box className={styles.highlightItem} key={highlight}>
            <StarIcon />
            <Box>{highlight}</Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default HeightLigts
