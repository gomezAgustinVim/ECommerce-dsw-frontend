import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const images = [
  "/imagenes/carr-1.png",
  "/imagenes/carr-2.png",
  "/imagenes/carr-3.png",
];

const beneficios = [
  { icono: "🚚", texto: "Envíos a todo el país" },
  { icono: "💳", texto: "Hasta 12 cuotas sin interés" },
  { icono: "🛡️", texto: "Garantía de fábrica" },
  { icono: "🙋", texto: "Atención personalizada" },
];

export default function Carrusell() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const currentIndexRef = useRef(currentIndex);

  // actualizo la referencia cuando cambia el índice
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  // avanzo automáticamente cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex =
        currentIndexRef.current === images.length - 1
          ? 0
          : currentIndexRef.current + 1;

      if (!isTransitioning) {
        setIsTransitioning(true);
        setCurrentIndex(nextIndex);
        setTimeout(() => setIsTransitioning(false), 500);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isTransitioning]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  return (
    <div className="relative w-full">

      {/* HERO — imagen de fondo con texto encima */}
      <div className="relative overflow-hidden h-[520px] md:h-[600px]">

        {/* imagen de fondo con transición */}
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
            isTransitioning ? "opacity-70 scale-105" : "opacity-100 scale-100"
          }`}
        />

        {/* overlay oscuro para que el texto se lea bien */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-white/90 via-white/10 to-transparent" />

        {/* texto centrado a la izquierda */}
        <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-20 max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-[800] text-gray-900 leading-tight tracking-tight"
            >
            Muebles
            a tu alcance
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Calidad garantizada y envíos a todo el país
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link
              to="/muebles"
              className="bg-gray-900 text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Ver Catálogo
            </Link>
            
          </div>
        </div>

        {/* flecha izquierda */}
        <span
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer select-none text-5xl text-white/60 hover:text-white transition-all duration-300 z-10"
        >
          
        </span>

        {/* flecha derecha */}
        <span
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer select-none text-5xl text-white/60 hover:text-white transition-all duration-300 z-10"
        >
          
        </span>

        {/* puntos de navegación */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              aria-label={`Ir a slide ${index + 1}`}
              style={{
                backgroundColor:
                  index === currentIndex
                    ? "rgba(255,255,255,0.95)"
                    : "rgba(255,255,255,0.4)",
                transform: index === currentIndex ? "scale(1.4)" : "scale(1)",
                borderRadius: "50%",
                border: "none",
                cursor: "pointer",
                padding: "5px",
                margin: "0 3px",
              }}
              className="transition-all duration-300"
            />
          ))}
        </div>
      </div>

      {/* BARRA DE BENEFICIOS */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {beneficios.map((b, i) => (
            <div key={i} className="flex items-center gap-3 justify-center">
              <span className="text-2xl">{b.icono}</span>
              <span className="text-sm font-medium text-gray-700">{b.texto}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}