import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Switch,
  InputAdornment,
} from '@mui/material'
import StyleRoundedIcon from '@mui/icons-material/StyleRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import style from '../../../../../styles/ownerStyle/AddBaseProduct.module.css'
import type {
  StepProductVarient,
  ProductVarientInterface,
  Attribute,
} from '../../../types/product.types'
import React, { useState } from 'react'

const StepVariant = ({ data, setFormData }: StepProductVarient) => {
  const [attributes, setAttributes] = useState<Attribute[]>([{ name: '', value: '' }])

  const handleChnage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Add Attributes : For Add Dynamuic Multiple Value :
  const handleAddAttributes = () => {
    setAttributes((prev) => [...prev, { name: '', value: '' }])
  }

  // Remove the Attributes : For Removing Attributes
  const handleRemoveAttribute = (index: number) => {
    setAttributes((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <Box className={style.ABP_StepPanel}>
      <Box className={style.ABP_EntityCard}>
        <Box className={style.ABP_EntityCardHead}>
          <Box className={style.ABP_EntityBadge}>
            <StyleRoundedIcon />
            Variant
          </Box>
        </Box>

        {/* Reference & identification */}
        <Box className={style.ABP_Section}>
          <Box className={style.ABP_SectionHead}>
            <Typography className={style.ABP_SectionTitle}>
              Reference &amp; Identification
            </Typography>
          </Box>
          <Box className={style.ABP_Grid4}>
            <Box className={style.ABP_Field}>
              <Typography className={`${style.ABP_FieldLabel} ${style.ABP_FieldLabel_Required}`}>
                SKU
              </Typography>
              <TextField
                className={style.ABP_Input}
                size="small"
                placeholder="e.g. NB-TOM-500G"
                name="sku"
                onChange={handleChnage}
                value={data.sku}
              />
            </Box>

            <Box className={style.ABP_Field}>
              <Typography className={`${style.ABP_FieldLabel} ${style.ABP_FieldLabel_Required}`}>
                Variant Name
              </Typography>
              <TextField
                className={style.ABP_Input}
                size="small"
                placeholder="e.g. 500g Pack"
                name="variantName"
                onChange={handleChnage}
                value={data.variantName}
              />
            </Box>

            <Box className={style.ABP_Field}>
              <Typography className={style.ABP_FieldLabel}>GTIN / Barcode</Typography>
              <TextField
                className={style.ABP_Input}
                size="small"
                placeholder="8901030875021"
                name="gtin"
                onChange={handleChnage}
                value={data.gtin}
              />
            </Box>

            <Box className={style.ABP_Field}>
              <Typography className={style.ABP_FieldLabel}>Weight</Typography>
              <TextField
                className={style.ABP_Input}
                size="small"
                type="number"
                placeholder="500"
                name="weight"
                onChange={handleChnage}
                value={data.weight}
                slotProps={{
                  input: { endAdornment: <InputAdornment position="end">g</InputAdornment> },
                }}
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
              <TextField
                className={style.ABP_Input}
                size="small"
                type="number"
                placeholder="0"
                name="length"
                onChange={handleChnage}
                value={data.dimensions?.length}
              />
            </Box>

            <Box className={style.ABP_Field}>
              <Typography className={style.ABP_FieldLabel}>Width</Typography>
              <TextField
                className={style.ABP_Input}
                size="small"
                type="number"
                placeholder="0"
                name="width"
                onChange={handleChnage}
                value={data.dimensions?.width}
              />
            </Box>

            <Box className={style.ABP_Field}>
              <Typography className={style.ABP_FieldLabel}>Height</Typography>
              <TextField
                className={style.ABP_Input}
                size="small"
                type="number"
                placeholder="0"
                name="height"
                onChange={handleChnage}
                value={data.dimensions?.height}
              />
            </Box>
          </Box>
        </Box>

        {/* Attributes */}
        <Box className={style.ABP_Section}>
          <Box className={style.ABP_SectionHead}>
            <Typography className={style.ABP_SectionTitle}>Attributes</Typography>
            <Typography className={style.ABP_SectionHint}>
              Key / value pairs, e.g. Color · Red
            </Typography>
          </Box>

          <Box className={style.ABP_RepeatList}>
            {attributes.map((attribute, index) => (
              <Box className={style.ABP_RepeatRow} key={index}>
                <TextField
                  className={style.ABP_Input}
                  size="small"
                  placeholder="Attribute name"
                  name="name"
                  onChange={handleChnage}
                  value={attribute.name}
                />
                <TextField
                  className={style.ABP_Input}
                  size="small"
                  placeholder="Attribute value"
                  value={attribute.value}
                  name="value"
                  onChange={handleChnage}
                />
                <IconButton
                  className={style.ABP_RepeatRemoveBtn}
                  onClick={() => handleRemoveAttribute(index)}
                >
                  <DeleteOutlineRoundedIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>

          <Button
            className={style.ABP_AddRowBtn}
            startIcon={<AddRoundedIcon />}
            onClick={handleAddAttributes}
          >
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
    </Box>
  )
}

export default StepVariant
