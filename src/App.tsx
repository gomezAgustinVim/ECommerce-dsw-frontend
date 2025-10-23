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
import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
});

function App() {
    const [clientes, setClientes] = useState<Cliente[]>([]);

    const fetchClientes = async () => {
        try {
            const res = await api.get("/clientes");

            console.log(res.data)
            setClientes(res.data.data)
        } catch (err) {
            console.error(err)
        }
    };

    useEffect(() => {
        fetchClientes();
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
            {clientes.map((cliente) => (
                <div key={cliente.id}>
                    <h2>
                        {cliente.apellido} {cliente.nombre}
                    </h2>
                    <p>Email: {cliente.email}</p>

                    <h3>Favoritos:</h3>
                    {cliente.favoritos && cliente.favoritos.length > 0 ? (
                        <ul>
                            {cliente.favoritos.map((fav) => (
                                <li key={fav.id}>
                                    🪑 {`Mueble ID ${fav.mueble}`}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No tiene favoritos.</p>
                    )}
                </div>
            ))}
        </div>
    );
}

export default App;
