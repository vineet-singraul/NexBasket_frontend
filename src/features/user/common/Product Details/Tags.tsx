import { Box } from '@mui/material'
import styles from '../../../../styles/userStyle/ShowSingleProduct.module.css'
import { PRODUCT_DETAILS_TEXT } from '../../utils/context.ts'

interface TagsProps {
  tags: string[]
}

const Tags = ({ tags }: TagsProps) => {
  if (tags.length === 0) return null

  return (
    <Box component="section" className={styles.section}>
      <Box component="h2" className={styles.sectionTitle}>
        {PRODUCT_DETAILS_TEXT.tags}
      </Box>
      <Box className={styles.tagList}>
        {tags.map((tag) => (
          <Box component="span" className={styles.tag} key={tag}>
            #{tag}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Tags
