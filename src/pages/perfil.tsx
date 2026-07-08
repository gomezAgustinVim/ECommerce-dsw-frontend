import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { type Cliente } from "../types";

export default function Perfil() {
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editando, setEditando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    direccion: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const clienteId = JSON.parse(localStorage.getItem("clienteId") || "0");
    const fetchPerfil = async () => {
      try {
        const res = await api.get(`/clientes/${clienteId}`);
        const data = res.data.data;
        setCliente(data);
        setForm({
          nombre: data.nombre,
          apellido: data.apellido,
          telefono: data.telefono,
          direccion: data.direccion,
        });
      } catch (err: any) {
        setError(err.response?.data?.message || "Error al obtener el perfil");
      } finally {
        setLoading(false);
      }
    };
    fetchPerfil();
  }, []);

  const handleGuardar = async () => {
    const clienteId = JSON.parse(localStorage.getItem("clienteId") || "0");
    try {
      setGuardando(true);
      const res = await api.patch(`/clientes/${clienteId}`, form);
      setCliente(res.data.data);
      setEditando(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al actualizar el perfil");
    } finally {
      setGuardando(false);
    }
  };

  const handleCerrarSesion = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("clienteId");
    localStorage.removeItem("rol");
    window.location.href = "/";
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-600">
        Cargando perfil...
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
        <p className="text-red-600 font-semibold mb-4">{error}</p>
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 border-2 rounded-md hover:border-blue-800 hover:text-blue-800"
        >
          Iniciar sesión
        </button>
      </div>
    );

  if (!cliente) return null;

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-4 md:p-8">
      <section className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Perfil
        </h1>

        {editando ? (
          <div className="flex flex-col gap-3 text-sm">
            {[
              { label: "Nombre", key: "nombre" },
              { label: "Apellido", key: "apellido" },
              { label: "Teléfono", key: "telefono" },
              { label: "Dirección", key: "direccion" },
            ].map(({ label, key }) => (
              <div key={key}>
                <label className="font-semibold text-gray-700 block mb-1">
                  {label}
                </label>
                <input
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  className="w-full text-gray-900 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3 text-gray-700 text-sm md:text-base">
            <div>
              <span className="font-semibold">Nombre:</span> {cliente.nombre}{" "}
              {cliente.apellido}
            </div>
            <div>
              <span className="font-semibold">Email:</span> {cliente.email}
            </div>
            <div>
              <span className="font-semibold">Teléfono:</span>{" "}
              {cliente.telefono}
            </div>
            <div>
              <span className="font-semibold">Dirección:</span>{" "}
              {cliente.direccion}
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3">
          {editando ? (
            <>
              <button
                onClick={handleGuardar}
                disabled={guardando}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md disabled:opacity-50"
              >
                {guardando ? "Guardando..." : "Guardar cambios"}
              </button>
              <button
                onClick={() => setEditando(false)}
                className="bg-gray-200 hover:bg-gray-300 text-white font-medium py-2 rounded-md"
              >
                Cancelar
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditando(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md"
              >
                Editar perfil
              </button>
              <button
                onClick={handleCerrarSesion}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-md"
              >
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
