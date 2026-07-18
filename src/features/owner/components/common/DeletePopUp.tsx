import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import type { popUpInfoInterface } from "../../types/common.types";

const DeletePopUp: React.FC<popUpInfoInterface> = ({
  open,
  title = "Delete Store",
  message = "Are you sure you want to delete this? This action cannot be undone.",
  onCancel,
  onConfirm,
  loading = false,
  loadingText = "Deleting...",
  defaultText = "Delete",
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      classes={{ paper: "confirm-dialog-paper" }}
    >
      <DialogTitle className="confirm-dialog-title">{title}</DialogTitle>

      <DialogContent>
        <DialogContentText className="confirm-dialog-text">
          {message}
        </DialogContentText>
      </DialogContent>

      <DialogActions className="confirm-dialog-actions">
        <Button
          onClick={onCancel}
          className="confirm-dialog-btn confirm-dialog-btn-cancel"
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          className="confirm-dialog-btn confirm-dialog-btn-delete"
          disabled={loading}
        >
          {loading ? loadingText : defaultText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeletePopUp;