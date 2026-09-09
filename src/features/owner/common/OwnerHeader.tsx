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
import type { Owner } from '../types/common.types'
import OwnerProfilePopUp from './OwnerProfilePopUp'

interface OwnerHeaderProps {
  ownerRole?: string
  onSearch?: (value: string) => void
  onLogout?: () => void
  onMenuClick?: () => void
  owner: Owner | null
}

/**x
 * OwnerHeader
 * Swiggy-admin inspired top bar for the NexBasket Owner panel.
 * Search on the left, quick actions (notifications, messages) and the
 * owner's profile menu on the right.
 */
const OwnerHeader: React.FC<OwnerHeaderProps> = ({
  ownerRole = 'Store Owner',
  onSearch,
  onLogout,
  onMenuClick,
  owner,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [isProfilePopUpOpen, setIsProfilePopUpOpen] = useState(false)

  const handleProfileClick = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const AvtarName = owner?.fullName
    .split(' ')
    .map((cut) => cut[0])
    .join('')
    .toUpperCase()

  return (
    <header className={styles.header}>
      <div className={styles.mainDiv}>
        <button
          type="button"
          className={styles.menuToggle}
          aria-label="Open menu"
          onClick={onMenuClick}
        >
          <MenuRoundedIcon className={styles.menuIcon} />
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
          <span className={styles.divider} />

          <div className={styles.profile} onClick={handleProfileClick}>
            <div className={styles.profileText}>
              <span className={styles.profileName}>{owner?.fullName}</span>
              <span className={styles.profileRole}>
                {owner?.role}ed by {owner?.fullName.split(' ')[0]}
              </span>
            </div>
            <Avatar className={styles.avatar}>{AvtarName}</Avatar>
          </div>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            slotProps={{
              paper: { className: styles.profileMenuPaper },
              list: { className: styles.profileMenuList },
            }}
          >
            <MenuItem
              className={styles.profileMenuItem}
              onClick={() => {
                handleClose()
                setIsProfilePopUpOpen(true)
              }}
            >
              <ListItemIcon className={styles.profileMenuItemIcon}>
                <PersonRoundedIcon fontSize="small" />
              </ListItemIcon>
              My Profile
            </MenuItem>
            <MenuItem className={styles.profileMenuItem} onClick={handleClose}>
              <ListItemIcon className={styles.profileMenuItemIcon}>
                <SettingsRoundedIcon fontSize="small" />
              </ListItemIcon>
              Account Settings
            </MenuItem>
            <Divider className={styles.profileMenuDivider} />
            <MenuItem
              className={`${styles.profileMenuItem} ${styles.profileMenuItemDanger}`}
              onClick={() => {
                handleClose()
                onLogout?.()
              }}
            >
              <ListItemIcon className={styles.profileMenuItemIcon}>
                <LogoutRoundedIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>

      {/* Search */}
      <div className={styles.searchWrap} id={styles.search}>
        <SearchRoundedIcon className={styles.searchIcon} />
        <input
          className={styles.searchInput}
          placeholder="Search orders, stores, products..."
          onChange={(e) => onSearch?.(e.target.value)}
        />
        <span className={styles.kbdHint}>⌘s</span>
      </div>

      <OwnerProfilePopUp
        open={isProfilePopUpOpen}
        onClose={() => setIsProfilePopUpOpen(false)}
        owner={owner}
      />
    </header>
  )
}

export default OwnerHeader
