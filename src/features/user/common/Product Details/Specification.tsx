import { Box } from '@mui/material'
import styles from '../../../../styles/userStyle/ShowSingleProduct.module.css'
import type { Specification as SpecificationItem } from '../../types/common.types.ts'
import { PRODUCT_DETAILS_TEXT } from '../../utils/context.ts'

export interface SpecificationRow {
  name: string
  value: string
}

interface SpecificationProps {
  specification: SpecificationItem[]
  extraRows?: SpecificationRow[]
}

const Specification = ({ specification, extraRows = [] }: SpecificationProps) => {
  const rows: SpecificationRow[] = [
    ...specification.map((spec) => ({
      name: spec.name,
      value: spec.unit ? `${spec.value} ${spec.unit}` : spec.value,
    })),
    ...extraRows,
  ]

  if (rows.length === 0) return null

  return (
    <Box component="section" className={styles.section}>
      <Box component="h2" className={styles.sectionTitle}>
        {PRODUCT_DETAILS_TEXT.specifications}
      </Box>
      <Box component="dl" className={styles.specTable}>
        {rows.map((row) => (
          <Box className={styles.specRow} key={row.name}>
            <Box component="dt" className={styles.specName}>
              {row.name}
            </Box>
            <Box component="dd" className={styles.specValue}>
              {row.value}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Specification
