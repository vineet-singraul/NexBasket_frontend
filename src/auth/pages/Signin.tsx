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
import { Link as RouterLink } from 'react-router-dom'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import AuthHeroPanel from '../components/AuthHeroPanel'
import styles from '../../styles/authStyle/SignupAndSignin.module.css'

const Signin = () => {
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

      <Box className={styles.formPanel}>
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

          <Button fullWidth variant="contained" className={styles.primaryButton}>
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
    </Box>
  )
}

export default Signin
