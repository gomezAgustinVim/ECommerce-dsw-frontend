import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { formatCurrency } from "../utils/formatCurrency";
import { useCarrito } from "../context/carritoContext";

export default function MisPedidos() {
    const [pedidos, setPedidos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [expanded, setExpanded] = useState<number | null>(null);

    // temporal hasta login real
    const clienteId = 2;

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const res = await api.get(`/pedidos/${clienteId}`);
                setPedidos(res.data.data);
            } catch (err) {
                setError("No se pudieron cargar los pedidos");
            } finally {
                setLoading(false);
            }
        };

        fetchPedidos();
    }, []);

    if (loading) return <p className="text-center py-8">Cargando pedidos...</p>;
    if (error) return <p className="text-center py-8 text-red-600">{error}</p>;

    if (pedidos.length === 0)
        return <p className="text-center py-8 text-gray-600">No tenés pedidos aún.</p>;

    const toggleExpand = (id: number) =>
        setExpanded(prev => (prev === id ? null : id));

    return (
        <section className="max-w-4xl mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-indigo-700 text-center">
                Mis Pedidos
            </h1>

            <div className="space-y-4">
                {pedidos.map(ped => (
                    <div
                        key={ped.id}
                        className="bg-white shadow rounded-lg p-4 border border-gray-200"
                    >
                        {/* Header row */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                            <div className="space-y-1">
                                <p className="text-sm text-gray-500">
                                    Pedido #{ped.id} — {new Date(ped.fechaHora).toLocaleDateString()}
                                </p>

                                <span
                                    className={`px-2 py-1 text-xs font-semibold rounded-md ${ped.estado === "pendiente"
                                        ? "bg-yellow-200 text-yellow-800"
                                        : ped.estado === "confirmado"
                                            ? "bg-blue-200 text-blue-800"
                                            : ped.estado === "pagado"
                                                ? "bg-green-200 text-green-800"
                                                : ped.estado === "cancelado"
                                                    ? "bg-red-200 text-red-800"
                                                    : "bg-gray-200 text-gray-800"
                                        }`}
                                >
                                    {ped.estado.toUpperCase()}
                                </span>
                            </div>

                            <p className="text-lg font-bold text-gray-900 mt-2 sm:mt-0">
                                {formatCurrency(ped.total)}
                            </p>
                        </div>

                        {/* Toggle items */}
                        <button
                            onClick={() => toggleExpand(ped.id)}
                            className="mt-3 text-sm text-indigo-600 hover:underline"
                        >
                            {expanded === ped.id ? "Ocultar detalles" : "Ver detalles"}
                        </button>

                        {/* Items list */}
                        {expanded === ped.id && (
                            <ul className="mt-3 space-y-2">
                                {ped.items.map((item: any, idx: number) => (
                                    <li
                                        key={idx}
                                        className="flex justify-between text-sm bg-gray-50 p-2 rounded-lg"
                                    >
                                        <span>{item.mueble.descripcion} × {item.cantidad}</span>
                                        <span className="font-semibold">
                                            ${item.subtotal.toLocaleString()}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
