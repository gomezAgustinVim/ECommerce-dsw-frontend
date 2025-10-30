import { useState, useEffect, useRef } from "react"; 

const images = [
  "/imagenes/promo1.png",
  "/imagenes/promo2.png",
  "/imagenes/producto1.png",
  "/imagenes/producto2.png",
];

export default function Carrusell() {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const currentIndexRef = useRef(currentIndex);

  // Actualizar la referencia cuando cambia el estado
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  //  avance cada 5 segundos (CORREGIDO)
  useEffect(() => {
    const interval = setInterval(() => {
      // Usar la referencia en lugar del estado directamente
      const nextIndex = currentIndexRef.current === images.length - 1 ? 0 : currentIndexRef.current + 1;
      
      if (!isTransitioning) {
        setIsTransitioning(true);
        setCurrentIndex(nextIndex);
        setTimeout(() => setIsTransitioning(false), 500);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isTransitioning]); // Solo depende de isTransitioning

  // función que pasa a la sig imagen
  const nextSlide = () => {
    if (isTransitioning) return; 
    setIsTransitioning(true); 
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // funcion que vuelve a la imagen anterior
  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // para ir a una imagen haciendo click en una pelota
  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const specialIndex = images.findIndex((src) => src.includes("producto2"));
  const isSpecialVisible = currentIndex === specialIndex;

  return (
    <div className="relative w-full">
      {/* contenedor general del carrusel */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        
        {/* contenedor de la imagen principal */}
        <div className="relative">
          <img
            src={images[currentIndex]} // muestra la imagen actual
            alt={`Promoción ${currentIndex + 1}`} // texto alternativo
            className={`
              w-full h-[500px] object-cover
              transform transition-all duration-500
              ${isTransitioning ? 'opacity-80 scale-105' : 'opacity-100 scale-100'}
              ${isSpecialVisible ? 'shadow-xl ring-2 ring-yellow-400 ring-opacity-50' : 'shadow-md'}
            `}
          />

          {/* etiqueta de producto Destacado */}
          {isSpecialVisible && (
            <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold animate-pulse">
              ¡Destacado!
            </div>
          )}
        </div>

        {/* flecha izquierda */}
        <span
          onClick={prevSlide} // al hacer clic va a la imagen anterior
          className="absolute left-4 top-1/2 transform -translate-y-1/2 cursor-pointer select-none text-[2.5rem] text-white/50 hover:text-white/80 transition-all duration-300 drop-shadow-lg"
        >
          ‹
        </span>

        {/* flecha derecha */}
        <span
          onClick={nextSlide} // al hacer clic va a la imagen siguiente
          className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer select-none text-[2.5rem] text-white/50 hover:text-white/80 transition-all duration-300 drop-shadow-lg"
        >
          ›
        </span>

        {/*pelotas*/}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 bg-transparent">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              disabled={isTransitioning}
              style={{
                backgroundColor: index === currentIndex ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.4)',
                transform: index === currentIndex ? 'scale(1.5)' : 'scale(1)',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                padding: '3px',
                margin: '0 4px',
              }}
              className="rounded-full transition-all duration-300 border border-white/30 hover:bg-white/60"
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* descripción fotos
      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold text-gray-800">
          // texxto producto destacado // 
          {isSpecialVisible ? "Producto Destacado" : `Promoción ${currentIndex + 1}`}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          {isSpecialVisible 
            ? "¡Oferta especial por tiempo limitado!" 
            : "Descubrí nuestras mejores ofertas"}
        </p>
      </div>
      */} 
    </div>
  );
}