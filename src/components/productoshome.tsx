import { Link } from "react-router-dom";

interface Mueble {
  id: number;
  nombre: string;
  descripcion: string;
  precioUnitario: number;
  imagenes: string[];
  etiqueta: string;
  stock: number;
  categoria: number;
  material: number;
}

export default function MueblesDestacados() {
  // ejemplos
  const mueblesDestacados: Mueble[] = [
    {
      id: 1,
      nombre: "Sofá de cuero sintético",
      descripcion: "Sofá de dos cuerpos tapizado en cuero sintético gris oscuro.",
      precioUnitario: 142000,
      imagenes: ["https://images.unsplash.com/photo-1501045661006-fcebe0257c3f?w=800"],
      etiqueta: "Sofás",
      stock: 5,
      categoria: 3,
      material: 8
    },
    {
      id: 2,
      nombre: "Biblioteca modular de madera",
      descripcion: "Biblioteca modular adaptable a distintos espacios, con compartimentos abiertos.",
      precioUnitario: 74000,
      imagenes: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"],
      etiqueta: "Mesas",
      stock: 8,
      categoria: 2,
      material: 1
    },
    {
      id: 3,
      nombre: "Lampara de pie alta ",
      descripcion: "Lámpara de pie alta, con base metálica y pantalla de tela",
      precioUnitario: 27000,
      imagenes: ["https://images.unsplash.com/photo-1616628182506-8a9621a5d3b0?w=800"],
      etiqueta: "Iluminación",
      stock: 6,
      categoria: 8,
      material: 4
    },
    {
      id: 4,
      nombre: "Escritorio de oficina metálico",
      descripcion: "Escritorio de oficina con estructura de acero inoxidable y tablero de melamina.",
      precioUnitario: 65000,
      imagenes: ["https://images.unsplash.com/photo-1589820296156-2454bb8e8f54?w=800"],
      etiqueta: "Oficina",
      stock: 7,
      categoria: 8,
      material: 5
    },
    {
      id: 5,
      nombre: " Silla exterior de aluminio y ratán",
      descripcion: "Silla para exteriores con estructura de aluminio y asiento de ratán natural",
      precioUnitario: 37000,
      imagenes: ["https://images.unsplash.com/photo-1598300042247-eeeabcf3b7e9?w=800  "],
      etiqueta: "Exterior",
      stock: 12,
      categoria: 9,
      material: 10
    },
    {
      id: 6,
      nombre: "Cuna infantil de bambú",
      descripcion: "Cuna infantil fabricada en bambú natural con barandas desmontables.",
      precioUnitario: 102000,
      imagenes: ["https://images.unsplash.com/photo-1600566752781-3df8fc9f5cbe?w=800"],
      etiqueta: "Infantil",
      stock: 3,
      categoria: 10,
      material: 12
    }
  ];

  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(precio);
  };

  return (
    <section className="">
      <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título de la sección */}
        <div className="text-center mb-12 ">
          <h2 className="text-3xl font-bold text-[#32368b]! mb-4">
            PRODUCTOS<br />
            <span className="text-[#32368b]!">DESTACADOS</span>
          </h2>
          <p className="text-lg text-[#32368b]! max-w-2xl mx-auto">
            acá tendríamos que poner una descripcion.            
          </p>
        </div>

        {/* Grid de muebles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {mueblesDestacados.map((mueble) => (
            <div
              key={mueble.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              {/* Imagen del mueble */}
              <div className="relative overflow-hidden">
                <img
                  src={mueble.imagenes[0]}
                  alt={mueble.nombre}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Badge de etiqueta */}
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                  {mueble.etiqueta}
                </div>
              </div>

              {/* Contenido del mueble */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {mueble.nombre}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {mueble.descripcion}
                </p>

                {/* Precio */}
                <div className="mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    {formatearPrecio(mueble.precioUnitario)}
                  </span>
                </div>

                {/* Stock */}
                <div className="mb-4">
                  <span className="text-sm text-gray-600">
                    Stock: {mueble.stock} unidades
                  </span>
                </div>

                {/* Botones de acción */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium">
                    Agregar al Carrito
                  </button>
                  <Link
                    to={`/mueble/${mueble.id}`}
                    className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-[#32368b]! py-2 px-4 rounded-lg transition-colors duration-200 font-medium"
                  >
                    Ver más
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón ver más */}
        <div className="text-center mt-12">
          <Link
            to="/muebles"
            className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Ver Todos los Muebles
          </Link>
        </div>
      </div>
    </section>
  );
}