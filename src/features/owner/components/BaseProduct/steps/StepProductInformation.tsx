import { Box, Typography, TextField, CircularProgress } from '@mui/material'
import style from '../../../../../styles/ownerStyle/AddBaseProduct.module.css'
import type { StepProductInformationProps } from '../../../types/product.types'
import type React from 'react'
import AiGenerateButton from '../../../../../components/common/AiGenerateButton'
import GrockAi from '../../../../../components/common/GrockAi'
import { apiPost } from '../../../../../api/userApi'
import { AI_MODEL } from '../../../../../api/endpoints'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { useState } from 'react'

const StepProductInformation = ({
  data,
  setFormsData,
  productName,
}: StepProductInformationProps) => {
  const [loading, setLoading] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target
    setFormsData((prev) => ({ ...prev, [name]: value }))
  }

  const AutoGeenrateBrandsDetails = async (title: string) => {
    try {
      setLoading(true)
      const response = await apiPost<{ message: string }>(AI_MODEL.AUTO_BRAND_DETECTION, {
        title: title.trim(),
      })

      const raw = response.message as unknown
      const text = Array.isArray(raw)
        ? raw.map((part: { text?: string }) => part.text ?? '').join('')
        : String(raw ?? '')
      const result: unknown = JSON.parse(text.replace(/```(?:json)?/gi, '').trim())
      console.log('AI brand result:', result)

      // AI key names vary ("Brand Name", "brand_name", "brandName", "[0] Brand Name"...),
      // so compare keys as lowercase letters only. An array comes back in prompt order.
      const values: Record<string, unknown> = {}
      if (Array.isArray(result)) {
        ;['brandname', 'manufacturername', 'modelname', 'modelnumber', 'manufacturerpartnumber'].forEach(
          (key, index) => (values[key] = result[index])
        )
      } else if (result && typeof result === 'object') {
        Object.entries(result).forEach(([key, value]) => {
          values[key.replace(/^\[\d+\]/, '').toLowerCase().replace(/[^a-z]/g, '')] = value
        })
      }
      const pick = (...keys: string[]) => {
        for (const key of keys) {
          const value = values[key]
          if (value !== null && value !== undefined && String(value).trim()) return String(value)
        }
        return undefined
      }

      const brand = pick('brandname', 'brand')
      setFormsData((prev) => ({
        ...prev,
        brand: brand ?? prev.brand,
        manufacturer: pick('manufacturername', 'manufacturer') ?? brand ?? prev.manufacturer,
        modelName: pick('modelname', 'model') ?? prev.modelName,
        modelNumber: pick('modelnumber', 'modelno') ?? prev.modelNumber,
        manufacturerPartNumber:
          pick('manufacturerpartnumber', 'partnumber', 'mpn') ?? prev.manufacturerPartNumber,
      }))
    } catch (error) {
      alert(`${error instanceof Error ? error.message : 'Something went wrong'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box className={style.ABP_StepPanel}>
      <Box className={style.ABP_Section}>
        <Box className={style.ABP_SectionHead}>
          <Typography className={style.ABP_SectionTitle}>Description</Typography>
        </Box>
        <Box className={style.ABP_Grid}>
          <Box className={`${style.ABP_Field} ${style.ABP_FieldFull}`}>
            <Typography className={style.ABP_FieldLabel}>Full Description</Typography>
            <Box className={style.ABP_TextAreaWrap}>
              <TextField
                className={style.ABP_Input}
                size="small"
                multiline
                fullWidth
                minRows={3}
                placeholder="Detailed product description shown on the product page"
                name="description"
                onChange={handleChange}
                value={data.description}
              />
              <Box className={style.ABP_TextAreaAiBtn}>
                <AiGenerateButton
                  defaultProductName={productName}
                  onGenerated={(text) =>
                    setFormsData((prev) => ({
                      ...prev,
                      description: text,
                    }))
                  }
                />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className={style.ABP_Grid3}>
          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Highlights</Typography>
            <Box className={style.ABP_TextAreaWrap}>
              <TextField
                className={style.ABP_Input}
                size="small"
                multiline
                fullWidth
                minRows={1}
                placeholder="One highlight per line"
                name="highlights"
                onChange={handleChange}
                value={data.highlights}
              />
              <Box className={style.ABP_TextAreaAiBtn}>
                <GrockAi
                  kind="highlights"
                  productName={productName}
                  onGenerated={(text) =>
                    setFormsData((prev) => ({
                      ...prev,
                      highlights: text as unknown as string[],
                    }))
                  }
                />
              </Box>
            </Box>
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Features</Typography>
            <Box className={style.ABP_TextAreaWrap}>
              <TextField
                className={style.ABP_Input}
                size="small"
                multiline
                fullWidth
                minRows={1}
                placeholder="One feature per line"
                name="features"
                onChange={handleChange}
                value={data.features}
              />
              <Box className={style.ABP_TextAreaAiBtn}>
                <GrockAi
                  kind="features"
                  productName={productName}
                  onGenerated={(text) =>
                    setFormsData((prev) => ({
                      ...prev,
                      features: text as unknown as string[],
                    }))
                  }
                />
              </Box>
            </Box>
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>What&apos;s Included</Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              multiline
              minRows={1}
              placeholder="One item per line, e.g. 1x Charging Cable"
              name="whatsIncluded"
              onChange={handleChange}
              value={data.whatsIncluded}
            />
          </Box>
        </Box>
      </Box>

      <Box className={style.ABP_Section}>
        <Box className={style.ABP_SectionHead}>
          <Typography className={style.ABP_SectionTitle}>Brand</Typography>
          <Box className={style.ABP_TextAreaAiBtn}>
            {loading ? (
              <CircularProgress size={17} sx={{ color: '#f05a359c' }} />
            ) : (
              <AutoAwesomeIcon
                className={style.ABP_BrandAiIcon}
                onClick={() => AutoGeenrateBrandsDetails(productName ?? '')}
              />
            )}
          </Box>
        </Box>
        <Box className={style.ABP_Grid4}>
          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Brand</Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              placeholder="e.g. NexFresh"
              name="brand"
              onChange={handleChange}
              value={data.brand}
            />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Manufacturer</Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              placeholder="Fresh Farms Pvt. Ltd."
              name="manufacturer"
              onChange={handleChange}
              value={data.manufacturer}
            />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Model Name</Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              placeholder="e.g. Premium Select"
              name="modelName"
              onChange={handleChange}
              value={data.modelName}
            />
          </Box>

          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Model Number</Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              placeholder="e.g. NF-2024"
              name="modelNumber"
              onChange={handleChange}
              value={data.modelNumber}
            />
          </Box>
        </Box>

        <Box className={style.ABP_Grid}>
          <Box className={style.ABP_Field}>
            <Typography className={style.ABP_FieldLabel}>Manufacturer Part Number</Typography>
            <TextField
              className={style.ABP_Input}
              size="small"
              placeholder="e.g. MPN-5521"
              name="manufacturerPartNumber"
              onChange={handleChange}
              value={data.manufacturerPartNumber}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default StepProductInformation
