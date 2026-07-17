import { Box, Typography, TextField, Button } from '@mui/material'
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded'
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined'
import categoryStyles from '../../../../styles/ownerStyle/AddCategury.module.css'
import style from '../../../../styles/ownerStyle/AddStore.module.css'
import type { Errors, Store } from '../../types/store.types'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateField } from '../../../../utils/validators'
import { apiPostForm } from '../../../../api/userApi'
import { STORE_ENDPOINTS } from '../../../../api/endpoints'
import type { NotificationInterfacce } from '../../../../auth/types/auth.types'
import Loader from '../../../../utils/Loader'
import Notification from '../../../../utils/Notification'

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024

const validateImageFile = (file: File | null): string => {
  if (!file) return 'This field is required'
  if (!file.type.startsWith('image/')) return 'Only image files are allowed'
  if (file.size > MAX_IMAGE_SIZE_BYTES) return 'Image must be under 5MB'
  return ''
}

const AddStore = () => {
  const navigate = useNavigate()

  const [storeData, setStoreData] = useState<Store>({
    owner: '',
    storeName: '',
    logo: null,
    banner: null,
    description: '',
    email: '',
    phone: '',
    gstNumber: '',

    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      pincode: '',
    },

    rating: 0,
    totalSales: 0,
    active: true,
  })

  const [errors, setErrors] = useState<Errors>({
    owner: '',
    storeName: '',
    logo: '',
    banner: '',
    description: '',
    email: '',
    phone: '',
    gstNumber: '',
    street: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    active: '',
  })

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const errorKey = (name.startsWith('address.') ? name.split('.')[1] : name) as keyof Errors
    setErrors((prev) => ({ ...prev, [errorKey]: validateField(name, value) }))
  }

  const handleOnchange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    if (name.startsWith('address.')) {
      const field = name.split('.')[1] as keyof Store['address']
      setStoreData((prev) => ({ ...prev, address: { ...prev.address, [field]: value } }))
    } else {
      setStoreData((prev) => ({ ...prev, [name]: value }))
    }

    const errorKey = (name.startsWith('address.') ? name.split('.')[1] : name) as keyof Errors
    setErrors((prev) => ({
      ...prev,
      [errorKey]: prev[errorKey] ? validateField(name, value) : '',
    }))
  }

  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [bannerPreview, setBannerPreview] = useState<string | null>(null)

  useEffect(() => {
    return () => {
      if (logoPreview) URL.revokeObjectURL(logoPreview)
      if (bannerPreview) URL.revokeObjectURL(bannerPreview)
    }
  }, [logoPreview, bannerPreview])

  const handleFileChange =
    (field: 'logo' | 'banner', setPreview: React.Dispatch<React.SetStateAction<string | null>>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] ?? null
      setStoreData((prev) => ({ ...prev, [field]: file }))
      setErrors((prev) => ({ ...prev, [field]: validateImageFile(file) }))

      setPreview((prevUrl) => {
        if (prevUrl) URL.revokeObjectURL(prevUrl)
        return file ? URL.createObjectURL(file) : null
      })
    }

  const [loading, setLoading] = useState<boolean>(false)
  const [notification, setNotification] = useState<NotificationInterfacce>({
    open: false,
    message: '',
    severity: 'success',
  })

  const handleCancel = () => {
    navigate('/owner/dashboard')
  }

  const handleCreateStore = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    const newErrors: Errors = {
      storeName: validateField('storeName', storeData.storeName),
      description: validateField('description', storeData.description),
      email: validateField('email', storeData.email),
      phone: validateField('phone', storeData.phone),
      gstNumber: validateField('gstNumber', storeData.gstNumber),
      street: validateField('address.street', storeData.address.street),
      city: validateField('address.city', storeData.address.city),
      state: validateField('address.state', storeData.address.state),
      country: validateField('address.country', storeData.address.country),
      pincode: validateField('address.pincode', storeData.address.pincode),
    }
    setErrors((prev) => ({ ...prev, ...newErrors }))
    if (Object.values(newErrors).some(Boolean)) return

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('storeName', storeData.storeName.trim())
      formData.append('email', storeData.email.trim())
      formData.append('phone', storeData.phone.trim())
      formData.append('gstNumber', storeData.gstNumber.trim())
      formData.append('description', storeData.description)
      formData.append(
        'address',
        JSON.stringify({
          street: storeData.address.street.trim(),
          city: storeData.address.city.trim(),
          state: storeData.address.state.trim(),
          country: storeData.address.country.trim(),
          pincode: storeData.address.pincode.trim(),
        }),
      )
      if (storeData.logo) formData.append('logo', storeData.logo)
      if (storeData.banner) formData.append('banner', storeData.banner)

      const response = await apiPostForm<{ message?: string }>(STORE_ENDPOINTS.CREATE, formData)
      setNotification({
        open: true,
        message: response?.message || 'Store created successfully',
        severity: 'success',
      })
      setStoreData({
        owner: '',
        storeName: '',
        logo: null,
        banner: null,
        description: '',
        email: '',
        phone: '',
        gstNumber: '',
        address: { street: '', city: '', state: '', country: '', pincode: '' },
        rating: 0,
        totalSales: 0,
        active: true,
      })
      setLogoPreview(null)
      setBannerPreview(null)
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
    <Box className={categoryStyles.AC_leftWrapper}>
      <Box className={categoryStyles.AC_panelHeader}>
        <Box className={categoryStyles.AC_panelIcon}>
          <StorefrontOutlinedIcon />
        </Box>
        <Box>
          <Typography className={categoryStyles.AC_panelTitle}>Create Store</Typography>
          <Typography className={categoryStyles.AC_panelSubtitle}>
            Create a new product store for add Products
          </Typography>
        </Box>
      </Box>

        <Box
          className={categoryStyles.AC_form}
          component="form"
          onSubmit={handleCreateStore}
          noValidate
        >
          <Box className={categoryStyles.AC_formBody}>
            <Box className={style.row}>
              <Box>
                <Typography className={categoryStyles.AC_fieldLabel}>Store Name</Typography>
                <TextField
                  fullWidth
                  placeholder="e.g. Fresh Mart"
                  name="storeName"
                  value={storeData.storeName}
                  onChange={handleOnchange}
                  onBlur={handleBlur}
                  error={Boolean(errors.storeName)}
                  helperText={errors.storeName}
                />
              </Box>

              <Box>
                <Typography className={categoryStyles.AC_fieldLabel}>Email</Typography>
                <TextField
                  fullWidth
                  placeholder="e.g. store@example.com"
                  name="email"
                  value={storeData.email}
                  onChange={handleOnchange}
                  onBlur={handleBlur}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                />
              </Box>
            </Box>

            <Box className={style.row}>
              <Box>
                <Typography className={categoryStyles.AC_fieldLabel}>Phone</Typography>
                <TextField
                  fullWidth
                  placeholder="e.g. 9876543210"
                  name="phone"
                  value={storeData.phone}
                  onChange={handleOnchange}
                  onBlur={handleBlur}
                  error={Boolean(errors.phone)}
                  helperText={errors.phone}
                />
              </Box>

              <Box>
                <Typography className={categoryStyles.AC_fieldLabel}>GST Number</Typography>
                <TextField
                  fullWidth
                  placeholder="e.g. 22AAAAA0000A1Z5"
                  name="gstNumber"
                  value={storeData.gstNumber}
                  onChange={handleOnchange}
                  onBlur={handleBlur}
                  error={Boolean(errors.gstNumber)}
                  helperText={errors.gstNumber}
                />
              </Box>
            </Box>

            <Box>
              <Typography className={categoryStyles.AC_fieldLabel}>Description</Typography>
              <TextField
                fullWidth
                multiline
                minRows={2}
                placeholder="e.g. Your one-stop grocery store"
                name="description"
                value={storeData.description}
                onChange={handleOnchange}
                onBlur={handleBlur}
                error={Boolean(errors.description)}
                helperText={errors.description}
              />
            </Box>

            <Typography className={categoryStyles.AC_panelTitle} sx={{ fontSize: '14px !important' }}>
              Address
            </Typography>

            <Box>
              <Typography className={categoryStyles.AC_fieldLabel}>Street</Typography>
              <TextField
                fullWidth
                placeholder="e.g. MG Road"
                name="address.street"
                value={storeData.address.street}
                onChange={handleOnchange}
                onBlur={handleBlur}
                error={Boolean(errors.street)}
                helperText={errors.street}
              />
            </Box>

            <Box className={style.row}>
              <Box>
                <Typography className={categoryStyles.AC_fieldLabel}>City</Typography>
                <TextField
                  fullWidth
                  placeholder="e.g. Indore"
                  name="address.city"
                  value={storeData.address.city}
                  onChange={handleOnchange}
                  onBlur={handleBlur}
                  error={Boolean(errors.city)}
                  helperText={errors.city}
                />
              </Box>

              <Box>
                <Typography className={categoryStyles.AC_fieldLabel}>State</Typography>
                <TextField
                  fullWidth
                  placeholder="e.g. Madhya Pradesh"
                  name="address.state"
                  value={storeData.address.state}
                  onChange={handleOnchange}
                  onBlur={handleBlur}
                  error={Boolean(errors.state)}
                  helperText={errors.state}
                />
              </Box>
            </Box>

            <Box className={style.row}>
              <Box>
                <Typography className={categoryStyles.AC_fieldLabel}>Country</Typography>
                <TextField
                  fullWidth
                  placeholder="e.g. India"
                  name="address.country"
                  value={storeData.address.country}
                  onChange={handleOnchange}
                  onBlur={handleBlur}
                  error={Boolean(errors.country)}
                  helperText={errors.country}
                />
              </Box>

              <Box>
                <Typography className={categoryStyles.AC_fieldLabel}>Pincode</Typography>
                <TextField
                  fullWidth
                  placeholder="e.g. 452001"
                  name="address.pincode"
                  value={storeData.address.pincode}
                  onChange={handleOnchange}
                  onBlur={handleBlur}
                  error={Boolean(errors.pincode)}
                  helperText={errors.pincode}
                />
              </Box>
            </Box>

            <Box className={style.uploadField}>
              <Box sx={{ flex: 1 }}>
                <Typography className={categoryStyles.AC_fieldLabel}>Logo</Typography>
                <Box className={style.uploadRow}>
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<CloudUploadRoundedIcon />}
                    className={style.uploadBtn}
                  >
                    {storeData.logo ? storeData.logo.name : 'Logo preview'}
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleFileChange('logo', setLogoPreview)}
                    />
                  </Button>
                  {logoPreview && (
                    <img src={logoPreview} alt="Logo preview" className={style.previewImg} />
                  )}
                </Box>
                {errors.logo && <Typography className={style.fieldError}>{errors.logo}</Typography>}
              </Box>

              <Box sx={{ flex: 1 }}>
                <Typography className={categoryStyles.AC_fieldLabel}>Banner</Typography>
                <Box className={style.uploadRow}>
                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={<CloudUploadRoundedIcon />}
                    className={style.uploadBtn}
                  >
                    {storeData.banner ? storeData.banner.name : 'Choose Banner'}
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleFileChange('banner', setBannerPreview)}
                    />
                  </Button>
                  {bannerPreview && (
                    <img src={bannerPreview} alt="Banner preview" className={style.previewImg} />
                  )}
                </Box>
                {errors.banner && (
                  <Typography className={style.fieldError}>{errors.banner}</Typography>
                )}
              </Box>
            </Box>
          </Box>

          <Box className={categoryStyles.AC_actions}>
            <Button
              type="button"
              variant="outlined"
              className={categoryStyles.AC_cancelBtn}
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              className={categoryStyles.AC_saveBtn}
              disabled={loading}
            >
              Create Store
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

export default AddStore
