import type { ReactNode } from 'react'
import { Box, Typography } from '@mui/material'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined'
import styles from '../../styles/authStyle/SignupAndSignin.module.css'

interface AuthHeroPanelProps {
  heading: ReactNode
  tagline: string
}

const AuthHeroPanel = ({ heading, tagline }: AuthHeroPanelProps) => {
  return (
    <Box className={styles.imagePanel}>
      <Box className={styles.imageOverlay} />

      <Box className={styles.brandTop}>
        <img src="/com_loggo.png" alt="NexBasket" className={styles.brandLogo} />
      </Box>

      <Box className={styles.brandBottom}>
        <Typography variant="h3" className={styles.heroHeading}>
          {heading}
        </Typography>
        <Typography className={styles.brandTagline}>{tagline}</Typography>

        <Box className={styles.featureList}>
          <Box className={styles.featureItem}>
            <LocalShippingOutlinedIcon className={styles.featureIcon} />
            <Typography className={styles.featureText}>
              Free & fast delivery nationwide
            </Typography>
          </Box>
          <Box className={styles.featureItem}>
            <VerifiedUserOutlinedIcon className={styles.featureIcon} />
            <Typography className={styles.featureText}>
              100% secure & encrypted payments
            </Typography>
          </Box>
          <Box className={styles.featureItem}>
            <SupportAgentOutlinedIcon className={styles.featureIcon} />
            <Typography className={styles.featureText}>
              24/7 dedicated customer support
            </Typography>
          </Box>
        </Box>

        <Box className={styles.statsRow}>
          <Box className={styles.statItem}>
            <Typography className={styles.statNumber}>50K+</Typography>
            <Typography className={styles.statLabel}>Happy Customers</Typography>
          </Box>
          <Box className={styles.statDivider} />
          <Box className={styles.statItem}>
            <Typography className={styles.statNumber}>10K+</Typography>
            <Typography className={styles.statLabel}>Products</Typography>
          </Box>
          <Box className={styles.statDivider} />
          <Box className={styles.statItem}>
            <Typography className={styles.statNumber}>4.8★</Typography>
            <Typography className={styles.statLabel}>Average Rating</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default AuthHeroPanel
