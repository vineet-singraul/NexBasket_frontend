import { useState } from 'react'
import type { KeyboardEvent, MouseEvent } from 'react'
import {
  IconButton,
  Popover,
  Box,
  Typography,
  TextField,
  Tooltip,
  CircularProgress,
  ToggleButton,
  ToggleButtonGroup,
  useMediaQuery,
} from '@mui/material'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { apiGet } from '../../api/userApi'
import { AI_MODEL } from '../../api/endpoints'
import style from './AiGenerateButton.module.css'

interface AiGenerateButtonProps {
  /** Called with the generated text once the AI responds. */
  onGenerated: (text: string) => void
  /** Prefills the "Product Name" field when the popup opens (e.g. from the form's title). */
  defaultProductName?: string
  /** Tooltip / popover heading text. */
  label?: string
}

type LengthOption = 'Short' | 'Long' | 'Extra Long'

const LENGTH_OPTIONS: { value: LengthOption; hint: string }[] = [
  { value: 'Short', hint: '50 words' },
  { value: 'Long', hint: '80 words' },
  { value: 'Extra Long', hint: '120 words' },
]

interface AiDescriptionResponse {
  success: boolean
  description?: string
  message?: string
}

const AiGenerateButton = ({
  onGenerated,
  defaultProductName = '',
  label = 'AI Generated',
}: AiGenerateButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [productName, setProductName] = useState(defaultProductName)
  const [length, setLength] = useState<LengthOption | ''>('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const open = Boolean(anchorEl)
  const isMobile = useMediaQuery('(max-width:600px)')

  const canSubmit = Boolean(productName.trim()) && Boolean(length)

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setProductName(defaultProductName)
    setLength('')
    setError(null)
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    if (loading) return
    setAnchorEl(null)
    setError(null)
  }

  const handleLengthChange = (_event: MouseEvent<HTMLElement>, value: LengthOption | null) => {
    if (value) setLength(value)
  }

  const handleGenerate = async () => {
    const trimmedName = productName.trim()
    if (!trimmedName || !length) return

    setLoading(true)
    setError(null)

    try {
      const response = await apiGet<AiDescriptionResponse>(
        AI_MODEL.GENRATE_DISCRIPTION(length, trimmedName),
      )

      if (!response.description) {
        setError(response.message || 'AI did not return a description. Try again.')
        return
      }

      onGenerated(response.description)
      setAnchorEl(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (canSubmit) void handleGenerate()
    }
  }

  return (
    <>
      <Tooltip title={label}>
        <IconButton
          type="button"
          size="small"
          onClick={handleOpen}
          className={style.AiBtn}
          aria-label={label}
        >
          <AutoAwesomeRoundedIcon />
        </IconButton>
      </Tooltip>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorReference={isMobile ? 'anchorEl' : 'none'}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            className: `${style.AiPopover} ${isMobile ? style.AiPopover_Mobile : style.AiPopover_Centered}`,
          },
          backdrop: { className: style.AiBackdrop },
        }}
      >
        <Box className={style.AiPopoverHead}>
          <Box className={style.AiPopoverHeadLeft}>
            <AutoAwesomeRoundedIcon className={style.AiPopoverIcon} />
            <Typography className={style.AiPopoverTitle}>{label}</Typography>
          </Box>
          <IconButton size="small" onClick={handleClose} className={style.AiCloseBtn}>
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box className={style.AiPopoverBody}>
          <Typography className={style.AiFieldLabel}>Description Length</Typography>
          <ToggleButtonGroup
            value={length}
            exclusive
            onChange={handleLengthChange}
            className={style.AiLengthGroup}
            fullWidth
          >
            {LENGTH_OPTIONS.map((option) => (
              <ToggleButton key={option.value} value={option.value} className={style.AiLengthBtn}>
                <span>{option.value}</span>
                <em>{option.hint}</em>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <Typography className={style.AiFieldLabel}>Product Name</Typography>
          <Box className={style.AiInputRow}>
            <TextField
              autoFocus
              size="small"
              placeholder="e.g. Fresh Farm Tomatoes"
              value={productName}
              onChange={(event) => setProductName(event.target.value)}
              onKeyDown={handleKeyDown}
              disabled={loading}
              className={style.AiInput}
              fullWidth
            />
            <Tooltip title="Generate">
              <span>
                <IconButton
                  onClick={() => void handleGenerate()}
                  disabled={loading || !canSubmit}
                  className={style.AiSendBtn}
                  aria-label="Generate"
                >
                  {loading ? <CircularProgress size={16} sx={{ color: '#fff' }} /> : <SendRoundedIcon fontSize="small" />}
                </IconButton>
              </span>
            </Tooltip>
          </Box>

          {error && <Typography className={style.AiError}>{error}</Typography>}
        </Box>
      </Popover>
    </>
  )
}

export default AiGenerateButton
