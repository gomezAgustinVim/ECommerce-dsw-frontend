import React from 'react';
import { type Item } from '../types';

type Props = {
    item: Item;
    onUpdateCantidad: (id: number, cantidad: number) => void;
    onRemove: (id: number) => void;
};

const ItemCarrito: React.FC<Props> = ({ item, onUpdateCantidad, onRemove }) => {
    const { mueble, cantidad, subtotal } = item;

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
                    onClick={() => onUpdateCantidad(item.id, cantidad - 1)}
                    disabled={cantidad <= 1}
                >
                    -
                </button>
                <span>{cantidad}</span>
                <button onClick={() => onUpdateCantidad(item.id, cantidad + 1)}>
                    +
                </button>
            </div>

            <div className="w-24 text-right font-semibold">${subtotal.toLocaleString()}</div>

            <button onClick={() => onRemove(item.id)}>
                eliminar
            </button>
        </div>
    );
};
export default ItemCarrito;
