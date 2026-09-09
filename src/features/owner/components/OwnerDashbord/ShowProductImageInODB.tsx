import {
  Dialog,
  Typography,
  IconButton,
  Chip,
  TextField,
  Table,
  TableBody,
  TableRow,
  TableCell,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  LinearProgress,
  Button,
} from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import styles from '../../../../styles/ownerStyle/Dashboard.module.css'
import type { ShowAllProductProps } from '../../types/dashboard.types'

// Static design data — this component is a design-only mockup, not wired to live product data.
const staticProductDetails = {

  details: [
    { label: 'Title', value: "Allen Solly Men's Slim Fit Formal Trousers" },
    { label: 'Slug', value: 'allen-solly-mens-slim-fit-formal-trousers-v1' },
    { label: 'Brand', value: 'Allen Solly' },
    { label: 'Variant', value: 'Black / Size 32' },
    { label: 'SKU', value: 'AS-TROUSER-BLACK-32-V1' },
    { label: 'Product code', value: 'AS-TROUSER-001' },
    { label: 'Model', value: 'Slim Fit Formal Trouser · AS-FT-2024' },
    { label: 'Product type', value: 'Simple' },
  ],
  shortDescription: "Men's slim fit poly-viscose formal trousers",
  fullDescription:
    "Elevate your office look with Allen Solly's slim fit formal trousers. Crafted from premium poly-viscose blend fabric, these trousers offer a sharp silhouette with all-day comfort.",
  specifications: [
    { name: 'Material', value: '65% Polyester, 35% Viscose' },
    { name: 'Fit', value: 'Slim Fit' },
    { name: 'Closure', value: 'Hook & Bar with Zip' },
    { name: 'Occasion', value: 'Formal' },
    { name: 'Wash Care', value: 'Dry Clean Only' },
  ],
  features: ['Flat front design', 'Side pockets', 'Back welt pockets', 'Belt loops'],
  highlights: ['Slim Fit', 'Poly-Viscose Blend', 'Wrinkle Resistant', 'Formal Wear'],
  compliance: [
    { label: 'Manufacturer', value: 'Aditya Birla Fashion and Retail Ltd.' },
    { label: 'Importer', value: 'Aditya Birla Fashion and Retail Ltd.' },
    { label: 'Packer', value: 'Aditya Birla Fashion and Retail Ltd.' },
    { label: 'Country of origin', value: 'India' },
    { label: 'HSN code', value: '62034200' },
    { label: 'Tax code', value: 'GST5' },
    { label: 'GTIN', value: '9876543210123' },
    { label: 'Manufacturer part no.', value: 'MPN-AS-FT-2024' },
  ],
  pricing: [
    { label: 'MRP', value: '₹2,999' },
    { label: 'Discount', value: '30%' },
    { label: 'Selling price', value: '₹2,099', emphasis: 'total' },
    { label: 'Cost price', value: '₹1,050' },
    { label: 'Tax', value: '5%' },
    { label: 'Margin / unit', value: '₹1,049', emphasis: 'margin' },
  ],
  inventory: {
    onHand: 14,
    reserved: 0,
    fillPercent: 70,
    thresholdNote: 'Low-stock threshold set at 15 units — this SKU is at the edge of that line.',
    fields: [
      { label: 'Backorder', value: 'Not allowed' },
      { label: 'Stock status', value: 'In stock' },
      { label: 'Weight', value: '450 g' },
      { label: 'Dimensions', value: '110 × 40 × 2 cm' },
    ],
  },
  checklist: [
    { label: 'Product info complete', done: true },
    { label: 'Pricing set', done: true },
    { label: 'Product images uploaded', done: false },
    { label: 'Actual product upload confirmed', done: false },
    { label: 'Marked as featured', done: true },
    { label: 'Default variant set', done: true },
  ],
  keywords: ['allen solly trousers', 'mens formal trousers', 'slim fit trousers', 'office wear'],
  tags: ['clothing', 'men', 'trousers', 'formal'],
  seo: {
    metaTitle: "Buy Allen Solly Men's Slim Fit Formal Trousers Online",
    metaDescription:
      "Shop Allen Solly Men's Slim Fit Formal Trousers at best price. Wrinkle resistant, poly-viscose blend.",
  },
  policy: {
    returnWindow: '7 days',
    returnPolicy: 'Returnable within 15 days if unused and with tags intact.',
  },
  timestamp: 'Created 5 Sep 2026 · Last updated 8 Sep 2026',
}

