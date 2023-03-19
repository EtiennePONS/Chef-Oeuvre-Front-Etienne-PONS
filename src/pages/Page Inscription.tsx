import axios from "axios";
import { FormEvent, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";

// Composant principal
const PageInscription = () => {
  const FirstnameElement = useRef<HTMLInputElement>(null);
  const NameElement = useRef<HTMLInputElement>(null);
  const EmailElement = useRef<HTMLInputElement>(null);
  const PasswordElement = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    console.log("button form clicked", handleSubmitForm);
    console.log(EmailElement.current?.value);
    console.log(PasswordElement.current?.value);

    axios
      .post(`http://localhost:8080/api/auth/register`, {
        Firstname: FirstnameElement.current?.value,
        Name: NameElement.current?.value,
        Email: EmailElement.current?.value,
        Password: PasswordElement.current?.value,
      })
      .then((response) => {
        console.log(response);
        console.log(response.data);
        navigate("/pageConnexion");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="floatingPrénom"
          placeholder="Password"
          ref={FirstnameElement}
        />
        <label htmlFor="floatingInput">Prénom</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="floatingNom"
          placeholder="Password"
          ref={NameElement}
        />
        <label htmlFor="floatingPassword">Nom</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="floatingEmail"
          placeholder="Password"
          ref={EmailElement}
        />
        <label htmlFor="floatingPassword">Email</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
          ref={PasswordElement}
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>
      <div className="col-auto">
        <button
          type="submit"
          className="btn btn-primary mb-3 Lily"
          onClick={handleSubmitForm}
        >
          S'inscrire
        </button>
      </div>
      <div className="form-floating mb-3">
        <button type="button" className="btn btn-secondary mb-3">
          <NavLink to="/" end className="nav-link">
            Annuler
          </NavLink>
        </button>
      </div>
    </div>
  );
};

export default PageInscription;
