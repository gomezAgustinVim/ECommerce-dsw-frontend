import { useState } from "react";

type CartItem = {
    id: string;
    title: string;
    price: number;
    quantity: number;
    image?: string;
};

export default function Carrito() {
    const [items, setItems] = useState<CartItem[]>([
        { id: "p1", title: "Producto 1", price: 1200, quantity: 1, image: "/imagenes/producto1.png" },
        { id: "p2", title: "Producto 2", price: 850, quantity: 2, image: "/imagenes/producto2.png" },
    ]);

    const updateQty = (id: string, qty: number) =>
        setItems((prev) => prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, qty) } : i));

    const removeItem = (id: string) => setItems((prev) => prev.filter(i => i.id !== id));

    const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
    const shipping = subtotal > 0 ? 150 : 0;
    const total = subtotal + shipping;

    return (
        <article>
            <h2 className="text-3xl font-bold mb-4">Carrito de Compras</h2>

            <ul>
                {items.map(item => (
                    <li key={item.id} style={{ display: "flex", gap: 12, alignItems: "center", padding: 12, borderRadius: 8, background: "#fff", marginBottom: 8 }}>
                        <img src={item.image} alt={item.title} style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 6 }} />
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700 }}>{item.title}</div>
                            <div style={{ color: "#666" }}>${item.price.toFixed(2)}</div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ marginRight: 6 }}>Cantidad:</span>
                            <input
                                type="number"
                                value={item.quantity}
                                min={1}
                                onChange={(e) => updateQty(item.id, Number(e.target.value))}
                                style={{
                                    width: 64,
                                    padding: 6,
                                    borderRadius: 6,
                                    border: "1px solid #060000ff",
                                    color: "#000000",
                                    background: "#ffffff"
                                }}
                            />
                            <div style={{ width: 100, textAlign: "right", fontWeight: 700 }}>${(item.price * item.quantity).toFixed(2)}</div>
                            <button onClick={() => removeItem(item.id)} style={{ marginLeft: 12 }}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>

            <div style={{ marginTop: 16, textAlign: "right" }}>
                <div>Subtotal: ${subtotal.toFixed(2)}</div>
                <div>Envío: ${shipping.toFixed(2)}</div>
                <div style={{ fontWeight: 800, marginTop: 8 }}>Total: ${total.toFixed(2)}</div>
                <div style={{ marginTop: 12 }}>
                    <button style={{ padding: "8px 14px", borderRadius: 8, marginRight: 8 }}>Continuar comprando</button>
                    <button style={{ padding: "8px 14px", borderRadius: 8, background: "#535bf2", color: "#fff", border: "none" }}>Finalizar compra</button>
                </div>
            </div>
        </article>
    );
}
