import { useState, useEffect } from "react";

const images = [
  "/images/promo1.jpg",
  "/images/promo2.jpg",
  "/images/producto1.jpg",
  "/images/producto2.jpg",
];

export default function Carrusell() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cambiar automáticamente cada 5 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval); // cleanup
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Imagen */}
      <img
        src={images[currentIndex]}
        alt={`slide-${currentIndex}`}
        className="w-full h-64 object-cover rounded-xl shadow-lg transition-all duration-500"
      />

      {/* Botón anterior */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full"
      >
        ◀
      </button>

      {/* Botón siguiente */}
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full"
      >
        ▶
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === currentIndex ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

