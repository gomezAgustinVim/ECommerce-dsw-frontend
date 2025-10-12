import { Link } from "react-router-dom";
import Carrusell from "../components/carrusell"; 

export default function Home() {
  return (
    <div className="flex flex-col items-center relative">
      {/* Botón en esquina superior derecha */}
      <Link
        to="/login"
        className="absolute top-4 right-4 bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-md hover:shadow-lg border border-gray-300 hover:border-blue-400 hover:ring-2 hover:ring-blue-200"
      >
        Iniciar sesión
      </Link>

      <h1 className="text-2xl font-bold text-center my-4">
        <span className="promo-badge">Promociones</span>
      </h1>

      <Carrusell />
    </div>
  );
}