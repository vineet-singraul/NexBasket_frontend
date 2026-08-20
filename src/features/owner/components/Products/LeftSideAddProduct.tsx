import { useEffect, useMemo, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import { Box, ButtonBase, InputAdornment, TextField, Typography } from '@mui/material'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import SearchOffRoundedIcon from '@mui/icons-material/SearchOffRounded'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
import DevicesOtherOutlinedIcon from '@mui/icons-material/DevicesOtherOutlined'
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined'
import CheckroomOutlinedIcon from '@mui/icons-material/CheckroomOutlined'
import ChairAltOutlinedIcon from '@mui/icons-material/ChairAltOutlined'
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined'
import SportsSoccerOutlinedIcon from '@mui/icons-material/SportsSoccerOutlined'
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined'
import KitchenOutlinedIcon from '@mui/icons-material/KitchenOutlined'
import style from '../../../../styles/ownerStyle/AddProducts.module.css'
import { useParams } from 'react-router-dom'
import { apiGet } from '../../../../api/userApi'
import { CATEGORY_ENDPOINTS } from '../../../../api/endpoints'
import type { NotificationInterfacce } from '../../../../auth/types/auth.types'
import type { CategoryListItem } from '../../types/category.types'
import Loader from '../../../../utils/Loader'
import Notification from '../../../../utils/Notification'

interface StaticCategory {
  name: string
  description: string
  icon: ReactNode
  image?: string
}

const LeftSideAddProduct = () => {
  const [selected, setSelected] = useState<string | null>(null)
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState<boolean | null>(false)
  const [notification, setNotification] = useState<NotificationInterfacce | null>(null)
  const [categories, setCategorys] = useState<CategoryListItem[]>([])

  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return categories
    const findcategory = categories.filter((category) => category.name.toLowerCase().includes(q))
    return findcategory;
  }, [query])

  const { idStore } = useParams<{ idStore: string }>()

  const fatchCatagoryOfOwner = async () => {
    if (!idStore) return
    setLoading(true)
    try {
      const response = await apiGet<{data : CategoryListItem[]}>(CATEGORY_ENDPOINTS.GET_CATEGORY_BY_OWNER_ID(idStore));

      const categories = Array.isArray(response.data) ? response.data : []
       setLoading(true)
      setCategorys(categories)
    } catch (error) {
      setNotification({
        open: true,
        message: error instanceof Error ? error.message : 'Something went wrong',
        severity: 'error',
      })
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!idStore) return
    let isActive = true
    void Promise.resolve().then(() => fatchCatagoryOfOwner())
    return () => {
      isActive = false
    }
  }, [idStore])

  return (
    <Box className={style.CategoryShowcase}>
      <Box className={style.CategoryShowcase_Header}>
        <Box className={style.CategoryShowcase_HeaderRow}>
          <Box className={style.CategoryShowcase_IconBox}>
            <GridViewRoundedIcon />
          </Box>
          <Box className={style.CategoryShowcase_HeaderText}>
            <Typography className={style.CategoryShowcase_Title}>All Categories</Typography>
            <Typography className={style.CategoryShowcase_Subtitle}>
              Pick a category to add your product under
            </Typography>
          </Box>
          <Box className={style.CategoryShowcase_CountChip}>
            {categories.length}
            <span>/{categories.length}</span>
          </Box>
        </Box>  

        <Box className={style.CategoryShowcase_Toolbar}>
          <TextField
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search categories..."
            size="small"
            className={style.CategoryShowcase_Search}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon className={style.CategoryShowcase_SearchIcon} />
                  </InputAdornment>
                ),
                endAdornment: query && (
                  <InputAdornment position="end">
                    <ButtonBase
                      onClick={() => setQuery('')}
                      className={style.CategoryShowcase_SearchClear}
                      aria-label="Clear search"
                    >
                      <ClearRoundedIcon fontSize="small" />
                    </ButtonBase>
                  </InputAdornment>
                ),
              },
            }}
          />

          {selected && (
            <ButtonBase
              onClick={() => setSelected(null)}
              className={style.CategoryShowcase_SelectedChip}
            >
              <CheckCircleRoundedIcon className={style.CategoryShowcase_SelectedChipIcon} />
              <span>{selected}</span>
              <ClearRoundedIcon className={style.CategoryShowcase_SelectedChipClear} />
            </ButtonBase>
          )}
        </Box>
      </Box>

      {categories.length > 0 ? (
        <Box className={style.CategoryGrid}>
          {filteredCategories.map((category, index) => {
            const isSelected = selected === category.name
            const cardStyle = { '--nb-card-delay': `${index * 35}ms` } as CSSProperties

            return (
              <ButtonBase
                key={category.name}
                onClick={() => setSelected(category.name)}
                className={`${style.CategoryCard} ${isSelected ? style.CategoryCard_Selected : ''}`}
                style={cardStyle}
                focusRipple
              >
                {isSelected && <CheckCircleRoundedIcon className={style.CategoryCard_CheckBadge} />}

                <Box className={style.CategoryCard_Media}>
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className={style.CategoryCard_Image}
                    />
                  ) : (
                    <Box className={style.CategoryCard_IconCircle}></Box>
                  )}
                </Box>

                <Box className={style.CategoryCard_Content}>
                  <Box className={style.CategoryCard_Text}>
                    <Typography className={style.CategoryCard_Name}>{category.name}</Typography>
                    <Typography className={style.CategoryCard_Desc}>
                      {category.description}
                    </Typography>
                  </Box>
                  <Box className={style.CategoryCard_ArrowBtn}>
                    <ArrowForwardRoundedIcon />
                  </Box>
                </Box>
              </ButtonBase>
            )
          })}
          <>
            {loading && <Loader />}
            {notification && (
              <Notification
                open={notification.open}
                message={notification.message}
                severity={notification.severity}
                onClose={() => setNotification(null)}
              />
            )}
          </>
        </Box>
      ) : (
        <Box className={style.CategoryEmpty}>
          <Box className={style.CategoryEmpty_IconWrap}>
            <SearchOffRoundedIcon />
          </Box>
          <Typography className={style.CategoryEmpty_Title}>No categories found</Typography>
          <Typography className={style.CategoryEmpty_Desc}>Try a different search term.</Typography>
        </Box>
      )}
    </Box>
  )
}

export default LeftSideAddProduct
