import { useState } from 'react'
import { Box } from '@mui/material'
import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined'
import styles from '../../../../styles/userStyle/ShowSingleProduct.module.css'
import type { Image } from '../../types/common.types.ts'
import { PRODUCT_DETAILS_TEXT } from '../../utils/context.ts'

interface ImagesProps {
  images: Image[]
  title: string
  discountPercent?: number
}

const Images = ({ images, title, discountPercent = 0 }: ImagesProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const activeImage =
    images.find((img) => img._id === selectedId) ?? images.find((img) => img.isPrimary) ?? images[0]

  return (
    <Box className={styles.gallery}>
      {images.length > 1 && (
        <Box className={styles.thumbList}>
          {images.map((img) => (
            <Box
              key={img._id}
              component="button"
              type="button"
              aria-label={img.altText || title}
              className={`${styles.thumb} ${img._id === activeImage?._id ? styles.thumbActive : ''}`}
              onClick={() => setSelectedId(img._id)}
            >
              <Box component="img" src={img.imageUrl} alt={img.altText || title} />
            </Box>
          ))}
        </Box>
      )}

      <Box className={styles.mainImageArea}>
        {discountPercent > 0 && (
          <Box component="span" className={styles.discountBadge}>
            -{discountPercent}%
          </Box>
        )}
        {activeImage ? (
          <Box
            component="img"
            src={activeImage.imageUrl}
            alt={activeImage.altText || title}
            className={styles.mainImage}
          />
        ) : (
          <Box className={styles.noImage}>
            <ImageNotSupportedOutlinedIcon />
            <Box>{PRODUCT_DETAILS_TEXT.noImage}</Box>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default Images
