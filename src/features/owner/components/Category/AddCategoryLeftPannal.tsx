import { Box, Typography, TextField, Button, IconButton, MenuItem } from '@mui/material'
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded'
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded'
import { useEffect, useState } from 'react'
import type { ChangeEvent, FocusEvent, SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../../../../styles/ownerStyle/AddCategury.module.css'
import { apiGet, apiPost, apiPut } from '../../../../api/userApi'
import { CATEGORY_ENDPOINTS } from '../../../../api/endpoints'
import type { NotificationInterfacce } from '../../../../auth/types/auth.types'
import type {
  AddCategoryForm,
  AddCategoryErrors,
  AddCategoryLeftPannalProps,
  CategoryListItem,
} from '../../types/category.types'
import { slugify } from '../../../../utils/slugify'
import Loader from '../../../../utils/Loader'
import Notification from '../../../../utils/Notification'
import ShowSingleCategory from './showSingleCategory'
import { useParams } from 'react-router-dom'

const validateCategoryField = (name: string, value: string): string => {
  const trimmed = value.trim()

  switch (name) {
    case 'name':
      if (!trimmed) return 'Category name is required'
      if (trimmed.length < 2) return 'Category name must be at least 2 characters'
      if (trimmed.length > 50) return 'Category name must be under 50 characters'
      return ''

    case 'description':
      if (trimmed.length > 200) return 'Description must be under 200 characters'
      return ''

    default:
      return ''
  }
}

const AddCategoryLeftPannal = ({ subOwnerId }: AddCategoryLeftPannalProps) => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const [formData, setFormData] = useState<AddCategoryForm>({
    name: '',
    slug: '',
    description: '',
    image: '',
    isActive: 'true',
  })
  const [error, setError] = useState<AddCategoryErrors>({
    name: '',
    description: '',
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [notification, setNotification] = useState<NotificationInterfacce>({
    open: false,
    message: '',
    severity: 'success',
  })
  const [open, setOpen] = useState<boolean>(false)
  const [showSingleCategory, setShowSingleCategory] = useState<CategoryListItem | null>(null)

  const onEditId = id !== 'undefined' ? id : undefined

  const handleOnBlur = (event: FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setError((prev) => ({ ...prev, [name]: validateCategoryField(name, value) }))
  }

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError((prev) => ({
      ...prev,
      [name]: prev[name as keyof AddCategoryErrors] ? validateCategoryField(name, value) : '',
    }))
  }

  const handleCancel = () => {
    navigate('/owner/dashboard')
  }

  // Add Category :
  const handleAddCategory = async (event: SyntheticEvent) => {
    event.preventDefault()

    const newErrors: AddCategoryErrors = {
      name: validateCategoryField('name', formData.name),
      description: validateCategoryField('description', formData.description),
    }
    setError(newErrors)
    if (Object.values(newErrors).some(Boolean)) return

    setLoading(true)
    try {
      const payload = {
        ownerId: subOwnerId,
        name: formData.name.trim(),
        slug: formData.slug.trim() || slugify(formData.name),
        description: formData.description.trim(),
        image: formData.image.trim(),
        isActive: formData.isActive === 'true',
      }

      const response = await apiPost<{ message?: string }>(CATEGORY_ENDPOINTS.CREATE, payload)
      setNotification({
        open: true,
        message: response?.message || 'Category created successfully',
        severity: 'success',
      })
      setFormData({ name: '', slug: '', description: '', image: '', isActive: 'true' })
    } catch (err) {
      setNotification({
        open: true,
        message: err instanceof Error ? err.message : 'Something went wrong',
        severity: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  // Get Category :
  const showAllCategory = async () => {
    if (!onEditId) return
    setLoading(true)
    try {
      const response = await apiGet(CATEGORY_ENDPOINTS.GET_CATEGORY_BY_ID(onEditId))
      console.log('Show Single Category Response : ', response)
      const category = (response as { data: CategoryListItem }).data
      setFormData({
        name: category.name || '',
        slug: category.slug || '',
        description: category.description || '',
        image: category.image || '',
        isActive: category.isActive ? 'true' : 'false',
      })
    } catch (error) {
      setNotification({
        open: true,
        message: error instanceof Error ? error.message : 'Something went wrong',
        severity: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  // Update Category :
  const handleUpdateCategory = async (event: SyntheticEvent) => {
    event.preventDefault()
    if (!onEditId) return

    const newErrors: AddCategoryErrors = {
      name: validateCategoryField('name', formData.name),
      description: validateCategoryField('description', formData.description),
    }
    setError(newErrors)
    if (Object.values(newErrors).some(Boolean)) return

    setLoading(true)
    try {
      const payload = {
        ownerId: subOwnerId,
        name: formData.name.trim(),
        slug: formData.slug.trim() || slugify(formData.name),
        description: formData.description.trim(),
        image: formData.image.trim(),
        isActive: formData.isActive === 'true',
      }

      const response = await apiPut<{ message?: string }>(
        CATEGORY_ENDPOINTS.UPDATE_CATEGORY(onEditId),
        payload,
      )
      setNotification({
        open: true,
        message: response?.message || 'Category updated successfully',
        severity: 'success',
      })
    } catch (err) {
      setNotification({
        open: true,
        message: err instanceof Error ? err.message : 'Something went wrong',
        severity: 'error',
      })
    } finally {
      setLoading(false)
      setFormData({
        name: '',
        slug: '',
        description: '',
        image: '',
        isActive: 'true',
      })
      navigate("/owner/category/add")
      setOpen(!open)
    }
  }

  useEffect(() => {
    if (!onEditId) return
    let isActive = true
    void Promise.resolve().then(() => showAllCategory())
    return () => {
      isActive = false
    }
  }, [onEditId])

  return (
    <Box className={styles.AC_leftWrapper}>
      <Box>
        <Box className={styles.AC_panelHeader}>
          <Box className={styles.AC_panelIcon}>
            <CategoryRoundedIcon />
          </Box>
          {onEditId ? (
            <Box>
              <Typography className={styles.AC_panelTitle}>Update Category</Typography>
              <Typography className={styles.AC_panelSubtitle}>
                Update a category for your store
              </Typography>
            </Box>
          ) : (
            <Box>
              <Typography className={styles.AC_panelTitle}>Add Category</Typography>
              <Typography className={styles.AC_panelSubtitle}>
                Create a new product category for your store
              </Typography>
            </Box>
          )}

          <IconButton
            type="button"
            className={styles.AC_actionBtn}
            sx={{ marginLeft: 'auto' }}
            onClick={() => {
              setOpen(!open)
            }}
          >
            <FormatListBulletedRoundedIcon />
          </IconButton>
        </Box>
      </Box>

      <Box className={styles.AC_form} component="form" noValidate>
        <Box className={styles.AC_formBody}>
          <Box className={styles.AC_formRow}>
            <Box>
              <Typography className={styles.AC_fieldLabel}>Owner Id</Typography>
              <TextField
                fullWidth
                placeholder={subOwnerId}
                name="ownerId"
                value={subOwnerId}
                disabled
              />
            </Box>

            <Box>
              <Typography className={styles.AC_fieldLabel}>Category Name</Typography>
              <TextField
                fullWidth
                placeholder="e.g. Groceries"
                name="name"
                value={formData.name}
                onBlur={handleOnBlur}
                onChange={handleOnChange}
                error={Boolean(error?.name)}
                helperText={error.name}
              />
            </Box>
          </Box>

          <Box className={styles.AC_formRow}>
            <Box>
              <Typography className={styles.AC_fieldLabel}>Slug</Typography>
              <TextField
                fullWidth
                placeholder={formData.name.trim() ? slugify(formData.name) : 'e.g. groceries'}
                name="slug"
                value={formData.slug}
                onChange={handleOnChange}
              />
            </Box>
          </Box>

          <Box className={styles.AC_formRow}>
            <Box>
              <Typography className={styles.AC_fieldLabel}>Image URL</Typography>
              <TextField
                fullWidth
                placeholder="https://example.com/images/category.png"
                name="image"
                value={formData.image}
                onChange={handleOnChange}
              />
            </Box>

            <Box>
              <Typography className={styles.AC_fieldLabel}>Status</Typography>
              <TextField
                select
                fullWidth
                value={formData.isActive}
                onChange={handleOnChange}
                name="isActive"
              >
                <MenuItem value="true">Active</MenuItem>
                <MenuItem value="false">Inactive</MenuItem>
              </TextField>
            </Box>
          </Box>

          <Box className={styles.AC_descriptionGroup}>
            <Typography className={styles.AC_fieldLabel}>Description</Typography>
            <TextField
              fullWidth
              multiline
              placeholder="e.g. Grocery items"
              name="description"
              value={formData.description}
              onBlur={handleOnBlur}
              onChange={handleOnChange}
              error={Boolean(error?.description)}
              helperText={error.description}
            />
          </Box>
        </Box>

        <Box className={styles.AC_actions}>
          <Button
            type="button"
            variant="outlined"
            className={styles.AC_cancelBtn}
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </Button>

          {onEditId ? (
            <Button
              type="submit"
              variant="contained"
              className={styles.AC_saveBtn}
              disabled={loading}
              onClick={handleUpdateCategory}
            >
              Update Category
            </Button>
          ) : (
            <Button
              type="submit"
              variant="contained"
              className={styles.AC_saveBtn}
              disabled={loading}
              onClick={handleAddCategory}
            >
              Create Category
            </Button>
          )}
        </Box>
      </Box>

      {loading && <Loader />}

      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
      />

      {open && <ShowSingleCategory onClose={() => setOpen(false)} />}
    </Box>
  )
}

export default AddCategoryLeftPannal
