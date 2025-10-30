import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Login from './pages/login';
import Carrito from './pages/carrito'; // <-- importar el componente
import Clientes from './pages/clientes';
import Home from './pages/home';
import Mesa from './pages/mesa';
import MuebleDetail from './pages/muebleDetail';
import Sillas from './pages/sillas';
import Footer from './components/footer';
import Muebles from './pages/muebles'; 

function App() {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className='flex-grow bg-gray-100'>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/muebles" element={<Muebles />} /><Route path="/muebles" element={<Muebles />} />
					<Route path="/muebles/:id" element={<MuebleDetail />} />
					<Route path="/carrito" element={<Carrito />} />{' '}
					{/* <-- ruta para el carrito */}
					<Route path="/login" element={<Login />} />
					<Route path="/sillas" element={<Sillas />} />
					<Route path="/mesa" element={<Mesa />} />
					<Route path="/clientes" element={<Clientes />} />
				</Routes>
			</main>

			<Footer />

		</div>
	);
}

export default App;