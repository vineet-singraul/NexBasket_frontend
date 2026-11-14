import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import PersonIcon from '@mui/icons-material/Person'
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined'
import StorefrontIcon from '@mui/icons-material/Storefront'
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined'
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining'
import type { ReactElement } from 'react'

// Admin ke sab colours ek jagah
export const ADMIN_COLORS = {
  navy: '#0A1A2B',
  navyLight: '#14283d',
  orange: '#fc8019',
  orangeSoft: 'rgba(252,128,25,0.12)',
  bg: '#f2f2f5',
  muted: '#989ba8',
}

export type AdminNavItem = {
  label: string
  shortLabel: string
  to: string
  description: string
  icon: ReactElement
  activeIcon: ReactElement
}

// Header tabs + mobile bottom nav dono yahi list use karte hain
export const ADMIN_NAV: AdminNavItem[] = [
  {
    label: 'User',
    shortLabel: 'Users',
    to: '/admin/UserDetails',
    description: 'Sabhi registered customers ko dekho aur manage karo',
    icon: <PersonOutlinedIcon />,
    activeIcon: <PersonIcon />,
  },
  {
    label: 'Owner',
    shortLabel: 'Owners',
    to: '/admin/OwnerDetails',
    description: 'Store owners aur unke stores ki details',
    icon: <StorefrontOutlinedIcon />,
    activeIcon: <StorefrontIcon />,
  },
  {
    label: 'Delivery Boy',
    shortLabel: 'Delivery',
    to: '/admin/DelevaryboyDetails',
    description: 'Delivery partners aur unki availability',
    icon: <DeliveryDiningOutlinedIcon />,
    activeIcon: <DeliveryDiningIcon />,
  },
]

export const findActiveNav = (pathname: string) =>
  ADMIN_NAV.findIndex((item) => pathname.toLowerCase().startsWith(item.to.toLowerCase()))

export const getAdminUser = () => {
  try {
    const authData = JSON.parse(localStorage.getItem('authData') || 'null')
    return {
      name: (authData?.user?.name as string) || 'Admin',
      email: (authData?.user?.email as string) || '',
    }
  } catch {
    return { name: 'Admin', email: '' }
  }
}
