import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <div>
      <nav className="navbar shadow" data-bs-theme="">
        <form className="container-fluid justify-content-start">
          <NavLink to="/" end className="nav-link">
            <button className="btn btn-lg btn-bd-primary me-4" type="button">
              Page-Home
            </button>
          </NavLink>
          <NavLink to="/pagePlay" end className="nav-link">
            <button className="btn btn-lg btn-bd-primary me-4" type="button">
              Page-Play
            </button>
          </NavLink>
          <NavLink to="/pageInscription" end className="nav-link">
            <button className="btn btn-lg btn-bd-primary me-4" type="button">
              Inscription
            </button>
          </NavLink>
          <NavLink to="/pageConnexion" end className="nav-link">
            <button className="btn btn-lg btn-bd-primary me-4" type="button">
              Connexion
            </button>
          </NavLink>
          <NavLink to="/pageMédiathèque" end className="nav-link">
            <button className="btn btn-lg btn-bd-primary me-4" type="button">
              Médiathèque
            </button>
          </NavLink>
          <NavLink to="/pageGalerie" end className="nav-link">
            <button className="btn btn-lg btn-bd-primary me-4" type="button">
              Galerie
            </button>
          </NavLink>
        </form>
      </nav>
    </div>
  );
};

export default NavBar;
