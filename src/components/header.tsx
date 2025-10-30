import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
    const [openMenu, setOpenMenu] = useState(false);
    const [openProductos, setOpenProductos] = useState(false);
    const [query, setQuery] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Buscando:", query);
    };

    const closeAll = () => {
        setOpenMenu(false);
        setOpenProductos(false);
    };

    return (
        <header className="sticky top-0 w-full bg-gray-800 text-white z-50 shadow-md">
            <nav className="flex items-center justify-between md:justify-around px-4 py-3 md:px-8">
                {/* LOGO */}
                <Link to="/" onClick={closeAll} className="flex items-center gap-2">
                    <img
                        src="/imagenes/logomueble.png"
                        alt="Muebles Logo"
                        className="h-10 w-auto"
                    />
                </Link>

                {/* BOTÓN HAMBURGUESA */}
                <button
                    className="md:hidden text-black text-2xl"
                    onClick={() => setOpenMenu(!openMenu)}
                >
                    {openMenu ? "✖️" : "☰"}
                </button>

                {/* MENÚ PRINCIPAL */}
                <div
                    className={`absolute md:static left-0 top-[64px] md:top-auto w-full md:w-auto bg-gray-800 md:bg-transparent flex flex-col md:flex-row md:items-center md:gap-8 transition-all duration-300 ${openMenu ? "opacity-100 visible" : "opacity-0 invisible md:visible md:opacity-100"
                        }`}
                >
                    {/* BÚSQUEDA */}
                    <form
                        onSubmit={handleSearch}
                        className="flex w-full md:w-1/3 px-4 md:px-0 my-2 md:my-0"
                    >
                        <input
                            type="text"
                            placeholder="Buscar muebles..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            className="w-full rounded-l-md px-3 py-2 text-gray-300 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md"
                        >
                            🔍
                        </button>
                    </form>

                    {/* LINK PRODUCTOS (DESPLEGABLE) */}
                    <div className="relative px-4 md:px-0">
                        <button
                            onClick={() => setOpenProductos(!openProductos)}
                            className="flex items-center gap-1 font-medium hover:text-blue-300 py-2 w-full md:w-auto"
                        >
                            Productos
                            <span
                                className={`transition-transform ${openProductos ? "rotate-180" : ""
                                    }`}
                            >
                                ▼
                            </span>
                        </button>

                        {openProductos && (
                            <div className="md:absolute md:left-0 md:mt-2 bg-white text-gray-800 rounded-lg shadow-lg border border-gray-200 w-full md:w-56">
                                {["Sillas", "Sofás", "Mesas", "Camas", "Almacenamiento"].map(
                                    (item) => (
                                        <Link
                                            key={item}
                                            to={`/${item.toLowerCase()}`}
                                            className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                                            onClick={closeAll}
                                        >
                                            {item}
                                        </Link>
                                    )
                                )}
                            </div>
                        )}
                    </div>

                    {/* LINK CONTACTO */}
                    <Link
                        to="/contacto"
                        onClick={closeAll}
                        className="px-4 py-2 hover:text-blue-300 font-medium"
                    >
                        Contacto
                    </Link>

                    {/* CARRITO */}
                    <Link
                        to="/carrito"
                        onClick={closeAll}
                        className="flex justify-start md:relative px-4 py-2 text-xl"
                    >
                        🛒
                        <span className="md:absolute md:-top-1 md:-right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                            3
                        </span>
                    </Link>

                    {/* login */}
                    <Link
                        to="/login"
                        className="px-4 py-2 border-2 rounded-md hover:border-blue-800 hover:!text-blue-800 whitespace-nowrap"
                    >
                        Iniciar sesión
                    </Link>
                </div>
            </nav>
        </header>
    );
}
