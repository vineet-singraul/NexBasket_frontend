import { Link } from 'react-router-dom'
import { Box, InputBase, Typography, Tooltip } from '@mui/material'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import styles from '../../../styles/userStyle/Header.module.css'

const PrimaryNavbar = () => {
  return (
    <>
      {/* Desktop / tablet bar */}
      <Box className={styles.primaryNav} sx={{ display: { xs: 'none', sm: 'flex' } }}>
        <Link to="/" className={styles.logoLink}>
          <img src="/com_loggo.png" alt="NexBasket" className={styles.logo} />
        </Link>

        <div className={styles.navBlock}>
          <div className={styles.deliveryRow}>
            <LocationOnOutlinedIcon className={styles.locationIcon} />
            <div>
              <div className={styles.smallLabel}>Delivering to Indore 452001</div>
              <div className={styles.boldLabel}>Update location</div>
            </div>
          </div>
        </div>

        <div className={styles.searchBar}>
          <div className={styles.searchScope}>
            All
            <KeyboardArrowDownOutlinedIcon className={styles.caret} />
          </div>
          <input
            type="text"
            placeholder="Search NexBasket.in"
            className={styles.searchInput}
          />
          <button type="button" className={styles.searchButton}>
            <SearchOutlinedIcon className={styles.searchIcon} />
          </button>
        </div>

        <Link to="/signin" className={styles.navBlock}>
          <div className={styles.smallLabel}>Hello, sign in</div>
          <div className={styles.boldLabel}>
            Account & Lists
            <KeyboardArrowDownOutlinedIcon className={styles.caret} />
          </div>
        </Link>


        <div className={styles.navBlock}>
          <Link to="/cart" className={styles.cartLink}>
            <div className={styles.cartIconWrap}>
              <ShoppingCartOutlinedIcon className={styles.cartIcon} />
              <span className={styles.cartBadge}>0</span>
            </div>
            <span className={styles.cartText}>Cart</span>
          </Link>
        </div>
      </Box>

      {/* Mobile search bar */}
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          alignItems: 'center',
          gap: 1.5,
          background: 'linear-gradient(135deg, #0A1A2B 0%, #14283d 100%)',
          padding: '12px 16px',
        }}
      >
        <Tooltip title="Deliver to Indore 452001" arrow>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              flexShrink: 0,
              cursor: 'pointer',
              opacity: 0.95,
              '&:hover': { opacity: 1 },
            }}
          >
            <LocationOnOutlinedIcon sx={{ fontSize: 18, color: '#ffffff' }} />
            <Typography
              sx={{
                fontSize: 12.5,
                fontWeight: 600,
                color: '#ffffff',
                lineHeight: 1,
                whiteSpace: 'nowrap',
              }}
            >
              Indore
            </Typography>
          </Box>
        </Tooltip>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            backgroundColor: '#ffffff',
            borderRadius: '999px',
            height: 44,
            pl: '14px',
            pr: '6px',
            gap: 1,
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.18)',
          }}
        >
          <SearchOutlinedIcon sx={{ color: '#6b6b6b', fontSize: 20 }} />
          <InputBase
            placeholder="Search NexBasket"
            fullWidth
            sx={{
              flex: 1,
              fontSize: 14.5,
              color: '#111111',
              '& input::placeholder': { color: '#8a8a8a', opacity: 1 },
            }}
          />
        </Box>
      </Box>
    </>
  )
}

export default PrimaryNavbar
