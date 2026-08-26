import { Box, Typography, TextField, Button, IconButton } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import style from '../../../../../styles/ownerStyle/AddBaseProduct.module.css'
import type { StepProductSpecificationProps } from '../../../types/product.types'

const StepSpecifications = ({ data, setFormData }: StepProductSpecificationProps) => {
  const specifications = data.specifications ?? []

  const handleAddSpecRow = () => {
    setFormData((prev) => ({
      ...prev,
      specifications: [...(prev.specifications ?? []), { name: '', value: '' }],
    }))
  }

  const handleRemoveSpecRow = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      specifications: (prev.specifications ?? []).filter((_, i) => i !== index),
    }))
  }

  const handleSpecChange = (index: number, field: 'name' | 'value', value: string) => {
    setFormData((prev) => {
      const nextSpecifications = [...(prev.specifications ?? [])]
      nextSpecifications[index] = { ...nextSpecifications[index], [field]: value }
      return { ...prev, specifications: nextSpecifications }
    })
  }

  return (
    <Box className={style.ABP_StepPanel}>
      <Box className={style.ABP_Section}>
        <Box className={style.ABP_SectionHead}>
          <Typography className={style.ABP_SectionTitle}>Specifications</Typography>
          <Typography className={style.ABP_SectionHint}>Key / value pairs shown in the spec table</Typography>
        </Box>

        <Box className={style.ABP_RepeatList}>
          {specifications.map((spec, index) => (
            <Box key={index} className={style.ABP_RepeatRow}>
              <TextField
                className={style.ABP_Input}
                size="small"
                placeholder="Specification name, e.g. Material"
                value={spec.name}
                onChange={(event) => handleSpecChange(index, 'name', event.target.value)}
              />
              <TextField
                className={style.ABP_Input}
                size="small"
                placeholder="Value (unit optional, e.g. 500 g)"
                value={spec.value}
                onChange={(event) => handleSpecChange(index, 'value', event.target.value)}
              />
              <IconButton className={style.ABP_RepeatRemoveBtn} onClick={() => handleRemoveSpecRow(index)}>
                <DeleteOutlineRoundedIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>

        <Button className={style.ABP_AddRowBtn} startIcon={<AddRoundedIcon />} onClick={handleAddSpecRow}>
          Add Specification
        </Button>
      </Box>
    </Box>
  )
}

export default StepSpecifications
