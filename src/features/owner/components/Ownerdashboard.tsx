import React from 'react'
import {
  Box,
  Card,
  Typography,
  Button,
  IconButton,
  Avatar,
  Chip,
} from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded'
import NorthEastRoundedIcon from '@mui/icons-material/NorthEastRounded'
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded'
import ApiRoundedIcon from '@mui/icons-material/ApiRounded'
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded'
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded'
import SpeedRoundedIcon from '@mui/icons-material/SpeedRounded'
import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded'
import PauseRoundedIcon from '@mui/icons-material/PauseRounded'
import StopRoundedIcon from '@mui/icons-material/StopRounded'
import styles from '../../../styles/ownerStyle/Dashboard.module.css'

/**
 * OwnerDashboard
 * Content is organised the same way as the reference dashboard:
 * stat cards -> chart + reminder + task list -> team activity + progress
 * ring + live tracker. Copy/data is adapted to NexBasket (a grocery /
 * food delivery business) instead of the original project-management demo.
 */

const weeklyOrders = [
  { day: 'M', value: 55 },
  { day: 'T', value: 78 },
  { day: 'W', value: 92 },
  { day: 'T', value: 70 },
  { day: 'F', value: 60 },
  { day: 'S', value: 50 },
  { day: 'S', value: 40 },
]

const upcomingTasks = [
  { icon: <ApiRoundedIcon fontSize="inherit" />, title: 'Sync Zomato order feed', meta: 'Due today' },
  { icon: <Inventory2RoundedIcon fontSize="inherit" />, title: 'Restock Andheri warehouse', meta: 'Due tomorrow' },
  { icon: <DashboardCustomizeRoundedIcon fontSize="inherit" />, title: 'Update store banner', meta: 'Due in 2 days' },
  { icon: <SpeedRoundedIcon fontSize="inherit" />, title: 'Optimize delivery routes', meta: 'Due in 3 days' },
  { icon: <CompareArrowsRoundedIcon fontSize="inherit" />, title: 'A/B test checkout flow', meta: 'Due in 4 days' },
]

const teamActivity = [
  { name: 'Aditi Sharma', task: 'Approved refund for order #NB2201', status: 'Completed', avatar: 'https://i.pravatar.cc/64?img=47' },
  { name: 'Karan Verma', task: 'Onboarding new store partner', status: 'In Progress', avatar: 'https://i.pravatar.cc/64?img=12' },
  { name: 'Isha Kulkarni', task: 'Reviewing delivery partner ratings', status: 'In Progress', avatar: 'https://i.pravatar.cc/64?img=32' },
  { name: 'David Menon', task: 'Prepared monthly sales report', status: 'Completed', avatar: 'https://i.pravatar.cc/64?img=51' },
]

