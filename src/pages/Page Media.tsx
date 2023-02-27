import axios from "axios";
import { FormEvent, useEffect, useRef, useState } from "react";
import CarteChanson from "../components/CarteChanson";
import Searchbar from "../components/SearchBar";
import { Chanson, ChansonAModifier } from "./Page Home";

// Composant principal
const PageMedia = () => {
  // Appel au chargement de la page
  useEffect(() => {
    axios
      // recuperation des données (toutes les chansons)
      .get("http://localhost:8080/api/chanson")
      .then((retourReponseChansons) => {
        const listeCompleteChansons = retourReponseChansons.data;
        setAffichageChansons(listeCompleteChansons);
      });
  }, []);

  // Fonction pour création d'une chanson
  const handleCreationChanson = (e: FormEvent) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/api/chanson`, {
        Titre: TitreCreationChansonElement.current?.value,
        CanalMidi: CanalMidiCreationChansonElement.current?.value,
        PgmMidi: PgmMidiCreationChansonElement.current?.value,
      })
      .then((retourChansonCreee) => {
        window.location = document.location;
      });
  };

  // Fonction pour supprimer une chanson
  const handleSuppChanson = (chansonASupprimer: Chanson) => {
    axios
      .delete(`http://localhost:8080/api/chanson/${chansonASupprimer.id}`)
      .then((retourChansonSupprimee) => {
        window.location = document.location;
      });
  };

  // Fonction pour modifier une chanson
  const handleModifChanson = (
    chansonAModifier: ChansonAModifier,
    idchansonAModifier: number
  ) => {
    axios
      .patch(
        `http://localhost:8080/api/chanson/${idchansonAModifier}`,
        chansonAModifier
      )
      .then((retourChansonModifiee) => {
        window.location = document.location;
      })
      .catch((error) => console.log(error));
  };

  // affichage dynamique des chansons via useState
  const [affichageChansons, setAffichageChansons] = useState<Chanson[]>([]);
  // recherche dynamique "SearchBar" via useState
  const [search, setSearch] = useState<string>("");
  // recherche dynamique via filtre "dropdown" via useState
  const [chansonsFilter, setChansonsFilter] = useState<string>("");

  // entrées des inputs via useRef
  const TitreCreationChansonElement = useRef<HTMLInputElement>(null);
  const CanalMidiCreationChansonElement = useRef<HTMLInputElement>(null);
  const PgmMidiCreationChansonElement = useRef<HTMLInputElement>(null);

  return (
    <div>
      <h1>Page-Chansons</h1>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#creationChanson"
      >
        Créer une nouvelle chanson
      </button>
      <div
        className="modal fade"
        id="creationChanson"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Création d'une nouvelle Chanson
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  ref={TitreCreationChansonElement}
                />
                <label htmlFor="floatingPassword">Titre de la chanson</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="number"
                  min="1"
                  max="16"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  ref={CanalMidiCreationChansonElement}
                />
                <label htmlFor="floatingPassword">Canal Midi (1-16)</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="number"
                  min="1"
                  max="128"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  ref={PgmMidiCreationChansonElement}
                />
                <label htmlFor="floatingPassword">Programme Midi (1-128)</label>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Annuler
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCreationChanson}
                data-bs-dismiss="modal"
              >
                Creer la Chanson
              </button>
            </div>
          </div>
        </div>
      </div>
      <Searchbar
        affichageChansons={affichageChansons}
        parentUseStateSearch={setSearch}
        parentUseStateFiltre={setChansonsFilter}
      />
      <div className="SurfaceDeChoixDeChansons" />
      {affichageChansons
        .filter((chanson) => {
          if (chansonsFilter !== "") {
            return chanson.id === Number(chansonsFilter);
          } else {
            return chanson;
          }
        })
        .filter((Chanson) => {
          return Chanson.Titre.toLocaleLowerCase().includes(search);
        })
        .map((chanson) => {
          return (
            // <div >
            <CarteChanson
              chanson={chanson}
              demandeSuppressionChanson={handleSuppChanson}
              donneesPourModificationChanson={handleModifChanson}
              key={chanson.id}
            />
            // </div>
          );
        })}
    </div>
  );
};

export default PageMedia;
