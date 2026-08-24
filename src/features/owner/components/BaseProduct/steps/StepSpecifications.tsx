import { useRef, useState } from 'react'
import { Box, Typography, TextField, Button, IconButton } from '@mui/material'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import style from '../../../../../styles/ownerStyle/AddBaseProduct.module.css'

interface SpecRow {
  id: number
  namePlaceholder: string
  valuePlaceholder: string
}

const INITIAL_SPEC_ROWS: SpecRow[] = [
  { id: 0, namePlaceholder: 'Specification name, e.g. Material', valuePlaceholder: 'Value (unit optional, e.g. 500 g)' },
  { id: 1, namePlaceholder: 'Specification name, e.g. Shelf Life', valuePlaceholder: 'Value (unit optional, e.g. 12 months)' },
]

/**
 * Phase 5 — Specifications
 * Fields: specifications (key/value pairs shown in the product spec table)
 * Design-only: static markup, no value/onChange wiring. The row list is the one
 * exception — "Add Specification" / row removal are wired to local UI state only
 * (no form binding), same pattern as the Tags chip list elsewhere.
 */
const StepSpecifications = () => {
  const [specRows, setSpecRows] = useState<SpecRow[]>(INITIAL_SPEC_ROWS)
  const nextSpecId = useRef(INITIAL_SPEC_ROWS.length)

  const addSpecRow = () => {
    const id = nextSpecId.current
    nextSpecId.current += 1
    setSpecRows((prev) => [
      ...prev,
      { id, namePlaceholder: 'Specification name', valuePlaceholder: 'Value (unit optional)' },
    ])
  }

  const removeSpecRow = (id: number) => {
    setSpecRows((prev) => prev.filter((row) => row.id !== id))
  }

  return (
    <Box className={style.ABP_StepPanel}>
      <Box className={style.ABP_Section}>
        <Box className={style.ABP_SectionHead}>
          <Typography className={style.ABP_SectionTitle}>Specifications</Typography>
          <Typography className={style.ABP_SectionHint}>Key / value pairs shown in the spec table</Typography>
        </Box>

        <Box className={style.ABP_RepeatList}>
          {specRows.map((row) => (
            <Box key={row.id} className={style.ABP_RepeatRow}>
              <TextField className={style.ABP_Input} size="small" placeholder={row.namePlaceholder} />
              <TextField className={style.ABP_Input} size="small" placeholder={row.valuePlaceholder} />
              <IconButton className={style.ABP_RepeatRemoveBtn} onClick={() => removeSpecRow(row.id)}>
                <DeleteOutlineRoundedIcon fontSize="small" />
              </IconButton>
            </Box>
          ))}
        </Box>

        <Button className={style.ABP_AddRowBtn} startIcon={<AddRoundedIcon />} onClick={addSpecRow}>
          Add Specification
        </Button>
      </Box>
    </Box>
  )
}

export default StepSpecifications
