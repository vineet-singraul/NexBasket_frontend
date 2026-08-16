import { useState } from 'react'
import { Box } from '@mui/material'

import AddCategoryLeftPannal from '../components/Category/AddCategoryLeftPannal'
import styles from '../../../styles/ownerStyle/AddCategury.module.css'

const AddCategury = () => {
  const [subOwnerId] = useState<string>(() => {
    const auth = localStorage.getItem('nexbasket_auth')
    return auth ? JSON.parse(auth)?.user?._id || '' : ''
  })

  return (
    <Box className={styles.AC_mainWrapper}>
      <AddCategoryLeftPannal subOwnerId={subOwnerId} />
    </Box>
  )
}

export default AddCategury
