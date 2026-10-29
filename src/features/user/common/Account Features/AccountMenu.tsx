import type { ReactNode } from 'react'
import { Avatar, Box, ButtonBase } from '@mui/material'
import PersonOutlineIcon from '@mui/icons-material/PersonOutlineOutlined'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import PasswordIcon from '@mui/icons-material/Password'
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import styles from '../../../../styles/userStyle/account.module.css'
import { ACCOUNT_TEXT } from '../../utils/context.ts'

export type AccountSection = 'profile' | 'wishlist' | 'orders' | 'addresses'

// What a menu item does: open a section on the right, or run an action (navigate, sign out...)
export type AccountMenuAction = AccountSection | 'cart' | 'changePassword' | 'help' | 'signOut'

type MenuItem = { key: AccountMenuAction; label: string; icon: ReactNode }

// 4 big tiles at the top (mobile only)
const QUICK_TILES: MenuItem[] = [
  { key: 'orders', label: 'Orders', icon: <Inventory2OutlinedIcon /> },
  { key: 'wishlist', label: 'Wishlist', icon: <FavoriteBorderIcon /> },
  { key: 'cart', label: 'Cart', icon: <ShoppingCartOutlinedIcon /> },
  { key: 'help', label: 'Help Center', icon: <SupportAgentOutlinedIcon /> },
]

const MENU_GROUPS: { title: string; items: MenuItem[] }[] = [
  {
    title: ACCOUNT_TEXT.myActivity,
    items: [
      { key: 'orders', label: ACCOUNT_TEXT.orders, icon: <Inventory2OutlinedIcon /> },
      { key: 'wishlist', label: ACCOUNT_TEXT.wishlist, icon: <FavoriteBorderIcon /> },
      { key: 'cart', label: ACCOUNT_TEXT.cart, icon: <ShoppingCartOutlinedIcon /> },
    ],
  },
  {
    title: ACCOUNT_TEXT.accountSettings,
    items: [
      { key: 'profile', label: ACCOUNT_TEXT.profile, icon: <PersonOutlineIcon /> },
      { key: 'addresses', label: ACCOUNT_TEXT.addresses, icon: <LocationOnOutlinedIcon /> },
      { key: 'changePassword', label: ACCOUNT_TEXT.changePassword, icon: <PasswordIcon /> },
      { key: 'help', label: ACCOUNT_TEXT.helpCenter, icon: <SupportAgentOutlinedIcon /> },
    ],
  },
]

type AccountMenuProps = {
  name: string
  activeSection: AccountSection
  onSelect: (action: AccountMenuAction) => void
}

const AccountMenu = ({ name, activeSection, onSelect }: AccountMenuProps) => (
  <Box component="aside" className={styles.sidebar}>
    {/* Hello, user */}
    <Box className={styles.userCard}>
      <Avatar className={styles.userAvatar}>{name.charAt(0).toUpperCase()}</Avatar>
      <Box className={styles.userText}>
        <span className={styles.hello}>{ACCOUNT_TEXT.hello}</span>
        <span className={styles.userName}>{name}</span>
      </Box>
    </Box>

    <Box className={styles.quickTiles}>
      {QUICK_TILES.map((tile) => (
        <ButtonBase key={tile.key} className={styles.quickTile} onClick={() => onSelect(tile.key)}>
          {tile.icon}
          <span>{tile.label}</span>
        </ButtonBase>
      ))}
    </Box>

    {MENU_GROUPS.map((group) => (
      <Box key={group.title} className={styles.menuGroup}>
        <Box className={styles.menuTitle}>{group.title}</Box>
        {group.items.map((item) => (
          <ButtonBase
            key={item.key}
            className={`${styles.menuItem} ${item.key === activeSection ? styles.menuItemActive : ''}`}
            onClick={() => onSelect(item.key)}
          >
            <span className={styles.menuIcon}>{item.icon}</span>
            <span className={styles.menuLabel}>{item.label}</span>
            <ChevronRightIcon className={styles.menuChevron} />
          </ButtonBase>
        ))}
      </Box>
    ))}

    <ButtonBase className={styles.signOutBtn} onClick={() => onSelect('signOut')}>
      <LogoutOutlinedIcon />
      <span>{ACCOUNT_TEXT.signOut}</span>
    </ButtonBase>
  </Box>
)

export default AccountMenu
