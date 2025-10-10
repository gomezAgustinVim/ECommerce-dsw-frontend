import React from 'react';
import { type LineaPedido } from '../types';

type Props = {
  linea: LineaPedido;
  onUpdateCantidad: (id: number, cantidad: number) => void;
  onRemove: (id: number) => void;
};

const ItemCarrito: React.FC<Props> = ({ linea, onUpdateCantidad, onRemove }) => {
  const { mueble, cantidad, subtotal } = linea;

  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center gap-4">
        {mueble.imagenes?.[0] && (
          <img src={mueble.imagenes[0]} alt={mueble.descripcion} className="w-20 h-20 rounded-xl object-cover" />
        )}
        <div>
          <h3 className="font-semibold text-lg">{mueble.descripcion}</h3>
          <p className="text-gray-600">${mueble.precioUnitario.toLocaleString()}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => onUpdateCantidad(linea.id, cantidad - 1)}
          disabled={cantidad <= 1}
        >
          -
        </button>
        <span>{cantidad}</span>
        <button onClick={() => onUpdateCantidad(linea.id, cantidad + 1)}>
          +
        </button>
      </div>

      <div className="w-24 text-right font-semibold">${subtotal.toLocaleString()}</div>

      <button onClick={() => onRemove(linea.id)}>
        eliminar
      </button>
    </div>
  );
};
export default ItemCarrito;