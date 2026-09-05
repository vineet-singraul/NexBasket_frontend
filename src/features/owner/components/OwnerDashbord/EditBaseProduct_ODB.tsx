import React, { useEffect, useState } from 'react'
import type { KeyboardEvent } from 'react'
import {
  Box,
  Drawer,
  Typography,
  IconButton,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Switch,
  Button,
} from '@mui/material'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import style from '../../../../styles/ownerStyle/EditBaseProduct.module.css'
import type { EditBaseProductForm, EditBaseProductProps, ListedProduct } from '../../types/dashboard.types'
import type {NotificationInterfacce} from "../../../../auth/types/auth.types"
import Notification from '../../../../utils/Notification'
import Loader from '../../../../utils/Loader'
import { apiGet, apiPut } from '../../../../api/userApi'
import { BASE_PRODUCT } from '../../../../api/endpoints'

const mapListedProductToForm = (product: ListedProduct): EditBaseProductForm => ({
  title: product.title ?? '',
  description: product.description ?? '',
  shortDescription: product.shortDescription ?? '',
  fullDescription: '',
  highlights: (product.highlights ?? []).join('\n'),
  features: (product.features ?? []).join('\n'),
  whatsIncluded: (product.whatsIncluded ?? []).join('\n'),

  brand: product.brand ?? '',
  manufacturer: product.manufacturer ?? '',
  modelName: product.modelName ?? '',
  modelNumber: product.modelNumber ?? '',
  manufacturerPartNumber: product.manufacturerPartNumber ?? '',

  importerName: product.importerName ?? '',
  packerName: product.packerName ?? '',
  countryOfOrigin: product.countryOfOrigin ?? '',

  hsnCode: product.hsnCode ?? '',
  taxCode: product.taxCode ?? '',

  warrantyDuration: product.warranty?.duration != null ? String(product.warranty.duration) : '',
  warrantyUnit: product.warranty?.unit ?? '',
  warrantyType: product.warranty?.type ?? '',
  warrantyDescription: product.warranty?.description ?? '',

  metaTitle: product.metaTitle ?? '',
  metaDescription: product.metaDescription ?? '',
  searchKeywords: (product.searchKeywords ?? []).join(', '),
  tags: product.tags ?? [],

  returnPolicy: product.returnPolicy ?? '',
  returnDays: product.returnDays != null ? String(product.returnDays) : '',

  productType: product.productType ?? '',
  condition: product.condition ?? '',
  status: product.status ?? '',
  visibility: product.visibility ?? '',
  isFeatured: product.isFeatured ?? false,
  isActive: product.isActive ?? false,

  sku: product.sku ?? '',
  variantName: product.variantName ?? '',
  attributeColor: product.attributes?.color ?? '',
  attributeSize: product.attributes?.size ?? '',
  gtin: product.gtin ?? '',

  weight: product.weight?.value != null ? String(product.weight.value) : '',
  weightUnit: product.weight?.unit ?? '',
  Length: product.dimensions?.length != null ? String(product.dimensions.length) : '',
  Width: product.dimensions?.width != null ? String(product.dimensions.width) : '',
  Height: product.dimensions?.height != null ? String(product.dimensions.height) : '',
  dimensionUnit: product.dimensions?.unit ?? '',
  DefaultVariant: product.isDefault ?? false,

  mrp: product.pricing?.mrp != null ? String(product.pricing.mrp) : '',
  sellingPrice: product.pricing?.sellingPrice != null ? String(product.pricing.sellingPrice) : '',
  discount: product.pricing?.discountPercent != null ? String(product.pricing.discountPercent) : '',
  costPrice: product.pricing?.costPrice != null ? String(product.pricing.costPrice) : '',
  taxPercent: product.pricing?.taxPercent != null ? String(product.pricing.taxPercent) : '',
  currency: product.pricing?.currency ?? '',

  quantity: product.inventory?.quantity != null ? String(product.inventory.quantity) : '',
  reservedQuantity: product.inventory?.reservedQuantity != null ? String(product.inventory.reservedQuantity) : '',
  lowStockThreshold: product.inventory?.lowStockThreshold != null ? String(product.inventory.lowStockThreshold) : '',
  allowBackorder: product.inventory?.allowBackorder ?? false,
  stockStatus: product.inventory?.stockStatus ?? '',
})

