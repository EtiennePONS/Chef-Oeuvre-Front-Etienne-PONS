import axios from "axios";
import { FormEvent, useEffect, useRef, useState } from "react";
import CarteVisuel from "../components/CarteVisuel";
import SearchBar from "../components/SearchBar";
import { Chanson, NoteMidi, Visuel, VisuelAModifier } from "./Page Home";

// Composant principal
const PageVisuels = () => {
  // Appel au chargement de la page
  useEffect(() => {
    axios
      // recuperation des données (tout les Visuels)
      .get("http://localhost:8080/api/visuel")
      .then((retourReponseVisuels) => {
        const listeCompleteVisuels = retourReponseVisuels.data;
        setAffichageVisuels(listeCompleteVisuels);
        // setChansonsAAfficher(retourReponseVisuels.data);
      });
    axios
      // recuperation des données (toutes les chansons)
      .get("http://localhost:8080/api/chanson")
      .then((retourReponseChansons) => {
        const listeCompleteChansons = retourReponseChansons.data;
        setAffichageChansons(listeCompleteChansons);
      });
    axios
      // recuperation des données (toutes les notes)
      .get("http://localhost:8080/api/note-midi")
      .then((retourReponseNotes) => {
        const listeCompleteNotes = retourReponseNotes.data;
        setAffichageNotes(listeCompleteNotes);
      });
  }, []);

  // Fonction pour création d'un visuel
  const handleCreationVisuel = (e: FormEvent) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8080/api/visuel`, {
        Visuel: TitreCreationVisuelElement.current?.value,
        CanalMidi: chansonChoisiPourCreationOuModificationVisuel?.CanalMidi,
        PgmMidi: chansonChoisiPourCreationOuModificationVisuel?.PgmMidi,
        NoteMidi: noteMidiChoisiPourCreationOuModificationVisuel?.id,
        chanson: { id: chansonChoisiPourCreationOuModificationVisuel?.id },
        noteMidi: { id: noteMidiChoisiPourCreationOuModificationVisuel?.id },
      })
      .then((retourVisuelCree) => {
        window.location = document.location;
      });
  };

  // Fonction pour supprimer un visuel
  const handleSuppVisuel = (visuelASupprimer: Visuel) => {
    axios
      .delete(`http://localhost:8080/api/visuel/${visuelASupprimer.id}`)
      .then((retourChansonSupprimee) => {
        window.location = document.location;
      });
  };

  // Fonction pour modifier un visuel
  const handleModifVisuel = (
    visuelAModifier: VisuelAModifier,
    idvisuelAModifier: number
  ) => {
    axios
      .patch(
        `http://localhost:8080/api/visuel/${idvisuelAModifier}`,
        visuelAModifier
      )
      .then((retourChansonModifiee) => {
        window.location = document.location;
      });
  };

  // Fonction qui permet de selectionner une chanson pour création ou modification d'un visuel
  const handleChansonSelectPourCreationOuModificationVisuel = (e: any) => {
    const chansonchoisi = e.currentTarget.value;
    axios
      .get(`http://localhost:8080/api/chanson/${chansonchoisi}`)
      .then((retourChansonChoisi) => {
        const choixChansonPourCreationVisuel = retourChansonChoisi.data;
        setChansonChoisiPourCreationOuModificationVisuel(
          choixChansonPourCreationVisuel
        );
        console.log(choixChansonPourCreationVisuel);
      });
  };
  const handleNoteMidiSelectPourCreationOuModificationVisuel = (e: any) => {
    const noteMidichoisi = e.currentTarget.value;
    axios
      .get(`http://localhost:8080/api/note-midi/${noteMidichoisi}`)
      .then((retourNoteMidiChoisi) => {
        const choixNoteMidiPourCreationVisuel = retourNoteMidiChoisi.data;
        setNoteMidiChoisiPourCreationOuModificationVisuel(
          choixNoteMidiPourCreationVisuel
        );
        console.log(choixNoteMidiPourCreationVisuel);
      });
  };
  // configuration dynamique via choix d'une chanson pour création ou modification d'un visuel via useState
  const [
    chansonChoisiPourCreationOuModificationVisuel,
    setChansonChoisiPourCreationOuModificationVisuel,
  ] = useState<Chanson>();

  const [
    noteMidiChoisiPourCreationOuModificationVisuel,
    setNoteMidiChoisiPourCreationOuModificationVisuel,
  ] = useState<NoteMidi>();

  // recherche dynamique "SearchBar" via useState
  const [search, setSearch] = useState<string>("");
  // recherche dynamique via filtre "dropdown" via useState
  const [chansonsFilter, setChansonsFilter] = useState<string>("");
  // affichage dynamique des chansons via useState
  const [affichageChansons, setAffichageChansons] = useState<Chanson[]>([]);
  // affichage dynamique des visuels via useState
  const [affichageVisuels, setAffichageVisuels] = useState<Visuel[]>([]);
  // affichage dynamique des chansons via useState
  const [affichageNotes, setAffichageNotes] = useState<NoteMidi[]>([]);

  // entrées des inputs via useRef
  const TitreCreationVisuelElement = useRef<HTMLInputElement>(null);
  // const CanalMidiCreationVisuelElement = useRef<HTMLInputElement>(null);
  // const PgmMidiCreationVisuelElement = useRef<HTMLInputElement>(null);
  // const NoteMidiCreationVisuelElement = useRef<HTMLInputElement>(null);
  // const ChansonCreationVisuelElement = useRef<HTMLInputElement>(null);

  return (
    <div>
      <h1>Page-Visuels</h1>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#creationVisuel"
      >
        Créer un nouveau visuel
      </button>
      <div
        className="modal fade"
        id="creationVisuel"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Création d'un nouveau visuel
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
                <select
                  className="form-select"
                  id="inputGroupSelect01"
                  aria-label="Floating label select example"
                  defaultValue=""
                  onChange={(e) =>
                    handleChansonSelectPourCreationOuModificationVisuel(e)
                  }
                >
                  <option value="Liste de chansons"></option>
                  {affichageChansons.map((chanson) => {
                    return (
                      <option key={chanson.id} value={chanson.id}>
                        {chanson.Titre}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="floatingInputValue"></label>
                <label htmlFor="floatingPassword">Chanson</label>
              </div>
              <span className="input-group-text mb-3">
                Canal Midi{" "}
                {chansonChoisiPourCreationOuModificationVisuel?.CanalMidi}
              </span>
              <span className="input-group-text mb-3">
                Programme{" "}
                {chansonChoisiPourCreationOuModificationVisuel?.PgmMidi}
              </span>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Chanson"
                  ref={TitreCreationVisuelElement}
                />
                <label htmlFor="floatingPassword">Intitulé</label>
              </div>
              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  id="inputGroupSelect01"
                  aria-label="Floating label select example"
                  defaultValue=""
                  onChange={(e) =>
                    handleNoteMidiSelectPourCreationOuModificationVisuel(e)
                  }
                >
                  <option value="Liste de chansons"></option>
                  {affichageNotes.map((NoteMidi) => {
                    return (
                      <option key={NoteMidi.id} value={NoteMidi.id}>
                        {NoteMidi.NoteString}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="floatingInputValue"></label>
                <label htmlFor="floatingPassword">Notes-Midi</label>
              </div>
              {/* <div className="form-floating mb-3">
                <input
                  type="number"
                  min="1"
                  max="128"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Chanson"
                  ref={NoteMidiCreationVisuelElement}
                />
                <label htmlFor="floatingPassword">Note Midi (1-128)</label>
              </div> */}
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
                onClick={handleCreationVisuel}
                data-bs-dismiss="modal"
              >
                Creer le Visuel
              </button>
            </div>
          </div>
        </div>
      </div>
      <SearchBar
        affichageChansons={affichageChansons}
        parentUseStateSearch={setSearch}
        parentUseStateFiltre={setChansonsFilter}
      />
      <div className="SurfaceDeChoixDeVisuels" />
      {affichageVisuels
        .filter((visuel) => {
          if (chansonsFilter !== "") {
            return visuel.chanson.id === Number(chansonsFilter);
          } else {
            return visuel.chanson.Titre;
          }
        })
        .filter((visuel) => {
          return visuel.chanson.Titre.toLocaleLowerCase().includes(search);
        })

        .map((visuel) => {
          return (
            <CarteVisuel
              visuel={visuel}
              affichageChansons={affichageChansons}
              affichageNotes={affichageNotes}
              parentUseStateFiltre={
                handleChansonSelectPourCreationOuModificationVisuel
              }
              demandeSuppressionVisuel={handleSuppVisuel}
              donneesPourModificationVisuel={handleModifVisuel}
              key={visuel.id}
            />
          );
        })}
    </div>
  );
};
export default PageVisuels;
