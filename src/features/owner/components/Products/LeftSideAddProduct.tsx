import React, { useEffect } from 'react'
import { useState } from 'react'
import {
  Box,
  Typography,
  TextField,
  Stepper,
  Step,
  StepLabel,
  Button,
  Stack,
  InputAdornment,
  Autocomplete,
} from '@mui/material'

import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined'
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import BrandingWatermarkOutlinedIcon from '@mui/icons-material/BrandingWatermarkOutlined'
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined'
import HomeMaxOutlinedIcon from '@mui/icons-material/HomeMaxOutlined'
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined'
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined'
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined'
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined'
import ChecklistIcon from '@mui/icons-material/Checklist'
import AutofpsSelectIcon from '@mui/icons-material/AutofpsSelect'
import SellOutlinedIcon from '@mui/icons-material/SellOutlined'
import ScaleOutlinedIcon from '@mui/icons-material/ScaleOutlined'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined'
import WidthFullOutlinedIcon from '@mui/icons-material/WidthFullOutlined'
import HeightOutlinedIcon from '@mui/icons-material/HeightOutlined'
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined'
import GradingIcon from '@mui/icons-material/Grading'
import type { CategoryListItem } from '../../types/category.types.js'

const steps = ['Details', 'Desciptions', 'Pricing']

import type { Product, ProductErrors } from '../../types/product.types'
import type { NotificationInterfacce } from '../../../../auth/types/auth.types'
import style from '../../../../styles/ownerStyle/AddProducts.module.css'
import { validateField } from '../../../../utils/validators.js'
import { apiGet, apiPost } from '../../../../api/userApi.js'
import { CATEGORY_ENDPOINTS, PRODUCT_ENDPOINTS } from '../../../../api/endpoints.js'
import Loader from '../../../../utils/Loader.js'
import Notification from '../../../../utils/Notification.js'
import { useParams } from 'react-router-dom'

