import { Link, Outlet, useLocation } from 'react-router-dom'
import { Box, Breadcrumbs, Chip, Typography, useMediaQuery, useTheme } from '@mui/material'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import AdminHeader from '../Common/AdminHeader'
import AdminBottomNav from '../Common/AdminBottomNav'
import { ADMIN_COLORS, ADMIN_NAV, findActiveNav, getAdminUser } from '../Common/adminNav'

const getGreeting = () => {
  const h = new Date().getHours()
  if (h < 12) return 'Good Morning'
  if (h < 17) return 'Good Afternoon'
  return 'Good Evening'
}

const AdminLayout = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const location = useLocation()
  const { name } = getAdminUser()

  const active = ADMIN_NAV[findActiveNav(location.pathname)]
  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: ADMIN_COLORS.bg }}>
      <AdminHeader />

      <Box
        component="main"
        sx={{
          maxWidth: 1240,
          mx: 'auto',
          px: { xs: 2, md: 3 },
          pt: { xs: 2, md: 3 },
          // Mobile pe bottom nav ke peeche content na chhupe
          pb: { xs: 'calc(96px + env(safe-area-inset-bottom))', md: 4 },
        }}
      >
        {/* ===== Page heading ===== */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            gap: 1.5,
            mb: { xs: 2, md: 3 },
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Breadcrumbs
              separator={<NavigateNextIcon sx={{ fontSize: 16 }} />}
              sx={{ fontSize: 12.5, color: ADMIN_COLORS.muted, mb: 0.5 }}
            >
              <Typography
                component={Link}
                to="/admin"
                sx={{ fontSize: 12.5, color: ADMIN_COLORS.muted, textDecoration: 'none', '&:hover': { color: ADMIN_COLORS.orange } }}
              >
                Admin
              </Typography>
              <Typography sx={{ fontSize: 12.5, color: ADMIN_COLORS.navy, fontWeight: 600 }}>
                {active?.label ?? 'Dashboard'}
              </Typography>
            </Breadcrumbs>

            <Typography sx={{ fontSize: 13.5, color: ADMIN_COLORS.muted, mt: 0.25 }}>
              {active ? active.description : 'NexBasket admin panel mein aapka swagat hai'}
            </Typography>
          </Box>

          <Chip
            icon={<CalendarTodayOutlinedIcon />}
            label={today}
            sx={{
              bgcolor: '#fff',
              border: '1px solid #e6e7ec',
              color: ADMIN_COLORS.navy,
              fontWeight: 600,
              fontSize: 12.5,
              flexShrink: 0,
              '& .MuiChip-icon': { color: ADMIN_COLORS.orange, fontSize: 16 },
            }}
          />
        </Box>

        {/* ===== Page content ===== */}
        <Outlet />
      </Box>

      {isMobile && <AdminBottomNav />}
    </Box>
  )
}

export default AdminLayout