const splitLines = (value: string) =>
  value.split('\n').map((line) => line.trim()).filter(Boolean)

const splitCommaList = (value: string) =>
  value.split(',').map((item) => item.trim()).filter(Boolean)

const toNumberOrUndefined = (value: string) => (value.trim() === '' ? undefined : Number(value))

// Enum-constrained fields on the backend reject "" — send undefined instead so the
// backend keeps the existing saved value rather than failing schema validation.
const emptyToUndefined = (value: string) => (value.trim() === '' ? undefined : value)

const mapFormToUpdatePayload = (form: EditBaseProductForm) => ({
  title: form.title,
  description: form.description,
  shortDescription: form.shortDescription,
  fullDescription: form.fullDescription,
  highlights: splitLines(form.highlights),
  features: splitLines(form.features),
  whatsIncluded: splitLines(form.whatsIncluded),

  brand: form.brand,
  manufacturer: form.manufacturer,
  modelName: form.modelName,
  modelNumber: form.modelNumber,
  manufacturerPartNumber: form.manufacturerPartNumber,

  importerName: form.importerName,
  packerName: form.packerName,
  countryOfOrigin: form.countryOfOrigin,

  hsnCode: form.hsnCode,
  taxCode: form.taxCode,

  warranty: {
    duration: toNumberOrUndefined(form.warrantyDuration),
    unit: emptyToUndefined(form.warrantyUnit),
    type: emptyToUndefined(form.warrantyType),
    description: form.warrantyDescription,
  },

  metaTitle: form.metaTitle,
  metaDescription: form.metaDescription,
  searchKeywords: splitCommaList(form.searchKeywords),
  tags: form.tags,

  returnPolicy: form.returnPolicy,
  returnDays: toNumberOrUndefined(form.returnDays),

  productType: form.productType,
  condition: emptyToUndefined(form.condition),
  status: emptyToUndefined(form.status),
  visibility: emptyToUndefined(form.visibility),
  isFeatured: form.isFeatured,
  isActive: form.isActive,

  sku: form.sku,
  variantName: form.variantName,
  attributes: {
    color: form.attributeColor,
    size: form.attributeSize,
  },
  gtin: form.gtin,

  weight: {
    value: toNumberOrUndefined(form.weight),
    unit: emptyToUndefined(form.weightUnit),
  },
  dimensions: {
    length: toNumberOrUndefined(form.Length),
    width: toNumberOrUndefined(form.Width),
    height: toNumberOrUndefined(form.Height),
    unit: emptyToUndefined(form.dimensionUnit),
  },
  isDefault: form.DefaultVariant,

  mrp: toNumberOrUndefined(form.mrp),
  sellingPrice: toNumberOrUndefined(form.sellingPrice),
  discountPercent: toNumberOrUndefined(form.discount),
  costPrice: toNumberOrUndefined(form.costPrice),
  taxPercent: toNumberOrUndefined(form.taxPercent),
  currency: form.currency,

  quantity: toNumberOrUndefined(form.quantity),
  reservedQuantity: toNumberOrUndefined(form.reservedQuantity),
  lowStockThreshold: toNumberOrUndefined(form.lowStockThreshold),
  allowBackorder: form.allowBackorder,
  stockStatus: emptyToUndefined(form.stockStatus),
})

