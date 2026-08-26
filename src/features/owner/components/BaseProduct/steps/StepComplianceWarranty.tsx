import { Box, Typography, TextField, FormControl, Select, MenuItem, Switch } from '@mui/material'
import type { SelectChangeEvent } from '@mui/material/Select'
import style from '../../../../../styles/ownerStyle/AddBaseProduct.module.css'
import type {ProductCompilanceWarrenty , stepProductCompilanceWarrenty} from "../../../types/product.types"
import type React from 'react'




const StepComplianceWarranty = ({data , setFormData} : stepProductCompilanceWarrenty) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
      const {name, value} = event.target;
      setFormData((prev) => ({...prev , [name]:value}))
   }




  return (
    <Box className={style.ABP_StepPanel}>
      <Box className={style.ABP_Section}>
        <Box className={style.ABP_SectionHead}>
          <Typography className={style.ABP_SectionTitle}>Origin</Typography>
        </Box>
        <Box className={style.ABP_Grid3}>
          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Importer Name</Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              placeholder="e.g. NexBasket Imports Pvt. Ltd."
              name='importerName'
              onChange={handleChange}
              value={data.importerName}
            />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Packer Name</Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              placeholder="e.g. Fresh Farms Pvt. Ltd."
              name='packerName'
              onChange={handleChange}
              value={data.packerName}              
            />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Country of Origin</Typography>
            <FormControl className={style.ABP_Input} size="small">
              <Select
                displayEmpty
                defaultValue=""
                MenuProps={{ slotProps: { paper: { className: style.ABP_SelectMenuPaper } } }}
              name='countryOfOrigin'
              onChange={handleChange}
              value={data.countryOfOrigin}     
              >
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
            <TextField  
              className={style.ABP_Input} 
              size="small" 
              placeholder="e.g. 0702" 
               name='hsnCode'
              onChange={handleChange}
              value={data.hsnCode}     

              />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Tax Code</Typography>
            <TextField className={style.ABP_Input} size="small" placeholder="e.g. GST-5"                name='taxCode'
              onChange={handleChange}
              value={data.taxCode}      />
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
            <TextField
              className={style.ABP_Input}
              size="small"
              type="number"
              placeholder="e.g. 6"
              name='duration'
              onChange={handleChange}
              value={data.warranty?.duration} 
            />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Unit</Typography>
            <FormControl className={style.ABP_Input} size="small">
              <Select
                displayEmpty
                defaultValue=""
                MenuProps={{ slotProps: { paper: { className: style.ABP_SelectMenuPaper } } }}
                name=''
                onChange={handleChange}
                value={data.warranty?.unit}
              >
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
              <Select
                displayEmpty
                defaultValue=""
                MenuProps={{ slotProps: { paper: { className: style.ABP_SelectMenuPaper } } }}
                name='type'
                onChange={handleChange}
                value={data.warranty?.type}
              >
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
              name='description'
              onChange={handleChange}
              value={data.warranty?.description}
            />
          </Box>
        </Box>
      </Box>

      <Box className={style.ABP_Section}>
        <Box className={style.ABP_SectionHead}>
          <Typography className={style.ABP_SectionTitle}>Return Policy</Typography>
        </Box>
        <Box className={style.ABP_Grid3}>
          <Box className={style.ABP_Swich2}>
            <Box className={style.ABP_SwitchText}>
              <Typography className={style.ABP_SwitchTitle}>Featured</Typography>
            </Box>
            <Switch className={style.ABP_Switch} size="small" name='isReturnable' onChange={handleChange} value={data.isReturnable}/>
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Return Policy</Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              multiline
              minRows={1}
              placeholder="e.g. 7 days replacement only"
              name='returnPolicy'
              onChange={handleChange}
              value={data.returnPolicy}
            />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Return Days</Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              type="number"
              placeholder="e.g. 7"
              name='returnDays'
              onChange={handleChange}
              value={data.returnDays}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default StepComplianceWarranty
