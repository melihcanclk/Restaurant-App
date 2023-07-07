import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import RestaurantId from '../pages/restaurant/RestourantId'
import RestaurantHome from '../pages/restaurant/RestaurantHome'
import Profile from '../pages/Profile'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurants" element={<RestaurantHome />} />
      <Route path="/restaurant/:id" element={<RestaurantId />} />
      <Route path="/profile" element={<Profile />} />
      <Route path='*' element={<h1>Page Not Found</h1>} />
    </Routes>
  )
}

export default App
