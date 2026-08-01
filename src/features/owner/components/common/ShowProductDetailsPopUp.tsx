import {
  Box,
  Typography,
  Chip,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded'
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded'
import QrCode2RoundedIcon from '@mui/icons-material/QrCode2Rounded'
import ScaleOutlinedIcon from '@mui/icons-material/ScaleOutlined'
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined'
import StraightenOutlinedIcon from '@mui/icons-material/StraightenOutlined'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import CachedRoundedIcon from '@mui/icons-material/CachedRounded'
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined'
import SellOutlinedIcon from '@mui/icons-material/SellOutlined'
import style from '../../../../styles/ownerStyle/AddProducts.module.css'
import type { Product } from '../../types/product.types'

interface ShowProductDetailsPopUpProps {
  open: boolean
  handleClose: () => void
  product: Product | null
  categoryName?: string
}

const ShowProductDetailsPopUp = ({
  open,
  handleClose,
  product,
  categoryName,
}: ShowProductDetailsPopUpProps) => {
  return (
    <Dialog
      onClose={handleClose}
      open={open}
      aria-labelledby="product-details-title"
      classes={{ paper: style.RP_dialogPaper }}
    >
      <DialogTitle
        id="product-details-title"
        className={style.RP_dialogHeader}
        component="div"
      >
        <Box className={style.RP_dialogIcon}>
          <Inventory2RoundedIcon />
        </Box>
        <Box className={style.RP_dialogHeadingWrap}>
          <Typography className={style.RP_dialogTitle}>
            {product?.name ?? 'Product Details'}
          </Typography>
          {product?.brand && (
            <Typography className={style.RP_dialogSubtitle}>{product.brand}</Typography>
          )}
        </Box>
      </DialogTitle>

      <IconButton
        aria-label="close"
        onClick={handleClose}
        className={style.RP_dialogClose}
        size="small"
      >
        <CloseIcon fontSize="small" />
      </IconButton>

      {product && (
        <DialogContent className={style.RP_dialogContent}>
          <Box className={style.RP_priceRow}>
            <Typography className={style.RP_price}>₹{product.price}</Typography>
            <Typography className={style.RP_mrp}>₹{product.mrp}</Typography>
            <Chip
              label={`${product.discountPercent}% OFF`}
              className={style.RP_discountChip}
            />
          </Box>

          <Box className={style.RP_dialogGrid}>
            <Box className={style.RP_dialogPill}>
              <Typography className={style.RP_dialogPillLabel}>
                <CategoryRoundedIcon /> Category
              </Typography>
              <Typography className={style.RP_dialogPillValue}>
                {categoryName || product.category}
              </Typography>
            </Box>
            <Box className={style.RP_dialogPill}>
              <Typography className={style.RP_dialogPillLabel}>
                <QrCode2RoundedIcon /> SKU
              </Typography>
              <Typography className={style.RP_dialogPillValue}>{product.sku}</Typography>
            </Box>
            <Box className={style.RP_dialogPill}>
              <Typography className={style.RP_dialogPillLabel}>
                <Inventory2RoundedIcon /> Stock
              </Typography>
              <Typography className={style.RP_dialogPillValue}>{product.stock}</Typography>
            </Box>
            <Box className={style.RP_dialogPill}>
              <Typography className={style.RP_dialogPillLabel}>
                <ScaleOutlinedIcon /> Weight
              </Typography>
              <Typography className={style.RP_dialogPillValue}>{product.weight}</Typography>
            </Box>
            <Box className={style.RP_dialogPill}>
              <Typography className={style.RP_dialogPillLabel}>
                <VerifiedUserOutlinedIcon /> Warranty
              </Typography>
              <Typography className={style.RP_dialogPillValue}>
                {product.warrantyPeriod}
              </Typography>
            </Box>
            <Box className={style.RP_dialogPill}>
              <Typography className={style.RP_dialogPillLabel}>
                <StraightenOutlinedIcon /> Dimensions
              </Typography>
              <Typography className={style.RP_dialogPillValue}>
                {product.dimensions?.length} × {product.dimensions?.width} ×{' '}
                {product.dimensions?.height} cm
              </Typography>
            </Box>
            <Box className={style.RP_dialogPill}>
              <Typography className={style.RP_dialogPillLabel}>
                <StarRoundedIcon /> Rating
              </Typography>
              <Typography className={style.RP_dialogPillValue}>
                {product.ratings?.average ?? 0} ★ ({product.ratings?.count ?? 0})
              </Typography>
            </Box>
            <Box className={style.RP_dialogPill}>
              <Typography className={style.RP_dialogPillLabel}>
                <CachedRoundedIcon /> Returnable
              </Typography>
              <Typography
                className={`${style.RP_dialogPillValue} ${
                  product.returnable ? style.RP_dialogPillValuePositive : style.RP_dialogPillValueNegative
                }`}
              >
                {product.returnable ? 'Yes' : 'No'}
              </Typography>
            </Box>
            <Box className={style.RP_dialogPill}>
              <Typography className={style.RP_dialogPillLabel}>
                <ToggleOnOutlinedIcon /> Status
              </Typography>
              <Typography
                className={`${style.RP_dialogPillValue} ${
                  product.isActive ? style.RP_dialogPillValuePositive : style.RP_dialogPillValueNegative
                }`}
              >
                {product.isActive ? 'Active' : 'Inactive'}
              </Typography>
            </Box>
            {product.tags && product.tags.length > 0 && (
              <Box className={`${style.RP_dialogPill} ${style.RP_dialogPillStacked}`}>
                <Typography className={style.RP_dialogPillLabel}>
                  <SellOutlinedIcon /> Tags
                </Typography>
                <Box className={style.RP_dialogTagsRow}>
                  {product.tags.map((tag) => (
                    <Chip key={tag} label={tag} className={style.RP_dialogTagChip} />
                  ))}
                </Box>
              </Box>
            )}
          </Box>

          {(product.description1 || product.description) && (
            <Box className={style.RP_dialogSection}>
              <Typography className={style.RP_dialogSectionLabel}>About</Typography>
              {product.description1 && (
                <Typography className={style.RP_dialogText}>{product.description1}</Typography>
              )}
              {product.description && (
                <Typography className={style.RP_dialogText}>{product.description}</Typography>
              )}
            </Box>
          )}
        </DialogContent>
      )}

      <DialogActions className={style.RP_dialogActions}>
        <Button onClick={handleClose} className={style.RP_dialogCloseBtn}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ShowProductDetailsPopUp