const chipSx = {
  fontSize: 11.5,
  height: 26,
  color: 'var(--nb-gray)',
  background: 'rgba(255, 255, 255, 0.04)',
  border: '1px solid var(--nb-border)',
}

type FieldProps = {
  label: string
  value: string
  full?: boolean
  multiline?: boolean
}

const Field = ({ label, value, full, multiline }: FieldProps) => (
  <div className={`${styles.spdField} ${full ? styles.spdFieldFull : ''}`}>
    <Typography className={styles.spdFieldLabel}>{label}</Typography>
    <TextField
      className={styles.spdInput}
      size="small"
      fullWidth
      value={value}
      multiline={multiline}
      minRows={multiline ? 3 : undefined}
      slotProps={{ input: { readOnly: true } }}
    />
  </div>
)

interface ProductHeaderDetails {
  stock: number
  reserve: number
  selling_price: number
  mrp: number
  offer: number
  listing_Status: boolean | string
}

interface LISTING_DETAILS {
  title: string
  slug: string
  brand : string
  variant : string
  product_code : string
  model : string
  product_type : string
  short_discription : string
  full_discription : string
}

interface Compilanse_Details {
  manufacturer : string
  importer : string
  packer : string,
  countryOfOrigin : string
  hsn : string
  tax : string
  gtin : string
  manufacturerPartNumber : string
}

interface productPrice {
  costPrice : number
  currency : string
  discount : number
  mrp : string | number
  selling_price : string | number
  taxpercent : number
}

