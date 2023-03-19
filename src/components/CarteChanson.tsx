import { useRef } from "react";
import { Chanson, ChansonAModifier } from "../pages/Page Home";
import "./CarteChanson.css";

interface CarteChansonProps {
  chanson: Chanson;
  demandeSuppressionChanson: (chanson: Chanson) => void;
  donneesPourModificationChanson: (
    chanson: ChansonAModifier,
    chansonid: number
  ) => void;
}

// Composant principal
const CarteChanson = ({
  chanson,
  demandeSuppressionChanson,
  donneesPourModificationChanson,
}: CarteChansonProps) => {
  const handleSuppressionChanson = () => {
    demandeSuppressionChanson(chanson);
  };

  const TitreModificationChansonElement = useRef<HTMLInputElement>(null);
  const CanalMidiModificationChansonElement = useRef<HTMLInputElement>(null);
  const PgmMidiModificationChansonElement = useRef<HTMLInputElement>(null);

  const handleModifChanson = (chansonid: number) => {
    if (
      TitreModificationChansonElement.current &&
      CanalMidiModificationChansonElement.current &&
      PgmMidiModificationChansonElement.current
    ) {
      const chansonAModifier: ChansonAModifier = {
        Titre: TitreModificationChansonElement.current.value,
        CanalMidi: Number(CanalMidiModificationChansonElement.current.value),
        PgmMidi: Number(PgmMidiModificationChansonElement.current.value),
      };
      donneesPourModificationChanson(chansonAModifier, chansonid);
    }
  };

  return (
    <div>
      <div
        className="btn card text-center mb-3 shadow cartechanson"
        data-bs-theme="dark"
        data-bs-toggle="modal"
        data-bs-target={`#${chanson.id.toString()}`}
      >
        <div className="card-body cardbodychanson">
          <h5 className="card-title">{chanson.Titre}</h5>
          <p className="card-text">Ch.{chanson.CanalMidi}</p>
          <p className="card-text">Pgm {chanson.PgmMidi}</p>
        </div>
      </div>
      <div
        className="modal fade"
        id={chanson.id.toString()}
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Formulaire d'édition de Chanson
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
                <label>Titre de la chanson</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder={chanson.Titre}
                  ref={TitreModificationChansonElement}
                />
              </div>
              <div className="mb-3">
                <label>Canal Midi (1-16)</label>
                <input
                  type="number"
                  min="1"
                  max="16"
                  className="form-control"
                  placeholder={chanson.CanalMidi.toString()}
                  ref={CanalMidiModificationChansonElement}
                />
              </div>
              <div className="mb-3">
                <label>Programme Midi (1-128)</label>
                <input
                  type="number"
                  min="1"
                  max="128"
                  className="form-control"
                  placeholder={chanson.PgmMidi.toString()}
                  ref={PgmMidiModificationChansonElement}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={handleSuppressionChanson}
              >
                Supprimer la Chanson
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
                onClick={() => handleModifChanson(chanson.id)}
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
export default CarteChanson;
