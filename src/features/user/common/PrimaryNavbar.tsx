import { Link, useNavigate } from 'react-router-dom'
import { Box, InputBase, Typography, Tooltip, Divider } from '@mui/material'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import styles from '../../../styles/userStyle/Header.module.css'
import { getAuthSession, clearAuthSession } from '../../../utils/authStorage'
import { apiPost } from '../../../api/userApi'
import { AUTH_ENDPOINTS } from '../../../api/endpoints'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import ProfilePopUp from '../components/ProfilePopUp'
import type { RootState } from '../../../redux/store'

const PrimaryNavbar = () => {
  const [showeProfile, setShowProfile] = useState<boolean>(false)
  const navigate = useNavigate()
  const session = getAuthSession<{ email?: string; fullName?: string }>()
  const displayName = session?.user?.fullName || session?.user?.email
  const city = useSelector((state: RootState) => state.user.city?.city)
  const pinCode = useSelector((state: RootState) => state.user.pinCode?.postcode)
  const deliveryLocation = city ? `${city}${pinCode ? ` ${pinCode}` : ''}` : 'Indore 452001'

  const handleAccountClick = async () => {
    if (!session) {
      navigate('/signin')
      return
    }
    try {
      await apiPost(AUTH_ENDPOINTS.SIGNOUT)
    } finally {
      clearAuthSession()
      navigate('/signin')
    }
  }

  return (
    <>
      {/* Desktop / tablet bar */}
      <Box className={styles.primaryNav} sx={{ display: { xs: 'none', sm: 'flex' } }}>
        <Link to="/" className={styles.logoLink}>
          <p className={styles.SLogoName}><span className={styles.fLogoName}>Nex</span>Basket</p>
        </Link>

        <div className={`${styles.navBlock} navBlock`}>
          <div className={styles.deliveryRow}>
            <LocationOnOutlinedIcon className={styles.locationIcon} />
            <div>
              <div className={styles.smallLabel}>Delivering to {deliveryLocation}</div>
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

        
        <div  className={styles.navBlock}>
          <Link to="/cart" className={styles.cartLink}>
            <div className={styles.cartIconWrap}>
              <ShoppingCartOutlinedIcon className={styles.cartIcon} />
              <span className={styles.cartBadge}>0</span>
            </div> 
          </Link>
        </div>

        <div className={styles.navBlock} style={{ cursor: 'pointer' }} onMouseEnter={() => setShowProfile(true)}>
          <div className={styles.smallLabel} >
            {displayName ? `Hello, ${displayName}` : 'Hello, sign in'}
          </div>
          <div className={styles.boldLabel} onClick={handleAccountClick}>
            {session ? 'Sign out' : 'Account & Lists'}
            <KeyboardArrowDownOutlinedIcon className={styles.caret} />
          </div>

          {showeProfile && <ProfilePopUp userDetails={session?.user} setShowProfile={setShowProfile}/>}
        </div>

      </Box>

      {/* Mobile search bar */}
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          alignItems: 'center',
          background: 'linear-gradient(135deg, #0A1A2B 0%, #14283d 100%)',
          padding: '12px 16px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
            backgroundColor: '#ffffff',
            borderRadius: '999px',
            height: 44,
            pl: '14px',
            pr: '10px',
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
          <Divider orientation="vertical" flexItem sx={{ height: 22, alignSelf: 'center' }} />
          <Tooltip title={`Deliver to ${city} and pin code ${pinCode}`}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '3px',
                flexShrink: 0,
                cursor: 'pointer',
              }}
            >
              <LocationOnOutlinedIcon sx={{ fontSize: 16, color: '#0A1A2B' }} />
              <Typography
                sx={{
                  fontSize: 12.5,
                  fontWeight: 600,
                  color: '#0A1A2B',
                  lineHeight: 1,
                  whiteSpace: 'nowrap',
                }}
              >
                {city}
              </Typography>
            </Box>
          </Tooltip>
        </Box>
      </Box>
    </>
  )
}

export default PrimaryNavbar
