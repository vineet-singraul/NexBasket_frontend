import React, { useEffect, useState } from 'react'
import type {NotificationInterfacce} from "../../../auth/types/auth.types"
import type {Product} from "../types/common.types"
import { getAuthSession } from '../../../utils/authStorage'


const Cart = () => {

    const [loading, setLoading] = useState<boolean | null>(null)
    const [notification , setNotification] = useState<NotificationInterfacce | null>(null)
    const [product , setProduct] = useState<Product | null>(null)

     const userId = getAuthSession<{ _id: string }>()?.user?._id

    useEffect(() => {
      
     const FATCH_ITM_OF_CART = () => {
       
     }

    }, [userId])

  return (
    <div>
      <h1>Cart Page</h1>
    </div>
  )
}

export default Cart
