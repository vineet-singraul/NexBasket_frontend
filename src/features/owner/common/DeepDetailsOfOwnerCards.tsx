import React, { useEffect } from 'react'
import { Card, Typography, CircularProgress } from '@mui/material'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded'
import styles from '../../../styles/ownerStyle/Dashboard.module.css'
import {
  type OwnerDeepDetailsOfOwnerCardsProps,
  DeepDetailsOfCardsList,
} from '../types/dashboard.types.ts'
import type { cardsData } from '../types/dashboard.types.ts'

const breakdownItems = (id: number, data: cardsData) => {
  const total =
    (data?.inStockCount ?? 0) + (data?.lowStockCount ?? 0) + (data?.outOfStockCount ?? 0)
  const getPercentage = (value: number) => {
    if (total === 0) return 0
    return Math.round((value / total) * 100)
  }

  if (id == 1) {
    return [
      {
        label: 'In Stock Product',
        value: data.inStockCount,
        percent: getPercentage(data?.inStockCount ?? 0),
        color: '#1ca354',
      },
      {
        label: 'Low stock',
        value: String(data?.lowStockCount ?? 0),
        percent: getPercentage(data?.lowStockCount ?? 0),
        color: '#fc8019',
      },
      {
        label: 'Out of stock',
        value: String(data?.outOfStockCount ?? 0),
        percent: getPercentage(data?.outOfStockCount ?? 0),
        color: '#e5484d',
      },
    ]
  }
}

const DeepDetailsOfOwnerCards = (cardData: OwnerDeepDetailsOfOwnerCardsProps) => {
  const cardId = cardData.cardData.id ?? -1
  const cardsdetails = Object.values(DeepDetailsOfCardsList).find((item) => item.id === cardId)

  const breakdown = breakdownItems(cardId, cardData.cardData) ?? []

  useEffect(() => {
    breakdownItems(cardId, cardData.cardData)
  }, [cardId])

  return (
    <Card elevation={0} className={styles.deepCard}>
      {/* Left summary panel */}
      <div className={styles.deepLeft}>
        <Typography className={styles.deepLabel}>{cardsdetails?.title}</Typography>
        <Typography className={styles.deepValue}>{cardData.cardData.ListedProductCount}</Typography>

        <span className={`${styles.statTrend} ${styles.statTrendLight}`}>
          <TrendingUpRoundedIcon fontSize="inherit" /> +18% {cardsdetails?.marginProfitOrLoss}
        </span>

        <Typography className={styles.deepDesc}>{cardsdetails?.detail}</Typography>
      </div>

      {/* Vertical divider between summary and breakdown */}
      <div className={styles.deepDivider} />

      {/* Right breakdown list */}
      <div className={styles.deepRight}>
        {breakdown.map((item) => (
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
