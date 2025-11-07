import api from '../api/axiosInstance';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { type Mueble } from '../types.tsx';
import { formatCurrency } from '../utils/formatCurrency';
import { useCarrito } from '../context/carritoContext';

export default function TodosLosMuebles() {
    const [todosLosMuebles, setTodosLosMuebles] = useState<Mueble[]>([]);
    const [etiquetas, setEtiquetas] = useState<string[]>([]);
    const [etiquetaSeleccionada, setEtiquetaSeleccionada] = useState<string>('todas');
    const [mueblesFiltrados, setMueblesFiltrados] = useState<Mueble[]>([]);
    const [menuAbierto, setMenuAbierto] = useState(false);
    const { addItem } = useCarrito();

    const fetchTodosLosMuebles = async () => {
        try {
            const res = await api.get('/muebles');
            console.log(res.data);
            const muebles = res.data.data;
            setTodosLosMuebles(muebles);
            setMueblesFiltrados(muebles);

            // Extraer etiquetas únicas de los muebles (en lugar de categorías)
            const etiquetasUnicas = [...new Set(muebles.map((mueble: Mueble) => mueble.etiqueta))] as string[];
            setEtiquetas(etiquetasUnicas);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchTodosLosMuebles();
    }, []);

    // Filtra muebles cuando cambia la etiqueta seleccionada
    useEffect(() => {
        if (etiquetaSeleccionada === 'todas') {
            setMueblesFiltrados(todosLosMuebles);
        } else {
            const filtrados = todosLosMuebles.filter(
                (mueble: Mueble) => mueble.etiqueta === etiquetaSeleccionada
            );
            setMueblesFiltrados(filtrados);
        }
    }, [etiquetaSeleccionada, todosLosMuebles]);

    return (
        <section className="">
            <div className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* filtros por etiqueta  */}
                <div className="mb-8 flex justify-between items-center">
                    {/* contador */}
                    <div className="text-gray-600">
                        {mueblesFiltrados.length} productos
                        {etiquetaSeleccionada !== 'todas' && ` de "${etiquetaSeleccionada}"`}
                    </div>

                    {/* Menú desplegable de cat */}
                    <div className="relative">
                        <button
                            onClick={() => setMenuAbierto(!menuAbierto)}
                            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            {/* hamburguesa */}
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
                                    <button
                                        onClick={() => {
                                            setEtiquetaSeleccionada('todas');
                                            setMenuAbierto(false);
                                        }}
                                        className={`block w-full text-left px-4 py-2 text-sm ${etiquetaSeleccionada === 'todas'
                                            ? 'bg-blue-100 text-white-700!'
                                            : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                    >
                                        Todas las categorías
                                    </button>

                                    {etiquetas.map((etiqueta: string) => (
                                        <button
                                            key={etiqueta}
                                            onClick={() => {
                                                setEtiquetaSeleccionada(etiqueta);
                                                setMenuAbierto(false);
                                            }}
                                            className={`block w-full text-left px-4 py-2 text-sm ${etiquetaSeleccionada === etiqueta
                                                ? 'bg-blue-100 text-blue-700'
                                                : 'text-gray-700 hover:bg-gray-100'
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

                {/* todos los productos */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {mueblesFiltrados.map((mueble: Mueble) => (
                        <div
                            key={mueble.id}
                            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
                        >
                            {/* foto del mueble */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={mueble.imagenes[0]}
                                    alt={mueble.descripcion}
                                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                                />

                                {/* etiqueta */}
                                <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                                    {mueble.etiqueta}
                                </div>
                            </div>

                            {/* contenido */}
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                    {mueble.descripcion.split(' ')[0] + ' ' + mueble.descripcion.split(' ')[2]}
                                </h3>

                                <p className="text-gray-600 mb-3 line-clamp-2 text-sm">
                                    {mueble.descripcion}
                                </p>

                                {/* Precio */}
                                <div className="mb-3">
                                    <span className="text-xl font-bold text-gray-900">
                                        {formatCurrency(mueble.precioUnitario)}
                                    </span>
                                </div>

                                {/* stock */}
                                <div className="mb-3">
                                    <span className="text-xs text-gray-600">
                                        Stock: {mueble.stock} unidades
                                    </span>
                                </div>

                                {/* botones */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() =>
                                            addItem({
                                                id: mueble.id,
                                                title: mueble.descripcion,
                                                price: mueble.precioUnitario,
                                                quantity: 1,
                                                image: mueble.imagenes?.[0]
                                            })
                                        }
                                        className="flex-1 bg-blue-600
                                    hover:bg-blue-700 text-white py-2 px-3
                                    rounded-lg transition-colors duration-200
                                    font-medium text-sm">
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

                {/* mensaje si no hay productos */}
                {mueblesFiltrados.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            No se encontraron productos {etiquetaSeleccionada !== 'todas' && `con etiqueta "${etiquetaSeleccionada}"`}
                        </p>
                        <button
                            onClick={() => setEtiquetaSeleccionada('todas')}
                            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
                        >
                            Ver todos los productos
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
