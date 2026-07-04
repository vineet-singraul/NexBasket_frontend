import { useEffect } from "react";
import { apiGet } from "../../api/userApi";
import { AUTH_ENDPOINTS } from "../../api/endpoints";
import { getAuthSession } from "../../utils/authStorage";

// How often to ping the backend to check whether the (httpOnly) session
// cookie is still valid. We can't read the cookie itself from JS, so this
// is the only way to detect expiry proactively instead of waiting for the
// user to trigger some other request.
const CHECK_INTERVAL_MS = 15 * 1000;

const SessionExpiryWatcher = () => {
  useEffect(() => {
    const checkSession = () => {
      if (!getAuthSession()) return;

      // A 401 here is handled globally by axiosInstance's response
      // interceptor: it clears the local session and redirects to
      // /signin. Nothing further to do in that case.
      apiGet(AUTH_ENDPOINTS.ME).catch(() => {});
    };

    const interval = setInterval(checkSession, CHECK_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  return null;
};

export default SessionExpiryWatcher;
