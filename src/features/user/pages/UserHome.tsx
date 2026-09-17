import { Box } from '@mui/material'
import Header from '../common/Header'
import UserCarousel from './UserCarousel'
import MobileBottomNav from '../common/MobileBottomNav'
import UserHomeProductSection from './UserHomeProductSection'
import type { Product } from '../types/common.types.ts'
import { useEffect, useState } from 'react'
import type { NotificationInterfacce } from '../../../auth/types/auth.types.ts'
import Loader from '../../../utils/Loader.tsx'
import Notification from '../../../utils/Notification.tsx'
import { apiGet } from '../../../api/userApi.ts'
import { USER_HOME_PAGE_CARDS } from '../../../api/endpoints.ts'
import {
  DEFAULT_ERROR_MESSAGE,
  HOME_CAROUSEL_ITEMS,
  HOME_CAROUSEL_START_INDEX,
} from '../utils/context.ts'

const UserHome = () => {
  const [cards, setCards] = useState<Product[]>([])
  const [electranics, setElectranics] = useState<Product[]>([])
  const [mans, setMans] = useState<Product[]>([])
  const [womans, setWomans] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState<NotificationInterfacce | null>(null)
  const [grocery , setGrocery] = useState<Product[]>([])

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const response = await apiGet<{
          data: Product[]
          Electranics: Product[]
          Mans: Product[]
          Womans: Product[]
          Grocery : Product[]
        }>(USER_HOME_PAGE_CARDS.GET_ALL_CARDS)
        setCards(response.data ?? [])
        setElectranics(response.Electranics ?? [])
        setMans(response.Mans ?? [])
        setWomans(response.Womans ?? [])
        setGrocery(response.Grocery ?? [])
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

    loadData()
  }, [])

  return (
    <div>
      <Header />
      <UserCarousel items={HOME_CAROUSEL_ITEMS} startIndex={HOME_CAROUSEL_START_INDEX} />
      <MobileBottomNav />
      <UserHomeProductSection cards={cards} electranics={electranics} mans={mans} womans={womans} grocery={grocery}/>
      <Box
        sx={{
          display: { xs: 'block', sm: 'none' },
          height: 'calc(58px + env(safe-area-inset-bottom))',
        }}
      />

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

export default UserHome
