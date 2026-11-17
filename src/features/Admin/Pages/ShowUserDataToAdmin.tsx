import UserlistPage from '../Componets/User Comp for Admin/UserlistPage'
import React, { useEffect, useState } from 'react'
import type { GetAllUsersResponse, Pagination, User } from '../types/users.types.ts'
import { type NotificationInterfacce } from '../../../auth/types/auth.types.ts'
import { ADMIN_API } from '../../../api/endpoints.ts'
import { apiGet } from '../../../api/userApi.ts'

const ShowUserDataToAdmin = () => {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState<boolean | false>(false)
  const [notification, setNotification] = useState<NotificationInterfacce | null>(null)
  const [pagination, setPagination] = useState<Pagination>()
  const [page, setPage] = useState<number>(1)

  useEffect(() => {
    const FEATCH_ALL_USER_LIST = async () => {
      try {
        const response = await apiGet<{ users: User[]; pagination: Pagination }>(
          `${ADMIN_API.LIST_OF_ALL_USER_FOR_ADMIN}?page=${page}$limit=10`,
        )
        setUsers(response.users)
        setPagination(response.pagination)
      } catch (error) {
        setNotification({
          open: true,
          message: error instanceof Error ? error.message : 'some thing went wrong',
          severity: 'error',
        })
      }
    }

    FEATCH_ALL_USER_LIST()
  }, [page])

  return (
    <div>
      <UserlistPage users={users} page={page} pagination={pagination ?? null} setPage={setPage} />
    </div>
  )
}

export default ShowUserDataToAdmin
