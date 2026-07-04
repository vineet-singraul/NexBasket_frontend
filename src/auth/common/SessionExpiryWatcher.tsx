import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { clearAuthSession, getAuthSession } from "../../utils/authStorage";
import Notification from "../../utils/Notification";
import type { NotificationInterfacce } from "../types/auth.types";

const WARNING_BEFORE_EXPIRY_MS = 15 * 1000;

const SessionExpiryWatcher = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [notification, setNotification] = useState<NotificationInterfacce>({
    open: false,
    message: "",
    severity: "warning",
  });

  useEffect(() => {
    const session = getAuthSession();
    if (!session) return;

    const remaining = session.tokenExpiresAt - Date.now();

    const forceLogout = () => {
      clearAuthSession();
      setNotification((prev) => ({ ...prev, open: false }));
      if (window.location.pathname !== "/signin") {
        navigate("/signin");
      }
    };

    if (remaining <= 0) {
      forceLogout();
      return;
    }

    const showWarning = () => {
      setNotification({
        open: true,
        message: "Your session is about to expire soon. Please save your work.",
        severity: "warning",
      });
    };

    const warningDelay = remaining - WARNING_BEFORE_EXPIRY_MS;

    const warningTimer = setTimeout(
      showWarning,
      warningDelay > 0 ? warningDelay : 0
    );
    const expiryTimer = setTimeout(forceLogout, remaining);

    return () => {
      clearTimeout(warningTimer);
      clearTimeout(expiryTimer);
    };
  }, [location.pathname, navigate]);

  return (
    <Notification
      open={notification.open}
      message={notification.message}
      severity={notification.severity}
      autoHideDuration={WARNING_BEFORE_EXPIRY_MS}
      onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
    />
  );
};

export default SessionExpiryWatcher;
