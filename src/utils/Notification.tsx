import React from "react";
import { createPortal } from "react-dom";
import { Snackbar, Alert } from "@mui/material";
import type { AlertColor } from "@mui/material";

interface NotificationProps {
  open: boolean;
  message: string;
  severity?: AlertColor; // success | error | warning | info
  autoHideDuration?: number;
  onClose: (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => void;
}

const Notification = ({
  open,
  message,
  severity = "success",
  autoHideDuration = 3000,
  onClose,
}: NotificationProps) => {
  return createPortal(
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        elevation={6}
        sx={{
          minWidth: 340,
          borderRadius: "12px",
          fontWeight: 500,
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        }}
      >
        {message}
      </Alert>
    </Snackbar>,
    document.body
  );
};

export default Notification;