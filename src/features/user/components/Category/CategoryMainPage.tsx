import { useEffect, useState } from 'react'
import CategoryHeader from './CategoryHeader'
import ParentCategory from './ParentCategory'
import SubCategory from './SubCategory'
import styles from '../../../../styles/userStyle/Category.module.css'
import { type Category, type MainCategoryProps } from "../../types/category.types.ts"
import { apiGet } from '../../../../api/userApi.ts'
import { USER_CATEGORY_PAGE } from '../../../../api/endpoints.ts'
import type { NotificationInterfacce } from '../../../../auth/types/auth.types.ts'
import Loader from '../../../../utils/Loader.tsx'
import Notification from '../../../../utils/Notification.tsx'

const ALL_CATEGORY_ID = 'all'

const CategoryMainPage = ({ categories } : MainCategoryProps) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState(ALL_CATEGORY_ID)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(false)
  const [notification, setNotification] = useState<NotificationInterfacce | null>(null)

  useEffect(() => {
    const loadSingleCategory = async () => {
      if (selectedCategoryId === ALL_CATEGORY_ID) {
        setSelectedCategory(null)
        return
      }

      try {
        setLoading(true)
        const response = await apiGet<{ data: Category }>(
          USER_CATEGORY_PAGE.GET_SINGLE_CATEGORY(selectedCategoryId)
        )
        setSelectedCategory(response.data ?? null)
      } catch (error) {
        setNotification({
          open: true,
          message: error instanceof Error ? error.message : 'Something went wrong',
          severity: 'error',
        })
      } finally {
        setLoading(false)
      }
    }

    loadSingleCategory()
  }, [selectedCategoryId])

  return (
    <div className={styles.page}>
      <CategoryHeader />
      <div className={styles.body}>
        <aside className={styles.parentCategory}>
          <ParentCategory categories={categories} onCategoryChange={setSelectedCategoryId} />
        </aside>
        <main className={styles.subCategory}>
          <SubCategory categoryId={selectedCategoryId} category={selectedCategory} />
        </main>
      </div>

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
    </div>
  )
}

export default CategoryMainPage