const ShowProductImageInODB = ({ open, onClose, onShowDetails }: ShowAllProductProps) => {
  const {
    attributes,
    dimensions,
    features,
    highlights,
    images,
    inventory,
    pricing,
    searchKeywords,
    specifications,
    tags,
    warranty,
    weight,
    whatsIncluded,
  } = onShowDetails

  const productHeaderDetails: ProductHeaderDetails = {
    stock: inventory?.quantity ?? 0,
    reserve: inventory?.reservedQuantity ?? 0,
    selling_price: pricing?.sellingPrice ?? 0,
    mrp: pricing?.mrp ?? 0,
    offer: pricing?.discountPercent ?? 0,
    listing_Status: onShowDetails.isActive ? 'Active' : 'Inactive',
  }

  const listingDetails : LISTING_DETAILS = {
     title: onShowDetails.title,
     slug:onShowDetails.slug,
     brand: onShowDetails.brand,
     variant : onShowDetails.variantName,
     product_code : onShowDetails.productCode,
     model : onShowDetails.modelName,
     product_type : onShowDetails.productType,
     short_discription : onShowDetails.shortDescription,
     full_discription : onShowDetails.description
  }

  const compilanseDetails : Compilanse_Details = {
    manufacturer: onShowDetails.manufacturer,
    importer: onShowDetails.importerName,
    packer: onShowDetails.packerName,
    countryOfOrigin: onShowDetails.countryOfOrigin,
    hsn: onShowDetails.hsnCode,
    tax: onShowDetails.taxCode,
    gtin: onShowDetails.gtin,
    manufacturerPartNumber : onShowDetails.manufacturerPartNumber
  }

  const productPricing : productPrice = {
    costPrice:pricing.costPrice,
    currency: pricing.currency,
    discount : pricing.discountPercent,
    mrp : pricing.mrp,
    selling_price: pricing.sellingPrice,
    taxpercent: pricing.taxPercent
  }


  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="lg"
      slotProps={{ paper: { className: styles.spdPaper } }}
    >
      {/* Header */}
      <div className={styles.spdHeader}>
        <div className={styles.spdHeaderLeft}>
          <span className={styles.spdDot} />
          <Typography className={styles.spdTitle}>{onShowDetails.title}</Typography>
          <span className={styles.spdProductId}>{onShowDetails._id}</span>
          <span className={styles.spdStatusPill}>{onShowDetails.status}</span>
        </div>

        <div className={styles.spdHeaderActions}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<VisibilityOutlinedIcon fontSize="small" />}
            sx={{
              textTransform: 'none',
              fontSize: 13,
              color: '#fff',
              borderColor: 'var(--nb-border)',
              '&:hover': { borderColor: '#fff' },
            }}
          >
            Preview listing
          </Button>

          <Button
            variant="contained"
            size="small"
            startIcon={<EditOutlinedIcon fontSize="small" />}
            sx={{
              textTransform: 'none',
              fontSize: 13,
              fontWeight: 700,
              background: 'var(--nb-orange)',
              '&:hover': { background: '#f5883f' },
            }}
          >
            Edit product
          </Button>

          <IconButton
            className={styles.spdCloseBtn}
            size="small"
            onClick={onClose}
            aria-label="Close"
          >
            <CloseRoundedIcon fontSize="small" />
          </IconButton>
        </div>
      </div>

      {/* Body */}
      <div className={styles.spdBody}>
        {/* Main column */}
        <div className={styles.spdMain}>
          <div className={styles.spdMetrics}>
            {Object.entries(productHeaderDetails).map(([key, value]) => (
              <div className={styles.spdMetric} key={key}>
                <div className={styles.spdMetricLabel}>{key}</div>
                <div className={`${styles.spdMetricValue}`}>{value}</div>
              </div>
            ))}
          </div>

          <div className={styles.spdCard}>
            <Typography className={styles.spdCardTitle}>
              Media — {onShowDetails.images.length}
            </Typography>
            <div className={styles.spdThumbStrip}>
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`${styles.spdThumbCell} ${index === 0 ? styles.spdThumbCellPrimary : ''}`}
                >
                  <img className={styles.spdThumbImg} src={image.imageUrl} alt={image.altText} />
                  <div className={styles.spdThumbTag}>{image.imageType}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.spdCard}>
            <Typography className={styles.spdCardTitle}>Listing details</Typography>
            <div className={styles.spdFieldGrid}>
              {Object.entries(listingDetails).map(([key,value]) => (
                 <Field key={key} label={key} value={value} />
              ))}
              <Field label="Short description" value={onShowDetails.shortDescription} full />
              <Field
                label="Full description"
                value={onShowDetails.description}
                full
                multiline
              />
            </div>
          </div>

          <div className={styles.spdCard}>
            <Typography className={styles.spdCardTitle}>Specifications</Typography>
            <Table className={styles.spdTable} size="small">
              <TableBody>
                {specifications.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell sx={{ color: 'var(--nb-gray)', width: '38%' }}>
                      {item.name}
                    </TableCell>
                    <TableCell>{item.value}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className={styles.spdCard}>
            <Typography className={styles.spdCardTitle}>Features &amp; highlights</Typography>
            <div className={styles.spdFieldGrid}>
              <div>
                <div className={styles.spdSubLabel}>Features</div>
                <ul className={styles.spdListPlain}>
                  {features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className={styles.spdSubLabel}>Highlights</div>
                <div className={styles.spdChipRow}>
                  {highlights.map((highlight) => (
                    <Chip key={highlight} label={highlight} size="small" sx={chipSx} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.spdCard}>
            <Typography className={styles.spdCardTitle}>Compliance &amp; sourcing</Typography>
            <div className={styles.spdFieldGrid}>
      
                {Object.entries(compilanseDetails).map(([key, value]) => (
                  <Field key={key} label={key} value={value} />
                ))}

            </div>
          </div>
        </div>

        {/* Side column */}
        <div className={styles.spdSide}>
          <div className={styles.spdCard}>
            <Typography className={styles.spdCardTitle}>Pricing breakdown</Typography>
            <Table className={styles.spdTable} size="small">
              <TableBody>

                {Object.entries(productPricing).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell
                      sx={{
                        color: value.emphasis ? '#fff' : 'var(--nb-gray)',
                        fontWeight: value.emphasis ? 700 : 400,
                      }}
                    >
                      {key}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontFamily: 'SFMono-Regular, Consolas, monospace',
                        fontWeight: value.emphasis ? 700 : 400,
                        color: value.emphasis === 'margin' ? 'var(--nb-orange)' : '#fff',
                      }}
                    >
                      {value}
                    </TableCell>
                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </div>

          <div className={styles.spdCard}>
            <Typography className={styles.spdCardTitle}>Inventory</Typography>
            <LinearProgress
              variant="determinate"
              value={onShowDetails.inventory.quantity}
              sx={{
                height: 8,
                borderRadius: 4,
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: 'var(--nb-orange)',
                  borderRadius: 4,
                },
              }}
            />
            <div className={styles.spdStockLegend}>
              <span>
                <b>{onShowDetails.inventory.quantity}</b> on hand
              </span>
              <span>
                <b>{onShowDetails.inventory.reservedQuantity}</b> reserved
              </span>
            </div>
            <div className={styles.spdThresholdNote}>
              {staticProductDetails.inventory.thresholdNote}
            </div>
            <div className={styles.spdFieldGrid} style={{ marginTop: 16 }}>
              <Field
                label="Dimensions"
                value={
                  dimensions
                    ? `${dimensions.length} × ${dimensions.width} × ${dimensions.height} ${dimensions.unit}`
                    : 'N/A'
                }
              />

              <Field
                label="Weight"
                value={
                  weight
                    ? `${weight.value} ${weight.unit}`
                    : 'N/A'
                }
              />
            </div>
          </div>

          <div className={styles.spdCard}>
            <Typography className={styles.spdCardTitle}>Listing checklist</Typography>
            <List className={styles.spdChecklist} dense disablePadding>
              {staticProductDetails.checklist.map((item) => (
                <ListItem key={item.label} disableGutters sx={{ py: 0.4 }}>
                  <ListItemIcon sx={{ minWidth: 28 }}>
                    {item.done ? (
                      <CheckCircleRoundedIcon sx={{ color: 'var(--nb-orange)', fontSize: 18 }} />
                    ) : (
                      <ErrorRoundedIcon sx={{ color: '#e0a439', fontSize: 18 }} />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    slotProps={{ primary: { sx: { color: '#fff', fontSize: 13 } } }}
                  />
                </ListItem>
              ))}
            </List>
          </div>

          <div className={styles.spdCard}>
            <Typography className={styles.spdCardTitle}>Search &amp; discovery</Typography>
            <div className={styles.spdSubLabel}>Keywords</div>
            <div className={styles.spdChipRow} style={{ marginBottom: 14 }}>
              {searchKeywords.map((keyword) => (
                <Chip key={keyword} label={keyword} size="small" sx={chipSx} />
              ))}
            </div>
            <div className={styles.spdSubLabel}>Tags</div>
            <div className={styles.spdChipRow}>
              {tags.map((tag) => (
                <Chip key={tag} label={tag} size="small" sx={chipSx} />
              ))}
            </div>
          </div>

          <div className={styles.spdCard}>
            <Typography className={styles.spdCardTitle}>SEO</Typography>
            <div className={styles.spdFieldGrid} style={{ gridTemplateColumns: '1fr' }}>
              <Field label="Meta title" value={onShowDetails.metaTitle} />
              <Field
                label="Meta description"
                value={onShowDetails.metaDescription}
                multiline
              />
            </div>
          </div>


          <div className={styles.spdCard}>
            <Typography className={styles.spdCardTitle}>Policies</Typography>
            <div className={styles.spdFieldGrid} style={{ gridTemplateColumns: '1fr' }}>
              <Field label="Return window" value={`${onShowDetails.returnDays} Days`}  />
              <Field
                label="Return policy"
                value={onShowDetails.returnPolicy}
                multiline
              />
            </div>
          </div>

          <div className={styles.spdTimestamp}>{onShowDetails.createdAt}</div>
        </div>
      </div>
    </Dialog>
  )
}

export default ShowProductImageInODB
