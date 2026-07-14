import { Box, Typography, TextField, Button, MenuItem } from '@mui/material'
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded'
import {  useEffect, useState } from 'react'
import type { ChangeEvent, FocusEvent, SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../../../styles/ownerStyle/AddCategury.module.css'
import { apiGet, apiPost } from '../../../api/userApi'
import { CATEGORY_ENDPOINTS } from '../../../api/endpoints'
import type { NotificationInterfacce } from '../../../auth/types/auth.types'
import type { AddCategoryForm, AddCategoryErrors, CategoryOption } from '../types/category.types'
import Loader from '../../../utils/Loader'
import Notification from '../../../utils/Notification'

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
    subOwner: '',
    isActive: '',
  })
  const [error, setError] = useState<AddCategoryErrors>({
    name: '',
    description: '',
    subOwner: '',
    isActive: '',
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [notification, setNotification] = useState<NotificationInterfacce>({
    open: false,
    message: '',
    severity: 'success',
  })

  const [subOwnerId] = useState(() => {
    const auth = localStorage.getItem('nexbasket_auth')
    return auth ? JSON.parse(auth)?.user?._id || '' : ''
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

  const handleCancel = () => {
    navigate('/owner/dashboard')
  }
  

  const fetchSubOwnerCategory = async () => {
  try {
    const response = await apiGet(
      CATEGORY_ENDPOINTS.GETSUBOWNERCATEGORYLIST(subOwnerId)
    );

    console.log("Response:", response);
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  if (subOwnerId) {
    fetchSubOwnerCategory();
  }
}, [subOwnerId]);
  

  const handleAddCategory = async (event: SyntheticEvent) => {
    event.preventDefault()

    const newErrors: AddCategoryErrors = {
      name: validateCategoryField('name', formData.name),
      description: validateCategoryField('description', formData.description),
      subOwner: validateCategoryField('subOwner', formData.subOwner),
      isActive: validateCategoryField('isActive', formData.isActive),
    }
    setError(newErrors)
    if (Object.values(newErrors).some(Boolean)) return

    setLoading(true)
    try {
      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        subOwner: subOwnerId,
        isActive: formData.isActive,
      }
      const response = await apiPost<{ message?: string }>(CATEGORY_ENDPOINTS.CREATE, payload)
      setNotification({
        open: true,
        message: response?.message || 'Category created successfully',
        severity: 'success',
      })
      setFormData({ name: '', description: '', subOwner: '', isActive: '' })
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
      </Box>

      <Box className={styles.card} component="form" onSubmit={handleAddCategory} noValidate>
        <Box className={styles.cardHeader}>
          <Box className={styles.cardHeaderIcon}>
            <CategoryRoundedIcon />
          </Box>
          <Box>
            <Typography className={styles.cardHeaderTitle}>Category Details</Typography>
          </Box>
        </Box>

        <Box className={styles.fieldGroup}>
          <Box>
            <Typography className={styles.fieldLabel}>Parent Category</Typography>
            <TextField
              fullWidth
              placeholder={subOwnerId}
              name="subOwner"
              value={subOwnerId}
              onBlur={handleOnBlur}
              onChange={handleOnChange}
              disabled
            />
          </Box>

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
            <TextField select fullWidth label="Is Active" className="mui-field" 
              value={formData.isActive}
              onBlur={handleOnBlur}
              onChange={handleOnChange}
              name='isActive'
            >
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Inactive</MenuItem>
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
