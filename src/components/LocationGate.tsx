import { useEffect, useState, type ReactNode } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { Dialog, Box, Typography, Button, CircularProgress } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { setCity, setPinCode } from '../redux/slice/userSlice'

type LocationStatus = 'requesting' | 'granted' | 'denied' | 'unsupported'

const LocationGate = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch()
  const [status, setStatus] = useState<LocationStatus>(() =>
    'geolocation' in navigator ? 'requesting' : 'unsupported',
  )
  const [errorMessage, setErrorMessage] = useState('')

  const fetchLocation = () => {
    if (!('geolocation' in navigator)) return

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          const response = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${import.meta.env.VITE_GEOAPI}`,
          )
          const city = response.data?.results?.[0]?.city
          const postcode = response.data?.results?.[0]?.postcode
          dispatch(setCity({ city }))
          dispatch(setPinCode({ postcode }))
        } finally {
          setStatus('granted')
        }
      },
      (error) => {
        setErrorMessage(
          error.code === error.PERMISSION_DENIED
            ? 'You denied location access. Please allow location permission from your browser/site settings, then try again.'
            : 'We could not fetch your location. Please try again.',
        )
        setStatus('denied')
      },
      { enableHighAccuracy: true, timeout: 15000 },
    )
  }

  const requestLocation = () => {
    setStatus('requesting')
    fetchLocation()
  }

  useEffect(() => {
    fetchLocation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {children}

      <Dialog
        open={status !== 'granted'}
        maxWidth="xs"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            background: 'linear-gradient(135deg, #0A1A2B 0%, #14283d 100%)',
            borderRadius: '16px',
            padding: '28px 24px',
            textAlign: 'center',
            margin: '16px',
          },
        }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'rgba(252, 207, 143, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
          }}
        >
          <LocationOnIcon sx={{ fontSize: 34, color: '#FCCF8F' }} />
        </Box>

        <Typography sx={{ color: '#ffffff', fontWeight: 800, fontSize: 18, mb: 1 }}>
          Enable Location Access
        </Typography>

        <Typography sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: 14, mb: 3, lineHeight: 1.5 }}>
          NexBasket needs your location to show delivery availability, nearby stores and accurate
          pricing for your area.
        </Typography>

        {status === 'denied' && (
          <Typography sx={{ color: '#ff8080', fontSize: 12.5, mb: 2 }}>{errorMessage}</Typography>
        )}

        {status === 'unsupported' && (
          <Typography sx={{ color: '#ff8080', fontSize: 12.5, mb: 2 }}>
            Location access is not supported in this browser. Please switch to a supported
            browser to continue.
          </Typography>
        )}

        <Button
          onClick={requestLocation}
          disabled={status === 'requesting' || status === 'unsupported'}
          fullWidth
          sx={{
            background: 'linear-gradient(135deg, #FCCF8F 0%, #f5b563 100%)',
            color: '#0A1A2B',
            fontWeight: 700,
            textTransform: 'none',
            borderRadius: '10px',
            padding: '10px 0',
            fontSize: 14.5,
            '&:hover': { background: 'linear-gradient(135deg, #fad282 0%, #f5b563 100%)' },
            '&.Mui-disabled': { color: '#0A1A2B', opacity: 0.7 },
          }}
        >
          {status === 'requesting' ? (
            <CircularProgress size={18} sx={{ color: '#0A1A2B' }} />
          ) : status === 'denied' ? (
            'Try Again'
          ) : (
            'Allow Location'
          )}
        </Button>
      </Dialog>
    </>
  )
}

export default LocationGate
