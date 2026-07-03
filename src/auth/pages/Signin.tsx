import {
  Box,
  Typography,
  TextField,
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
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import AuthHeroPanel from '../components/AuthHeroPanel'
import type { SignInErrorsInterface, SignInInterface } from '../types/auth.types'
import { validateField } from '../../utils/validators'
import styles from '../../styles/authStyle/SignupAndSignin.module.css'
import type {NotificationInterfacce} from '../types/auth.types'
import Loader from '../../utils/Loader'
import Notification from '../../utils/Notification'
import { apiPost } from '../../api/userApi'
import { AUTH_ENDPOINTS } from '../../api/endpoints'

const Signin = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<SignInInterface>({
    identifier: '',
    password: '',
  })     
  

  const [error, setError] = useState<SignInErrorsInterface>({
    identifier: '',
    password: '',
  })

  const [loading, setLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<NotificationInterfacce>({
    open:false,
    message:"",
    severity:'success'
  })

  const handleOnBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setError((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setError((prev) => ({ ...prev, [name]: prev[name as keyof SignInErrorsInterface] ? validateField(name, value) : '' }))
  }

  const handleSignin = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newErrors: SignInErrorsInterface = {
      identifier: validateField('identifier', formData.identifier),
      password: validateField('password', formData.password),
    }
    setError(newErrors)
    if (Object.values(newErrors).some(Boolean)) return

    const payload = {
      email: formData.identifier,
      password: formData.password,
    }

    setLoading(true);
    try {
      const response = await apiPost<{ message: string }>(AUTH_ENDPOINTS.SIGNIN, payload)
      setNotification({
        open: true,
        message: response?.message || "User Signin successfully",
        severity: 'success',
      })
      navigate('/home')
    } catch (error) {
      setNotification({
        open: true,
        message: error instanceof Error ? error.message : 'Something went wrong',
        severity: 'error',
      })
    }
    finally {
      setLoading(false);
    }
  }

  return (
    <Box className={styles.authPage}>
      <AuthHeroPanel
        heading={
          <>
            Welcome Back. <span>Let's Shop.</span>
          </>
        }
        tagline="Log in to track your orders, manage your wishlist and enjoy personalised deals curated just for you."
      />

      <Box className={styles.formPanel} component="form" onSubmit={handleSignin} noValidate>
        <Box className={styles.formCard}>

          <Box className={styles.titleAccent} />
          <Typography variant="h4" className={styles.title}>
            Welcome Back
          </Typography>


          <TextField
            label="Email or Mobile Number"
            placeholder="email"
            variant="outlined"
            fullWidth
            className={styles.textField}
            name="identifier"
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            error={Boolean(error?.identifier)}
            helperText={error.identifier}
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
            placeholder="password"
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

          <Box className={styles.rememberRow}>
            <FormControlLabel
              className={styles.rememberLabel}
              control={<Checkbox />}
              label="Remember me"
            />
            <Link className={styles.forgotLink}>Forgot password?</Link>
          </Box>

          <Button fullWidth variant="contained" className={styles.primaryButton} type="submit">
            Sign In
          </Button>

          <Divider className={styles.divider}>OR</Divider>

          <Typography className={styles.loginPrompt}>
            Don't have an account?
            <Link component={RouterLink} to="/" className={styles.loginLink}>
              Create one
            </Link>
          </Typography>
        </Box>
      </Box>
      {loading && <Loader/>}
      {notification && <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={()=>{setNotification((prev)=>({...prev,open:false}))}}
      />
      }
    </Box>
  )
}

export default Signin
