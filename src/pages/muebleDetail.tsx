import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { type Mueble } from '../types';

export default function MuebleDetail() {
	const { id } = useParams<{ id: string }>();
	const [mueble, setMueble] = useState<Mueble>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchMueble = async () => {
			try {
				const res = await axios.get(`/muebles/${id}`);

				setMueble(res.data.data);
			} catch (err) {
				console.error('Error al obtener el mueble:', err);
			} finally {
				setLoading(false);
			}
		};

		fetchMueble();
	}, [id]);

	if (loading) return <p>Cargando...</p>;
	if (!mueble) return <p>No se encontró el mueble.</p>;

	return (
		<div className="mueble-detalle">
			<h1>{mueble.descripcion}</h1>

			{/* Tengo mas de una imagen? entonces muestro todas con menor tamaño */}
			{mueble.imagenes.length > 1 ? (
				mueble.imagenes.map((i) => (
					<img src={i} alt={mueble.descripcion} width="200" />
				))
			) : (
				<img src={mueble.imagenes[0]} alt={mueble.descripcion} width="500" />
			)}
			<p>
				<strong>Etiqueta:</strong> {mueble.etiqueta}
			</p>
			<p>
				<strong>Precio:</strong> ${mueble.precioUnitario}
			</p>
			<p>
				<strong>Stock:</strong> {mueble.stock}
			</p>
			<p>
				<strong>Categoría:</strong> {mueble.categoria.nombre}
			</p>
			<p>
				<strong>Material:</strong> {mueble.material.nombre}
			</p>
			<button onClick={() => window.history.back()}>← Volver</button>
		</div>
	);
}
