import React from 'react'
import { Box } from '@mui/material'

import AddCategoryLeftPannal from '../components/Category/AddCategoryLeftPannal'
import AddCategoryRightPannel from '../components/Category/AddCategoryRightPannel'

const AddCategury = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '2fr 3fr' },
        alignItems: 'stretch',
        gap: { xs: 3, md: 4 },
        width: '100%',
        height:'70vh'
      }}
    >
      <AddCategoryLeftPannal />
      <AddCategoryRightPannel />
    </Box>
  )
}

export default AddCategury