import { Box, keyframes } from '@mui/material'

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const spinReverse = keyframes`
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
`

const pulseCore = keyframes`
  0%, 100% {
    transform: scale(0.82);
    opacity: 0.8;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
`

const pulseGlow = keyframes`
  0%, 100% {
    transform: scale(0.9);
    opacity: 0.35;
  }
  50% {
    transform: scale(1.35);
    opacity: 0.75;
  }
`

type LoaderProps = {
  fullScreen?: boolean
  bgcolor?: string
  size?: number
}

const NEON_ORANGE = '#ff7a1a'
const NEON_ORANGE_DEEP = '#c2410c'
const NEON_BLUE = '#3aa0ff'
const NEON_BLUE_DEEP = '#0f3d91'
const DEEP_BLACK = '#05050a'

const CORE_GRADIENT = `linear-gradient(135deg, ${NEON_ORANGE} 0%, ${NEON_BLUE} 100%)`
const GLOW_GRADIENT = `radial-gradient(circle, ${NEON_ORANGE} 0%, ${NEON_BLUE} 55%, transparent 75%)`
const RING_MASK = 'radial-gradient(farthest-side, transparent calc(100% - 4px), #000 calc(100% - 4px))'
const RING_MASK_THIN = 'radial-gradient(farthest-side, transparent calc(100% - 3px), #000 calc(100% - 3px))'

const Loader = ({ fullScreen = true, bgcolor = '#05050acc', size = 76 }: LoaderProps) => {
  return (
    <Box
      sx={{
        ...(fullScreen && {
          position: 'fixed',
          inset: 0,
          bgcolor,
          zIndex: 9999,
          backdropFilter: 'blur(3px)',
        }),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ position: 'relative', width: size, height: size }}>
        {/* Ambient glow — breathes behind everything */}
        <Box
          sx={{
            position: 'absolute',
            inset: '-30%',
            borderRadius: '50%',
            background: GLOW_GRADIENT,
            filter: 'blur(16px)',
            animation: `${pulseGlow} 2.2s ease-in-out infinite`,
          }}
        />

        {/* Outer gradient ring — sweeps clockwise, orange into blue */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: `conic-gradient(from 0deg, transparent 0deg, ${NEON_ORANGE} 80deg, ${NEON_ORANGE_DEEP} 160deg, ${NEON_BLUE_DEEP} 220deg, ${NEON_BLUE} 300deg, transparent 360deg)`,
            WebkitMask: RING_MASK,
            mask: RING_MASK,
            animation: `${spin} 1.4s linear infinite`,
          }}
        />

        {/* Inner gradient ring — sweeps counter-clockwise, blue into orange */}
        <Box
          sx={{
            position: 'absolute',
            inset: '18%',
            borderRadius: '50%',
            background: `conic-gradient(from 180deg, transparent 0deg, ${NEON_BLUE} 100deg, ${NEON_ORANGE} 220deg, transparent 300deg)`,
            WebkitMask: RING_MASK_THIN,
            mask: RING_MASK_THIN,
            animation: `${spinReverse} 1.9s linear infinite`,
          }}
        />

        {/* Breathing core, ringed in black for contrast */}
        <Box
          sx={{
            position: 'absolute',
            inset: '36%',
            borderRadius: '50%',
            background: CORE_GRADIENT,
            border: `3px solid ${DEEP_BLACK}`,
            boxShadow: `0 0 14px 2px ${NEON_ORANGE}99, 0 0 22px 6px ${NEON_BLUE}66`,
            animation: `${pulseCore} 1.4s ease-in-out infinite`,
          }}
        />

        {/* Center iris dot */}
        <Box
          sx={{
            position: 'absolute',
            inset: '46%',
            borderRadius: '50%',
            background: DEEP_BLACK,
          }}
        />
      </Box>
    </Box>
  )
}

export default Loader
