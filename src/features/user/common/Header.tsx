import PrimaryNavbar from './PrimaryNavbar'
import SecondaryNav from './SecondaryNav'
import styles from '../../../styles/userStyle/Header.module.css'
import type { Owner } from '../../owner/types/common.types'
import type { NotificationInterfacce } from '../../../auth/types/auth.types'
import { useEffect, useState } from 'react'
import Loader from '../../../utils/Loader'
import Notification from '../../../utils/Notification'
import { apiGet } from '../../../api/userApi'
import { AUTH_ENDPOINTS } from '../../../api/endpoints'

const Header = () => {
  const [loading, setLoading] = useState<boolean | null>(false)
  const [notificattion, setNotification] = useState<NotificationInterfacce | null>(null)
  const [user, setUser] = useState<Owner>()

  const featchLoggedInUserDetails = async () => {
    try {
      setLoading(true)
      const response = await apiGet<{ user: Owner }>(AUTH_ENDPOINTS.ME)
      setUser(response?.user)
    } catch (error) {
      setLoading(true)

      setNotification({
        open: true,
        message: error instanceof Error ? error.message : 'something went wrong',
        severity: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let isActive = true
    void Promise.resolve().then(() => featchLoggedInUserDetails())
    return () => {
      isActive = false
    }
  }, [])

  return (
    <>
      <header className={styles.header}>
        <PrimaryNavbar user={user} />
        <SecondaryNav />
      </header>

      {loading && <Loader />}

      {notificattion && (
        <Notification
          open={notificattion.open}
          message={notificattion.message}
          severity={notificattion.severity}
          onClose={() => {
            setNotification(null)
          }}
        />
      )}
    </>
  )
}

export default Header
