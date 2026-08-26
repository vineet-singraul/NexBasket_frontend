import {
  Box,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Switch,
  InputAdornment,
} from '@mui/material'
import type { SelectChangeEvent } from '@mui/material/Select'
import style from '../../../../../styles/ownerStyle/AddBaseProduct.module.css'
import type { StepProductPricingInventoryProps } from '../../../types/product.types'
import type React from 'react'

const StepPricingInventory = ({ data, setFormData }: StepProductPricingInventoryProps) => {
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent,
  ) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  return (
    <Box className={style.ABP_StepPanel}>
      {/* Pricing */}
      <Box className={style.ABP_Section}>
        <Box className={style.ABP_SectionHead}>
          <Typography className={style.ABP_SectionTitle}>Pricing</Typography>
        </Box>
        <Box className={style.ABP_Grid4}>
          <Box className={style.ABP_Field}>
            <Typography className={`${style.ABP_FieldLabel} ${style.ABP_FieldLabel_Required}`}>
              MRP
            </Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              type="number"
              placeholder="0.00"
              name="mrp"
              onChange={handleChange}
              value={data.mrp ?? ''}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">₹</InputAdornment> } }}
            />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={`${style.ABP_FieldLabel} ${style.ABP_FieldLabel_Required}`}>
              Selling Price
            </Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              type="number"
              placeholder="0.00"
              name="sellingPrice"
              onChange={handleChange}
              value={data.sellingPrice ?? ''}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">₹</InputAdornment> } }}
            />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Cost Price</Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              type="number"
              placeholder="0.00"
              name="costPrice"
              onChange={handleChange}
              value={data.costPrice ?? ''}
              slotProps={{ input: { startAdornment: <InputAdornment position="start">₹</InputAdornment> } }}
            />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Discount</Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              type="number"
              placeholder="0"
              name="discountPercent"
              onChange={handleChange}
              value={data.discountPercent ?? ''}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            />
          </Box>
        </Box>

        <Box className={style.ABP_Grid}>
          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Tax (GST)</Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              type="number"
              placeholder="e.g. 5"
              name="taxPercent"
              onChange={handleChange}
              value={data.taxPercent ?? ''}
              slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Currency</Typography>
            <FormControl className={style.ABP_Input} size="small">
              <Select
                name="currency"
                onChange={handleChange}
                value={data.currency ?? 'INR'}
                MenuProps={{ slotProps: { paper: { className: style.ABP_SelectMenuPaper } } }}
              >
                <MenuItem value="INR">INR — Indian Rupee</MenuItem>
                <MenuItem value="USD">USD — US Dollar</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>

      {/* Inventory */}
      <Box className={style.ABP_Section}>
        <Box className={style.ABP_SectionHead}>
          <Typography className={style.ABP_SectionTitle}>Inventory</Typography>
        </Box>
        <Box className={style.ABP_Grid3}>
          <Box className={style.ABP_Field}>
            <Typography className={`${style.ABP_FieldLabel} ${style.ABP_FieldLabel_Required}`}>
              Quantity
            </Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              type="number"
              placeholder="0"
              name="quantity"
              onChange={handleChange}
              value={data.quantity ?? ''}
            />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Reserved Quantity</Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              type="number"
              placeholder="0"
              name="reservedQuantity"
              onChange={handleChange}
              value={data.reservedQuantity ?? ''}
            />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Low Stock Threshold</Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              type="number"
              placeholder="5"
              name="lowStockThreshold"
              onChange={handleChange}
              value={data.lowStockThreshold ?? ''}
            />
          </Box>
        </Box>

        <Box className={style.ABP_Grid}>
          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Stock Status</Typography>
            <FormControl className={style.ABP_Input} size="small">
              <Select
                name="stockStatus"
                onChange={handleChange}
                value={data.stockStatus ?? 'out_of_stock'}
                MenuProps={{ slotProps: { paper: { className: style.ABP_SelectMenuPaper } } }}
              >
                <MenuItem value="in_stock">In Stock</MenuItem>
                <MenuItem value="low_stock">Low Stock</MenuItem>
                <MenuItem value="out_of_stock">Out of Stock</MenuItem>
                <MenuItem value="backorder">Backorder</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box className={style.ABP_SwitchRow}>
          <Box className={style.ABP_SwitchCard}>
            <Box className={style.ABP_SwitchText}>
              <Typography className={style.ABP_SwitchTitle}>Allow Backorder</Typography>
              <Typography className={style.ABP_SwitchDesc}>Let customers order when out of stock</Typography>
            </Box>
            <Switch
              className={style.ABP_Switch}
              size="small"
              name="allowBackorder"
              checked={data.allowBackorder ?? false}
              onChange={handleSwitchChange}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default StepPricingInventory
