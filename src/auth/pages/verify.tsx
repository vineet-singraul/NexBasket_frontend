import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, ClipboardEvent, KeyboardEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, TextField, IconButton, Button, Dialog } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined'
import BoltIcon from '@mui/icons-material/Bolt'
import styles from '../../styles/authStyle/auth.module.css'
import { apiPost } from '../../api/userApi'
import { AUTH_ENDPOINTS } from '../../api/endpoints'
import type { NotificationInterfacce } from '../types/auth.types'
import Loader from '../../utils/Loader'
import Notification from '../../utils/Notification'

const OTP_LENGTH = 6
const RESEND_SECONDS = 60

type VerifyProps = {
  open?: boolean
  onClose?: () => void
  email?: string
  onVerify?: (otp: string) => void | Promise<void>
  onResend?: () => void | Promise<void>
}

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0')
  const s = (seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

const Verify = ({ open = true, onClose, email, onVerify, onResend }: VerifyProps) => {
  const navigate = useNavigate()
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [timeLeft, setTimeLeft] = useState(RESEND_SECONDS)
  const [loading, setLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])
  const [notification, setNotification] = useState<NotificationInterfacce>({
    open: false,
    message: '',
    severity: 'success',
  })

  useEffect(() => {
    const focusTimer = requestAnimationFrame(() => inputRefs.current[0]?.focus())
    return () => cancelAnimationFrame(focusTimer)
  }, [])

  useEffect(() => {
    if (timeLeft <= 0) return
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearTimeout(id)
  }, [timeLeft])

  const setDigit = (index: number, digit: string) => {
    setOtp((prev) => {
      const next = [...prev]
      next[index] = digit
      return next
    })
  }

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const digits = e.target.value.replace(/\D/g, '')
    if (errorMsg) setErrorMsg('')
    if (!digits) {
      setDigit(index, '')
      return
    }
    setDigit(index, digits[digits.length - 1])
    if (index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      e.preventDefault()
      setDigit(index - 1, '')
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)
    if (!pasted) return
    e.preventDefault()
    setOtp((prev) => {
      const next = [...prev]
      pasted.split('').forEach((digit, i) => {
        next[i] = digit
      })
      return next
    })
    inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus()
  }

  const handleSubmit = async () => {
    if (!isComplete || loading) return
    setLoading(true)
    setErrorMsg('')
    try {
      const response = await apiPost<{ message: string }>(AUTH_ENDPOINTS.VERIFY_OTP, {
        email,
        otp: otp.join(''),
      })
      setNotification({
        open: true,
        severity: 'success',
        message: response?.message || 'OTP verified successfully',
      })
      await onVerify?.(otp.join(''))
      setTimeout(() => {
        onClose?.()
        navigate('/signin', { replace: true })
      }, 1200)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid OTP. Please try again.'
      setErrorMsg(message)
      setNotification({ open: true, severity: 'error', message })
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (timeLeft > 0 || isResending) return
    setIsResending(true)
    setErrorMsg('')
    try {
      const response = await apiPost<{ message: string }>(AUTH_ENDPOINTS.RESEND_OTP, { email })
      setOtp(Array(OTP_LENGTH).fill(''))
      inputRefs.current[0]?.focus()
      setNotification({
        open: true,
        severity: 'success',
        message: response?.message || 'OTP resent successfully',
      })
      await onResend?.()
    } catch (err) {
      setNotification({
        open: true,
        severity: 'error',
        message: err instanceof Error ? err.message : 'Failed to resend OTP',
      })
    } finally {
      setIsResending(false)
      setTimeLeft(RESEND_SECONDS)
    }
  }

  const isComplete = otp.every(Boolean)
  const canResend = timeLeft <= 0

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      slotProps={{ paper: { className: styles.otpBackdrop } }}
    >
      <IconButton className={styles.backButton} onClick={onClose} aria-label="Go back">
        <ArrowBackIcon />
      </IconButton>

      <Box className={styles.otpCard}>
        <Box className={styles.mascotWrap}>
          <BoltIcon className={`${styles.boltIcon} ${styles.boltIconTop}`} />
          <SmartToyOutlinedIcon className={styles.mascotIcon} />
          <BoltIcon className={`${styles.boltIcon} ${styles.boltIconBottom}`} />
        </Box>

        <Typography variant="h5" className={styles.title}>
          OTP Verification
        </Typography>

        <Typography className={styles.subtitle}>
          We've sent a one time password to your registered mobile number
        </Typography>

        {email && <Typography className={styles.phoneNumber}>{email}</Typography>}

        <Box className={styles.otpRow} role="group" aria-label="One time password">
          {otp.map((digit, index) => (
            <TextField
              key={index}
              inputRef={(el) => {
                inputRefs.current[index] = el
              }}
              className={`${styles.otpInput} ${digit ? styles.otpInputFilled : ''} ${errorMsg ? styles.otpInputError : ''}`}
              variant="outlined"
              value={digit}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              disabled={loading}
              slotProps={{
                htmlInput: {
                  maxLength: 1,
                  inputMode: 'numeric',
                  autoComplete: 'one-time-code',
                  'aria-label': `OTP digit ${index + 1}`,
                },
              }}
            />
          ))}
        </Box>

        {errorMsg && (
          <Typography className={styles.errorText} role="alert">
            {errorMsg}
          </Typography>
        )}

        <Typography className={styles.timer}>{formatTime(timeLeft)}</Typography>

        <Typography className={styles.resendRow}>
          Didn&apos;t receive OTP?
          <Box
            component="span"
            className={`${styles.resendLink} ${!canResend || isResending ? styles.resendLinkDisabled : ''}`}
            onClick={handleResend}
            role="button"
            tabIndex={canResend ? 0 : -1}
          >
            {isResending ? 'Sending…' : 'Resend OTP'}
          </Box>
        </Typography>

        <Button
          fullWidth
          className={styles.submitButton}
          type="button"
          onClick={handleSubmit}
          disabled={!isComplete || loading}
        >
          Submit
        </Button>
      </Box>
      {loading && <Loader/>}
      {notification && (
        <Notification
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          onClose={() =>
            setNotification((prev) => ({
              ...prev,
              open: false,
            }))
          }
        />
      )}
    </Dialog>
  )
}

export default Verify
