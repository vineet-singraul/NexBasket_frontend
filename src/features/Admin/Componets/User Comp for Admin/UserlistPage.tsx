// import React, { useState } from 'react'
// import type{ GetAllUsersResponse, UserlistPageProps} from "../../types/users.types.ts";
// import {type NotificationInterfacce} from "../../../../auth/types/auth.types.ts"

// const UserlistPage = ({ users, page, pagination }: UserlistPageProps) => {

//   return (
//     <div>

//     </div>
//   )
// }

// export default UserlistPage;

import {
  Avatar,
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined'
import PhoneIcon from '@mui/icons-material/Phone'
import EmailIcon from '@mui/icons-material/Email'
import type { UserlistPageProps } from '../../types/users.types.ts'
import styles from '../../../../styles/Admin style/Admin.module.css' // path apne folder ke hisaab se badlo
import { Pagination as MuiPagination, Stack } from '@mui/material'

const UserlistPage = ({ users, page, pagination, setPage }: UserlistPageProps) => {
  const limit = pagination?.limit ?? 10

  return (
    <Paper elevation={0} className={styles.card}>
      {/* Header */}
      <Box className={styles.header}>
        <Box>
          <Typography variant="h6" className={styles.title}>
            Registered Users
          </Typography>
        </Box>

        <Chip
          icon={<PeopleAltOutlinedIcon />}
          label={`Total: ${pagination?.totalUsers ?? 0}`}
          color="primary"
          variant="outlined"
        />
      </Box>

      {/* Empty state */}
      {users.length === 0 ? (
        <Box className={styles.emptyBox}>
          <PeopleAltOutlinedIcon sx={{ fontSize: 56, color: 'text.disabled' }} />
          <Typography color="text.secondary">No users found</Typography>
        </Box>
      ) : (
        <TableContainer className={styles.tableContainer}>
          <Table>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user._id} hover className={styles.row}>
                  {/* Serial number */}
                  <TableCell>{(page - 1) * limit + index + 1}</TableCell>

                  {/* Avatar + Name + Email */}
                  <TableCell>
                    <Box className={styles.userCell}>
                      <Avatar className={styles.avatar}>
                        {user.fullName.charAt(0).toUpperCase()}
                      </Avatar>
                      <Box>
                        <Typography>{user.fullName}</Typography>
                        <Box className={styles.iconText}>
                          <EmailIcon sx={{ fontSize: 14 }} />
                          <Typography variant="body2" color="text.secondary">
                            {user.email}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </TableCell>

                  {/* Mobile */}
                  <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                    <Box className={styles.iconText}>
                      <PhoneIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                      {user.mobile}
                    </Box>
                  </TableCell>

                  {/* Role */}
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                    <Chip
                      label={user.role}
                      size="small"
                      color="info"
                      variant="outlined"
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </TableCell>

                  {/* Verified */}
                  <TableCell align="center">
                    <Chip
                      icon={<CheckCircleIcon />}
                      label={user.isVerified ? 'Verified' : 'Pending'}
                      size="small"
                      color={user.isVerified ? 'success' : 'warning'}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {pagination && (
            <Stack>
              <MuiPagination
                count={pagination.totalPages}
                page={page}
                onChange={(_, value) => setPage(value)}
                color="primary"
                shape="rounded"
                showFirstButton
                showLastButton
              />
            </Stack>
          )}
        </TableContainer>
      )}
    </Paper>
  )
}

export default UserlistPage



// dsfjhsd fdsfjhsdf dsfusdfusdf
