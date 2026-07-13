import { useFavoritos } from "../context/favoritosContext";
import { type Mueble } from "../types";

type FavoriteButtonProps = {
    mueble: Mueble;
    className?: string;
};

export default function FavoriteButton({ mueble, className = "" }: FavoriteButtonProps) {
    const { isFavorite, toggleFavorito } = useFavoritos();
    const isLiked = isFavorite(mueble.id);

    const handleClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!mueble.id) {
            console.error("FavoriteButton: mueble no tiene ID válido", mueble);
            return;
        }
        toggleFavorito(mueble);
    };

    return (
        <a
            onClick={handleClick}
            className={`text-2xl transition-transform hover:scale-125 ${className}`}
            aria-label={isLiked ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
            {isLiked ? "❤️" : "🤍"}
        </a>
    );
}
