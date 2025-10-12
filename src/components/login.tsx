import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Iniciando sesión con:", { email, password });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-md w-80"
      >
        <h2 className="text-xl font-semibold mb-6 text-center">Iniciar sesión</h2>
        
        {/* Campo de Correo */}
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
          />
        </div>

        {/* Campo de Contraseña */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            placeholder="Ingresa tu contraseña"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

 export default Login;