import { Typography, Box, Slider } from '@mui/material'

import { type RangeProps } from '../../../types/filters.types'
import { useState } from 'react'

const Range = ({ filter }: RangeProps) => {
  const [price, setPrice] = useState<number[]>([filter.min ?? 0, filter.max ?? 0])

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setPrice(newValue as number[])
  }

  console.log('<price>', price)

  return (
    <div>
      <Typography gutterBottom>Airbnb</Typography>
      <Box sx={{ width: 300 }}>
        <Slider
          value={price}
          min={filter.min ?? 0}
          max={filter.max ?? 5000}
          onChange={handleChange}
          valueLabelDisplay="auto"
        />
      </Box>
    </div>
  )
}

export default Range
