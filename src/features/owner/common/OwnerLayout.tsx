import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import OwnerSidebar from './OwnerSidebar'
import OwnerHeader from './OwnerHeader'
import { apiGet, apiPost } from '../../../api/userApi'
import { AUTH_ENDPOINTS } from '../../../api/endpoints'
import { clearAuthSession } from '../../../utils/authStorage'
import { clearUserData } from '../../../redux/slice/userSlice'
import type { Owner } from '../types/common.types'
import type { NotificationInterfacce } from '../../../auth/types/auth.types'
import Notification from '../../../utils/Notification'
import Loader from '../../../utils/Loader'
interface OwnerLayoutProps {
  children: React.ReactNode
  fullBleed?: boolean
}

const OwnerLayout: React.FC<OwnerLayoutProps> = ({ children, fullBleed = false }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [owner, setOwner] = useState<Owner | null>(null)
  const [loading, setLoading] = useState<boolean | null>(false)
  const [notification, setNotification] = useState<NotificationInterfacce | null>(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      const respo = await apiPost(AUTH_ENDPOINTS.SIGNOUT)
      setLoading(true)
      if (!respo) {
        setNotification({
          open: true,
          message: 'something went wrong !! try latter',
          severity: 'info',
        })
        return
      }
      setLoading(true)

      setNotification({
        open: true,
        message: 'signout successfully ... r',
        severity: 'success',
      })
    } catch (error) {
      setLoading(true)

      setNotification({
        open: true,
        message: error instanceof Error ? error.message : 'something went wrong !! try latter',
        severity: 'error',
      })
    } finally {
      clearAuthSession()
      dispatch(clearUserData())
      setLoading(false)
      navigate('/signin', { replace: true })
    }
  }

  const fatchOwnerDetails = async () => {
    setLoading(true)

    try {
      const response = await apiGet<{ user: Owner }>(AUTH_ENDPOINTS.ME)
      setNotification({
        open: true,
        message: 'something went wrong !! try latter',
        severity: 'info',
      })
      setOwner(response.user)
    } catch (error) {
      setLoading(true)

      setNotification({
        open: true,
        message: error instanceof Error ? error.message : 'something went wrong !! try latter',
        severity: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let isActive = true
    void Promise.resolve().then(() => fatchOwnerDetails())
    return () => {
      isActive = false
    }
  }, [])

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0f' }}>
      <OwnerSidebar
        onLogout={handleLogout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <OwnerHeader
          onMenuClick={() => setSidebarOpen(true)}
          onLogout={handleLogout}
          owner={owner}
        />
        <Box
          component="main"
          sx={{ flex: 1, padding: fullBleed ? '12px' : { xs: 0, sm: '24px' }, overflowY: 'auto' }}
        >
          {children}
        </Box>
      </div>

      {notification && (
        <Notification
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          onClose={() => {
            setNotification(null)
          }}
        />
      )}

      {loading && <Loader />}
    </div>
  )
}

export default OwnerLayout
