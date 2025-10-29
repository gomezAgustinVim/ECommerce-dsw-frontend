import { Link } from "react-router-dom";
import Carrusell from "../components/carrusell"; 
import ProductosDestacados from "../components/productoshome";

export default function Home() {
  return (
    <div className="flex flex-col items-center relative"> {/* cambio header a sticky */}
      {/* Botón en esquina superior derecha */}
      <Link
        to="/login"
        className="fixed top-24 right-4 bg-white text-[#32368b]! px-6 py-2 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-md hover:shadow-lg border border-gray-300 hover:border-[#32368b] z-40"
      >
        Iniciar sesión
      </Link>

      {/* Carrusel */}
      <div className="w-full">
        <Carrusell />
      </div>

      {/* Productos Destacados */}
      <div className="w-full">
        <ProductosDestacados />
      </div>
    </div>
  );
}