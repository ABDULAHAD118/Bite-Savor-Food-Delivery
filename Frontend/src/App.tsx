import { Route, Routes } from "react-router"
import Navbar from "./components/Navbar/Navbar"
import Home from "./pages/Home/Home"
import Cart from "./pages/Cart/Cart"
import PlaceOrder from "./pages/Order/PlaceOrder"
import Footer from "./components/Footer/Footer"
import LoginPopup from "./components/LoginPopup/LoginPopup"
import { useContext, useState } from "react"
import { ToastContainer, Zoom } from "react-toastify"
import Verify from "./components/Verify/Verify"
import MyOrders from "./pages/MyOrders/MyOrders"
import NotFound from "./components/404/404"
import { StoreContext } from "./contexts/StoreContext"
import Spinner from "./components/Spinner/Spinner"
import './App.css'

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const { token, pending } = useContext<any>(StoreContext);

  return (
    <>
      {
        showLogin && <LoginPopup setShowLogin={setShowLogin} />
      }
      <div className="app">
        {pending ? <div className="spin"> <Spinner width={50} height={50} borderWidth={5} /></div> : <div>
          <ToastContainer autoClose={1500} transition={Zoom} pauseOnHover={false} draggable newestOnTop />
          <Navbar setShowLogin={setShowLogin} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<PlaceOrder setShowLogin={setShowLogin} />} />
            {token && <Route path="/verify" element={<Verify />} />}
            {token && <Route path="/myorders" element={<MyOrders />} />}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>}
      </div>
      {!pending && <Footer />}
    </>
  )
}

export default App
