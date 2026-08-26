import { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { Box, Typography, Button } from '@mui/material'
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded'
import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded'
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded'
import StyleRoundedIcon from '@mui/icons-material/StyleRounded'
import FactCheckRoundedIcon from '@mui/icons-material/FactCheckRounded'
import WarehouseRoundedIcon from '@mui/icons-material/WarehouseRounded'
import ManageSearchRoundedIcon from '@mui/icons-material/ManageSearchRounded'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import style from '../../../../styles/ownerStyle/AddBaseProduct.module.css'
import StepBasicDetails from './steps/StepBasicDetails'
import StepProductInformation from './steps/StepProductInformation'
import StepComplianceWarranty from './steps/StepComplianceWarranty'
import StepVariant from './steps/StepVariant'
import StepSpecifications from './steps/StepSpecifications'
import StepPricingInventory from './steps/StepPricingInventory'
import StepSeoManagement from './steps/StepSeoManagement'
import type {
  BaseProductInterFace,
  ProductInformationInterface,
  ProductCompilanceWarrenty,
  ProductVarientInterface,
  ProductSpecificationInterface,
  ProductPricingInventoryInterface,
  ProductSeoManagementInterface,
} from '../../types/product.types'
import type {NotificationInterfacce} from "../../../../auth/types/auth.types"
import { apiPost } from '../../../../api/userApi'
import { BASE_PRODUCT } from '../../../../api/endpoints'
import Loader from '../../../../utils/Loader'
import Notification from '../../../../utils/Notification'

const PHASES = [
  { label: 'Basic Details', icon: <Inventory2RoundedIcon /> },
  { label: 'Product Information', icon: <ArticleRoundedIcon /> },
  { label: 'Compliance & Warranty', icon: <VerifiedUserRoundedIcon /> },
  { label: 'Variant', icon: <StyleRoundedIcon /> },
  { label: 'Specifications', icon: <FactCheckRoundedIcon /> },
  { label: 'Pricing & Inventory', icon: <WarehouseRoundedIcon /> },
  { label: 'SEO & Product Management', icon: <ManageSearchRoundedIcon /> },
]

const AddProduct = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [basicDetails, setBasicDetails] = useState<BaseProductInterFace>({} as BaseProductInterFace)

  const [productInformation, setProductInformation] = useState<ProductInformationInterface>({} as ProductInformationInterface)

  const [complianceWarranty, setComplianceWarranty] = useState<ProductCompilanceWarrenty>({} as ProductCompilanceWarrenty)

  const [productVarient, setProductVarient] = useState<ProductVarientInterface>({} as ProductVarientInterface)

  const [productSpecification, setProductSpecification] = useState<ProductSpecificationInterface>(
    {} as ProductSpecificationInterface,
  )

  const [productPricingInventory, setProductPricingInventory] = useState<ProductPricingInventoryInterface>(
    {} as ProductPricingInventoryInterface,
  )

  const [productSeoManagement, setProductSeoManagement] = useState<ProductSeoManagementInterface>(
    {} as ProductSeoManagementInterface,
  )

  const [notification, setNofication] = useState<NotificationInterfacce | null>(null)
  const [loading, setLoading] = useState<boolean | null>(null)
  const isFirstStep = activeStep === 0
  const isLastStep = activeStep === PHASES.length - 1

  const goBack = () => setActiveStep((step) => Math.max(0, step - 1))
  const goNext = () => setActiveStep((step) => Math.min(PHASES.length - 1, step + 1))

  const resetForm = () => {
    setBasicDetails({} as BaseProductInterFace)
    setProductInformation({} as ProductInformationInterface)
    setComplianceWarranty({} as ProductCompilanceWarrenty)
    setProductVarient({} as ProductVarientInterface)
    setProductSpecification({} as ProductSpecificationInterface)
    setProductPricingInventory({} as ProductPricingInventoryInterface)
    setProductSeoManagement({} as ProductSeoManagementInterface)
    setActiveStep(0)
  }

  const splitToList = (value?: string, separator: RegExp = /\r?\n/) =>
    (value ?? '')
      .split(separator)
      .map((item) => item.trim())
      .filter(Boolean)

  const prepareProductPayload = () => {
    const payload = {
      // Basic Details
      storeId: basicDetails.storeID,
      categoryId: basicDetails.categoryId,
      title: basicDetails.title,
      slug: basicDetails.slug,
      productCode: basicDetails.productCode,
      productType: basicDetails.productType,
      condition: basicDetails.condition,
      shortDescription: basicDetails.shortDiscription,

      // Product Information
      description: productInformation.description,
      highlights: splitToList(productInformation.highlights as unknown as string),
      features: splitToList(productInformation.features as unknown as string),
      whatsIncluded: splitToList(productInformation.whatsIncluded as unknown as string),
      brand: productInformation.brand,
      manufacturer: productInformation.manufacturer,
      modelName: productInformation.modelName,
      modelNumber: productInformation.modelNumber,
      manufacturerPartNumber: productInformation.manufacturerPartNumber,

      // Compliance & Warranty
      importerName: complianceWarranty.importerName,
      packerName: complianceWarranty.packerName,
      countryOfOrigin: complianceWarranty.countryOfOrigin,
      hsnCode: complianceWarranty.hsnCode,
      taxCode: complianceWarranty.taxCode,
      warranty: complianceWarranty.warranty,
      returnPolicy: complianceWarranty.returnPolicy,
      returnDays: complianceWarranty.returnDays,

      // Variant
      sku: productVarient.sku,
      variantName: productVarient.variantName,
      gtin: productVarient.gtin,
      weight: productVarient.weight,
      dimensions: productVarient.dimensions,
      attributes: productVarient.attribute
        ? { [productVarient.attribute.name]: productVarient.attribute.value }
        : undefined,
      isDefault: productVarient.defaltVarient,

      // Specifications
      specifications: productSpecification.specifications,

      // Pricing & Inventory
      mrp: productPricingInventory.mrp,
      sellingPrice: productPricingInventory.sellingPrice,
      costPrice: productPricingInventory.costPrice,
      discountPercent: productPricingInventory.discountPercent,
      taxPercent: productPricingInventory.taxPercent,
      currency: productPricingInventory.currency,
      quantity: productPricingInventory.quantity,
      reservedQuantity: productPricingInventory.reservedQuantity,
      lowStockThreshold: productPricingInventory.lowStockThreshold,
      allowBackorder: productPricingInventory.allowBackorder,
      stockStatus: productPricingInventory.stockStatus,

      // SEO & Product Management
      metaTitle: productSeoManagement.metaTitle,
      metaDescription: productSeoManagement.metaDescription,
      searchKeywords: splitToList(productSeoManagement.searchKeywords, /,/),
      tags: productSeoManagement.tags,
      status: productSeoManagement.status,
      visibility: productSeoManagement.visibility,
      isFeatured: productSeoManagement.isFeatured,
      isActive: productSeoManagement.isActive,
    }

    return payload
  }

  const handleSubmitProduct = async () => {
    const payload = prepareProductPayload()

    if (!payload.title) {
      setNofication({
        open: true,
        message: 'please fill the all details of product',
        severity:"warning",
      })
      return
    }

    setLoading(true)

    try {
      const response = await apiPost<{message? : string}>(BASE_PRODUCT.ADD_BASE_PRODUCT, payload)
      setLoading(true)
      setNofication({
        open:true,
        message:response.message || "added product sucessfully",
        severity:"success"
      })
      resetForm()
    } catch (error) {
      setNofication({
        open: true,
        message: error instanceof Error ? error.message : 'some thing went wrong',
        severity: 'error',
      })
    } finally {
      setLoading(false)
    }
  }

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <StepBasicDetails
            data={basicDetails as BaseProductInterFace}
            setFormsData={setBasicDetails}
          />
        )
      case 1:
        return (
          <StepProductInformation 
            data={productInformation as ProductInformationInterface}
            setFormsData={setProductInformation}
          />
        )
      case 2:
        return (
          <StepComplianceWarranty
            data={complianceWarranty}
            setFormData={setComplianceWarranty}
          />
        )
      case 3:
        return (
          <StepVariant 
           data={productVarient as ProductVarientInterface}
           setFormData={
             setProductVarient as unknown as Dispatch<SetStateAction<ProductCompilanceWarrenty>>
           }
          />
        )
      case 4:
        return (
          <StepSpecifications
            data={productSpecification}
            setFormData={setProductSpecification}
          />
        )
      case 5:
        return (
          <StepPricingInventory
            data={productPricingInventory}
            setFormData={setProductPricingInventory}
          />
        )
      case 6:
        return (
          <StepSeoManagement
            data={productSeoManagement}
            setFormData={setProductSeoManagement}
          />
        )
      default:
        return null
    }
  }

  return (
    <Box className={style.ABP_Wrapper}>
      <Box className={style.ABP_Header}>
        <Box className={style.ABP_HeaderRow}>
          <Box className={style.ABP_IconBox}>
            <Inventory2RoundedIcon />
          </Box>
          <Box className={style.ABP_HeaderText}>
            <Typography className={style.ABP_Title}>Add Product</Typography>
            <Typography className={style.ABP_Subtitle}>
              Basic Details, Product Information, Compliance &amp; Warranty, Variant,
              Specifications, Pricing &amp; Inventory, SEO &amp; Product Management
            </Typography>
          </Box>
        </Box>

        <Box className={style.ABP_StepperBar}>
          {PHASES.map((phase, index) => {
            const isActive = index === activeStep
            const isCompleted = index < activeStep

            return (
              <Box
                key={phase.label}
                component="button"
                type="button"
                onClick={() => setActiveStep(index)}
                className={`${style.ABP_Step} ${isActive ? style.ABP_Step_Active : ''} ${
                  isCompleted ? style.ABP_Step_Completed : ''
                }`}
              >
                <Box className={style.ABP_StepTrack}>
                  <Box
                    className={`${style.ABP_StepConnector} ${
                      index !== 0 && index <= activeStep ? style.ABP_StepConnector_Done : ''
                    }`}
                    style={{ visibility: index === 0 ? 'hidden' : 'visible' }}
                  />
                  <Box className={style.ABP_StepCircle}>
                    {isCompleted ? <CheckRoundedIcon fontSize="small" /> : phase.icon}
                  </Box>
                  <Box
                    className={`${style.ABP_StepConnector} ${
                      index < activeStep ? style.ABP_StepConnector_Done : ''
                    }`}
                    style={{ visibility: index === PHASES.length - 1 ? 'hidden' : 'visible' }}
                  />
                </Box>
                <Typography className={style.ABP_StepLabel}>{phase.label}</Typography>
              </Box>
            )
          })}
        </Box>
      </Box>

      <Box className={style.ABP_Body}>{renderStep()}</Box>

      <Box className={style.ABP_Footer}>
        <Typography className={style.ABP_FooterProgress}>
          Step <b>{activeStep + 1}</b> of {PHASES.length} — {PHASES[activeStep].label}
        </Typography>

        <Box className={style.ABP_FooterActions}>
          <Button
            className={style.ABP_BtnGhost}
            startIcon={<ArrowBackRoundedIcon />}
            onClick={goBack}
            disabled={isFirstStep}
          >
            Back
          </Button>

          {isLastStep ? (
            <Button className={style.ABP_BtnPrimary}   onClick={handleSubmitProduct}>Submit Product</Button>
          ) : (
            <Button
              className={style.ABP_BtnPrimary}
              endIcon={<ArrowForwardRoundedIcon />}
              onClick={goNext}
            >
              Next
            </Button>
          )}
        </Box>
      </Box>


   {loading && <Loader/>}
   {notification &&  
    <Notification 
      open={notification.open}
      message={notification.message}
      severity={notification.severity}
      onClose={() => setNofication(null)}
    />
   }


    </Box>
  )
}

export default AddProduct
