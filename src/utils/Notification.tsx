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
        sx={(theme) => {
          const accent = theme.palette[severity]?.main ?? theme.palette.success.main;
          return {
            width: { xs: "100%", sm: "auto" },
            minWidth: { xs: 0, sm: 340 },
            maxWidth: { xs: "100%", sm: 420 },
            alignItems: "center",
            borderRadius: "14px",
            fontWeight: 600,
            fontSize: 13.5,
            color: "#f2f2f5",
            background:
              "linear-gradient(135deg, rgba(18,18,26,0.94), rgba(8,8,12,0.97))",
            backdropFilter: "blur(14px)",
            border: `1px solid ${accent}40`,
            borderLeft: `4px solid ${accent}`,
            boxShadow: `0 12px 32px rgba(0,0,0,0.5), 0 0 20px 1px ${accent}4d`,
            "& .MuiAlert-icon": {
              color: accent,
            },
            "& .MuiAlert-action": {
              color: "rgba(255,255,255,0.55)",
            },
          };
        }}
      >
        {message}
      </Alert>
    </Snackbar>,
    document.body
  );
};

export default Notification;