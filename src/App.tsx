import { Routes, Route } from 'react-router-dom'
import Signup from './auth/pages/Signup'
import Signin from './auth/pages/Signin'
import GoogleProviView from './auth/common/GoogleProviView'
import SessionExpiryWatcher from './auth/common/SessionExpiryWatcher'
import UserHome from './features/user/pages/UserHome'
import useGetCity from "./hooks/useGetCity"
import ChnagePassword from './features/user/components/ChnagePassword'
import OwnerLayout from './features/owner/components/OwnerLayout'
import OwnerDashboard from './features/owner/components/Ownerdashboard'
import AddCategury from './features/owner/pages/AddCategury'
import AddStore from './features/owner/pages/AddStore'
import Products from './features/owner/pages/Products'
import SubOwnerDashboard from './features/owner/components/SubOwnerDashboard'
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
        <Route path='/change-password' element={<ChnagePassword/>}/>
        <Route path="/owner/dashboard" element={<OwnerLayout><OwnerDashboard /></OwnerLayout>} />
        <Route path='/owner/orders' />
        <Route path="/owner/category/add" element={<OwnerLayout><AddCategury /></OwnerLayout>} />
        <Route path='/owner/stores/add' element={<OwnerLayout><AddStore/></OwnerLayout>}/>
        <Route path='/owner/Products' element={<OwnerLayout><Products/></OwnerLayout>}/>
        <Route path='/owner/store/:id' element={<OwnerLayout><SubOwnerDashboard/></OwnerLayout>}/> 
      </Routes>
    </>
  )
}

export default App
