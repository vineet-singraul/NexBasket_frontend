import { useEffect, useState } from 'react'
import { Box } from '@mui/material'

import AddCategoryLeftPannal from '../components/Category/AddCategoryLeftPannal'
import AddCategoryRightPannel from '../components/Category/AddCategoryRightPannel'
import { apiGet } from '../../../api/userApi'
import { CATEGORY_ENDPOINTS } from '../../../api/endpoints'
import type { CategoryListItem } from '../types/category.types'
import styles from '../../../styles/ownerStyle/AddCategury.module.css'

const AddCategury = () => {
  const [subOwnerId] = useState<string>(() => {
    const auth = localStorage.getItem('nexbasket_auth')
    return auth ? JSON.parse(auth)?.user?._id || '' : ''
  })

  const [categories, setCategories] = useState<CategoryListItem[]>([])
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(false)

  const fetchCategories = async () => {
    if (!subOwnerId) return
    setCategoriesLoading(true)
    try {
      const response = await apiGet<{ data?: CategoryListItem[] } | CategoryListItem[]>(
        CATEGORY_ENDPOINTS.GETSUBOWNERCATEGORYLIST(subOwnerId),
      )
      const list = Array.isArray(response) ? response : response?.data ?? []
      setCategories(list)
    } catch (err) {
      console.error(err)
    } finally {
      setCategoriesLoading(false)
    }
  }

  useEffect(() => {
    if (!subOwnerId) return
    let mounted = true
    const load = async () => {
      try {
        await fetchCategories()
      } catch (err) {
        if (mounted) console.error(err)
      }
    }
    void load()
    return () => {
      mounted = false
    }
  }, [subOwnerId])

  return (
    <Box className={styles.AC_mainWrapper}>
      <AddCategoryLeftPannal subOwnerId={subOwnerId} onCategoryCreated={fetchCategories} />
      <AddCategoryRightPannel categories={categories} loading={categoriesLoading} />
    </Box>
  )
}

export default AddCategury
