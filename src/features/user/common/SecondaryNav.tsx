import { Box, Typography } from '@mui/material'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import CheckroomOutlinedIcon from '@mui/icons-material/CheckroomOutlined'
import SmartphoneOutlinedIcon from '@mui/icons-material/SmartphoneOutlined'
import FaceRetouchingNaturalOutlinedIcon from '@mui/icons-material/FaceRetouchingNaturalOutlined'
import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined'
import TvOutlinedIcon from '@mui/icons-material/TvOutlined'
import ToysOutlinedIcon from '@mui/icons-material/ToysOutlined'
import LocalDrinkOutlinedIcon from '@mui/icons-material/LocalDrinkOutlined'
import SportsMotorsportsOutlinedIcon from '@mui/icons-material/SportsMotorsportsOutlined'
import TwoWheelerOutlinedIcon from '@mui/icons-material/TwoWheelerOutlined'
import FitnessCenterOutlinedIcon from '@mui/icons-material/FitnessCenterOutlined'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import WeekendOutlinedIcon from '@mui/icons-material/WeekendOutlined'
import styles from '../../../styles/userStyle/Header.module.css'

const categories = [
  { label: 'For You', icon: ShoppingBagOutlinedIcon, active: true },
  { label: 'Fashion', icon: CheckroomOutlinedIcon },
  { label: 'Mobiles', icon: SmartphoneOutlinedIcon },
  { label: 'Beauty', icon: FaceRetouchingNaturalOutlinedIcon },
  { label: 'Electronics', icon: DevicesOutlinedIcon },
  { label: 'Home', icon: LightbulbOutlinedIcon },
  { label: 'Appliances', icon: TvOutlinedIcon },
  { label: 'Toys, baby...', icon: ToysOutlinedIcon },
  { label: 'Food & Health', icon: LocalDrinkOutlinedIcon },
  { label: 'Auto Accessories', icon: SportsMotorsportsOutlinedIcon },
  { label: '2 Wheelers', icon: TwoWheelerOutlinedIcon },
  { label: 'Sports & Fitness', icon: FitnessCenterOutlinedIcon },
  { label: 'Books & More', icon: MenuBookOutlinedIcon },
  { label: 'Furniture', icon: WeekendOutlinedIcon },
]

const SecondaryNav = () => {
  return (
    <Box className={styles.secondaryNav}>
      {categories.map(({ label, icon: Icon, active }) => (
        <Box
          key={label}
          className={active ? `${styles.navItem} ${styles.active}` : styles.navItem}
        >
          <Box className={styles.iconBox}>
            <Icon className={styles.navIcon} />
          </Box>
          <Typography className={styles.navLabel}>{label}</Typography>
        </Box>
      ))}
    </Box>
  )
}

export default SecondaryNav
