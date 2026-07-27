import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Stack,
} from '@mui/material'

import LockResetRoundedIcon from '@mui/icons-material/LockResetRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded'
import styles from '../../../styles/userStyle/popUpStyle.module.css'
import React, { useState } from 'react'
import type { ChangeEvent, FocusEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import {validateField} from "../../../utils/validators"
import type {ChangePasswordForm,ChangePasswordErrors} from "../types/user.types"
import type {NotificationInterfacce} from '../../../auth/types/auth.types'
import { apiPost } from '../../../api/userApi'
import { AUTH_ENDPOINTS } from '../../../api/endpoints'
import Loader from '../../../utils/Loader'
import Notification from '../../../utils/Notification'

const ChnagePassword = () => {
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState<Record<keyof ChangePasswordForm, boolean>>({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false,
    })
    const [formData, setFormData] = useState<ChangePasswordForm>({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    })
    const [error, setError] = useState<ChangePasswordErrors>({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    })
    const [loading, setLoading] = useState<boolean>(false)
    const [notification, setNotification] = useState<NotificationInterfacce>({
        open: false,
        message: '',
        severity: 'success',
    })

    const toggleShowPassword = (field: keyof ChangePasswordForm) => {
        setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }))
    }

    const handleOnBlur = (event: FocusEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setError((prev) => ({ ...prev, [name]: validateField(name, value) }))
    }

    const handleOnChnage = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setFormData((prev) => ({ ...prev, [name]: value }))
        setError((prev) => ({
            ...prev,
            [name]: prev[name as keyof ChangePasswordErrors] ? validateField(name, value) : '',
        }))
    }

    const handleCancel = () => {
        navigate('/')
    }

    const handleChangePassword = async (event: React.SyntheticEvent) => {
        event.preventDefault()

        const newErrors: ChangePasswordErrors = {
            oldPassword: validateField('oldPassword', formData.oldPassword),
            newPassword: validateField('newPassword', formData.newPassword),
            confirmPassword: validateField('confirmPassword', formData.confirmPassword),
        }

        if (!newErrors.confirmPassword && formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = 'New password and confirm password do not match'
        }

        setError(newErrors)
        if (Object.values(newErrors).some(Boolean)) return

        setLoading(true)
        try {
            const response = await apiPost<{ message?: string }>(AUTH_ENDPOINTS.CHNAGEPASSWORD, formData)
            setNotification({
                open: true,
                message: response?.message || 'Password changed successfully',
                severity: 'success',
            })
            setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' })
            setTimeout(() => navigate('/'), 2000)
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

  return (
    <Box className={styles.wrapper}>
      <Card className={styles.card}>
        <CardContent className={styles.cardContent}>
          <Box className={styles.header}>
            <LockResetRoundedIcon className={styles.icon} />

            <Typography variant="h4" className={styles.title}>
              Change Password
            </Typography>

            <Typography className={styles.subtitle}>
            </Typography>
          </Box>

          <Stack spacing={3} component="form" onSubmit={handleChangePassword} noValidate>
            <TextField
              fullWidth
              label="Current Password"
              type={showPassword.oldPassword ? 'text' : 'password'}
              name='oldPassword'
              onBlur={handleOnBlur}
              onChange={handleOnChnage}
              className={styles.textField}
              error={Boolean(error?.oldPassword)}
              helperText={error.oldPassword}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => toggleShowPassword('oldPassword')}>
                        {showPassword.oldPassword ? <VisibilityRoundedIcon /> : <VisibilityOffRoundedIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              fullWidth
              label="New Password"
              className={styles.textField}
              type={showPassword.newPassword ? 'text' : 'password'}
              name='newPassword'
              onBlur={handleOnBlur}
              onChange={handleOnChnage}
              error={Boolean(error?.newPassword)}
              helperText={error.newPassword}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => toggleShowPassword('newPassword')}>
                        {showPassword.newPassword ? <VisibilityRoundedIcon /> : <VisibilityOffRoundedIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              className={styles.textField}
              type={showPassword.confirmPassword ? 'text' : 'password'}
              name='confirmPassword'
              onBlur={handleOnBlur}
              onChange={handleOnChnage}
              error={Boolean(error?.confirmPassword)}
              helperText={error.confirmPassword}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => toggleShowPassword('confirmPassword')}>
                        {showPassword.confirmPassword ? <VisibilityRoundedIcon /> : <VisibilityOffRoundedIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                type="button"
                variant="outlined"
                className={styles.cancelBtn}
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </Button>

              <Button type="submit" variant="contained" className={styles.saveBtn} disabled={loading}>
                Update Password
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      {loading && <Loader />}
      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
      />
    </Box>
  )
}

export default ChnagePassword
