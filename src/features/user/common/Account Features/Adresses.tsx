/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState, useCallback } from 'react'
import { Box, Button, CircularProgress, Paper, Stack, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import { getAuthSession } from '../../../../utils/authStorage'
import Notification from '../../../../utils/Notification'
import { type NotificationInterfacce } from '../../../../auth/types/auth.types'
import { apiDelete, apiGet } from '../../../../api/userApi'
import { USER_HOME_PAGE_CARDS } from '../../../../api/endpoints'
import SaveAddress, { type AddressesType } from './SaveAddress'

const BLUE = '#2874F0'
const actBtn = { textTransform: 'none', fontWeight: 600, minWidth: 0, px: 1.5 } as const

const Addresses = () => {
  const userId = getAuthSession<{ _id: string }>()?.user?._id
  const [list, setList] = useState<AddressesType[]>([])
  const [loading, setLoading] = useState(true)
  const [showMap, setShowMap] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [notification, setNotification] = useState<NotificationInterfacce | null>(null)
  const notify = (message: string, severity: NotificationInterfacce['severity']) =>
    setNotification({ open: true, message, severity })

  const load = useCallback(async () => {
    if (!userId) return setLoading(false)
    try {
      const res = await apiGet<{ data: AddressesType[] }>(
        USER_HOME_PAGE_CARDS.GET_USER_ADDRESSES(userId),
      )
      setList(res.data ?? [])
    } catch {
      setList([])
    } finally {
      setLoading(false)
    }
  }, [userId])

  useEffect(() => {
    load()
  }, [load])

  const remove = async (_id: string) => {
    setDeleting(_id)
    try {
      await apiDelete(USER_HOME_PAGE_CARDS.DELETE_ADDRESS(userId ?? '', _id ?? ''))
      setList((l) => l.filter((a) => a._id !== _id))
    } catch {
      notify('Delete failed', 'error')
    } finally {
      setDeleting(null)
    }
  }

  if (loading)
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <CircularProgress size={28} />
      </Box>
    )

  if (showMap)
    return (
      <SaveAddress
        onCancel={() => setShowMap(false)}
        onSaved={() => {
          setShowMap(false)
          load()
        }}
      />
    )

  return (
    <Box sx={{ width: '100%', maxWidth: 680, mx: 'auto', textAlign: 'left' }}>
      <Typography sx={{ fontWeight: 600, fontSize: 18, mb: 2 }}>Manage Addresses</Typography>

      <Button
        fullWidth
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={() => setShowMap(true)}
        sx={{
          justifyContent: 'flex-start',
          py: 1.75,
          px: 2.5,
          mb: 2,
          color: BLUE,
          fontWeight: 600,
          borderColor: '#e0e0e0',
          borderRadius: 1,
          bgcolor: '#fff',
        }}
      >
        {list.length ? 'ADD A NEW ADDRESS' : 'SAVE ADDRESS'}
      </Button>

      {list.length === 0 ? (
        <Paper variant="outlined" sx={{ py: 6, textAlign: 'center', color: 'text.secondary' }}>
          <PlaceOutlinedIcon sx={{ fontSize: 56, color: '#c2c2c2' }} />
          <Typography sx={{ mt: 1 }}>No saved addresses yet</Typography>
        </Paper>
      ) : (
        <Stack spacing={1.5}>
          {list.map((a) => (
            <Paper
              key={a._id}
              variant="outlined"
              sx={{
                p: 2.5,
                borderRadius: 1,
                '&:hover': { boxShadow: '0 2px 8px rgba(0,0,0,0.08)' },
              }}
            >
              <Box
                component="span"
                sx={{
                  display: 'inline-block',
                  px: 1,
                  py: 0.25,
                  mb: 1.25,
                  fontSize: 11,
                  fontWeight: 600,
                  borderRadius: 0.5,
                  bgcolor: '#f0f0f0',
                  color: '#878787',
                }}
              >
                {a.AdressIs.toUpperCase()}
              </Box>
              <Typography sx={{ fontWeight: 600, fontSize: 15 }}>{a.AdressConfirm}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, lineHeight: 1.6 }}>
                {a.fullAdress}
              </Typography>
              {a.LandMark && (
                <Typography variant="caption" color="text.secondary">
                  Landmark: {a.LandMark}
                </Typography>
              )}

              <Stack
                direction="row"
                spacing={1}
                sx={{ mt: 1.5, pt: 1.5, borderTop: '1px solid #f0f0f0' }}
              >
                <Button
                  size="small"
                  startIcon={<EditOutlinedIcon fontSize="small" />}
                  onClick={() => setShowMap(true)}
                  sx={{ ...actBtn, color: BLUE }}
                >
                  Change
                </Button>
                <Button
                  size="small"
                  color="error"
                  disabled={deleting === a._id}
                  startIcon={
                    deleting === a._id ? (
                      <CircularProgress size={14} color="inherit" />
                    ) : (
                      <DeleteIcon fontSize="small" />
                    )
                  }
                  onClick={() => remove(a._id)}
                  sx={actBtn}
                >
                  Delete
                </Button>
              </Stack>
            </Paper>
          ))}
        </Stack>
      )}
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
