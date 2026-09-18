import { useEffect, useState } from 'react'
import { IconButton, Tooltip, CircularProgress } from '@mui/material'
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded'
import { apiPost } from '../../api/userApi'
import { AI_MODEL } from '../../api/endpoints'
import style from './AiGenerateButton.module.css'

type GrockKind = 'features' | 'highlights'

interface GrockAiProps {
  /** Which content to generate - decides the API and the response field. */
  kind: GrockKind
  /** Product title from the form; never asked from the user again. */
  productName?: string
  /** Called with the generated text, one item per line. */
  onGenerated: (text: string) => void
}

interface GrockResponse {
  success: boolean
  features?: string
  highlights?: string
  message?: string
}

const KIND_CONFIG: Record<GrockKind, { url: string; label: string }> = {
  features: { url: AI_MODEL.GROK_FEATURES, label: 'Generate features with AI' },
  highlights: { url: AI_MODEL.GROK_HIGHLIGHTS, label: 'Generate highlights with AI' },
}

const ERROR_VISIBLE_MS = 4000

/** Highlights come back as "point one,\npoint two,\n..." - drop the trailing commas. */
const cleanLines = (text: string) =>
  text
    .split(/\r?\n/)
    .map((line) => line.trim().replace(/,+$/, '').trim())
    .filter(Boolean)
    .join('\n')

const GrockAi = ({ kind, productName = '', onGenerated }: GrockAiProps) => {
  const { url, label } = KIND_CONFIG[kind]
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (!error) return
    const timer = setTimeout(() => setError(null), ERROR_VISIBLE_MS)
    return () => clearTimeout(timer)
  }, [error])

  const handleClick = async () => {
    const name = productName.trim()
    if (!name) {
      setError('Add the product title in Basic Details first')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await apiPost<GrockResponse>(url, { productName: name })
      const text = response[kind]

      if (!text) {
        setError(response.message || 'AI did not return anything. Try again.')
        return
      }

      onGenerated(cleanLines(text))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Tooltip
      title={error ?? label}
      open={hovered || Boolean(error)}
      onOpen={() => setHovered(true)}
      onClose={() => setHovered(false)}
    >
      <span>
        <IconButton
          type="button"
          size="small"
          onClick={() => void handleClick()}
          disabled={loading}
          className={style.AiBtn}
          aria-label={label}
        >
          {loading ? <CircularProgress size={14} sx={{ color: '#fc8019' }} /> : <AutoFixHighRoundedIcon />}
        </IconButton>
      </span>
    </Tooltip>
  )
}

export default GrockAi
