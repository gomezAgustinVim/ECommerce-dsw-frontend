import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchBar from "./SearchBar";
import { useCarrito } from "../context/carritoContext";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
    setIsAdmin(localStorage.getItem("rol") === "admin");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    setIsAuthenticated(false);
    window.location.href = "/";
  };
  const { count } = useCarrito();

  const closeAll = () => {
    setOpenMenu(false);
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
          className={`absolute md:static left-0 top-[64px] md:top-auto w-full md:w-auto bg-gray-800 md:bg-transparent flex flex-col md:flex-row md:items-center md:gap-8 transition-all duration-300 ${
            openMenu
              ? "opacity-100 visible"
              : "opacity-0 invisible md:visible md:opacity-100"
          }`}
        >
          {/* BÚSQUEDA */}
          <div className="px-4 md:px-0 my-2 md:my-0 md:w-1/3">
            <SearchBar onCloseMenu={closeAll} className="w-full" />
          </div>

          {/* LINK PRODUCTOS */}
          <Link
            to="/muebles"
            onClick={closeAll}
            className="px-4 py-2 hover:text-blue-300 font-medium"
          >
            Productos
          </Link>

          {/* PEDIDOS */}
          {isAuthenticated && (
            <Link
              to="/pedidos"
              onClick={closeAll}
              className="px-4 py-2 hover:text-blue-300 font-medium"
            >
              {isAdmin ? "Pedidos" : "Mis Pedidos"}
            </Link>
          )}

          {/* LINK CONTACTO */}
          <Link
            to="https://github.com/gomezAgustinVim/tpDSWproposalGomezPitavinoBertottiZajarias"
            onClick={closeAll}
            className="px-4 py-2 hover:text-blue-300 font-medium"
          >
            Contacto
          </Link>

          <Link
            to={isAuthenticated ? "/carrito" : "/login"}
            onClick={closeAll}
            className="flex justify-start md:relative px-4 py-2 text-xl"
          >
            🛒
            {isAuthenticated && (
              <span className="md:absolute md:-top-1 md:-right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                {count}
              </span>
            )}
          </Link>

          {/* login */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2 px-4">
              <Link
                to="/perfil"
                className="px-4 py-2 border-2 rounded-md hover:border-blue-800 hover:!text-blue-800 whitespace-nowrap"
                onClick={closeAll}
              >
                Perfil
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 border-2 rounded-md hover:border-blue-800 hover:!text-blue-800 whitespace-nowrap"
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 border-2 rounded-md hover:border-blue-800 hover:!text-blue-800 whitespace-nowrap"
              onClick={closeAll}
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

