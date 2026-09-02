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

type StockStatus = 'in' | 'low' | 'out'

interface Product {
  id: number
  breadcrumb: string
  title: string
  sku: string
  pid: string
  price: string
  originalPrice: string
  discount: string
  stock: number
  orders: number
  rating: number
  reviews: number
  images: number
  status: StockStatus
  imgBg: string
}

const products: Product[] = [
  {
    id: 1,
    breadcrumb: 'HOME / LIVING ROOM / SOFAS',
    title: 'Nimbus 3-Seater Fabric Sofa, Charcoal Weave',
    sku: 'SKU NIM-SOF-CHR-3S',
    pid: 'PRD-10432',
    price: '₹32,999',
    originalPrice: '₹44,999',
    discount: '27% off',
    stock: 42,
    orders: 311,
    rating: 4.6,
    reviews: 212,
    images: 3,
    status: 'in',
    imgBg: 'linear-gradient(160deg, #2f5c50, #163229)',
  },
  {
    id: 2,
    breadcrumb: 'FASHION / FOOTWEAR / SPORTS',
    title: "AeroFit Running Shoes, Men's UK 6–11",
    sku: 'SKU AF-RUN-BLK-MU',
    pid: 'PRD-20117',
    price: '₹1,899',
    originalPrice: '₹2,999',
    discount: '37% off',
    stock: 6,
    orders: 902,
    rating: 4.3,
    reviews: 518,
    images: 2,
    status: 'low',
    imgBg: 'linear-gradient(160deg, #b3121f, #6e0d17)',
  },
  {
    id: 3,
    breadcrumb: 'ELECTRONICS / HOME OFFICE / LIGHTING',
    title: 'Lumen Pro Desk Lamp with Wireless Charger',
    sku: 'SKU LUM-LMP-WHT-PRO',
    pid: 'PRD-30284',
    price: '₹1,449',
    originalPrice: '₹1,899',
    discount: '24% off',
    stock: 120,
    orders: 188,
    rating: 4.7,
    reviews: 96,
    images: 3,
    status: 'in',
    imgBg: 'linear-gradient(160deg, #d9d9dd, #aeaeb6)',
  },
  {
    id: 4,
    breadcrumb: 'HOME / KITCHEN / COOKWARE',
    title: 'Terra Ceramic Cookware Set, 5 Pieces',
    sku: 'SKU TRR-CKW-SET5',
    pid: 'PRD-40556',
    price: '₹3,299',
    originalPrice: '₹5,499',
    discount: '40% off',
    stock: 0,
    orders: 276,
    rating: 4.4,
    reviews: 151,
    images: 2,
    status: 'out',
    imgBg: 'linear-gradient(160deg, #3a3a40, #1c1c20)',
  }
]

const statusMeta: Record<StockStatus, { label: string; badgeClass: string }> = {
  in: { label: 'In stock', badgeClass: styles.lpBadgeIn },
  low: { label: 'Low stock', badgeClass: styles.lpBadgeLow },
  out: { label: 'Out of stock', badgeClass: styles.lpBadgeOut },
}

const OwnerListedProduct = ({ productListingDetails }: OwnerListedProductProps) => {
  const inStockCount = products.filter((p) => p.status === 'in').length
  const lowStockCount = products.filter((p) => p.status === 'low').length
  const outOfStockCount = products.filter((p) => p.status === 'out').length

  return (
    <>
      <DeepDetailsOfOwnerCards />

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
            <span className={`${styles.lpChip} ${styles.lpChipActive}`}>All ({products.length})</span>
            <span className={styles.lpChip}>In stock ({inStockCount})</span>
            <span className={styles.lpChip}>Low stock ({lowStockCount})</span>
            <span className={styles.lpChip}>Out of stock ({outOfStockCount})</span>
          </div>
        </div>

        {/* Product grid */}
        <div className={styles.lpGrid}>
          {products.map((product) => {
            const meta = statusMeta[product.status]
            return (
              <Card key={product.id} elevation={0} className={styles.lpCard}>
                <div
                  className={`${styles.lpImageWrap} ${product.status === 'out' ? styles.lpImageDim : ''}`}
                  style={{ background: product.imgBg }}
                >
                  <span className={`${styles.lpBadge} ${meta.badgeClass}`}>{meta.label}</span>
                  <span className={styles.lpImgCount}>
                    <PhotoLibraryOutlinedIcon fontSize="inherit" /> {product.images}
                  </span>
                </div>

                <div className={styles.lpBody}>
                  <Typography className={styles.lpBreadcrumb}>{product.breadcrumb}</Typography>
                  <Typography className={styles.lpTitle}>{product.title}</Typography>
                  <Typography className={styles.lpSku}>
                    {product.sku} · {product.pid}
                  </Typography>

                  <div className={styles.lpPriceRow}>
                    <span className={styles.lpPrice}>{product.price}</span>
                    <span className={styles.lpPriceOld}>{product.originalPrice}</span>
                    <span className={styles.lpDiscount}>{product.discount}</span>
                  </div>

                  <div className={styles.lpDivider} />

                  <div className={styles.lpStatsRow}>
                    <div className={styles.lpStat}>
                      <span className={styles.lpStatVal}>{product.stock}</span>
                      <span className={styles.lpStatLabel}>In stock</span>
                    </div>
                    <div className={styles.lpStat}>
                      <span className={styles.lpStatVal}>{product.orders}</span>
                      <span className={styles.lpStatLabel}>Orders (30d)</span>
                    </div>
                    <div className={styles.lpStat}>
                      <span className={styles.lpStatVal}>
                        {product.rating}
                        <StarRoundedIcon fontSize="inherit" className={styles.lpStar} />
                      </span>
                      <span className={styles.lpStatLabel}>{product.reviews} reviews</span>
                    </div>
                  </div>

                  <div className={styles.lpActions}>
                    <button type="button" className={styles.lpBtn}>
                      <VisibilityOutlinedIcon fontSize="small" /> View details
                    </button>
                    <button type="button" className={styles.lpBtn}>
                      <EditOutlinedIcon fontSize="small" /> Edit
                    </button>
                    <button type="button" className={styles.lpBtnIcon} aria-label="Delete">
                      <DeleteOutlineRoundedIcon fontSize="small" />
                    </button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default OwnerListedProduct
