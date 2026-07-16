import { Box, Typography, Paper, TextField, Button } from '@mui/material'
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded'
import style from '../../../styles/ownerStyle/AddStore.module.css'
import type { Errors, Store, StoreListItem } from '../types/store.types'
import React, { useEffect, useState } from 'react'
import { validateField } from '../../../utils/validators'
import { apiGet, apiPostForm } from '../../../api/userApi'
import { STORE_ENDPOINTS } from '../../../api/endpoints'
import type { NotificationInterfacce } from '../../../auth/types/auth.types'
import Loader from '../../../utils/Loader'
import Notification from '../../../utils/Notification'

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024

const validateImageFile = (file: File | null): string => {
  if (!file) return 'This field is required'
  if (!file.type.startsWith('image/')) return 'Only image files are allowed'
  if (file.size > MAX_IMAGE_SIZE_BYTES) return 'Image must be under 5MB'
  return ''
}

const AddStore = () => {
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

  const handleCreateStore = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    const newErrors: Errors = {
      storeName: validateField('storeName', storeData.storeName),
      description: validateField('description',storeData.description),
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
      fetchAllStores()
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

  const [stores, setStores] = useState<StoreListItem[]>([])
  const [storesLoading, setStoresLoading] = useState<boolean>(false)

  const fetchAllStores = async () => {
    setStoresLoading(true)
    try {
      const response = await apiGet<{ stores?: StoreListItem[] } | StoreListItem[]>(STORE_ENDPOINTS.LIST)
      const list = Array.isArray(response) ? response : response?.stores ?? []
      setStores(list)
    } catch (err) {
      setNotification({
        open: true,
        message: err instanceof Error ? err.message : 'Failed to load stores',
        severity: 'error',
      })
    } finally {
      setStoresLoading(false)
    }
  }

  useEffect(() => {
    fetchAllStores()
  }, [])


  return (
    <>
      <Box className={style.AS_mainWrapper}>
        {/* Left Side */}
        <Paper className={style.AS_leftWrapper} elevation={4}>
          <Typography variant="h5" className={style.heading}>
            Create Store
          </Typography>

          <Box component="form" className={style.form} onSubmit={handleCreateStore} noValidate>
            <TextField
              fullWidth
              label="Store Name"
              name="storeName"
              value={storeData.storeName}
              onChange={handleOnchange}
              onBlur={handleBlur}
              error={Boolean(errors.storeName)}
              helperText={errors.storeName}
            />
            <TextField
              fullWidth
              multiline
              rows={3}
              label="Description"
              name="description"
              value={storeData.description}
              onChange={handleOnchange}
              onBlur={handleBlur}
              error={Boolean(errors.description)}
              helperText={errors.description}
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              value={storeData.email}
              onChange={handleOnchange}
              onBlur={handleBlur}
              error={Boolean(errors.email)}
              helperText={errors.email}
            />

            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={storeData.phone}
              onChange={handleOnchange}
              onBlur={handleBlur}
              error={Boolean(errors.phone)}
              helperText={errors.phone}
            />

            <TextField
              fullWidth
              label="GST Number"
              name="gstNumber"
              value={storeData.gstNumber}
              onChange={handleOnchange}
              onBlur={handleBlur}
              error={Boolean(errors.gstNumber)}
              helperText={errors.gstNumber}
            />

            <Typography className={style.subHeading}>Address</Typography>

            <TextField
              fullWidth
              label="Street"
              name="address.street"
              value={storeData.address.street}
              onChange={handleOnchange}
              onBlur={handleBlur}
              error={Boolean(errors.street)}
              helperText={errors.street}
            />

            <Box className={style.row}>
              <TextField
                fullWidth
                label="City"
                name="address.city"
                value={storeData.address.city}
                onChange={handleOnchange}
                onBlur={handleBlur}
                error={Boolean(errors.city)}
                helperText={errors.city}
              />

              <TextField
                fullWidth
                label="State"
                name="address.state"
                value={storeData.address.state}
                onChange={handleOnchange}
                onBlur={handleBlur}
                error={Boolean(errors.state)}
                helperText={errors.state}
              />
            </Box>

            <Box className={style.row}>
              <TextField
                fullWidth
                label="Country"
                name="address.country"
                value={storeData.address.country}
                onChange={handleOnchange}
                onBlur={handleBlur}
                error={Boolean(errors.country)}
                helperText={errors.country}
              />

              <TextField
                fullWidth
                label="Pincode"
                name="address.pincode"
                value={storeData.address.pincode}
                onChange={handleOnchange}
                onBlur={handleBlur}
                error={Boolean(errors.pincode)}
                helperText={errors.pincode}
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'start', gap: 5 }}>
              <Box className={style.uploadField}>
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

              <Box className={style.uploadField}>
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

              <Button
                type="submit"
                variant="contained"
                className={style.createBtn}
                sx={{ mt: 5 }}
                disabled={loading}
              >
                Create Store
              </Button>
            </Box>
          </Box>
        </Paper>

        {/* Right Side */}

        <Paper className={style.AS_rightWrapper} elevation={4}>
          <Typography variant="h5" className={style.heading}>
            Your Stores
          </Typography>

          <Box className={style.storeList}>
            {storesLoading && (
              <Typography sx={{ color: 'var(--nb-gray)' }}>Loading stores…</Typography>
            )}

            {!storesLoading && stores.length === 0 && (
              <Typography sx={{ color: 'var(--nb-gray)' }}>
                No stores yet. Create your first store.
              </Typography>
            )}

            {stores.map((s) => (
              <Box className={style.storeCard} key={s._id}>
                <img src={s.logo || 'https://via.placeholder.com/80'} alt={s.storeName} />

                <Box>
                  <Typography variant="h6" sx={{ color: 'var(--nb-dark)' }}>
                    {s.storeName}
                  </Typography>

                  <Typography sx={{ color: 'var(--nb-gray)' }}>{s.address?.city}</Typography>

                  <Typography color={s.active ? '#63ff83' : '#ff6b6b'}>
                    {s.active ? 'Active' : 'Inactive'}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Paper>
      </Box>

      {loading && <Loader />}
      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
      />
    </>
  )
}

export default AddStore
