import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Paper, Chip, Typography, Avatar, Button, Rating } from '@mui/material'
import style from '../../../styles/ownerStyle/Product.module.css'
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits'
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import ShoppingBagRoundedIcon from '@mui/icons-material/ShoppingBagRounded'
import CallRoundedIcon from '@mui/icons-material/CallRounded'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import { apiGet } from '../../../api/userApi'
import { STORE_ENDPOINTS } from '../../../api/endpoints'
import type { StoreListItem } from '../types/store.types'

const PLACEHOLDER_LOGO = 'https://via.placeholder.com/80'

const Products = () => {
  const navigate = useNavigate()

  const [ownerId] = useState<string>(() => {
    const storedUser = localStorage.getItem('nexbasket_auth')
    const userData = storedUser ? JSON.parse(storedUser) : null
    return userData?.user?._id || ''
  })

  const [stores, setStores] = useState<StoreListItem[]>([])
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchStores = async () => {
      if (!ownerId) return
      try {
        const response = await apiGet<{ data?: StoreListItem[] }>(
          STORE_ENDPOINTS.SINGLELIST(ownerId),
        )
        const data = response?.data ?? []
        if (isMounted && Array.isArray(data)) {
          setStores(data)
          setSelectedStoreId((prev) => prev ?? data[0]?._id ?? null)
        }
      } catch (error) {
        console.log('api error : ', error)
      }
    }

    fetchStores()

    return () => {
      isMounted = false
    }
  }, [ownerId])

  return (
    <div style={{ marginLeft: '-15px', marginTop: '-10px' }}>
      <Box className={style.Product_Main_Wrapper}>
        <Box className={style.Product_Main_Header}>
          <Paper className={style.Product_panelIcon}>
            <ProductionQuantityLimitsIcon />
          </Paper>

          <Box className={style.Product_Text_Wrapper}>
            <Typography className="panelTitle">Add Products</Typography>
            <Typography className="panelSubtitle">Create a new product in NextBasket</Typography>
          </Box>
        </Box>

        <Box className={style.Product_Container}>
          <Box className={style.Product}>
            <Box className={style.Banner}>
              <Typography className={style.Banner_Label}>Select Store</Typography>

              {stores.length === 0 ? (
                <Box className={style.Store_Empty}>
                  <Typography className={style.Store_Empty_Text}>
                    You don't have any stores yet. Create one to start adding products.
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<StorefrontRoundedIcon />}
                    onClick={() => navigate('/owner/stores/add')}
                    sx={{ textTransform: 'none', fontWeight: 700, borderRadius: '30px' }}
                  >
                    Create Store
                  </Button>
                </Box>
              ) : (
                <Box className={style.Store_Row}>
                  {stores.map((store) => (
                    <Box
                      key={store._id}
                      className={`${style.Store_Card} ${
                        selectedStoreId === store._id ? style.Store_Card_Selected : ''
                      }`}
                      onClick={() => setSelectedStoreId(store._id)}
                    >
                      <Box
                        className={style.Store_Banner_Img}
                        sx={{
                          backgroundImage: store.banner ? `url(${store.banner})` : undefined,
                        }}
                      >
                        <Chip
                          label={store.active ? 'Active' : 'Inactive'}
                          className={`${style.Store_Chip} ${
                            store.active ? style.Store_Chip_Active : style.Store_Chip_Inactive
                          }`}
                        />
                        <Avatar
                          src={store.logo || PLACEHOLDER_LOGO}
                          variant="rounded"
                          className={style.Store_Logo}
                        />
                      </Box>

                      <Box className={style.Store_Body}>
                        <Typography className={style.Store_Name}>{store.storeName}</Typography>
                        {(store.address?.city || store.address?.state) && (
                          <Typography className={style.Store_Meta}>
                            <LocationOnRoundedIcon />
                            {[store.address?.city, store.address?.state].filter(Boolean).join(', ')}
                          </Typography>
                        )}
                        {store.description && (
                          <Typography className={style.Store_Desc}>{store.description}</Typography>
                        )}

                        <Box className={style.Store_Stats}>
                          <Rating
                            readOnly
                            sx={{
                              color: 'yellow',
                              '& .MuiRating-iconEmpty': { color: 'yellow' },
                            }}
                            value={store.rating ?? 0}
                            precision={0.1}
                            size="small"
                          />
                          <Typography className={style.Store_Sales}>
                            <ShoppingBagRoundedIcon />
                            {(store.totalSales ?? 0).toLocaleString()} sales
                          </Typography>
                        </Box>

                        {(store.phone || store.email || store.gstNumber) && (
                          <Box className={style.Store_Details}>
                            {store.phone && (
                              <Box className={style.Store_Detail_Pill}>
                                <CallRoundedIcon />
                                <span>{store.phone}</span>
                              </Box>
                            )}
                            {store.email && (
                              <Box className={style.Store_Detail_Pill}>
                                <EmailRoundedIcon />
                                <span>{store.email}</span>
                              </Box>
                            )}
                            {store.gstNumber && (
                              <Box className={style.Store_Detail_Pill}>
                                <ReceiptLongRoundedIcon />
                                <span>{store.gstNumber}</span>
                              </Box>
                            )}
                          </Box>
                        )}

                        <Button
                          variant="contained"
                          fullWidth
                          endIcon={<ArrowForwardRoundedIcon />}
                          className={style.Start_Btn}
                        >
                          Start Add Products
                        </Button>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  )
}

export default Products
