import * as React from 'react'
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  Chip,
  Slide,
} from '@mui/material'
import type { TransitionProps } from '@mui/material/transitions'
import CloseIcon from '@mui/icons-material/Close'
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded'
import ImageRoundedIcon from '@mui/icons-material/ImageRounded'
import styles from '../../../../styles/ownerStyle/ShowSingleCategory.module.css'
import { apiGet } from '../../../../api/userApi'
import { CATEGORY_ENDPOINTS } from '../../../../api/endpoints'
import type { NotificationInterfacce } from '../../../../auth/types/auth.types'
import type { CategoryListItem } from '../../types/category.types'
import Notification from '../../../../utils/Notification'
import Loader from '../../../../utils/Loader'


const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement<unknown> },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

interface ShowSingleCategoryProps {
  onClose?: () => void
}

const ShowSingleCategory = ({ onClose }: ShowSingleCategoryProps) => {
  const [loading, setLoading] = React.useState<boolean>(false)
  const [notification, setNotification] = React.useState<NotificationInterfacce | null>(null)
  const [categorys, setCategory] = React.useState<CategoryListItem[]>([])

  const authData = localStorage.getItem('nexbasket_auth')
  const ownerId = authData ? JSON.parse(authData)?.user?._id : null

  React.useEffect(() => {
    if (!ownerId) return

    let isActive = true

    const fetchOwnerCategory = async () => {
      setLoading(true)

      try {
        const response = await apiGet(CATEGORY_ENDPOINTS.GET_OWNER_CATEGORY(ownerId))
       
        if (!isActive) return

        const categoryPayload = response as
          | CategoryListItem[]
          | { data?: CategoryListItem | CategoryListItem[] | null }
          | CategoryListItem
          | null

        const categoryData = Array.isArray(categoryPayload)
          ? categoryPayload
          : categoryPayload && 'data' in categoryPayload
            ? (Array.isArray(categoryPayload.data)
                ? categoryPayload.data
                : categoryPayload.data
                  ? [categoryPayload.data]
                  : [])
            : categoryPayload
              ? [categoryPayload]
              : []

        console.log(categoryData)

        setCategory(categoryData as CategoryListItem[])
      } catch (error) {
        if (!isActive) return

        const errorMessage =
          error instanceof Error
            ? error.message
            : typeof error === 'string'
              ? error
              : 'Something went wrong'

        setNotification({
          open: true,
          message: errorMessage,
          severity: 'error',
        })
      } finally {
        if (isActive) {
          setLoading(false)
        }
      }
    }

    void fetchOwnerCategory()

    return () => {
      isActive = false
    }
  }, [ownerId])

  return (
    <Dialog
      fullScreen
      open
      onClose={onClose}
      slots={{ transition: Transition }}
      className={styles.SC_dialog}
    >
      <AppBar position="relative" className={styles.SC_appBar}>
        <Toolbar className={styles.SC_toolbar}>
          <IconButton
            edge="start"
            onClick={onClose}
            aria-label="close"
            className={styles.SC_closeBtn}
          >
            <CloseIcon />
          </IconButton>

          <Box className={styles.SC_panelIcon}>
            <CategoryRoundedIcon />
          </Box>

          <Box className={styles.SC_headingWrap}>
            <Typography className={styles.SC_title}>Category Details</Typography>
            <Typography className={styles.SC_subtitle}>
              View everything about this category
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Box className={styles.SC_body}>
        {categorys.length > 0 ? (
          <Box className={styles.SC_cardsList}>
            {categorys.map((category) => (
              <Box className={styles.SC_heroCard} key={category._id}>
                <Box className={styles.SC_heroMedia}>
                  {!category.image ? (
                    <ImageRoundedIcon />
                  ) : (
                    <img src={category.image} alt={category.name ?? 'Category image'} />
                  )}
                  <Chip
                    label={category.isActive ? 'Active' : 'Not Active'}
                    size="small"
                    className={`${styles.SC_statusChip} ${styles.SC_heroBadge}`}
                  />
                </Box>

                <Box className={styles.SC_heroContent}>
                  <Typography className={styles.SC_heroTitle}>{category.name}</Typography>

                  <Box className={styles.SC_heroField}>
                    <Typography className={styles.SC_cardLabel}>Slug</Typography>
                    <Typography className={styles.SC_cardDesc}>{category.slug}</Typography>
                  </Box>

                  <Box className={styles.SC_heroField}>
                    <Typography className={styles.SC_cardLabel}>Description</Typography>
                    <Typography className={styles.SC_cardDesc}>{category.description}</Typography>
                  </Box>

                  <Box className={styles.SC_heroActions}>
                    <Button type="button" className={styles.SC_cardBtnOutline}>
                      Edit
                    </Button>
                    <Button type="button" className={styles.SC_cardBtnFilled}>
                      Delete
                    </Button>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        ) : (
          <Box className={styles.SC_heroCard}>No category found.</Box>
        )}
      </Box>


      {loading && <Loader />}

      {notification && (
        <Notification
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          onClose={() => setNotification(null)}
        />
      )}
    </Dialog>
  )
}

export default ShowSingleCategory
