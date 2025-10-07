import { useState, useEffect } from "react";

const images = [
  // orden pedido: promo1, promo2, producto1, producto2
  "/imagenes/promo1.png",
  "/imagenes/promo2.png",
  "/imagenes/producto1.png",
  "/imagenes/producto2.png",
];

export default function Carrusell() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const handleNext = () =>
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      <img
        src={images[currentIndex]}
        alt={`slide-${currentIndex}`}
        style={{
          width: "100%",
          height: 420,
          objectFit: "cover",
          borderRadius: 12,
          display: "block",
        }}
      />

      <button
        onClick={handlePrev}
        aria-label="Anterior"
        style={{
          position: "absolute",
          top: "50%",
          left: 12,
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.45)",
          color: "#fff",
          border: "none",
          padding: "8px 10px",
          borderRadius: "50%",
          cursor: "pointer",
        }}
      >
        ◀
      </button>

      <button
        onClick={handleNext}
        aria-label="Siguiente"
        style={{
          position: "absolute",
          top: "50%",
          right: 12,
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.45)",
          color: "#fff",
          border: "none",
          padding: "8px 10px",
          borderRadius: "50%",
          cursor: "pointer",
        }}
      >
        ▶
      </button>

      <div
        style={{
          position: "absolute",
          bottom: 12,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 8,
        }}
      >
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Ir a ${i + 1}`}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              border: "none",
              background:
                i === currentIndex
                  ? "#fff"
                  : "rgba(255,255,255,0.45)",
              cursor: "pointer",
              padding: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}
