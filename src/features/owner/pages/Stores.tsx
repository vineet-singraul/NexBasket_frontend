import React from 'react'
import {Box} from "@mui/material"
import AddStore from '../components/Store/AddStore'
import styles from "../../../styles/ownerStyle/AddCategury.module.css"
import ShowStore from '../components/Store/ShowStore'


const Stores = () => {
  return (
    <Box className={styles.AC_mainWrapper}>
      <AddStore/>
      <ShowStore/>
    </Box>
  )
}

export default Stores