import { Dialog, IconButton, Avatar, Chip, Divider, Typography } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import EventOutlinedIcon from '@mui/icons-material/EventOutlined'
import styles from '../../../styles/ownerStyle/Header.module.css'
import type { OwnerProfilePopUpProps } from '../types/common.types'

const formatDate = (value?: string) => {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

const OwnerProfilePopUp = ({ open, onClose, owner }: OwnerProfilePopUpProps) => {
  const initials = owner?.fullName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()

  const details = [
    { icon: <EmailOutlinedIcon fontSize="small" />, label: 'Email', value: owner?.email ?? '—' },
    { icon: <LocalPhoneOutlinedIcon fontSize="small" />, label: 'Mobile', value: owner?.mobile ?? '—' },
    { icon: <BadgeOutlinedIcon fontSize="small" />, label: 'Role', value: owner?.role ?? '—' },
    {
      icon: <EventOutlinedIcon fontSize="small" />,
      label: 'Member since',
      value: formatDate(owner?.createdAt),
    },
  ]

  return (
    <Dialog open={open} onClose={onClose} maxWidth={false} slotProps={{ paper: { className: styles.oppPaper } }}>
      <IconButton
        className={styles.oppCloseBtn}
        size="small"
        onClick={onClose}
        aria-label="Close"
      >
        <CloseRoundedIcon fontSize="small" />
      </IconButton>

      <div className={styles.oppHeader}>
        <div className={styles.oppAvatarRing}>
          <Avatar className={styles.oppAvatar}>{initials}</Avatar>
          {owner?.isVerified && (
            <span className={styles.oppVerified}>
              <CheckRoundedIcon sx={{ fontSize: 13 }} />
            </span>
          )}
        </div>
        <Typography className={styles.oppName}>{owner?.fullName}</Typography>
        <Chip label={owner?.role ?? 'Owner'} size="small" className={styles.oppRoleChip} />
      </div>

      <Divider className={styles.oppDivider} />

      <div className={styles.oppDetails}>
        {details.map((row) => (
          <div className={styles.oppDetailRow} key={row.label}>
            <span className={styles.oppDetailIcon}>{row.icon}</span>
            <div className={styles.oppDetailText}>
              <span className={styles.oppDetailLabel}>{row.label}</span>
              <span className={styles.oppDetailValue}>{row.value}</span>
            </div>
          </div>
        ))}
      </div>
    </Dialog>
  )
}

export default OwnerProfilePopUp