const LeftSideAddProduct = () => {
  const { idStore } = useParams()
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState<Partial<Product>>({})
  const [error, setError] = useState<Partial<ProductErrors> | null>(null)
  const [loading, setLoading] = useState<boolean | null>(false)
  const [notification, setNotification] = useState<NotificationInterfacce | null>({
    open: false,
    message: '',
    severity: 'success',
  })
  const [categories, setCategories] = useState<CategoryListItem[]>([])
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(false)


  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target as HTMLInputElement
    const RaiseError = validateField(name, value)
    setError((prev) => ({ ...(prev ?? {}), [name]: RaiseError }) as Partial<ProductErrors>)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target as HTMLInputElement
    const RaiseError = validateField(name, value)
    setError((prev) => ({ ...prev, [name]: RaiseError }))
    if (RaiseError) return
    setFormData((prev) => ({ ...(prev ?? {}), [name]: value }) as Partial<Product>)
  }

  const [id] = useState<string>(() => {
    const auth = localStorage.getItem('nexbasket_auth')
    return auth ? JSON.parse(auth)?.user?._id || '' : ''
  })

  //----------------- ACCESS THE ALL CATEGORY ----------------
  const fetchCategories = async () => {
    if (!id) return
    setCategoriesLoading(true)
    try {
      const response = await apiGet<{ data?: CategoryListItem[] } | CategoryListItem[]>(
        CATEGORY_ENDPOINTS.GETSUBOWNERCATEGORYLIST(id),
      )
      const list = Array.isArray(response) ? response : (response?.data ?? [])
      setCategories(list)
    } catch (err) {
      console.error(err)
    } finally {
      setCategoriesLoading(false)
    }
  }

  useEffect(() => {
    if (!id) return
    let mounted = true
    const load = async () => {
      try {
        await fetchCategories()
      } catch (err) {
        if (mounted) console.error(err)
      }
    }
    void load()
    return () => {
      mounted = false
    }
  }, [id])
  // ---------------------------------------------------------

  const handleCreateProduct = async (event: React.SubmitEvent) => {
    event.preventDefault()
    const payload = {
      store: idStore,
      category: formData.category,
      name: formData.name,
      description: formData.description,
      description1: formData.description1,
      brand: formData.brand,
      price: formData.price,
      mrp: formData.mrp,
      discountPercent: formData.discountPercent,
      stock: formData.stock,
      sku: formData.sku,
      tags: formData.tags,
      ratings: {
        average: 0,
        count: 0,
      },
      returnable: true,
      warrantyPeriod: formData.warrantyPeriod,
      weight: formData.weight,
      dimensions: {
        length: formData.length,
        width: formData.width,
        height: formData.height,
      },
      isActive: true,
    }
    try {
      setLoading(true)
      const response = (await apiPost(PRODUCT_ENDPOINTS.CREATE, payload)) as { message?: string }
      setNotification({
        open: true,
        message: response?.message || 'Product created successfully',
        severity: 'success',
      })
      setFormData({})
      setError(null)
      setActiveStep(0)
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



  const isFormValid = () => {
  return (
    idStore &&
    formData.category &&
    formData.name &&
    formData.brand &&
    formData.price &&
    formData.mrp &&
    formData.discountPercent &&
    formData.stock &&
    formData.weight &&
    formData.warrantyPeriod &&
    formData.description1 &&
    formData.sku &&
    formData.tags &&
    formData.length &&
    formData.width &&
    formData.height &&
    formData.description
  );
};

  return (
    <Box className={style.Add_Product_Main_Wrapper}>
      {/* Header */}
      <Box className={style.Add_Products_Header}>
        <GradingIcon
          sx={{
            border: '1px solid #e38c00',
            padding: '6px',
            borderRadius: '8px',
            margin: '5px',
            color: '#e38c00',
          }}
        />

        <Box className={style.Add_Product_HederText}>
          <Typography variant="subtitle1" gutterBottom className="panelTitle">
            Add Products
          </Typography>

          <Typography variant="caption" gutterBottom className="panelSubtitleAdd">
            Add the All Products with different different Category
          </Typography>
        </Box>
      </Box>

      {/* Stepper */}
      <Stepper activeStep={activeStep} alternativeLabel className={style.Stepper}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Add Products */}
      <Box className={style.FormWrapper} component="form" onSubmit={handleCreateProduct}>
        <Box className={style.Add_Product_Form_Body}>
        {activeStep == 0 && (
          <Box className={style.Add_Product_Chiled_From_Wrapper}>
            <Typography variant="overline" gutterBottom className="FormHeadding">
              Product Details Part - 1
            </Typography>

            <Box className={style.Add_Products_Form_Box}>
              <TextField
                label="Product Store"
                variant="outlined"
                className={style.InputFiled}
                placeholder="Product Store id"
                name="store"
                value={idStore}
                slotProps={{
                  input: {
                    readOnly: true,
                    startAdornment: (
                      <InputAdornment position="start">
                        <StorefrontOutlinedIcon className={style.IconStyle} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <Autocomplete
                disablePortal
                options={categories}
                getOptionLabel={(option) => option.name}
                isOptionEqualToValue={(option, value) => option._id === value._id}
                loading={categoriesLoading}
                value={categories.find((c) => c._id === formData.category) ?? null}
                onChange={(_, newValue) => {
                  setFormData((prev) => ({ ...prev, category: newValue?._id ?? '' }))
                }}
                className={style.InputFiled}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="category"
                    label="Category"
                    onBlur={handleBlur}
                    helperText={error?.category}
                    error={Boolean(error?.category)}
                  />
                )}
              />
            </Box>

            <Box className={style.Add_Products_Form_Box}>
              <TextField
                id="outlined-basic"
                label="Product Name"
                placeholder="Product Name"
                name="name"
                onBlur={handleBlur}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^a-zA-Z]/g, '')
                  handleChange(e)
                }}
                helperText={error?.name}
                error={Boolean(error?.name)}
                variant="outlined"
                className={style.InputFiled}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeOutlinedIcon className={style.IconStyle} />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                id="outlined-basic"
                label="Product Brand"
                variant="outlined"
                className={style.InputFiled}
                placeholder="Product brand"
                name="brand"
                onBlur={handleBlur}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^a-zA-Z]/g, '')
                  handleChange(e)
                }}
                helperText={error?.brand}
                error={Boolean(error?.brand)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <BrandingWatermarkOutlinedIcon className={style.IconStyle} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            <Box className={style.Add_Products_Form_Box}>
              <TextField
                id="outlined-basic"
                label="Product Price"
                placeholder="Product Price"
                variant="outlined"
                className={style.InputFiled}
                name="price"
                onBlur={handleBlur}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, '')
                  handleChange(e)
                }}
                helperText={error?.price}
                error={Boolean(error?.price)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <CurrencyRupeeOutlinedIcon className={style.IconStyle} />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                id="outlined-basic"
                label="Product MRP"
                variant="outlined"
                className={style.InputFiled}
                placeholder="Product MRP"
                name="mrp"
                onBlur={handleBlur}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, '')
                  handleChange(e)
                }}
                helperText={error?.mrp}
                error={Boolean(error?.mrp)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <HomeMaxOutlinedIcon className={style.IconStyle} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>
          </Box>
        )}

        {activeStep == 1 && (
          <Box className={style.Add_Product_Chiled_From_Wrapper}>
            <Typography variant="overline" gutterBottom className="FormHeadding">
              Product Details Part - 2
            </Typography>
            <Box className={style.Add_Products_Form_Box}>
              <TextField
                id="outlined-basic"
                label="Product Discount"
                placeholder="Product Discount"
                variant="outlined"
                className={style.InputFiled}
                name="discountPercent"
                onBlur={handleBlur}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, '')
                  handleChange(e)
                }}
                helperText={error?.discountPercent}
                error={!!error?.discountPercent}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocalOfferOutlinedIcon className={style.IconStyle} />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                id="outlined-basic"
                label="Product Stock"
                variant="outlined"
                placeholder="Product Stock"
                className={style.InputFiled}
                name="stock"
                onBlur={handleBlur}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, '')
                  handleChange(e)
                }}
                helperText={error?.stock}
                error={!!error?.stock}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <InventoryOutlinedIcon className={style.IconStyle} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            <Box className={style.Add_Products_Form_Box}>
              <TextField
                id="outlined-basic"
                label="Product Weight"
                placeholder="Product Weight"
                variant="outlined"
                name="weight"
                onBlur={handleBlur}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, '')
                  handleChange(e)
                }}
                helperText={error?.weight}
                error={!!error?.weight}
                className={style.InputFiled}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <ScaleOutlinedIcon className={style.IconStyle} />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                id="outlined-basic"
                label="Warranty Period"
                variant="outlined"
                placeholder="Warranty Period"
                name="warrantyPeriod"
                onBlur={handleBlur}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, '')
                  handleChange(e)
                }}
                helperText={error?.warrantyPeriod}
                error={!!error?.warrantyPeriod}
                className={style.InputFiled}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <VerifiedUserOutlinedIcon className={style.IconStyle} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            <TextField
              id="outlined-multiline-static"
              label="Description"
              className={style.InputFiled}
              multiline
              fullWidth
              rows={1}
              name="description1"
              onBlur={handleBlur}
              onChange={handleChange}
              helperText={error?.description1}
              error={!!error?.description1}
              placeholder="Avout produt brand"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <ChecklistIcon className={style.IconStyle} />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ mb: 3 }}
            />
          </Box>
        )}

        {activeStep == 2 && (
          <Box className={style.Add_Product_Chiled_From_Wrapper}>
            <Typography variant="overline" gutterBottom className="FormHeadding">
              Product Details Part - 3
            </Typography>
            <Box className={style.Add_Products_Form_Box}>
              <TextField
                id="outlined-basic"
                label="Product SKU"
                placeholder="Product SKU"
                variant="outlined"
                name="sku"
                onBlur={handleBlur}
                onChange={handleChange}
                helperText={error?.sku}
                error={!!error?.sku}
                className={style.InputFiled}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <AutofpsSelectIcon className={style.IconStyle} />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                id="outlined-basic"
                label="Product Tags"
                variant="outlined"
                placeholder="Product Tags"
                name="tags"
                onBlur={handleBlur}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^a-zA-Z]/g, '')
                  handleChange(e)
                }}
                helperText={error?.tags}
                error={!!error?.tags}
                className={style.InputFiled}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SellOutlinedIcon className={style.IconStyle} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            <Box className={style.Add_Products_Form_Box}>
              <TextField
                id="outlined-basic"
                label="Product Length"
                placeholder="Product Length"
                variant="outlined"
                className={style.InputFiled}
                name="length"
                onBlur={handleBlur}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, '')
                  handleChange(e)
                }}
                helperText={error?.length}
                error={!!error?.length}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <StraightenOutlinedIcon className={style.IconStyle} />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                id="outlined-basic"
                label="Product Width"
                variant="outlined"
                placeholder="Product Width"
                name="width"
                onBlur={handleBlur}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, '')
                  handleChange(e)
                }}
                helperText={error?.length}
                error={!!error?.length}
                className={style.InputFiled}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <WidthFullOutlinedIcon className={style.IconStyle} />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <TextField
                id="outlined-basic"
                label="Product Height"
                variant="outlined"
                placeholder="Product Height"
                name="height"
                onBlur={handleBlur}
                onChange={(e) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, '')
                  handleChange(e)
                }}
                helperText={error?.height}
                error={!!error?.height}
                className={style.InputFiled}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <HeightOutlinedIcon className={style.IconStyle} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            <TextField
              id="outlined-multiline-static"
              label="Multiline"
              className={style.InputFiled}
              multiline
              fullWidth
              rows={1}
              name="description"
              onBlur={handleBlur}
              onChange={handleChange}
              helperText={error?.description}
              error={!!error?.description}
              sx={{ mb: 3 }}
              placeholder="About Products"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <ChecklistIcon className={style.IconStyle} />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
        )}
        </Box>

        {/* Next Button */}
        <Stack spacing={2} direction="row" className={style.Add_Product_Button_Box}>
          {activeStep == 0 ? (
            <p></p>
          ) : (
            <Button
              // type="button"
              variant="outlined"
              className={style.BackButton}
              startIcon={<KeyboardDoubleArrowLeftOutlinedIcon className={style.LeftArrow} />}
              onClick={() => {
                setActiveStep((prev) => (prev > 0 ? prev - 1 : 0))
              }}
            >
              Back
            </Button>
          )}

          {activeStep == 2 ? (
            <Button
              type="submit"
              variant="contained"
              className={style.SubmitBitton}
              endIcon={<VerifiedOutlinedIcon className={style.SubmitIcon} />}
                disabled={!isFormValid()}
            >
              Submit
            </Button>
          ) : (
            <Button
              type="button"
              variant="contained"
              className={style.NextButton}
              endIcon={<KeyboardDoubleArrowRightOutlinedIcon className={style.RightArrow} />}
              onClick={() => {
                setActiveStep((prev) => (prev < 2 ? prev + 1 : 3))
              }}
            >
              Next
            </Button>
          )}
        </Stack>
      </Box>
      {loading && <Loader />}
      {notification && (
        <Notification
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          onClose={() => setNotification((prev) => (prev ? { ...prev, open: false } : prev))}
        />
      )}
    </Box>
  )
}

export default LeftSideAddProduct
