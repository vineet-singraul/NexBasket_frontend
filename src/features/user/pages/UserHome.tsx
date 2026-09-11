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

type CarouselItem = {
  id: number
  title: string
  description: string
  image: string
}

const movies: CarouselItem[] = [
  {
    id: 1,
    title: 'Eternals',
    description:
      'In 5000 BC, ten superpowered Eternals — Sersi, Ikaris, Kingo, Sprite, Phastos, Makkari, Druig, Ajak, Gilgamesh and Thena — came to Earth.',
    image:
      'https://images.unsplash.com/photo-1570857502809-08184874388e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fFNob3B8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 2,
    title: 'Guardians Of The Galaxy Vol. 2',
    description:
      'A group of intergalactic criminals must pit against a ruthless warrior with plans to purge the universe.',
    image:
      'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fFNob3B8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 3,
    title: 'Justice League',
    description:
      "Determined to ensure Superman's ultimate sacrifice was not in vain, Bruce Wayne aligns forces with Diana Prince with plans to recruit a team of metahumans to protect the world.",
    image:
      'https://images.unsplash.com/photo-1674027392887-751d6396b710?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZWNvbW1lcmNlfGVufDB8fDB8fHww',
  },
  {
    id: 4,
    title: 'Spider-Man: Far From Home',
    description:
      'Following the events of Avengers: Endgame (2019), Spider-Man must step up to take on new threats in a world that has changed forever.',
    image:
      'https://plus.unsplash.com/premium_photo-1684785618727-378a3a5e91c5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZWNvbW1lcmNlfGVufDB8fDB8fHww',
  },
  {
    id: 5,
    title: 'Aquaman',
    description:
      'Arthur Curry learns that he is the heir to the underwater kingdom of Atlantis, and must step forward to lead his people.',
    image:
      'https://plus.unsplash.com/premium_photo-1681488262364-8aeb1b6aac56?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWNvbW1lcmNlfGVufDB8fDB8fHww',
  },
]

const UserHome = () => {
  const [cards, setCards] = useState<Product[]>([])
  const [electranics, setElectranics] = useState<Product[]>([])
  const [mans, setMans] = useState<Product[]>([])
  const [womans, setWomans] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState<NotificationInterfacce | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        const response = await apiGet<{
          data: Product[]
          Electranics: Product[]
          Mans: Product[]
          Womans: Product[]
        }>(USER_HOME_PAGE_CARDS.GET_ALL_CARDS)
        setCards(response.data ?? [])
        setElectranics(response.Electranics ?? [])
        setMans(response.Mans ?? [])
        setWomans(response.Womans ?? [])
      } catch (error) {
        setNotification({
          open: true,
          message: error instanceof Error ? error.message : 'Something went wrong',
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
      <UserCarousel items={movies} startIndex={2} />
      <MobileBottomNav />
      <UserHomeProductSection cards={cards} electranics={electranics} mans={mans} womans={womans} />
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
