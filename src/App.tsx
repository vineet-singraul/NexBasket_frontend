import { Routes, Route } from 'react-router-dom'
import Signup from './auth/pages/Signup'
import Signin from './auth/pages/Signin'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </>
  )
}

export default App
