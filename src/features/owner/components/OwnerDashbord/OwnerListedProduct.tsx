import DeepDetailsOfOwnerCards from '../../common/DeepDetailsOfOwnerCards'
import { Card, Typography } from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import PhotoLibraryOutlinedIcon from '@mui/icons-material/PhotoLibraryOutlined'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import styles from '../../../../styles/ownerStyle/Dashboard.module.css'
import type { OwnerListedProductProps } from '../../types/dashboard.types.js'
import { useState } from 'react'
import type { NotificationInterfacce } from '../../../../auth/types/auth.types.js'
import type { ListedProduct } from '../../types/dashboard.types.js'
import Notification from '../../../../utils/Notification.js'
import Loader from '../../../../utils/Loader.js'
import { apiDelete } from '../../../../api/userApi.js'
import { BASE_PRODUCT } from '../../../../api/endpoints.js'
import CommonDelete from '../../common/CommonDelete.js'
import { useNavigate } from 'react-router-dom'
import EditBaseProduct_ODB from './EditBaseProduct_ODB.js'

type StockStatus = 'in' | 'low' | 'out'

const statusMeta: Record<StockStatus, { label: string; badgeClass: string }> = {
  in: { label: 'In stock', badgeClass: styles.lpBadgeIn },
  low: { label: 'Low stock', badgeClass: styles.lpBadgeLow },
  out: { label: 'Out of stock', badgeClass: styles.lpBadgeOut },
}

