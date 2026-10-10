import { Box, Paper, IconButton } from '@mui/material'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import styles from '../../../../styles/userStyle/homePage.module.css'
import type { Product } from '../../types/common.types.ts'
import { getProductImage } from '../../utils/productDisplay.ts'
import { PROMO_CARD_TITLES } from '../../utils/context.ts'

interface TopCardsProps {
  womans: Product[]
  mans: Product[]
  electranics: Product[]
  grocery: Product[]
}

interface PromoCard {
  title: string
  products: Product[]
}

const TopCards = ({ womans, mans, electranics, grocery }: TopCardsProps) => {
  const promoCards: PromoCard[] = [
    { title: PROMO_CARD_TITLES.fashionForYou, products: womans },
    { title: PROMO_CARD_TITLES.innerwear, products: mans },
    { title: PROMO_CARD_TITLES.homeImprovements, products: electranics },
    { title: PROMO_CARD_TITLES.lowestPrices, products: grocery },
  ]

  return (
    <Box component="section" className={styles.topCardsSection}>
      <Box className={styles.cardsRow}>
        {promoCards.map((promo) => (
          <Paper elevation={0} className={styles.card} key={promo.title}>
            <Box className={styles.cardHeader}>
              <Box component="h3" className={styles.cardTitle}>
                {promo.title}
              </Box>
              <IconButton size="small" className={styles.cardArrow}>
                <ChevronRightIcon fontSize="small" />
              </IconButton>
            </Box>

            <Box className={styles.tileGrid}>
              {promo.products.map((product) => (
                <Box className={styles.tile} key={product._id}>
                  <Box className={styles.tileImageWrap}>
                    <Box
                      component="img"
                      className={styles.tileImage}
                      src={getProductImage(product)}
                      alt={product.title}
                    />
                  </Box>
                  <Box className={styles.tileCaption}>{product.title}</Box>
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
