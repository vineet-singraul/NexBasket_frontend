/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { USER_CATEGORY_PAGE } from '../../../api/endpoints'
import { apiGet } from '../../../api/userApi.ts'
import CategoryMainPage from '../components/Category/CategoryMainPage'
import type { Category as CategoryModel } from '../types/category.types.ts'
import type { NotificationInterfacce } from '../../../auth/types/auth.types.ts'
import Loader from '../../../utils/Loader.tsx'
import Notification from '../../../utils/Notification.tsx'

const Category = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [notification, setNotification] = useState<NotificationInterfacce | null>(null)
  const [categories, setCategories] = useState<CategoryModel[]>([])
  useEffect(() => {
    const getAllCategories = async () => {
      try {
        setLoading(true)
        const response = await apiGet<{ Category: CategoryModel[] }>(USER_CATEGORY_PAGE.GET_ALL_CATEGORY)
        setCategories(response.Category)
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

    getAllCategories()
  }, [])

  return (
    <>
      <CategoryMainPage categories={categories} />

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
    </>
  )
}

export default Category
