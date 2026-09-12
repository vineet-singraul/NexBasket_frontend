import { Box, Typography, IconButton, Badge } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import PhotoCameraOutlinedIcon from '@mui/icons-material/PhotoCameraOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import styles from '../../../../styles/userStyle/Category.module.css'

const CategoryHeader = () => {
  return (
    <Box component="header" className={styles.header}>
      <Typography component="h1" className={styles.headerTitle}>
        All Categories
      </Typography>

      <Box className={styles.headerIcons}>
        <IconButton className={styles.headerIconBtn} aria-label="Search">
          <SearchIcon />
        </IconButton>
        <IconButton className={styles.headerIconBtn} aria-label="Search by image">
          <PhotoCameraOutlinedIcon />
        </IconButton>
        <IconButton className={styles.headerIconBtn} aria-label="Cart">
          <Badge badgeContent={10} className={styles.cartBadge}>
            <ShoppingCartOutlinedIcon />
          </Badge>
        </IconButton>
      </Box>
    </Box>
  )
}

export default CategoryHeader
