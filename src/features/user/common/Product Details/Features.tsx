import { Box } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import styles from '../../../../styles/userStyle/ShowSingleProduct.module.css'
import { PRODUCT_DETAILS_TEXT } from '../../utils/context.ts'

interface FeaturesProps {
  features: string[]
}

const Features = ({ features }: FeaturesProps) => {
  if (features.length === 0) return null

  return (
    <Box component="section" className={styles.section}>
      <Box component="h2" className={styles.sectionTitle}>
        {PRODUCT_DETAILS_TEXT.features}
      </Box>
      <Box component="ul" className={styles.checkList}>
        {features.map((feature) => (
          <Box component="li" className={styles.checkItem} key={feature}>
            <CheckCircleIcon />
            <Box>{feature}</Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Features
