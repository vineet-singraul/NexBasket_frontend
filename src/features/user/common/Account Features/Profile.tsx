import { useState } from 'react'

import { getAuthSession } from '../../../../utils/authStorage.ts'
import Notification from '../../../../utils/Notification.tsx'
import { type NotificationInterfacce } from '../../../../auth/types/auth.types.ts'
import type { AccountProps } from '../../types/common.types.ts'

const Profile = ({ userdata, userWishList }: AccountProps) => {
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

  return (
    <>
      <h1>{userdata?.fullName}</h1>
      {userWishList?.map((item, index) => (
        <h1 key={item._id}>{index + 1}. {item.title}</h1>
      ))}
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

export default Profile
