// import { Tabs, Tab, Box, Typography, Button } from '@mui/material'
// import { useState } from 'react'
// import type { ReactNode, ComponentType } from 'react'
// import style from '../../../styles/ownerStyle/SubOwnerDasboardStyle.module.css'
// import AddBoxIcon from '@mui/icons-material/AddBox'
// import Inventory2Icon from '@mui/icons-material/Inventory2'
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong'
// import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
// import InsightsIcon from '@mui/icons-material/Insights'
// import SettingsIcon from '@mui/icons-material/Settings'
// import PersonIcon from '@mui/icons-material/Person'

// interface TabPanelProps {
//   children?: ReactNode
//   value: number
//   index: number
// }

// function TabPanel(props: TabPanelProps) {
//   const { children, value, index } = props

//   return (
//     <div role="tabpanel" hidden={value !== index} className={style.SODR_TabPanel}>
//       {value === index && children}
//     </div>
//   )
// }

// interface TabConfig {
//   label: string
//   Icon: ComponentType<{ className?: string }>
//   title: string
//   desc: string
//   cta: string
// }

// const TABS: TabConfig[] = [
//   {
//     label: 'Add Product',
//     Icon: AddBoxIcon,
//     title: 'Add a New Product',
//     desc: 'Create and publish products to your store catalog in just a few clicks.',
//     cta: 'Add Product',
//   },
//   {
//     label: 'Listed Product',
//     Icon: Inventory2Icon,
//     title: 'No Products Listed Yet',
//     desc: 'Products you add will appear here for customers to browse and buy.',
//     cta: 'View Catalog',
//   },
//   {
//     label: 'Orders',
//     Icon: ReceiptLongIcon,
//     title: 'No Orders Yet',
//     desc: 'Incoming customer orders will show up here in real time as they arrive.',
//     cta: 'Refresh Orders',
//   },
//   {
//     label: 'Customers',
//     Icon: PeopleAltIcon,
//     title: 'No Customers Yet',
//     desc: 'Track customer activity, orders and engagement once your store goes live.',
//     cta: 'View Customers',
//   },
//   {
//     label: 'Reports',
//     Icon: InsightsIcon,
//     title: 'No Reports Available',
//     desc: 'Sales, revenue and performance reports will be generated here.',
//     cta: 'Generate Report',
//   },
//   {
//     label: 'Settings',
//     Icon: SettingsIcon,
//     title: 'Store Settings',
//     desc: 'Manage store preferences, delivery zones and payment configuration.',
//     cta: 'Open Settings',
//   },
//   {
//     label: 'Profile',
//     Icon: PersonIcon,
//     title: 'Owner Profile',
//     desc: 'View and update the sub-owner profile details linked to this store.',
//     cta: 'Edit Profile',
//   },
// ]

// const SubOwnerDashboardRightSide = () => {
//   const [value, setValue] = useState(0)

//   const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
//     setValue(newValue)
//   }

//   return (
//     <Box className={style.SODR_Main_Wrapper}>
//       <Box className={style.SODR_TabsBar}>
//         <Tabs
//           value={value}
//           onChange={handleChange}
//           variant="fullWidth"
//           className={style.SODR_Tabs}
//         >
//           {TABS.map((tab) => (
//             <Tab
//               key={tab.label}
//               label={tab.label}
//               icon={<tab.Icon className={style.SODR_TabIcon} />}
//               iconPosition="start"
//               className={style.SODR_Tab}
//             />
//           ))}
//         </Tabs>
//       </Box>

//       <Box className={style.SODR_Content}>
//         {TABS.map((tab, index) => (
//           <TabPanel key={tab.label} value={value} index={index}>
//             <Box className={style.SODR_EmptyState}>
//               <Box className={style.SODR_EmptyIconWrap}>
//                 <tab.Icon className={style.SODR_EmptyIcon} />
//               </Box>
//               <Typography className={style.SODR_EmptyTitle}>{tab.title}</Typography>
//               <Typography className={style.SODR_EmptyDesc}>{tab.desc}</Typography>
//               <Button className={style.SODR_EmptyBtn}>{tab.cta}</Button>
//             </Box>
//           </TabPanel>
//         ))}
//       </Box>
//     </Box>
//   )
// }

// export default SubOwnerDashboardRightSide






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
import PersonIcon from '@mui/icons-material/Person'

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
           Add Products
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