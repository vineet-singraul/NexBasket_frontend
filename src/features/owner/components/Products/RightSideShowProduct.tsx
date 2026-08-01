import { Box, Typography, Avatar, Chip, IconButton, Tooltip, CircularProgress } from '@mui/material'
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded'
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded'
import QrCode2RoundedIcon from '@mui/icons-material/QrCode2Rounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'

import categoryStyles from '../../../../styles/ownerStyle/AddCategury.module.css'
import style from '../../../../styles/ownerStyle/AddProducts.module.css'
import type { Product } from '../../types/product.types'
import type { CategoryListItem } from '../../types/category.types'
import { useState } from 'react'
import ShowProductDetailsPopUp from '../common/ShowProductDetailsPopUp'
import { apiDelete } from '../../../../api/userApi'
import { PRODUCT_ENDPOINTS } from '../../../../api/endpoints'
import type {NotificationInterfacce} from "../../../../auth/types/auth.types"
import Notification from '../../../../utils/Notification'

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/80'

type StockStatus = 'in' | 'low' | 'out'

const STOCK_LABEL: Record<StockStatus, string> = {
  in: 'In Stock',
  low: 'Low Stock',
  out: 'Out of Stock',
}

const getStockStatus = (stock: string | number): StockStatus => {
  const value = Number(stock) || 0
  if (value <= 0) return 'out'
  if (value < 10) return 'low'
  return 'in'
}

const getStockChipClass = (status: StockStatus) => {
  if (status === 'in') return categoryStyles.AC_statusActive
  if (status === 'low') return style.RP_stockLow
  return categoryStyles.AC_statusInactive
}

interface RightSideShowProductProps {
  products: Product[]
  categories: CategoryListItem[]
  onProductDeleted: (id: string) => void
}

const RightSideShowProduct = ({ products, categories, onProductDeleted }: RightSideShowProductProps) => {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [notification, setNotification] = useState<NotificationInterfacce>({
    open: false,
    message: '',
    severity: 'success',
  })
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const getCategoryName = (categoryId: string) =>
    categories.find((c) => c._id === categoryId)?.productCategory ?? categoryId;

  const handleClickOpen = (product: Product) => {
    setSelectedProduct(product);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  const handleDelete = async (id?: string) => {
     if (!id) return
     setDeletingId(id)
     try {
       const response = await apiDelete(PRODUCT_ENDPOINTS.DELETE(id))
       const deleteMessage =
         typeof response === 'object' && response !== null && 'message' in response
           ? String((response as { message?: string }).message ?? 'failed')
           : 'failed'

       onProductDeleted(id)
       setNotification({
         open: true,
         message: deleteMessage,
         severity: 'success'
       })
     } catch (error) {
      setNotification({
        open:true,
        message: error instanceof Error ? error.message : 'Failed to delete product',
        severity:"error"
      })
     }finally{
      setDeletingId(null)
     }
  }


  return (
    <Box className={style.RP_wrapper}>
      <Box className={categoryStyles.AC_panelHeader}>
        <Box className={categoryStyles.AC_panelIcon}>
          <Inventory2RoundedIcon />
        </Box>
        <Box>
          <Typography className={categoryStyles.AC_panelTitle}>Your Products</Typography>
          <Typography className={categoryStyles.AC_panelSubtitle}>
            {products.length} products listed
          </Typography>
        </Box>
      </Box>

      {products.length === 0 ? (
        <Box className={categoryStyles.AC_emptyState}>
          <Box className={categoryStyles.AC_emptyIconWrap}>
            <Inventory2RoundedIcon />
          </Box>
          <Typography className={categoryStyles.AC_emptyTitle}>No products yet</Typography>
          <Typography className={categoryStyles.AC_emptyDesc}>
            Products you add will show up here for quick reference.
          </Typography>
        </Box>
      ) : (
        <Box className={categoryStyles.AC_listBody}>
          {products.map((product) => {
            const stockStatus = getStockStatus(product.stock)
            return (
              <Box className={categoryStyles.AC_categoryCard} key={product._id ?? product.sku}>
                <Avatar src={PLACEHOLDER_IMAGE} variant="rounded" className={style.RP_thumb} />

                <Box className={categoryStyles.AC_categoryInfo}>
                  <Typography className={categoryStyles.AC_categoryName}>
                    {product.name}
                  </Typography>
                  <Typography className={style.RP_brand}>{product.brand}</Typography>

                  <Box className={style.RP_priceRow}>
                    <Typography className={style.RP_price}>₹{product.price}</Typography>
                    <Typography className={style.RP_mrp}>₹{product.mrp}</Typography>
                    <Chip
                      label={`${product.discountPercent}% OFF`}
                      className={`${categoryStyles.AC_statusChip} ${style.RP_discountChip}`}
                    />
                  </Box>

                  <Box className={categoryStyles.AC_detailsRow}>
                    <Box className={categoryStyles.AC_detailPill}>
                      <CategoryRoundedIcon />
                      <span>{getCategoryName(product.category)}</span>
                    </Box>
                    <Box className={categoryStyles.AC_detailPill}>
                      <QrCode2RoundedIcon />
                      <span>{product.sku}</span>
                    </Box>
                  </Box>
                </Box>

                <Box className={categoryStyles.AC_cardSide}>
                  <Chip
                    label={STOCK_LABEL[stockStatus]}
                    className={`${categoryStyles.AC_statusChip} ${getStockChipClass(stockStatus)}`}
                  />
                  <Box className={categoryStyles.AC_cardActions}>
                    <Tooltip title="View Details">
                      <IconButton size="small" className={categoryStyles.AC_actionBtn} onClick={() => handleClickOpen(product)}>
                        <VisibilityRoundedIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Product">
                      <IconButton size="small" className={categoryStyles.AC_actionBtn}>
                        <EditRoundedIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Product">
                      <IconButton
                        size="small"
                        className={`${categoryStyles.AC_actionBtn} ${categoryStyles.AC_actionBtnDanger}`}
                        onClick={()=>{handleDelete(product._id)}}
                        disabled={deletingId === product._id}
                      >
                        {deletingId === product._id ? (
                          <CircularProgress size={15} aria-label="Loading…" />
                        ) : (
                          <DeleteRoundedIcon />
                        )}
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              </Box>
            )
          })}
        </Box>
      )}

     {open && (
       <ShowProductDetailsPopUp
         open={open}
         handleClose={handleClose}
         product={selectedProduct}
         categoryName={selectedProduct ? getCategoryName(selectedProduct.category) : ''}
       />
     )}

     {notification && <Notification 
      open={notification.open}
      message={notification.message}
      severity={notification.severity}
      onClose={() => {
        setNotification((prev) => ({ ...prev, open: false }))
      }}
     />}
    </Box>
  )
}

export default RightSideShowProduct
