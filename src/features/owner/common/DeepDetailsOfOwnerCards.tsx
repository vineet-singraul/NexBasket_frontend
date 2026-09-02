import React from 'react'
import { Card, Typography, CircularProgress } from '@mui/material'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded'
import styles from '../../../styles/ownerStyle/Dashboard.module.css'

interface BreakdownItem {
  label: string
  value: string
  percent: number
  color: string
}

const breakdownItems: BreakdownItem[] = [
  { label: 'Listing complete', value: '1,942', percent: 78, color: '#1ca354' },
  { label: 'Low stock', value: '387', percent: 16, color: '#fc8019' },
  { label: 'Out of stock', value: '157', percent: 6, color: '#e5484d' },
]

const DeepDetailsOfOwnerCards = () => {
  return (
    <Card elevation={0} className={styles.deepCard}>
      {/* Left summary panel */}
      <div className={styles.deepLeft}>
        <Typography className={styles.deepLabel}>Listed products</Typography>
        <Typography className={styles.deepValue}>2,486</Typography>

        <span className={`${styles.statTrend} ${styles.statTrendLight}`}>
          <TrendingUpRoundedIcon fontSize="inherit" /> +18% from last month
        </span>

        <Typography className={styles.deepDesc}>
          How your catalog breaks down by fulfillment readiness.
        </Typography>
      </div>

      {/* Vertical divider between summary and breakdown */}
      <div className={styles.deepDivider} />

      {/* Right breakdown list */}
      <div className={styles.deepRight}>
        {breakdownItems.map((item) => (
          <div key={item.label} className={styles.deepRow}>
            <div className={styles.deepRowLeft}>
              {/* Ring track + colored progress overlay */}
              <div className={styles.deepRing}>
                <CircularProgress
                  variant="determinate"
                  value={100}
                  size={30}
                  thickness={4}
                  className={styles.deepRingTrack}
                />
                <CircularProgress
                  variant="determinate"
                  value={item.percent}
                  size={30}
                  thickness={4}
                  className={styles.deepRingFill}
                  sx={{ color: item.color }}
                />
              </div>

              <Typography className={styles.deepRowLabel}>{item.label}</Typography>
            </div>

            <div className={styles.deepRowRight}>
              <Typography className={styles.deepRowValue}>{item.value}</Typography>
              <Typography className={styles.deepRowPercent}>{item.percent}%</Typography>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}

export default DeepDetailsOfOwnerCards
