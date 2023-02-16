import axios from "axios";
import { FormEvent, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MusicienUtilisateur } from "../App";

interface ConnexionProps {
  PropsUtilisateurConnecté: React.Dispatch<
    React.SetStateAction<MusicienUtilisateur | undefined>
  >;
}

const PageConnexion = ({ PropsUtilisateurConnecté }: ConnexionProps) => {
  const EmailElement = useRef<HTMLInputElement>(null);
  const PasswordElement = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    // ici on met une condition, si une des 2 valeurs du champs est vide, on ne rentre pas dans notre axios

    if (EmailElement.current?.value === "") {
      return "Tous les champs doivent être remplit";
    }
    if (PasswordElement.current?.value === "") {
      return "Tous les champs doivent être remplit ";
    }
    axios
      .post(`http://localhost:8080/api/auth/login`, {
        Email: EmailElement.current?.value,
        Password: PasswordElement.current?.value,
      })
      .then((response) => {
        console.log(response);
        const token = response.data.accessToken;
        const userConnected = response.data.user;
        PropsUtilisateurConnecté(userConnected);

        console.log(response.data.accessToken);
        // stock "set" le token
        localStorage.setItem("token", token);
        navigate("/pagePlay");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="floatingPassword"
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
          className="btn btn-primary mb-3"
          onClick={handleSubmitForm}
        >
          Connexion
        </button>
      </div>
      <div className="form-floating mb-3">
        <button type="button" className="btn btn-primary mb-3">
          <NavLink to="/" end className="nav-link">
            Annuler
          </NavLink>
        </button>
      </div>
    </div>
  );
};

export default PageConnexion;
