import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button } from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import BoltIcon from '@mui/icons-material/Bolt'
import { apiGet } from '../../../../api/userApi'
import { USER_HOME_PAGE_CARDS } from '../../../../api/endpoints'
import styles from '../../../../styles/userStyle/ShowSingleProduct.module.css'
import Header from '../../common/Header'
import MobileBottomNav from '../../common/MobileBottomNav'
import Images from '../../common/Product Details/Images'
import BasicDetails from '../../common/Product Details/BasicDetails'
import HeightLigts from '../../common/Product Details/HeightLigts'
import Features from '../../common/Product Details/Features'
import WhatsIncluded from '../../common/Product Details/WhatsIncluded'
import Specification from '../../common/Product Details/Specification'
import type { SpecificationRow } from '../../common/Product Details/Specification'
import Tags from '../../common/Product Details/Tags'
import Loader from '../../../../utils/Loader'
import Notification from '../../../../utils/Notification'
import type { NotificationInterfacce } from '../../../../auth/types/auth.types.ts'
import type {
  Image,
  Product,
  Specification as SpecificationItem,
} from '../../types/common.types.ts'
import { DEFAULT_ERROR_MESSAGE, PRODUCT_DETAILS_TEXT } from '../../utils/context.ts'

// The API sends the product fields inside `_doc` and the images next to it
type SingleProductResponse = Partial<Product> & { _doc?: Product; images?: Image[] }

const getExtraSpecificationRows = (product: Product): SpecificationRow[] => {
  const { weight, dimensions } = product

  const rows: SpecificationRow[] = [
    { name: 'Brand', value: product.brand },
    { name: 'Model', value: product.modelName },
    { name: 'Model Number', value: product.modelNumber },
    { name: 'Manufacturer', value: product.manufacturer },
    { name: 'Country of Origin', value: product.countryOfOrigin },
    { name: 'Weight', value: weight?.value ? `${weight.value} ${weight.unit}` : '' },
    {
      name: 'Dimensions (L x W x H)',
      value: dimensions?.length
        ? `${dimensions.length} x ${dimensions.width} x ${dimensions.height} ${dimensions.unit}`
        : '',
    },
    { name: 'SKU', value: product.sku },
  ]

  return rows.filter((row) => row.value)
}

const ShowCardDetails = () => {
  const { productId } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState<Product | null>(null)
  const [images, setImages] = useState<Image[]>([])
  const [highlights, setHighlights] = useState<string[]>([])
  const [features, setFeatures] = useState<string[]>([])
  const [whatsIncluded, setWhatsIncluded] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [specification, setSpecification] = useState<SpecificationItem[]>([])
  const [loading, setLoading] = useState(true)
  const [notification, setNotification] = useState<NotificationInterfacce | null>(null)

  useEffect(() => {
    const fetchSingleProductDetails = async (productId: string) => {
      try {
        setLoading(true)
        const response = await apiGet<{ data: SingleProductResponse }>(
          USER_HOME_PAGE_CARDS.GET_SINGLE_CARD(productId),
        )

        const data = response.data
        const details = (data?._doc ?? data) as Product

        // Main product
        setProduct(details)

        // Product images
        setImages(data?.images ?? [])

        // Product highlights
        setHighlights(details.highlights ?? [])

        // Product features
        setFeatures(details.features ?? [])

        // What's included
        setWhatsIncluded(details.whatsIncluded ?? [])

        // Product tags
        setTags(details.tags ?? [])

        // Product specifications
        setSpecification(details.specifications ?? [])
      } catch (error) {
        setProduct(null)
        setNotification({
          open: true,
          message: error instanceof Error ? error.message : DEFAULT_ERROR_MESSAGE,
          severity: 'error',
        })
      } finally {
        setLoading(false)
      }
    }

    if (productId) {
      fetchSingleProductDetails(productId)
    }
  }, [productId])

  const inventory = product?.inventory
  const availableQuantity =
    product?.availableQuantity ??
    Math.max((inventory?.quantity ?? 0) - (inventory?.reservedQuantity ?? 0), 0)
  const inStock = inventory?.stockStatus === 'in_stock' && availableQuantity > 0

  return (
    <div className={styles.root}>
      <Header />

      <Box component="main" className={styles.page}>
        {product && (
          <Box className={styles.container} key={product._id}>
            {/* Left: stays in place, never scrolls */}
            <Box className={styles.leftColumn}>
              <Images
                images={images}
                title={product.title}
                discountPercent={product.pricing?.discountPercent}
              />
              <Box className={styles.actionRow}>
                <Button className={styles.addToCartBtn} disabled={!inStock}>
                  <ShoppingCartOutlinedIcon fontSize="small" />
                  {PRODUCT_DETAILS_TEXT.addToCart}
                </Button>
                <Button className={styles.buyNowBtn} disabled={!inStock}>
                  <BoltIcon fontSize="small" />
                  {PRODUCT_DETAILS_TEXT.buyNow}
                </Button>
              </Box>
            </Box>

            {/* Right: all the details scroll here */}
            <Box className={styles.rightColumn}>
              <BasicDetails
                product={product}
                availableQuantity={availableQuantity}
                inStock={inStock}
              />
              <HeightLigts highlights={highlights} />
              <Box className={styles.twoColumn}>
                <Features features={features} />
                <WhatsIncluded whatsIncluded={whatsIncluded} />
              </Box>
              <Specification
                specification={specification}
                extraRows={getExtraSpecificationRows(product)}
              />
              <Tags tags={tags} />
            </Box>
          </Box>
        )}

        {!product && !loading && (
          <Box className={styles.emptyState}>
            <Box component="h1" className={styles.emptyTitle}>
              {PRODUCT_DETAILS_TEXT.notFound}
            </Box>
            <Button className={styles.addToCartBtn} onClick={() => navigate('/')}>
              {PRODUCT_DETAILS_TEXT.backToHome}
            </Button>
          </Box>
        )}
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

export default ShowCardDetails
