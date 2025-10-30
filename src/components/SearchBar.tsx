import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
    onCloseMenu?: () => void;
    className?: string;
}

export default function SearchBar({ onCloseMenu, className = "" }: SearchBarProps) {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            console.log("Buscando:", query);
            // Redirige a la página de resultados de búsqueda
            navigate(`/busqueda?q=${encodeURIComponent(query.trim())}`);
            if (onCloseMenu) {
                onCloseMenu();
            }
        }
    };

    return (
        <form onSubmit={handleSearch} className={`flex w-full ${className}`}>
            <input
                type="text"
                placeholder="Buscar muebles..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-l-md px-3 py-2 text-white bg-gray-700 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-r-md transition-colors"
            >
                🔍
            </button>
        </form>
    );
}