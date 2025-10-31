import { createContext, useContext, useEffect, useState } from "react";
import { type CartItem } from "../types";

type CarritoContextType = {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (id: number) => void;
    updateQty: (id: number, qty: number) => void;
    clearCart: () => void;
    count: number;
};

const CarritoContext = createContext<CarritoContextType | null>(null);

export const CarritoProvider = ({ children }: { children: React.ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>(() => {
        const stored = localStorage.getItem("carrito");
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem("carrito", JSON.stringify(items));
    }, [items]);

    const addItem = (item: CartItem) => {
        setItems(prev => {
            const existing = prev.find(p => p.id === item.id);
            if (existing) {
                return prev.map(p =>
                    p.id === item.id ? { ...p, quantity: p.quantity + item.quantity } : p
                );
            }
            return [...prev, item];
        });
    };

    const removeItem = (id: number) =>
        setItems(prev => prev.filter(i => i.id !== id));

    const updateQty = (id: number, qty: number) =>
        setItems(prev =>
            prev.map(i => (i.id === id ? { ...i, quantity: Math.max(1, qty) } : i))
        );

    const clearCart = () => setItems([]);

    const count = items.reduce((acc, i) => acc + i.quantity, 0);

    return (
        <CarritoContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, count }}>
            {children}
        </CarritoContext.Provider>
    );
};

export const useCarrito = () => {
    const ctx = useContext(CarritoContext);
    if (!ctx) throw new Error("useCarrito debe usarse dentro de CarritoProvider");
    return ctx;
};
