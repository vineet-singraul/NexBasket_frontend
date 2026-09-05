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
import { OWNER_DASHBOARD_API, STORE_ENDPOINTS } from '../../../api/endpoints'
import { apiGet } from '../../../api/userApi'
import type { ComponentType } from 'react'
import type { StoreListItem } from '../types/store.types'

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

  const [ownerId] = useState<string>(() => {
    const storedUser = localStorage.getItem('nexbasket_auth')
    const userData = storedUser ? JSON.parse(storedUser) : null
    return userData?.user?._id || ''
  })

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

  const handleProductUpdated = (updatedProduct: ListedProduct) => {
    setProductListingDetails((prev) =>
      prev ? prev.map((product) => (product._id === updatedProduct._id ? updatedProduct : product)) : prev
    )
  }

  // Load Effect :
  useEffect(() => {
    if (!ownerId) return
    let isActive = true

    const loadDashboard = async () => {
      try {
        const storesResponse = await apiGet<{ data?: StoreListItem[] }>(
          STORE_ENDPOINTS.SINGLELIST(ownerId),
        )
        const storeId = storesResponse?.data?.[0]?._id
        if (!isActive || !storeId) return
        await fatchOwnerDashboardDetails(storeId, ownerId)
      } catch (error) {
        if (!isActive) return
        setNotification({
          open: true,
          message:
            error instanceof Error
              ? error.message
              : 'can not load owner stores !! please try again ... ',
          severity: 'error',
        })
      }
    }

    void loadDashboard()
    return () => {
      isActive = false
    }
  }, [ownerId])

  return (
    <>

      <OwnerdashboardCards
        productListingDetails={productListingDetails}
        listedStoreDetails={listedStoreDetails}
        counts={counts}
        onProductUpdated={handleProductUpdated}
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
