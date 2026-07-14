import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { type Categoria, type Material } from "../types";

type MuebleForm = {
  descripcion: string;
  etiqueta: string;
  stock: string;
  precioUnitario: string;
  imagenes: string[];
  categoria: string;
  material: string;
};

type CategoriaForm = {
  nombre: string;
  descripcion: string;
  imagen: string;
};

const initialMuebleForm = (): MuebleForm => ({
  descripcion: "",
  etiqueta: "",
  stock: "",
  precioUnitario: "",
  imagenes: [],
  categoria: "",
  material: "",
});

const initialMaterialForm = () => ({
  nroMaterial: "",
  nombre: "",
});

const initialCategoriaForm = (): CategoriaForm => ({
  nombre: "",
  descripcion: "",
  imagen: "",
});

export default function AdminCrear() {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [materiales, setMateriales] = useState<Material[]>([]);
  const [loadingCatalogos, setLoadingCatalogos] = useState(true);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [creatingMueble, setCreatingMueble] = useState(false);
  const [creatingMaterial, setCreatingMaterial] = useState(false);
  const [muebleForm, setMuebleForm] = useState<MuebleForm>(initialMuebleForm);
  const [materialForm, setMaterialForm] = useState(initialMaterialForm);
  const [categoriaForm, setCategoriaForm] = useState<CategoriaForm>(initialCategoriaForm);
  const [nuevaImagen, setNuevaImagen] = useState("");

  useEffect(() => {
    if (localStorage.getItem("rol") !== "admin") {
      navigate("/");
      return;
    }

    setIsAdmin(true);

    const fetchCatalogos = async () => {
      try {
        const [catRes, matRes] = await Promise.all([
          api.get("/categorias"),
          api.get("/materiales"),
        ]);
        setCategorias(catRes.data.data || []);
        setMateriales(matRes.data.data || []);
      } catch (err) {
        console.error("Error al cargar catálogos:", err);
        setFeedback({
          type: "error",
          message: "No se pudieron cargar las categorías o materiales.",
        });
      } finally {
        setLoadingCatalogos(false);
      }
    };

    fetchCatalogos();
  }, [navigate]);

  const moveImage = (index: number, direction: -1 | 1) => {
    setMuebleForm((prev) => {
      const imagenes = [...prev.imagenes];
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= imagenes.length) return prev;
      [imagenes[index], imagenes[newIndex]] = [imagenes[newIndex], imagenes[index]];
      return { ...prev, imagenes };
    });
  };

  const removeImage = (index: number) => {
    setMuebleForm((prev) => ({
      ...prev,
      imagenes: prev.imagenes.filter((_, i) => i !== index),
    }));
  };

  const addImage = () => {
    if (!nuevaImagen.trim()) return;
    setMuebleForm((prev) => ({
      ...prev,
      imagenes: [...prev.imagenes, nuevaImagen.trim()],
    }));
    setNuevaImagen("");
  };

  const handleCreateMaterial = async (e: FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!materialForm.nroMaterial.trim()) {
      setFeedback({ type: "error", message: "El número de material es obligatorio." });
      return;
    }

    if (materialForm.nombre.trim().length < 2) {
      setFeedback({
        type: "error",
        message: "El nombre del material debe tener al menos 2 caracteres.",
      });
      return;
    }

    try {
      setCreatingMaterial(true);
      await api.post("/materiales", {
        nroMaterial: materialForm.nroMaterial.trim(),
        nombre: materialForm.nombre.trim(),
      });

      setFeedback({ type: "success", message: "material creado con exito" });
      const [materialesRes, categoriasRes] = await Promise.all([
        api.get("/materiales"),
        api.get("/categorias"),
      ]);
      setMateriales(materialesRes.data.data || []);
      setCategorias(categoriasRes.data.data || []);
      setMaterialForm(initialMaterialForm());
    } catch (err: any) {
      console.error("Error al crear material:", err);
      setFeedback({
        type: "error",
        message: err.response?.data?.message || "No se pudo crear el material.",
      });
    } finally {
      setCreatingMaterial(false);
    }
  };

  const handleCreateCategoria = async (e: FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (categoriaForm.nombre.trim().length < 2) {
      setFeedback({
        type: "error",
        message: "El nombre de la categoría debe tener al menos 2 caracteres.",
      });
      return;
    }

    if (categoriaForm.descripcion.trim().length < 5) {
      setFeedback({
        type: "error",
        message: "La descripción debe tener al menos 5 caracteres.",
      });
      return;
    }

    if (categoriaForm.imagen.trim() && !/^https?:\/\//i.test(categoriaForm.imagen.trim())) {
      setFeedback({
        type: "error",
        message: "La imagen debe ser una URL válida.",
      });
      return;
    }

    try {
      setCreatingMaterial(true);
      await api.post("/categorias", {
        nombre: categoriaForm.nombre.trim(),
        descripcion: categoriaForm.descripcion.trim(),
        imagen: categoriaForm.imagen.trim() || undefined,
      });

      setFeedback({ type: "success", message: "categoria creada con exito" });
      const [categoriasRes, materialesRes] = await Promise.all([
        api.get("/categorias"),
        api.get("/materiales"),
      ]);
      setCategorias(categoriasRes.data.data || []);
      setMateriales(materialesRes.data.data || []);
      setCategoriaForm(initialCategoriaForm());
    } catch (err: any) {
      console.error("Error al crear categoría:", err);
      setFeedback({
        type: "error",
        message: err.response?.data?.message || "No se pudo crear la categoría.",
      });
    } finally {
      setCreatingMaterial(false);
    }
  };

  const handleCreateMueble = async (e: FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (muebleForm.descripcion.trim().length < 10) {
      setFeedback({
        type: "error",
        message: "La descripción debe tener al menos 10 caracteres.",
      });
      return;
    }

    if (muebleForm.etiqueta.trim().length < 2 || muebleForm.etiqueta.trim().length > 50) {
      setFeedback({
        type: "error",
        message: "La etiqueta debe tener entre 2 y 50 caracteres.",
      });
      return;
    }

    const stock = Number(muebleForm.stock);
    const precioUnitario = Number(muebleForm.precioUnitario);

    if (!Number.isInteger(stock) || stock < 0) {
      setFeedback({ type: "error", message: "El stock debe ser un número entero y no negativo." });
      return;
    }

    if (Number.isNaN(precioUnitario) || precioUnitario < 0) {
      setFeedback({ type: "error", message: "El precio no puede ser negativo." });
      return;
    }

    if (muebleForm.imagenes.length === 0) {
      setFeedback({ type: "error", message: "Debes agregar al menos una imagen." });
      return;
    }

    if (!muebleForm.categoria) {
      setFeedback({ type: "error", message: "La categoría es obligatoria." });
      return;
    }

    if (!muebleForm.material) {
      setFeedback({ type: "error", message: "El material es obligatorio." });
      return;
    }

    try {
      setCreatingMueble(true);
      await api.post("/muebles", {
        descripcion: muebleForm.descripcion.trim(),
        etiqueta: muebleForm.etiqueta.trim(),
        stock,
        precioUnitario,
        imagenes: muebleForm.imagenes,
        categoria: Number(muebleForm.categoria),
        material: Number(muebleForm.material),
      });

      setFeedback({ type: "success", message: "mueble creado con exito" });
      const [categoriasRes, materialesRes] = await Promise.all([
        api.get("/categorias"),
        api.get("/materiales"),
      ]);
      setCategorias(categoriasRes.data.data || []);
      setMateriales(materialesRes.data.data || []);
      setMuebleForm(initialMuebleForm());
    } catch (err: any) {
      console.error("Error al crear mueble:", err);
      setFeedback({
        type: "error",
        message: err.response?.data?.message || "No se pudo crear el mueble.",
      });
    } finally {
      setCreatingMueble(false);
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-2xl bg-white p-6 shadow-md">
          <h1 className="text-2xl font-bold text-indigo-700">
            Panel de administración
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Creá nuevos muebles y materiales desde esta sección.
          </p>
        </div>

        {feedback && (
          <div
            className={`rounded-xl border px-4 py-3 text-sm ${
              feedback.type === "success"
                ? "border-green-300 bg-green-50 text-green-700"
                : "border-red-300 bg-red-50 text-red-700"
            }`}
          >
            {feedback.message}
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-3">
          <form
            onSubmit={handleCreateMaterial}
            className="rounded-2xl bg-white p-6 shadow-md"
          >
            <h2 className="text-xl font-semibold text-gray-800">Crear material</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Número de material
                </label>
                <input
                  value={materialForm.nroMaterial}
                  onChange={(e) =>
                    setMaterialForm({ ...materialForm, nroMaterial: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-900"
                  placeholder="Ej: MAT-001"
                  minLength={1}
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  value={materialForm.nombre}
                  onChange={(e) =>
                    setMaterialForm({ ...materialForm, nombre: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-900"
                  placeholder="Ej: Roble"
                  minLength={2}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={creatingMaterial}
              className="mt-6 w-full rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {creatingMaterial ? "Creando..." : "Crear material"}
            </button>
          </form>

          <form
            onSubmit={handleCreateCategoria}
            className="rounded-2xl bg-white p-6 shadow-md"
          >
            <h2 className="text-xl font-semibold text-gray-800">Crear categoría</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  value={categoriaForm.nombre}
                  onChange={(e) =>
                    setCategoriaForm({ ...categoriaForm, nombre: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-900"
                  placeholder="Ej: Sala"
                  minLength={2}
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <textarea
                  value={categoriaForm.descripcion}
                  onChange={(e) =>
                    setCategoriaForm({ ...categoriaForm, descripcion: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-900"
                  rows={3}
                  placeholder="Descripción de la categoría"
                  minLength={5}
                  required
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Imagen (URL opcional)
                </label>
                <input
                  value={categoriaForm.imagen}
                  onChange={(e) =>
                    setCategoriaForm({ ...categoriaForm, imagen: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-900"
                  placeholder="https://ejemplo.com/imagen.png"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={creatingMaterial}
              className="mt-6 w-full rounded-xl bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {creatingMaterial ? "Creando..." : "Crear categoría"}
            </button>
          </form>

          <form
            onSubmit={handleCreateMueble}
            className="rounded-2xl bg-white p-6 shadow-md"
          >
            <h2 className="text-xl font-semibold text-gray-800">Crear mueble</h2>
            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Descripción
                </label>
                <textarea
                  value={muebleForm.descripcion}
                  onChange={(e) =>
                    setMuebleForm({ ...muebleForm, descripcion: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-900"
                  rows={3}
                  placeholder="Descripción del producto"
                  minLength={10}
                  maxLength={500}
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Etiqueta
                  </label>
                  <input
                    value={muebleForm.etiqueta}
                    onChange={(e) =>
                      setMuebleForm({ ...muebleForm, etiqueta: e.target.value })
                    }
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-900"
                    placeholder="Ej: Premium"
                    minLength={2}
                    maxLength={50}
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Stock
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={muebleForm.stock}
                    onChange={(e) =>
                      setMuebleForm({ ...muebleForm, stock: e.target.value })
                    }
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Precio unitario
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={muebleForm.precioUnitario}
                  onChange={(e) =>
                    setMuebleForm({ ...muebleForm, precioUnitario: e.target.value })
                  }
                  className="w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-900"
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Categoría
                  </label>
                  <select
                    value={muebleForm.categoria}
                    onChange={(e) =>
                      setMuebleForm({ ...muebleForm, categoria: e.target.value })
                    }
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-900"
                    disabled={loadingCatalogos}
                    required
                  >
                    <option value="">Seleccioná una categoría</option>
                    {categorias.map((categoria) => (
                      <option key={categoria.id} value={categoria.id}>
                        {categoria.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Material
                  </label>
                  <select
                    value={muebleForm.material}
                    onChange={(e) =>
                      setMuebleForm({ ...muebleForm, material: e.target.value })
                    }
                    className="w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-900"
                    disabled={loadingCatalogos}
                    required
                  >
                    <option value="">Seleccioná un material</option>
                    {materiales.map((material) => (
                      <option key={material.id} value={material.id}>
                        {material.nombre}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Imágenes
                </label>
                <div className="space-y-3">
                  {muebleForm.imagenes.map((img, index) => (
                    <div
                      key={`${img}-${index}`}
                      className="flex flex-col gap-3 rounded-lg border border-gray-200 p-3 sm:flex-row sm:items-center"
                    >
                      <img
                        src={img}
                        alt={`Imagen ${index + 1}`}
                        className="h-24 w-24 rounded-lg object-cover"
                      />
                      <input
                        value={img}
                        onChange={(e) => {
                          const imagenes = [...muebleForm.imagenes];
                          imagenes[index] = e.target.value;
                          setMuebleForm({ ...muebleForm, imagenes });
                        }}
                        className="w-full rounded-lg border border-gray-300 px-2 py-2 text-sm text-gray-900"
                      />
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => moveImage(index, -1)}
                          disabled={index === 0}
                          className="rounded-lg border px-3 py-1 text-sm disabled:opacity-40"
                        >
                          Subir
                        </button>
                        <button
                          type="button"
                          onClick={() => moveImage(index, 1)}
                          disabled={index === muebleForm.imagenes.length - 1}
                          className="rounded-lg border px-3 py-1 text-sm disabled:opacity-40"
                        >
                          Bajar
                        </button>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="rounded-lg border border-red-300 px-3 py-1 text-sm text-red-700"
                        >
                          Quitar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-3 flex gap-2">
                  <input
                    value={nuevaImagen}
                    onChange={(e) => setNuevaImagen(e.target.value)}
                    placeholder="URL de nueva imagen"
                    className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-gray-900"
                  />
                  <button
                    type="button"
                    onClick={addImage}
                    className="rounded-lg bg-gray-800 px-4 py-2 text-white"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={creatingMueble || loadingCatalogos}
              className="mt-6 w-full rounded-xl bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {creatingMueble ? "Creando..." : "Crear mueble"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
