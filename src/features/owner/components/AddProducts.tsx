import React, { useState } from 'react'
import {
  Box,
  Paper,
  Stack,
  TextField,
  Typography,
  Button,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  Autocomplete,
} from '@mui/material'

const steps = ['Product Details', 'Product Image']

const AddProducts = () => {
  const [step, setStep] = useState(1)

  const handleNext = () => {
    setStep(2)
  }

  const handleBack = () => {
    setStep(1)
  }

  const categoryOptions = [
    { label: 'Electronics', value: 'electronics' },
    { label: 'Fashion', value: 'fashion' },
    { label: 'Groceries', value: 'groceries' },
    { label: 'Books', value: 'books' },
    { label: 'Furniture', value: 'furniture' },
  ]

  return (
    <Box className="add-products-container">
      {/* Step indicator */}
      <Stepper activeStep={step - 1} className="product-stepper" alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Form 1 - Product Details */}
      {step === 1 && (
        <Paper elevation={0} className="panel">
          <Typography variant="subtitle1" className="panel-title">
            Product Details
          </Typography>

          <Stack spacing={2.5}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Product name"
                variant="outlined"
                fullWidth
                className="mui-field"
                type="text"
                name="name"
              />
              <TextField
                label="Product brand"
                variant="outlined"
                fullWidth
                className="mui-field"
                type="text"
                name="brand"
              />
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Price"
                variant="outlined"
                fullWidth
                className="mui-field"
                type="text"
                name="price"
              />
              <TextField
                label="DiscountPrice"
                variant="outlined"
                fullWidth
                className="mui-field"
                type="text"
                name="discountPrice"
              />
            </Stack>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              className="mui-field"
              multiline
              name="description"
              rows={3}
            />
            <Box className="button-group">
              <Button variant="contained" className="btn-next" onClick={handleNext}>
                Next
              </Button>
            </Box>
          </Stack>
        </Paper>
      )}

      {/* Form 2 - Product Image */}
      {step === 2 && (
        <Paper elevation={0} className="panel">
          <Typography variant="subtitle1" className="panel-title">
            Product Image
          </Typography>

          <Stack spacing={2.5}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                label="Product store"
                variant="outlined"
                fullWidth
                className="mui-field"
                type="text"
                name="store"
              />
              <TextField
                label="Product stock"
                variant="outlined"
                fullWidth
                className="mui-field"
                type="text"
                name="stock"
              />
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Autocomplete
                fullWidth
                options={categoryOptions}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                  <TextField {...params} label="Category" className="mui-field" />
                )}
              />

              <TextField
                select
                fullWidth
                label="Is Active"
                className="mui-field"
                defaultValue="true"
              >
                <MenuItem value="true">Active</MenuItem>
                <MenuItem value="false">Inactive</MenuItem>
              </TextField>
            </Stack>

            <TextField
              label="Extra Description"
              variant="outlined"
              fullWidth
              className="mui-field"
              multiline
              name="extraDescription"
              rows={3}
            />
            <Box className="button-group">
              <Button variant="outlined" className="btn-back" onClick={handleBack}>
                Back
              </Button>
              <Button variant="contained" className="btn-submit">
                Submit Product
              </Button>
            </Box>
          </Stack>
        </Paper>
      )}
    </Box>
  )
}

export default AddProducts
 