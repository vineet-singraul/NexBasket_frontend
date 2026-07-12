import { useEffect, useState, type ReactNode } from 'react'
import { Box, Stack, Chip, Typography, Avatar, Divider } from '@mui/material'
import style from '../../../styles/ownerStyle/SubOwnerDasboardStyle.module.css'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import EmailIcon from '@mui/icons-material/Email'
import PhoneIcon from '@mui/icons-material/Phone'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import StarIcon from '@mui/icons-material/Star'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import { apiGet } from '../../../api/userApi'
import { useParams } from 'react-router-dom'
import type {StoreListItem} from "../types/store.types";
import {STORE_ENDPOINTS} from "../../../api/endpoints"
import type { NotificationInterfacce } from '../../../auth/types/auth.types'
import Loader from '../../../utils/Loader'
import Notification from '../../../utils/Notification'

interface StoreDetailsResponse {
  message: string
  store: StoreListItem
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
  const { id } = useParams();
  const [subUserDetails, setSubUserDetails] = useState<StoreListItem | null>(null);
  const [loading, setLoading] = useState<boolean>(false)
  const [notification, setNotification] = useState<NotificationInterfacce>({
    open:false,
    message:"",
    severity:"success"
  })

  useEffect(() => {
    const fetchSubOwnerDetails = async () => {
      if (!id) return
      setLoading(true)
      try {
        const response = await apiGet<StoreDetailsResponse>(STORE_ENDPOINTS.SINGLELIST(id));
        if (response?.store) {
          setSubUserDetails(response.store)
        }
      } catch {
        setNotification({
          open: true,
          message: "Sub Owner details not fetched",
          severity: "error"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchSubOwnerDetails()
  }, [id])

  if (!subUserDetails) {
    return (
      <Box className={style.SODL_Main_Wrapper}>
        {loading && <Loader/>}
        {notification && <Notification
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          onClose={() => setNotification(prev => ({ ...prev, open: false }))}
        />
        }
      </Box>
    )
  }

  const address = subUserDetails.address

  return (
    <Box className={style.SODL_Main_Wrapper}>
      <Box className={style.SODL_Left_Wrapper}>
        <img
          src={subUserDetails.banner ?? undefined}
          alt={`${subUserDetails.storeName} banner`}
          className={style.SODL_image}
        />
        <img
          src={subUserDetails.logo ?? undefined}
          alt={`${subUserDetails.storeName} logo`}
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
            {subUserDetails.storeName}
          </Typography>
          <Chip
            label={subUserDetails.active ? 'Active' : 'Inactive'}
            className={`${style.SODL_StatusChip} ${subUserDetails.active ? style.SODL_StatusActive : style.SODL_StatusInactive}`}
          />
        </Stack>

        <Stack className={style.SODL_ChipWrapper} direction="row" spacing={1}>
          <Chip
            avatar={<Avatar src={subUserDetails.logo ?? undefined} />}
            label={subUserDetails.owner}
            className={style.SODL_Chip}
          />
          <Chip
            icon={<StarIcon className={style.SODL_RatingIcon} />}
            label={(subUserDetails.rating ?? 0).toFixed(1)}
            className={style.SODL_RatingChip}
          />
        </Stack>

        <Typography className={style.SODL_Description}>
          {subUserDetails.description}
        </Typography>

        <Divider className={style.SODL_Divider} />

        <Stack className={style.SODL_InfoList} spacing={1.1}>
          <InfoRow icon={<EmailIcon className={style.SODL_InfoIcon} />} text={subUserDetails.email ?? ''} />
          <InfoRow icon={<PhoneIcon className={style.SODL_InfoIcon} />} text={subUserDetails.phone ?? ''} />
          <InfoRow icon={<ReceiptLongIcon className={style.SODL_InfoIcon} />} text={subUserDetails.gstNumber ?? ''} />
          <InfoRow icon={<AdminPanelSettingsIcon className={style.SODL_InfoIcon} />} text={subUserDetails.owner ?? ''} />
          <InfoRow
            icon={<LocationOnIcon className={style.SODL_InfoIcon} />}
            text={address ? `${address.city ?? ''}, ${address.state ?? ''}, ${address.country ?? ''} - ${address.pincode ?? ''}` : ''}
            alignTop
          />
          <InfoRow
            icon={<TrendingUpIcon className={style.SODL_InfoIcon} />}
            text={`${(subUserDetails.totalSales ?? 0).toLocaleString()} total sales`}
          />
        </Stack>
      </Box>
      {loading && <Loader/>}
      {notification && <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={() => setNotification(prev => ({ ...prev, open: false }))}
      />
      }
    </Box>
  )
}

export default SubOwnerDashboardLeftSide
