import Carrusell from "../components/carrusell"; 
import ProductosDestacados from "../components/productoshome";

export default function Home() {
  return (
    <div className="flex flex-col items-center relative"> {/* cambio header a sticky */}
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