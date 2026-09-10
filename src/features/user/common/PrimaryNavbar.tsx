import { Link, useNavigate } from 'react-router-dom'
import { Box, InputBase, Typography, Avatar, Stack } from '@mui/material'
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
import { type UserProfileDetailsProps } from '../types/user.types'

const PrimaryNavbar = ({ user }: UserProfileDetailsProps) => {
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
          <p className={styles.SLogoName}>
            <span className={styles.fLogoName}>Nex</span>Basket
          </p>
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
          <input type="text" placeholder="Search NexBasket.in" className={styles.searchInput} />
          <button type="button" className={styles.searchButton}>
            <SearchOutlinedIcon className={styles.searchIcon} />
          </button>
        </div>

        <div className={styles.navBlock}>
          <Link to="/cart" className={styles.cartLink}>
            <div className={styles.cartIconWrap}>
              <ShoppingCartOutlinedIcon className={styles.cartIcon} />
              <span className={styles.cartBadge}>0</span>
            </div>
          </Link>
        </div>

        <div
          className={styles.navBlock}
          style={{ cursor: 'pointer' }}
          onMouseEnter={() => setShowProfile(true)}
        >
          <div className={styles.smallLabel}>
            {displayName ? `Hello, ${displayName}` : 'Hello, sign in'}
          </div>
          <div className={styles.boldLabel} onClick={handleAccountClick}>
            {session ? 'Sign out' : 'Account & Lists'}
            <KeyboardArrowDownOutlinedIcon className={styles.caret} />
          </div>

          {showeProfile && (
            <ProfilePopUp userDetails={session?.user} setShowProfile={setShowProfile} />
          )}
        </div>
      </Box>

      {/* Mobile header */}
      <Box
        sx={{
          display: { xs: 'block', sm: 'none' },
          position: 'sticky',
          top: 0,
          zIndex: 150,
          background: 'linear-gradient(135deg, #0A1A2B 0%, #14283d 100%)',
        }}
      >
        {/* Row 1: logo + cart */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 16px 8px',
          }}
        >
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography
              sx={{
                fontSize: 20,
                fontWeight: 800,
                letterSpacing: '-0.3px',
                color: 'var(--nb-white)',
              }}
            >
              Nex
              <Box component="span" sx={{ color: 'var(--nb-gold)' }}>
                Basket
              </Box>
            </Typography>
          </Link>

          <Link to="/cart" style={{ textDecoration: 'none' }}>
            <Box
              sx={{
                position: 'relative',
                width: 40,
                height: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <ShoppingCartOutlinedIcon sx={{ color: 'var(--nb-white)', fontSize: 22 }} />
              <Box
                sx={{
                  position: 'absolute',
                  top: -6,
                  right: -6,
                  minWidth: 18,
                  height: 18,
                  px: '4px',
                  borderRadius: '999px',
                  background: 'var(--nb-gold)',
                  color: 'var(--nb-primary-bg)',
                  fontSize: 11,
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid var(--nb-primary-bg)',
                }}
              >
                0
              </Box>
            </Box>
          </Link>
        </Box>

        {/* Row 2: search + avatar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.2,
            padding: '0 16px 10px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flex: 1,
              backgroundColor: '#ffffff',
              borderRadius: '10px',
              height: 42,
              px: '12px',
              gap: 1,
              boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
            }}
          >
            <SearchOutlinedIcon sx={{ color: '#6b6b6b', fontSize: 20 }} />
            <InputBase
              placeholder="Search NexBasket"
              fullWidth
              sx={{
                fontSize: 14.5,
                color: '#111111',
                '& input::placeholder': { color: '#8a8a8a', opacity: 1 },
              }}
            />
          </Box>

          <Stack
            sx={{ cursor: 'pointer', flexShrink: 0 }}
            onClick={() => setShowProfile(!showeProfile)}
          >
            <Avatar
              sx={{
                width: 42,
                height: 42,
                background: 'var(--nb-gold)',
                color: 'var(--nb-primary-bg)',
                fontWeight: 100,
              }}
            >
              {user?.fullName
                .split(' ')
                .map((cut) => cut[0])
                .join('')}
            </Avatar>
          </Stack>

          {showeProfile && (
            <ProfilePopUp userDetails={session?.user} setShowProfile={setShowProfile} />
          )}
        </Box>

        {/* Row 3: delivery location */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '0 16px 10px',
            cursor: 'pointer',
          }}
        >
          <LocationOnOutlinedIcon sx={{ fontSize: 16, color: 'var(--nb-gold)' }} />
          <Typography sx={{ fontSize: 12.5, color: 'var(--nb-text-muted)' }}>
            Delivering to{' '}
            <Box component="span" sx={{ fontWeight: 700, color: 'var(--nb-white)' }}>
              {deliveryLocation}
            </Box>
          </Typography>
          <KeyboardArrowDownOutlinedIcon sx={{ fontSize: 16, color: 'var(--nb-text-muted)' }} />
        </Box>
      </Box>
    </>
  )
}

export default PrimaryNavbar
