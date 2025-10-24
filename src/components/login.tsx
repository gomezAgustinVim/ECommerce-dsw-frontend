import React, { useState } from "react";
import api from "../api/axiosInstance";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);


    // validaciones 
    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      setLoading(false);
      return;
    }

    if (isRegister) {
      if (password !== confirmPassword) {
        setError("Las contraseñas no coinciden");
        setLoading(false);
        return;
      }
      if (password.length < 6) {
        setError("La contraseña debe tener al menos 6 caracteres");
        setLoading(false);
        return;
      }

      console.log("Registro exitoso:", { email, password });
      alert("¡Registro exitoso!");
      setIsRegister(false); // cambia a login despues del registro
    } else {
      try {
        const response = await api.post("/clientes/login", {
          email,
          contrasenia: password,
        });
        alert("¡Inicio de sesión exitoso!");
        console.log(response.data);
      } catch (err: any) {
        if (err.response && err.response.status === 401) {
          setError("Email o contraseña incorrecta");
        } else {
          setError("Error al conectar con el servidor");
        }
        console.error("Error en login:", err);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-80"
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

        {/* confirmar contraseña en modo registro */}
        {isRegister && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar contraseña
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              placeholder="Repite tu contraseña"
              required
              disabled={loading}
            />
          </div>
        )}

        {/* botón */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg transition duration-200 ${loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
            } text-white`}
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