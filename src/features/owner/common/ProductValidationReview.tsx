import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import LightbulbRoundedIcon from '@mui/icons-material/LightbulbRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import ReportProblemRoundedIcon from '@mui/icons-material/ReportProblemRounded'
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded'
import style from '../../../styles/ownerStyle/AddBaseProduct.module.css'
import type { ProductValidationReviewProps } from '../types/product.types'

const RING_RADIUS = 52
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS

const getScoreTone = (score: number) => {
  if (score >= 80) return { label: 'Excellent', className: style.ABP_VR_ToneGood }
  if (score >= 50) return { label: 'Needs work', className: style.ABP_VR_ToneMid }
  return { label: 'Poor', className: style.ABP_VR_ToneBad }
}

const plural = (count: number, word: string) => `${count} ${word}${count === 1 ? '' : 's'}`

const ProductValidationReview = ({
  wornings,
  suggestions,
  errors,
  isValidDetails,
  score,
  onSubmit,
  onClose,
}: ProductValidationReviewProps) => {
  const pct = Math.min(100, Math.max(0, Math.round(Number.isFinite(score) ? score : 0)))
  const tone = getScoreTone(pct)

  const sections = [
    {
      key: 'errors',
      title: 'Errors',
      hint: 'Fix these before publishing',
      items: errors,
      icon: <ErrorRoundedIcon />,
      className: style.ABP_VR_Error,
    },
    {
      key: 'warnings',
      title: 'Warnings',
      hint: 'Worth a second look',
      items: wornings,
      icon: <WarningAmberRoundedIcon />,
      className: style.ABP_VR_Warning,
    },
    {
      key: 'suggestions',
      title: 'Suggestions',
      hint: 'Ideas to make the listing stronger',
      items: suggestions,
      icon: <LightbulbRoundedIcon />,
      className: style.ABP_VR_Suggestion,
    },
  ]

  const visibleSections = sections.filter((section) => section.items.length > 0)

  useEffect(() => {
    if (!onClose) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return createPortal(
    <div className={style.ABP_VR_Overlay} onClick={onClose}>
      <div
        className={style.ABP_VR_Panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="abp-vr-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className={style.ABP_VR_Header}>
          <div className={style.ABP_VR_HeaderIcon}>
            <AutoAwesomeRoundedIcon />
          </div>
          <div className={style.ABP_VR_HeaderText}>
            <h2 id="abp-vr-title" className={style.ABP_VR_Title}>
              AI Listing Review
            </h2>
            <p className={style.ABP_VR_Subtitle}>
              Automated check of your product details before you submit
            </p>
          </div>
          {onClose && (
            <button
              type="button"
              className={style.ABP_VR_CloseBtn}
              onClick={onClose}
              aria-label="Close review"
            >
              <CloseRoundedIcon />
            </button>
          )}
        </div>

        <div className={style.ABP_VR_Body}>
          <div className={`${style.ABP_VR_Summary} ${tone.className}`}>
            <div className={style.ABP_VR_Ring}>
              <svg viewBox="0 0 120 120" className={style.ABP_VR_RingSvg} aria-hidden="true">
                <circle className={style.ABP_VR_RingTrack} cx="60" cy="60" r={RING_RADIUS} />
                <circle
                  className={style.ABP_VR_RingFill}
                  cx="60"
                  cy="60"
                  r={RING_RADIUS}
                  strokeDasharray={RING_CIRCUMFERENCE}
                  strokeDashoffset={RING_CIRCUMFERENCE * (1 - pct / 100)}
                />
              </svg>
              <div className={style.ABP_VR_RingCenter}>
                <span className={style.ABP_VR_ScoreValue}>{pct}</span>
                <span className={style.ABP_VR_ScoreMax}>out of 100</span>
              </div>
            </div>

            <div className={style.ABP_VR_SummaryInfo}>
              <span
                className={`${style.ABP_VR_Status} ${
                  isValidDetails ? style.ABP_VR_StatusValid : style.ABP_VR_StatusInvalid
                }`}
              >
                {isValidDetails ? <CheckCircleRoundedIcon /> : <ReportProblemRoundedIcon />}
                {isValidDetails ? 'Listing is valid' : 'Listing needs attention'}
              </span>

              <p className={style.ABP_VR_ScoreLabel}>
                <b>{tone.label}</b> listing quality score
              </p>

              <div className={style.ABP_VR_Counts}>
                <span className={`${style.ABP_VR_Count} ${style.ABP_VR_Error}`}>
                  <ErrorRoundedIcon />
                  {plural(errors.length, 'error')}
                </span>
                <span className={`${style.ABP_VR_Count} ${style.ABP_VR_Warning}`}>
                  <WarningAmberRoundedIcon />
                  {plural(wornings.length, 'warning')}
                </span>
                <span className={`${style.ABP_VR_Count} ${style.ABP_VR_Suggestion}`}>
                  <LightbulbRoundedIcon />
                  {plural(suggestions.length, 'suggestion')}
                </span>
              </div>
            </div>
          </div>

          {visibleSections.length === 0 ? (
            <div className={style.ABP_VR_Empty}>
              <div className={style.ABP_VR_EmptyIcon}>
                <DoneAllRoundedIcon />
              </div>
              <p className={style.ABP_VR_EmptyTitle}>
                {isValidDetails ? 'Nothing to fix' : 'No details were reported'}
              </p>
              <p className={style.ABP_VR_EmptyText}>
                {isValidDetails
                  ? 'No issues found. Your listing looks ready to go.'
                  : 'The review marked this listing as not valid without specifics. Re-check your details and run the review again.'}
              </p>
            </div>
          ) : (
            visibleSections.map((section) => (
              <div key={section.key} className={`${style.ABP_VR_Section} ${section.className}`}>
                <div className={style.ABP_VR_SectionHead}>
                  <div className={style.ABP_VR_SectionIcon}>{section.icon}</div>
                  <div className={style.ABP_VR_SectionText}>
                    <span className={style.ABP_VR_SectionTitle}>{section.title}</span>
                    <span className={style.ABP_VR_SectionHint}>{section.hint}</span>
                  </div>
                  <span className={style.ABP_VR_SectionCount}>{section.items.length}</span>
                </div>

                <ul className={style.ABP_VR_List}>
                  {section.items.map((item, index) => (
                    <li key={`${index}-${item}`} className={style.ABP_VR_Item}>
                      <span className={style.ABP_VR_ItemIcon}>{section.icon}</span>
                      <span className={style.ABP_VR_ItemText}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>

        <div className={style.ABP_VR_Footer}>
          {onClose && (
            <button type="button" className={style.ABP_VR_BtnGhost} onClick={onClose}>
              <ArrowBackRoundedIcon />
              Back to edit
            </button>
          )}
          {errors.length > 0 ? (
            <button
              type="button"
              className={`${style.ABP_VR_BtnPrimary} ${
                isValidDetails ? '' : style.ABP_VR_BtnPrimaryCaution
              }`}
              disabled
              onClick={onSubmit}
            >
              {isValidDetails ? 'Submit Product' : 'Submit Anyway'}
              <SendRoundedIcon />
            </button>
          ) : (
            <button
              type="button"
              className={`${style.ABP_VR_BtnPrimary} ${
                isValidDetails ? '' : style.ABP_VR_BtnPrimaryCaution
              }`}
              onClick={onSubmit}
            >
              {isValidDetails ? 'Submit Product' : 'Submit Anyway'}
              <SendRoundedIcon />
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default ProductValidationReview
