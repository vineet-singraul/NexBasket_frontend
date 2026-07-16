import React from 'react'
import { Box, Typography, Avatar, Chip } from '@mui/material'
import style from "../../../../styles/ownerStyle/AddCategury.module.css"

const CATEGORY_PLACEHOLDERS = [1, 2, 3, 4, 5, 6]

const AddCategoryRightPannel = () => {
  return (
    <Box className={style.wrap}>
      <Box className={style.pageHeader}>
        <Typography className={style.pageTitle}>Add Category</Typography>
      </Box>

      <Box className={style.ACRP_Wrapper}>
        {CATEGORY_PLACEHOLDERS.map((item) => (
          <Box className={style.ACRP_Box_Wrapper} key={item}>
            <Box className={style.ACRP_IconWrapper}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              <Typography variant="subtitle1">subtitle1</Typography>
            </Box>
            <Box className={style.ACRP_Content_Wrapper}>
              <Chip label="Clickable" />
              <Typography variant="h6">h6. Heading</Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default AddCategoryRightPannel
