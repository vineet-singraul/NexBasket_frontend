import React, { useRef, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  Paper,
  Divider,
  Stack,
  Chip,
  Tooltip,
} from '@mui/material'

import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import ImageRoundedIcon from '@mui/icons-material/ImageRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import PhotoLibraryRoundedIcon from '@mui/icons-material/PhotoLibraryRounded'
import { apiPostForm } from '../../../../api/userApi'
import { Add_PRODUCT_IMAGE } from '../../../../api/endpoints'
import type { NotificationInterfacce } from '../../../../auth/types/auth.types'
import Loader from '../../../../utils/Loader'
import Notification from '../../../../utils/Notification'

interface UploadProductImageProps {
  open: boolean
  onCloseFunUploadImage: () => void
  productId: string
}

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const UploadProductImage = ({
  open,
  onCloseFunUploadImage,
  productId,
}: UploadProductImageProps) => {
  const [images, setImages] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState<NotificationInterfacce | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const addImages = (fileList: FileList | null) => {
    if (!fileList) return
    const selectedImages = Array.from(fileList).filter((file) => file.type.startsWith('image/'))
    setImages((prev) => [...prev, ...selectedImages])
  }


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    addImages(event.target.files)
    event.target.value = ''
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    addImages(event.dataTransfer.files)
  }

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleUpload = async () => {
    if (!productId) {
      setNotification({
        open: true,
        message: 'Product not found',
        severity: 'warning',
      })
      return
    }
    setLoading(true)
    try {
      const formData = new FormData()
      images.forEach((image) => formData.append('images', image))
      await apiPostForm(Add_PRODUCT_IMAGE.ADD_PRODUCT_IMAGE(productId), formData)
      setNotification({
        open: true,
        message: 'Product images uploaded successfully',
        severity: 'success',
      })
    } catch (error) {
      setNotification({
        open: true,
        message: error instanceof Error ? error.message : 'something went wrong',
        severity: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  const totalSize = images.reduce((sum, img) => sum + img.size, 0)

  return (
    <Dialog open={open} onClose={onCloseFunUploadImage} fullWidth maxWidth="md">
      {/* Header */}
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          py: 2.25,
          background: (theme) => `linear-gradient(135deg, #ff5900, #090000)`,
        }}
      >
        <Stack direction="row" sx={{ gap: 1 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2.5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: (theme) => `linear-gradient(135deg, #060200, #090000)`,
              color: 'primary.contrastText',
              boxShadow: (theme) => `0 6px 16px ${theme.palette.primary.main}4d`,
            }}
          >
            <PhotoLibraryRoundedIcon fontSize="small" />
          </Box>

          <Box>
            <Typography sx={{ fontSize: 18, fontWeight: 700, lineHeight: 1.3, color: '#ffff' }}>
              Upload Product Images
            </Typography>

            <Typography variant="body2" sx={{ color: '#ffff' }}>
              Add multiple images for your product
            </Typography>
          </Box>
        </Stack>

        <IconButton
          onClick={onCloseFunUploadImage}
          size="small"
          sx={{
            background: (theme) => `linear-gradient(135deg, #782800, #090000)`,
            color: 'primary.contrastText',
            border: '1px solid',
            borderColor: 'divider',
            '&:hover': { backgroundColor: 'action.hover' },
          }}
        >
          <CloseRoundedIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent
        sx={{
          p: 3,
          background: (theme) => `linear-gradient(135deg, #d44700, #7c0000)`,
          color: 'primary.contrastText',
        }}
      >
        {/* Upload Area */}
        <Paper
          elevation={0}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(event) => {
            event.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          sx={{
            display: 'block',
            border: '2px dashed',
            borderColor: isDragging ? 'primary.main' : 'divider',
            borderRadius: 3,
            p: 5,
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            background: (theme) => `linear-gradient(135deg, #060200, #090000)`,
            color: 'primary.contrastText',
            transform: isDragging ? 'scale(1.01)' : 'none',

            '&:hover': {
              borderColor: 'primary.main',
              backgroundColor: 'action.hover',
            },
          }}
        >
          <input
            ref={fileInputRef}
            hidden
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />

          <Box
            sx={{
              width: 72,
              height: 72,
              mx: 'auto',
              mb: 1.5,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: (theme) => `${theme.palette.primary.main}14`,
            }}
          >
            <CloudUploadRoundedIcon sx={{ fontSize: 34, color: 'primary.main' }} />
          </Box>

          <Typography sx={{ fontWeight: 600 }}>
            {isDragging ? 'Drop images here' : 'Click to upload images'}
          </Typography>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            or drag and drop &middot; JPG, PNG or WEBP
          </Typography>

          <Button
            variant="outlined"
            component="span"
            startIcon={<ImageRoundedIcon />}
            sx={{
              mt: 2.5,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            Choose Images
          </Button>
        </Paper>

        {/* Image Count */}
        {images.length > 0 && (
          <Stack direction="row" sx={{ mt: 3, mb: 1.5 }}>
            <Typography sx={{ fontWeight: 600 }}>Selected Images</Typography>

            <Stack direction="row">
              <Chip
                size="small"
                label={`${images.length} image${images.length > 1 ? 's' : ''}`}
                sx={{ fontWeight: 600 }}
              />
              <Typography variant="body2" color="text.secondary">
                {formatFileSize(totalSize)}
              </Typography>
            </Stack>
          </Stack>
        )}

        {/* Preview Grid */}
        {images.length > 0 && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(2, 1fr)',
                sm: 'repeat(3, 1fr)',
                md: 'repeat(4, 1fr)',
              },
              gap: 2,
            }}
          >
            {images.map((image, index) => (
              <Box
                key={`${image.name}-${index}`}
                sx={{
                  position: 'relative',
                  borderRadius: 2.5,
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: 'divider',
                  aspectRatio: '1 / 1',
                  boxShadow: 1,
                  transition: 'transform 0.15s ease, box-shadow 0.15s ease',

                  '&:hover': {
                    boxShadow: 3,
                    '& .image-overlay': { opacity: 1 },
                  },
                }}
              >
                <Box
                  component="img"
                  src={URL.createObjectURL(image)}
                  alt={image.name}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />

                {/* Hover overlay with filename */}
                <Box
                  className="image-overlay"
                  sx={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'flex-end',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.65), transparent 55%)',
                    opacity: { xs: 1, sm: 0 },
                    transition: 'opacity 0.15s ease',
                    p: 1,
                  }}
                >
                  <Tooltip title={image.name}>
                    <Typography
                      noWrap
                      sx={{ fontSize: 11, color: 'common.white', fontWeight: 500 }}
                    >
                      {image.name}
                    </Typography>
                  </Tooltip>
                </Box>

                {/* Delete */}
                <IconButton
                  onClick={() => handleRemoveImage(index)}
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 6,
                    right: 6,
                    width: 28,
                    height: 28,
                    backgroundColor: 'background.paper',
                    boxShadow: 1,

                    '&:hover': {
                      backgroundColor: 'error.main',
                      color: 'common.white',
                    },
                  }}
                >
                  <DeleteOutlineRoundedIcon fontSize="small" />
                </IconButton>

                {/* Primary */}
                {index === 0 && (
                  <Chip
                    icon={<StarRoundedIcon sx={{ fontSize: '14px !important' }} />}
                    label="PRIMARY"
                    size="small"
                    color="primary"
                    sx={{
                      position: 'absolute',
                      left: 6,
                      bottom: 6,
                      height: 22,
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: 0.3,
                    }}
                  />
                )}
              </Box>
            ))}
          </Box>
        )}
      </DialogContent>

      <Divider />

      {/* Footer */}
      <DialogActions
        sx={{
          px: 3,
          py: 2,
          gap: 1,
          background: (theme) => `linear-gradient(135deg, #000000, #1f0a00)`,
          color: 'primary.contrastText',
        }}
      >
        <Button
          variant="contained"
          disabled={images.length === 0}
          onClick={handleUpload}
          startIcon={<CloudUploadRoundedIcon />}
          sx={{
            textTransform: 'none',
            borderRadius: 2,
            px: 3,
            fontWeight: 600,
            color: '#fff',
          }}
        >
          Upload {images.length > 0 ? `(${images.length})` : ''}
        </Button>
      </DialogActions>

      {loading && <Loader />}

      {notification && (
        <Notification
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          onClose={() => {
            setNotification(null)
          }}
        />
      )}
    </Dialog>
  )
}

export default UploadProductImage
