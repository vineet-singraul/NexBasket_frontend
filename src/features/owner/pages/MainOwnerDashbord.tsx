import OwnerdashboardCards from '../components/OwnerDashbord/OwnerdashboardCards'
import DeepDetailsOfOwnerCards from '../common/DeepDetailsOfOwnerCards'
import type { NotificationInterfacce } from '../../../auth/types/auth.types'
import { useEffect, useState } from 'react'
import Notification from '../../../utils/Notification'
import Loader from '../../../utils/Loader'
import type {
  ListedProduct,
  Warranty,
  Weight,
  Dimensions,
  Pricing,
  ListedStore,
  StoreAddress,
  OwnerDashboardResponse,
} from '../types/dashboard.types.js'
import { OWNER_DASHBOARD_API } from '../../../api/endpoints'
import { apiGet } from '../../../api/userApi'
import type { ComponentType } from 'react'

type OwnerdashboardCardsProps = {
  productListingDetails: ListedProduct[] | null
  listedStoreDetails: ListedStore[] | null
}


const MainOwnerDashbord = () => {
  const [notification, setNotification] = useState<NotificationInterfacce | null>({
    open: false,
    message: '',
    severity: 'success',
  })
  const [loading, setLoading] = useState<boolean | null>(false)
  const [productListingDetails, setProductListingDetails] = useState<ListedProduct[] | null>(null)
  const [listedStoreDetails, setListedStoreDetails] = useState<ListedStore[] | null>(null)
  const [counts, setCounts] = useState({ productCount: 0, storeCount: 0 })

  const ownerId = localStorage.getItem('ownerdId')
  const storeId = localStorage.getItem('storeId')

  const fatchOwnerDashboardDetails = async (storeId: string, ownerId: string) => {
    if (!storeId || !ownerId) {
      setNotification({
        open: true,
        message: 'owner or store not found',
        severity: 'warning',
      })
      return
    }
    try {
      setLoading(true)
      const response = await apiGet<OwnerDashboardResponse>(
        OWNER_DASHBOARD_API.GET_ALL_DETAILS_OWNER_DASHBOARD(storeId, ownerId),
      )
      if (!response || !response.success) {
        setNotification({
          open: true,
          message: 'something went wrong',
          severity: 'info',
        })
        return
      }

      setProductListingDetails(response.ListedProduct)
      setListedStoreDetails(response.listedStore)
      setCounts({
        productCount: response.productCount,
        storeCount: response.storeCount,
      })
    } catch (error) {
      setNotification({
        open: true,
        message:
          error instanceof Error
            ? error.message
            : 'can not load owner dashboard !! please try again ... ',
        severity: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  // Load Effect :
  useEffect(() => {
    if (!ownerId || !storeId) return
    let isActive = true
    void Promise.resolve().then(() => fatchOwnerDashboardDetails(storeId, ownerId))
    return () => {
      isActive = false
    }
  }, [ownerId, storeId])

  return (
    <>

      <OwnerdashboardCards
        productListingDetails={productListingDetails}
        listedStoreDetails={listedStoreDetails}
        counts={counts}
      />

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
    </>
  )
}

export default MainOwnerDashbord
