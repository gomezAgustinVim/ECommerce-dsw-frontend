export default function Footer() {
  return (
    <footer className="bg-gray-800">
      <div className="flex flex-col md:flex-row justify-around items-center footer-inner">
        <span className="footer-copy">© 2025 <a href="https://github.com/tomaspitavino/tpDSWproposalGomezPitavinoBertottiZajarias" className="footer-link">TuMuebleria™</a>. Todos los derechos reservados.</span>

        <ul className="flex flex-col md:flex-row items-center footer-links">
          <li><a href="#" className="footer-link">Acerca de nosotros</a></li>
          <li><a href="#" className="footer-link">Política de privacidad</a></li>
          <li><a href="#" className="footer-link">Licencias</a></li>
          <li><a href="#" className="footer-link">Contacto: tumuebleria@gmail.com</a></li>
        </ul>
      </div>
    </footer>
  );
}
