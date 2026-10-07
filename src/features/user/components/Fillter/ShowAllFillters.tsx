import { useState } from 'react'
import {
  type ProductFilter,
  type RangeValue,
  type sendToShowAllFilltersPage,
} from '../../types/filters.types'
import Range from './Helping comp of fillter/Range'
import CheckBox from './Helping comp of fillter/CheckBox'
import styles from '../../../../styles/userStyle/Filters.module.css'

const ShowAllFillters = ({ fillter }: sendToShowAllFilltersPage) => {

  const [selected, setSelected] = useState<Record<string, string[]>>({})

  const handleChange = (key: string, value: string) => {
    setSelected((prev) => {
      const current = prev[key] ?? []
      return {
        ...prev,
        [key]: current.includes(value) ? current.filter((v) => v !== value) : [...current, value],
      }
    })
  }

  const [ranges, setRanges] = useState<Record<string, RangeValue>>({})

  const handleRangeChange = (key: string, value: RangeValue) => {
    setRanges((prev) => ({ ...prev, [key]: value }))
  }

  const showComponentIn = (filter: ProductFilter) => {
    switch (filter.type) {
      case 'range':
        return <Range filter={filter} value={ranges[filter.key]} onChange={handleRangeChange} />

      case 'checkbox':
        return (
          <CheckBox filter={filter} value={selected[filter.key] ?? []} onChange={handleChange} />
        )

      default:
        return null
    }
  }

  return (
    <>
      <aside className={styles.panel}>
        <div className={styles.panelHeader}>
          <h2 className={styles.panelTitle}>Filters</h2>
          <span className={styles.panelCount}>{fillter.name}</span>
        </div>

        {fillter.filters.map((filter) => (
          <div key={filter._id} className={styles.section}>
            {showComponentIn(filter)}
          </div>
        ))}
      </aside>

      

    </>
  )
}

export default ShowAllFillters
