import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import Home from './pages/home';
import Carrito from './pages/carrito'; // <-- importar el componente
import Login from './components/login';
import Sillas from './pages/sillas';
import Mesa from './pages/mesa';
import { type Cliente } from './types';
import { useEffect, useState } from "react";
function App() {
    const api_url = "http://localhost:3000/api/"
    const [clientes, setClientes] = useState<Cliente[]>([]);

    useEffect(() => {
        fetch(`${api_url}/clientes`) // 👈 URL del backend
            .then((res) => res.json())
            .then((json) => {
                console.log(json); // <- verificás qué llega
                setClientes(json.data); // <- extrae el array "data"
            })
            .catch((err) => console.error("Error al conectar al backend:", err));
    }, []);

    return (
        <div className="bg-frame">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/carrito" element={<Carrito />} /> {/* <-- ruta para el carrito */}
                <Route path="/login" element={<Login />} />
                <Route path="/sillas" element={<Sillas />} />
                <Route path="/mesa" element={<Mesa />} />
            </Routes>

            <h1>Clientes</h1>
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
            {/* ejemplo: mostrar nombre y correo */}
            {clientes.map((cliente) => (
                <div key={cliente.id}>
                    <h2>{cliente.nombre} {cliente.apellido}</h2>
                    <p>{cliente.email}</p>
                </div>
            ))}
        </div>
    );
}

export default App;
