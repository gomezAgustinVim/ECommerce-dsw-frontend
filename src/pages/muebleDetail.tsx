import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axiosInstance';
import { useCarrito } from '../context/carritoContext';
import { formatCurrency } from '../utils/formatCurrency';
import { type Mueble } from '../types';

export default function MuebleDetail() {
    const { id } = useParams<{ id: string }>();
    const [mueble, setMueble] = useState<Mueble>();
    const [loading, setLoading] = useState(true);
    const { addItem } = useCarrito();

    useEffect(() => {
        const fetchMueble = async () => {
            try {
                const res = await api.get(`/muebles/${id}`);

                setMueble(res.data.data);
            } catch (err) {
                console.error('Error al obtener el mueble:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMueble();
    }, [id]);

    if (loading) return <p className="text-center py-10">Cargando...</p>;
    if (!mueble)
        return (
            <p className="text-center py-10 text-gray-700">
                No se encontró el mueble.
            </p>
        );

    return (
        <section className="min-h-screen flex flex-col items-center justify-start p-4 sm:p-6 bg-gray-50">
            <div className="max-w-3xl w-full p-6 sm:p-10 rounded-2xl">
                <h1 className="text-2xl sm:text-4xl font-bold text-center text-indigo-700 mb-6">
                    {mueble.descripcion}
                </h1>

                {/* Imagen(es) */}
                <div className="flex flex-col items-center gap-3 mb-6">
                    {mueble.imagenes.length > 1 ? (
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                            {mueble.imagenes.map((i, idx) => (
                                <img
                                    key={idx}
                                    src={i}
                                    alt={mueble.descripcion}
                                    className="w-full h-40 object-cover rounded-lg shadow"
                                />
                            ))}
                        </div>
                    ) : (
                        <img
                            src={mueble.imagenes[0]}
                            alt={mueble.descripcion}
                            className="w-full max-h-[450px] object-cover rounded-lg shadow"
                        />
                    )}
                </div>

                <div className="space-y-2 text-gray-700 text-center sm:text-left">
                    <p>
                        <strong>Etiqueta:</strong> {mueble.etiqueta}
                    </p>
                    <p>
                        <strong>Precio:</strong> {formatCurrency(mueble.precioUnitario)}
                    </p>
                    <p>
                        <strong>Stock:</strong> {mueble.stock}
                    </p>
                    <p>
                        <strong>Categoría:</strong> {mueble.categoria.nombre}
                    </p>
                    <p>
                        <strong>Material:</strong> {mueble.material.nombre}
                    </p>
                </div>

                <div className="mt-4 gap-2 flex flex-col justify-center sm:justify-start sm:flex-row">
                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-2 bg-red-500 text-white font-medium
                        rounded-lg shadow hover:bg-red-600 transition w-full
                        sm:w-auto"
                    >
                        ← Volver
                    </button>
                    <button
                        // onClick={agregarAlCarrito}
                        onClick={() =>
                            addItem({
                                id: mueble.id,
                                title: mueble.descripcion,
                                price: mueble.precioUnitario,
                                quantity: 1,
                                image: mueble.imagenes?.[0],
                            })
                        }
                        className="px-6 py-2 bg-red-500 text-white font-medium
                        rounded-lg shadow hover:bg-red-600 transition w-full
                        sm:w-auto"
                    >
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </section>
    );
}
