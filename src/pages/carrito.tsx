import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { type CartItem } from "../types";

export default function Carrito() {
    const [items, setItems] = useState<CartItem[]>([
        { id: 1, title: "Producto 1", price: 1200, quantity: 1, image: "/imagenes/producto1.png" },
        { id: 2, title: "Producto 2", price: 850, quantity: 2, image: "/imagenes/producto2.png" },
    ]);

    const updateQty = (id: number, qty: number) =>
        setItems((prev) => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, qty) } : i));

    const removeItem = (id: number) => setItems((prev) => prev.filter(i => i.id !== id));

    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const shipping = subtotal > 0 ? 150 : 0;
    const total = subtotal + shipping;

    const navigate = useNavigate();

    // const finalizarCompra = async () => {
    //     try {
    //         const clienteId = 1; // 🔸 simulación, debería venir del login o contexto
    //         const pedidoItems = items.map((i) => ({
    //             mueble: i.id,
    //             cantidad: i.quantity,
    //         }));
    //
    //         await crearPedido(clienteId, pedidoItems);

    //         setItems([]);
    //         localStorage.removeItem("carrito");
    //         navigate("/mis-pedidos");
    //     } catch (error) {
    //         console.error("Error al finalizar compra:", error);
    //         alert("Hubo un error al procesar el pedido.");
    //     }
    // };

    return (
        <section className="max-w-4xl mx-auto bg-gray-50 p-6 rounded-2xl shadow-lg my-10">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Carrito de Compras</h2>

            {items.length === 0 ? (
                <p className="text-gray-600">Tu carrito está vacío.</p>
            ) : (
                <ul className="space-y-4">
                    {items.map(item => (
                        <li
                            key={item.id}
                            className="flex items-center justify-between bg-white rounded-xl shadow p-4"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-20 h-20 object-cover rounded-lg"
                                />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800">
                                    {item.title}
                                </h3>
                                <p className="text-gray-500">${item.price.toLocaleString()}</p>
                            </div>

                            <div
                                className="flex items-center gap-6"
                            >
                                <label className="text-gray-700 font-medium">Cantidad:</label>
                                <input
                                    type="number"
                                    value={item.quantity}
                                    min={1}
                                    onChange={(e) => updateQty(item.id, Number(e.target.value))}
                                    className="w-16 text-center border rounded-md border-gray-300 text-gray-700 focus:ring-2 focus:ring-indigo-500"
                                />
                                <div
                                    className="text-right font-bold text-gray-800 w-24">
                                    ${(item.price * item.quantity).toLocaleString()}
                                </div>
                                <button onClick={() => removeItem(item.id)}
                                    className="text-sm text-white hover:underline"
                                >Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <div className="mt-8 text-right space-y-2">
                <p className="text-gray-700">
                    Subtotal:{" "}
                    <span className="font-semibold text-gray-900">
                        ${subtotal.toLocaleString()}
                    </span>
                </p>
                <p className="text-gray-700">
                    Envío:{" "}
                    <span className="font-semibold text-gray-900">
                        ${shipping.toLocaleString()}
                    </span>
                </p>
                <p className="text-xl font-bold text-gray-900">
                    Total: ${total.toLocaleString()}
                </p>

                <div className="mt-6 flex justify-end gap-4">
                    <button
                        onClick={() => navigate("/")}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium"
                    >
                        Continuar comprando
                    </button>
                    <button
                        // onClick={finalizarCompra} sin logica todavia
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium"
                    >
                        Finalizar compra
                    </button>
                </div>
            </div>
        </section >
    );
}
