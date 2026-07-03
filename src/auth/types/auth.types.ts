// auth.types.ts
import type { AlertColor } from '@mui/material'

export interface SignUpInterface {
  firstName: string
  lastName: string
  email: string
  password: string
  mobile: string
  role: string
}

export interface ErrorsInterface {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  mobile?: string
  role?: string
}

export interface SignInInterface {
  identifier: string
  password: string
}

export interface SignInErrorsInterface {
  identifier?: string
  password?: string
}

export interface NotificationInterfacce {
  open: boolean
  message: string
  severity: AlertColor
}
