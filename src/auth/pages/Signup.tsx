import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Divider,
  Link,
  InputAdornment,
  IconButton,
} from '@mui/material'
import React, { useState } from 'react'
import type { ChangeEvent, FocusEvent } from 'react'
import type { ErrorsInterface, SignUpInterface, NotificationInterfacce } from '../types/auth.types'
import { validateField } from '../../utils/validators'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined'
import GoogleIcon from '@mui/icons-material/Google'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../../utils/firebase'
import AuthHeroPanel from '../components/AuthHeroPanel'
import styles from '../../styles/authStyle/SignupAndSignin.module.css'
import { apiPost } from '../../api/userApi'
import { AUTH_ENDPOINTS } from '../../api/endpoints'
import Loader from '../../utils/Loader'
import Notification from '../../utils/Notification'
import Verify from './verify'

const ROLE_OPTIONS = ['user', 'owner', 'admin', 'delivery_boy']

const Signup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<SignUpInterface>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobile: '',
    role: '',
  })

  const [error, setError] = useState<ErrorsInterface>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobile: '',
    role: '',
  })

  const [verify, setVerify] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [notification, setNotification] = useState<NotificationInterfacce>({
    open: false,
    message: '',
    severity: 'success',
  })

  const handleOnBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setError((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError((prev) => ({
      ...prev,
      [name]: prev[name as keyof ErrorsInterface] ? validateField(name, value) : '',
    }))
  }

  const handleSignup = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const newErrors: ErrorsInterface = {
      firstName: validateField('firstName', formData.firstName),
      lastName: validateField('lastName', formData.lastName),
      email: validateField('email', formData.email),
      password: validateField('password', formData.password),
      mobile: validateField('mobile', formData.mobile),
    }
    setError(newErrors)
    if (Object.values(newErrors).some(Boolean)) return

    const payload = {
      fullName: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      password: formData.password,
      mobile: formData.mobile,
      role: formData.role || 'user',
    }

    setLoading(true)
    try {
      const response = await apiPost<{ message: string; userId: string }>(
        AUTH_ENDPOINTS.SIGNUP,
        payload
      )
      setVerify(true)
      setNotification({
        open: true,
        message: response?.message || 'Please varify the otp',
        severity: 'success',
      })
    } catch (err) {
      setNotification({
        open: true,
        message: err instanceof Error ? err.message : 'Something went wrong',
        severity: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleSignup = async () => {
    setLoading(true)
    try {
      await signInWithPopup(auth, new GoogleAuthProvider())
      navigate('/google-continue')
    } catch (error) {
      setNotification({
        open: true,
        message: error instanceof Error ? error.message : 'Google sign-up failed',
        severity: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box className={styles.authPage}>
      <AuthHeroPanel
        heading={
          <>
            Shop Smarter. <span>Live Better.</span>
          </>
        }
        tagline="Join millions of happy shoppers and discover unbeatable deals, curated collections and lightning-fast delivery — all in one place."
      />

      <Box className={styles.formPanel}>
        <Box component="form" className={styles.formCard} onSubmit={handleSignup} noValidate>
          <Box className={styles.titleAccent} />
          <Typography variant="h4" className={styles.title}>
            Create Account
          </Typography>

          <Box className={styles.nameRow}>
            <TextField
              label="First Name"
              placeholder="first name"
              variant="outlined"
              fullWidth
              className={styles.textField}
              name="firstName"
              onBlur={handleOnBlur}
              onChange={handleOnChange}
              error={Boolean(error?.firstName)}
              helperText={error.firstName}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineOutlinedIcon className={styles.inputIcon} />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              label="Last Name"
              placeholder=" last name"
              variant="outlined"
              fullWidth
              className={styles.textField}
              name="lastName"
              onBlur={handleOnBlur}
              onChange={handleOnChange}
              error={Boolean(error?.lastName)}
              helperText={error.lastName}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineOutlinedIcon className={styles.inputIcon} />
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>

          <TextField
            label="Mobile Number"
            placeholder="mobile number"
            variant="outlined"
            fullWidth
            className={styles.textField}
            name="mobile"
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            error={Boolean(error?.mobile)}
            helperText={error.mobile}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIphoneIcon className={styles.inputIcon} />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            select
            label="Register As"
            variant="outlined"
            fullWidth
            className={styles.textField}
            name="role"
            value={formData.role}
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            error={Boolean(error?.role)}
            helperText={error.role}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <BadgeOutlinedIcon className={styles.inputIcon} />
                  </InputAdornment>
                ),
              },
            }}
          >
            {ROLE_OPTIONS.map((role) => (
              <MenuItem key={role} value={role}>
                {role
                  .split('_')
                  .map((word) => word[0].toUpperCase() + word.slice(1))
                  .join(' ')}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Email Address"
            placeholder="email address"
            type="email"
            variant="outlined"
            fullWidth
            className={styles.textField}
            name="email"
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            error={Boolean(error?.email)}
            helperText={error.email}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon className={styles.inputIcon} />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            label="Password"
            placeholder="strong password"
            type="password"
            variant="outlined"
            fullWidth
            className={styles.textField}
            name="password"
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            error={Boolean(error?.password)}
            helperText={error.password}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon className={styles.inputIcon} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton className={styles.visibilityToggle} edge="end">
                      <VisibilityOffIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <FormControlLabel
            className={styles.policyRow}
            control={<Checkbox />}
            label={
              <Typography className={styles.policyText}>
                I agree to the <Link className={styles.policyLink}>Terms of Service</Link> and{' '}
                <Link className={styles.policyLink}>Privacy Policy</Link>
              </Typography>
            }
          />

          <Button fullWidth variant="contained" className={styles.primaryButton} type="submit">
            Create Account
          </Button>

          <Divider className={styles.divider}>OR</Divider>

          <Button
            fullWidth
            variant="outlined"
            className={styles.googleButton}
            startIcon={<GoogleIcon />}
            onClick={handleGoogleSignup}
          >
            Sign up with Google
          </Button>

          <Typography className={styles.loginPrompt}>
            Already have an account?
            <Link component={RouterLink} to="/signin" className={styles.loginLink}>
              Sign In
            </Link>
          </Typography>
        </Box>
      </Box>
      {verify && <Verify onClose={() => setVerify(false)} email={formData.email} />}
      {loading && <Loader />}
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
    </Box>
  )
}

export default Signup
