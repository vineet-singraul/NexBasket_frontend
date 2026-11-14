import { useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Drawer,
  IconButton,
  InputAdornment,
  Skeleton,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tabs,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import RefreshIcon from '@mui/icons-material/Refresh'
import CloseIcon from '@mui/icons-material/Close'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutlined'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import { type NotificationInterfacce } from '../../../auth/types/auth.types.ts'
import { type OwnerDetailsTypes, type StoreProductsResponse } from '../types/admin.types.ts'
import { getAuthSession } from '../../../utils/authStorage.ts'
import Notification from '../../../utils/Notification.tsx'
import { apiGet } from '../../../api/userApi.ts'
import { ADMIN_API } from '../../../api/endpoints.ts'
import { ADMIN_COLORS } from '../Common/adminNav'

/* ================= Tokens ================= */

const C = {
  text: '#111827',
  sub: '#6b7280',
  faint: '#9ca3af',
  border: '#e5e7eb',
  rowHover: '#f9fafb',
  head: '#f9fafb',
  green: '#067647',
  greenBg: '#ecfdf3',
  greenBd: '#abefc6',
  red: '#b42318',
  redBg: '#fef3f2',
  redBd: '#fecdca',
  amber: '#b54708',
  amberBg: '#fffaeb',
  amberBd: '#fedf89',
}

type StatusFilter = 'all' | 'active' | 'inactive'
type SortKey = 'storeName' | 'products' | 'totalSales' | 'rating' | 'createdAt'

/* ================= Helpers ================= */

const formatINR = (value: number = 0) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)

const formatDate = (value?: string) =>
  value
    ? new Date(value).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      })
    : '—'

const normalizeStores = (data: unknown): StoreProductsResponse[] => {
  if (!data) return []
  const list = Array.isArray(data) ? data : [data]
  return list.filter(
    (item): item is StoreProductsResponse =>
      typeof item === 'object' && item !== null && 'ownerDetails' in item,
  )
}

const sortValue = (s: StoreProductsResponse, key: SortKey): string | number => {
  const d = s.ownerDetails
  switch (key) {
    case 'products':
      return s.productWithImages?.length ?? 0
    case 'totalSales':
      return d.totalSales ?? 0
    case 'rating':
      return d.rating ?? 0
    case 'createdAt':
      return new Date(d.createdAt ?? 0).getTime()
    default:
      return (d.storeName ?? '').toLowerCase()
  }
}

