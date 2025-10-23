import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Login from './components/login';
import Carrito from './pages/carrito'; // <-- importar el componente
import Clientes from './pages/clientes';
import Home from './pages/home';
import Mesa from './pages/mesa';
import MuebleDetail from './pages/muebleDetail';
import Sillas from './pages/sillas';

function App() {
	return (
		<div className="bg-frame">
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/muebles/:id" element={<MuebleDetail />} />
				<Route path="/carrito" element={<Carrito />} />{' '}
				{/* <-- ruta para el carrito */}
				<Route path="/login" element={<Login />} />
				<Route path="/sillas" element={<Sillas />} />
				<Route path="/mesa" element={<Mesa />} />
				<Route path="/clientes" element={<Clientes />} />
			</Routes>
		</div>
	);
}

export default App;
