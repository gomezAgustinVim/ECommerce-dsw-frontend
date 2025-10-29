import React, { useState } from "react";
import api from "../api/axiosInstance";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [dni, setDni] = useState("");
  const [usuario, setUsuario] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // validaciones 
      if (!email || !password) {
        setError("Todos los campos son obligatorios");
        setLoading(false);
        return;
      }

      if (isRegister) {
        const response = await api.post("/clientes", {
          email,
          contrasenia: password,
          nombre,
          apellido,
          direccion,
          telefono,
          dni,
          usuario,
          rol: "user",
          fondos: 0,
        });

        alert("¡Registro exitoso!");
        console.log(response.data);
        setIsRegister(false);

        if (password !== confirmPassword) {
          setError("Las contraseñas no coinciden");
          setLoading(false);
          return;
        }

        if (password.length < 8) {
          setError("La contraseña debe tener al menos 8 caracteres");
          setLoading(false);
          return;
        }

        console.log("Registro exitoso:", { email, password });
        alert("¡Registro exitoso!");
        setIsRegister(false); // cambia a login despues del registro
      } else {
        const response = await api.post("/clientes/login", {
          email,
          contrasenia: password,
        });
        alert("¡Inicio de sesión exitoso!");
        console.log(response.data);
      }
    } catch (err: any) {
      if (err.response && err.response.status === 401) {
        setError("Email o contraseña incorrecta");
      } else if (err.response && err.response.status === 400) {
        setError("Solicitud inválida. Por favor, verifica que los datos ingresados sean correctos.");
      } else {
        setError("Error al conectar con el servidor");
      }
      console.error("Error en login:", err);
    } finally {
      setLoading(false);
    }
  }


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
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* mail */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Correo electrónico
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            placeholder="ejemplo@correo.com"
            required
            disabled={loading}
          />
        </div>

        {/* password */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            placeholder="Ingresa tu contraseña"
            required
            disabled={loading}
          />
        </div>

        {/* Campos extra solo en registrarse */}
        {isRegister && (
          <div className="mt-6 space-y-4 border-t border-gray-200 pt-6">
            {/* Confirmar contraseña */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Confirmar contraseña
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repite tu contraseña"
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
                disabled={loading}
              />
            </div>

            {/* Nombre y Apellido en fila */}
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
              <input
                type="text"
                placeholder="Apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                className="p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>

            {/* Otros campos */}
            <input
              type="text"
              placeholder="Dirección"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
            <input
              type="tel"
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
            <input
              type="text"
              placeholder="DNI"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
            <input
              type="text"
              placeholder="Nombre de usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              required
            />
          </div>
        )}

        {/* botón */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-xl font-semibold text-black mt-4 transition-all ${loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg"
            }`}
        >
          {loading ? "Cargando..." : isRegister ? "Registrarse" : "Entrar"}
        </button>

        {/* enlace para cambiar modo */}
        <p className={`text-sm text-center text-gray-600 ${isRegister ? 'mt-8' : 'mt-4'}`}>
          {isRegister ? "¿Ya tenés una cuenta?" : "¿No tenés cuenta?"}{" "}
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setError("");
            }}
            disabled={loading}
            className="text-blue-600 hover:underline font-medium ml-1"
          >
            {isRegister ? "Iniciar sesión" : "Registrate"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;