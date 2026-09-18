import {
  Box,
  Typography,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputAdornment,
} from '@mui/material'
import LockRoundedIcon from '@mui/icons-material/LockRounded'
import { useParams } from 'react-router-dom'
import style from '../../../../../styles/ownerStyle/AddBaseProduct.module.css'
import type { StepBasicDetailsProps } from '../../../types/product.types'
import { useState } from 'react'
import AiGenerateButton from '../../../../../components/common/AiGenerateButton'

const StepBasicDetails = ({ data, setFormsData }: StepBasicDetailsProps) => {
  const { id: categoryId, storeID } = useParams<{ id: string; storeID: string }>()
  const [isSlugManuallyEdited, setslugManualEdited] = useState<boolean | null>(false)

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '') // special characters hatao
      .replace(/\s+/g, '-') // spaces ko "-" se replace karo
      .replace(/-+/g, '-') // multiple "-" ko single "-" banao
  }

  const handleChangeDetails = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target

    if (name === 'slug') {
      setslugManualEdited(true)
    }

    setFormsData((prev) => ({
      ...prev,
      storeID: storeID || '',
      categoryId: categoryId || '',
      [name]: value,
      ...(name === 'title' && !isSlugManuallyEdited && { slug: generateSlug(value) }),
    }))
  }

  return (
    <Box className={style.ABP_StepPanel}>
      <Box className={style.ABP_Section}>
        <Box className={style.ABP_SectionHead}>
          <Typography className={style.ABP_SectionTitle}>Store &amp; Category</Typography>
        </Box>
        <Box className={style.ABP_Grid}>
          <Box className={style.ABP_Field}>
            <Typography className={`${style.ABP_FieldLabel} ${style.ABP_FieldLabel_Required}`}>
              Store
            </Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              disabled
              name="storeId"
              onChange={handleChangeDetails}
              value={storeID || ''}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRoundedIcon sx={{ fontSize: 14 }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={`${style.ABP_FieldLabel} ${style.ABP_FieldLabel_Required}`}>
              Category
            </Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              value={categoryId || ''}
              name="categoryId"
              onChange={handleChangeDetails}
              disabled
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRoundedIcon sx={{ fontSize: 14 }} />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
        </Box>
      </Box>

      <Box className={style.ABP_Section}>
        <Box className={style.ABP_SectionHead}>
          <Typography className={style.ABP_SectionTitle}>Identity</Typography>
        </Box>
        <Box className={style.ABP_Grid3}>
          <Box className={style.ABP_Field}>
            <Typography className={`${style.ABP_FieldLabel} ${style.ABP_FieldLabel_Required}`}>
              Title
            </Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              placeholder="e.g. Fresh Farm Tomatoes"
              name="title"
              onChange={handleChangeDetails}
              value={data.title}
            />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Slug</Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              placeholder="fresh-farm-tomatoes"
              helperText="Auto-generated from title"
              name="slug"
              onChange={handleChangeDetails}
              value={data.slug}
              disabled
            />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Actual Product is </Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              placeholder="Enter the parent category"
              helperText="e.g., Mobile, Clothes, Laptop,T-Shirt fro man etc."
              name="productIs"
              onChange={handleChangeDetails}
              value={data.productIs}
            />
          </Box>
        </Box>
      </Box>

      <Box className={style.ABP_Section}>
        <Box className={style.ABP_SectionHead}>
          <Typography className={style.ABP_SectionTitle}>Type or Conditions </Typography>
        </Box>
        <Box className={style.ABP_Grid3}>
          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Product Type</Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              placeholder="e.g. Grocery, Electronics"
              name="productType"
              value={data.productType}
              onChange={handleChangeDetails}
            />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Condition</Typography>
            <FormControl className={style.ABP_Input} size="small">
              <Select
                onChange={handleChangeDetails}
                name="condition"
                defaultValue="new"
                value={data.condition}
                MenuProps={{ slotProps: { paper: { className: style.ABP_SelectMenuPaper } } }}
              >
                <MenuItem value="new">New</MenuItem>
                <MenuItem value="used">Used</MenuItem>
                <MenuItem value="refurbished">Refurbished</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Product Code</Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              placeholder="e.g. PC-10234"
              name="productCode"
              onChange={handleChangeDetails}
              value={data.productCode}
            />
          </Box>
        </Box>
      </Box>

      <Box className={style.ABP_Section}>
        <Box className={style.ABP_SectionHead}>
          <Typography className={style.ABP_SectionTitle}>Description</Typography>
        </Box>
        <Box className={style.ABP_Grid}>
          <Box className={`${style.ABP_Field} ${style.ABP_FieldFull}`}>
            <Typography className={style.ABP_FieldLabel}>Short Description</Typography>
            <Box className={style.ABP_TextAreaWrap}>
              <TextField
                className={style.ABP_Input}
                size="small"
                multiline
                fullWidth
                minRows={3}
                placeholder="One or two lines shown on listing cards"
                onChange={handleChangeDetails}
                name="shortDiscription"
                value={data.shortDiscription}
              />
              <Box className={style.ABP_TextAreaAiBtn}>
                <AiGenerateButton
                  defaultProductName={data.title}
                  onGenerated={(text) =>
                    setFormsData((prev) => ({
                      ...prev,
                      shortDiscription: text,
                    }))
                  }
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default StepBasicDetails
