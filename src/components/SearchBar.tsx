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
            navigate(`/busqueda?q=${encodeURIComponent(query.trim())}`);
            if (onCloseMenu) {
                onCloseMenu();
            }
        }
    };

    return (
        <form 
            onSubmit={handleSearch} 
            className={`flex w-full items-center bg-gray-700 border-2 border-white rounded-l-full rounded-r-full pr-1 py-1 focus-within:ring-2 focus-within:ring-blue-500 relative ${className}`}
            style={{ minHeight: '52px' }}
        >
            <input
                type="text"
                placeholder="Buscar muebles..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-5 pr-14 py-2 text-white bg-transparent outline-none border-none focus:outline-none focus:ring-0"
            />
            <button
                type="submit"
                className="absolute right-0 w-12 h-12 box-border bg-white border-[6px] border-red-500 rounded-full flex items-center justify-center transition-transform hover:scale-105 active:scale-95 shadow-md"
                aria-label="Buscar"
            >
                <span className="text-sm font-bold text-gray-700">🔍</span>
            </button>
        </form>
    );
}