const exportCsv = (rows: StoreProductsResponse[]) => {
  const header = [
    'Store',
    'Owner ID',
    'Email',
    'Phone',
    'City',
    'State',
    'GST',
    'Products',
    'Total Sales',
    'Rating',
    'Status',
    'Joined',
  ]
  const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const lines = rows.map(({ ownerDetails: d, productWithImages, ownerId }) =>
    [
      d.storeName,
      ownerId ?? d.owner,
      d.email,
      d.phone,
      d.address?.city,
      d.address?.state,
      d.gstNumber,
      productWithImages?.length ?? 0,
      d.totalSales ?? 0,
      d.rating ?? 0,
      d.active ? 'Active' : 'Inactive',
      formatDate(d.createdAt),
    ]
      .map(esc)
      .join(','),
  )
  const blob = new Blob([[header.map(esc).join(','), ...lines].join('\n')], {
    type: 'text/csv;charset=utf-8;',
  })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `stores-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

/* ================= Small UI pieces ================= */

const StatusBadge = ({ active }: { active: boolean }) => (
  <Box
    component="span"
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 0.75,
      px: 1,
      py: '2px',
      borderRadius: '999px',
      fontSize: 12,
      fontWeight: 600,
      whiteSpace: 'nowrap',
      color: active ? C.green : C.red,
      bgcolor: active ? C.greenBg : C.redBg,
      border: `1px solid ${active ? C.greenBd : C.redBd}`,
    }}
  >
    <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'currentColor' }} />
    {active ? 'Active' : 'Inactive'}
  </Box>
)

const StockBadge = ({ status }: { status?: string }) => {
  const map: Record<string, { label: string; c: string; bg: string; bd: string }> = {
    in_stock: { label: 'In stock', c: C.green, bg: C.greenBg, bd: C.greenBd },
    low_stock: { label: 'Low stock', c: C.amber, bg: C.amberBg, bd: C.amberBd },
  }
  const s = map[status ?? ''] ?? { label: 'Out of stock', c: C.red, bg: C.redBg, bd: C.redBd }
  return (
    <Box
      component="span"
      sx={{
        px: 1,
        py: '2px',
        borderRadius: '999px',
        fontSize: 12,
        fontWeight: 600,
        whiteSpace: 'nowrap',
        color: s.c,
        bgcolor: s.bg,
        border: `1px solid ${s.bd}`,
      }}
    >
      {s.label}
    </Box>
  )
}

const Kpi = ({ label, value, hint }: { label: string; value: ReactNode; hint?: string }) => (
  <Box sx={{ px: { xs: 2, md: 2.5 }, py: { xs: 1.75, md: 2 }, minWidth: 0 }}>
    <Typography sx={{ fontSize: 13, color: C.sub, fontWeight: 500 }}>{label}</Typography>
    <Typography
      noWrap
      sx={{
        fontSize: { xs: 20, md: 24 },
        fontWeight: 600,
        color: C.text,
        mt: 0.5,
        letterSpacing: '-0.02em',
      }}
    >
      {value}
    </Typography>
    {hint && <Typography sx={{ fontSize: 12, color: C.faint, mt: 0.25 }}>{hint}</Typography>}
  </Box>
)

const DetailRow = ({ label, value, copy }: { label: string; value?: string; copy?: boolean }) => (
  <Box
    sx={{
      display: 'grid',
      gridTemplateColumns: '130px 1fr',
      gap: 2,
      py: 1.25,
      borderBottom: `1px solid ${C.border}`,
    }}
  >
    <Typography sx={{ fontSize: 13, color: C.sub }}>{label}</Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, minWidth: 0 }}>
      <Typography sx={{ fontSize: 13, color: C.text, fontWeight: 500, wordBreak: 'break-word' }}>
        {value || '—'}
      </Typography>
      {copy && value && (
        <Tooltip title="Copy">
          <IconButton
            size="small"
            onClick={() => navigator.clipboard?.writeText(value)}
            sx={{ p: 0.25, color: C.faint }}
          >
            <ContentCopyOutlinedIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  </Box>
)

const headCellSx = {
  bgcolor: C.head,
  color: C.sub,
  fontSize: 12,
  fontWeight: 600,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.04em',
  borderBottom: `1px solid ${C.border}`,
  py: 1.25,
  whiteSpace: 'nowrap' as const,
}

const bodyCellSx = { fontSize: 13.5, color: C.text, borderBottom: `1px solid ${C.border}`, py: 1.5 }

/* ================= Detail drawer ================= */

const ProductsTable = ({ products }: { products: OwnerDetailsTypes[] }) => {
  if (!products.length)
    return (
      <Box sx={{ py: 6, textAlign: 'center' }}>
        <Typography sx={{ fontSize: 14, fontWeight: 600, color: C.text }}>
          No products yet
        </Typography>
        <Typography sx={{ fontSize: 13, color: C.sub, mt: 0.5 }}>
          Is store ne abhi koi product list nahi kiya hai.
        </Typography>
      </Box>
    )

  return (
    <TableContainer sx={{ border: `1px solid ${C.border}`, borderRadius: 2 }}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={headCellSx}>Product</TableCell>
            <TableCell sx={headCellSx} align="right">
              Price
            </TableCell>
            <TableCell sx={headCellSx} align="right">
              Qty
            </TableCell>
            <TableCell sx={headCellSx}>Stock</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((p) => {
            const img = p.images?.find((i) => i.isPrimary) ?? p.images?.[0]
            return (
              <TableRow key={p._id} hover>
                <TableCell sx={{ ...bodyCellSx, maxWidth: { xs: 150, sm: 260 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, minWidth: 0 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        flexShrink: 0,
                        borderRadius: 1.5,
                        border: `1px solid ${C.border}`,
                        bgcolor: '#fff',
                        display: 'grid',
                        placeItems: 'center',
                        overflow: 'hidden',
                      }}
                    >
                      {img ? (
                        <Box
                          component="img"
                          src={img.imageUrl}
                          alt={img.altText || p.title}
                          loading="lazy"
                          sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
                        />
                      ) : (
                        <ImageNotSupportedOutlinedIcon sx={{ fontSize: 18, color: C.faint }} />
                      )}
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        noWrap
                        sx={{ fontSize: 13, fontWeight: 600, color: C.text }}
                        title={p.title}
                      >
                        {p.title}
                      </Typography>
                      <Typography noWrap sx={{ fontSize: 12, color: C.sub }}>
                        {[p.brand, p.sku].filter(Boolean).join(' · ') || '—'}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={bodyCellSx} align="right">
                  <Typography sx={{ fontSize: 13, fontWeight: 600 }}>
                    {formatINR(p.pricing?.sellingPrice)}
                  </Typography>
                  {p.pricing?.mrp > p.pricing?.sellingPrice && (
                    <Typography
                      sx={{ fontSize: 11.5, color: C.faint, textDecoration: 'line-through' }}
                    >
                      {formatINR(p.pricing.mrp)}
                    </Typography>
                  )}
                </TableCell>
                <TableCell sx={bodyCellSx} align="right">
                  {p.availableQuantity ?? p.inventory?.quantity ?? 0}
                </TableCell>
                <TableCell sx={bodyCellSx}>
                  <StockBadge status={p.inventory?.stockStatus} />
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const DeleteIconBtn = ({ onClick }: { onClick: () => void }) => (
  <Tooltip title="Delete store">
    <IconButton
      size="small"
      aria-label="Delete store"
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
      onKeyDown={(e) => e.stopPropagation()}
      sx={{
        color: C.faint,
        borderRadius: 1.5,
        '&:hover': { color: C.red, bgcolor: C.redBg },
      }}
    >
      <DeleteOutlineIcon sx={{ fontSize: 19 }} />
    </IconButton>
  </Tooltip>
)

const DeleteConfirmDialog = ({
  store,
  deleting,
  onCancel,
  onConfirm,
}: {
  store: StoreProductsResponse | null
  deleting: boolean
  onCancel: () => void
  onConfirm: () => void
}) => (
  <Dialog
    open={Boolean(store)}
    onClose={deleting ? undefined : onCancel}
    maxWidth="xs"
    fullWidth
    slotProps={{ paper: { sx: { borderRadius: 3, m: 2 } } }}
  >
    <DialogContent sx={{ pt: 3, pb: 1 }}>
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          bgcolor: C.redBg,
          color: C.red,
          display: 'grid',
          placeItems: 'center',
          mb: 2,
        }}
      >
        <WarningAmberRoundedIcon />
      </Box>
      <Typography sx={{ fontSize: 17, fontWeight: 600, color: C.text }}>
        Delete store owner?
      </Typography>
      <Typography sx={{ fontSize: 14, color: C.sub, mt: 1, lineHeight: 1.6 }}>
        <Box component="span" sx={{ fontWeight: 600, color: C.text }}>
          {store?.ownerDetails.storeName}
        </Box>{' '}
        ka owner account permanently delete ho jayega. Ye action undo nahi ho sakta.
      </Typography>
    </DialogContent>
    <DialogActions sx={{ px: 3, pb: 3, pt: 2, gap: 1 }}>
      <Button
        onClick={onCancel}
        disabled={deleting}
        variant="outlined"
        sx={{
          flex: 1,
          textTransform: 'none',
          fontWeight: 600,
          color: C.text,
          borderColor: C.border,
          borderRadius: 2,
        }}
      >
        Cancel
      </Button>
      <Button
        onClick={onConfirm}
        disabled={deleting}
        variant="contained"
        disableElevation
        startIcon={
          deleting ? <CircularProgress size={16} color="inherit" /> : <DeleteOutlineIcon />
        }
        sx={{
          flex: 1,
          textTransform: 'none',
          fontWeight: 600,
          bgcolor: '#d92d20',
          borderRadius: 2,
          '&:hover': { bgcolor: C.red },
        }}
      >
        {deleting ? 'Deleting…' : 'Delete'}
      </Button>
    </DialogActions>
  </Dialog>
)

const StoreDrawer = ({
  store,
  tab,
  onTabChange,
  onClose,
  onDelete,
}: {
  store: StoreProductsResponse | null
  tab: number
  onTabChange: (v: number) => void
  onClose: () => void
  onDelete: (store: StoreProductsResponse) => void
}) => {
  const d = store?.ownerDetails
  const products = store?.productWithImages ?? []
  const addr = d?.address

  return (
    <Drawer
      anchor="right"
      open={Boolean(store)}
      onClose={onClose}
      slotProps={{ paper: { sx: { width: { xs: '100%', sm: 560 } } } }}
    >
      {d && (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Header */}
          <Box sx={{ px: 3, pt: 2.5, pb: 0, borderBottom: `1px solid ${C.border}` }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
              <Avatar
                src={d.logo || undefined}
                variant="rounded"
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: ADMIN_COLORS.navy,
                  fontWeight: 600,
                  borderRadius: 2,
                }}
              >
                {d.storeName?.[0]?.toUpperCase()}
              </Avatar>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                  <Typography sx={{ fontSize: 18, fontWeight: 600, color: C.text }}>
                    {d.storeName}
                  </Typography>
                  <StatusBadge active={d.active} />
                </Box>
                <Typography sx={{ fontSize: 13, color: C.sub, mt: 0.25 }} noWrap>
                  {d.email}
                </Typography>
              </Box>
              <IconButton onClick={onClose} size="small" aria-label="Close">
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                mt: 2.5,
                border: `1px solid ${C.border}`,
                borderRadius: 2,
              }}
            >
              {[
                { l: 'Products', v: products.length },
                { l: 'Total sales', v: formatINR(d.totalSales) },
                { l: 'Rating', v: (d.rating ?? 0).toFixed(1) },
              ].map((k, i) => (
                <Box
                  key={k.l}
                  sx={{ p: 1.5, borderLeft: i ? `1px solid ${C.border}` : 'none', minWidth: 0 }}
                >
                  <Typography sx={{ fontSize: 12, color: C.sub }}>{k.l}</Typography>
                  <Typography noWrap sx={{ fontSize: 16, fontWeight: 600, color: C.text }}>
                    {k.v}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Tabs
              value={tab}
              onChange={(_, v: number) => onTabChange(v)}
              sx={{
                mt: 1.5,
                minHeight: 40,
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontSize: 14,
                  fontWeight: 600,
                  minHeight: 40,
                  px: 0,
                  mr: 3,
                  minWidth: 0,
                  color: C.sub,
                },
                '& .Mui-selected': { color: `${C.text} !important` },
                '& .MuiTabs-indicator': { bgcolor: ADMIN_COLORS.orange, height: 2 },
              }}
            >
              <Tab label="Overview" />
              <Tab label={`Products (${products.length})`} />
            </Tabs>
          </Box>

          {/* Body */}
          <Box sx={{ flex: 1, overflowY: 'auto', px: 3, py: 2.5 }}>
            {tab === 0 ? (
              <>
                {d.description && (
                  <Typography sx={{ fontSize: 13.5, color: C.sub, lineHeight: 1.6, mb: 2.5 }}>
                    {d.description}
                  </Typography>
                )}

                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: C.sub,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    mb: 0.5,
                  }}
                >
                  Store information
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <DetailRow label="Store ID" value={d._id} copy />
                  <DetailRow label="Owner ID" value={store?.ownerId ?? d.owner} copy />
                  <DetailRow label="GST number" value={d.gstNumber} copy />
                  <DetailRow label="Joined on" value={formatDate(d.createdAt)} />
                  <DetailRow label="Last updated" value={formatDate(d.updatedAt)} />
                </Box>

                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: C.sub,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    mb: 0.5,
                  }}
                >
                  Contact & address
                </Typography>
                <Box>
                  <DetailRow label="Email" value={d.email} copy />
                  <DetailRow label="Phone" value={d.phone} copy />
                  <DetailRow label="Street" value={addr?.street} />
                  <DetailRow
                    label="City / State"
                    value={[addr?.city, addr?.state].filter(Boolean).join(', ')}
                  />
                  <DetailRow label="Pincode" value={addr?.pincode} />
                  <DetailRow label="Country" value={addr?.country} />
                </Box>
              </>
            ) : (
              <ProductsTable products={products} />
            )}
          </Box>

          {/* Footer */}
          <Box
            sx={{
              px: 3,
              py: 2,
              borderTop: `1px solid ${C.border}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            <Button
              variant="outlined"
              startIcon={<DeleteOutlineIcon />}
              onClick={() => store && onDelete(store)}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                color: C.red,
                borderColor: C.redBd,
                borderRadius: 2,
                '&:hover': { borderColor: C.red, bgcolor: C.redBg },
              }}
            >
              Delete store
            </Button>
            <Button
              onClick={onClose}
              variant="outlined"
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                color: C.text,
                borderColor: C.border,
                borderRadius: 2,
              }}
            >
              Close
            </Button>
          </Box>
        </Box>
      )}
    </Drawer>
  )
}

