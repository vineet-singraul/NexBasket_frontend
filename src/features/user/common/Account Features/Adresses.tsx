import { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import axios from 'axios'
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  FormControlLabel,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  Switch,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import WorkOutlineIcon from '@mui/icons-material/WorkOutlineOutlined'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import SatelliteAltOutlinedIcon from '@mui/icons-material/SatelliteAltOutlined'
import MapOutlinedIcon from '@mui/icons-material/MapOutlined'
import CenterFocusStrongOutlinedIcon from '@mui/icons-material/CenterFocusStrongOutlined'
import { getAuthSession } from '../../../../utils/authStorage'
import Notification from '../../../../utils/Notification'
import { type NotificationInterfacce } from '../../../../auth/types/auth.types'

// Marker icon fix (bundler me default icon toot jata hai)
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

/* ---------- Types ---------- */
type AddressLabel = 'Home' | 'Work' | 'Other'

interface LatLng {
  lat: number
  lng: number
}

interface GeoData {
  fullAddress: string
  city: string
  state: string
  pincode: string
}

interface AddressForm {
  label: AddressLabel
  houseNo: string
  landmark: string
  isDefault: boolean
}

interface SearchResult {
  name: string
  lat: number
  lng: number
}

// Backend se jo saved address wapas aata hai
export interface SavedAddress extends GeoData, AddressForm {
  _id: string
  userId: string
  location: {
    type: 'Point'
    coordinates: [number, number] // [lng, lat]
  }
  createdAt?: string
  updatedAt?: string
}

interface AddressesProps {
  onSaved?: (address: SavedAddress) => void
}

/* ---------- Constants ---------- */
const API = 'http://localhost:5000/api'
// Address lookup / search Geoapify se (LocationGate jaisa)
const GEOAPIFY = 'https://api.geoapify.com/v1/geocode'
const GEOAPIFY_KEY = import.meta.env.VITE_GEOAPI

interface GeoapifyPlace {
  formatted?: string
  name?: string
  housenumber?: string
  street?: string
  suburb?: string
  district?: string
  city?: string
  county?: string
  state?: string
  postcode?: string
  lat: number
  lon: number
}
const BHOPAL: LatLng = { lat: 23.2599, lng: 77.4126 } // default center
const LABELS: { value: AddressLabel; icon: React.ReactElement }[] = [
  { value: 'Home', icon: <HomeOutlinedIcon fontSize="small" /> },
  { value: 'Work', icon: <WorkOutlineIcon fontSize="small" /> },
  { value: 'Other', icon: <BookmarkBorderIcon fontSize="small" /> },
]
const EMPTY_FORM: AddressForm = { label: 'Home', houseNo: '', landmark: '', isDefault: false }
type MapType = 'street' | 'satellite'
const TILES: Record<MapType, { url: string; attribution: string }> = {
  street: {
    url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors',
  },
  satellite: {
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri',
  },
}
const GOLD = '#D4AF37'
const NAVY = '#0A1A2B'

/* ---------- Map helper components ---------- */

// Map click par marker move
function ClickHandler({ onPick }: { onPick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onPick(e.latlng.lat, e.latlng.lng)
    },
  })
  return null
}

// Position change (ya "center" button) par map ko wahan le jao
function FlyTo({ position, trigger }: { position: LatLng; trigger: number }) {
  const map = useMap()
  useEffect(() => {
    map.flyTo([position.lat, position.lng], 16)
  }, [position, trigger, map])
  return null
}

const mapFab = {
  bgcolor: '#fff',
  color: NAVY,
  boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
  transition: 'transform 0.15s ease',
  '&:hover': { bgcolor: '#fff', color: GOLD, transform: 'scale(1.08)' },
}

