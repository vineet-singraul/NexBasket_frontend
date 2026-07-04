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
import { useState } from 'react'
import type { ChangeEvent, FocusEvent } from 'react'
import {validateField} from "../../../utils/validators"
import type {ChangePasswordForm,ChangePasswordErrors} from "../types/user.types"

const ChnagePassword = () => {
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

          <Stack spacing={3}>
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
              <Button variant="outlined" className={styles.cancelBtn}>
                Cancel
              </Button>

              <Button variant="contained" className={styles.saveBtn}>
                Update Password
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}

export default ChnagePassword