/* ================= Page ================= */

const ShowOwnerDataToAdmin = () => {
  const theme = useTheme()
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'))
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'))
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'))

  const [stores, setStores] = useState<StoreProductsResponse[]>([])
  const [notification, setNotification] = useState<NotificationInterfacce | null>(null)
  const [loading, setLoading] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [sortKey, setSortKey] = useState<SortKey>('createdAt')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [selected, setSelected] = useState<StoreProductsResponse | null>(null)
  const [drawerTab, setDrawerTab] = useState(0)
  const [toDelete, setToDelete] = useState<StoreProductsResponse | null>(null)
  const [deleting, setDeleting] = useState(false)

  const session = getAuthSession<{ _id: string; role?: string; email?: string }>()
  const adminId = session?.user?._id

  useEffect(() => {
    const fetchOwnerDetails = async () => {
      try {
        setLoading(true)
        const response = await apiGet<{ data: StoreProductsResponse[] | StoreProductsResponse }>(
          ADMIN_API.SHOW_OWNER_DETAILS_API,
        )
        setStores(normalizeStores(response.data))
      } catch (error) {
        setNotification({
          open: true,
          message: error instanceof Error ? error.message : 'Something went wrong',
          severity: 'error',
        })
      } finally {
        setLoading(false)
      }
    }
    fetchOwnerDetails()
  }, [adminId, reloadKey])

  const counts = useMemo(() => {
    const active = stores.filter((s) => s.ownerDetails.active).length
    return {
      all: stores.length,
      active,
      inactive: stores.length - active,
      products: stores.reduce((sum, s) => sum + (s.productWithImages?.length ?? 0), 0),
      sales: stores.reduce((sum, s) => sum + (s.ownerDetails.totalSales ?? 0), 0),
    }
  }, [stores])

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase()
    const filtered = stores.filter((s) => {
      const d = s.ownerDetails
      if (status === 'active' && !d.active) return false
      if (status === 'inactive' && d.active) return false
      if (!q) return true
      return [d.storeName, d.email, d.phone, d.address?.city, d.gstNumber].some((v) =>
        v?.toLowerCase().includes(q),
      )
    })
    const dir = sortDir === 'asc' ? 1 : -1
    return [...filtered].sort((a, b) => {
      const av = sortValue(a, sortKey)
      const bv = sortValue(b, sortKey)
      return av > bv ? dir : av < bv ? -dir : 0
    })
  }, [stores, search, status, sortKey, sortDir])

  const paged = rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else {
      setSortKey(key)
      setSortDir(key === 'storeName' ? 'asc' : 'desc')
    }
  }

  const sortHead = (k: SortKey, label: string, align?: 'right') => (
    <TableCell
      key={k}
      sx={headCellSx}
      align={align}
      sortDirection={sortKey === k ? sortDir : false}
    >
      <TableSortLabel
        active={sortKey === k}
        direction={sortKey === k ? sortDir : 'asc'}
        onClick={() => handleSort(k)}
      >
        {label}
      </TableSortLabel>
    </TableCell>
  )

  const emptyState = (
    <Box sx={{ py: 8, px: 2, textAlign: 'center' }}>
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 2,
          border: `1px solid ${C.border}`,
          display: 'grid',
          placeItems: 'center',
          mx: 'auto',
          mb: 1.5,
        }}
      >
        <StorefrontOutlinedIcon sx={{ color: C.sub }} />
      </Box>
      <Typography sx={{ fontSize: 15, fontWeight: 600, color: C.text }}>
        {stores.length ? 'No stores match your filters' : 'No stores yet'}
      </Typography>
      <Typography sx={{ fontSize: 13.5, color: C.sub, mt: 0.5 }}>
        {stores.length
          ? 'Search ya status filter change karke dekhiye.'
          : 'Jab owners store register karenge, woh yahan dikhenge.'}
      </Typography>
      {stores.length > 0 && (
        <Button
          size="small"
          onClick={() => {
            setSearch('')
            setStatus('all')
          }}
          sx={{ mt: 1.5, textTransform: 'none', fontWeight: 600, color: ADMIN_COLORS.orange }}
        >
          Clear filters
        </Button>
      )}
    </Box>
  )

  const openStore = (store: StoreProductsResponse) => {
    setDrawerTab(0)
    setSelected(store)
  }

  const handleDelete = async () => {
    if (!toDelete) return
    const target = toDelete
    const ownerId = target.ownerId ?? target.ownerDetails.owner
    try {
      setDeleting(true)
      const res = await apiGet<{ success: boolean; message?: string }>(
        ADMIN_API.DELETE_OWNER_API(ownerId),
      )
      setStores((prev) => prev.filter((s) => s.ownerDetails._id !== target.ownerDetails._id))
      if (selected?.ownerDetails._id === target.ownerDetails._id) setSelected(null)
      setNotification({
        open: true,
        message: res.message ?? 'Owner deleted successfully',
        severity: 'success',
      })
    } catch (error) {
      setNotification({
        open: true,
        message: error instanceof Error ? error.message : 'Delete failed',
        severity: 'error',
      })
    } finally {
      setDeleting(false)
      setToDelete(null)
    }
  }

  const colCount = 4 + (isMdUp ? 2 : 0) + (isLgUp ? 2 : 0)

  return (
    <Box>
      {/* ===== Page header ===== */}
      <Box
        sx={{
          display: 'flex',
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          gap: 2,
          mb: 2.5,
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: { xs: 20, md: 24 },
              fontWeight: 600,
              color: C.text,
              letterSpacing: '-0.02em',
            }}
          >
            Stores
          </Typography>
          <Typography sx={{ fontSize: 14, color: C.sub, mt: 0.25 }}>
            Platform par registered saare store owners ko manage karein.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<RefreshIcon />}
            onClick={() => setReloadKey((k) => k + 1)}
            disabled={loading}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              color: C.text,
              borderColor: C.border,
              bgcolor: '#fff',
              borderRadius: 2,
              '&:hover': { borderColor: '#d1d5db', bgcolor: C.rowHover },
            }}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            size="small"
            disableElevation
            startIcon={<FileDownloadOutlinedIcon />}
            onClick={() => exportCsv(rows)}
            disabled={!rows.length}
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              bgcolor: ADMIN_COLORS.navy,
              borderRadius: 2,
              '&:hover': { bgcolor: ADMIN_COLORS.navyLight },
            }}
          >
            Export CSV
          </Button>
        </Box>
      </Box>

      {/* ===== KPI strip ===== */}
      <Box
        sx={{
          bgcolor: '#fff',
          border: `1px solid ${C.border}`,
          borderRadius: 3,
          display: 'grid',
          gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' },
          mb: 2.5,
          '& > *': { borderColor: C.border },
          '& > *:not(:first-of-type)': { borderLeft: { md: `1px solid ${C.border}` } },
          '& > *:nth-of-type(2n)': { borderLeft: { xs: `1px solid ${C.border}` } },
          '& > *:nth-of-type(n+3)': { borderTop: { xs: `1px solid ${C.border}`, md: 'none' } },
        }}
      >
        <Kpi label="Total stores" value={loading ? <Skeleton width={50} /> : counts.all} />
        <Kpi
          label="Active stores"
          value={loading ? <Skeleton width={50} /> : counts.active}
          hint={
            counts.all ? `${Math.round((counts.active / counts.all) * 100)}% of total` : undefined
          }
        />
        <Kpi label="Listed products" value={loading ? <Skeleton width={50} /> : counts.products} />
        <Kpi
          label="Gross sales"
          value={loading ? <Skeleton width={90} /> : formatINR(counts.sales)}
        />
      </Box>

      {/* ===== Table card ===== */}
      <Box
        sx={{
          bgcolor: '#fff',
          border: `1px solid ${C.border}`,
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        {/* Tabs + search */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { md: 'center' },
            justifyContent: 'space-between',
            gap: 1.5,
            px: 2,
            pt: 1,
            pb: { xs: 1.5, md: 0 },
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <Tabs
            value={status}
            onChange={(_, v: StatusFilter) => {
              setStatus(v)
              setPage(0)
            }}
            variant="scrollable"
            sx={{
              minHeight: 44,
              '& .MuiTab-root': {
                textTransform: 'none',
                fontSize: 14,
                fontWeight: 600,
                minHeight: 44,
                px: 0,
                mr: 3,
                minWidth: 0,
                color: C.sub,
              },
              '& .Mui-selected': { color: `${C.text} !important` },
              '& .MuiTabs-indicator': { bgcolor: ADMIN_COLORS.orange, height: 2 },
            }}
          >
            {(['all', 'active', 'inactive'] as StatusFilter[]).map((s) => (
              <Tab
                key={s}
                value={s}
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                    {s[0].toUpperCase() + s.slice(1)}
                    <Box
                      component="span"
                      sx={{
                        fontSize: 12,
                        px: 0.75,
                        borderRadius: 1,
                        bgcolor: status === s ? ADMIN_COLORS.orangeSoft : '#f3f4f6',
                        color: status === s ? ADMIN_COLORS.orange : C.sub,
                      }}
                    >
                      {counts[s]}
                    </Box>
                  </Box>
                }
              />
            ))}
          </Tabs>
          <TextField
            size="small"
            placeholder="Search by store, email, phone, city, GST"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(0)
            }}
            sx={{
              width: { xs: '100%', md: 320 },
              my: { md: 1 },
              '& .MuiOutlinedInput-root': { borderRadius: 2, fontSize: 14 },
              '& fieldset': { borderColor: C.border },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: C.faint, fontSize: 20 }} />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        {!isSmUp ? (
          <Box>
            {loading &&
              Array.from({ length: 4 }).map((_, i) => (
                <Box
                  key={`msk-${i}`}
                  sx={{
                    display: 'flex',
                    gap: 1.5,
                    alignItems: 'center',
                    px: 2,
                    py: 1.75,
                    borderBottom: `1px solid ${C.border}`,
                  }}
                >
                  <Skeleton variant="rounded" width={40} height={40} />
                  <Box sx={{ flex: 1 }}>
                    <Skeleton width="60%" />
                    <Skeleton width="85%" />
                  </Box>
                </Box>
              ))}

            {!loading && paged.length === 0 && emptyState}

            {!loading &&
              paged.map((store) => {
                const d = store.ownerDetails
                return (
                  <Box
                    key={d._id}
                    role="button"
                    tabIndex={0}
                    onClick={() => openStore(store)}
                    onKeyDown={(e) => e.key === 'Enter' && openStore(store)}
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 1.5,
                      px: 2,
                      py: 1.75,
                      cursor: 'pointer',
                      borderBottom: `1px solid ${C.border}`,
                      '&:last-of-type': { borderBottom: 0 },
                      '&:active': { bgcolor: C.rowHover },
                    }}
                  >
                    <Avatar
                      src={d.logo || undefined}
                      variant="rounded"
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 1.5,
                        bgcolor: ADMIN_COLORS.navy,
                        fontSize: 15,
                        fontWeight: 600,
                        flexShrink: 0,
                        mt: '2px',
                      }}
                    >
                      {d.storeName?.[0]?.toUpperCase()}
                    </Avatar>
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: 1,
                        }}
                      >
                        <Typography
                          noWrap
                          sx={{ fontSize: 14, fontWeight: 600, color: C.text, minWidth: 0 }}
                        >
                          {d.storeName || 'Unnamed store'}
                        </Typography>
                        <StatusBadge active={d.active} />
                      </Box>
                      <Typography noWrap sx={{ fontSize: 12.5, color: C.sub, mt: 0.25 }}>
                        {d.email || '—'}
                      </Typography>
                      <Typography
                        noWrap
                        sx={{
                          fontSize: 12,
                          color: C.faint,
                          mt: 0.25,
                          fontVariantNumeric: 'tabular-nums',
                        }}
                      >
                        {store.productWithImages?.length ?? 0} products · {formatINR(d.totalSales)}{' '}
                        · ★ {(d.rating ?? 0).toFixed(1)}
                      </Typography>
                    </Box>
                    <Box sx={{ alignSelf: 'center', flexShrink: 0, ml: -0.5 }}>
                      <DeleteIconBtn onClick={() => setToDelete(store)} />
                    </Box>
                  </Box>
                )
              })}
          </Box>
        ) : (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {sortHead('storeName', 'Store')}
                  {isMdUp && <TableCell sx={headCellSx}>Contact</TableCell>}
                  {isLgUp && <TableCell sx={headCellSx}>Location</TableCell>}
                  {sortHead('products', 'Products', 'right')}
                  {isMdUp && sortHead('totalSales', 'Sales', 'right')}
                  {isLgUp && sortHead('rating', 'Rating', 'right')}
                  <TableCell sx={headCellSx}>Status</TableCell>
                  <TableCell sx={{ ...headCellSx, width: 90 }} align="right">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading &&
                  Array.from({ length: 5 }).map((_, i) => (
                    <TableRow key={`sk-${i}`}>
                      {Array.from({ length: colCount }).map((__, j) => (
                        <TableCell key={j} sx={bodyCellSx}>
                          {j === 0 ? (
                            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                              <Skeleton variant="rounded" width={36} height={36} />
                              <Box sx={{ flex: 1 }}>
                                <Skeleton width="70%" />
                                <Skeleton width="40%" />
                              </Box>
                            </Box>
                          ) : (
                            <Skeleton />
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}

                {!loading && paged.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={colCount} sx={{ border: 0, p: 0 }}>
                      {emptyState}
                    </TableCell>
                  </TableRow>
                )}

                {!loading &&
                  paged.map((store) => {
                    const d = store.ownerDetails
                    return (
                      <TableRow
                        key={d._id}
                        hover
                        onClick={() => openStore(store)}
                        sx={{
                          cursor: 'pointer',
                          '&.MuiTableRow-hover:hover': { bgcolor: C.rowHover },
                          '&:last-child td': { borderBottom: 0 },
                        }}
                      >
                        <TableCell sx={{ ...bodyCellSx, maxWidth: 280 }}>
                          <Box
                            sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 0 }}
                          >
                            <Avatar
                              src={d.logo || undefined}
                              variant="rounded"
                              sx={{
                                width: 36,
                                height: 36,
                                borderRadius: 1.5,
                                bgcolor: ADMIN_COLORS.navy,
                                fontSize: 14,
                                fontWeight: 600,
                              }}
                            >
                              {d.storeName?.[0]?.toUpperCase()}
                            </Avatar>
                            <Box sx={{ minWidth: 0 }}>
                              <Typography
                                noWrap
                                sx={{ fontSize: 14, fontWeight: 600, color: C.text }}
                              >
                                {d.storeName || 'Unnamed store'}
                              </Typography>
                              <Typography noWrap sx={{ fontSize: 12.5, color: C.sub }}>
                                {isMdUp ? `Joined ${formatDate(d.createdAt)}` : d.email}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        {isMdUp && (
                          <TableCell sx={{ ...bodyCellSx, maxWidth: 240 }}>
                            <Typography noWrap sx={{ fontSize: 13.5, color: C.text }}>
                              {d.email || '—'}
                            </Typography>
                            <Typography noWrap sx={{ fontSize: 12.5, color: C.sub }}>
                              {d.phone || '—'}
                            </Typography>
                          </TableCell>
                        )}
                        {isLgUp && (
                          <TableCell sx={bodyCellSx}>
                            <Typography noWrap sx={{ fontSize: 13.5 }}>
                              {d.address?.city || '—'}
                            </Typography>
                            <Typography noWrap sx={{ fontSize: 12.5, color: C.sub }}>
                              {d.address?.state || ''}
                            </Typography>
                          </TableCell>
                        )}
                        <TableCell
                          sx={{ ...bodyCellSx, fontVariantNumeric: 'tabular-nums' }}
                          align="right"
                        >
                          {store.productWithImages?.length ?? 0}
                        </TableCell>
                        {isMdUp && (
                          <TableCell
                            sx={{
                              ...bodyCellSx,
                              fontWeight: 600,
                              fontVariantNumeric: 'tabular-nums',
                            }}
                            align="right"
                          >
                            {formatINR(d.totalSales)}
                          </TableCell>
                        )}
                        {isLgUp && (
                          <TableCell sx={bodyCellSx} align="right">
                            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.25 }}>
                              <StarRoundedIcon sx={{ fontSize: 16, color: '#f59e0b' }} />
                              {(d.rating ?? 0).toFixed(1)}
                            </Box>
                          </TableCell>
                        )}
                        <TableCell sx={bodyCellSx}>
                          <StatusBadge active={d.active} />
                        </TableCell>
                        <TableCell sx={{ ...bodyCellSx, py: 1 }} align="right">
                          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}>
                            <DeleteIconBtn onClick={() => setToDelete(store)} />
                            <ChevronRightIcon sx={{ color: C.faint, fontSize: 20 }} />
                          </Box>
                        </TableCell>
                      </TableRow>
                    )
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Divider sx={{ borderColor: C.border }} />
        {!isSmUp ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              py: 1,
            }}
          >
            <Typography sx={{ fontSize: 13, color: C.sub, fontVariantNumeric: 'tabular-nums' }}>
              {rows.length
                ? `${page * rowsPerPage + 1}–${Math.min(rows.length, (page + 1) * rowsPerPage)} of ${rows.length}`
                : '0 results'}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                size="small"
                aria-label="Previous page"
                disabled={page === 0}
                onClick={() => setPage((p) => p - 1)}
                sx={{ border: `1px solid ${C.border}`, borderRadius: 1.5 }}
              >
                <ChevronLeftIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                aria-label="Next page"
                disabled={(page + 1) * rowsPerPage >= rows.length}
                onClick={() => setPage((p) => p + 1)}
                sx={{ border: `1px solid ${C.border}`, borderRadius: 1.5 }}
              >
                <ChevronRightIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        ) : (
          <TablePagination
            component="div"
            count={rows.length}
            page={page}
            onPageChange={(_, p: number) => setPage(p)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10))
              setPage(0)
            }}
            rowsPerPageOptions={[10, 25, 50]}
            sx={{
              color: C.sub,
              '& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows': {
                fontSize: 13,
              },
            }}
          />
        )}
      </Box>

      <StoreDrawer
        store={selected}
        tab={drawerTab}
        onTabChange={setDrawerTab}
        onClose={() => setSelected(null)}
        onDelete={setToDelete}
      />

      <DeleteConfirmDialog
        store={toDelete}
        deleting={deleting}
        onCancel={() => setToDelete(null)}
        onConfirm={handleDelete}
      />

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

export default ShowOwnerDataToAdmin