/* ---------- Main component ---------- */
const Addresses = ({ onSaved }: AddressesProps) => {
  const userId = getAuthSession<{ _id: string }>()?.user?._id
  const [position, setPosition] = useState<LatLng>(BHOPAL)
  const [geo, setGeo] = useState<GeoData>({ fullAddress: '', city: '', state: '', pincode: '' })
  const [form, setForm] = useState<AddressForm>(EMPTY_FORM)
  const [query, setQuery] = useState<string>('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [searching, setSearching] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [locating, setLocating] = useState<boolean>(false)
  const [saving, setSaving] = useState<boolean>(false)
  const [houseNoError, setHouseNoError] = useState<boolean>(false)
  const [notification, setNotification] = useState<NotificationInterfacce | null>(null)
  const [mapType, setMapType] = useState<MapType>('street')
  const [flyKey, setFlyKey] = useState<number>(0)
  const [touched, setTouched] = useState<boolean>(false)

  const notify = (message: string, severity: NotificationInterfacce['severity']) =>
    setNotification({ open: true, message, severity })

  // Position badle to address nikalo (debounced)
  useEffect(() => {
    let cancelled = false

    const t = setTimeout(async () => {
      try {
        setLoading(true)
        const { data } = await axios.get<{ results: GeoapifyPlace[] }>(`${GEOAPIFY}/reverse`, {
          params: { lat: position.lat, lon: position.lng, format: 'json', apiKey: GEOAPIFY_KEY },
        })
        const place = data.results?.[0]
        if (cancelled) return
        if (!place) {
          notify('No address found here, try another spot', 'warning')
          return
        }
        setGeo({
          fullAddress: place.formatted ?? '',
          city: place.city ?? place.county ?? '',
          state: place.state ?? '',
          pincode: place.postcode ?? '',
        })
        // Naye location ke hisaab se house no. / landmark bhar do (user baad me edit kar sakta hai)
        const houseNo = [place.housenumber, place.name].filter(Boolean).join(', ')
        const landmark = [place.street, place.suburb ?? place.district].filter(Boolean).join(', ')
        setForm((f) => ({ ...f, houseNo: houseNo || f.houseNo, landmark: landmark || f.landmark }))
        if (houseNo) setHouseNoError(false)
      } catch {
        if (!cancelled) notify('Could not fetch address for this location', 'error')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }, 800)

    return () => {
      cancelled = true
      clearTimeout(t)
    }
  }, [position])

  // Type karte hi suggestions (debounced)
  useEffect(() => {
    const q = query.trim()
    if (q.length < 3) return
    let cancelled = false
    const t = setTimeout(async () => {
      try {
        setSearching(true)
        const { data } = await axios.get<{ results: GeoapifyPlace[] }>(`${GEOAPIFY}/autocomplete`, {
          params: { text: q, filter: 'countrycode:in', format: 'json', apiKey: GEOAPIFY_KEY },
        })
        if (!cancelled) {
          setResults(
            (data.results ?? []).map((p) => ({ name: p.formatted ?? '', lat: p.lat, lng: p.lon })),
          )
        }
      } catch {
        if (!cancelled) setResults([])
      } finally {
        if (!cancelled) setSearching(false)
      }
    }, 500)

    return () => {
      cancelled = true
      clearTimeout(t)
    }
  }, [query])

  const pick = (lat: number, lng: number): void => {
    setPosition({ lat, lng })
    setTouched(true)
  }

  const selectResult = (r: SearchResult): void => {
    pick(r.lat, r.lng)
    setQuery(r.name)
    setResults([])
  }

  const useMyLocation = (): void => {
    if (!navigator.geolocation) {
      notify('Your browser does not support location', 'error')
      return
    }
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      (p: GeolocationPosition) => {
        pick(p.coords.latitude, p.coords.longitude)
        setLocating(false)
      },
      () => {
        notify('Please allow location permission', 'warning')
        setLocating(false)
      },
      { enableHighAccuracy: true },
    )
  }

  const save = async (): Promise<void> => {
    if (!geo.fullAddress) {
      notify('Pick a location on the map first', 'warning')
      return
    }
    if (!form.houseNo.trim()) {
      setHouseNoError(true)
      return
    }
    setSaving(true)
    try {
      const { data } = await axios.post<SavedAddress>(
        `${API}/addresses`,
        { ...form, ...geo, lat: position.lat, lng: position.lng },
        { headers: { 'x-user-id': userId ?? 'demo-user' } },
      )
      notify('Address saved', 'success')
      setForm(EMPTY_FORM)
      onSaved?.(data)
    } catch (e) {
      if (axios.isAxiosError<{ message?: string }>(e)) {
        notify(e.response?.data?.message || 'Save failed', 'error')
      } else {
        notify('Save failed', 'error')
      }
    } finally {
      setSaving(false)
    }
  }

  const goldField = {
    '& .MuiOutlinedInput-root.Mui-focused fieldset': { borderColor: GOLD },
    '& .MuiInputLabel-root.Mui-focused': { color: NAVY },
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 640, mx: 'auto', textAlign: 'left' }}>
      {/* Search */}
      <Box sx={{ position: 'relative', mb: 1.5 }}>
        <Stack direction="row" spacing={1}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search area, street or landmark"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              if (e.target.value.trim().length < 3) setResults([])
            }}
            onKeyDown={(e) => e.key === 'Enter' && results[0] && selectResult(results[0])}
            sx={goldField}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
                endAdornment: searching ? (
                  <CircularProgress size={18} />
                ) : query ? (
                  <IconButton
                    size="small"
                    onClick={() => {
                      setQuery('')
                      setResults([])
                    }}
                    aria-label="Clear search"
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                ) : null,
              },
            }}
          />
          <Tooltip title="Use my current location">
            <span>
              <IconButton
                onClick={useMyLocation}
                disabled={locating}
                aria-label="Use my current location"
                sx={{ bgcolor: NAVY, color: '#FCCF8F', '&:hover': { bgcolor: '#14283d' } }}
              >
                {locating ? <CircularProgress size={20} color="inherit" /> : <MyLocationIcon />}
              </IconButton>
            </span>
          </Tooltip>
        </Stack>

        {results.length > 0 && (
          <Paper
            elevation={6}
            sx={{ position: 'absolute', top: '100%', left: 0, right: 0, mt: 0.5, zIndex: 1000, maxHeight: 260, overflowY: 'auto' }}
          >
            <List dense disablePadding>
              {results.map((r, i) => (
                <ListItemButton key={i} onClick={() => selectResult(r)}>
                  <ListItemIcon sx={{ minWidth: 32 }}>
                    <PlaceOutlinedIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary={r.name} />
                </ListItemButton>
              ))}
            </List>
          </Paper>
        )}
      </Box>

      {/* Map: zIndex 0 + isolation se Leaflet ke andar ke z-index (400-1000) header / bottom nav ke upar nahi aate */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 0,
          isolation: 'isolate',
          borderRadius: 2,
          overflow: 'hidden',
          border: '1px solid #e0e0e0',
          '& .leaflet-container': { cursor: 'crosshair', fontFamily: 'inherit' },
          '& .leaflet-marker-icon.pin-drop': { animation: 'pinDrop 0.45s ease-out' },
          '@keyframes pinDrop': {
            '0%': { marginTop: '-60px', opacity: 0 },
            '70%': { marginTop: '-36px', opacity: 1 },
            '100%': { marginTop: '-41px' },
          },
        }}
      >
        <MapContainer
          center={[position.lat, position.lng]}
          zoom={14}
          scrollWheelZoom={false}
          style={{ height: 320, width: '100%' }}
        >
          <TileLayer key={mapType} attribution={TILES[mapType].attribution} url={TILES[mapType].url} />
          <ClickHandler onPick={pick} />
          <FlyTo position={position} trigger={flyKey} />
          <Marker
            key={`${position.lat},${position.lng}`}
            position={[position.lat, position.lng]}
            draggable
            eventHandlers={{
              add: (e: L.LeafletEvent) => {
                ;(e.target as L.Marker).getElement()?.classList.add('pin-drop')
              },
              dragend: (e: L.LeafletEvent) => {
                const { lat, lng } = (e.target as L.Marker).getLatLng()
                pick(lat, lng)
              },
            }}
          />
        </MapContainer>

        {/* Hint: pehli baar pick karte hi chhup jata hai */}
        {!touched && (
          <Chip
            label="Tap the map or drag the pin"
            size="small"
            sx={{ position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)', zIndex: 1, bgcolor: 'rgba(10,26,43,0.85)', color: '#fff', pointerEvents: 'none' }}
          />
        )}

        {/* Floating controls */}
        <Stack spacing={1} sx={{ position: 'absolute', right: 10, bottom: 24, zIndex: 1 }}>
          <Tooltip title={mapType === 'street' ? 'Satellite view' : 'Street view'} placement="left">
            <IconButton
              size="small"
              onClick={() => setMapType((t) => (t === 'street' ? 'satellite' : 'street'))}
              sx={mapFab}
              aria-label="Toggle map view"
            >
              {mapType === 'street' ? <SatelliteAltOutlinedIcon fontSize="small" /> : <MapOutlinedIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Center on pin" placement="left">
            <IconButton size="small" onClick={() => setFlyKey((k) => k + 1)} sx={mapFab} aria-label="Center on pin">
              <CenterFocusStrongOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Use my current location" placement="left">
            <span>
              <IconButton size="small" onClick={useMyLocation} disabled={locating} sx={mapFab} aria-label="Use my current location on map">
                {locating ? <CircularProgress size={18} sx={{ color: GOLD }} /> : <MyLocationIcon fontSize="small" />}
              </IconButton>
            </span>
          </Tooltip>
        </Stack>
      </Box>

      {/* Selected address */}
      <Paper variant="outlined" sx={{ mt: 1.5, p: 1.5, display: 'flex', gap: 1, alignItems: 'flex-start', borderColor: geo.fullAddress ? GOLD : undefined }}>
        {loading ? (
          <CircularProgress size={20} sx={{ mt: 0.25, color: GOLD }} />
        ) : (
          <PlaceOutlinedIcon sx={{ color: geo.fullAddress ? GOLD : 'text.disabled' }} />
        )}
        <Box>
          <Typography variant="body2" sx={{ fontWeight: 600, color: NAVY }}>
            {loading ? 'Finding address…' : geo.fullAddress || 'No location selected'}
          </Typography>
          {!loading && geo.city && (
            <Typography variant="caption" color="text.secondary">
              {[geo.city, geo.state, geo.pincode].filter(Boolean).join(', ')}
            </Typography>
          )}
        </Box>
      </Paper>

      {/* Details */}
      <Stack spacing={1.5} sx={{ mt: 2 }}>
        <TextField
          size="small"
          label="House / Flat no."
          required
          value={form.houseNo}
          error={houseNoError}
          helperText={houseNoError ? 'Please enter house / flat number' : ''}
          onChange={(e) => {
            setForm({ ...form, houseNo: e.target.value })
            setHouseNoError(false)
          }}
          sx={goldField}
        />
        <TextField
          size="small"
          label="Landmark (optional)"
          value={form.landmark}
          onChange={(e) => setForm({ ...form, landmark: e.target.value })}
          sx={goldField}
        />

        <Box>
          <Typography variant="caption" color="text.secondary">
            Save as
          </Typography>
          <ToggleButtonGroup
            exclusive
            size="small"
            value={form.label}
            onChange={(_e, v: AddressLabel | null) => v && setForm({ ...form, label: v })}
            sx={{
              display: 'flex',
              gap: 1,
              mt: 0.5,
              '& .MuiToggleButton-root': {
                flex: 1,
                gap: 0.5,
                textTransform: 'none',
                borderRadius: '20px !important',
                border: '1px solid #ccc !important',
              },
              '& .Mui-selected': {
                bgcolor: `${NAVY} !important`,
                color: '#FCCF8F !important',
                borderColor: `${NAVY} !important`,
              },
            }}
          >
            {LABELS.map((l) => (
              <ToggleButton key={l.value} value={l.value}>
                {l.icon}
                {l.value}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        <FormControlLabel
          control={
            <Switch
              checked={form.isDefault}
              onChange={(e) => setForm({ ...form, isDefault: e.target.checked })}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': { color: GOLD },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: GOLD },
              }}
            />
          }
          label="Make this my default address"
        />

        <Button
          variant="contained"
          size="large"
          onClick={save}
          disabled={saving || loading}
          startIcon={saving ? <CircularProgress size={18} color="inherit" /> : <CheckCircleOutlineIcon />}
          sx={{ bgcolor: NAVY, color: '#FCCF8F', textTransform: 'none', fontWeight: 700, borderRadius: 2, '&:hover': { bgcolor: '#14283d' } }}
        >
          {saving ? 'Saving…' : 'Save Address'}
        </Button>
      </Stack>

      {notification && (
        <Notification
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          onClose={() => setNotification(null)}
        />
      )}
    </Box>
  )
}

export default Addresses
