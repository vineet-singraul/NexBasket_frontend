import React, { useState } from 'react'
import { Box, Card, Typography, Chip } from '@mui/material'
import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded'
import styles from '../../../../styles/ownerStyle/Dashboard.module.css'

const OwnerdashboardCards: React.FC = () => {
  const [activeCard, setActiveCard] = useState<number | null>(0)

  const handleOpenPage = (id : number,root : string) => {
    setActiveCard(id)
  }

  return (
    <Box className={styles.wrap}>
      {/* Stat cards */}
      <div className={styles.statGrid}>
        <Card
          elevation={0}
          onClick={() => {handleOpenPage(0,"hello")}}
          className={`${styles.card} ${activeCard === 0 ? styles.statCardDark : ''}`}
        >
          <div className={styles.statTop}>
            Total Orders
            <NorthEastRoundedIcon fontSize="small" />
          </div>

          <Typography className={styles.statValue}>2,486</Typography>

          <span className={`${styles.statTrend} ${styles.statTrendLight}`}>
            <TrendingUpRoundedIcon fontSize="inherit" /> +18% from last month
          </span>
        </Card>

        <Card
          elevation={0}
          onClick={() => {handleOpenPage(1,"hello")}}
          className={`${styles.card} ${activeCard === 1 ? styles.statCardDark : ''}`}
        >
          <div className={styles.statTop}>
            Delivered Orders <NorthEastRoundedIcon fontSize="small" />
          </div>

          <Typography className={styles.statValue}>2,102</Typography>

          <span className={`${styles.statTrend} ${styles.statTrendLight}`}>
            <TrendingUpRoundedIcon fontSize="inherit" /> +12% from last month
          </span>
        </Card>

        <Card
          elevation={0}
          onClick={() => {handleOpenPage(2,"hello")}}
          className={`${styles.card} ${activeCard === 2 ? styles.statCardDark : ''}`}
        >
          <div className={styles.statTop}>
            Active Stores <NorthEastRoundedIcon fontSize="small" />
          </div>

          <Typography className={styles.statValue}>34</Typography>

          <span className={`${styles.statTrend} ${styles.statTrendLight}`}>
            <TrendingUpRoundedIcon fontSize="inherit" /> +3 new this month
          </span>
        </Card>

        <Card
          elevation={0}
          onClick={() => {handleOpenPage(3,"hello")}}
          className={`${styles.card} ${activeCard === 3 ? styles.statCardDark : ''}`}
        >
          <div className={styles.statTop}>Pending Orders</div>

          <Typography className={styles.statValue}>18</Typography>

          <Chip
            label="On queue"
            size="small"
            sx={{
              bgcolor: 'rgba(252,128,25,0.15)',
              color: '#fc8019',
              fontWeight: 700,
            }}
          />
        </Card>
      </div>

      
    </Box>
  )
}

export default OwnerdashboardCards
