import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import MoveToInboxOutlinedIcon from '@mui/icons-material/MoveToInboxOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined'
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import VerifiedIcon from '@mui/icons-material/Verified'
import GppGoodIcon from '@mui/icons-material/GppGood'
import { apiGet } from '../../../api/userApi'
import { USER_HOME_PAGE_CARDS } from '../../../api/endpoints'
import styles from '../../../styles/userStyle/Cart.module.css'
import Header from './Header'
import MobileBottomNav from './MobileBottomNav'
import Loader from '../../../utils/Loader'
import Notification from '../../../utils/Notification'
import { getAuthSession } from '../../../utils/authStorage'
import type { NotificationInterfacce } from '../../../auth/types/auth.types'
import type { Product } from '../types/common.types'
import { formatINR, getDeliveryCharge, getProductImage } from '../utils/productDisplay.ts'
import {
  CART_DELIVERY_DAYS,
  CART_MAX_QUANTITY,
  CART_TEXT,
  CART_TOP_DISCOUNT_PERCENT,
  DEFAULT_ERROR_MESSAGE,
  PRODUCT_DETAILS_TEXT,
} from '../utils/context.ts'

// The API sends each product with the quantity saved in the cart
type CartItem = Omit<Product, 'quantity'> & { quantity: number }

// e.g. "Oct 30, Fri"
const getDeliveryDate = (): string => {
  const date = new Date()
  date.setDate(date.getDate() + CART_DELIVERY_DAYS)
  const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' })
  return `${monthDay}, ${weekday}`
}

