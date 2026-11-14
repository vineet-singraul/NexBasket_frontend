import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BottomNavigation, BottomNavigationAction, Box, Paper } from '@mui/material'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import AdminAccountMenu from './AdminAccountMenu'
import { ADMIN_COLORS, ADMIN_NAV, findActiveNav } from './adminNav'

// Sirf mobile pe dikhta hai — screen ke neeche fixed tab bar
const AdminBottomNav = () => {
  const location = useLocation()
  const [accountOpen, setAccountOpen] = useState(false)
  const activeTab = findActiveNav(location.pathname)

  const actionSx = {
    minWidth: 0,
    px: 0.5,
    py: 1,
    color: ADMIN_COLORS.muted,
    '& .MuiBottomNavigationAction-label': {
      fontSize: 11.5,
      fontWeight: 600,
      mt: 0.5,
      '&.Mui-selected': { fontSize: 11.5 },
    },
    '&.Mui-selected': { color: ADMIN_COLORS.orange },
  }

  // Active icon ke peeche orange pill
  const iconWrap = (icon: React.ReactNode, active: boolean) => (
    <Box
      sx={{
        width: 52,
        height: 30,
        borderRadius: '999px',
        display: 'grid',
        placeItems: 'center',
        bgcolor: active ? ADMIN_COLORS.orangeSoft : 'transparent',
        transition: 'background 0.25s ease',
      }}
    >
      {icon}
    </Box>
  )

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: (t) => t.zIndex.appBar,
          borderTop: '1px solid #e6e7ec',
          boxShadow: '0 -6px 24px rgba(10,26,43,0.08)',
          pb: 'env(safe-area-inset-bottom)',
          bgcolor: '#fff',
        }}
      >
        <BottomNavigation
          showLabels
          value={activeTab === -1 ? false : activeTab}
          sx={{ height: 66, bgcolor: 'transparent' }}
        >
          {ADMIN_NAV.map((item, i) => (
            <BottomNavigationAction
              key={item.to}
              component={Link}
              to={item.to}
              value={i}
              label={item.shortLabel}
              icon={iconWrap(activeTab === i ? item.activeIcon : item.icon, activeTab === i)}
              sx={actionSx}
            />
          ))}
          <BottomNavigationAction
            label="Account"
            value="account"
            icon={iconWrap(<AccountCircleOutlinedIcon />, false)}
            onClick={() => setAccountOpen(true)}
            sx={actionSx}
          />
        </BottomNavigation>
      </Paper>

      <AdminAccountMenu asSheet open={accountOpen} onClose={() => setAccountOpen(false)} />
    </>
  )
}

export default AdminBottomNav
