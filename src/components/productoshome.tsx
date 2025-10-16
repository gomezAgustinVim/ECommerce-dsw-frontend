import { Link } from "react-router-dom";

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  categoria: string;
}

export default function ProductosDestacados() {
  // ejemplos
  const productosDestacados: Producto[] = [
    {
      id: 1,
      nombre: "Sillón Moderno",
      descripcion: "Sillón ",
      precio: 125000,
      imagen: "/imagenes/sillon-moderno.jpg",
      categoria: "Sillones"
    },
    {
      id: 2,
      nombre: "Mesa de Roble",
      descripcion: "Mesa",
      precio: 89000,
      imagen: "/imagenes/mesa-roble.jpg",
      categoria: "Mesas"
    },
    {
      id: 3,
      nombre: "Cama ",
      descripcion: "Cama",
      precio: 156000,
      imagen: "/imagenes/cama-king.jpg",
      categoria: "Dormitorio"
    },
    {
      id: 4,
      nombre: "Placar Moderno",
      descripcion: "Placar ",
      precio: 112000,
      imagen: "/imagenes/placar-moderno.jpg",
      categoria: "Dormitorio"
    },
    {
      id: 5,
      nombre: "Silla de Oficina",
      descripcion: "Silla ",
      precio: 45000,
      imagen: "/imagenes/silla-oficina.jpg",
      categoria: "Sillas"
    },
    {
      id: 6,
      nombre: "Mesa Ratona",
      descripcion: "Mesa ratona",
      precio: 32000,
      imagen: "/imagenes/mesa-ratona.jpg",
      categoria: "Mesas"
    }
  ];

  const formatearPrecio = (precio: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(precio);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título de la sección */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Productos Destacados
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            acá tendríamos que poner una descripcion.
          </p>
        </div>

        {/* Grid de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {productosDestacados.map((producto) => (
            <div
              key={producto.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              {/* Imagen del producto */}
              <div className="relative overflow-hidden">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Badge de categoría */}
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                  {producto.categoria}
                </div>
              </div>

              {/* Contenido del producto */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {producto.nombre}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {producto.descripcion}
                </p>

                {/* Precio */}
                <div className="mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    {formatearPrecio(producto.precio)}
                  </span>
                </div>

                {/* Botones de acción */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium">
                    Agregar al Carrito
                  </button>
                  <Link
                    to={`/producto/${producto.id}`}
                    className="flex items-center justify-center bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg transition-colors duration-200 font-medium"
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
            to="/productos"
            className="inline-block bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Ver Todos los Productos
          </Link>
        </div>
      </div>
    </section>
  );
}