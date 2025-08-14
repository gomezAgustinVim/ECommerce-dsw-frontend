import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="">   {/* intenta usar tailwind para dar los estilos y etiquetas descriptivas como header y nav */} 
      <nav className="flex flex-col md:flex-row justify-around"> {/* ejemplo con tailwind. Anteriormente: header-container  */}
        <Link to='/' className="header-box"> {/* ejemplo de navegacion con react-router */}
          <h1>Muebles a tu alcance</h1>
        </Link>
        <div className="top-right-box">
          <p>Este es tu lugar para decorar tu casa</p>
          <input type="button" value="Ingresá acá" />
        </div>
        <h2>Exibidor</h2>
        <ul>
          <li>
            <strong>Muebles</strong>
          </li>
          <li>
            <strong>Sillones</strong>
          </li>
          <li>
            <strong>Pequeños Muebles</strong>
          </li>
        </ul>
      </nav>
    </header>
  );
}