import { Box, keyframes } from '@mui/material'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const rotateReverse = keyframes`
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
`

type LoaderProps = {
  fullScreen?: boolean
  bgcolor?: string
  size?: number
}

const AUTH_YELLOW = '#ffc72c'
const AUTH_YELLOW_DARK = '#e0a800'
const AUTH_GREY_700 = '#2a2a2a'

const Loader = ({ fullScreen = true, bgcolor = '#a2815e7b', size = 72 }: LoaderProps) => {
  return (
    <Box
      sx={{
        ...(fullScreen && {
          position: 'fixed',
          inset: 0,
          bgcolor,
          zIndex: 9999,
        }),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ position: 'relative', width: size, height: size }}>
        {/* Outer ring — yellow, clockwise */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '4px solid transparent',
            borderTopColor: AUTH_YELLOW,
            borderRightColor: AUTH_YELLOW,
            animation: `${rotate} 1s linear infinite`,
          }}
        />
        {/* Middle ring — grey, counter-clockwise */}
        <Box
          sx={{
            position: 'absolute',
            inset: '12px',
            borderRadius: '50%',
            border: '4px solid transparent',
            borderBottomColor: AUTH_GREY_700,
            borderLeftColor: AUTH_GREY_700,
            animation: `${rotateReverse} 1.35s linear infinite`,
          }}
        />
        {/* Inner ring — dark yellow, clockwise, faster */}
        <Box
          sx={{
            position: 'absolute',
            inset: '24px',
            borderRadius: '50%',
            border: '3px solid transparent',
            borderTopColor: AUTH_YELLOW_DARK,
            borderRightColor: AUTH_YELLOW_DARK,
            animation: `${rotate} 0.75s linear infinite`,
          }}
        />
      </Box>
    </Box>
  )
}

export default Loader
