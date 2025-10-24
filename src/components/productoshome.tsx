import api from '../api/axiosInstance';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { type Mueble } from '../types.tsx';

export default function MueblesDestacados() {
    const [mueblesDestacados, setMueblesDestacados] = useState<Mueble[]>([]);

    const fetchMueblesDestacados = async () => {
        try {
            const res = await api.get('/muebles');

            console.log(res.data);
            setMueblesDestacados(res.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchMueblesDestacados();
    }, []);

    const formatearPrecio = (precio: number) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
        }).format(precio);
    };

    return (
        <section className="">
            <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Título de la sección */}
                <div className="text-center mb-12 ">
                    <h2 className="text-3xl font-bold text-[#32368b]! mb-4">
                        PRODUCTOS
                        <br />
                        <span className="text-[#32368b]!">DESTACADOS</span>
                    </h2>
                    <p className="text-lg text-[#32368b]! max-w-2xl mx-auto">
                        acá tendríamos que poner una descripcion.
                    </p>
                </div>

                {/* Grid de muebles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                    {mueblesDestacados.map((mueble) => (
                        <div
                            key={mueble.id}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
                        >
                            {/* Imagen del mueble */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={mueble.imagenes[0]}
                                    alt={mueble.nombre}
                                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                                />

                                {/* Badge de etiqueta */}
                                <div className="absolute top-4 right-4 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                                    {mueble.etiqueta}
                                </div>
                            </div>

                            {/* Contenido del mueble */}
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {mueble.nombre}
                                </h3>

                                <p className="text-gray-600 mb-4 line-clamp-2">
                                    {mueble.descripcion}
                                </p>

                                {/* Precio */}
                                <div className="mb-4">
                                    <span className="text-2xl font-bold text-gray-900">
                                        {formatearPrecio(mueble.precioUnitario)}
                                    </span>
                                </div>

                                {/* Stock */}
                                <div className="mb-4">
                                    <span className="text-sm text-gray-600">
                                        Stock: {mueble.stock} unidades
                                    </span>
                                </div>

                                {/* Botones de acción */}
                                <div className="flex gap-3">
                                    <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium">
                                        Agregar al Carrito
                                    </button>
                                    <Link
                                        to={`/muebles/${mueble.id}`}
                                        className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-[#32368b]! py-2 px-4 rounded-lg transition-colors duration-200 font-medium"
                                    >
                                        Ver más
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link
                        to="/muebles"
                        className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
                    >
                        Ver Todos los Muebles
                    </Link>
                </div>
            </div>
        </section>
    );
}
