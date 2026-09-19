import { Box, Typography, TextField, Button, IconButton, Tooltip } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import style from '../../../../../styles/ownerStyle/AddBaseProduct.module.css'
import type { StepProductSpecificationProps } from '../../../types/product.types'
import { apiGet } from '../../../../../api/userApi'
import { AI_MODEL } from '../../../../../api/endpoints'
import { useState } from 'react'
import Loader from '../../../../../utils/Loader'

interface Specification {
  name: string
  value: string
  unit: string
}

interface SpecificationResponse {
  success: boolean
  productName: string
  count: number
  specifications: Specification[]
}

const StepSpecifications = ({ title, data, setFormData }: StepProductSpecificationProps) => {
  const specifications = data.specifications ?? []
  const [loading, setLoadding] = useState<boolean | null>(false)

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

  const handleSpecChange = (index: number, field: 'name' | 'value' | 'unit', value: string) => {
    setFormData((prev) => {
      const nextSpecifications = [...(prev.specifications ?? [])]
      nextSpecifications[index] = { ...nextSpecifications[index], [field]: value }
      return { ...prev, specifications: nextSpecifications }
    })
  }

  const handleGenrateSpecification = async () => {
    const productName = title?.trim()
    if (!productName) {
      alert('Add the product title in Basic Details first') 
      return
    }

    try {
      setLoadding(true)

      const response = await apiGet<SpecificationResponse>(
        AI_MODEL.GENRATE_SPECIFICATION_OF_PRODUCTS(productName),
      )

      const generatedSpecifications = (response.specifications ?? []).map((spec) => ({
        name: spec.name ?? '',
        value: spec.value ?? '',
        unit: spec.unit ?? '',
      }))

      setFormData((prev) => ({
        ...prev,
        specifications: generatedSpecifications,
      }))
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Something went wrong!! Try later')
    } finally {
      setLoadding(false)
    }
  }

  return (
    <Box className={style.ABP_StepPanel}>
      <Box className={style.ABP_Section}>
        <Box className={style.ABP_SpecHeadRow}>
          <Box className={style.ABP_SectionHead}>
            <Typography className={style.ABP_SectionTitle}>Specifications</Typography>
            <Typography className={style.ABP_SectionHint}>
              Key / value pairs shown in the spec table
            </Typography>
          </Box>

          <Tooltip title="Generate specifications with AI" arrow>
            <span>
              <IconButton
                type="button"
                className={style.ABP_SpecAiBtn}
                onClick={() => void handleGenrateSpecification()}
                disabled={Boolean(loading)}
                aria-label="Generate specifications with AI"
              >
                <AutoFixHighRoundedIcon />
              </IconButton>
            </span>
          </Tooltip>
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
                placeholder="Value, e.g. 500"
                value={spec.value}
                onChange={(event) => handleSpecChange(index, 'value', event.target.value)}
              />
              <TextField
                className={style.ABP_Input}
                size="small"
                placeholder="Unit, e.g. g"
                value={spec.unit ?? ''}
                onChange={(event) => handleSpecChange(index, 'unit', event.target.value)}
              />
              <IconButton
                className={style.ABP_RepeatRemoveBtn}
                onClick={() => handleRemoveSpecRow(index)}
              >
                <DeleteOutlineRoundedIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>

        <Button
          className={style.ABP_AddRowBtn}
          startIcon={<AddRoundedIcon />}
          onClick={handleAddSpecRow}
        >
          Add Specification
        </Button>
      </Box>

      {loading && <Loader/>}
    </Box>
  )
}

export default StepSpecifications
