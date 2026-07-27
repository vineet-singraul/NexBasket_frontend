import { Box, Typography, Chip } from '@mui/material'
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded'
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded'
import styles from '../../../../styles/ownerStyle/AddCategury.module.css'
import type { AddCategoryRightPannelProps, CategoryListItem } from '../../types/category.types'

const isActive = (value: CategoryListItem['categoryActive']) =>
  value === true || value === 'true'

const AddCategoryRightPannel = ({ categories, loading }: AddCategoryRightPannelProps) => {
  console.log("<-------- categories --------->",categories)
  return (
    <Box className={styles.AC_rightWrapper}>
      <Box className={styles.AC_panelHeader}>
        <Box className={styles.AC_panelIcon}>
          <InventoryRoundedIcon />
        </Box>
        <Box>
          <Typography className={styles.AC_panelTitle}>Your Categories</Typography>
          <Typography className={styles.AC_panelSubtitle}>
            {categories.length} categor{categories.length === 1 ? 'y' : 'ies'} created
          </Typography>
        </Box>
      </Box>

      {loading && (
        <Box className={styles.AC_emptyState}>
          <Typography className={styles.AC_emptyDesc}>Loading categories…</Typography>
        </Box>
      )}

      {!loading && categories.length === 0 && (
        <Box className={styles.AC_emptyState}>
          <Box className={styles.AC_emptyIconWrap}>
            <CategoryRoundedIcon />
          </Box>
          <Typography className={styles.AC_emptyTitle}>No categories yet</Typography>
          <Typography className={styles.AC_emptyDesc}>
            Categories you create will show up here for quick reference.
          </Typography>
        </Box>
      )}

      {!loading && categories.length > 0 && (
        <Box className={styles.AC_listBody}>
          {categories.map((category) => (
            <Box className={styles.AC_categoryCard} key={category._id}>
              <Box className={styles.AC_categoryIcon}>
                <CategoryRoundedIcon />
              </Box>

              <Box className={styles.AC_categoryInfo}>
                <Typography className={styles.AC_categoryName}>
                  {category.productCategory}
                </Typography>
                {category.categoryDescription && (
                  <Typography className={styles.AC_categoryDesc}>
                    {category.categoryDescription}
                  </Typography>
                )}
              </Box>

              <Chip
                label={isActive(category.categoryActive) ? 'Active' : 'Inactive'}
                className={`${styles.AC_statusChip} ${
                  isActive(category.categoryActive) ? styles.AC_statusActive : styles.AC_statusInactive
                }`}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}

export default AddCategoryRightPannel
