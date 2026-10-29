import { Avatar, Box, Chip } from '@mui/material'
import PersonOutlineIcon from '@mui/icons-material/PersonOutlineOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined'
import VerifiedIcon from '@mui/icons-material/Verified'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlineRounded'
import styles from '../../../../styles/userStyle/account.module.css'
import type { AccountProps } from '../../types/common.types.ts'
import { ACCOUNT_TEXT } from '../../utils/context.ts'

// e.g. "Mar 2025"
const formatMemberSince = (date?: string): string =>
  date ? new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '—'

const Profile = ({ userdata }: AccountProps) => {
  const name = userdata?.fullName || ACCOUNT_TEXT.guest

  const details = [
    { label: ACCOUNT_TEXT.fullName, value: userdata?.fullName, icon: <PersonOutlineIcon /> },
    { label: ACCOUNT_TEXT.email, value: userdata?.email, icon: <EmailOutlinedIcon /> },
    { label: ACCOUNT_TEXT.mobile, value: userdata?.mobile, icon: <PhoneIphoneOutlinedIcon /> },
    {
      label: ACCOUNT_TEXT.memberSince,
      value: formatMemberSince(userdata?.createdAt),
      icon: <CalendarMonthOutlinedIcon />,
    },
  ]

  return (
    <Box className={styles.profile}>
      <Box className={styles.profileTop}>
        <Avatar className={styles.avatar}>{name.charAt(0).toUpperCase()}</Avatar>
        <Box>
          <Box className={styles.name}>{name}</Box>
          {userdata && (
            <Chip
              size="small"
              className={userdata.isVerified ? styles.verifiedChip : styles.unverifiedChip}
              icon={userdata.isVerified ? <VerifiedIcon /> : <ErrorOutlineIcon />}
              label={userdata.isVerified ? ACCOUNT_TEXT.verified : ACCOUNT_TEXT.notVerified}
            />
          )}
        </Box>
      </Box>

      <Box className={styles.detailGrid}>
        {details.map((detail) => (
          <Box key={detail.label} className={styles.detailRow}>
            <span className={styles.detailIcon}>{detail.icon}</span>
            <Box className={styles.detailText}>
              <span className={styles.detailLabel}>{detail.label}</span>
              <span className={styles.detailValue}>{detail.value || '—'}</span>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Profile
