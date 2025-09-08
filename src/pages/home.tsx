import Carrusell from "../components/carrusell"; 

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-4">
        <span className="promo-badge">Promociones</span>
      </h1>
      <Carrusell />
    </div>
  );
}
