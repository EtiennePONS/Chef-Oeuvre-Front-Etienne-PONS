import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div>
      <nav className="navbar">
        <form className="container-fluid justify-content-start">
          <NavLink to="/" end className="nav-link">
            <button className="btn btn-lg btn-bd-primary me-4" type="button">
              <img
                src="/icons/PageHome.png"
                alt="Logo Frigo"
                width="80"
                height="80"
                className="LogoNavbar1"
              />
            </button>
          </NavLink>
          <NavLink to="/pagePlay" end className="nav-link">
            <button className="btn btn-lg btn-bd-primary me-4" type="button">
              <img
                src="/icons/PagePlay.png"
                alt="Logo Frigo"
                width="80"
                height="80"
                className="LogoNavbar2"
              />
            </button>
          </NavLink>
          <NavLink to="/pageInscription" end className="nav-link">
            <button className="btn btn-lg btn-bd-primary me-4" type="button">
              <img
                src="/icons/PageInscription.png"
                alt="Logo Frigo"
                width="80"
                height="80"
                className="LogoNavbar3"
              />
            </button>
          </NavLink>
          <NavLink to="/pageConnexion" end className="nav-link">
            <button className="btn btn-lg btn-bd-primary me-4" type="button">
              <img
                src="/icons/PageConnexion.png"
                alt="Logo Frigo"
                width="80"
                height="80"
                className="LogoNavbar4"
              />
            </button>
          </NavLink>
          <NavLink to="/pageMédiathèque" end className="nav-link">
            <button className="btn btn-lg btn-bd-primary me-4" type="button">
              <img
                src="/icons/PageMedia.png"
                alt="Logo Frigo"
                width="80"
                height="80"
                className="LogoNavbar5"
              />
            </button>
          </NavLink>
          <NavLink to="/pageGalerie" end className="nav-link">
            <button className="btn btn-lg btn-bd-primary me-4" type="button">
              <img
                src="/icons/PageGalerie.png"
                alt="Logo Frigo"
                width="80"
                height="80"
                className="LogoNavbar6"
              />
            </button>
          </NavLink>
        </form>
      </nav>
    </div>
  );
};

export default NavBar;
