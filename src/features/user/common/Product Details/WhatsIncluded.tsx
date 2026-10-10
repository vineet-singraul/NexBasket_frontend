import { Box } from '@mui/material'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import styles from '../../../../styles/userStyle/ShowSingleProduct.module.css'
import { PRODUCT_DETAILS_TEXT } from '../../utils/context.ts'

interface WhatsIncludedProps {
  whatsIncluded: string[]
}

const WhatsIncluded = ({ whatsIncluded }: WhatsIncludedProps) => {
  if (whatsIncluded.length === 0) return null

  return (
    <Box component="section" className={styles.section}>
      <Box component="h2" className={styles.sectionTitle}>
        {PRODUCT_DETAILS_TEXT.whatsIncluded}
      </Box>
      <Box component="ul" className={styles.checkList}>
        {whatsIncluded.map((item) => (
          <Box component="li" className={`${styles.checkItem} ${styles.includedItem}`} key={item}>
            <Inventory2OutlinedIcon />
            <Box>{item}</Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default WhatsIncluded
