import { useState, type MouseEvent } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  Menu,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import AdminAccountMenu from './AdminAccountMenu'
import { ADMIN_COLORS, ADMIN_NAV, findActiveNav, getAdminUser } from './adminNav'

const AdminHeader = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const location = useLocation()
  const { name } = getAdminUser()

  const [accountAnchor, setAccountAnchor] = useState<HTMLElement | null>(null)
  const [notifAnchor, setNotifAnchor] = useState<HTMLElement | null>(null)

  const activeTab = findActiveNav(location.pathname)

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: `linear-gradient(135deg, ${ADMIN_COLORS.navy} 0%, ${ADMIN_COLORS.navyLight} 100%)`,
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 4px 20px rgba(10,26,43,0.25)',
      }}
    >
      <Toolbar
        sx={{
          maxWidth: 1240,
          width: '100%',
          mx: 'auto',
          px: { xs: 2, md: 3 },
          minHeight: { xs: 60, md: 72 },
          gap: { xs: 1, md: 2 },
          boxSizing: 'border-box',
        }}
      >
        {/* ===== Logo ===== */}
        <Box
          component={Link}
          to="/admin"
          aria-label="NexBasket admin home"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.25,
            textDecoration: 'none',
            color: '#fff',
            minWidth: 0,
          }}
        >
          <Box
            component="img"
            src="/icon-192.png"
            alt="NexBasket"
            sx={{
              width: { xs: 36, md: 40 },
              height: { xs: 36, md: 40 },
              borderRadius: '10px',
              flexShrink: 0,
              display: 'block',
              border: '1px solid rgba(255,255,255,0.14)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
            }}
          />
          <Box sx={{ minWidth: 0 }}>
            <Typography noWrap sx={{ fontWeight: 800, fontSize: { xs: 16, md: 18 }, lineHeight: 1.2, letterSpacing: '-0.01em' }}>
              Nex
              <Box component="span" sx={{ color: ADMIN_COLORS.orange }}>
                Basket
              </Box>
            </Typography>
            <Typography
              noWrap
              sx={{ fontSize: 10.5, color: 'rgba(255,255,255,0.55)', letterSpacing: 1.2, textTransform: 'uppercase' }}
            >
              Admin Panel
            </Typography>
          </Box>
        </Box>

        {/* ===== Desktop Tabs ===== */}
        <Box sx={{ flex: 1, minWidth: 0, display: 'flex', justifyContent: 'center' }}>
          {!isMobile && (
            <Tabs
              value={activeTab === -1 ? false : activeTab}
              slotProps={{ indicator: { sx: { display: 'none' } } }}
              sx={{
                minHeight: 0,
                p: 0.5,
                borderRadius: '14px',
                bgcolor: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                '& .MuiTabs-list': { gap: 0.5 },
              }}
            >
              {ADMIN_NAV.map((item, i) => (
                <Tab
                  key={item.to}
                  component={Link}
                  to={item.to}
                  icon={activeTab === i ? item.activeIcon : item.icon}
                  iconPosition="start"
                  label={item.label}
                  disableRipple
                  sx={{
                    minHeight: 42,
                    px: 2.5,
                    borderRadius: '10px',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: 14,
                    color: 'rgba(255,255,255,0.65)',
                    transition: 'all 0.2s ease',
                    '& .MuiTab-icon': { mr: 1, fontSize: 20 },
                    '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.08)' },
                    '&.Mui-selected': {
                      color: '#fff',
                      bgcolor: ADMIN_COLORS.orange,
                      boxShadow: '0 4px 14px rgba(252,128,25,0.45)',
                    },
                  }}
                />
              ))}
            </Tabs>
          )}
        </Box>

        {/* ===== Right actions ===== */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, md: 1.5 }, flexShrink: 0 }}>
          <Tooltip title="Notifications">
            <IconButton
              onClick={(e: MouseEvent<HTMLElement>) => setNotifAnchor(e.currentTarget)}
              sx={{
                width: 38,
                height: 38,
                color: '#fff',
                bgcolor: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.12)' },
              }}
            >
              <Badge variant="dot" invisible sx={{ '& .MuiBadge-dot': { bgcolor: ADMIN_COLORS.orange } }}>
                <NotificationsNoneOutlinedIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>

          {!isMobile && <Divider orientation="vertical" flexItem sx={{ borderColor: 'rgba(255,255,255,0.12)', my: 2 }} />}

          {/* Profile */}
          <Box
            onClick={(e: MouseEvent<HTMLElement>) => setAccountAnchor(e.currentTarget)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              cursor: 'pointer',
              p: { xs: 0, md: 0.5 },
              pr: { xs: 0, md: 1 },
              borderRadius: '999px',
              transition: 'background 0.2s',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' },
            }}
          >
            <Avatar
              sx={{
                bgcolor: '#fff',
                color: ADMIN_COLORS.navy,
                fontWeight: 700,
                width: 38,
                height: 38,
                fontSize: 16,
                boxSizing: 'border-box',
                border: `2px solid ${ADMIN_COLORS.orange}`,
              }}
            >
              {name.charAt(0).toUpperCase()}
            </Avatar>
            {!isMobile && (
              <>
                <Box>
                  <Typography sx={{ fontSize: 14, fontWeight: 600, lineHeight: 1.2 }}>{name}</Typography>
                  <Typography sx={{ fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>Administrator</Typography>
                </Box>
                <KeyboardArrowDownIcon fontSize="small" sx={{ color: 'rgba(255,255,255,0.7)' }} />
              </>
            )}
          </Box>
        </Box>

        {/* Notifications dropdown (abhi empty state) */}
        <Menu
          anchorEl={notifAnchor}
          open={Boolean(notifAnchor)}
          onClose={() => setNotifAnchor(null)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          slotProps={{
            paper: { sx: { mt: 1, width: 300, borderRadius: '16px', boxShadow: '0 12px 40px rgba(10,26,43,0.2)' } },
          }}
        >
          <Box sx={{ px: 2, py: 1.25 }}>
            <Typography sx={{ fontWeight: 700, color: ADMIN_COLORS.navy }}>Notifications</Typography>
          </Box>
          <Divider />
          <Box sx={{ py: 4, px: 2, textAlign: 'center' }}>
            <NotificationsOffOutlinedIcon sx={{ fontSize: 40, color: '#c9ccd6' }} />
            <Typography sx={{ fontSize: 13.5, color: ADMIN_COLORS.muted, mt: 1 }}>
              Abhi koi nayi notification nahi hai
            </Typography>
          </Box>
        </Menu>

        {/* Account: desktop pe dropdown, mobile pe bottom sheet */}
        <AdminAccountMenu
          anchorEl={accountAnchor}
          asSheet={isMobile}
          open={Boolean(accountAnchor)}
          onClose={() => setAccountAnchor(null)}
        />
      </Toolbar>
    </AppBar>
  )
}

export default AdminHeader
