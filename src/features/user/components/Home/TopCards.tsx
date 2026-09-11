import { Box, Paper, Typography, IconButton } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import styles from '../../../../styles/userStyle/homePage.module.css'
import type { Product } from '../../types/common.types.ts'
import { getProductImage } from '../../utils/productDisplay.ts'

interface TopCardsProps {
  womans: Product[]
  mans: Product[]
  electranics: Product[]
}

interface PromoCard {
  title: string
  products: Product[]
}

const TopCards = ({ womans, mans, electranics }: TopCardsProps) => {
  const promoCards: PromoCard[] = [
    { title: "Customers' Most-Loved Fashion for you", products: womans },
    { title: 'Minimum 60% off | Innerwear for all', products: mans },
    { title: 'Up to 80% off on Home improvements + 10% Assured cashback', products: electranics },
    { title: 'Lowest prices on NexBasket + Extra 15% cashback', products: electranics },
  ]

  return (
    <Box component="section" className={styles.topCardsSection}>
      <Box className={styles.cardsRow}>
        {promoCards.map((promo) => (
          <Paper elevation={0} className={styles.card} key={promo.title}>
            <Box className={styles.cardHeader}>
              <Typography component="h3" variant="inherit" className={styles.cardTitle}>
                {promo.title}
              </Typography>
              <IconButton size="small" className={styles.cardArrow}>
                <ChevronRightIcon fontSize="small" />
              </IconButton>
            </Box>

            <Box className={styles.tileGrid}>
              {promo.products.slice(0, 4).map((product) => (
                <Box className={styles.tile} key={product._id}>
                  <Box className={styles.tileImageWrap}>
                    <Box
                      component="img"
                      className={styles.tileImage}
                      src={getProductImage(product)}
                      alt={product.title}
                    />
                  </Box>
                  <Typography variant="inherit" className={styles.tileCaption}>
                    {product.title}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  )
}

export default TopCards
