import React, { useState } from 'react'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import OwnerSidebar from './OwnerSidebar'
import OwnerHeader from './OwnerHeader'
import { apiPost } from '../../../../api/userApi'
import { AUTH_ENDPOINTS } from '../../../../api/endpoints'
import { clearAuthSession } from '../../../../utils/authStorage'
import { clearUserData } from '../../../../redux/slice/userSlice'

interface OwnerLayoutProps {
  children: React.ReactNode
}

/**
 * OwnerLayout
 * Wraps the sidebar + header shell around any Owner page content,
 * e.g. <OwnerLayout><OwnerDashboard /></OwnerLayout>
 */
const OwnerLayout: React.FC<OwnerLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      await apiPost(AUTH_ENDPOINTS.SIGNOUT)
    } catch {
      // even if the request fails, clear the local session below
    } finally {
      clearAuthSession()
      dispatch(clearUserData())
      navigate('/signin', { replace: true })
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0f' }}>
      <OwnerSidebar
        onLogout={handleLogout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <OwnerHeader onMenuClick={() => setSidebarOpen(true)} onLogout={handleLogout} />
        <Box
          component="main"
          sx={{ flex: 1, padding: { xs: 0, sm: '24px' }, overflowY: 'auto' }}
        >
          {children}
        </Box>
      </div>
    </div>
  )
}

export default OwnerLayout
