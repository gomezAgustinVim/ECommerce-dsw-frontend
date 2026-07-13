import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { type Mueble } from "../types";

type FavoritosContextType = {
    favoritos: Mueble[];
    isFavorite: (id: number) => boolean;
    toggleFavorito: (mueble: Mueble) => Promise<void>;
    loading: boolean;
};

const FavoritosContext = createContext<FavoritosContextType | null>(null);

export const FavoritosProvider = ({ children }: { children: React.ReactNode }) => {
    const [favoritos, setFavoritos] = useState<Mueble[]>([]);
    const [loading, setLoading] = useState(false);

    const clienteId = localStorage.getItem("clienteId");
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token && clienteId) {
            cargarFavoritos();
        }
    }, [token, clienteId]);

    const cargarFavoritos = async () => {
        try {
            setLoading(true);
            const res = await api.get(`/clientes/${clienteId}/favoritos/`);
            const muebles = res.data.data.map((fav: any) => fav.mueble).filter((m: any) => m.activo !== false);
            setFavoritos(muebles);
        } catch (err) {
            console.error("Error cargando favoritos:", err);
        } finally {
            setLoading(false);
        }
    };

    const isFavorite = (id: number) => favoritos.some(m => m.id === id);

    const toggleFavorito = async (mueble: Mueble) => {
        try {
            const muebleId = Number(mueble.id);
            console.log("Toggling favorite for mueble:", mueble.id, "parsed as:", muebleId);
            
            if (!Number.isInteger(muebleId) || muebleId <= 0) {
                console.error("ID de mueble inválido:", mueble.id, "parsed:", muebleId);
                return;
            }
            
            if (isFavorite(muebleId)) {
                await api.delete(`/clientes/${clienteId}/favoritos/${muebleId}`);
                setFavoritos(prev => prev.filter(m => m.id !== muebleId));
            } else {
                const payload = { mueble: muebleId };
                console.log("Sending payload:", payload, "typeof muebleId:", typeof muebleId);
                await api.post(`/clientes/${clienteId}/favoritos/`, payload);
                setFavoritos(prev => [...prev, mueble]);
            }
        } catch (err) {
            console.error("Error actualizando favorito:", err);
        }
    };

    return (
        <FavoritosContext.Provider value={{ favoritos, isFavorite, toggleFavorito, loading }}>
            {children}
        </FavoritosContext.Provider>
    );
};

export const useFavoritos = () => {
    const ctx = useContext(FavoritosContext);
    if (!ctx) throw new Error("useFavoritos debe usarse dentro de FavoritosProvider");
    return ctx;
};