const defaultEditBaseProductForm: EditBaseProductForm = {
  title: '',
  description: '',
  shortDescription: '',
  fullDescription: '',
  highlights: '',
  features: '',
  whatsIncluded: '',

  brand: '',
  manufacturer: '',
  modelName: '',
  modelNumber: '',
  manufacturerPartNumber: '',

  importerName: '',
  packerName: '',
  countryOfOrigin: '',

  hsnCode: '',
  taxCode: '',

  warrantyDuration: '',
  warrantyUnit: '',
  warrantyType: '',
  warrantyDescription: '',

  metaTitle: '',
  metaDescription: '',
  searchKeywords: '',
  tags: [],

  returnPolicy: '',
  returnDays: '',

  productType: '',
  condition: '',
  status: '',
  visibility: '',
  isFeatured: false,
  isActive: false,

  sku: '',
  variantName: '',
  attributeColor: '',
  attributeSize: '',
  gtin: '',

  weight: '',
  weightUnit: '',
  Length: '',
  Width: '',
  Height: '',
  dimensionUnit: '',
  DefaultVariant: false,

  mrp: '',
  sellingPrice: '',
  discount: '',
  costPrice: '',
  taxPercent: '',
  currency: '',

  quantity: '',
  reservedQuantity: '',
  lowStockThreshold: '',
  allowBackorder: false,
  stockStatus: '',
}

