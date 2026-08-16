import { Box } from '@mui/material'
import style from '../../../../styles/ownerStyle/AddProducts.module.css'
import LeftSideAddProduct from './LeftSideAddProduct'

const AddProducts = () => {
  return (
    <Box className={style.Aad_Product_Wrapper_Top_Parent}>
      <Box className={style.Add_Product_Left_Col}>
        <LeftSideAddProduct />
      </Box>
    </Box>
  )
}

export default AddProducts