const Cart = () => {
  const navigate = useNavigate()

  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [notification, setNotification] = useState<NotificationInterfacce | null>(null)
  const [showFees, setShowFees] = useState(false)
  const [showDiscounts, setShowDiscounts] = useState(false)

  const userId = getAuthSession<{ _id: string }>()?.user?._id

  useEffect(() => {
    const fetchCartItems = async (userId: string | undefined) => {
      if (!userId) {
        setLoading(false)
        setNotification({
          open: true,
          message: CART_TEXT.loginRequired,
          severity: 'warning',
        })
        return
      }

      try {
        setLoading(true)
        const response = await apiGet<{ data: CartItem[] }>(USER_HOME_PAGE_CARDS.SHOW_CART(userId))
        setCartItems(response.data ?? [])
      } catch (error) {
        setCartItems([])

        // The API answers 409 when the cart is empty -> show the empty state, not an error
        if ((error as { status?: number })?.status === 409) return

        setNotification({
          open: true,
          message: error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE,
          severity: 'error',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCartItems(userId)
  }, [userId])

  // Quantity is only changed on this page for now (no update-cart API yet)
  const handleQuantityChange = (productId: string, quantity: number) => {
    setCartItems((items) =>
      items.map((item) => (item._id === productId ? { ...item, quantity } : item)),
    )
  }

  const showComingSoon = () => {
    setNotification({
      open: true,
      message: CART_TEXT.comingSoon,
      severity: 'info',
    })
  }

  const deliveryDate = getDeliveryDate()

  const totalMrp = cartItems.reduce(
    (sum, item) => sum + (item.pricing?.mrp || item.pricing?.sellingPrice || 0) * item.quantity,
    0,
  )
  const totalSellingPrice = cartItems.reduce(
    (sum, item) => sum + (item.pricing?.sellingPrice ?? 0) * item.quantity,
    0,
  )
  const totalDiscount = totalMrp - totalSellingPrice
  const deliveryCharge = cartItems.length > 0 ? getDeliveryCharge(totalSellingPrice) : 0
  const totalAmount = totalSellingPrice + deliveryCharge

  return (
    <div className={styles.root}>
      <Header />

      <Box component="main" className={styles.page}>
        <Box className={styles.container}>
          <Box className={styles.headingRow}>
            <IconButton
              size="small"
              className={styles.backBtn}
              aria-label={CART_TEXT.back}
              onClick={() => {
                navigate(-1)
              }}
            >
              <ArrowBackIcon fontSize="small" />
            </IconButton>
            <Box component="h1" className={styles.heading}>
              {CART_TEXT.title}
            </Box>
            {cartItems.length > 0 && (
              <Box component="span" className={styles.count}>
                {cartItems.length}
              </Box>
            )}
          </Box>

          {cartItems.length > 0 && (
            <Box className={styles.layout}>
              {/* Left: delivery address + cart items */}
              <Box className={styles.itemList}>
                <Box className={styles.addressBar}>
                  <span>{CART_TEXT.fromSavedAddresses}</span>
                  <Button className={styles.pincodeBtn} onClick={showComingSoon}>
                    {CART_TEXT.enterPincode}
                  </Button>
                </Box>

                {cartItems.map((item) => {
                  const sellingPrice = item.pricing?.sellingPrice ?? 0
                  const mrp = item.pricing?.mrp ?? 0
                  const discountPercent = item.pricing?.discountPercent ?? 0
                  const inStock = item.inventory?.stockStatus !== 'out_of_stock'
                  const maxQuantity = Math.max(
                    Math.min(item.availableQuantity || CART_MAX_QUANTITY, CART_MAX_QUANTITY),
                    item.quantity,
                  )
                  const openProduct = () => navigate(`/Productdetails/${item._id}`)

                  return (
                    <Box className={styles.item} key={item._id}>
                      <Box className={styles.itemBody}>
                        {discountPercent >= CART_TOP_DISCOUNT_PERCENT && (
                          <Box component="span" className={styles.topDiscountBadge}>
                            {CART_TEXT.topDiscount}
                          </Box>
                        )}

                        <Box className={styles.itemMain}>
                          <Box className={styles.leftCol}>
                            <Box className={styles.imageWrap} onClick={openProduct}>
                              <Box
                                component="img"
                                className={styles.image}
                                src={getProductImage(item as Product)}
                                alt={item.title}
                                loading="lazy"
                              />
                            </Box>

                            <select
                              className={styles.qtySelect}
                              value={item.quantity}
                              aria-label={CART_TEXT.quantity}
                              onChange={(event) => {
                                handleQuantityChange(item._id, Number(event.target.value))
                              }}
                            >
                              {Array.from({ length: maxQuantity }, (_, i) => i + 1).map((qty) => (
                                <option key={qty} value={qty}>
                                  {CART_TEXT.quantity}: {qty}
                                </option>
                              ))}
                            </select>
                          </Box>

                          <Box className={styles.info}>
                            <Box className={styles.title} onClick={openProduct}>
                              {item.brand ? `${item.brand} ${item.title}` : item.title}
                            </Box>
                            {item.variantName && (
                              <Box className={styles.variant}>{item.variantName}</Box>
                            )}
                            {!inStock && (
                              <Box className={styles.outOfStock}>{CART_TEXT.outOfStock}</Box>
                            )}

                            <Box className={styles.priceRow}>
                              {discountPercent > 0 && (
                                <Box className={styles.offPct}>
                                  <ArrowDownwardIcon className={styles.offArrow} />
                                  {discountPercent}%
                                </Box>
                              )}
                              {mrp > sellingPrice && (
                                <Box className={styles.mrp}>{formatINR(mrp)}</Box>
                              )}
                              <Box className={styles.price}>{formatINR(sellingPrice)}</Box>
                            </Box>
                          </Box>
                        </Box>

                        <Box className={styles.deliveryRow}>
                          {CART_TEXT.deliveryBy} {deliveryDate}
                        </Box>
                      </Box>

                      <Box className={styles.actionBar}>
                        <Button className={styles.actionBtn} onClick={showComingSoon}>
                          <MoveToInboxOutlinedIcon fontSize="small" />
                          {CART_TEXT.saveForLater}
                        </Button>
                        <Button className={styles.actionBtn} onClick={showComingSoon}>
                          <DeleteOutlineIcon fontSize="small" />
                          {CART_TEXT.remove}
                        </Button>
                        <Button
                          className={`${styles.actionBtn} ${styles.buyNowAction}`}
                          onClick={openProduct}
                        >
                          <BoltOutlinedIcon fontSize="small" />
                          {CART_TEXT.buyThisNow}
                        </Button>
                      </Box>
                    </Box>
                  )
                })}
              </Box>

              {/* Right: price summary */}
              <Box className={styles.summaryCol}>
                <Box component="h2" className={styles.summaryTitle}>
                  {CART_TEXT.priceDetails}
                </Box>

                <Box className={styles.summary}>
                  <Box className={styles.summaryRow}>
                    <span className={styles.dottedLabel}>{CART_TEXT.mrpInclTaxes}</span>
                    <span>{formatINR(totalMrp)}</span>
                  </Box>

                  <Box
                    className={`${styles.summaryRow} ${styles.toggleRow}`}
                    onClick={() => setShowFees((open) => !open)}
                  >
                    <span className={styles.toggleLabel}>
                      {CART_TEXT.fees}
                      {showFees ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </span>
                    <span>{formatINR(deliveryCharge)}</span>
                  </Box>
                  {showFees && (
                    <Box className={styles.subRow}>
                      <span>{CART_TEXT.deliveryCharges}</span>
                      {deliveryCharge === 0 ? (
                        <span className={styles.green}>{PRODUCT_DETAILS_TEXT.free}</span>
                      ) : (
                        <span>{formatINR(deliveryCharge)}</span>
                      )}
                    </Box>
                  )}

                  <Box
                    className={`${styles.summaryRow} ${styles.toggleRow} ${styles.dashedTop}`}
                    onClick={() => setShowDiscounts((open) => !open)}
                  >
                    <span className={styles.toggleLabel}>
                      {CART_TEXT.discounts}
                      {showDiscounts ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </span>
                    <span className={styles.green}>- {formatINR(totalDiscount)}</span>
                  </Box>
                  {showDiscounts && (
                    <Box className={styles.subRow}>
                      <span>{CART_TEXT.discountOnMrp}</span>
                      <span className={styles.green}>- {formatINR(totalDiscount)}</span>
                    </Box>
                  )}

                  <Box className={`${styles.summaryRow} ${styles.totalRow}`}>
                    <span>{CART_TEXT.totalAmount}</span>
                    <span>{formatINR(totalAmount)}</span>
                  </Box>

                  {totalDiscount > 0 && (
                    <Box className={styles.saveNote}>
                      <VerifiedIcon fontSize="small" />
                      <span>
                        {CART_TEXT.youWillSave} <strong>{formatINR(totalDiscount)}</strong>{' '}
                        {CART_TEXT.onThisOrder}
                      </span>
                    </Box>
                  )}
                </Box>

                <Box className={styles.secureNote}>
                  <GppGoodIcon className={styles.secureIcon} />
                  <span>{CART_TEXT.securePayments}</span>
                </Box>

                <Box className={styles.placeOrderBar}>
                  <Box>
                    {totalMrp > totalAmount && (
                      <Box className={styles.barMrp}>{formatINR(totalMrp)}</Box>
                    )}
                    <Box className={styles.barTotal}>{formatINR(totalAmount)}</Box>
                  </Box>
                  <Button className={styles.placeOrderBtn} onClick={showComingSoon}>
                    {CART_TEXT.placeOrder}
                  </Button>
                </Box>
              </Box>
            </Box>
          )}

          {cartItems.length === 0 && !loading && (
            <Box className={styles.empty}>
              <ShoppingCartOutlinedIcon className={styles.emptyIcon} />
              <Box className={styles.emptyTitle}>{CART_TEXT.empty}</Box>
              <Box className={styles.emptySubtitle}>{CART_TEXT.emptySubtitle}</Box>
              <Button className={styles.placeOrderBtn} onClick={() => navigate('/')}>
                {CART_TEXT.shopNow}
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      <MobileBottomNav />
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

export default Cart
