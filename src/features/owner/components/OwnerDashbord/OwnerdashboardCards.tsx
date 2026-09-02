import React, { useState } from 'react'
import { Box, Card, Typography } from '@mui/material'
import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded'
import styles from '../../../../styles/ownerStyle/Dashboard.module.css'
import { useNavigate } from 'react-router-dom'

import type { OwnerdashboardCardsProps } from '../../types/dashboard.types.js'
import OwnerListedProduct from './OwnerListedProduct.js'
import OwnerListedStore from './OwnerListedStore.js'

interface componentsProps extends OwnerdashboardCardsProps {
  children?: React.ReactNode
}

const OwnerdashboardCards: React.FC<componentsProps> = ({
  productListingDetails,
  listedStoreDetails,
  counts,
}) => {
  const [activeCard, setActiveCard] = useState<number | null>(0)

  const navigate = useNavigate()

  const handleOpenPage = (id: number, root: string) => {
    setActiveCard(id)
    navigate(root)
  }

  return (
    <Box className={styles.wrap}>
      {/* Stat cards */}
      <div className={styles.statGrid}>
        <Card
          elevation={0}
          onClick={() => {
            handleOpenPage(0, '/owner/ownerdashboard/ListedProducts')
          }}
          className={`${styles.card} ${activeCard === 0 ? styles.statCardDark : ''}`}
        >
          <div className={styles.statTop}>
            Listed Product
            <NorthEastRoundedIcon fontSize="small" />
          </div>

          <Typography className={styles.statValue}>{counts?.productCount}</Typography>

          <span className={`${styles.statTrend} ${styles.statTrendLight}`}>
            <TrendingUpRoundedIcon fontSize="inherit" /> +18% last month
          </span>
        </Card>

        <Card
          elevation={0}
          onClick={() => {
            handleOpenPage(1, 'hello')
          }}
          className={`${styles.card} ${activeCard === 1 ? styles.statCardDark : ''}`}
        >
          <div className={styles.statTop}>
            Delivered Orders <NorthEastRoundedIcon fontSize="small" />
          </div>

          <Typography className={styles.statValue}>2,102</Typography>

          <span className={`${styles.statTrend} ${styles.statTrendLight}`}>
            <TrendingUpRoundedIcon fontSize="inherit" /> +12% last month
          </span>
        </Card>

        <Card
          elevation={0}
          onClick={() => {
            handleOpenPage(2, '/owner/ownerdashboard/ListedStore')
          }}
          className={`${styles.card} ${activeCard === 2 ? styles.statCardDark : ''}`}
        >
          <div className={styles.statTop}>
            Active Stores <NorthEastRoundedIcon fontSize="small" />
          </div>

          <Typography className={styles.statValue}>{counts?.storeCount}</Typography>

          <span className={`${styles.statTrend} ${styles.statTrendLight}`}>
            <TrendingUpRoundedIcon fontSize="inherit" /> +3 new this month
          </span>
        </Card>

        <Card
          elevation={0}
          onClick={() => {
            handleOpenPage(3, 'hello')
          }}
          className={`${styles.card} ${activeCard === 3 ? styles.statCardDark : ''}`}
        >
          <div className={styles.statTop}>Pending Orders</div>

          <Typography className={styles.statValue}>18</Typography>

          <span className={`${styles.statTrend} ${styles.statTrendPending}`}>On queue</span>
        </Card>
      </div>

      {/* <Box   sx={{p: {xs: 1,sm: 0},}}>{children}</Box> */}
      <Box sx={{ p: { xs: 1, sm: 0 } }}>
        {activeCard === 0 && <OwnerListedProduct productListingDetails={productListingDetails} />}
        {activeCard === 2 && <OwnerListedStore listedStoreDetails={listedStoreDetails} />}
      </Box>
    </Box>
  )
}

export default OwnerdashboardCards
