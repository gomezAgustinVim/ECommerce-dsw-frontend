import api from '../api/axiosInstance';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { type Mueble } from '../types.tsx';

export default function TodosLosMuebles() {
    const [todosLosMuebles, setTodosLosMuebles] = useState<Mueble[]>([]);

    const fetchTodosLosMuebles = async () => {
        try {
            const res = await api.get('/muebles');
            console.log(res.data);
            setTodosLosMuebles(res.data.data); // ← Sin filtro, TODOS los muebles
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchTodosLosMuebles();
    }, []);

    const formatearPrecio = (precio: number) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
        }).format(precio);
    };

    return (
        <section className="">
            <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Grid de muebles - Todos los productos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {todosLosMuebles.map((mueble) => (
                        <div
                            key={mueble.id}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
                        >
                            {/* Imagen del mueble */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={mueble.imagenes[0]}
                                    alt={mueble.nombre}
                                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                                />

                                {/* Badge de etiqueta */}
                                <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                                    {mueble.etiqueta}
                                </div>
                            </div>

                            {/* Contenido del mueble */}
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {mueble.nombre}
                                </h3>

                                <p className="text-gray-600 mb-3 line-clamp-2 text-sm">
                                    {mueble.descripcion}
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

                                {/* Botones de acción */}
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

                {/* Mensaje si no hay productos */}
                {todosLosMuebles.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No se encontraron productos</p>
                    </div>
                )}
            </div>
        </section>
    );
}