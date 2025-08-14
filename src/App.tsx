import "./App.css";

function App() {
  return (
    <div className="header-container">
      <div className="header-box">
        <h1>Muebles a tu alcance</h1>
      </div>
      <body>
        <p>Este es tu lugar para decorar tu casa</p>
        <input type="button" value="Ingresá acá"></input>
      </body>
      <h1>Exibidor</h1>
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
