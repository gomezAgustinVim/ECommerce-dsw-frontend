import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Home from './pages/home';
import Carrito from './pages/carrito';

function App() {
    return (
        <div className="bg-frame">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/carrito' element={<Carrito />} />
            </Routes>
        </div>
    );
}

export default App;
