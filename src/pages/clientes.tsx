import { useEffect, useState } from 'react';
import api from '../api/axiosInstance';
import { type Cliente } from '../types';

export default function Clientes() {
	const [clientes, setClientes] = useState<Cliente[]>([]);

	const fetchClientes = async () => {
		try {
			const res = await api.get('/clientes');

			console.log(res.data);
			setClientes(res.data.data);
		} catch (err) {
			console.error('No se pudieron obtener clientes', err);
		}
	};

	useEffect(() => {
		fetchClientes();
	}, []);

	return (
		<div className="bg-frame">
			<h1>Clientes</h1>
			{clientes.map((cliente) => (
				<div key={cliente.id}>
					<h2>
						{cliente.apellido} {cliente.nombre}
					</h2>
					<p>Email: {cliente.email}</p>

					<h3>Favoritos:</h3>
					{cliente.favoritos && cliente.favoritos.length > 0 ? (
						<ul>
							{cliente.favoritos.map((fav) => (
								<li key={fav.id}>🪑 {`Mueble ID ${fav.mueble}`}</li>
							))}
						</ul>
					) : (
						<p>No tiene favoritos.</p>
					)}
				</div>
			))}
		</div>
	);
}
