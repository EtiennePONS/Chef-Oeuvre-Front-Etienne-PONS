import { NavLink } from "react-router-dom";
import "./NaviBar.css";

const NaviBar = () => {
  return (
    <div
      className="btn-group"
      role="group"
      aria-label="Basic radio toggle button group"
    >
      <NavLink className="btn btn-outline-primary me-4" to="/" end>
        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio1"
          autoComplete="off"
        />
        Radio 1
      </NavLink>
      <NavLink className="btn btn-outline-primary me-4" to="/pagePlay" end>
        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio2"
          autoComplete="off"
        />
        Radio 2
      </NavLink>
      <NavLink
        className="btn btn-outline-primary me-4"
        to="/pageInscription"
        end
      >
        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio3"
          autoComplete="off"
        />
        Radio 3
      </NavLink>
      <NavLink className="btn btn-outline-primary me-4" to="/pageConnexion" end>
        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio4"
          autoComplete="off"
        />
        Radio 4
      </NavLink>
      <NavLink
        className="btn btn-outline-primary me-4"
        to="/pageMédiathèque"
        end
      >
        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio5"
          autoComplete="off"
        />
        Radio 5
      </NavLink>{" "}
      <NavLink className="btn btn-outline-primary me-4" to="/pageGalerie" end>
        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio6"
          autoComplete="off"
        />
        Radio 6
      </NavLink>
    </div>
  );
};

export default NaviBar;
