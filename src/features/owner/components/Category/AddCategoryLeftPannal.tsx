import { Box, Typography, TextField, Button, MenuItem } from '@mui/material'
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded'
import { useState } from 'react'
import type { ChangeEvent, FocusEvent, SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../../../../styles/ownerStyle/AddCategury.module.css'
import { apiPost } from '../../../../api/userApi'
import { CATEGORY_ENDPOINTS } from '../../../../api/endpoints'
import type { NotificationInterfacce } from '../../../../auth/types/auth.types'
import type {
  AddCategoryForm,
  AddCategoryErrors,
  AddCategoryLeftPannalProps,
} from '../../types/category.types'
import Loader from '../../../../utils/Loader'
import Notification from '../../../../utils/Notification'

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

const AddCategoryLeftPannal = ({ subOwnerId, onCategoryCreated }: AddCategoryLeftPannalProps) => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState<AddCategoryForm>({
    productCategory: '',
    categoryDescription: '',
    OwnerId: '',
    categoryActive: '',
  })
  const [error, setError] = useState<AddCategoryErrors>({
    productCategory: '',
    categoryDescription: '',
    OwnerId: '',
    categoryActive: '',
  })
  const [loading, setLoading] = useState<boolean>(false)
  const [notification, setNotification] = useState<NotificationInterfacce>({
    open: false,
    message: '',
    severity: 'success',
  })

  const [MainOwnerName] = useState(() => {
    const auth = localStorage.getItem('nexbasket_auth')
    return auth ? JSON.parse(auth)?.user?.fullName || '' : ''
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

  const handleAddCategory = async (event: SyntheticEvent) => {
    event.preventDefault()

    const newErrors: AddCategoryErrors = {
      productCategory: validateCategoryField('productCategory', formData.productCategory),
      categoryDescription: validateCategoryField('description', formData.categoryDescription),
      OwnerId: validateCategoryField('subOwner', formData.OwnerId),
      categoryActive: validateCategoryField('isActive', formData.categoryActive),
    }
    setError(newErrors)
    if (Object.values(newErrors).some(Boolean)) return

    setLoading(true)
    try {
      const payload = {
        productCategory: formData.productCategory.trim(),
        categoryDescription: formData.categoryDescription.trim(),
        OwnerId: subOwnerId,
        categoryActive: formData.categoryActive,
        MainOwnerName: MainOwnerName,
      }
      
      const response = await apiPost<{ message?: string }>(CATEGORY_ENDPOINTS.CREATE, payload)
      setNotification({
        open: true,
        message: response?.message || 'Category created successfully',
        severity: 'success',
      })
      setFormData({ productCategory: '', categoryDescription: '', OwnerId: '', categoryActive: '' })
      onCategoryCreated?.()
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
    <Box className={styles.AC_leftWrapper}>
      <Box className={styles.AC_panelHeader}>
        <Box className={styles.AC_panelIcon}>
          <CategoryRoundedIcon />
        </Box>
        <Box>
          <Typography className={styles.AC_panelTitle}>Add Category</Typography>
          <Typography className={styles.AC_panelSubtitle}>
            Create a new product category for your store
          </Typography>
        </Box>
      </Box>

      <Box
        className={styles.AC_form}
        component="form"
        onSubmit={handleAddCategory}
        noValidate
      >
        <Box className={styles.AC_formBody}>
          <Box>
            <Typography className={styles.AC_fieldLabel}>Owner Id</Typography>
            <TextField
              fullWidth
              placeholder={subOwnerId}
              name="OwnerId"
              value={subOwnerId}
              onBlur={handleOnBlur}
              onChange={handleOnChange}
              disabled
            />
          </Box>

          <Box>
            <Typography className={styles.AC_fieldLabel}>Category Name</Typography>
            <TextField
              fullWidth
              placeholder="e.g. Groceries"
              name="productCategory"
              value={formData.productCategory}
              onBlur={handleOnBlur}
              onChange={handleOnChange}
              error={Boolean(error?.productCategory)}
              helperText={error.productCategory}
            />
          </Box>

          <Box>
            <Typography className={styles.AC_fieldLabel}>Description</Typography>
            <TextField
              fullWidth
              multiline
              minRows={3}
              placeholder="e.g. Grocery items"
              name="categoryDescription"
              value={formData.categoryDescription}
              onBlur={handleOnBlur}
              onChange={handleOnChange}
              error={Boolean(error?.categoryDescription)}
              helperText={error.categoryDescription}
            />
          </Box>

          <Box>
            <Typography className={styles.AC_fieldLabel}>Status</Typography>
            <TextField
              select
              fullWidth
              value={formData.categoryActive}
              onBlur={handleOnBlur}
              onChange={handleOnChange}
              name="categoryActive"
            >
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Inactive</MenuItem>
            </TextField>
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
          <Button type="submit" variant="contained" className={styles.AC_saveBtn} disabled={loading}>
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

export default AddCategoryLeftPannal
