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
import { apiDelete, apiGet } from '../../../../api/userApi'
import { CATEGORY_ENDPOINTS } from '../../../../api/endpoints'
import type { NotificationInterfacce } from '../../../../auth/types/auth.types'
import type { CategoryListItem } from '../../types/category.types'
import Notification from '../../../../utils/Notification'
import Loader from '../../../../utils/Loader'
import CircularProgress from '@mui/material/CircularProgress'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()

  // Load All Category
  const fetchOwnerCategory = async () => {
    if (!ownerId) return

    setLoading(true)
    try {
      const response = await apiGet(CATEGORY_ENDPOINTS.GET_OWNER_CATEGORY(ownerId))
      const payload = response as
        | CategoryListItem[]
        | { data?: CategoryListItem | CategoryListItem[] | null }
        | CategoryListItem
        | null

      const data = Array.isArray(payload)
        ? payload
        : payload && 'data' in payload
          ? Array.isArray(payload.data)
            ? payload.data
            : payload.data
              ? [payload.data]
              : []
          : payload
            ? [payload]
            : []

      setCategory(data as CategoryListItem[])
    } catch (error) {
      setNotification({
        open: true,
        message:
          error instanceof Error
            ? error.message
            : typeof error === 'string'
              ? error
              : 'Something went wrong',
        severity: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  // Load Effect :
  React.useEffect(() => {
    if (!ownerId) return
    let isActive = true
    void Promise.resolve().then(() => fetchOwnerCategory())
    return () => {
      isActive = false
    }
  }, [ownerId])

  // Delete the Category :
  const handleDelete = async (id: string) => {
    setLoading(true)
    try {
      const response = await apiDelete(CATEGORY_ENDPOINTS.DELETE_CATEGORY(id))
      const responseMessage =
        typeof response === 'object' && response !== null && 'message' in response
          ? response.message
          : ''
      setLoading(true)
      setNotification({
        open: true,
        message: String(responseMessage ?? ''),
        severity: 'success',
      })
      fetchOwnerCategory()
    } catch (error) {
      setNotification({
        open: true,
        message:
          error instanceof Error
            ? error.message
            : typeof error === 'string'
              ? error
              : 'Something went wrong',
        severity: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  // Edit the Category :
  const handleEdit = (id: string) => {
    navigate(`/owner/category/add/${id}`)
    onClose?.()
  }

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
                    <img
                      src={category.image}
                      alt={category.name ?? 'Category image'}
                      className={styles.SC_heroMediaImage}
                    />
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
  
                    <Button
                      type="button"
                      className={styles.SC_cardBtnOutline}
                      onClick={() => handleEdit(category._id)}
                    >
                      Edit
                    </Button>

                    {loading ? (
                      <Button type="button" className={styles.SC_cardBtnFilled}>
                        <CircularProgress />
                      </Button>
                    ) : (
                      <Button
                        type="button"
                        className={styles.SC_cardBtnFilled}
                        onClick={() => {
                          handleDelete(category._id)
                        }}
                      >
                        Delete
                      </Button>
                    )}
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
