import { Box, Typography, TextField, FormControl, Select, MenuItem } from '@mui/material'
import style from '../../../../../styles/ownerStyle/AddBaseProduct.module.css'

/**
 * Phase 3 — Compliance & Warranty
 * Fields: importerName, packerName, countryOfOrigin, hsnCode, taxCode,
 * warranty (duration, unit, type, description), returnPolicy, returnDays
 * Design-only: static markup, no value/onChange wiring.
 */
const StepComplianceWarranty = () => {
  return (
    <Box className={style.ABP_StepPanel}>
      <Box className={style.ABP_Section}>
        <Box className={style.ABP_SectionHead}>
          <Typography className={style.ABP_SectionTitle}>Origin</Typography>
        </Box>
        <Box className={style.ABP_Grid3}>
          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Importer Name</Typography>
            <TextField className={style.ABP_Input} size="small" placeholder="e.g. NexBasket Imports Pvt. Ltd." />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Packer Name</Typography>
            <TextField className={style.ABP_Input} size="small" placeholder="e.g. Fresh Farms Pvt. Ltd." />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Country of Origin</Typography>
            <FormControl className={style.ABP_Input} size="small">
              <Select displayEmpty defaultValue="" MenuProps={{ slotProps: { paper: { className: style.ABP_SelectMenuPaper } } }}>
                <MenuItem value="">
                  <em>Select country</em>
                </MenuItem>
                <MenuItem value="IN">India</MenuItem>
                <MenuItem value="US">United States</MenuItem>
                <MenuItem value="CN">China</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Box>

      <Box className={style.ABP_Section}>
        <Box className={style.ABP_SectionHead}>
          <Typography className={style.ABP_SectionTitle}>Compliance</Typography>
        </Box>
        <Box className={style.ABP_Grid}>
          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>HSN Code</Typography>
            <TextField className={style.ABP_Input} size="small" placeholder="e.g. 0702" />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Tax Code</Typography>
            <TextField className={style.ABP_Input} size="small" placeholder="e.g. GST-5" />
          </Box>
        </Box>
      </Box>

      <Box className={style.ABP_Section}>
        <Box className={style.ABP_SectionHead}>
          <Typography className={style.ABP_SectionTitle}>Warranty</Typography>
        </Box>
        <Box className={style.ABP_Grid3}>
          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Duration</Typography>
            <TextField className={style.ABP_Input} size="small" type="number" placeholder="e.g. 6" />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Unit</Typography>
            <FormControl className={style.ABP_Input} size="small">
              <Select displayEmpty defaultValue="" MenuProps={{ slotProps: { paper: { className: style.ABP_SelectMenuPaper } } }}>
                <MenuItem value="">
                  <em>Select unit</em>
                </MenuItem>
                <MenuItem value="days">Days</MenuItem>
                <MenuItem value="months">Months</MenuItem>
                <MenuItem value="years">Years</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Type</Typography>
            <FormControl className={style.ABP_Input} size="small">
              <Select displayEmpty defaultValue="" MenuProps={{ slotProps: { paper: { className: style.ABP_SelectMenuPaper } } }}>
                <MenuItem value="">
                  <em>Select warranty type</em>
                </MenuItem>
                <MenuItem value="manufacturer">Manufacturer</MenuItem>
                <MenuItem value="seller">Seller</MenuItem>
                <MenuItem value="brand">Brand</MenuItem>
                <MenuItem value="no_warranty">No Warranty</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        <Box className={style.ABP_Grid}>
          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Warranty Description</Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              multiline
              minRows={1}
              placeholder="e.g. Covers manufacturing defects only"
            />
          </Box>
        </Box>
      </Box>

      <Box className={style.ABP_Section}>
        <Box className={style.ABP_SectionHead}>
          <Typography className={style.ABP_SectionTitle}>Return Policy</Typography>
        </Box>
        <Box className={style.ABP_Grid}>
          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Return Policy</Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              multiline
              minRows={1}
              placeholder="e.g. 7 days replacement only"
            />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Return Days</Typography>
            <TextField className={style.ABP_Input} size="small" type="number" placeholder="e.g. 7" />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default StepComplianceWarranty
