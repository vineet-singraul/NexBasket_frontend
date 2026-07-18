import React, { useState } from 'react'
import {Box} from "@mui/material"
import AddStore from '../components/Store/AddStore'
import styles from "../../../styles/ownerStyle/AddCategury.module.css"
import ShowStore from '../components/Store/ShowStore'


const Stores = () => {
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <Box className={styles.AC_mainWrapper}>
      <AddStore onCreated={() => setRefreshKey((key) => key + 1)} />
      <ShowStore refreshKey={refreshKey} />
    </Box>
  )
}

export default Stores