import api from "../api/axiosInstance";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { type Mueble } from "../types.tsx";
import { formatCurrency } from "../utils/formatCurrency";
import { useCarrito } from "../context/carritoContext";
import FavoriteButton from "../components/FavoriteButton";

export default function TodosLosMuebles() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [todosLosMuebles, setTodosLosMuebles] = useState<Mueble[]>([]);
  const [etiquetas, setEtiquetas] = useState<string[]>([]);
  const [etiquetaSeleccionada, setEtiquetaSeleccionada] =
    useState<string>("todas");
  const [mueblesFiltrados, setMueblesFiltrados] = useState<Mueble[]>([]);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { addItem } = useCarrito();
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("rol") === "admin";
  const [mostrarInactivos, setMostrarInactivos] = useState(false);

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("token"));
  }, []);

  const fetchTodosLosMuebles = async () => {
    try {
      const url =
        isAdmin && mostrarInactivos ? "/muebles?inactivos=true" : "/muebles";
      const res = await api.get(url);
      const muebles = res.data.data;
      setTodosLosMuebles(muebles);
      setMueblesFiltrados(muebles);

      const etiquetasUnicas = [
        ...new Set(muebles.map((mueble: Mueble) => mueble.etiqueta)),
      ] as string[];
      setEtiquetas(etiquetasUnicas);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTodosLosMuebles();
  }, [mostrarInactivos]);

  // Filtra muebles cuando cambia la etiqueta seleccionada
  useEffect(() => {
    if (etiquetaSeleccionada === "todas") {
      setMueblesFiltrados(todosLosMuebles);
    } else {
      const filtrados = todosLosMuebles.filter(
        (mueble: Mueble) => mueble.etiqueta === etiquetaSeleccionada,
      );
      setMueblesFiltrados(filtrados);
    }
  }, [etiquetaSeleccionada, todosLosMuebles]);

  return (
    <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* filtros por etiqueta  */}
      <div className="mb-8 flex flex-wrap gap-4 items-center">
        {/* contador */}
        <div className="text-gray-600">
          {mueblesFiltrados.length} productos
          {etiquetaSeleccionada !== "todas" && ` de "${etiquetaSeleccionada}"`}
        </div>

        {isAdmin && (
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={mostrarInactivos}
              onChange={(e) => setMostrarInactivos(e.target.checked)}
              className="rounded"
            />
            Mostrar dados de baja
          </label>
        )}

        {/* Menú desplegable de cat */}
        <div className="relative ml-auto">
          <button
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <div className="flex flex-col gap-1">
              <div className="w-5 h-0.5 bg-white"></div>
              <div className="w-5 h-0.5 bg-white"></div>
              <div className="w-5 h-0.5 bg-white"></div>
            </div>
            <span>Categorías</span>
          </button>

          {/* Menú desplegable */}
          {menuAbierto && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
              <div className="py-1">
                {/* Botón para seleccionar todas las categorías en productos */}
                <button
                  onClick={() => {
                    setEtiquetaSeleccionada("todas");
                    setMenuAbierto(false);
                  }}
                  // se aplica estilos de los botones de la pagina, por eso aparece redondeado como los otros botones, pero se le quita el borde redondeado con !rounded-none
                  className={`block w-full text-left px-4 py-2 text-sm !rounded-none ${
                    etiquetaSeleccionada === "todas"
                      ? "bg-blue-100 text-white-700!"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Todas las categorías
                </button>

                {etiquetas.map((etiqueta: string) => (
                  // cada botón de categoría, tambien se aplica estilos de los otros botones de la pagina
                  <button
                    key={etiqueta}
                    onClick={() => {
                      setEtiquetaSeleccionada(etiqueta);
                      setMenuAbierto(false);
                    }}
                    // se aplica estilos, por eso aparece redondeado como los otros botones, pero se le quita el borde redondeado con !rounded-none
                    className={`block w-full text-left px-4 py-2 text-sm !rounded-none ${
                      etiquetaSeleccionada === etiqueta
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {etiqueta}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* cerrar menu al hacer click fuera */}
      {menuAbierto && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setMenuAbierto(false)}
        ></div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mueblesFiltrados.map((mueble: Mueble) => (
          <div
            key={mueble.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
          >
            <div className="relative overflow-hidden">
              <img
                src={mueble.imagenes[0]}
                alt={mueble.descripcion}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              />

              <div className="absolute top-3 right-3 cursor-pointer">
                <FavoriteButton mueble={mueble} />
              </div>

              <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                {mueble.etiqueta}
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                <Link to={`/muebles/${mueble.id}`}>{mueble.descripcion}</Link>
              </h3>

              <p className="text-gray-600 mb-3 line-clamp-2 text-sm">
                {mueble.descripcion}
              </p>

              <div className="mb-3">
                <span className="text-xl font-bold text-gray-900">
                  {formatCurrency(mueble.precioUnitario)}
                </span>
              </div>

              <div className="mb-3">
                <span className="text-xs text-gray-600">
                  Stock: {mueble.stock} unidades
                </span>
              </div>

              <div className="flex gap-2">
                {isAdmin ? (
                  <Link
                    to={`/muebles/${mueble.id}?edit=true`}
                    className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg transition-colors duration-200 font-medium text-sm"
                  >
                    Editar mueble
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      if (isAuthenticated) {
                        addItem({
                          id: mueble.id,
                          title: mueble.descripcion,
                          price: mueble.precioUnitario,
                          quantity: 1,
                          image: mueble.imagenes?.[0],
                        });
                      } else {
                        navigate("/login");
                      }
                    }}
                    className="flex-1 bg-blue-600
                                    hover:bg-blue-700 text-white py-2 px-3
                                    rounded-lg transition-colors duration-200
                                    font-medium text-sm"
                  >
                    Carrito
                  </button>
                )}
                <Link
                  to={`/muebles/${mueble.id}`}
                  className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-[#32368b]! py-2 px-3 rounded-lg transition-colors duration-200 font-medium text-sm"
                >
                  Ver más
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {mueblesFiltrados.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            No se encontraron productos{" "}
            {etiquetaSeleccionada !== "todas" &&
              `con etiqueta "${etiquetaSeleccionada}"`}
          </p>
          <button
            onClick={() => setEtiquetaSeleccionada("todas")}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Ver todos los productos
          </button>
        </div>
      )}
    </div>
  );
}
