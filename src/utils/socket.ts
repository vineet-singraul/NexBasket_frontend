
import { io } from "socket.io-client";

// same server as the REST API, without the /api suffix
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD
    ? "https://nexbasket-backend.onrender.com/api"
    : "http://localhost:5000/api");

// must be the same server as the REST API so the auth cookie is sent along;
// a path like "/api" would be read by socket.io as a namespace, so strip it
const SOCKET_URL = API_BASE_URL.replace(/\/api\/?$/, "");

// connected only once a user is logged in (see PrimaryNavbar)
const socket = io(SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,
});

export default socket;
