import { Box, Typography, Paper, TextField, Button } from '@mui/material'
import style from '../../../styles/ownerStyle/AddStore.module.css'
const AddStore = () => {
  return (
    <>
      <Box className={style.AS_mainWrapper}>
        {/* Left Side */}
        <Paper className={style.AS_leftWrapper} elevation={4}>
          <Typography variant="h5" className={style.heading}>
            Create Store
          </Typography>

          <Box component="form" className={style.form}>
            <TextField fullWidth label="Store Name" />

            <TextField fullWidth multiline rows={3} label="Description" />
            <TextField fullWidth label="Email" />

            <TextField fullWidth label="Phone" />

            <TextField fullWidth label="GST Number" />

            <Typography className={style.subHeading}>Address</Typography>

            <TextField fullWidth label="Street" />

            <Box className={style.row}>
              <TextField fullWidth label="City" />
              <TextField fullWidth label="State" />
            </Box>

            <Box className={style.row}>
              <TextField fullWidth label="Country" />
              <TextField fullWidth label="Pincode" />
            </Box>

            <TextField fullWidth label="Logo URL" />

            <TextField fullWidth label="Banner URL" />

            <Button variant="contained" className={style.createBtn}>
              Create Store
            </Button>
          </Box>
        </Paper>

        {/* Right Side */}

        <Paper className={style.AS_rightWrapper} elevation={4}>
          <Typography variant="h5" className={style.heading}>
            Your Stores
          </Typography>

          <Box className={style.storeList}>
            <Box className={style.storeCard}>
              <img src="https://via.placeholder.com/80" alt="" />

              <Box>
                <Typography variant="h6" sx={{ color: 'var(--nb-dark)' }}>
                  Mohini Fashion Store
                </Typography>

                <Typography sx={{ color: 'var(--nb-gray)' }}>Bhopal</Typography>

                <Typography color="#63ff83">Active</Typography>
              </Box>
            </Box>

            <Box className={style.storeCard}>
              <img src="https://via.placeholder.com/80" alt="" />

              <Box>
                <Typography variant="h6" sx={{ color: 'var(--nb-dark)' }}>
                  Grocery Hub
                </Typography>

                <Typography sx={{ color: 'var(--nb-gray)' }}>Indore</Typography>

                <Typography color="#63ff83">Active</Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  )
}

export default AddStore
