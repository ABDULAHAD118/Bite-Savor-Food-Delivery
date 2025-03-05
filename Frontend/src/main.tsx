import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import StoreContextProvider from './contexts/StoreContext.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </BrowserRouter>
)
