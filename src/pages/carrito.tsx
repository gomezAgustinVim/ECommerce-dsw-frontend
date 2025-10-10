import React, { useEffect, useState } from 'react';
import { type Pedido } from '../types';
import ItemCarrito from '../components/itemCarrito';

const API_URL = 'http://localhost:3000/carrito'; // ajustar

const Carrito: React.FC = () => {
  const clienteId = 1; // se toma del usuario logueado
  const [carrito, setCarrito] = useState<Pedido | null>(
    /*
    quizá para probar sin backend
    {
      id: 101,
      cliente: { id: 10, nombre: "Santino" },
      estado: "en carrito",
      fechaHora: "2025-10-10T12:30:00Z",
      total: 70000,
      lineas: [
        {
          id: 1,
          mueble: {
            id: 1,
            descripcion: "Silla de madera",
            precioUnitario: 15000,
            etiqueta: '',
            stock: 0
          },
          cantidad: 2,
          subtotal: 30000,
          estado: "en carrito"
        },
        {
          id: 2,
          mueble: {
            id: 2,
            descripcion: "Mesa ratona",
            precioUnitario: 40000,
            etiqueta: '',
            stock: 0
          },
          cantidad: 1,
          subtotal: 40000,
          estado: "en carrito"
        }
      ]
    } 
    */
  ); /* useState<Pedido | null>(null) */
  const [loading, setLoading] = useState(true);

  // Cargar carrito
  useEffect(() => {
    fetch(`${API_URL}/${clienteId}`)
      .then(res => res.json())
      .then(data => setCarrito(data))
      .finally(() => setLoading(false));
  }, []);

  // funciones para el carrito
  const actualizarCantidad = async (lineaId: number, cantidad: number) => {
    if (!carrito) return;
    const res = await fetch(`${API_URL}/linea/${lineaId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cantidad }),
    });
    const actualizado = await res.json();
    setCarrito(actualizado);
  };

  const eliminarLinea = async (lineaId: number) => {
    const res = await fetch(`${API_URL}/linea/${lineaId}`, { method: 'DELETE' });
    const actualizado = await res.json();
    setCarrito(actualizado);
  };

  const confirmarPedido = async () => {
    if (!carrito) return;
    const res = await fetch(`${API_URL}/${carrito.id}/confirmar`, { method: 'POST' });
    const confirmado = await res.json();
    alert('✅ Pedido confirmado');
    setCarrito(confirmado);
  };

  // Renderizado
  if (loading) return <p>Cargando carrito...</p>;
  if (!carrito) return <p>No hay carrito activo.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">🛒 Tu carrito</h2>

      {carrito.lineas.map((linea) => (
        <ItemCarrito
          key={linea.id}
          linea={linea}
          onUpdateCantidad={actualizarCantidad}
          onRemove={eliminarLinea}
        />
      ))}

      <div className="flex justify-between items-center mt-8 border-t pt-4">
        <h3 className="text-xl font-semibold">Total:</h3>
        <span className="text-2xl font-bold text-green-700">${carrito.total.toLocaleString()}</span>
      </div>

      <div className="mt-6 text-right">
        <button
          disabled={carrito.lineas.length === 0}
          onClick={confirmarPedido}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Confirmar pedido
        </button>
      </div>
    </div>
  );
};
export default Carrito;