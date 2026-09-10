import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Paper,
  BottomNavigation,
  BottomNavigationAction,
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from '@mui/material'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import HomeIcon from '@mui/icons-material/Home'
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined'
import GridViewIcon from '@mui/icons-material/GridView'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import FavoriteIcon from '@mui/icons-material/Favorite'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import PersonIcon from '@mui/icons-material/Person'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined'
import { getAuthSession, clearAuthSession } from '../../../utils/authStorage'
import { apiPost } from '../../../api/userApi'
import { AUTH_ENDPOINTS } from '../../../api/endpoints'

const NAV_HEIGHT = 58

const MobileBottomNav = () => {
  const navigate = useNavigate()
  const [value, setValue] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const session = getAuthSession<{ email?: string; fullName?: string }>()

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
    if (newValue === 'home') {
      navigate('/')
    } else if (newValue === 'account') {
      if (!session) navigate('/signin')
    } else if (newValue === 'menu') {
      setMenuOpen(true)
    }
  }

  const handleSignOut = async () => {
    try {
      await apiPost(AUTH_ENDPOINTS.SIGNOUT)
    } finally {
      clearAuthSession()
      setMenuOpen(false)
      navigate('/signin')
    }
  }

  return (
    <>
      <Paper
        elevation={8}
        sx={{
          display: { xs: 'block', sm: 'none' },
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1300,
          background: 'linear-gradient(135deg, #0A1A2B 0%, #14283d 100%)',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.35)',
        }}
      >
        <BottomNavigation
          value={value}
          onChange={handleChange}
          showLabels
          sx={{
            height: NAV_HEIGHT,
            paddingBottom: 'env(safe-area-inset-bottom)',
            background: 'transparent',
            '@keyframes navPillPop': {
              '0%': { transform: 'translateX(-50%) scale(0.3)', opacity: 0 },
              '60%': { transform: 'translateX(-50%) scale(1.2)', opacity: 1 },
              '100%': { transform: 'translateX(-50%) scale(1)', opacity: 1 },
            },
            '& .MuiBottomNavigationAction-root': {
              position: 'relative',
              minWidth: 'auto',
              color: 'rgba(255, 255, 255, 0.62)',
              transition: 'color 0.25s ease, transform 0.15s ease',
              '&.Mui-selected': { color: '#FCCF8F' },
              '&:active': { transform: 'scale(0.88)' },
            },
            '& .MuiBottomNavigationAction-root::before': {
              content: '""',
              position: 'absolute',
              top: 2,
              left: '50%',
              width: 34,
              height: 34,
              borderRadius: '50%',
              background: 'rgba(252, 207, 143, 0.16)',
              opacity: 0,
              pointerEvents: 'none',
            },
            '& .Mui-selected::before': {
              opacity: 1,
              animation: 'navPillPop 0.35s ease',
              transform: 'translateX(-50%) scale(1)',
            },
            '& .MuiBottomNavigationAction-label': {
              fontSize: '11px',
              transition: 'font-size 0.2s ease, font-weight 0.2s ease',
              '&.Mui-selected': { fontSize: '11px', fontWeight: 700 },
            },
            '& .MuiSvgIcon-root': {
              position: 'relative',
              transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease',
            },
            '& .Mui-selected .MuiSvgIcon-root': {
              transform: 'scale(1.18) translateY(-2px)',
              filter: 'drop-shadow(0 0 6px rgba(252, 207, 143, 0.55))',
            },
            '& .MuiTouchRipple-root': {
              color: '#FCCF8F',
            },
            '& .wishlistNavAction.Mui-selected': {
              color: '#D4AF37',
            },
            '& .wishlistNavAction.Mui-selected::before': {
              background: 'rgba(212, 175, 55, 0.2)',
            },
            '& .wishlistNavAction.Mui-selected .MuiSvgIcon-root': {
              filter: 'drop-shadow(0 0 6px rgba(212, 175, 55, 0.6))',
            },
            '& .wishlistNavAction .MuiTouchRipple-root': {
              color: '#D4AF37',
            },
          }}
        >
          <BottomNavigationAction
            label="Home"
            value="home"
            icon={value === 'home' ? <HomeIcon /> : <HomeOutlinedIcon />}
          />
          <BottomNavigationAction
            label="Categories"
            value="categories"
            icon={value === 'categories' ? <GridViewIcon /> : <GridViewOutlinedIcon />}
          />
          <BottomNavigationAction
            className="wishlistNavAction"
            label="Wishlist"
            value="wishlist"
            icon={value === 'wishlist' ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
          />
          <BottomNavigationAction
            label="Account"
            value="account"
            icon={value === 'account' ? <PersonIcon /> : <PersonOutlineOutlinedIcon />}
          />
          <BottomNavigationAction label="Menu" value="menu" icon={<MenuOutlinedIcon />} />
        </BottomNavigation>
      </Paper>

      <Drawer anchor="bottom" open={menuOpen} onClose={() => setMenuOpen(false)}>
        <Box sx={{ p: 2 }}>
          <Typography sx={{ fontWeight: 700, color: '#0A1A2B', mb: 1 }}>
            {session?.user?.fullName || session?.user?.email || 'Welcome to NexBasket'}
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <List>
            <ListItemButton
              onClick={() => {
                setMenuOpen(false)
                navigate('/')
              }}
            >
              <ListItemIcon>
                <HomeOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
            <ListItemButton disabled>
              <ListItemIcon>
                <ShoppingBagOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="My Orders" />
            </ListItemButton>
            {session ? (
              <ListItemButton onClick={handleSignOut}>
                <ListItemIcon>
                  <LogoutOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Sign out" />
              </ListItemButton>
            ) : (
              <ListItemButton
                onClick={() => {
                  setMenuOpen(false)
                  navigate('/signin')
                }}
              >
                <ListItemIcon>
                  <LoginOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Sign in" />
              </ListItemButton>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  )
}

export default MobileBottomNav
