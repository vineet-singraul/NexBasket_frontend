import { Routes, Route } from 'react-router-dom'
import Signup from './auth/pages/Signup'
import Signin from './auth/pages/Signin'
import GoogleProviView from './auth/common/GoogleProviView'
import SessionExpiryWatcher from './auth/common/SessionExpiryWatcher'
import ProtectedRoute from './auth/common/ProtectedRoute'
import UserHome from './features/user/pages/UserHome'
import useGetCity from './hooks/useGetCity'
import ChnagePassword from './features/user/components/ChnagePassword'
import OwnerLayout from './features/owner/common/OwnerLayout'
import AddCategury from './features/owner/pages/AddCategury'
import Products from './features/owner/pages/Products'
import Stores from './features/owner/pages/Stores'
import AddProducts from './features/owner/components/Products/AddProducts'
import ProductCommonBase from './features/owner/pages/ProductCommonBase'
import AddProduct from './features/owner/components/BaseProduct/AddProduct'
import MainOwnerDashbord from './features/owner/pages/MainOwnerDashbord'
function App() {
  useGetCity()
  return (
    <>
      <SessionExpiryWatcher />
      <Routes>
        <Route path="/" element={<UserHome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/google-continue" element={<GoogleProviView />} />
        <Route path="/change-password" element={<ChnagePassword />} />
        <Route
          path="/__preview/add-product"
          element={
            <OwnerLayout>
              <AddProducts />
            </OwnerLayout>
          }
        />
        <Route
          path="/__preview/add-base-product"
          element={
            <OwnerLayout>
              <AddProduct />
            </OwnerLayout>
          }
        />
        <Route element={<ProtectedRoute role="owner" />}>
          <Route
            path="/owner/dashboard"
            element={
              <OwnerLayout>
                <MainOwnerDashbord />
              </OwnerLayout>
            }
          />
          <Route path="/owner/orders" />
          <Route
            path="/owner/category/add"
            element={
              <OwnerLayout>
                <AddCategury />
              </OwnerLayout>
            }
          />
          <Route
            path="/owner/category/add/:id"
            element={
              <OwnerLayout>
                <AddCategury />
              </OwnerLayout>
            }
          />
          <Route
            path="/owner/stores/add"
            element={
              <OwnerLayout>
                <Stores />
              </OwnerLayout>
            }
          />
          <Route
            path="/owner/Products"
            element={
              <OwnerLayout>
                <Products />
              </OwnerLayout>
            }
          />
          <Route
            path="/owner/stores/add/:ownerdId/:storeId"
            element={
              <OwnerLayout>
                <Stores />
              </OwnerLayout>
            }
          />
          <Route
            path="/owner/products/add/:ownerdId/:idStore"
            element={
              <OwnerLayout>
                <AddProducts />
              </OwnerLayout>
            }
          />
          <Route
            path="/owner/product/All/:id/:storeID/:ownerId"
            element={
              <OwnerLayout fullBleed>
                <ProductCommonBase />
              </OwnerLayout>
            }
          />
          <Route
            path="/owner/ownerdashboard/ListedProducts"
            element={
              <OwnerLayout>
                <MainOwnerDashbord />
              </OwnerLayout>
            }
          />
          <Route
            path="/owner/ownerdashboard/ListedStore"
            element={
              <OwnerLayout>
                <MainOwnerDashbord />
              </OwnerLayout>
            }
          />
        </Route>
      </Routes>
    </>
  )
}

// OwnerListedStore

export default App
