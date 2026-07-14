import React, { useState } from 'react'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded'
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import { Badge, Avatar, Menu, MenuItem, Divider, ListItemIcon } from '@mui/material'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import styles from '../../../styles/ownerStyle/Header.module.css'

interface OwnerHeaderProps {
  ownerName?: string
  ownerRole?: string
  avatarUrl?: string
  notificationCount?: number
  messageCount?: number
  onSearch?: (value: string) => void
  onLogout?: () => void
  onMenuClick?: () => void
}

/**
 * OwnerHeader
 * Swiggy-admin inspired top bar for the NexBasket Owner panel.
 * Search on the left, quick actions (notifications, messages) and the
 * owner's profile menu on the right.
 */
const OwnerHeader: React.FC<OwnerHeaderProps> = ({
  ownerName = 'Rohit Malhotra',
  ownerRole = 'Store Owner',
  avatarUrl,
  notificationCount = 4,
  messageCount = 2,
  onSearch,
  onLogout,
  onMenuClick,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleProfileClick = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <header className={styles.header}>
      <button
        type="button"
        className={styles.menuToggle}
        aria-label="Open menu"
        onClick={onMenuClick}
      >
        <MenuRoundedIcon />
      </button>

      {/* Search */}
      <div className={styles.searchWrap}>
        <SearchRoundedIcon className={styles.searchIcon} />
        <input
          className={styles.searchInput}
          placeholder="Search orders, stores, products..."
          onChange={(e) => onSearch?.(e.target.value)}
        />
        <span className={styles.kbdHint}>⌘K</span>
      </div>

      {/* Right actions */}
      <div className={styles.actions}>
        <button className={styles.iconButton} aria-label="Messages">
          <Badge badgeContent={messageCount} color="warning">
            <MailOutlineRoundedIcon />
          </Badge>
        </button>

        <button className={styles.iconButton} aria-label="Notifications">
          <Badge badgeContent={notificationCount} color="warning">
            <NotificationsNoneRoundedIcon />
          </Badge>
        </button>

        <span className={styles.divider} />

        <div className={styles.profile} onClick={handleProfileClick}>
          <Avatar src={avatarUrl} className={styles.avatar}>
            {ownerName.charAt(0)}
          </Avatar>
          <div className={styles.profileText}>
            <span className={styles.profileName}>{ownerName}</span>
            <span className={styles.profileRole}>{ownerRole}</span>
          </div>
          <KeyboardArrowDownRoundedIcon className={styles.chevron} />
        </div>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <PersonRoundedIcon fontSize="small" />
            </ListItemIcon>
            My Profile
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <SettingsRoundedIcon fontSize="small" />
            </ListItemIcon>
            Account Settings
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              handleClose()
              onLogout?.()
            }}
          >
            <ListItemIcon>
              <LogoutRoundedIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>
    </header>
  )
}

export default OwnerHeader