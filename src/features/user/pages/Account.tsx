import React from 'react'
import Profile from '../common/Account Features/Profile'
import { useEffect, useState } from 'react'

import { getAuthSession } from '../../../utils/authStorage.ts'
import { type NotificationInterfacce } from '../../../auth/types/auth.types.ts'
import { apiGet } from '../../../api/userApi.ts'
import { AUTH_ENDPOINTS, USER_HOME_PAGE_CARDS } from '../../../api/endpoints.ts'
import { type Owner } from '../../owner/types/common.types.ts'
import Notification from '../../../utils/Notification.tsx';
import {type ListedProduct} from "../../owner/types/dashboard.types.ts"

const Account = () => {
  const userId = getAuthSession<{ _id: string }>()?.user?._id
  const [notification, setNotification] = useState<NotificationInterfacce | null>(() =>
    userId
      ? null
      : {
          open: true,
          message: 'Please login to see your profile',
          severity: 'warning',
        },
  )
  const [loading, setLoading] = useState<boolean>(!!userId)
  const [userdata, setUserData] = useState<Owner | null>();
  const [userWishList, setUserWishList] = useState<ListedProduct[]>([]);

  useEffect(() => {
    if (!userId) return
    let ignore = false

    // GET USER PROFILE :
    const FETCH_USER_PROFILE = async () => {
      try {
        const response = await apiGet<{ user: Owner }>(AUTH_ENDPOINTS.ME)
        if (!ignore) setUserData(response.user)
      } catch (error) {
        console.log(`${error instanceof Error ? error.message : 'some thing went wrong'}`)
      }
    }

    // GET WISHLIST OF USER :
    const FETCH_USER_WISHLIST = async () => {
      try {
        const response = await apiGet<{ data: ListedProduct[] }>(USER_HOME_PAGE_CARDS.SHOW_WISHLIST_ITEM(userId))
        if (!ignore) setUserWishList(response.data ?? [])
      } catch (error) {
        if (!ignore) {
          setNotification({
            open: true,
            message: error instanceof Error ? error.message : 'some thing went wrong',
            severity: 'error',
          })
        }
      }
    }

    // Run both together; loading ends only when both are done
    Promise.all([FETCH_USER_PROFILE(), FETCH_USER_WISHLIST()]).finally(() => {
      if (!ignore) setLoading(false)
    })

    return () => {
      ignore = true
    }
  }, [userId])
  return (
    <div>

      <h1>Profile sections </h1>
      <Profile userdata={userdata} userWishList={userWishList}/>
       {notification && 
        <Notification 
           open={notification.open}          
           message={notification.message}
           severity={notification.severity}
           onClose={() => {setNotification(null)}}
        />}

    </div>
  )
}

export default Account
