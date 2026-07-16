import { Tabs, Tab, Box, Typography, Button } from '@mui/material'
import { useState } from 'react'
import type { ReactNode } from 'react'
import style from '../../../styles/ownerStyle/SubOwnerDasboardStyle.module.css'

import AddBoxIcon from '@mui/icons-material/AddBox'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import InsightsIcon from '@mui/icons-material/Insights'
import SettingsIcon from '@mui/icons-material/Settings'
import AddProducts from '../pages/AddCategury'

interface TabPanelProps {
  children?: ReactNode
  value: number
  index: number
}

function TabPanel({ children, value, index }: TabPanelProps) {
  return (
    <div hidden={value !== index} className={style.SODR_TabPanel}>
      {value === index && children}
    </div>
  )
}

const SubOwnerDashboardRightSide = () => {
  const [value, setValue] = useState(0)

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box className={style.SODR_Main_Wrapper}>
      {/* Tabs */}
      <Box className={style.SODR_TabsBar}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          className={style.SODR_Tabs}
        >
          <Tab
            icon={<AddBoxIcon className={style.SODR_TabIcon} />}
            iconPosition="start"
            label="Add Product"
            className={style.SODR_Tab}
          />

          <Tab
            icon={<Inventory2Icon className={style.SODR_TabIcon} />}
            iconPosition="start"
            label="Listed Product"
            className={style.SODR_Tab}
          />

          <Tab
            icon={<ReceiptLongIcon className={style.SODR_TabIcon} />}
            iconPosition="start"
            label="Orders"
            className={style.SODR_Tab}
          />

          <Tab
            icon={<PeopleAltIcon className={style.SODR_TabIcon} />}
            iconPosition="start"
            label="Customers"
            className={style.SODR_Tab}
          />

          <Tab
            icon={<InsightsIcon className={style.SODR_TabIcon} />}
            iconPosition="start"
            label="Reports"
            className={style.SODR_Tab}
          />

          <Tab
            icon={<SettingsIcon className={style.SODR_TabIcon} />}
            iconPosition="start"
            label="Settings"
            className={style.SODR_Tab}
          />
        </Tabs>
      </Box>

      {/* Content */}

      <Box className={style.SODR_Content}>

        <TabPanel value={value} index={0}>
          <AddProducts/>
        </TabPanel>

        <TabPanel value={value} index={1}>
           Listed Products
        </TabPanel>

        <TabPanel value={value} index={2}>
            Orders Yet
        </TabPanel>

        <TabPanel value={value} index={3}>
            Customers Yet
        </TabPanel>

        <TabPanel value={value} index={4}>
            Reports Available
        </TabPanel>

        <TabPanel value={value} index={5}>
            Store Settings
        </TabPanel>

      </Box>
    </Box>
  )
}

export default SubOwnerDashboardRightSide