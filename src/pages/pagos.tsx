import { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import { type Pago } from "../types";

export default function Pagos() {
  const [losPagos, setPagos] = useState<Pago[]>([]);

  useEffect(() => {
    const fetchPagos = async () => {
      try {
        const res = await api.get("/pagos");
        const pagos = res.data.data;
        setPagos(pagos);
      } catch (err) {
        console.error("Error cargando pagos:", err);
      }
    };

    fetchPagos();
  }, []);

  console.log(losPagos);
}
