import { useRef } from "react";
import { visuelAModifier } from "../pages/Page Galerie";
import { Visuel } from "../pages/Page Play";

interface CarteVisuelProps {
  visuel: Visuel;
  demandeSuppressionVisuel: (visuel: Visuel) => void;
  donneesPourModificationVisuel: (
    visuel: visuelAModifier,
    visuelid: number
  ) => void;
}

const CarteVisuel = ({
  visuel,
  demandeSuppressionVisuel,
  donneesPourModificationVisuel,
}: CarteVisuelProps) => {
  const handleSuppressionVisuel = () => {
    demandeSuppressionVisuel(visuel);
  };
  const handleModifVisuel = (visuelid: number) => {
    if (
      VisuelModificationVisuelElement.current &&
      CanalMidiModificationVisuelElement.current &&
      PgmMidiModificationVisuelElement.current &&
      NoteMidiModificationVisuelElement.current
       && ChansonIdModificationVisuelElement.current
    ) {
      const visuelAModifier: visuelAModifier = {
        Visuel: VisuelModificationVisuelElement.current.value,
        CanalMidi: Number(CanalMidiModificationVisuelElement.current.value),
        PgmMidi: Number(PgmMidiModificationVisuelElement.current.value),
        NoteMidi: Number(NoteMidiModificationVisuelElement.current.value),
        chanson:{id: Number (ChansonIdModificationVisuelElement.current.value)}
      };
      donneesPourModificationVisuel(visuelAModifier, visuelid);
    }
  };

  const VisuelModificationVisuelElement = useRef<HTMLInputElement>(null);
  const CanalMidiModificationVisuelElement = useRef<HTMLInputElement>(null);
  const PgmMidiModificationVisuelElement = useRef<HTMLInputElement>(null);
  const NoteMidiModificationVisuelElement = useRef<HTMLInputElement>(null);
  const ChansonIdModificationVisuelElement = useRef<HTMLInputElement>(null);

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
          <p className="card-text">Pgm{visuel.chanson.PgmMidi}</p>
          <p className="card-text">Note {visuel.NoteMidi}</p>
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
              <div className="mb-3">
                <label >ChansonID</label>
                <input
                  type="number"
                  min="1"
                  className="form-control"
                  placeholder={visuel.chanson.Titre}
                  ref={ChansonIdModificationVisuelElement}
                />
              </div>
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
                <label>Canal Midi (1-16)</label>
                <input
                  type="number"
                  min="1"
                  max="16"
                  className="form-control"
                  placeholder={visuel.chanson.CanalMidi.toString()}
                  ref={CanalMidiModificationVisuelElement}
                />
              </div>
              <div className="mb-3">
                <label>Programme Midi (1-128)</label>
                <input
                  type="number"
                  min="1"
                  max="128"
                  className="form-control"
                  placeholder={visuel.chanson.PgmMidi.toString()}
                  ref={PgmMidiModificationVisuelElement}
                />
              </div>
              <div className="mb-3">
                <label>Note Midi (1-128)</label>
                <input
                  type="number"
                  min="1"
                  max="128"
                  className="form-control"
                  placeholder={visuel.NoteMidi.toString()}
                  ref={NoteMidiModificationVisuelElement}
                />
              </div>
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
