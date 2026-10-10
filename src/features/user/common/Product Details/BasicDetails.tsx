import { Box } from '@mui/material'
import { Link } from 'react-router-dom'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import DeliveryAndServices from './DeliveryAndServices'
import styles from '../../../../styles/userStyle/ShowSingleProduct.module.css'
import type { Product } from '../../types/common.types.ts'
import { formatINR } from '../../utils/productDisplay.ts'
import { LOW_STOCK_THRESHOLD, PRODUCT_DETAILS_TEXT } from '../../utils/context.ts'

interface BasicDetailsProps {
  product: Product
  availableQuantity: number
  inStock: boolean
}

const BasicDetails = ({ product, availableQuantity, inStock }: BasicDetailsProps) => {
  const { pricing, inventory } = product

  const sellingPrice = pricing?.sellingPrice ?? 0
  const mrp = pricing?.mrp ?? 0
  const discountPercent = pricing?.discountPercent ?? 0
  const lowStockLimit = inventory?.lowStockThreshold ?? LOW_STOCK_THRESHOLD

  const attributes = Object.entries(product.attributes ?? {})
  // `description` sits under the title, so "About this item" only shows the full one
  const description = product.fullDescription

  return (
    <>
      <Box component="section" className={`${styles.section} ${styles.basicDetails}`}>
        <Box component="nav" className={styles.breadcrumb}>
          <Link to="/">{PRODUCT_DETAILS_TEXT.home}</Link>
          {product.productType && (
            <>
              <span>/</span>
              <Box component="span">{product.productType}</Box>
            </>
          )}
          <span>/</span>
          <Box component="span" className={styles.breadcrumbCurrent}>
            {product.title}
          </Box>
        </Box>

        {product.brand && <Box className={styles.brand}>{product.brand}</Box>}

        <Box component="h1" className={styles.title}>
          {product.title}
        </Box>

        {product.shortDescription && (
          <Box className={styles.shortDescription}>{product.shortDescription}</Box>
        )}

        {product.description && (
          <Box className={styles.titleDescription}>{product.description}</Box>
        )}

        <Box className={styles.priceBlock}>
          <Box className={styles.priceRow}>
            <Box className={styles.price}>{formatINR(sellingPrice)}</Box>
            {mrp > sellingPrice && <Box className={styles.mrp}>{formatINR(mrp)}</Box>}
            {discountPercent > 0 && (
              <Box className={styles.offPct}>
                <LocalOfferOutlinedIcon />
                {discountPercent}% off
              </Box>
            )}
          </Box>
          <Box className={styles.taxNote}>
            {mrp > sellingPrice && (
              <>
                {PRODUCT_DETAILS_TEXT.youSave} <strong>{formatINR(mrp - sellingPrice)}</strong>
                {' · '}
              </>
            )}
            {PRODUCT_DETAILS_TEXT.inclusiveOfTaxes}
          </Box>
        </Box>

        <Box className={styles.stockRow}>
          <Box
            component="span"
            className={`${styles.stockPill} ${inStock ? styles.stockIn : styles.stockOut}`}
          >
            {inStock ? PRODUCT_DETAILS_TEXT.inStock : PRODUCT_DETAILS_TEXT.outOfStock}
          </Box>
          {inStock && availableQuantity <= lowStockLimit && (
            <Box component="span" className={styles.lowStock}>
              Only {availableQuantity} left
            </Box>
          )}
        </Box>

        {attributes.length > 0 && (
          <Box className={styles.attributeGrid}>
            {attributes.map(([name, value]) => (
              <Box className={styles.attribute} key={name}>
                <Box className={styles.attributeName}>{name}</Box>
                <Box className={styles.attributeValue}>{value}</Box>
              </Box>
            ))}
          </Box>
        )}

        <DeliveryAndServices product={product} />
      </Box>

      {description && (
        <Box component="section" className={styles.section}>
          <Box component="h2" className={styles.sectionTitle}>
            {PRODUCT_DETAILS_TEXT.aboutThisItem}
          </Box>
          <Box className={styles.description}>{description}</Box>
        </Box>
      )}
    </>
  )
}

export default BasicDetails
