import React, { useState } from "react";
import api from "../api/axiosInstance";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");

  const [form, setForm] = useState({
    confirmPassword: "",
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: "",
    dni: "",
    usuario: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGlobalError("");
    setLoading(true);

    const {
      confirmPassword,
      nombre,
      apellido,
      direccion,
      telefono,
      dni,
      usuario,
    } = form;

    try {
      // validaciones
      if (!email || !password) {
        setGlobalError("Todos los campos son obligatorios");
        setLoading(false);
        return;
      }

      if (isRegister) {
        if (password !== confirmPassword) {
          setGlobalError("Las contraseñas no coinciden");
          setLoading(false);
          return;
        }

        await api.post("/clientes", {
          email,
          contrasenia: password,
          nombre,
          apellido,
          direccion,
          telefono,
          dni,
          usuario,
          rol: "cliente",
          fondos: 0,
        });

        alert("¡Registro exitoso!");
        setIsRegister(false); // cambia a login despues del registro
      } else {
        const response = await api.post("/auth/login", {
          email,
          contrasenia: password,
        });
        localStorage.setItem("clienteId", JSON.stringify(response.data.id));
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("rol", response.data.rol);

        alert("¡Inicio de sesión exitoso!");
        window.location.href = "/";
      }
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        setGlobalError("Email o contraseña incorrecta");
      } else if (err.response && err.response.status === 400) {
        setGlobalError(
          "Solicitud inválida. Por favor, verifica que los datos ingresados sean correctos.",
        );
      } else {
        setGlobalError("Error al conectar con el servidor");
      }
      console.error("Error en login:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        flex flex-col items-center justify-center
        min-h-[calc(100vh-5.5rem)]
        px-4 pb-8 bg-gray-50
      "
    >
      <form
        onSubmit={handleSubmit}
        className="
      bg-white p-6 sm:p-8 rounded-2xl shadow-md
        w-full max-w-sm sm:max-w-md md:max-w-lg
        transition-all"
      >
        <h2 className="text-xl font-semibold mb-6 text-center">
          {isRegister ? "Registrarse" : "Iniciar sesión"}
        </h2>

        {/* muestra error */}
        {globalError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {globalError}
          </div>
        )}

        {/* mail */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all"
            placeholder="ejemplo@correo.com"
            required
            disabled={loading}
          />
        </div>

        {/* password */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 transition-all"
            placeholder="Ingresa tu contraseña"
            minLength={8}
            maxLength={64}
            required
            disabled={loading}
          />
        </div>

        {isRegister && (
          <div className="mt-6 space-y-4 border-t border-gray-200 pt-6 text-sm">
            {[
              {
                label: "Confirmar contraseña",
                key: "confirmPassword",
                type: "password",
                minLength: 8,
                maxLength: 64,
              },
              {
                label: "Nombre",
                key: "nombre",
                type: "text",
                minLength: 2,
              },
              {
                label: "Apellido",
                key: "apellido",
                type: "text",
                minLength: 2,
              },
              {
                label: "Dirección",
                key: "direccion",
                type: "text",
              },
              {
                label: "Teléfono",
                key: "telefono",
                type: "tel",
                minLength: 8,
              },
              {
                label: "DNI",
                key: "dni",
                type: "text",
                minLength: 8,
              },
              {
                label: "Nombre de usuario",
                key: "usuario",
                type: "text",
                minLength: 3,
              },
            ].map(({ label, key, type, minLength, maxLength }) => (
              <div key={key}>
                <label
                  htmlFor={key}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {label}
                </label>
                <input
                  key={key}
                  type={type}
                  value={form[key as keyof typeof form]}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  placeholder={label}
                  required
                  minLength={minLength}
                  maxLength={maxLength}
                  disabled={loading}
                  className="w-full text-gray-900 border border-gray-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold text-white mt-6 transition-all ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
          }`}
        >
          {loading ? "Cargando..." : isRegister ? "Registrarse" : "Entrar"}
        </button>

        {/* enlace para cambiar modo */}
        <div className="flex items-center justify-center gap-6 mt-4">
          <p className={"text-sm text-gray-800"}>
            {isRegister ? "¿Ya tenés una cuenta?" : "¿No tenés cuenta?"}
          </p>
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setGlobalError("");
            }}
            disabled={loading}
            className="text-sm text-white hover:underline font-medium ml-1"
          >
            {isRegister ? "Iniciar sesión" : "Registrate"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
