import { Slider } from '@mui/material'

import { type RangeProps } from '../../../types/filters.types'
import styles from '../../../../../styles/userStyle/Filters.module.css'

const Range = ({ filter, value, onChange }: RangeProps) => {
  const min = filter.min ?? 0
  const max = filter.max ?? 5000
  const price = value ?? [min, max]

  const handleChange = (_event: Event, newValue: number | number[]) => {
    if (!Array.isArray(newValue)) return
    onChange(filter.key, [newValue[0], newValue[1]])
  }

  return (
    <div>
      <h3 className={styles.sectionTitle}>{filter.name}</h3>
      <div className={styles.rangeBody}>
        <Slider
          value={price}
          min={min}
          max={max}
          onChange={handleChange}
          valueLabelDisplay="auto"
        />
        <div className={styles.rangeValues}>
          <span className={styles.rangeValue}>₹{price[0]}</span>
          <span className={styles.rangeTo}>to</span>
          <span className={styles.rangeValue}>₹{price[1]}</span>
        </div>
      </div>
    </div>
  )
}

export default Range
