import "./App.css";

function App() {
  return (
    <div className="header-container">
      <div className="header-box">
        <h1>Muebles a tu alcance</h1>
      </div>
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
    </div>
  );
}

export default App;
