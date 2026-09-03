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
  CREATE: "/category/createCategoryOfProduct",
  GET_OWNER_CATEGORY: (id: string) => `/category/getSingleOwnerCategory/${id}`,
  DELETE_CATEGORY: (id: string) => `/category/deleteCategoryOfProduct/${id}`,
  GET_CATEGORY_BY_ID : (id : string) => `/category/getCategoryOfProductById/${id}`,
  UPDATE_CATEGORY: (id: string) => `/category/updateCategoryOfProduct/${id}`,
  GET_CATEGORY_BY_OWNER_ID : (id: string) => `/category/getSingleOwnerCategory/${id}`
};


export const STORE_ENDPOINTS = {
  CREATE: "/store/AddStore",
  LIST: (id: string) => `/store/${id}`,
  SINGLELIST: (id: string) => `/store/showOnlyOwnerStore/${id}`,
  DELETE: (id: string) => `/store/deleteOwnerStore/${id}`,
  GETSTORE: (id: string) => `/store/getSingleOwner/${id}`,
  UPDATESTORE: `store/EditOwnerDetails`
};

export const PRODUCT_ENDPOINTS = {
  CREATE: "/productRoutes/CreateProducts",
  LIST: (storeId: string) => `/productRoutes/getOwnerProducts/${storeId}`,
  DELETE: (id: string) => `/productRoutes/deleteOwnerProducts/${id}`,
};


export const PRODUCT_IMAGE_ADD = {
  ADD_IMAGE: (id : string) => `productImageRoutes/addProductImages/${id}`,
  GET_IMAGE: (id : string) => `productImageRoutes/getProductImageById/${id}`,
  DELETE_IMAGE: (id : string) => `productImageRoutes/deleteProductById/${id}`
}


export const BASE_PRODUCT = {
  ADD_BASE_PRODUCT : '/product/createBaseProduct',
  DELETE_BASE_PRODUCT : (productId : string) => `/product/deleteBaseProduct/${productId}`
}



export const OWNER_DASHBOARD_API = {
  GET_ALL_DETAILS_OWNER_DASHBOARD : (storeId : string, ownerId : string) => `/ownerDashboard/${storeId}/${ownerId}`
}