import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
    const [open, setOpen] = useState(false);

    const [query, setQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Buscando:", query);
    };

    return (
        <header className="bg-gray-800 text-white shadow-md">
            <nav className="flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold">
                    Muebles a tu alcance
                </Link>


                {/* Barra de búsqueda */}
                <form onSubmit={handleSearch} className="flex items-center w-1/3">
                    <input
                        type="text"
                        placeholder="Buscar productos..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="bg-gray-200 text-black border border-gray-400 rounded px-3 py-2"

                    />
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-r-md"
                    >
                        🔍
                    </button>
                </form>

                {/* Menú principal */}
                <ul className="flex gap-6 items-center">
                    <li>
                        <Link to="/">Inicio</Link>
                    </li>

                    {/* agrego lista  */}
                    <li className="relative">
                        <button
                            onClick={() => setOpen(!open)}
                            className="hover:text-gray-300"
                        >
                            Productos ▼
                        </button>
                        {open && (
                            <ul className="absolute left-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg w-40">
                                <li className="px-4 py-2 hover:bg-gray-200">
                                    <Link to="/sillones">Sillones</Link>
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-200">
                                    <Link to="/mesas">Mesas</Link>
                                </li>
                                <li className="px-4 py-2 hover:bg-gray-200">
                                    <Link to="/sillas">Sillas</Link>
                                </li>
                            </ul>
                        )}
                    </li>

                    <li>
                        <Link to="/contacto">Contacto</Link>
                    </li>
                    <li>
                        <Link to="/carrito" className="relative">
                            🛒
                            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-1">
                                3
                            </span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
