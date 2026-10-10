import PrimaryNavbar from './PrimaryNavbar'
import SecondaryNav from './SecondaryNav'
import styles from '../../../styles/userStyle/Header.module.css'
import type { Owner } from '../../owner/types/common.types'
import type { NotificationInterfacce } from '../../../auth/types/auth.types'
import { useEffect, useState } from 'react'
import Loader from '../../../utils/Loader'
import Notification from '../../../utils/Notification'
import { apiGet } from '../../../api/userApi'
import { AUTH_ENDPOINTS, USER_CATEGORY_PAGE } from '../../../api/endpoints'
import type { CategoryListItem } from '../../owner/types/category.types.ts'

const Header = () => {
  const [loading, setLoading] = useState<boolean | null>(false)
  const [notificattion, setNotification] = useState<NotificationInterfacce | null>(null)
  const [category, setCategory] = useState<CategoryListItem[]>([])
  const [user, setUser] = useState<Owner>()

  const featchLoggedInUserDetails = async () => {
    try {
      setLoading(true)
      const response = await apiGet<{ user: Owner }>(AUTH_ENDPOINTS.ME)
      setUser(response?.user)
    } catch (error) {
      setNotification({
        open: true,
        message: error instanceof Error ? error.message : 'something went wrong',
        severity: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  const FATCH_CATEGORY_DETAILS = async () => {
    try {
      const response = await apiGet<{ Category: CategoryListItem[] }>(
        USER_CATEGORY_PAGE.GET_ALL_CATEGORY,
      )
      setCategory(response.Category ?? [])
    } catch (error) {
      console.log(`${error instanceof Error ? error.message : 'some thing went wrong'}`)
    }
  }

  useEffect(() => {
    void Promise.resolve().then(() => featchLoggedInUserDetails())
    void Promise.resolve().then(() => FATCH_CATEGORY_DETAILS())
  }, [])

  return (
    <>
      <header className={styles.header}>
        <PrimaryNavbar user={user} />
        <SecondaryNav categories={category} />
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
