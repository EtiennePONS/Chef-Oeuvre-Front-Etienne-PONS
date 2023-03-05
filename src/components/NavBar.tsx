import { NavLink } from "react-router-dom";
import "./NavBar.css";
// import "../../public/icons/PageHome.png";

const NavBar = () => {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg
      //  bg-body-tertiary 
       bg-dark"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="">
            Navbar
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" end className="nav-link">
                  <button className="btn btn-dark btn-Navbar" type="submit">
                    <img
                      width="50"
                      src="/icons/PageHome.png"
                      className="LogoNavBar"
                      alt="..."
                    />
                  </button>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/pagePlay" end className="nav-link">
                  <button className="btn btn-dark btn-Navbar" type="submit">
                    <img
                      width="50"
                      src="/icons/PagePlay.png"
                      className="LogoNavBar"
                      alt="..."
                    />
                  </button>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/pageInscription" end className="nav-link">
                  <button className="btn btn-dark btn-Navbar" type="submit">
                    <img
                      width="50"
                      src="/icons/PageInscription.png"
                      className="LogoNavBar"
                      alt="..."
                    />
                  </button>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/pageConnexion" end className="nav-link">
                  <button className="btn btn-dark btn-Navbar" type="submit">
                    <img
                      width="50"
                      src="/icons/PageConnexion.png"
                      className="LogoNavBar"
                      alt="..."
                    />
                  </button>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/pageMédiathèque" end className="nav-link">
                  <button className="btn btn-dark btn-Navbar" type="submit">
                    <img
                      width="50"
                      src="/icons/PageMedia.png"
                      className="LogoNavBar"
                      alt="..."
                    />
                  </button>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/pageGalerie" end className="nav-link">
                  <button className="btn btn-dark btn-Navbar" type="submit">
                    <img
                      width="50"
                      src="/icons/PageGalerie.png"
                      className="LogoNavBar"
                      alt="..."
                    />
                  </button>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
