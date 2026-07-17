import { Box, Typography, Avatar, Chip, Rating } from '@mui/material'
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded'
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded'
import { useNavigate } from 'react-router-dom'
import categoryStyles from '../../../../styles/ownerStyle/AddCategury.module.css'
import type { StoreListItem } from '../../types/store.types'

const PLACEHOLDER_LOGO = 'https://via.placeholder.com/80'

// TODO: replace with live data from STORE_ENDPOINTS.LIST once the API is wired up
const STATIC_STORES: StoreListItem[] = [
  {
    _id: 'store-1',
    storeName: 'Fresh Mart Grocery',
    description: 'Everyday groceries, fresh produce and household essentials at fair prices.',
    logo: null,
    address: { city: 'Indore', state: 'Madhya Pradesh' },
    active: true,
    rating: 4.5,
    totalSales: 12800,
  },
  {
    _id: 'store-2',
    storeName: 'Green Basket Organics',
    description: 'Certified organic fruits, vegetables and cold-pressed oils sourced locally.',
    logo: null,
    address: { city: 'Indore', state: 'Madhya Pradesh' },
    active: true,
    rating: 4.8,
    totalSales: 9600,
  },
  {
    _id: 'store-3',
    storeName: 'QuickBuy Essentials',
    description: 'Fast delivery convenience store for daily needs, snacks and beverages.',
    logo: null,
    address: { city: 'Indore', state: 'Madhya Pradesh' },
    active: false,
    rating: 3.9,
    totalSales: 4200,
  },
  {
    _id: 'store-4',
    storeName: 'Daily Needs Supermart',
    description: 'One-stop supermarket for groceries, dairy, personal care and home supplies.',
    logo: null,
    address: { city: 'Indore', state: 'Madhya Pradesh' },
    active: true,
    rating: 4.2,
    totalSales: 15400,
  },
]

const ShowStore = () => {
  const navigate = useNavigate()
  const stores = STATIC_STORES

  return (
    <Box className={categoryStyles.AC_rightWrapper}>
      <Box className={categoryStyles.AC_panelHeader}>
        <Box className={categoryStyles.AC_panelIcon}>
          <StorefrontRoundedIcon />
        </Box>
        <Box>
          <Typography className={categoryStyles.AC_panelTitle}>Your Stores</Typography>
          <Typography className={categoryStyles.AC_panelSubtitle}>
            {stores.length} store{stores.length === 1 ? '' : 's'} created
          </Typography>
        </Box>
      </Box>

      {stores.length === 0 && (
        <Box className={categoryStyles.AC_emptyState}>
          <Box className={categoryStyles.AC_emptyIconWrap}>
            <StorefrontRoundedIcon />
          </Box>
          <Typography className={categoryStyles.AC_emptyTitle}>No stores yet</Typography>
          <Typography className={categoryStyles.AC_emptyDesc}>
            Stores you create will show up here for quick reference.
          </Typography>
        </Box>
      )}

      {stores.length > 0 && (
        <Box className={categoryStyles.AC_listBody}>
          {stores.map((store) => (
            <Box
              className={categoryStyles.AC_categoryCard}
              key={store._id}
              onClick={() => navigate(`/owner/store/${store._id}`)}
              sx={{ cursor: 'pointer' }}
            >
              <Avatar
                src={store.logo || PLACEHOLDER_LOGO}
                variant="rounded"
                sx={{ width: 46, height: 46, border: '1px solid rgba(255, 132, 0, 0.3)' }}
              />

              <Box className={categoryStyles.AC_categoryInfo}>
                <Typography className={categoryStyles.AC_categoryName}>
                  {store.storeName}
                </Typography>
                {store.description && (
                  <Typography className={categoryStyles.AC_categoryDesc}>
                    {store.description}
                  </Typography>
                )}

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 0.5 }}>
                  <Rating value={store.rating ?? 0} precision={0.1} size="small" readOnly />
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                      color: 'var(--nb-gray)',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    <ShoppingBagRoundedIcon sx={{ fontSize: 14 }} />
                    {(store.totalSales ?? 0).toLocaleString()}
                  </Box>
                </Box>
              </Box>

              <Chip
                label={store.active ? 'Active' : 'Inactive'}
                className={`${categoryStyles.AC_statusChip} ${
                  store.active ? categoryStyles.AC_statusActive : categoryStyles.AC_statusInactive
                }`}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}

export default ShowStore
