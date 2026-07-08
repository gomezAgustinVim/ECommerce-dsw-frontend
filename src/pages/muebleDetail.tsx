import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import api from "../api/axiosInstance";
import { useCarrito } from "../context/carritoContext";
import { formatCurrency } from "../utils/formatCurrency";
import { type Categoria, type Material, type Mueble } from "../types";

type MuebleForm = {
  descripcion: string;
  etiqueta: string;
  stock: number;
  precioUnitario: number;
  imagenes: string[];
  categoria: number;
  material: number;
};

function buildForm(mueble: Mueble): MuebleForm {
  return {
    descripcion: mueble.descripcion,
    etiqueta: mueble.etiqueta,
    stock: Number(mueble.stock),
    precioUnitario: Number(mueble.precioUnitario),
    imagenes: [...mueble.imagenes],
    categoria: mueble.categoria.id,
    material: mueble.material.id,
  };
}

export default function MuebleDetail() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addItem } = useCarrito();

  const isAdmin = localStorage.getItem("rol") === "admin";
  const isAuthenticated = !!localStorage.getItem("token");
  const editMode = isAdmin && searchParams.get("edit") === "true";

  const [mueble, setMueble] = useState<Mueble>();
  const [form, setForm] = useState<MuebleForm | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [materiales, setMateriales] = useState<Material[]>([]);
  const [nuevaImagen, setNuevaImagen] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const fetchMueble = async () => {
    try {
      const res = await api.get(`/muebles/${id}`);
      const data = res.data.data as Mueble;
      setMueble(data);
      setForm(buildForm(data));
    } catch (err) {
      console.error("Error al obtener el mueble:", err);
      setError("No se pudo cargar el mueble.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMueble();
  }, [id]);

  useEffect(() => {
    if (!editMode) return;

    const fetchCatalogos = async () => {
      try {
        const [catRes, matRes] = await Promise.all([
          api.get("/categorias"),
          api.get("/materiales"),
        ]);
        setCategorias(catRes.data.data);
        setMateriales(matRes.data.data);
      } catch (err) {
        console.error("Error al cargar catalogos:", err);
      }
    };

    fetchCatalogos();
  }, [editMode]);

  /* funciones sobre las imágenes */

  const moveImage = (index: number, direction: -1 | 1) => {
    if (!form) return;
    const imagenes = [...form.imagenes];
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= imagenes.length) return;
    [imagenes[index], imagenes[newIndex]] = [
      imagenes[newIndex],
      imagenes[index],
    ];
    setForm({ ...form, imagenes });
  };

  const removeImage = (index: number) => {
    if (!form) return;
    setForm({
      ...form,
      imagenes: form.imagenes.filter((_, i) => i !== index),
    });
  };

  const addImage = () => {
    if (!form || !nuevaImagen.trim()) return;
    setForm({
      ...form,
      imagenes: [...form.imagenes, nuevaImagen.trim()],
    });
    setNuevaImagen("");
  };

  const handleSave = async () => {
    if (!form) return;

    if (form.imagenes.length === 0) {
      alert("El mueble debe tener al menos una imagen.");
      return;
    }

    console.log(form);
    console.log(typeof form.precioUnitario);

    /* guardar el mueble luego de validar */
    try {
      setSaving(true);
      const res = await api.put(`/muebles/${id}`, form);
      setMueble(res.data.data);
      setForm(buildForm(res.data.data));
      alert("Mueble actualizado.");
      navigate(`/muebles/${id}`);
    } catch (err: any) {
      console.error("Error al guardar mueble:", err);
      alert(err.response?.data?.message || "No se pudo guardar el mueble.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        "Seguro que queres dar de baja este mueble? Dejara de mostrarse en la tienda.",
      )
    ) {
      return;
    }

    try {
      setDeleting(true);
      await api.delete(`/muebles/${id}`);
      alert("Mueble dado de baja.");
      navigate("/muebles");
    } catch (err: any) {
      console.error("Error al dar de baja el mueble:", err);
      alert(err.response?.data?.message || "No se pudo dar de baja el mueble.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <p className="text-center py-10">Cargando...</p>;
  if (!mueble || !form)
    return (
      <p className="text-center py-10 text-gray-700">
        {error || "No se encontro el mueble."}
      </p>
    );

  return (
    <section className="min-h-screen flex flex-col items-center justify-start p-4 sm:p-6 bg-gray-50">
      <div className="max-w-3xl w-full p-6 sm:p-10 rounded-2xl bg-white shadow">
        {editMode ? (
          <>
            <h1 className="text-2xl sm:text-3xl font-bold text-indigo-700 mb-6">
              Editar mueble
            </h1>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripcion
                </label>
                <textarea
                  value={form.descripcion}
                  onChange={(e) =>
                    setForm({ ...form, descripcion: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-900"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Etiqueta
                  </label>
                  <input
                    value={form.etiqueta}
                    onChange={(e) =>
                      setForm({ ...form, etiqueta: e.target.value })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Stock
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={form.stock}
                    onChange={(e) =>
                      setForm({ ...form, stock: Number(e.target.value) })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Precio unitario
                </label>
                <input
                  type="number"
                  min={0}
                  step="0.01"
                  value={form.precioUnitario}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      precioUnitario: Number(e.target.value),
                    })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg text-gray-900"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Categoria
                  </label>
                  <select
                    value={form.categoria}
                    onChange={(e) =>
                      setForm({ ...form, categoria: Number(e.target.value) })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900"
                  >
                    {categorias.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Material
                  </label>
                  <select
                    value={form.material}
                    onChange={(e) =>
                      setForm({ ...form, material: Number(e.target.value) })
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-900"
                  >
                    {materiales.map((mat) => (
                      <option key={mat.id} value={mat.id}>
                        {mat.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imagenes
                </label>
                <div className="space-y-3">
                  {form.imagenes.map((img, index) => (
                    <div
                      key={`${img}-${index}`}
                      className="flex flex-col sm:flex-row gap-3 items-start sm:items-center border border-gray-200 rounded-lg p-3"
                    >
                      <img
                        src={img}
                        alt={`Imagen ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <input
                        value={img}
                        onChange={(e) => {
                          const imagenes = [...form.imagenes];
                          imagenes[index] = e.target.value;
                          setForm({ ...form, imagenes });
                        }}
                        className="flex-1 w-full p-2 border border-gray-300 rounded-lg text-gray-900 text-sm"
                      />
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => moveImage(index, -1)}
                          disabled={index === 0}
                          className="px-3 py-1 border rounded-lg disabled:opacity-40"
                        >
                          Subir
                        </button>
                        <button
                          type="button"
                          onClick={() => moveImage(index, 1)}
                          disabled={index === form.imagenes.length - 1}
                          className="px-3 py-1 border rounded-lg disabled:opacity-40"
                        >
                          Bajar
                        </button>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="px-3 py-1 border border-red-300 text-red-700 rounded-lg"
                        >
                          Quitar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 mt-3">
                  <input
                    value={nuevaImagen}
                    onChange={(e) => setNuevaImagen(e.target.value)}
                    placeholder="URL de nueva imagen"
                    className="flex-1 p-2 border border-gray-300 rounded-lg text-gray-900"
                  />
                  <button
                    type="button"
                    onClick={addImage}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={() => navigate(`/muebles/${id}`)}
                className="px-6 py-2 bg-gray-200 text-gray-900 rounded-lg"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
              >
                {saving ? "Guardando..." : "Guardar cambios"}
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="px-6 py-2 bg-red-600 text-white rounded-lg disabled:opacity-50"
              >
                {deleting ? "Dando de baja..." : "Dar de baja"}
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl sm:text-4xl font-bold text-center text-indigo-700 mb-6">
              {mueble.descripcion}
            </h1>

            <div className="flex flex-col items-center gap-3 mb-6">
              {mueble.imagenes.length > 1 ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {mueble.imagenes.map((i, idx) => (
                    <img
                      key={idx}
                      src={i}
                      alt={mueble.descripcion}
                      className="w-full h-40 object-cover rounded-lg shadow"
                    />
                  ))}
                </div>
              ) : (
                <img
                  src={mueble.imagenes[0]}
                  alt={mueble.descripcion}
                  className="w-full max-h-[450px] object-cover rounded-lg shadow"
                />
              )}
            </div>

            <div className="space-y-2 text-gray-700 text-center sm:text-left">
              <p>
                <strong>Etiqueta:</strong> {mueble.etiqueta}
              </p>
              <p>
                <strong>Precio:</strong> {formatCurrency(mueble.precioUnitario)}
              </p>
              <p>
                <strong>Stock:</strong> {mueble.stock}
              </p>
              <p>
                <strong>Categoria:</strong> {mueble.categoria.nombre}
              </p>
              <p>
                <strong>Material:</strong> {mueble.material.nombre}
              </p>
            </div>

            <div className="mt-4 gap-2 flex flex-col justify-center sm:justify-start sm:flex-row">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-6 py-2 bg-red-500 text-white font-medium rounded-lg shadow hover:bg-red-600 transition w-full sm:w-auto"
              >
                Volver
              </button>

              {isAdmin ? (
                <button
                  type="button"
                  onClick={() => navigate(`/muebles/${id}?edit=true`)}
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition w-full sm:w-auto"
                >
                  Editar mueble
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    if (isAuthenticated) {
                      addItem({
                        id: mueble.id,
                        title: mueble.descripcion,
                        price: mueble.precioUnitario,
                        quantity: 1,
                        image: mueble.imagenes?.[0],
                      });
                    } else {
                      navigate("/login");
                    }
                  }}
                  className="px-6 py-2 bg-red-500 text-white font-medium rounded-lg shadow hover:bg-red-600 transition w-full sm:w-auto"
                >
                  Agregar al carrito
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