const OwnerListedProduct = ({ productListingDetails, onProductUpdated }: OwnerListedProductProps) => {
  const [notification, setNotification] = useState<NotificationInterfacce | null>(null)
  const [loading, setLoading] = useState<boolean | null>(false)
  const productDetails: ListedProduct[] = productListingDetails ?? []
const [isOpenDeletePopUp, setIsOpenDeletePopUp] = useState(false)
const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
const [isOpenEditPopUp, setIsOpenEditPopUp] = useState(false)

  const navigate = useNavigate()
  const inStockCount = productDetails.filter((p) => p.inventory.stockStatus === 'in_stock').length
  const lowStockCount = productDetails.filter((p) => p.inventory.stockStatus === 'low_stock').length
  const outOfStockCount = productDetails.filter(
    (p) => p.inventory.stockStatus === 'out_of_stock',
  ).length

  const cardData = {
    inStockCount,
    lowStockCount,
    outOfStockCount,
    id: 1,
    ListedProductCount: productDetails.length,
  }
  //  <DeepDetailsOfOwnerCards cardData={cardData} />

  const handleClose = () => {
    setIsOpenDeletePopUp(false)
  }

  const handleDeleteProduct = async (selectedProductId: string) => {
    if (!selectedProductId) {
      setNotification({
        open: true,
        message: 'product not found',
        severity: 'info',
      })
      return
    }
    setLoading(true)
    try {
      const response = await apiDelete(BASE_PRODUCT.DELETE_BASE_PRODUCT(selectedProductId))
      setNotification({
        open: true,
        message: 'Product deleted successfully ...',
        severity: 'success',
      })

      // navigate('/owner/dashboard')
       window.location.reload()
     
    } catch (error) {
      setLoading(true)
      setNotification({
        open: true,
        message:
          error instanceof Error
            ? error.message
            : 'Product is not deleted !! please try again ... ',
        severity: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteSelected = () => {
    if (selectedProductId) {
      void handleDeleteProduct(selectedProductId)
      setIsOpenDeletePopUp(false)

    }
  }

  const handleOpenEditSection = (id : string) => {
    setSelectedProductId(id)
    setIsOpenEditPopUp(!isOpenEditPopUp)
  }

  return (
    <>
      <DeepDetailsOfOwnerCards cardData={cardData} />

      <div className={styles.lpWrap}>
        {/* Toolbar: search + filter chips */}
        <div className={styles.lpToolbar}>
          <div className={styles.lpSearchBox}>
            <SearchRoundedIcon fontSize="small" className={styles.lpSearchIcon} />
            <input
              className={styles.lpSearchInput}
              placeholder="Search by product name, SKU, or category"
              readOnly
            />
          </div>

          <div className={styles.lpChips}>
            <span className={`${styles.lpChip} ${styles.lpChipActive}`}>
              All ({productDetails.length})
            </span>
            <span className={styles.lpChip}>In stock ({inStockCount})</span>
            <span className={styles.lpChip}>Low stock ({lowStockCount})</span>
            <span className={styles.lpChip}>Out of stock ({outOfStockCount})</span>
          </div>
        </div>

        {/* Product grid */}
        <div className={styles.lpGrid}>
          {productDetails.map((product) => {
            const meta = statusMeta[product.status as StockStatus]
            return (
              <Card key={product.id} elevation={0} className={styles.lpCard}>
                <div
                  className={`${styles.lpImageWrap} ${product.status === 'out' ? styles.lpImageDim : ''}`}
                >
                  <span className={`${styles.lpBadge}`}>{product?.title}</span>
                  <span className={styles.lpImgCount}>
                    <PhotoLibraryOutlinedIcon fontSize="inherit" />
                  </span>
                </div>

                <div className={styles.lpBody}>
                  <Typography className={styles.lpBreadcrumb}>
                    {product?.shortDescription}
                  </Typography>
                  <Typography className={styles.lpTitle}>{product.title}</Typography>
                  <Typography className={styles.lpSku}>
                    {product.sku} ·{/* {product.pid} */}
                  </Typography>

                  <div className={styles.lpPriceRow}>
                    <span className={styles.lpPrice}>{product?.pricing.sellingPrice}</span>
                    <span className={styles.lpPriceOld}>{product?.pricing.mrp}</span>
                    <span className={styles.lpDiscount}>{product?.pricing.discountPercent}%</span>
                  </div>

                  <div className={styles.lpDivider} />

                  <div className={styles.lpStatsRow}>
                    <div className={styles.lpStat}>
                      <span className={styles.lpStatVal}>{product.inventory.quantity}</span>
                      <span className={styles.lpStatLabel}>In stock</span>
                    </div>
                    <div className={styles.lpStat}>
                      <span className={styles.lpStatVal}>0</span>
                      <span className={styles.lpStatLabel}>Orders (30d)</span>
                    </div>
                    <div className={styles.lpStat}>
                      <span className={styles.lpStatVal}>
                        0
                        <StarRoundedIcon fontSize="inherit" className={styles.lpStar} />
                      </span>
                      <span className={styles.lpStatLabel}>0 reviews</span>
                    </div>
                  </div>

                  <div className={styles.lpActions}>
                    <button type="button" className={styles.lpBtnIcon} aria-label="Delete">
                      <VisibilityOutlinedIcon fontSize="small" />
                    </button>
                    <button
                      type="button"
                      className={styles.lpBtnIcon}
                      aria-label="Delete"
                      onClick={() => {
                        setSelectedProductId(product._id)
                        setIsOpenDeletePopUp(true)
                      }}
                    >
                      <DeleteOutlineRoundedIcon fontSize="small" />
                    </button>
                    <button type="button" className={styles.lpBtnIcon} aria-label="Delete" 
                         onClick={()=>{
                            handleOpenEditSection(product._id)

                          }}>
                      <EditOutlinedIcon fontSize="small" />
                    </button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

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

      {isOpenDeletePopUp && <CommonDelete onClose={handleClose} onDelete={handleDeleteSelected} />}

            {isOpenEditPopUp && (
        <EditBaseProduct_ODB
          open={isOpenEditPopUp}
          onClose={() => setIsOpenEditPopUp(false)}
          id={selectedProductId ?? ''}
          onUpdated={onProductUpdated}
        />
      )}
  
    </>
  )
}

export default OwnerListedProduct
