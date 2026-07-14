export const AUTH_ENDPOINTS = {
  SIGNUP: "/auth/signup",
  SIGNIN: "/auth/signin",
  VERIFY_OTP: "/auth/verifyOtp",
  RESEND_OTP: "/auth/resendOtp",
  SIGNOUT: "/auth/signout",
  // Lightweight read-only "who am I" check — should return 401 once the
  // session cookie is expired/removed. Rename to match your backend's
  // actual route if it isn't literally /auth/me.
  ME: "/auth/me",
  CHNAGEPASSWORD: "/auth/change-password"
};

export const CATEGORY_ENDPOINTS = {
  CREATE: "/category",
  GETSUBOWNERCATEGORYLIST: (id: string) => `/category/${id}`
};

export const STORE_ENDPOINTS = {
  CREATE: "/store",
  LIST: "/store",
  SINGLELIST: (id: string) => `/store/${id}`
};
