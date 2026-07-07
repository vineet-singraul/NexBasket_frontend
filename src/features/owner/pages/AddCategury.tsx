import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
} from '@mui/material'
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded'
import { useState } from 'react'
import type { ChangeEvent, FocusEvent, SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../../../styles/ownerStyle/AddCategury.module.css'
import { apiPost } from '../../../api/userApi'
import { CATEGORY_ENDPOINTS } from '../../../api/endpoints'
import type { NotificationInterfacce } from '../../../auth/types/auth.types'
import type { AddCategoryForm, AddCategoryErrors, CategoryOption } from '../types/category.types'
import Loader from '../../../utils/Loader'
import Notification from '../../../utils/Notification'

// No parent-category API to source options from yet — starts empty so the
// dropdown only ever offers "No Parent (Top Level Category)" until one is wired up.
const PARENT_CATEGORY_OPTIONS: CategoryOption[] = []

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

const AddCategury = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState<AddCategoryForm>({
    name: '',
    description: '',
    parentCategory: null,
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

  const handleParentCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setFormData((prev) => ({ ...prev, parentCategory: value || null }))
  }

  const handleCancel = () => {
    navigate('/owner/dashboard')
  }

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
        name: formData.name.trim(),
        description: formData.description.trim(),
        parentCategory: formData.parentCategory,
      }
      const response = await apiPost<{ message?: string }>(CATEGORY_ENDPOINTS.CREATE, payload)
      setNotification({
        open: true,
        message: response?.message || 'Category created successfully',
        severity: 'success',
      })
      setFormData({ name: '', description: '', parentCategory: null })
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

  return (
    <Box className={styles.wrap}>
      <Box className={styles.pageHeader}>
        <Typography className={styles.pageTitle}>Add Category</Typography>
        <Typography className={styles.pageSubtitle}>
          Create a new product category, or nest it under an existing one.
        </Typography>
      </Box>

      <Box className={styles.card} component="form" onSubmit={handleAddCategory} noValidate>
        <Box className={styles.cardHeader}>
          <Box className={styles.cardHeaderIcon}>
            <CategoryRoundedIcon />
          </Box>
          <Box>
            <Typography className={styles.cardHeaderTitle}>Category Details</Typography>
            <Typography className={styles.cardHeaderSubtitle}>
              Fields marked are used to organise products in the store.
            </Typography>
          </Box>
        </Box>

        <Box className={styles.fieldGroup}>
          <Box>
            <Typography className={styles.fieldLabel}>Category Name</Typography>
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

          <Box>
            <Typography className={styles.fieldLabel}>Description</Typography>
            <TextField
              fullWidth
              multiline
              minRows={3}
              placeholder="e.g. Grocery items"
              name="description"
              value={formData.description}
              onBlur={handleOnBlur}
              onChange={handleOnChange}
              error={Boolean(error?.description)}
              helperText={error.description}
            />
          </Box>

          <Box>
            <Typography className={styles.fieldLabel}>Parent Category</Typography>
            <TextField
              select
              fullWidth
              name="parentCategory"
              value={formData.parentCategory ?? ''}
              onChange={handleParentCategoryChange}
            >
              <MenuItem value="">No Parent (Top Level Category)</MenuItem>
              {PARENT_CATEGORY_OPTIONS.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>

        <Box className={styles.actions}>
          <Button
            type="button"
            variant="outlined"
            className={styles.cancelBtn}
            onClick={handleCancel}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained" className={styles.saveBtn} disabled={loading}>
            Create Category
          </Button>
        </Box>
      </Box>

      {loading && <Loader />}
      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
      />
    </Box>
  )
}

export default AddCategury
