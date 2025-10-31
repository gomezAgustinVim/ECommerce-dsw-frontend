import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CarritoProvider } from './context/carritoContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <CarritoProvider>
                <App />
            </CarritoProvider>
        </BrowserRouter>
    </StrictMode>,
)
