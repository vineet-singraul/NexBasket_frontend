import { Box, Typography, TextField, FormControl, Select, MenuItem, InputAdornment } from '@mui/material'
import LockRoundedIcon from '@mui/icons-material/LockRounded'
import { useParams } from 'react-router-dom'
import style from '../../../../../styles/ownerStyle/AddBaseProduct.module.css'


const StepBasicDetails = () => {
  const { id: categoryId, storeID: storeId } = useParams<{ id: string; storeID: string }>()

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
              value={storeId}
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

          <Box className={style.ABP_Field}>
            <Typography className={`${style.ABP_FieldLabel} ${style.ABP_FieldLabel_Required}`}>
              Category
            </Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              value={categoryId}
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
            <TextField className={style.ABP_Input} size="small" placeholder="e.g. Fresh Farm Tomatoes" />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Slug</Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              placeholder="fresh-farm-tomatoes"
              helperText="Auto-generated from title"
            />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Product Code</Typography>
            <TextField className={style.ABP_Input} size="small" placeholder="e.g. PC-10234" />
          </Box>
        </Box>

        <Box className={style.ABP_Grid3}>
          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Product Type</Typography>
            <TextField className={style.ABP_Input} size="small" placeholder="e.g. Grocery, Electronics" />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Condition</Typography>
            <FormControl className={style.ABP_Input} size="small">
              <Select defaultValue="new" MenuProps={{ slotProps: { paper: { className: style.ABP_SelectMenuPaper } } }}>
                <MenuItem value="new">New</MenuItem>
                <MenuItem value="used">Used</MenuItem>
                <MenuItem value="refurbished">Refurbished</MenuItem>
              </Select>
            </FormControl>
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
            <TextField
              className={style.ABP_Input}
              size="small"
              multiline
              minRows={3}
              placeholder="One or two lines shown on listing cards"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default StepBasicDetails
