import React, { useState } from "react";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false); // controla si estamos en modo login o registro
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      // modo registro
      if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }
      console.log("Registrando usuario con:", { email, password });
    } else {
      // modo login
      console.log("Iniciando sesión con:", { email, password });
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

        {/* Email */}
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
          />
        </div>

        {/* Password */}
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
          />
        </div>

        {/* Confirmar contraseña solo si es registro */}
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
            />
          </div>
        )}

        {/* Botón principal */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          {isRegister ? "Registrarse" : "Entrar"}
        </button>

        {/* Enlace para cambiar modo */}
        <p className={`text-sm text-center text-gray-600 ${isRegister ? 'mt-8' : 'mt-4'}`}>
          {isRegister ? "¿Ya tenés una cuenta?" : "¿No tenés cuenta?"}{" "}
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-white hover:underline font-medium ml-1 bg-blue-500 px-2 py-1 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            {isRegister ? "Iniciar sesión" : "Registrate"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;