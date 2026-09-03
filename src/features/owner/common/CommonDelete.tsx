import React from 'react'
import { Typography, Button, Divider } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import styles from '../../../styles/ownerStyle/CommonDelete.module.css'
import { type CommonDeleteProps } from '../types/dashboard.types'

const CommonDelete = ({   onDelete, onClose, }: CommonDeleteProps) => {
  return (
    <>
      <div className={styles.CD_backdrop} />

      <div className={styles.CD_wrap}>
        <div className={styles.CD_bar}>
          <div className={styles.CD_handle} />

          <div className={styles.CD_countWrap}>
            <Typography className={styles.CD_countText}>
              Are You sure are you want delete
            </Typography>
          </div>

          <div className={styles.CD_actions}>
            <Button
              startIcon={<CloseRoundedIcon fontSize="small" />}
              className={styles.CD_clearBtn}
              onClick={onClose}
            >
              Clear
            </Button>

            <Button
              startIcon={<DeleteRoundedIcon fontSize="small" />}
              className={styles.CD_deleteBtn} onClick={onDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CommonDelete
