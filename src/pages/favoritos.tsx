import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFavoritos } from "../context/favoritosContext";
import { useCarrito } from "../context/carritoContext";
import { formatCurrency } from "../utils/formatCurrency";
import FavoriteButton from "../components/FavoriteButton";
import { type Mueble } from "../types";

export default function Favoritos() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const { favoritos } = useFavoritos();
    const { addItem } = useCarrito();
    const isAdmin = localStorage.getItem("rol") === "admin";

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        } else {
            setIsAuthenticated(true);
        }
    }, [navigate]);

    if (!isAuthenticated) return null;

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Mis Favoritos</h1>

            {favoritos.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-600 text-lg mb-4">No tienes favoritos aún</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {favoritos.map((mueble: Mueble) => (
                        <div
                            key={mueble.id}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className="relative overflow-hidden">
                                <img
                                    src={mueble.imagenes?.[0] || "/imagenes/placeholder.jpg"}
                                    alt={mueble.descripcion}
                                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                                />

                                <div className="absolute top-3 right-3">
                                    <FavoriteButton mueble={mueble} />
                                </div>

                                {mueble.etiqueta && (
                                    <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                                        {mueble.etiqueta}
                                    </div>
                                )}
                            </div>

                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {mueble.descripcion}
                                </h3>

                                <p className="text-gray-600 mb-3 line-clamp-2 text-sm">
                                    {mueble.descripcion || "Sin descripción"}
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
                                        <a
                                            href={`/muebles/${mueble.id}?edit=true`}
                                            className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg transition-colors duration-200 font-medium text-sm"
                                        >
                                            Editar
                                        </a>
                                    ) : (
                                        <button
                                            onClick={() =>
                                                addItem({
                                                    id: mueble.id,
                                                    title: mueble.descripcion,
                                                    price: mueble.precioUnitario,
                                                    quantity: 1,
                                                    image: mueble.imagenes?.[0],
                                                })
                                            }
                                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg transition-colors duration-200 font-medium text-sm"
                                        >
                                            Carrito
                                        </button>
                                    )}
                                    <a
                                        href={`/muebles/${mueble.id}`}
                                        className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-[#32368b]! py-2 px-3 rounded-lg transition-colors duration-200 font-medium text-sm"
                                    >
                                        Ver más
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
