export type Mueble = {
  id: number;
  descripcion: string;
  etiqueta: string;
  stock: number;
  precioUnitario: number;
  imagenes?: string[];
};

export type Item = {
  id: number;
  cantidad: number;
  subtotal: number;
  estado: string;
  mueble: Mueble;
};

export type Pedido = {
  id: number;
  estado: string;
  total: number;
  lineas: LineaPedido[];
  cliente: { id: number; nombre: string };
  fechaHora: string;
};
