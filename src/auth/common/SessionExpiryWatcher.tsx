import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet } from "../../api/userApi";
import { AUTH_ENDPOINTS } from "../../api/endpoints";
import { getAuthSession, hasStoredAuthMarker } from "../../utils/authStorage";

const CHECK_INTERVAL_MS = 15 * 1000;

const SessionExpiryWatcher = () => {
  const navigate = useNavigate();
  const hadSessionRef = useRef(hasStoredAuthMarker());

  useEffect(() => {
    const redirectIfSessionLost = () => {
      // Read the raw marker before getAuthSession() has a chance to clear
      // it, so a session that was already expired when this check runs
      // (e.g. right after page load) is still treated as "had a session".
      const markerExisted = hasStoredAuthMarker();
      const hasSession = getAuthSession() !== null;

      if (!hasSession && (hadSessionRef.current || markerExisted) && window.location.pathname !== "/signin") {
        navigate("/signin");
      }

      hadSessionRef.current = hasSession;
    };

    const checkSession = () => {
      redirectIfSessionLost();
      if (hadSessionRef.current) {
        apiGet(AUTH_ENDPOINTS.ME).catch(() => {});
      }
    };

    checkSession();
    const interval = setInterval(checkSession, CHECK_INTERVAL_MS);
    window.addEventListener("storage", redirectIfSessionLost);

    return () => {
      clearInterval(interval);
      window.removeEventListener("storage", redirectIfSessionLost);
    };
  }, [navigate]);

  return null;
};

export default SessionExpiryWatcher;
