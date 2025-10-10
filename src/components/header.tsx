import { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Buscando:", query);
  };

  const toggleRoom = (room: string) => {
    setActiveRoom((prev) => (prev === room ? null : room));
  };

  const closeMenus = () => {
    setOpen(false);
    setActiveRoom(null);
  };

  return (
    <header className="bg-gray-800 text-white shadow-md relative z-50">
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
            className="bg-gray-200 text-black border border-gray-400 rounded-l px-3 py-2 w-full"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-r text-white"
          >
            🔍
          </button>
        </form>

        {/* Menú principal */}
        <ul className="flex gap-6 items-center relative">
          <li>
            <Link to="/" onClick={closeMenus}>Inicio</Link>
          </li>

          {/* Menú desplegable de productos */}
          <li className="relative">
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="hover:text-gray-300"
            >
              Productos ▼
            </button>

            {open && (
              <ul className="absolute left-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg w-48 z-20">
                {/* Dormitorio */}
                <li
                  className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => toggleRoom("dormitorio")}
                >
                  Dormitorio
                  {activeRoom === "dormitorio" && (
                    <ul className="mt-2 ml-2 bg-white rounded shadow w-40">
                      <li className="px-4 py-1 hover:bg-gray-100">
                        <Link to="/dormitorio/camas" onClick={closeMenus}>
                          Camas
                        </Link>
                      </li>
                      <li className="px-4 py-1 hover:bg-gray-100">
                        <Link to="/dormitorio/placares" onClick={closeMenus}>
                          Placares
                        </Link>
                      </li>
                    </ul>
                  )}
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
