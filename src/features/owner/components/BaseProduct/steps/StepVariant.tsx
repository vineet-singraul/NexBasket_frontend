import { Box, Typography, TextField, Button, IconButton, Switch, InputAdornment } from '@mui/material'
import StyleRoundedIcon from '@mui/icons-material/StyleRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import style from '../../../../../styles/ownerStyle/AddBaseProduct.module.css'

/**
 * Phase 4 — Variant
 * Fields: sku, variantName, attributes, gtin, weight, dimensions, isDefault
 * Design-only: static markup, no value/onChange wiring.
 */
const StepVariant = () => {
  return (
    <Box className={style.ABP_StepPanel}>
      <Box className={style.ABP_EntityCard}>
        <Box className={style.ABP_EntityCardHead}>
          <Box className={style.ABP_EntityBadge}>
            <StyleRoundedIcon />
            Variant 1
          </Box>
          <Button className={style.ABP_EntityRemoveBtn} startIcon={<DeleteOutlineRoundedIcon />}>
            Remove
          </Button>
        </Box>

        {/* Reference & identification */}
        <Box className={style.ABP_Section}>
          <Box className={style.ABP_SectionHead}>
            <Typography className={style.ABP_SectionTitle}>Reference &amp; Identification</Typography>
          </Box>
          <Box className={style.ABP_Grid4}>
            <Box className={style.ABP_Field}>
              <Typography className={`${style.ABP_FieldLabel} ${style.ABP_FieldLabel_Required}`}>
                SKU
              </Typography>
              <TextField className={style.ABP_Input} size="small" placeholder="e.g. NB-TOM-500G" />
            </Box>

            <Box className={style.ABP_Field}>
              <Typography className={`${style.ABP_FieldLabel} ${style.ABP_FieldLabel_Required}`}>
                Variant Name
              </Typography>
              <TextField className={style.ABP_Input} size="small" placeholder="e.g. 500g Pack" />
            </Box>

            <Box className={style.ABP_Field}>
              <Typography className={style.ABP_FieldLabel}>GTIN / Barcode</Typography>
              <TextField className={style.ABP_Input} size="small" placeholder="8901030875021" />
            </Box>

            <Box className={style.ABP_Field}>
              <Typography className={style.ABP_FieldLabel}>Weight</Typography>
              <TextField
                className={style.ABP_Input}
                size="small"
                type="number"
                placeholder="500"
                slotProps={{ input: { endAdornment: <InputAdornment position="end">g</InputAdornment> } }}
              />
            </Box>
          </Box>
        </Box>

        {/* Physical attributes */}
        <Box className={style.ABP_Section}>
          <Box className={style.ABP_SectionHead}>
            <Typography className={style.ABP_SectionTitle}>Dimensions</Typography>
            <Typography className={style.ABP_SectionHint}>In centimeters</Typography>
          </Box>
          <Box className={style.ABP_Grid3}>
            <Box className={style.ABP_Field}>
              <Typography className={style.ABP_FieldLabel}>Length</Typography>
              <TextField className={style.ABP_Input} size="small" type="number" placeholder="0" />
            </Box>

            <Box className={style.ABP_Field}>
              <Typography className={style.ABP_FieldLabel}>Width</Typography>
              <TextField className={style.ABP_Input} size="small" type="number" placeholder="0" />
            </Box>

            <Box className={style.ABP_Field}>
              <Typography className={style.ABP_FieldLabel}>Height</Typography>
              <TextField className={style.ABP_Input} size="small" type="number" placeholder="0" />
            </Box>
          </Box>
        </Box>

        {/* Attributes */}
        <Box className={style.ABP_Section}>
          <Box className={style.ABP_SectionHead}>
            <Typography className={style.ABP_SectionTitle}>Attributes</Typography>
            <Typography className={style.ABP_SectionHint}>Key / value pairs, e.g. Color · Red</Typography>
          </Box>

          <Box className={style.ABP_RepeatList}>
            <Box className={style.ABP_RepeatRow}>
              <TextField className={style.ABP_Input} size="small" placeholder="Attribute name" />
              <TextField className={style.ABP_Input} size="small" placeholder="Attribute value" />
              <IconButton className={style.ABP_RepeatRemoveBtn}>
                <DeleteOutlineRoundedIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          <Button className={style.ABP_AddRowBtn} startIcon={<AddRoundedIcon />}>
            Add Attribute
          </Button>
        </Box>

        {/* Flags */}
        <Box className={style.ABP_SwitchRow}>
          <Box className={style.ABP_SwitchCard}>
            <Box className={style.ABP_SwitchText}>
              <Typography className={style.ABP_SwitchTitle}>Default Variant</Typography>
              <Typography className={style.ABP_SwitchDesc}>Pre-selected on product page</Typography>
            </Box>
            <Switch className={style.ABP_Switch} size="small" defaultChecked />
          </Box>
        </Box>
      </Box>

      <Button className={style.ABP_AddRowBtn} startIcon={<AddRoundedIcon />}>
        Add Another Variant
      </Button>
    </Box>
  )
}

export default StepVariant
