import { Route, Routes } from "react-router"
import Navbar from "./components/Navbar/Navbar"
import Sidebar from "./components/Sidebar/Sidebar"
import List from "./pages/List/List"
import Order from "./pages/Order/Order"
import Add from "./pages/Add/Add"
import { ToastContainer, Zoom } from 'react-toastify';

const App = () => {
  const URL = import.meta.env.VITE_URL;
  return (
    <div>
      <ToastContainer autoClose={1500} transition={Zoom} pauseOnHover={false} draggable newestOnTop />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={URL} />} />
          <Route path="/list" element={<List url={URL} />} />
          <Route path="/order" element={<Order url={URL} />} />
        </Routes>

      </div>
    </div>
  )
}

export default App