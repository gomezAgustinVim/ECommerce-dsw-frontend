export type BaseType = {
    id: number;
    fechaCreacion: string;       // ISO string (al serializar desde el back)
    fechaActualizacion: string;  // idem
};

// === FAVORITO ===
export type Favorito = BaseType & {
    cliente: Cliente;
    mueble: Mueble;
};

export type Cliente = BaseType & {
    nombre: string;
    apellido: string;
    direccion: string;
    telefono: string;
    dni: string;
    usuario: string;
    email: string;
    contrasenia: string;
    rol: "user" | "admin";
    fondos: number;
    pedidos: Pedido[];
    favoritos: Favorito[];
}

export type Categoria = BaseType & {
    nombre: string;
    descripcion: string;
    imagen?: string;
}

export type Material = BaseType & {
    nroMaterial: string;
    nombre: string;
};

export type Mueble = BaseType & {
    descripcion: string;
    etiqueta: string;
    stock: number;
    precioUnitario: number;
    imagenes: string[];
    categoria: Categoria;
    material: Material;
};

export type Item = BaseType & {
    cantidad: number;
    subtotal: number;
    estado: string;
    mueble: Mueble;
    pedido?: Pedido;
};

export type Pedido = BaseType & {
    cliente: Cliente
    items: Item[];
    fechaHora: string;
    estado: string;
    total: number;
    // pago?: Pago;
};

export type Descuento = BaseType & {
    codigo: string;
    tipo: 'Cantidad' | 'Monto';
    descripcion?: string;
    porcentaje: number;
    fechaExpiracion: string;
    pedido: Pedido;
};
