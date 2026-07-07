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
      </Routes>
    </>
  )
}

export default App
