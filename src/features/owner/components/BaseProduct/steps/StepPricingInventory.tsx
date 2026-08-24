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
import style from '../../../../../styles/ownerStyle/AddBaseProduct.module.css'

/**
 * Phase 5 — Pricing & Inventory
 * Fields: pricing (mrp, sellingPrice, discountPercent, costPrice, taxPercent, currency)
 * inventory (quantity, reservedQuantity, lowStockThreshold, allowBackorder, stockStatus)
 * Design-only: static markup, no value/onChange wiring.
 */
const StepPricingInventory = () => {
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
              slotProps={{ input: { endAdornment: <InputAdornment position="end">%</InputAdornment> } }}
            />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Currency</Typography>
            <FormControl className={style.ABP_Input} size="small">
              <Select defaultValue="INR" MenuProps={{ slotProps: { paper: { className: style.ABP_SelectMenuPaper } } }}>
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
            <TextField className={style.ABP_Input} size="small" type="number" placeholder="0" />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Reserved Quantity</Typography>
            <TextField className={style.ABP_Input} size="small" type="number" placeholder="0" />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Low Stock Threshold</Typography>
            <TextField className={style.ABP_Input} size="small" type="number" placeholder="5" />
          </Box>
        </Box>

        <Box className={style.ABP_Grid}>
          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Stock Status</Typography>
            <FormControl className={style.ABP_Input} size="small">
              <Select defaultValue="out_of_stock" MenuProps={{ slotProps: { paper: { className: style.ABP_SelectMenuPaper } } }}>
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
            <Switch className={style.ABP_Switch} size="small" />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default StepPricingInventory