const EditBaseProduct_ODB = ({ open, onClose, id, onUpdated }: EditBaseProductProps) => {
  const [form, setForm] = useState<EditBaseProductForm>(defaultEditBaseProductForm)
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState<NotificationInterfacce | null>(null)

  const LoadEditProductDetails = async (id :string) => {
    setLoading(true)
    if (!id) {
      setNotification({
        open:true,
        message:"product not found",
        severity:"info"
      })
    }

    try {
      const response = await apiGet<{ data : ListedProduct }>(BASE_PRODUCT.GET_BASE_PRODUCT(id))
      setLoading(true)
      if (!response) {
        setNotification({
          open:true,
          message:"Product can not be loaded !! try again",
          severity:"warning"
        })
      }
      setForm(response.data ? mapListedProductToForm(response.data) : defaultEditBaseProductForm)

    } catch (error) {
    setLoading(true)
      setNotification({
        open:true,
        message:error instanceof Error ? error.message : "Something went wrong",
        severity:"error"
      })
    }finally{
     setLoading(false)
    }

  }

  const handleChange = (event: { target: { name: string; value: string; type?: string; checked?: boolean } }) => {
    const { name, value, type, checked } = event.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSaveChanges = async () => {
    if (!id) return
    setLoading(true)
    try {
      const response = await apiPut<{ data: ListedProduct }>(
        BASE_PRODUCT.EDIT_BASE_PRODUCT(id),
        mapFormToUpdatePayload(form)
      )
      setNotification({
        open: true,
        message: "Product updated successfully",
        severity: "success"
      })

      if (response.data) {
        onUpdated?.(response.data)
      }
      // Closing the drawer unmounts this component (and its Notification portal with it),
      // so delay it a beat to let the success toast actually be seen.
      setTimeout(() => {
        onClose()
      }, 1200)
    } catch (error) {
      setNotification({
        open: true,
        message: error instanceof Error ? error.message : "Failed to update product",
        severity: "error"
      })
    } finally {
      setLoading(false)
    }
  }


    // Load Effect :
    React.useEffect(() => {
      if (!id) return
      let isActive = true
      void Promise.resolve().then(() => LoadEditProductDetails(id))
      return () => {
        isActive = false
      }
    }, [id])

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{ paper: { className: style.EBP_Paper } }}
    >
      <Box className={style.EBP_Wrapper} role="presentation">
        {/* Header */}
        <Box className={style.EBP_Header}>
          <Box className={style.EBP_HeaderRow}>
            <Box className={style.EBP_IconBox}>
              <EditOutlinedIcon />
            </Box>
            <Box className={style.EBP_HeaderText}>
              <Typography className={style.EBP_Title}>Edit Product</Typography>
              <Typography className={style.EBP_Subtitle}>Update product details</Typography>
            </Box>
          </Box>
          <IconButton
            className={style.EBP_CloseBtn}
            size="small"
            onClick={onClose}
            aria-label="Close"
          >
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Body */}
        <Box className={style.EBP_Body}>
          {/* Identity */}
          <Box className={style.EBP_Section}>
            <Box className={style.EBP_SectionHead}>
              <Typography className={style.EBP_SectionTitle}>Identity</Typography>
            </Box>
            <Box className={style.EBP_Grid}>
              <Box className={`${style.EBP_Field} ${style.EBP_FieldFull}`}>
                <Typography className={`${style.EBP_FieldLabel} ${style.EBP_FieldLabel_Required}`}>
                  Title
                </Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  placeholder="e.g. Fresh Farm Tomatoes"
                  onChange={handleChange}
                  name="title"
                  value={form?.title}
                />
              </Box>

              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>SKU</Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  placeholder="e.g. NB-TOM-500G"
                  onChange={handleChange}
                  name="sku"
                  value={form?.sku}
                />
              </Box>

              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>Variant Name</Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  placeholder="e.g. 500g Pack"
                  onChange={handleChange}
                  name="variantName"
                  value={form?.variantName}
                />
              </Box>

              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>Brand</Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  placeholder="e.g. NexFresh"
                  onChange={handleChange}
                  name="brand"
                  value={form?.brand}
                />
              </Box>

              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>Manufacturer</Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  placeholder="e.g. Fresh Farms Pvt. Ltd."
                  onChange={handleChange}
                  name="manufacturer"
                  value={form?.manufacturer}
                />
              </Box>

              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>Model Name</Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  placeholder="e.g. Premium Select"
                  onChange={handleChange}
                  name="modelName"
                  value={form?.modelName}
                />
              </Box>

              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>Model Number</Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  placeholder="e.g. NF-2024"
                  onChange={handleChange}
                  name="modelNumber"
                  value={form?.modelNumber}
                />
              </Box>

              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>Manufacturer Part Number</Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  placeholder="e.g. MPN-5521"
                  onChange={handleChange}
                  name="manufacturerPartNumber"
                  value={form?.manufacturerPartNumber}
                />
              </Box>

              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>GTIN / Barcode</Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  placeholder="8901030875021"
                  onChange={handleChange}
                  name="gtin"
                  value={form?.gtin}
                />
              </Box>
            </Box>
          </Box>

          {/* Descriptions */}
          <Box className={style.EBP_Section}>
            <Box className={style.EBP_SectionHead}>
              <Typography className={style.EBP_SectionTitle}>Descriptions</Typography>
            </Box>
            <Box className={style.EBP_Grid}>
              <Box className={`${style.EBP_Field} ${style.EBP_FieldFull}`}>
                <Typography className={style.EBP_FieldLabel}>Short Description</Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  multiline
                  minRows={2}
                  placeholder="One or two lines shown on listing cards"
                  onChange={handleChange}
                  name="description"
                  value={form?.description}
                />
              </Box>

              <Box className={`${style.EBP_Field} ${style.EBP_FieldFull}`}>
                <Typography className={style.EBP_FieldLabel}>Description</Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  multiline
                  minRows={2}
                  placeholder="Short summary description"
                  onChange={handleChange}
                  name="shortDescription"
                  value={form?.shortDescription}
                />
              </Box>

              <Box className={`${style.EBP_Field} ${style.EBP_FieldFull}`}>
                <Typography className={style.EBP_FieldLabel}>Full Description</Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  multiline
                  minRows={3}
                  placeholder="Detailed product description shown on the product page"
                  onChange={handleChange}
                  name="fullDescription"
                  value={form?.fullDescription}
                />
              </Box>
            </Box>

            <Box className={style.EBP_Grid3}>
              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>Highlights</Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  multiline
                  minRows={2}
                  placeholder="One highlight per line"
                  onChange={handleChange}
                  name="highlights"
                  value={form?.highlights}
                />
              </Box>

              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>Features</Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  multiline
                  minRows={2}
                  placeholder="One feature per line"
                  onChange={handleChange}
                  name="features"
                  value={form?.features}
                />
              </Box>

              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>What&apos;s Included</Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  multiline
                  minRows={2}
                  placeholder="One item per line, e.g. 1x Charging Cable"
                  onChange={handleChange}
                  name="whatsIncluded"
                  value={form?.whatsIncluded}
                />
              </Box>
            </Box>
          </Box>

          {/* Compliance & Origin */}
          <Box className={style.EBP_Section}>
            <Box className={style.EBP_SectionHead}>
              <Typography className={style.EBP_SectionTitle}>Compliance &amp; Origin</Typography>
            </Box>
            <Box className={style.EBP_Grid3}>
              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>Importer Name</Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  placeholder="e.g. NexBasket Imports Pvt. Ltd."
                  onChange={handleChange}
                  name="importerName"
                  value={form?.importerName}
                />
              </Box>

              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>Packer Name</Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  placeholder="e.g. Fresh Farms Pvt. Ltd."
                  onChange={handleChange}
                  name="packerName"
                  value={form?.packerName}
                />
              </Box>

              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>Country of Origin</Typography>
                <FormControl className={style.EBP_Input} size="small">
                  <Select
                    displayEmpty
                    MenuProps={{ slotProps: { paper: { className: style.EBP_SelectMenuPaper } } }}
                    onChange={handleChange}
                    name="countryOfOrigin"
                    value={form?.countryOfOrigin}
                  >
                    <MenuItem value="">
                      <em>Select country</em>
                    </MenuItem>
                    <MenuItem value="IN">India</MenuItem>
                    <MenuItem value="US">United States</MenuItem>
                    <MenuItem value="CN">China</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>HSN Code</Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  placeholder="e.g. 0702"
                  onChange={handleChange}
                  name="hsnCode"
                  value={form?.hsnCode}
                />
              </Box>

              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>Tax Code</Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  placeholder="e.g. GST-5"
                  onChange={handleChange}
                  name="taxCode"
                  value={form?.taxCode}
                />
              </Box>
            </Box>
          </Box>

          {/* Warranty & Returns */}
          <Box className={style.EBP_Section}>
            <Box className={style.EBP_SectionHead}>
              <Typography className={style.EBP_SectionTitle}>Warranty &amp; Returns</Typography>
            </Box>
            <Box className={style.EBP_Grid3}>
              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>Warranty Duration</Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  type="number"
                  placeholder="e.g. 6"
                  onChange={handleChange}
                  name="warrantyDuration"
                  value={form?.warrantyDuration}
                />
              </Box>

              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>Warranty Unit</Typography>
                <FormControl className={style.EBP_Input} size="small">
                  <Select
                    displayEmpty
                    MenuProps={{ slotProps: { paper: { className: style.EBP_SelectMenuPaper } } }}
                    onChange={handleChange}
                    name="warrantyUnit"
                    value={form?.warrantyUnit}
                  >
                    <MenuItem value="">
                      <em>Select unit</em>
                    </MenuItem>
                    <MenuItem value="days">Days</MenuItem>
                    <MenuItem value="months">Months</MenuItem>
                    <MenuItem value="years">Years</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>Warranty Type</Typography>
                <FormControl className={style.EBP_Input} size="small">
                  <Select
                    displayEmpty
                    MenuProps={{ slotProps: { paper: { className: style.EBP_SelectMenuPaper } } }}
                    onChange={handleChange}
                    name="warrantyType"
                    value={form?.warrantyType}
                  >
                    <MenuItem value="">
                      <em>Select type</em>
                    </MenuItem>
                    <MenuItem value="manufacturer">Manufacturer</MenuItem>
                    <MenuItem value="seller">Seller</MenuItem>
                    <MenuItem value="brand">Brand</MenuItem>
                    <MenuItem value="no_warranty">No Warranty</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box className={`${style.EBP_Field} ${style.EBP_FieldFull}`}>
                <Typography className={style.EBP_FieldLabel}>Warranty Description</Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  multiline
                  minRows={1}
                  placeholder="e.g. Covers manufacturing defects only"
                  onChange={handleChange}
                  name="warrantyDescription"
                  value={form?.warrantyDescription}
                />
              </Box>

              <Box className={`${style.EBP_Field} ${style.EBP_FieldFull}`}>
                <Typography className={style.EBP_FieldLabel}>Return Policy</Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  multiline
                  minRows={1}
                  placeholder="e.g. 7 days replacement only"
                  onChange={handleChange}
                  name="returnPolicy"
                  value={form?.returnPolicy}
                />
              </Box>

              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>Return Days</Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  type="number"
                  placeholder="e.g. 7"
                  onChange={handleChange}
                  name="returnDays"
                  value={form?.returnDays}
                />
              </Box>
            </Box>
          </Box>

          {/* Attributes & Physical */}
          <Box className={style.EBP_Section}>
            <Box className={style.EBP_SectionHead}>
              <Typography className={style.EBP_SectionTitle}>Attributes &amp; Physical</Typography>
            </Box>

            <Box className={style.EBP_Grid3}>
              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>Weight</Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  type="number"
                  placeholder="500"
                  onChange={handleChange}
                  name="weight"
                  value={form?.weight}
                />
              </Box>

              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>Weight Unit</Typography>
                <FormControl className={style.EBP_Input} size="small">
                  <FormControl className={style.EBP_Input} size="small">
                    <Select
                      displayEmpty
                      MenuProps={{ slotProps: { paper: { className: style.EBP_SelectMenuPaper } } }}
                      onChange={handleChange}
                      name="weightUnit"
                      value={form?.weightUnit}
                    >
                      <MenuItem value="">
                        <em>Select type</em>
                      </MenuItem>
                      <MenuItem value="g">Grams (g)</MenuItem>
                      <MenuItem value="kg">Kilograms (kg)</MenuItem>
                    </Select>
                  </FormControl>
                </FormControl>
              </Box>

              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>Dimension Unit</Typography>
                <FormControl className={style.EBP_Input} size="small">
                  <Select
                    MenuProps={{ slotProps: { paper: { className: style.EBP_SelectMenuPaper } } }}
                    onChange={handleChange}
                    name="dimensionUnit"
                    value={form?.dimensionUnit}
                  >
                    <MenuItem value="cm">Centimeters (cm)</MenuItem>
                    <MenuItem value="in">Inches (in)</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>Length</Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  type="number"
                  placeholder="0"
                  onChange={handleChange}
                  name="Length"
                  value={form?.Length}
                />
              </Box>

              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>Width</Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  type="number"
                  placeholder="0"
                  onChange={handleChange}
                  name="Width"
                  value={form?.Width}
                />
              </Box>

              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>Height</Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  type="number"
                  placeholder="0"
                  onChange={handleChange}
                  name="Height"
                  value={form?.Height}
                />
              </Box>
            </Box>

            <Box className={style.EBP_SwitchRow}>
              <Box className={style.EBP_SwitchCard}>
                <Box className={style.EBP_SwitchText}>
                  <Typography className={style.EBP_SwitchTitle}>Default Variant</Typography>
                  <Typography className={style.EBP_SwitchDesc}>
                    Pre-selected on product page
                  </Typography>
                </Box>
                <Switch
                  className={style.EBP_Switch}
                  size="small"
                  onChange={handleChange}
                  name="DefaultVariant"
                  checked={form.DefaultVariant}
                />
              </Box>
            </Box>
          </Box>

          {/* Pricing */}
          <Box className={style.EBP_Section}>
            <Box className={style.EBP_SectionHead}>
              <Typography className={style.EBP_SectionTitle}>Pricing</Typography>
            </Box>
            <Box className={style.EBP_Grid3}>
              <Box className={style.EBP_Field}>
                <Typography className={`${style.EBP_FieldLabel} ${style.EBP_FieldLabel_Required}`}>
                  MRP
                </Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  type="number"
                  placeholder="0.00"
                  onChange={handleChange}
                  name="mrp"
                  value={form?.mrp}
                />
              </Box>

              <Box className={style.EBP_Field}>
                <Typography className={`${style.EBP_FieldLabel} ${style.EBP_FieldLabel_Required}`}>
                  Selling Price
                </Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  type="number"
                  placeholder="0.00"
                  onChange={handleChange}
                  name="sellingPrice"
                  value={form?.sellingPrice}
                />
              </Box>

              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>Cost Price</Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  type="number"
                  placeholder="0.00"
                  onChange={handleChange}
                  name="costPrice"
                  value={form?.costPrice}
                />
              </Box>

              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>Discount</Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  type="number"
                  placeholder="0"
                  onChange={handleChange}
                  name="discount"
                  value={form?.discount}
                />
              </Box>

              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>Tax (GST)</Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  type="number"
                  placeholder="e.g. 5"
                  onChange={handleChange}
                  name="taxPercent"
                  value={form?.taxPercent}
                />
              </Box>

              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>Currency</Typography>
                <FormControl className={style.EBP_Input} size="small">
                  <Select
                    MenuProps={{ slotProps: { paper: { className: style.EBP_SelectMenuPaper } } }}
                    onChange={handleChange}
                    name="currency"
                    value={form?.currency}
                  >
                    <MenuItem value="INR">INR — Indian Rupee</MenuItem>
                    <MenuItem value="USD">USD — US Dollar</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>
          </Box>

          {/* Inventory */}
          <Box className={style.EBP_Section}>
            <Box className={style.EBP_SectionHead}>
              <Typography className={style.EBP_SectionTitle}>Inventory</Typography>
            </Box>
            <Box className={style.EBP_Grid3}>
              <Box className={style.EBP_Field}>
                <Typography className={`${style.EBP_FieldLabel} ${style.EBP_FieldLabel_Required}`}>
                  Quantity
                </Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  type="number"
                  placeholder="0"
                  onChange={handleChange}
                  name="quantity"
                  value={form?.quantity}
                />
              </Box>

              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>Reserved Quantity</Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  type="number"
                  placeholder="0"
                  onChange={handleChange}
                  name="reservedQuantity"
                  value={form?.reservedQuantity}
                />
              </Box>

              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>Low Stock Threshold</Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  type="number"
                  placeholder="5"
                  onChange={handleChange}
                  name="lowStockThreshold"
                  value={form?.lowStockThreshold}
                />
              </Box>

              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>Stock Status</Typography>
                <FormControl className={style.EBP_Input} size="small">
                  <Select
                    MenuProps={{ slotProps: { paper: { className: style.EBP_SelectMenuPaper } } }}
                    onChange={handleChange}
                    name="stockStatus"
                    value={form?.stockStatus}
                  >
                    <MenuItem value="in_stock">In Stock</MenuItem>
                    <MenuItem value="low_stock">Low Stock</MenuItem>
                    <MenuItem value="out_of_stock">Out of Stock</MenuItem>
                    <MenuItem value="backorder">Backorder</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Box className={style.EBP_SwitchRow}>
              <Box className={style.EBP_SwitchCard}>
                <Box className={style.EBP_SwitchText}>
                  <Typography className={style.EBP_SwitchTitle}>Allow Backorder</Typography>
                  <Typography className={style.EBP_SwitchDesc}>
                    Let customers order when out of stock
                  </Typography>
                </Box>
                <Switch
                  className={style.EBP_Switch}
                  size="small"
                  onChange={handleChange}
                  name="allowBackorder"
                  checked={form.allowBackorder}
                />
              </Box>
            </Box>
          </Box>

          {/* SEO */}
          <Box className={style.EBP_Section}>
            <Box className={style.EBP_SectionHead}>
              <Typography className={style.EBP_SectionTitle}>SEO</Typography>
            </Box>
            <Box className={style.EBP_Grid}>
              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>Meta Title</Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  placeholder="Shown on search engine results"
                  onChange={handleChange}
                  name="metaTitle"
                  value={form?.metaTitle}
                />
              </Box>

              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>Meta Description</Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  multiline
                  minRows={1}
                  placeholder="Shown as the search engine snippet"
                  onChange={handleChange}
                  name="metaDescription"
                  value={form?.metaDescription}
                />
              </Box>

              <Box className={`${style.EBP_Field} ${style.EBP_FieldFull}`}>
                <Typography className={style.EBP_FieldLabel}>Search Keywords</Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  multiline
                  minRows={1}
                  placeholder="Comma separated, e.g. tomato, fresh, organic"
                  onChange={handleChange}
                  name="searchKeywords"
                  value={form?.searchKeywords}
                />
              </Box>

              <Box className={`${style.EBP_Field} ${style.EBP_FieldFull}`}>
                <Typography className={style.EBP_FieldLabel}>Tags</Typography>
                <Box className={style.EBP_TagsBox}>
                  <Box className={style.EBP_Tag}>
                    <IconButton className={style.EBP_TagRemoveBtn} size="small">
                      <CloseRoundedIcon className={style.EBP_TagRemoveIcon} />
                    </IconButton>
                  </Box>
                  <input className={style.EBP_TagsInput} placeholder="Add a tag and press enter" />
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Status & Visibility */}
          <Box className={style.EBP_Section}>
            <Box className={style.EBP_SectionHead}>
              <Typography className={style.EBP_SectionTitle}>Status &amp; Visibility</Typography>
            </Box>
            <Box className={style.EBP_Grid}>
              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>Product Type</Typography>
                <TextField
                  className={style.EBP_Input}
                  size="small"
                  placeholder="e.g. Grocery, Electronics"
                  onChange={handleChange}
                  name="productType"
                  value={form?.productType}
                />
              </Box>

              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>Condition</Typography>
                <FormControl className={style.EBP_Input} size="small">
                  <Select
                    MenuProps={{ slotProps: { paper: { className: style.EBP_SelectMenuPaper } } }}
                    onChange={handleChange}
                    name="condition"
                    value={form?.condition}
                  >
                    <MenuItem value="new">New</MenuItem>
                    <MenuItem value="used">Used</MenuItem>
                    <MenuItem value="refurbished">Refurbished</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>Status</Typography>
                <FormControl className={style.EBP_Input} size="small">
                  <Select
                    MenuProps={{ slotProps: { paper: { className: style.EBP_SelectMenuPaper } } }}
                    onChange={handleChange}
                    name="status"
                    value={form?.status}
                  >
                    <MenuItem value="draft">Draft</MenuItem>
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                    <MenuItem value="blocked">Blocked</MenuItem>
                    <MenuItem value="archived">Archived</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box className={style.EBP_Field}>
                <Typography className={style.EBP_FieldLabel}>Visibility</Typography>
                <FormControl className={style.EBP_Input} size="small">
                  <Select
                    MenuProps={{ slotProps: { paper: { className: style.EBP_SelectMenuPaper } } }}
                    onChange={handleChange}
                    name="visibility"
                    value={form?.visibility}
                  >
                    <MenuItem value="public">Public</MenuItem>
                    <MenuItem value="private">Private</MenuItem>
                    <MenuItem value="hidden">Hidden</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Box className={style.EBP_SwitchRow}>
              <Box className={style.EBP_SwitchCard}>
                <Box className={style.EBP_SwitchText}>
                  <Typography className={style.EBP_SwitchTitle}>Featured</Typography>
                  <Typography className={style.EBP_SwitchDesc}>Show on featured shelves</Typography>
                </Box>
                <Switch
                  className={style.EBP_Switch}
                  size="small"
                  onChange={handleChange}
                  name="isFeatured"
                  checked={form.isFeatured}
                />
              </Box>

              <Box className={style.EBP_SwitchCard}>
                <Box className={style.EBP_SwitchText}>
                  <Typography className={style.EBP_SwitchTitle}>Active</Typography>
                  <Typography className={style.EBP_SwitchDesc}>Visible to customers</Typography>
                </Box>
                <Switch
                  className={style.EBP_Switch}
                  size="small"
                  onChange={handleChange}
                  name="isActive"
                  checked={form.isActive}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Footer */}
        <Box className={style.EBP_Footer}>
          <Button className={style.EBP_BtnGhost} onClick={onClose}>
            Cancel
          </Button>
          <Button className={style.EBP_BtnPrimary} onClick={handleSaveChanges} disabled={loading}>
            Save Changes
          </Button>
        </Box>
      </Box>


      {notification && 
      <Notification 
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={() => setNotification(null)}
      />
      }

      {loading && <Loader/>}
    </Drawer>
  )
}

export default EditBaseProduct_ODB
