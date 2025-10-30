import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import api from '../api/axiosInstance';
import { type Mueble } from '../types';

export default function Busqueda() {
    const location = useLocation();
    const [resultados, setResultados] = useState<Mueble[]>([]);
    const [termino, setTermino] = useState("");
    const [todosLosMuebles, setTodosLosMuebles] = useState<Mueble[]>([]);

    // Cargar todos los muebles al montar el componente
    useEffect(() => {
        const fetchTodosLosMuebles = async () => {
            try {
                const res = await api.get('/muebles');
                const muebles = res.data.data;
                setTodosLosMuebles(muebles);
            } catch (err) {
                console.error('Error cargando muebles:', err);
            }
        };

        fetchTodosLosMuebles();
    }, []);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get('q') || '';
        setTermino(query);

        if (query && todosLosMuebles.length > 0) {
            // filtra en frontend 
            const filtered = todosLosMuebles.filter(mueble => {  
                const nombre = mueble.nombre?.toLowerCase() || ''; // Validación con ?. para campos que pueden ser undefined
                const descripcion = mueble.descripcion?.toLowerCase() || '';
                const etiqueta = mueble.etiqueta?.toLowerCase() || '';
                const queryLower = query.toLowerCase();

                return (
                    nombre.includes(queryLower) ||
                    descripcion.includes(queryLower) ||
                    etiqueta.includes(queryLower)
                );
            });
            setResultados(filtered);
            console.log("Búsqueda:", query, "Resultados:", filtered);
        } else {
            setResultados([]);
        }
    }, [location.search, todosLosMuebles]);

    const formatearPrecio = (precio: number) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
        }).format(precio);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">
                {termino ? `Resultados para: "${termino}"` : "Buscar productos"}
            </h1>

            {resultados.length === 0 && termino ? (
                <p className="text-gray-600">No se encontraron resultados para "{termino}"</p>
            ) : resultados.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {resultados.map((mueble: Mueble) => (
                        <div
                            key={mueble.id}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
                        >
                            {/* foto del mueble */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={mueble.imagenes?.[0] || '/imagenes/placeholder.jpg'}
                                    alt={mueble.nombre}
                                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                                />

                                {/* etiqueta */}
                                {mueble.etiqueta && (
                                    <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                                        {mueble.etiqueta}
                                    </div>
                                )}
                            </div>

                            {/* Contenido */}
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {mueble.nombre}
                                </h3>

                                <p className="text-gray-600 mb-3 line-clamp-2 text-sm">
                                    {mueble.descripcion || 'Sin descripción'}
                                </p>

                                {/* Precio */}
                                <div className="mb-3">
                                    <span className="text-xl font-bold text-gray-900">
                                        {formatearPrecio(mueble.precioUnitario)}
                                    </span>
                                </div>

                                {/* Stock */}
                                <div className="mb-3">
                                    <span className="text-xs text-gray-600">
                                        Stock: {mueble.stock} unidades
                                    </span>
                                </div>

                                {/* Botones */}
                                <div className="flex gap-2">
                                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg transition-colors duration-200 font-medium text-sm">
                                        Carrito
                                    </button>
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
            ) : (
                <p className="text-gray-600">Ingresa un término de búsqueda</p>
            )}
        </div>
    );
}