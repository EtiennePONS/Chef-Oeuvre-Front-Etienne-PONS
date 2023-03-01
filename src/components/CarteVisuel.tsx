import axios from "axios";
import { SetStateAction, useRef, useState } from "react";
import { Chanson, NoteMidi, Visuel, VisuelAModifier } from "../pages/Page Home";

interface CarteVisuelProps {
  visuel: Visuel;
  affichageChansons: Chanson[];
  affichageNotes: NoteMidi[];
  parentUseStateFiltre: (event: SetStateAction<string>) => void;
  demandeSuppressionVisuel: (visuel: Visuel) => void;
  donneesPourModificationVisuel: (
    visuel: VisuelAModifier,
    visuelid: number
  ) => void;
}

// Composant principal
const CarteVisuel = ({
  visuel,
  affichageChansons,
  affichageNotes,
  demandeSuppressionVisuel,
  donneesPourModificationVisuel,
}: CarteVisuelProps) => {
  const handleChansonSelectPourCreationOuModificationVisuel = (e: any) => {
    const chansonchoisi = e.currentTarget.value;
    axios
      .get(`http://localhost:8080/api/chanson/${chansonchoisi}`)
      .then((retourChansonChoisi) => {
        const choixChansonPourCreationVisuel = retourChansonChoisi.data;
        setChansonChoisiPourCreationOuModificationVisuel(
          choixChansonPourCreationVisuel
        );
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
      });
  };

  const handleSuppressionVisuel = () => {
    demandeSuppressionVisuel(visuel);
  };
  const handleModifVisuel = (visuelid: number) => {
    if (
      VisuelModificationVisuelElement.current &&
      chansonChoisiPourCreationOuModificationVisuel &&
      noteMidiChoisiPourCreationOuModificationVisuel
    ) {
      const visuelAModifier: VisuelAModifier = {
        Visuel: VisuelModificationVisuelElement.current.value,
        CanalMidi: Number(
          chansonChoisiPourCreationOuModificationVisuel.CanalMidi
        ),
        PgmMidi: Number(chansonChoisiPourCreationOuModificationVisuel.PgmMidi),
        NoteMidi: Number(noteMidiChoisiPourCreationOuModificationVisuel.id),
        chanson: {
          id: Number(chansonChoisiPourCreationOuModificationVisuel.id),
        },
        noteMidi: {
          id: Number(noteMidiChoisiPourCreationOuModificationVisuel.id),
        },
      };
      donneesPourModificationVisuel(visuelAModifier, visuelid);
    }
  };

  const [
    chansonChoisiPourCreationOuModificationVisuel,
    setChansonChoisiPourCreationOuModificationVisuel,
  ] = useState<Chanson>();
  const [
    noteMidiChoisiPourCreationOuModificationVisuel,
    setNoteMidiChoisiPourCreationOuModificationVisuel,
  ] = useState<NoteMidi>();

  const VisuelModificationVisuelElement = useRef<HTMLInputElement>(null);
  // const CanalMidiModificationVisuelElement = useRef<HTMLInputElement>(null);
  // const PgmMidiModificationVisuelElement = useRef<HTMLInputElement>(null);
  // const NoteMidiModificationVisuelElement = useRef<HTMLInputElement>(null);
  // const ChansonIdModificationVisuelElement = useRef<HTMLInputElement>(null);

  return (
    <div>
      <div
        className="btn card text-center mb-3 shadow"
        data-bs-toggle="modal"
        data-bs-target={`#${visuel.id.toString()}`}
      >
        <div className="card-body">
          <h5 className="card-title">{visuel.chanson.Titre}</h5>
          <h5 className="card-title">{visuel.Visuel}</h5>
          <p className="card-text">Ch.{visuel.chanson.CanalMidi}</p>
          <p className="card-text">Pgm {visuel.chanson.PgmMidi}</p>
          <p className="card-text">
            Note: {visuel.noteMidi.NoteString} Numéro:{visuel.noteMidi.id}
          </p>
        </div>
      </div>
      <div
        className="modal fade"
        id={visuel.id.toString()}
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Formulaire d'édition de Visuel
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* <div className="mb-3">
                <label >ChansonID</label>
                <input
                  type="number"
                  min="1"
                  className="form-control"
                  placeholder={visuel.chanson.Titre}
                  ref={ChansonIdModificationVisuelElement}
                />
              </div> */}
              <div className="mb-3">
                <label>Titre du Visuel</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={visuel.Visuel}
                  ref={VisuelModificationVisuelElement}
                />
              </div>
              <div className="mb-3">
                <input className="form-control" type="file" id="formFile" />
              </div>
              <div className="mb-3">
                <label>Chanson</label>
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
              </div>
              <div className="mb-3">
                <span className="input-group-text mb-3">
                  Canal Midi{" "}
                  {chansonChoisiPourCreationOuModificationVisuel?.CanalMidi}
                </span>
              </div>
              <div className="mb-3">
                <span className="input-group-text mb-3">
                  Programme{" "}
                  {chansonChoisiPourCreationOuModificationVisuel?.PgmMidi}
                </span>
                {/* <label>Canal Midi (1-16)</label> */}
                {/* <input
                  type="number"
                  min="1"
                  max="16"
                  className="form-control"
                  placeholder={visuel.chanson.CanalMidi.toString()}
                  ref={CanalMidiModificationVisuelElement}
                /> */}
              </div>
              <div className="mb-3">
                {/* <label>Programme Midi (1-128)</label> */}
                {/* <input
                  type="number"
                  min="1"
                  max="128"
                  className="form-control"
                  placeholder={visuel.chanson.PgmMidi.toString()}
                  ref={PgmMidiModificationVisuelElement}
                /> */}
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
              <div className="form-floating mb-3"></div>

              {/* <div className="mb-3">
                <label>Note Midi (1-128)</label>
                <input
                  type="number"
                  min="1"
                  max="128"
                  className="form-control"
                  placeholder={visuel.NoteMidi.toString()}
                  ref={NoteMidiModificationVisuelElement}
                />
              </div> */}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={handleSuppressionVisuel}
              >
                Supprimer le Visuel
              </button>
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
                data-bs-dismiss="modal"
                onClick={() => handleModifVisuel(visuel.id)}
              >
                Enregistrer les modifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CarteVisuel;
