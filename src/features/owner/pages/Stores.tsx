import React, { useState } from 'react'
import {Box} from "@mui/material"
import AddStore from '../components/Store/AddStore'
import styles from "../../../styles/ownerStyle/AddCategury.module.css"
import ShowStore from '../components/Store/ShowStore'
import { useParams } from "react-router-dom";

const Stores = () => {
  const [refreshKey, setRefreshKey] = useState(0)

  const { id } = useParams<{ id: string }>();

  return (
    <Box className={styles.AC_mainWrapper}>
      <AddStore onCreated={() => setRefreshKey((key) => key + 1)} id={id}/>
      <ShowStore refreshKey={refreshKey} />
    </Box>
  )
}

export default Stores