import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import ReceiptLongRoundedIcon from '@mui/icons-material/ReceiptLongRounded'
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded'
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded'
import TwoWheelerRoundedIcon from '@mui/icons-material/TwoWheelerRounded'
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded'
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded'
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded'
import LocalOfferRoundedIcon from '@mui/icons-material/LocalOfferRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import CategoryIcon from '@mui/icons-material/Category';
import { Tooltip } from '@mui/material'
import type { SidebarSection } from '../types/Sidebar.types'
import styles from '../../../styles/ownerStyle/Sidebar.module.css'

/**
 * OwnerSidebar
 * Swiggy-admin inspired navigation sidebar for the NexBasket Owner panel.
 * Content/layout style mirrors the reference dashboard (logo block, grouped
 * menu sections, active-state highlight bar, promo card, footer).
 */
const sections: SidebarSection[] = [
  {
    id: 'main',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: <DashboardRoundedIcon fontSize="inherit" />, path: '/owner/dashboard' },
      { id: 'Add Categury', label: 'Add Categury', icon: <CategoryIcon fontSize="inherit" />, path: '/owner/category/add'},
      { id: 'stores', label: 'Stores', icon: <StorefrontRoundedIcon fontSize="inherit" />, path: '/owner/stores/add' },
      { id: 'Products', label: 'Products', icon: <Inventory2RoundedIcon fontSize="inherit" />, path: '/owner/Products' },
      { id: 'delivery', label: 'Delivery Partners', icon: <TwoWheelerRoundedIcon fontSize="inherit" />, path: '/owner/delivery-partners' },
    ],
  },
  {
    id: 'business',
    title: 'Business',
    items: [
      { id: 'customers', label: 'Customers', icon: <PeopleAltRoundedIcon fontSize="inherit" />, path: '/owner/customers' },
      { id: 'payments', label: 'Payments', icon: <PaymentsRoundedIcon fontSize="inherit" />, path: '/owner/payments' },
      { id: 'analytics', label: 'Analytics', icon: <BarChartRoundedIcon fontSize="inherit" />, path: '/owner/analytics' },
      { id: 'offers', label: 'Offers & Coupons', icon: <LocalOfferRoundedIcon fontSize="inherit" />, path: '/owner/offers' },
    ],
  },
  {
    id: 'general',
    title: 'General',
    items: [
      { id: 'settings', label: 'Settings', icon: <SettingsRoundedIcon fontSize="inherit" />, path: '/owner/settings' },
      { id: 'help', label: 'Help & Support', icon: <HelpOutlineRoundedIcon fontSize="inherit" />, path: '/owner/help' },
    ],
  },
]

interface OwnerSidebarProps {
  onLogout?: () => void
}

const OwnerSidebar: React.FC<OwnerSidebarProps> = ({ onLogout }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const isActive = (path: string) => location.pathname.startsWith(path)

  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logoWrap}>
        <div className={styles.logoMark}>NB</div>
        <div className={styles.logoText}>
          <span className={styles.logoTitle}>NexBasket</span>
          <span className={styles.logoSubtitle}>Owner Panel</span>
        </div>
      </div>

      {/* Menu */}
      <nav className={styles.menuScroll}>
        {sections.map((section) => (
          <div key={section.id}>
            {section.title && <p className={styles.sectionTitle}>{section.title}</p>}
            {section.items.map((item) => {
              const active = isActive(item.path)
              return (
                <div
                  key={item.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => navigate(item.path)}
                  className={`${styles.menuItem} ${active ? styles.menuItemActive : ''}`}
                >
                  {active && <span className={styles.activeBar} />}
                  <span className={styles.menuIcon}>{item.icon}</span>
                  <span className={styles.menuLabel}>{item.label}</span>
                  {typeof item.badge === 'number' && (
                    <span className={styles.menuBadge}>{item.badge}</span>
                  )}
                </div>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className={styles.sidebarFooter}>
        <Tooltip title="Log out" placement="top">
          <div
            role="button"
            tabIndex={0}
            onClick={onLogout}
            className={styles.menuItem}
          >
            <span className={styles.menuIcon}>
              <LogoutRoundedIcon fontSize="inherit" />
            </span>
            <span className={styles.menuLabel}>Logout</span>
          </div>
        </Tooltip>
      </div>
    </aside>
  )
}

export default OwnerSidebar