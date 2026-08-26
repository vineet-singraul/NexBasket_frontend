import { Box, Typography, TextField } from '@mui/material'
import style from '../../../../../styles/ownerStyle/AddBaseProduct.module.css'
import type {
  ProductInformationInterface,
  StepProductInformationProps,
} from '../../../types/product.types'
import type React from 'react'

const StepProductInformation = ({ data, setFormsData }: StepProductInformationProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormsData((prev) => ({ ...prev, [name]: value }))
  }

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
              name="description"
              onChange={handleChange}
              value={data.description}
            />
          </Box>
        </Box>

        <Box className={style.ABP_Grid3}>
          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Highlights</Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              multiline
              minRows={1}
              placeholder="One highlight per line"
              name="highlights"
              onChange={handleChange}
              value={data.highlights}
            />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Features</Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              multiline
              minRows={1}
              placeholder="One feature per line"
              name="features"
              onChange={handleChange}
              value={data.features}
            />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>What&apos;s Included</Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              multiline
              minRows={1}
              placeholder="One item per line, e.g. 1x Charging Cable"
              name="whatsIncluded"
              onChange={handleChange}
              value={data.whatsIncluded}
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
            <TextField
              className={style.ABP_Input}
              size="small"
              placeholder="e.g. NexFresh"
              name="brand"
              onChange={handleChange}
              value={data.brand}
            />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Manufacturer</Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              placeholder="Fresh Farms Pvt. Ltd."
              name="manufacturer"
              onChange={handleChange}
              value={data.manufacturer}
            />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Model Name</Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              placeholder="e.g. Premium Select"
              name="modelName"
              onChange={handleChange}
              value={data.modelName}
            />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Model Number</Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              placeholder="e.g. NF-2024"
              name="modelNumber"
              onChange={handleChange}
              value={data.modelNumber}
            />
          </Box>
        </Box>

        <Box className={style.ABP_Grid}>
          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Manufacturer Part Number</Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              placeholder="e.g. MPN-5521"
              name="manufacturerPartNumber"
              onChange={handleChange}
              value={data.manufacturerPartNumber}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default StepProductInformation
