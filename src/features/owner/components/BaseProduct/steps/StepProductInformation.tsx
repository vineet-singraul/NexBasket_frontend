import { Box, Typography, TextField } from '@mui/material'
import style from '../../../../../styles/ownerStyle/AddBaseProduct.module.css'

/**
 * Phase 2 — Product Information
 * Fields: description, highlights, features, whatsIncluded,
 * brand, manufacturer, modelName, modelNumber, manufacturerPartNumber
 * (shortDescription lives on the Basic Details step)
 * Design-only: static markup, no value/onChange wiring.
 */
const StepProductInformation = () => {
  return (
    <Box className={style.ABP_StepPanel}>
      <Box className={style.ABP_Section}>
        <Box className={style.ABP_SectionHead}>
          <Typography className={style.ABP_SectionTitle}>Description</Typography>
        </Box>
        <Box className={style.ABP_Grid}>
          <Box className={`${style.ABP_Field} ${style.ABP_FieldFull}`}>
            <Typography className={style.ABP_FieldLabel}>Full Description</Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              multiline
              minRows={3}
              placeholder="Detailed product description shown on the product page"
            />
          </Box>
        </Box>

        <Box className={style.ABP_Grid3}>
          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Highlights</Typography>
            <TextField className={style.ABP_Input} size="small" multiline minRows={1} placeholder="One highlight per line" />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Features</Typography>
            <TextField className={style.ABP_Input} size="small" multiline minRows={1} placeholder="One feature per line" />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>What&apos;s Included</Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              multiline
              minRows={1}
              placeholder="One item per line, e.g. 1x Charging Cable"
            />
          </Box>
        </Box>
      </Box>

      <Box className={style.ABP_Section}>
        <Box className={style.ABP_SectionHead}>
          <Typography className={style.ABP_SectionTitle}>Brand</Typography>
        </Box>
        <Box className={style.ABP_Grid4}>
          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Brand</Typography>
            <TextField className={style.ABP_Input} size="small" placeholder="e.g. NexFresh" />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Manufacturer</Typography>
            <TextField className={style.ABP_Input} size="small" placeholder="Fresh Farms Pvt. Ltd." />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Model Name</Typography>
            <TextField className={style.ABP_Input} size="small" placeholder="e.g. Premium Select" />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Model Number</Typography>
            <TextField className={style.ABP_Input} size="small" placeholder="e.g. NF-2024" />
          </Box>
        </Box>

        <Box className={style.ABP_Grid}>
          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Manufacturer Part Number</Typography>
            <TextField className={style.ABP_Input} size="small" placeholder="e.g. MPN-5521" />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default StepProductInformation
