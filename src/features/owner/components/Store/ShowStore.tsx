/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Typography, Avatar, Chip, Rating, IconButton } from '@mui/material'
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded'
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import CallRoundedIcon from '@mui/icons-material/CallRounded'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import categoryStyles from '../../../../styles/ownerStyle/AddCategury.module.css'
import type { StoreListItem } from '../../types/store.types'
import { apiGet, apiDelete } from '../../../../api/userApi'
import { STORE_ENDPOINTS } from '../../../../api/endpoints'
import { useEffect, useState, useCallback } from 'react'
import DeletePopUp from '../common/DeletePopUp'
import Loader from '../../../../utils/Loader'
import { useNavigate } from 'react-router-dom'
const PLACEHOLDER_LOGO = 'https://via.placeholder.com/80'

interface ShowStoreProps {
  refreshKey?: number
}

const ShowStore = ({ refreshKey }: ShowStoreProps) => {
  const [ownerId, setOwnerId] = useState<string>(() => {
    const storedUser = localStorage.getItem('nexbasket_auth')
    const userData = storedUser ? JSON.parse(storedUser) : null
    return userData?.user?._id || ''
  })
  

  const [ownerData, setOwnerData] = useState<StoreListItem[] | null>(null)
  const [fetchLoading, setFetchLoading] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null)
  const stores = ownerData ?? []

  const navigate = useNavigate();

  if (ownerData) {
    console.log('Data aa gaya:', ownerData)
  } else {
    console.log('Abhi data nahi aaya')
  }

  useEffect(() => {
    let isMounted = true

    const fetchStores = async () => {
      if (!ownerId) return
      setFetchLoading(true)
      try {
        const response: any = await apiGet(STORE_ENDPOINTS.SINGLELIST(ownerId))
        const data = response?.data ?? null
        if (data && isMounted) setOwnerData(data)
      } catch (error) {
        console.log('api error : ', error)
      } finally {
        if (isMounted) setFetchLoading(false)
      }
    }

    fetchStores()

    return () => {
      isMounted = false
    }
  }, [ownerId, refreshKey])

  const handleDeleteStore = useCallback(async () => {
    if (!selectedStoreId) return
    setLoading(true)
    try {
      await apiDelete(STORE_ENDPOINTS.DELETE(selectedStoreId))
      setOwnerData((prev) => prev?.filter((store) => store._id !== selectedStoreId) ?? null)
      setOpen(false)
      setSelectedStoreId(null)
    } catch (error) {
      console.log('delete store api error : ', error)
    } finally {
      setLoading(false)
    }
  }, [selectedStoreId])

  return (
    <>
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
                    <Rating
                      value={store.rating ?? 0}
                      precision={0.1}
                      size="small"
                      readOnly
                      sx={{
                        color: 'yellow',
                        '& .MuiRating-iconEmpty': { color: 'yellow' },
                      }}
                    />
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

                  {(store.address?.city ||
                    store.address?.state ||
                    store.phone ||
                    store.email ||
                    store.gstNumber) && (
                    <Box className={categoryStyles.AC_detailsRow}>
                      {(store.address?.city || store.address?.state) && (
                        <Box className={categoryStyles.AC_detailPill}>
                          <LocationOnRoundedIcon />
                          <span>
                            {[store.address?.city, store.address?.state].filter(Boolean).join(', ')}
                          </span>
                        </Box>
                      )}
                      {store.phone && (
                        <Box className={categoryStyles.AC_detailPill}>
                          <CallRoundedIcon />
                          <span>{store.phone}</span>
                        </Box>
                      )}
                      {store.email && (
                        <Box className={categoryStyles.AC_detailPill} sx={{ minWidth: 0 }}>
                          <EmailRoundedIcon />
                          <span>{store.email}</span>
                        </Box>
                      )}
                      {store.gstNumber && (
                        <Box className={categoryStyles.AC_detailPill}>
                          <ReceiptLongRoundedIcon />
                          <span>{store.gstNumber}</span>
                        </Box>
                      )}
                    </Box>
                  )}
                </Box>

                <Box className={categoryStyles.AC_cardSide}>
                  <Chip
                    label={store.active ? 'Active' : 'Inactive'}
                    className={`${categoryStyles.AC_statusChip} ${
                      store.active
                        ? categoryStyles.AC_statusActive
                        : categoryStyles.AC_statusInactive
                    }`}
                  />
                  <Box className={categoryStyles.AC_cardActions}>
                    <IconButton
                      size="small"
                      className={categoryStyles.AC_actionBtn}
                      onClick={(e) => {
                        e.stopPropagation()
                        navigate(`/owner/stores/add/${store._id}`);
                      }}
                    >
                      <EditRoundedIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      className={`${categoryStyles.AC_actionBtn} ${categoryStyles.AC_actionBtnDanger}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedStoreId(store._id) // konsi store delete karni hai, yaad rakhne ke liye
                        setOpen(true) // popup open karo
                      }}
                    >
                      <DeleteRoundedIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Box>
      <DeletePopUp
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={handleDeleteStore}
        loading={loading}
        title="Delete Store"
        message="Are you sure you want to delete this store? This action cannot be undone."
        loadingText="Deleting..."
        defaultText="Delete"
      />
      {(fetchLoading || loading) && <Loader />}
    </>
  )
}

export default ShowStore
