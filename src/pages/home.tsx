import Carrusell from "../components/carrusell"; 

// importo el carrusell de fotos al inicio 

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-4">
        Promociones
      </h1>
      <Carrusell />
    </div>
  );
}
