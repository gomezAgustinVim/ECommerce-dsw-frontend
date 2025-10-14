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
    items: Item[];
    cliente: { id: number; nombre: string };
    fechaHora: string;
};


export type Cliente = {
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    direccion: string;
    telefono: string;
    dni: string;
    usuario: string;
    contrasenia: string;
    fondos: number;
    favoritos: any[];  // Podés tipar mejor luego
    pedidos: any[];
}
