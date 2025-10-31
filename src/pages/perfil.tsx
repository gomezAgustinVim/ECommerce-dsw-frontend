import { useEffect, useState } from "react";
import api from "../api/axiosInstance";

interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  direccion: string;
  fechaRegistro?: string;
}

export default function Perfil() {
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const clienteId = JSON.parse(localStorage.getItem("clienteId") || "[]");
        if (!clienteId) {
          setError("No hay una sesión activa. Inicia sesión para ver tu perfil.");
          setLoading(false);
          return;
        }

        const res = await api.get(`/clientes/${clienteId}`);
        setCliente(res.data.data);
      } catch (err: any) {
        setError(err.response?.data?.message || "Error al obtener los datos del cliente");
      } finally {
        setLoading(false);
      }
    };

    fetchCliente();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-600">
        Cargando perfil...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
        <p className="text-red-600 font-semibold mb-4">{error}</p>
        <a
          href="/login"
          className="text-blue-600 hover:underline font-medium"
        >
          Ir a iniciar sesión
        </a>
      </div>
    );
  }

  if (!cliente) return null;

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-4 md:p-8">
      <section className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Perfil del Cliente
        </h1>

        <div className="flex flex-col gap-3 text-gray-700 text-sm md:text-base">
          <div>
            <span className="font-semibold">Nombre:</span> {cliente.nombre} {cliente.apellido}
          </div>
          <div>
            <span className="font-semibold">Email:</span> {cliente.email}
          </div>
          <div>
            <span className="font-semibold">Teléfono:</span> {cliente.telefono}
          </div>
          <div>
            <span className="font-semibold">Dirección:</span> {cliente.direccion}
          </div>
          {cliente.fechaRegistro && (
            <div>
              <span className="font-semibold">Fecha de registro:</span>{" "}
              {new Date(cliente.fechaRegistro).toLocaleDateString()}
            </div>
          )}
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => alert("Función editar aún no implementada")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md"
          >
            Editar perfil
          </button>

          <button
            onClick={() => {
              localStorage.removeItem("clienteId");
              window.location.href = "/";
            }}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-md"
          >
            Cerrar sesión
          </button>
        </div>
      </section>
    </main>
  );
}
