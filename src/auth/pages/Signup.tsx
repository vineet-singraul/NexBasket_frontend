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
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import AuthHeroPanel from '../components/AuthHeroPanel'
import styles from '../../styles/authStyle/SignupAndSignin.module.css'

const Signup = () => {
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
        <Box className={styles.formCard}>
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
            label="Email Address"
            placeholder="email address"
            type="email"
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
            placeholder="strong password"
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

          <Button fullWidth variant="contained" className={styles.primaryButton}>
            Create Account
          </Button>

          <Divider className={styles.divider}>OR</Divider>

          <Typography className={styles.loginPrompt}>
            Already have an account?
            <Link component={RouterLink} to="/signin" className={styles.loginLink}>
              Sign In
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Signup
