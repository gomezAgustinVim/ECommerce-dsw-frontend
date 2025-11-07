import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Login from './pages/login';
import Carrito from './pages/carrito'; // <-- importar el componente
import MisPedidos from './pages/misPedidos';
import Clientes from './pages/clientes';
import Home from './pages/home';
import MuebleDetail from './pages/muebleDetail';
import Footer from './components/footer';
import Muebles from './pages/muebles';
import Busqueda from './pages/buscador';
import Perfil from './pages/perfil';

function App() {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className='flex-grow bg-gray-100'>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/muebles" element={<Muebles />} /><Route path="/muebles" element={<Muebles />} />
                    <Route path='/perfil' element={<Perfil />} />
                    <Route path="/muebles/:id" element={<MuebleDetail />} />
                    <Route path="/carrito" element={<Carrito />} />{' '}
                    <Route path="/pedidos" element={<MisPedidos />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/clientes" element={<Clientes />} />
                    <Route path="/busqueda" element={<Busqueda />} />

                </Routes>
            </main>

            <Footer />

        </div>
    );
}

export default App;
