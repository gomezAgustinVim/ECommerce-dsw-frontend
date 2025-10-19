import { useState } from "react";
import { Link, useNavigate} from "react-router-dom"; //uso de useNavigate porque se recomienda en react

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeRoom, setActiveRoom] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

    const handleProductsClick = () => {
    // te lleva a /productos 
    navigate ('/productos');
    closeMenus();
  };

  const handleProductsHover = () => {
    // abre el menu cuando pasa el mouse
    setOpen(true);
  };


  const handleSearch = (e: React.FormEvent) => {
    // evita que la pag se recargue
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
    <header className="fixed top-0 left-0 w-full bg-gray-800 text-white shadow-lg z-50">
      <nav className="flex items-center justify-between px-6 py-3">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3" onClick={closeMenus}>
          <img 
            src="/imagenes/logomueble.png" 
            alt="Muebles Logo"
            className="h-12 w-auto hover:opacity-90 transition-opacity" 
          />
        </Link>

        {/* Barra de búsqueda */}
        <form onSubmit={handleSearch} className="flex items-center w-1/3 mx-8">
          <input
            type="text"
            placeholder="Buscar productos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="bg-white text-gray-800 border border-gray-300 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg text-white transition-colors duration-200"
          >
            🔍
          </button>
        </form>

        {/* Menú principal */}
        <ul className="flex gap-8 items-center">
          <li>
            <Link
              to="/"
              onClick={closeMenus}
              className="text-white hover:text-blue-300 transition-colors duration-200 font-medium"
            >
              Inicio
            </Link> 
          </li>

          {/* Menú desplegable de productos */}
          <li className="relative">
            <button
              onClick={handleProductsClick} // ahora te lleva a /productos 
              onMouseEnter={handleProductsHover}
              className="text-white hover:text-blue-300 transition-colors duration-200 font-medium flex items-center gap-1"
            >
              Productos 
              <span className={`transform transition-transform ${open ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            {open && (
              <div 
                className="absolute left-0 mt-2 bg-white text-gray-800 rounded-lg shadow-xl border border-gray-200 w-56 z-20"
                onMouseLeave={() => setOpen(false)}
              >
                <div className="p-2">
                  <div
                    className="px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer transition-colors"
                    onClick={() => toggleRoom("dormitorio")}   
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Dormitorio</span>
                      <span className="text-xs">▶</span>
                    </div>
                    {activeRoom === "dormitorio" && (
                      <div className="block px-3 py-2 hover:bg-gray-100! rounded-md transition-colors"> 
                        <Link 
                          to="/dormitorio/camas" 
                          onClick={closeMenus}
                          className="block px-3 py-2 hover:bg-gray-100 rounded-md transition-colors"
                        >
                          Camas
                        </Link>
                        <Link 
                          to="/dormitorio/placares" 
                          onClick={closeMenus}
                          className="block px-3 py-2 hover:bg-gray-100 rounded-md transition-colors"
                        >
                          Placares
                        </Link>
                      </div>
                    )}
                  </div>

                  <Link 
                    to="/sillas" 
                    className="block px-3 py-2 hover:bg-gray-100 transition-colors"
                    onClick={closeMenus}
                  >
                    Sillas / Sillones
                  </Link>

                  <Link 
                    to="/mesas" 
                    className="block px-3 py-2 hover:bg-gray-100 rounded-md transition-colors"
                    onClick={closeMenus}
                  >
                    Mesas
                  </Link>
                </div>
              </div>
            )}
          </li>

          {/* Contacto */}
          <li>
            <Link
              to="/contacto"
              onClick={closeMenus}
              className="text-white hover:text-blue-300 transition-colors duration-200 font-medium"
            >
              Contacto
            </Link>
          </li>

          {/* Carrito */}
          <li>
            <Link
              to="/carrito"
              onClick={closeMenus}
              className="relative text-white hover:text-blue-300 transition-colors duration-200 text-xl p-2"
            >
              🛒
              {/* numero arriba del carrito */}
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                3
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}