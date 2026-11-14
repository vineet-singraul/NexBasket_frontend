import { useNavigate } from 'react-router-dom'
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Typography,
} from '@mui/material'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import LogoutIcon from '@mui/icons-material/Logout'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { clearAuthSession } from '../../../utils/authStorage'
import { ADMIN_COLORS, getAdminUser } from './adminNav'

type Props = {
  /** Desktop: dropdown menu ka anchor element */
  anchorEl?: HTMLElement | null
  /** Mobile: neeche se khulne wala sheet */
  asSheet?: boolean
  open: boolean
  onClose: () => void
}

const AdminAccountMenu = ({ anchorEl = null, asSheet = false, open, onClose }: Props) => {
  const navigate = useNavigate()
  const { name, email } = getAdminUser()

  const go = (path: string) => {
    onClose()
    navigate(path)
  }

  const handleLogout = () => {
    onClose()
    clearAuthSession()
    navigate('/signin')
  }

  const content = (
    <>
      {/* Profile card */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          p: 2,
          m: 1.5,
          borderRadius: '14px',
          background: `linear-gradient(135deg, ${ADMIN_COLORS.navy} 0%, ${ADMIN_COLORS.navyLight} 100%)`,
          color: '#fff',
        }}
      >
        <Avatar sx={{ bgcolor: ADMIN_COLORS.orange, fontWeight: 700, width: 46, height: 46 }}>
          {name.charAt(0).toUpperCase()}
        </Avatar>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontWeight: 700, lineHeight: 1.2 }} noWrap>
            {name}
          </Typography>
          {email && (
            <Typography sx={{ fontSize: 12.5, color: 'rgba(255,255,255,0.65)' }} noWrap>
              {email}
            </Typography>
          )}
          <Chip
            icon={<AdminPanelSettingsOutlinedIcon />}
            label="Administrator"
            size="small"
            sx={{
              mt: 0.75,
              height: 22,
              fontSize: 11,
              fontWeight: 600,
              bgcolor: 'rgba(252,128,25,0.2)',
              color: '#ffb57a',
              '& .MuiChip-icon': { color: '#ffb57a', fontSize: 15 },
            }}
          />
        </Box>
      </Box>

      <List sx={{ px: 1, pb: 1 }}>
        <ListItemButton onClick={() => go('/')} sx={{ borderRadius: '10px' }}>
          <ListItemIcon sx={{ minWidth: 38 }}>
            <HomeOutlinedIcon sx={{ color: ADMIN_COLORS.navy }} />
          </ListItemIcon>
          <ListItemText
            primary="Go to Store"
            secondary="Customer website kholo"
            slotProps={{ primary: { sx: { fontWeight: 600, fontSize: 14 } }, secondary: { sx: { fontSize: 12 } } }}
          />
          <ChevronRightIcon sx={{ color: ADMIN_COLORS.muted }} />
        </ListItemButton>

        <Divider sx={{ my: 1 }} />

        <ListItemButton
          onClick={handleLogout}
          sx={{ borderRadius: '10px', color: '#d32f2f', '&:hover': { bgcolor: 'rgba(211,47,47,0.06)' } }}
        >
          <ListItemIcon sx={{ minWidth: 38 }}>
            <LogoutIcon sx={{ color: '#d32f2f' }} />
          </ListItemIcon>
          <ListItemText primary="Logout" slotProps={{ primary: { sx: { fontWeight: 600, fontSize: 14 } } }} />
        </ListItemButton>
      </List>
    </>
  )

  if (asSheet) {
    return (
      <Drawer
        anchor="bottom"
        open={open}
        onClose={onClose}
        slotProps={{
          paper: {
            sx: {
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              pb: 'env(safe-area-inset-bottom)',
            },
          },
        }}
      >
        {/* drag handle */}
        <Box sx={{ width: 40, height: 4, borderRadius: 2, bgcolor: '#d6d8e0', mx: 'auto', mt: 1.25 }} />
        {content}
      </Drawer>
    )
  }

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      slotProps={{
        paper: {
          sx: { mt: 1, width: 290, borderRadius: '16px', boxShadow: '0 12px 40px rgba(10,26,43,0.2)' },
        },
        list: { sx: { p: 0 } },
      }}
    >
      {content}
    </Menu>
  )
}

export default AdminAccountMenu
