import type { ReactNode } from 'react'
import { Box, Stack, Chip, Typography, Avatar, Divider } from '@mui/material'
import style from '../../../styles/ownerStyle/SubOwnerDasboardStyle.module.css'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import StarIcon from '@mui/icons-material/Star'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'

const storeData = {
  storeName: 'NexBasket Fresh Mart',
  logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNFmQ5ApPOsmZBm6u215YY1H-vO-CcXARNz6JFOtt3pw&s=10',
  banner:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTxjqUx3RcikmUgVW_vkNY211z0PceFm6SLfFGw9glpw&s=10',
  description:
    'Your neighbourhood store for fresh groceries, daily essentials and fast delivery.',
  email: 'store@nexbasket.com',
  phone: '+91 98765 43210',
  gstNumber: '27ABCDE1234F1Z5',
  address: {
    city: 'Pune',
    state: 'Maharashtra',
    country: 'India',
    pincode: '411001',
  },
  rating: 4.5,
  totalSales: 12500,
  active: true,
  owner: 'Vineet Singraul',
}

const InfoRow = ({
  icon,
  text,
  alignTop = false,
}: {
  icon: ReactNode
  text: string
  alignTop?: boolean
}) => (
  <Stack
    direction="row"
    spacing={1}
    className={style.SODL_InfoRow}
    sx={{ alignItems: alignTop ? 'flex-start' : 'center' }}
  >
    {icon}
    <Typography className={style.SODL_InfoText}>{text}</Typography>
  </Stack>
)

const SubOwnerDashboardLeftSide = () => {
  const { address } = storeData

  return (
    <Box className={style.SODL_Main_Wrapper}>
      <Box className={style.SODL_Left_Wrapper}>
        <img
          src={storeData.banner}
          alt={`${storeData.storeName} banner`}
          className={style.SODL_image}
        />
        <img
          src={storeData.logo}
          alt={`${storeData.storeName} logo`}
          className={style.SODL_image_SEC}
        />
      </Box>

      <Box className={style.SODL_Buttom_Wrapper}>
        <Stack
          className={style.SODL_HeaderRow}
          direction="row"
          spacing={1}
          sx={{ alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Typography variant="h6" className={style.SODL_StoreName}>
            {storeData.storeName}
          </Typography>
          <Chip
            label={storeData.active ? 'Active' : 'Inactive'}
            className={`${style.SODL_StatusChip} ${storeData.active ? style.SODL_StatusActive : style.SODL_StatusInactive}`}
          />
        </Stack>

        <Stack className={style.SODL_ChipWrapper} direction="row" spacing={1}>
          <Chip
            avatar={<Avatar src={storeData.logo} />}
            label={storeData.owner}
            className={style.SODL_Chip}
          />
          <Chip
            icon={<StarIcon className={style.SODL_RatingIcon} />}
            label={storeData.rating.toFixed(1)}
            className={style.SODL_RatingChip}
          />
        </Stack>

        <Typography className={style.SODL_Description}>
          {storeData.description}
        </Typography>

        <Divider className={style.SODL_Divider} />

        <Stack className={style.SODL_InfoList} spacing={1.1}>
          <InfoRow icon={<EmailIcon className={style.SODL_InfoIcon} />} text={storeData.email} />
          <InfoRow icon={<PhoneIcon className={style.SODL_InfoIcon} />} text={storeData.phone} />
          <InfoRow icon={<ReceiptLongIcon className={style.SODL_InfoIcon} />} text={storeData.gstNumber} />
          <InfoRow icon={<AdminPanelSettingsIcon className={style.SODL_InfoIcon} />} text={storeData.owner} />
          <InfoRow
            icon={<LocationOnIcon className={style.SODL_InfoIcon} />}
            text={`${address.city}, ${address.state}, ${address.country} - ${address.pincode}`}
            alignTop
          />
          <InfoRow
            icon={<TrendingUpIcon className={style.SODL_InfoIcon} />}
            text={`${storeData.totalSales.toLocaleString()} total sales`}
          />
        </Stack>
      </Box>
    </Box>
  )
}

export default SubOwnerDashboardLeftSide
