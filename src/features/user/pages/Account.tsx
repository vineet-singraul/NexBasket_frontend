import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import Profile from '../common/Account Features/Profile'
import WishList from '../common/Account Features/WishList'
import AccountMenu, {
  type AccountMenuAction,
  type AccountSection,
} from '../common/Account Features/AccountMenu'
import Header from '../common/Header'
import MobileBottomNav from '../common/MobileBottomNav'
import Loader from '../../../utils/Loader'
import styles from '../../../styles/userStyle/account.module.css'
import { ACCOUNT_TEXT, DEFAULT_ERROR_MESSAGE, SIGN_OUT_SUCCESS_MESSAGE } from '../utils/context.ts'

import { clearAuthSession, getAuthSession } from '../../../utils/authStorage.ts'
import { type NotificationInterfacce } from '../../../auth/types/auth.types.ts'
import { apiGet, apiPost } from '../../../api/userApi.ts'
import { AUTH_ENDPOINTS, USER_HOME_PAGE_CARDS } from '../../../api/endpoints.ts'
import { type Owner } from '../../owner/types/common.types.ts'
import Notification from '../../../utils/Notification.tsx';
import {type ListedProduct} from "../../owner/types/dashboard.types.ts"

const SECTION_HEADINGS: Record<AccountSection, { title: string; subtitle: string }> = {
  profile: { title: ACCOUNT_TEXT.profile, subtitle: ACCOUNT_TEXT.profileSubtitle },
  wishlist: { title: ACCOUNT_TEXT.wishlist, subtitle: ACCOUNT_TEXT.wishlistSubtitle },
  orders: { title: ACCOUNT_TEXT.orders, subtitle: ACCOUNT_TEXT.ordersSubtitle },
  addresses: { title: ACCOUNT_TEXT.addresses, subtitle: ACCOUNT_TEXT.addressesSubtitle },
}

const Account = () => {
  const navigate = useNavigate()
  const userId = getAuthSession<{ _id: string }>()?.user?._id
  const [notification, setNotification] = useState<NotificationInterfacce | null>(() =>
    userId
      ? null
      : {
          open: true,
          message: 'Please login to see your profile',
          severity: 'warning',
        },
  )
  const [loading, setLoading] = useState<boolean>(!!userId)
  const [userdata, setUserData] = useState<Owner | null>();
  const [userWishList, setUserWishList] = useState<ListedProduct[]>([]);
  // null = nothing picked yet: mobile shows the menu, desktop shows the profile
  const [activeSection, setActiveSection] = useState<AccountSection | null>(null)

  useEffect(() => {
    if (!userId) return
    let ignore = false

    // GET USER PROFILE :
    const FETCH_USER_PROFILE = async () => {
      try {
        const response = await apiGet<{ user: Owner }>(AUTH_ENDPOINTS.ME)
        if (!ignore) setUserData(response.user)
      } catch (error) {
        console.log(`${error instanceof Error ? error.message : 'some thing went wrong'}`)
      }
    }

    // GET WISHLIST OF USER :
    const FETCH_USER_WISHLIST = async () => {
      try {
        const response = await apiGet<{ data: ListedProduct[] }>(USER_HOME_PAGE_CARDS.SHOW_WISHLIST_ITEM(userId))
        if (!ignore) setUserWishList(response.data ?? [])
      } catch (error) {
        if (!ignore) {
          setNotification({
            open: true,
            message: error instanceof Error ? error.message : 'some thing went wrong',
            severity: 'error',
          })
        }
      }
    }

    // Run both together; loading ends only when both are done
    Promise.all([FETCH_USER_PROFILE(), FETCH_USER_WISHLIST()]).finally(() => {
      if (!ignore) setLoading(false)
    })

    return () => {
      ignore = true
    }
  }, [userId])

  const handleSignOut = async () => {
    setLoading(true)
    try {
      const response = await apiPost<{ message?: string }>(AUTH_ENDPOINTS.SIGNOUT)
      clearAuthSession()
      setNotification({
        open: true,
        message: response?.message || SIGN_OUT_SUCCESS_MESSAGE,
        severity: 'success',
      })
      navigate('/signin')
    } catch (error) {
      setNotification({
        open: true,
        message: error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE,
        severity: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleMenuSelect = (action: AccountMenuAction) => {
    switch (action) {
      case 'cart':
        navigate('/cart')
        break
      case 'changePassword':
        navigate('/change-password')
        break
      case 'help':
        setNotification({ open: true, message: ACCOUNT_TEXT.comingSoon, severity: 'info' })
        break
      case 'signOut':
        handleSignOut()
        break
      default:
        setActiveSection(action)
        window.scrollTo({ top: 0 })
    }
  }

  // Mobile: back closes the open section first, then leaves the page
  const handleBack = () => {
    if (activeSection) {
      setActiveSection(null)
      return
    }
    navigate(-1)
  }

  const section = activeSection ?? 'profile'
  const heading = SECTION_HEADINGS[section]

  return (
    <div className={styles.root}>
      <Header />

      <Box component="main" className={styles.page}>
        <Box className={styles.container}>
          <Box className={styles.headingRow}>
            <IconButton
              size="small"
              className={styles.backBtn}
              aria-label={ACCOUNT_TEXT.back}
              onClick={handleBack}
            >
              <ArrowBackIcon fontSize="small" />
            </IconButton>
            <Box component="h1" className={styles.heading}>
              {/* On mobile the heading follows the open section */}
              <span className={styles.desktopOnly}>{ACCOUNT_TEXT.title}</span>
              <span className={styles.mobileOnly}>
                {activeSection ? heading.title : ACCOUNT_TEXT.title}
              </span>
            </Box>
          </Box>

          <Box className={`${styles.layout} ${activeSection ? styles.sectionOpen : ''}`}>
            <AccountMenu
              name={userdata?.fullName || ACCOUNT_TEXT.guest}
              activeSection={section}
              onSelect={handleMenuSelect}
            />

            <Box className={styles.panel}>
              <Box className={styles.panelHeader}>
                <Box component="h2" className={styles.panelTitle}>
                  {heading.title}
                  {section === 'wishlist' && userWishList.length > 0 && (
                    <Box component="span" className={styles.count}>
                      {userWishList.length}
                    </Box>
                  )}
                </Box>
                <Box className={styles.panelSubtitle}>{heading.subtitle}</Box>
              </Box>

              <Box className={styles.panelBody}>
                {section === 'profile' && <Profile userdata={userdata} />}
                {section === 'wishlist' && <WishList userWishList={userWishList} />}
                {section === 'orders' && (
                  <Box className={styles.empty}>
                    <Inventory2OutlinedIcon className={styles.emptyIcon} />
                    <Box className={styles.emptyTitle}>{ACCOUNT_TEXT.comingSoon}</Box>
                  </Box>
                )}
                {section === 'addresses' && (
                  <Box className={styles.empty}>
                    <LocationOnOutlinedIcon className={styles.emptyIcon} />
                    <Box className={styles.emptyTitle}>{ACCOUNT_TEXT.comingSoon}</Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <MobileBottomNav />

      {loading && <Loader />}
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
    </div>
  )
}

export default Account
