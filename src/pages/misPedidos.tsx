import { useCallback, useEffect, useRef, useState } from "react";
import api from "../api/axiosInstance";
import { formatCurrency } from "../utils/formatCurrency";

const ESTADOS = [
  "pendiente",
  "confirmado",
  "pagado",
  "enviado",
  "entregado",
  "cancelado",
] as const;

type PedidoItem = {
  cantidad: number;
  subtotal: number;
  mueble: { descripcion: string };
};

function getItems(ped: { items?: PedidoItem[] }): PedidoItem[] {
  return Array.isArray(ped.items) ? ped.items : [];
}

function estadoBadgeClass(estado: string) {
  switch (estado) {
    case "pendiente":
      return "bg-yellow-200 text-yellow-800";
    case "confirmado":
      return "bg-blue-200 text-blue-800";
    case "pagado":
      return "bg-green-200 text-green-800";
    case "cancelado":
      return "bg-red-200 text-red-800";
    default:
      return "bg-gray-200 text-gray-800";
  }
}

export default function MisPedidos() {
  const isAdmin = localStorage.getItem("rol") === "admin";
  const isFirstLoad = useRef(true);

  const [pedidos, setPedidos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);
  const [pagandoId, setPagandoId] = useState<number | null>(null);
  const [actualizandoEstadoId, setActualizandoEstadoId] = useState<
    number | null
  >(null);

  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [estado, setEstado] = useState("");

  const fetchPedidos = useCallback(async () => {
    if (isFirstLoad.current) {
      setLoading(true);
    } else {
      setRefreshing(true);
    }
    setError("");
    try {
      if (isAdmin) {
        const params: Record<string, string> = {};
        if (fechaDesde) params.fechaDesde = fechaDesde;
        if (fechaHasta) params.fechaHasta = fechaHasta;
        if (estado) params.estado = estado;
        const res = await api.get("/pedidos/admin", { params });
        setPedidos(res.data.data);
      } else {
        const clienteId = JSON.parse(localStorage.getItem("clienteId") || "0");
        const res = await api.get(`/pedidos/${clienteId}`);
        setPedidos(res.data.data);
      }
    } catch (err: any) {
      setError("No se pudieron cargar los pedidos");
      console.error("No se pudieron cargar los pedidos", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
      isFirstLoad.current = false;
    }
  }, [isAdmin, fechaDesde, fechaHasta, estado]);

  useEffect(() => {
    fetchPedidos();
  }, [fetchPedidos]);

  const handlePagar = async (pedidoId: number) => {
    try {
      setPagandoId(pedidoId);
      const res = await api.post(`/pagos/${pedidoId}`);
      window.location.href = res.data.checkoutUrl;
    } catch (err: any) {
      console.error("Error al crear preferencia de pago", err);
      alert("No se pudo iniciar el pago. Intentá de nuevo.");
    } finally {
      setPagandoId(null);
    }
  };

  // Corregir el body del patch
  const handleCambiarEstado = async (
    pedidoId: number,
    estadoActual: string,
  ) => {
    if (!isAdmin) return;
    const siguienteEstado =
      estadoActual === "pendiente" ? "confirmado" : "enviado";
    try {
      setActualizandoEstadoId(pedidoId);
      await api.patch(`/pedidos/${pedidoId}/estado`, {
        estado: siguienteEstado,
      }); // ← fix
      await fetchPedidos();
    } catch (err: any) {
      alert("No se pudo actualizar el estado del pedido.");
    } finally {
      setActualizandoEstadoId(null);
    }
  };

  // Agregar cancelar pedido
  const handleCancelar = async (pedidoId: number) => {
    if (!confirm("¿Cancelar este pedido?")) return;
    try {
      await api.patch(`/pedidos/${pedidoId}/cancelar`);
      await fetchPedidos();
    } catch (err: any) {
      alert(err.response?.data?.message || "No se pudo cancelar el pedido.");
    }
  };

  const limpiarFiltros = () => {
    setFechaDesde("");
    setFechaHasta("");
    setEstado("");
  };

  const toggleExpand = (id: number) =>
    setExpanded((prev) => (prev === id ? null : id));

  if (loading) return <p className="text-center py-8">Cargando pedidos...</p>;
  if (error) return <p className="text-center py-8 text-red-600">{error}</p>;

  return (
    <section className="max-w-4xl mx-auto p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-900">
        {isAdmin ? "Pedidos" : "Mis Pedidos"}
      </h1>

      {isAdmin && (
        <div className="bg-white shadow rounded-lg p-4 mb-6 border border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label
                htmlFor="fecha-desde"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Fecha desde
              </label>
              <input
                id="fecha-desde"
                type="date"
                value={fechaDesde}
                onChange={(e) => setFechaDesde(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg text-gray-900"
              />
            </div>
            <div>
              <label
                htmlFor="fecha-hasta"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Fecha hasta
              </label>
              <input
                id="fecha-hasta"
                type="date"
                value={fechaHasta}
                onChange={(e) => setFechaHasta(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg text-gray-900"
              />
            </div>
            <div>
              <label
                htmlFor="estado-pedido"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Estado
              </label>
              <select
                id="estado-pedido"
                value={estado}
                onChange={(e) => setEstado(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg text-gray-900"
              >
                <option value="">Todos</option>
                {ESTADOS.map((e) => (
                  <option key={e} value={e}>
                    {e.charAt(0).toUpperCase() + e.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={limpiarFiltros}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-900"
              >
                Limpiar filtros
              </button>
            </div>
          </div>
          {refreshing && (
            <p className="text-sm text-gray-500 mt-3">Actualizando...</p>
          )}
        </div>
      )}

      {pedidos.length === 0 ? (
        <p className="text-center py-8 text-gray-600">
          {isAdmin
            ? "No hay pedidos con esos filtros."
            : "No tenés pedidos aún."}
        </p>
      ) : (
        <div className="space-y-4">
          {pedidos.map((ped) => {
            const items = getItems(ped);

            return (
              <div
                key={ped.id}
                className="bg-white shadow rounded-lg p-4 border border-gray-200"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-500">
                      Pedido #{ped.id} —{" "}
                      {new Date(ped.fechaHora).toLocaleDateString()}
                    </p>
                    {isAdmin && ped.usuario && (
                      <p className="text-sm text-gray-700">
                        Cliente: {ped.usuario.nombre} {ped.usuario.apellido} (
                        {ped.usuario.email})
                      </p>
                    )}
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-md ${estadoBadgeClass(ped.estado)}`}
                    >
                      {ped.estado.toUpperCase()}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 mt-2 sm:mt-0">
                    <p className="text-lg font-bold text-gray-900">
                      {formatCurrency(ped.total)}
                    </p>

                    {!isAdmin && ped.estado === "pendiente" && (
                      <button
                        type="button"
                        onClick={() => handlePagar(ped.id)}
                        disabled={pagandoId === ped.id}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg disabled:opacity-50"
                      >
                        {pagandoId === ped.id ? "Procesando..." : "Pagar"}
                      </button>
                    )}

                    {!isAdmin &&
                      (ped.estado === "pendiente" ||
                        ped.estado === "confirmado") && (
                        <button
                          type="button"
                          onClick={() => handleCancelar(ped.id)}
                          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg"
                        >
                          Cancelar
                        </button>
                      )}

                    {isAdmin &&
                      (ped.estado === "pendiente" ||
                        ped.estado === "pagado") && (
                        <button
                          type="button"
                          onClick={() =>
                            handleCambiarEstado(ped.id, ped.estado)
                          }
                          disabled={actualizandoEstadoId === ped.id}
                          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-lg disabled:opacity-50"
                        >
                          {actualizandoEstadoId === ped.id
                            ? "Actualizando..."
                            : ped.estado === "pendiente"
                              ? "Confirmar pedido"
                              : "Marcar como enviado"}
                        </button>
                      )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleExpand(ped.id)}
                  className="mt-3 text-sm text-blue-700 hover:underline"
                >
                  {expanded === ped.id ? "Ocultar detalles" : "Ver detalles"}
                </button>

                {expanded === ped.id && (
                  <ul className="mt-3 space-y-2">
                    {items.length === 0 ? (
                      <li className="text-sm text-gray-500">
                        Sin items en este pedido.
                      </li>
                    ) : (
                      items.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex justify-between text-sm text-gray-800 bg-gray-50 p-2 rounded-lg"
                        >
                          <span>
                            {item.mueble.descripcion} x {item.cantidad}
                          </span>
                          <span className="font-semibold">
                            {formatCurrency(Number(item.subtotal))}
                          </span>
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
