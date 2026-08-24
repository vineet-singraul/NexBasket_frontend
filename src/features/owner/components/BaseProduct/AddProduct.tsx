import { useState } from 'react'
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

const PHASES = [
  { label: 'Basic Details', icon: <Inventory2RoundedIcon /> },
  { label: 'Product Information', icon: <ArticleRoundedIcon /> },
  { label: 'Compliance & Warranty', icon: <VerifiedUserRoundedIcon /> },
  { label: 'Variant', icon: <StyleRoundedIcon /> },
  { label: 'Specifications', icon: <FactCheckRoundedIcon /> },
  { label: 'Pricing & Inventory', icon: <WarehouseRoundedIcon /> },
  { label: 'SEO & Product Management', icon: <ManageSearchRoundedIcon /> },
]

/**
 * AddProduct — 7-phase Base Product stepper (design only).
 * Phase order: Basic Details -> Product Information -> Compliance & Warranty ->
 * Variant -> Specifications -> Pricing & Inventory -> SEO & Product Management.
 * activeStep only drives which phase is shown; no field state/validation is wired.
 */
const AddProduct = () => {
  const [activeStep, setActiveStep] = useState(0)

  const isFirstStep = activeStep === 0
  const isLastStep = activeStep === PHASES.length - 1

  const goBack = () => setActiveStep((step) => Math.max(0, step - 1))
  const goNext = () => setActiveStep((step) => Math.min(PHASES.length - 1, step + 1))

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <StepBasicDetails />
      case 1:
        return <StepProductInformation />
      case 2:
        return <StepComplianceWarranty />
      case 3:
        return <StepVariant />
      case 4:
        return <StepSpecifications />
      case 5:
        return <StepPricingInventory />
      case 6:
        return <StepSeoManagement />
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
              Basic Details, Product Information, Compliance &amp; Warranty, Variant, Specifications,
              Pricing &amp; Inventory, SEO &amp; Product Management
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
            <Button className={style.ABP_BtnPrimary}>Submit Product</Button>
          ) : (
            <Button className={style.ABP_BtnPrimary} endIcon={<ArrowForwardRoundedIcon />} onClick={goNext}>
              Next
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default AddProduct
