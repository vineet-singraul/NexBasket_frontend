import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import style from '../../../../styles/ownerStyle/AddProducts.module.css'
import LeftSideAddProduct from './LeftSideAddProduct'
import RightSideShowProduct from './RightSideShowProduct'
import type {Product} from "../../types/product.types"
import type {CategoryListItem} from "../../types/category.types"
import { apiGet } from '../../../../api/userApi'
import { PRODUCT_ENDPOINTS, CATEGORY_ENDPOINTS } from '../../../../api/endpoints'
import type {NotificationInterfacce} from "../../../../auth/types/auth.types"
import Loader from '../../../../utils/Loader'
import Notification from '../../../../utils/Notification'

const AddProducts = () => {

  const [storeId] = useState(() => localStorage.getItem("storeId") ?? "")
  const [ownerId] = useState(() => {
    const auth = localStorage.getItem('nexbasket_auth')
    return auth ? JSON.parse(auth)?.user?._id || '' : ''
  })
  const [products, setProducts] = useState<Product[] | null>(null)
  const [categories, setCategories] = useState<CategoryListItem[]>([])
  const [loading, setLoading] = useState<boolean | null>(null)
  const [notification, setNotification] = useState<NotificationInterfacce | null>(null)

  const fatchOwnserProducts = async () => {
     try {
      setLoading(true)
      const response = (await apiGet(PRODUCT_ENDPOINTS.LIST(storeId))) as { data?: Product[] }
      setProducts(response.data ?? [])
     } catch (error) {
       const errorMessage = error instanceof Error ? error.message : String(error)
       setNotification({
        open:true,
        message:errorMessage,
        severity:"error"
       })
     } finally {
       setLoading(false)
     }
  }

  const fetchCategories = async () => {
    if (!ownerId) return
    try {
      const response = await apiGet<{ data?: CategoryListItem[] } | CategoryListItem[]>(
        CATEGORY_ENDPOINTS.GETSUBOWNERCATEGORYLIST(ownerId),
      )
      const list = Array.isArray(response) ? response : (response?.data ?? [])
      setCategories(list)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    queueMicrotask(() => {
      void fatchOwnserProducts()
      void fetchCategories()
    })
  }, [])

  return (
    <Box className={style.Aad_Product_Wrapper_Top_Parent}>
      <Box className={style.Add_Product_Left_Col}>
        <LeftSideAddProduct />
      </Box>

      <Box className={style.Add_Product_Right_Col}>
        <RightSideShowProduct
          products={products ?? []}
          categories={categories}
          onProductDeleted={(id) =>
            setProducts((prev) => (prev ?? []).filter((product) => product._id !== id))
          }
        />
      </Box>

      {loading && <Loader />}
      {notification && (
        <Notification
          open={notification.open}
          message={notification.message}
          severity={notification.severity}
          onClose={() => setNotification(null)}
        />
      )}
    </Box>
  )

}

export default AddProducts