const OwnerDashboard: React.FC = () => {
  const completedPct = 68

  return (
    <Box className={styles.wrap}>
      {/* Page header */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Dashboard</h1>
          <p className={styles.pageSubtitle}>Track your stores, orders, and delivery performance at a glance.</p>
        </div>
        <div className={styles.headerButtons}>
          <Button
            variant="contained"
            startIcon={<AddRoundedIcon />}
            sx={{ bgcolor: '#fc8019', borderRadius: '10px', textTransform: 'none', fontWeight: 700, '&:hover': { bgcolor: '#e56f10' } }}
          >
            Add Store
          </Button>
          <Button
            variant="outlined"
            startIcon={<FileUploadRoundedIcon />}
            sx={{ borderColor: 'rgba(255,255,255,0.15)', color: '#f2f2f5', borderRadius: '10px', textTransform: 'none', fontWeight: 700 }}
          >
            Import Data
          </Button>
        </div>
      </div>

      {/* Stat cards */}
      <div className={styles.statGrid}>
        <Card elevation={0} className={`${styles.card} ${styles.statCardDark}`}>
          <div className={styles.statTop}>
            Total Orders <NorthEastRoundedIcon fontSize="small" />
          </div>
          <div className={styles.statValue}>2,486</div>
          <span className={styles.statTrend}>
            <TrendingUpRoundedIcon fontSize="inherit" /> +18% from last month
          </span>
        </Card>

        <Card elevation={0} className={styles.card}>
          <div className={styles.statTop} style={{ color: '#989ba8' }}>
            Delivered Orders <NorthEastRoundedIcon fontSize="small" />
          </div>
          <Typography className={styles.statValue} sx={{ color: '#f2f2f5' }}>2,102</Typography>
          <span className={`${styles.statTrend} ${styles.statTrendLight}`}>
            <TrendingUpRoundedIcon fontSize="inherit" /> +12% from last month
          </span>
        </Card>

        <Card elevation={0} className={styles.card}>
          <div className={styles.statTop} style={{ color: '#989ba8' }}>
            Active Stores <NorthEastRoundedIcon fontSize="small" />
          </div>
          <Typography className={styles.statValue} sx={{ color: '#f2f2f5' }}>34</Typography>
          <span className={`${styles.statTrend} ${styles.statTrendLight}`}>
            <TrendingUpRoundedIcon fontSize="inherit" /> +3 new this month
          </span>
        </Card>

        <Card elevation={0} className={styles.card}>
          <div className={styles.statTop} style={{ color: '#989ba8' }}>
            Pending Orders
          </div>
          <Typography className={styles.statValue} sx={{ color: '#f2f2f5' }}>18</Typography>
          <Chip label="On queue" size="small" sx={{ bgcolor: 'rgba(252,128,25,0.15)', color: '#fc8019', fontWeight: 700 }} />
        </Card>
      </div>

      {/* Middle row */}
      <div className={styles.middleRow}>
        {/* Weekly order volume */}
        <Card elevation={0} className={styles.card}>
          <div className={styles.cardTitleRow}>
            <h3 className={styles.cardTitle}>Weekly Order Volume</h3>
            <button className={styles.linkBtn}>This Week</button>
          </div>
          <div className={styles.barChart}>
            {weeklyOrders.map((d, i) => (
              <div className={styles.barCol} key={i}>
                <div
                  className={`${styles.bar} ${i === 2 ? styles.barActive : ''}`}
                  style={{ height: `${d.value}px` }}
                />
                <span className={styles.barLabel}>{d.day}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Reminder */}
        <Card elevation={0} className={`${styles.card} ${styles.reminderCard}`}>
          <div className={styles.reminderTag}>Reminder</div>
          <div className={styles.reminderTitle}>Vendor Review Call</div>
          <div className={styles.reminderTime}>Today · 03:00 PM – 04:00 PM</div>
          <button className={styles.reminderBtn}>Join Call</button>
        </Card>

        {/* Task list */}
        <Card elevation={0} className={styles.card}>
          <div className={styles.cardTitleRow}>
            <h3 className={styles.cardTitle}>Upcoming Tasks</h3>
            <IconButton size="small" sx={{ bgcolor: 'rgba(252,128,25,0.15)', color: '#fc8019' }}>
              <AddRoundedIcon fontSize="small" />
            </IconButton>
          </div>
          <div className={styles.taskList}>
            {upcomingTasks.map((t, i) => (
              <div className={styles.taskRow} key={i}>
                <span className={styles.taskIcon}>{t.icon}</span>
                <div className={styles.taskText}>
                  <div className={styles.taskTitle}>{t.title}</div>
                  <div className={styles.taskMeta}>{t.meta}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom row */}
      <div className={styles.bottomRow}>
        {/* Team activity */}
        <Card elevation={0} className={styles.card}>
          <div className={styles.cardTitleRow}>
            <h3 className={styles.cardTitle}>Team Activity</h3>
            <button className={styles.linkBtn}>+ Add Member</button>
          </div>
          {teamActivity.map((m, i) => (
            <div className={styles.teamRow} key={i}>
              <Avatar src={m.avatar} className={styles.teamAvatar} />
              <div className={styles.teamText}>
                <div className={styles.teamName}>{m.name}</div>
                <div className={styles.teamTask}>{m.task}</div>
              </div>
              <span
                className={`${styles.statusChip} ${
                  m.status === 'Completed' ? styles.statusDone : styles.statusProgress
                }`}
              >
                {m.status}
              </span>
            </div>
          ))}
        </Card>

        {/* Order progress donut */}
        <Card elevation={0} className={styles.card}>
          <div className={styles.cardTitleRow}>
            <h3 className={styles.cardTitle}>Order Fulfilment</h3>
          </div>
          <div className={styles.donutWrap}>
            <svg width="150" height="150" viewBox="0 0 150 150">
              <circle cx="75" cy="75" r="62" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="16" />
              <circle
                cx="75"
                cy="75"
                r="62"
                fill="none"
                stroke="#fc8019"
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 62}
                strokeDashoffset={2 * Math.PI * 62 * (1 - completedPct / 100)}
                transform="rotate(-90 75 75)"
              />
              <text x="75" y="80" textAnchor="middle" fontSize="26" fontWeight="800" fill="#f2f2f5">
                {completedPct}%
              </text>
            </svg>
            <span className={styles.donutValue}>Orders fulfilled on time</span>
            <div className={styles.donutLegend}>
              <span className={styles.legendItem}>
                <span className={styles.legendDot} style={{ background: '#fc8019' }} /> Completed
              </span>
              <span className={styles.legendItem}>
                <span className={styles.legendDot} style={{ background: 'rgba(255,255,255,0.15)' }} /> Pending
              </span>
            </div>
          </div>
        </Card>

        {/* Live delivery tracker */}
        <Card elevation={0} className={`${styles.card} ${styles.trackerCard}`}>
          <div className={styles.trackerLabel}>Live Delivery Tracker</div>
          <div className={styles.trackerTime}>00:24:08</div>
          <div className={styles.trackerControls}>
            <button className={`${styles.trackerBtn} ${styles.trackerPause}`}>
              <PauseRoundedIcon fontSize="small" />
            </button>
            <button className={`${styles.trackerBtn} ${styles.trackerStop}`}>
              <StopRoundedIcon fontSize="small" />
            </button>
          </div>
        </Card>
      </div>
    </Box>
  )
}

export default OwnerDashboard