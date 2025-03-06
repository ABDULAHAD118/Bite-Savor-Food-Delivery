import { Route, Routes } from "react-router"
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home/Home"
import Cart from "./pages/Cart/Cart"
import PlaceOrder from "./pages/Order/PlaceOrder"
import Footer from "./components/Footer/Footer"
import LoginPopup from "./components/LoginPopup/LoginPopup"
import { useState } from "react"
import { ToastContainer } from "react-toastify"
import Verify from "./components/Verify/Verify"
import MyOrders from "./pages/MyOrders/MyOrders"

function App() {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      {
        showLogin && <LoginPopup setShowLogin={setShowLogin} />
      }
      <div className="app">
        <ToastContainer />
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder setShowLogin={setShowLogin} />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
