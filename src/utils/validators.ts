const NAME_REGEX = /^[A-Za-z]{2,30}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MOBILE_REGEX = /^[6-9]\d{9}$/
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/

export const validateField = (name: string, value: string): string => {
  const trimmed = value.trim()

  switch (name) {
    case 'firstName':
    case 'lastName':
      if (!trimmed) return `${name === 'firstName' ? 'First' : 'Last'} name is required`
      if (!NAME_REGEX.test(trimmed)) return 'Only letters are allowed (2-30 characters)'
      return ''

    case 'email':
      if (!trimmed) return 'Email is required'
      if (!EMAIL_REGEX.test(trimmed)) return 'Enter a valid email address'
      return ''

    case 'mobile':
      if (!trimmed) return 'Mobile number is required'
      if (!MOBILE_REGEX.test(trimmed)) return 'Enter a valid 10-digit mobile number'
      return ''

    case 'password':
      if (!trimmed) return 'Password is required'
      if (!PASSWORD_REGEX.test(trimmed))
        return 'Password must be 8+ characters with uppercase, lowercase, number and special character'
      return ''

    case 'identifier':
      if (!trimmed) return 'Email or mobile number is required'
      if (!EMAIL_REGEX.test(trimmed) && !MOBILE_REGEX.test(trimmed))
        return 'Enter a valid email or 10-digit mobile number'
      return ''

    case 'oldPassword':
    case 'newPassword':
    case 'confirmPassword':
      if (!trimmed) return 'Password is required'
      if (!PASSWORD_REGEX.test(trimmed))
        return 'Password must be 8+ characters with uppercase, lowercase, number and special character'
      return ''

    default:
      return ''
  }
}
