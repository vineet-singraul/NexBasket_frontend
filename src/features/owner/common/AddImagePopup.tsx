import {
  Box,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material'

import CloseIcon from '@mui/icons-material/Close'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'

import React, { useEffect, useRef, useState } from 'react'

import { IsImageValidate } from '../../../utils/validators.ts'
import style from '../../../styles/ownerStyle/popupAddImage.module.css'

import type { NotificationInterfacce } from '../../../auth/types/auth.types.ts'
import type { addImageProductPopUpProps, ProductImageInterface, FetchedImage } from '../types/Images.types'

import Notification from '../../../utils/Notification.tsx'
import { PRODUCT_IMAGE_ADD } from '../../../api/endpoints.ts'
import { apiDelete, apiGet, apiPost } from '../../../api/userApi.ts'

const AddImagePopup = ({
  addImageOapen,
  handleCloseImageConatiner,
  selectedProduct,
}: addImageProductPopUpProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [prevImage, setPrevImage] = useState<string | undefined>(undefined)
  const [productImages, setProductImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [galleryLoading, setGalleryLoading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [notification, setNotification] = useState<NotificationInterfacce | null>(null)
  const [fatchedImages, setFatcedImages] = useState<FetchedImage[]>([])

  const productId = selectedProduct?._id ?? ''
  const objectUrlsRef = useRef<string[]>([])
  const dragCounterRef = useRef(0)

  // Shared logic for accepting a file from either the input or a drop
  const acceptFile = (file: File | undefined) => {
    if (!file) return
    const isValid = IsImageValidate(file)

    if (isValid === 'please upload valid image') {
      setNotification({
        open: true,
        message: isValid,
        severity: 'warning',
      })
      return
    }

    setSelectedFile(file)

    const objectUrl = URL.createObjectURL(file)
    objectUrlsRef.current.push(objectUrl)

    setPrevImage(objectUrl)
    setProductImages((currentImages) => [objectUrl, ...currentImages])
  }

  // Select image via file picker
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    acceptFile(event.target.files?.[0])
    event.target.value = ''
  }

  // Drag and drop handlers
  const handleDragEnter = (event: React.DragEvent) => {
    event.preventDefault()
    dragCounterRef.current += 1
    setIsDragging(true)
  }

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault()
    dragCounterRef.current -= 1
    if (dragCounterRef.current <= 0) {
      dragCounterRef.current = 0
      setIsDragging(false)
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    dragCounterRef.current = 0
    setIsDragging(false)
    acceptFile(event.dataTransfer.files?.[0])
  }

  // Preview image (also drives the selection ring)
  const handlePreviewImage = (image: string) => {
    setPrevImage(image)
  }

  // // Drop the pending local selection without touching the uploaded gallery
  // const handleRemoveSelected = (event: React.MouseEvent, image: string) => {
  //   event.stopPropagation()
  //   setProductImages((current) => current.filter((img) => img !== image))
  //   if (prevImage === image) {
  //     setPrevImage(undefined)
  //   }
  //   if (!image) return
  //   if (objectUrlsRef.current.includes(image)) {
  //     URL.revokeObjectURL(image)
  //     objectUrlsRef.current = objectUrlsRef.current.filter((url) => url !== image)
  //   }
  //   setSelectedFile(null)
  // }

  // Upload image
  const handleSubmit = async () => {
    if (!productId) {
      setNotification({
        open: true,
        message: 'Please select a valid product before uploading an image',
        severity: 'warning',
      })
      return
    }

    if (!selectedFile) {
      setNotification({
        open: true,
        message: 'Please select an image before uploading',
        severity: 'warning',
      })
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append('images', selectedFile)

      const response = await apiPost(PRODUCT_IMAGE_ADD.ADD_IMAGE(productId), formData)

      console.log('Upload response:', response)

      setNotification({
        open: true,
        message: 'Image uploaded successfully',
        severity: 'success',
      })

      setSelectedFile(null)
    } catch (error) {
      console.error('Upload error:', error)

      setNotification({
        open: true,
        message: 'Please try later! Something went wrong',
        severity: 'error',
      })
    } finally {
      setLoading(false)
    }
  }



  // Get Image
useEffect(() => {
  const GetProductImage = async () => {
    try {
      setGalleryLoading(true)

      const response = await apiGet<{
        success: boolean
        message: string
        data: ProductImageInterface[]
      }>(PRODUCT_IMAGE_ADD.GET_IMAGE(productId))

      const images = response.data.map((image) => {
        const imageRecord = image as ProductImageInterface & {
          _id?: string
          id?: string
        }

        return {
          id: imageRecord._id ?? imageRecord.id ?? '',
          imageUrl: image.imageUrl,
          isPrimary: image.isPrimary,
        }
      })

      setFatcedImages(images)
    } catch (error) {
      console.error(error)
      setNotification({
        open: true,
        message: 'Something went wrong',
        severity: 'error',
      })
    } finally {
      setGalleryLoading(false)
    }
  }

  if (productId) {
    GetProductImage()
  }
}, [productId])
  

  // Delete the Image 
const handleDelete = async (imageId: string) => {
  try {
    await apiDelete(PRODUCT_IMAGE_ADD.DELETE_IMAGE(imageId)) // adjust to your actual endpoint

    setFatcedImages((prev) => prev.filter((img) => img.id !== imageId))

    setNotification({
      open: true,
      message: 'Image deleted successfully',
      severity: 'success',
    })
  } catch (error) {
    console.error(error)
    setNotification({
      open: true,
      message: 'Failed to delete image',
      severity: 'error',
    })
  }
}

  // Cleanup preview URLs
  useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach((url) => {
        URL.revokeObjectURL(url)
      })
      objectUrlsRef.current = []
    }
  }, [])

  const visibleImages = productImages.slice(0, 2)
  const moreImageCount = Math.max(productImages.length - 2, 0)
  const totalImageCount = fatchedImages.length + productImages.length

  return (
    <Dialog
      open={addImageOapen}
      onClose={handleCloseImageConatiner}
      aria-labelledby="product-details-title"
      classes={{ paper: style.RP_dialogPaper }}
    >
      <DialogTitle id="product-details-title" className={style.RP_dialogHeader} component="div">
        <Box className={style.RP_dialogIcon}>
          <ImageOutlinedIcon />
        </Box>

        <Box className={style.RP_dialogHeadingWrap}>
          <Typography className={style.RP_dialogTitle}>{selectedProduct?.name}</Typography>
          <Typography className={style.RP_dialogSubtitle}>
            Brand of product "{selectedProduct?.brand}"
          </Typography>
        </Box>

        <IconButton
          aria-label="close"
          className={style.RP_dialogClose}
          size="small"
          onClick={handleCloseImageConatiner}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent className={style.AI_dialogContent}>
        <Box className={style.AI_mainContainer}>
          {/* Left side */}
          <Box className={style.AI_leftSection}>
            <Box
              className={`${style.AI_fileBox} ${isDragging ? style.AI_fileBoxDragging : ''}`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <Box className={style.AI_sectionHeader}>
                <Box className={style.AI_sectionIcon}>
                  <CloudUploadOutlinedIcon />
                </Box>
                <Box>
                  <Typography className={style.AI_sectionTitle}>Select image</Typography>
                  <Typography className={style.AI_sectionSubTitle}>
                    Drag a photo here or choose a file
                  </Typography>
                </Box>
              </Box>

              <input
                id="product-image-upload"
                type="file"
                accept=".png,.jpg,.jpeg"
                className={style.AI_hiddenFileInput}
                onChange={handleChange}
              />

              <label htmlFor="product-image-upload" className={style.AI_dropzoneLabel}>
                <CloudUploadOutlinedIcon className={style.AI_dropzoneIcon} />
                <Typography className={style.AI_dropzoneText}>
                  {isDragging ? 'Drop to add' : 'Drop an image, or click to browse'}
                </Typography>
                <Typography className={style.AI_dropzoneHint}>PNG or JPG</Typography>
              </label>

              {selectedFile && (
                <Box className={style.AI_selectedFileRow}>
                  <ImageOutlinedIcon className={style.AI_selectedFileIcon} />
                  <Typography className={style.AI_selectedFileName}>{selectedFile.name}</Typography>
                </Box>
              )}
            </Box>

            {/* Product images */}
            <Box className={style.AI_galleryBox}>
              <Box className={style.AI_boxHeader}>
                <Box>
                  <Typography className={style.AI_sectionTitle}>Contact sheet</Typography>
                  <Typography className={style.AI_sectionSubTitle}>
                    {totalImageCount} product {totalImageCount === 1 ? 'image' : 'images'}
                  </Typography>
                </Box>
                <Box className={style.AI_imageCount}>{totalImageCount}</Box>
              </Box>

<Box className={style.AI_filmStrip}>
  {galleryLoading &&
    Array.from({ length: 4 }).map((_, i) => (
      <Box key={`skeleton-${i}`} className={style.AI_skeletonCard} />
    ))}

  <Box className={style.AI_galleryScroll}>
    {!galleryLoading &&
      fatchedImages.map((image) => (
        <Box
          key={image.id}
          className={`${style.AI_frameCard} ${
            prevImage === image.imageUrl ? style.AI_frameCardActive : ''
          }`}
          onClick={() => handlePreviewImage(image.imageUrl)}
        >
          <img
            src={image.imageUrl}
            alt={`Product image`}
            className={style.AI_galleryImage}
          />

          {/* Delete Button */}
          <button
            type="button"
            className={style.AI_removeBtn}
            onClick={(e) => {
              e.stopPropagation() // prevent triggering handlePreviewImage
              handleDelete(image.id)
            }}
          >
            <DeleteOutlineRoundedIcon />
          </button>
        </Box>
      ))}
  </Box>

  {!galleryLoading && fatchedImages.length === 0 && productImages.length === 0 && (
    <Box className={style.AI_emptyStrip}>
      <ImageOutlinedIcon />
      <Typography>No images yet — add one to start the sheet</Typography>
    </Box>
  )}
</Box>

            </Box>
          </Box>

          {/* Right side */}
          <Box className={style.AI_rightSection}>
            <Box className={style.AI_previewBox}>
              <Box className={style.AI_boxHeader}>
                <Box>
                  <Typography className={style.AI_sectionTitle}>Viewfinder</Typography>
                  <Typography className={style.AI_sectionSubTitle}>
                    Selected product image
                  </Typography>
                </Box>
                <Box className={style.AI_previewTag}>Live</Box>
              </Box>

              <Box className={style.AI_largePreview}>
                {prevImage ? (
                  <>
                    <img
                      src={prevImage}
                      alt="Selected product"
                      className={style.AI_largePreviewImage}
                    />
                  </>
                ) : (
                  <Box className={style.AI_emptyPreview}>
                    <ImageOutlinedIcon />
                    <Typography>Select an image to preview</Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions className={style.RP_dialogActions}>
        <Button
          className={style.RP_dialogCloseBtn}
          disabled={!selectedFile || loading}
          onClick={handleSubmit}
        >
          {loading ? 'Uploading…' : 'Add image'}
        </Button>
      </DialogActions>

      {notification && (
        <Notification
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          onClose={() => {
            setNotification((prev) => (prev ? { ...prev, open: false } : prev))
          }}
        />
      )}
    </Dialog>
  )
}

export default AddImagePopup
