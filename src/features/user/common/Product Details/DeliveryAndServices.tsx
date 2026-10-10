import { useState } from 'react'
import type { ReactNode } from 'react'
import { Box } from '@mui/material'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import ReplayIcon from '@mui/icons-material/Replay'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import styles from '../../../../styles/userStyle/ShowSingleProduct.module.css'
import type { Product } from '../../types/common.types.ts'
import { formatINR, getDeliveryCharge } from '../../utils/productDisplay.ts'
import { FREE_DELIVERY_ABOVE, PRODUCT_DETAILS_TEXT } from '../../utils/context.ts'

type ServiceKey = 'delivery' | 'return' | 'warranty'

interface ServiceCard {
  key: ServiceKey
  icon: ReactNode
  title: string
  subtitle: string
}

interface DeliveryAndServicesProps {
  product: Product
}

// "years" + 1 -> "Year", "years" + 2 -> "Years"
const formatDuration = (count: number, unit: string): string => {
  const singular = unit.replace(/s$/i, '')
  return `${count} ${count === 1 ? singular : `${singular}s`}`
}

const DeliveryAndServices = ({ product }: DeliveryAndServicesProps) => {
  const [activeKey, setActiveKey] = useState<ServiceKey>('delivery')

  const { warranty } = product
  const price = product.pricing?.sellingPrice ?? 0
  const deliveryCharge = getDeliveryCharge(price)
  const isFreeDelivery = deliveryCharge === 0
  const freeDeliveryProgress = Math.min((price / FREE_DELIVERY_ABOVE) * 100, 100)

  const hasReturn = product.returnDays > 0
  const hasWarranty = warranty?.duration > 0

  const cards: ServiceCard[] = [
    {
      key: 'delivery',
      icon: <LocalShippingOutlinedIcon />,
      title: isFreeDelivery
        ? PRODUCT_DETAILS_TEXT.freeDelivery
        : `${formatINR(deliveryCharge)} ${PRODUCT_DETAILS_TEXT.delivery}`,
      subtitle: isFreeDelivery
        ? `On products above ${formatINR(FREE_DELIVERY_ABOVE)}`
        : `Free above ${formatINR(FREE_DELIVERY_ABOVE)}`,
    },
  ]

  if (hasReturn) {
    cards.push({
      key: 'return',
      icon: <ReplayIcon />,
      title: `${formatDuration(product.returnDays, 'days')} ${PRODUCT_DETAILS_TEXT.returnTitle}`,
      subtitle: 'Easy return policy',
    })
  }

  if (hasWarranty) {
    cards.push({
      key: 'warranty',
      icon: <VerifiedUserOutlinedIcon />,
      title: `${formatDuration(warranty.duration, warranty.unit)} ${PRODUCT_DETAILS_TEXT.warranty}`,
      subtitle: `${warranty.type} warranty`,
    })
  }

  return (
    <Box className={styles.services}>
      <Box className={styles.servicesHeading}>{PRODUCT_DETAILS_TEXT.deliveryAndServices}</Box>

      <Box className={styles.serviceTabs} role="tablist">
        {cards.map((card) => (
          <Box
            key={card.key}
            component="button"
            type="button"
            role="tab"
            aria-selected={card.key === activeKey}
            className={`${styles.serviceCard} ${card.key === activeKey ? styles.serviceCardActive : ''}`}
            onClick={() => setActiveKey(card.key)}
          >
            <Box component="span" className={styles.serviceIcon}>
              {card.icon}
            </Box>
            <Box component="span" className={styles.serviceText}>
              <Box component="span" className={styles.serviceTitle}>
                {card.title}
              </Box>
              <Box component="span" className={styles.serviceSubtitle}>
                {card.subtitle}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      {/* key restarts the fade-in each time the tab changes */}
      <Box className={styles.servicePanel} role="tabpanel" key={activeKey}>
        {activeKey === 'delivery' && (
          <>
            <Box className={styles.serviceRow}>
              <span>{PRODUCT_DETAILS_TEXT.itemPrice}</span>
              <strong>{formatINR(price)}</strong>
            </Box>
            <Box className={styles.serviceRow}>
              <span>{PRODUCT_DETAILS_TEXT.deliveryCharge}</span>
              {isFreeDelivery ? (
                <strong className={styles.freeText}>{PRODUCT_DETAILS_TEXT.free}</strong>
              ) : (
                <strong>{formatINR(deliveryCharge)}</strong>
              )}
            </Box>
            <Box className={`${styles.serviceRow} ${styles.serviceTotalRow}`}>
              <span>{PRODUCT_DETAILS_TEXT.totalPayable}</span>
              <strong>{formatINR(price + deliveryCharge)}</strong>
            </Box>

            <Box className={styles.deliveryProgress}>
              <Box className={styles.progressTrack}>
                <Box
                  className={styles.progressFill}
                  style={{ width: `${freeDeliveryProgress}%` }}
                />
              </Box>
              <Box className={styles.progressNote}>
                {isFreeDelivery
                  ? `This product is above ${formatINR(FREE_DELIVERY_ABOVE)}, so delivery is free.`
                  : `Delivery is free on products above ${formatINR(FREE_DELIVERY_ABOVE)}.`}
              </Box>
            </Box>
          </>
        )}

        {activeKey === 'return' && (
          <>
            <Box className={styles.serviceRow}>
              <span>{PRODUCT_DETAILS_TEXT.returnWindow}</span>
              <strong>{formatDuration(product.returnDays, 'days')}</strong>
            </Box>
            {product.returnPolicy && (
              <Box className={styles.serviceNote}>{product.returnPolicy}</Box>
            )}
          </>
        )}

        {activeKey === 'warranty' && (
          <>
            <Box className={styles.serviceRow}>
              <span>{PRODUCT_DETAILS_TEXT.warrantyPeriod}</span>
              <strong>{formatDuration(warranty.duration, warranty.unit)}</strong>
            </Box>
            {warranty.type && (
              <Box className={styles.serviceRow}>
                <span>{PRODUCT_DETAILS_TEXT.warrantyType}</span>
                <strong>{warranty.type}</strong>
              </Box>
            )}
            {warranty.description && (
              <Box className={styles.serviceNote}>{warranty.description}</Box>
            )}
          </>
        )}
      </Box>
    </Box>
  )
}

export default DeliveryAndServices
