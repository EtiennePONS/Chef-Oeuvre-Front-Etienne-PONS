import axios from "axios";
import { FormEvent, useEffect, useRef, useState } from "react";
import CarteVisuel from "../components/CarteVisuel";
import { Visuel } from "./Page Play";

export interface visuelAModifier {
  Visuel: String;
  CanalMidi: Number;
  PgmMidi: Number;
  NoteMidi: Number;
  chanson:{
    id: Number
  }
}

const PageGalerie = () => {
    useEffect(() => {
        axios
      // recuperation des données (tout les Visuels)
        .get("http://localhost:8080/api/visuel")
        .then((retourReponseVisuels) => {
        const listeCompleteVisuels = retourReponseVisuels.data;
        setAffichageVisuels(listeCompleteVisuels);
        // setChansonsAAfficher(retourReponseVisuels.data);
      });
    }, []);

    const handleCreationVisuel = (e:FormEvent) => {
        e.preventDefault();
        axios
        .post(`http://localhost:8080/api/visuel`, {
        Visuel: TitreCreationVisuelElement.current?.value,
        CanalMidi: CanalMidiCreationVisuelElement.current?.value,
        PgmMidi: PgmMidiCreationVisuelElement.current?.value,
        NoteMidi: NoteMidiCreationVisuelElement.current?.value,
        chanson: {id:ChansonCreationVisuelElement.current?.value},
        })
        .then((retourVisuelCree)=>{
        console.log(retourVisuelCree.data);       
        });
    };

    const handleSuppVisuel = (visuelASupprimer:Visuel) =>{
        axios
        .delete(`http://localhost:8080/api/visuel/${visuelASupprimer.id}`)
        .then((retourChansonSupprimee)=>{
        console.log(retourChansonSupprimee.data);
        })
    };

    const handleModifVisuel = (visuelAModifier:visuelAModifier, idvisuelAModifier: number) =>{
      console.log("Info modification", visuelAModifier, "info Id à modifier ", idvisuelAModifier)

        axios
        .patch(`http://localhost:8080/api/visuel/${idvisuelAModifier}`, visuelAModifier
  )
        .then((retourChansonModifiee)=>{


    }).catch((error)=>
        console.log(error))
  }; 
    
    const [affichageVisuels, setAffichageVisuels] = useState<Visuel[]>([]);
    const TitreCreationVisuelElement = useRef<HTMLInputElement>(null);
    const CanalMidiCreationVisuelElement = useRef<HTMLInputElement>(null);
    const PgmMidiCreationVisuelElement = useRef<HTMLInputElement>(null);
    const NoteMidiCreationVisuelElement = useRef<HTMLInputElement>(null);
    const ChansonCreationVisuelElement = useRef<HTMLInputElement>(null);
  
  return(
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
                <input
                  type="text"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Chanson"
                  ref={ChansonCreationVisuelElement}
                />
                <label htmlFor="floatingPassword">Chanson</label>
              </div>
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
                <input
                  type="number"
                  min="1"
                  max="16"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Chanson"
                  ref={CanalMidiCreationVisuelElement}
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
                  placeholder="Chanson"
                  ref={PgmMidiCreationVisuelElement}
                />
                <label htmlFor="floatingPassword">Programme Midi (1-128)</label>
              </div>     
              <div className="form-floating mb-3">
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
              <button type="button" className="btn btn-primary" onClick={handleCreationVisuel} data-bs-dismiss="modal">
                Creer le Visuel
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="SurfaceDeChoixDeVisuels" />
      {affichageVisuels.map((visuel) => {
        return (
            <CarteVisuel
              visuel={visuel}
              demandeSuppressionVisuel={handleSuppVisuel}
              donneesPourModificationVisuel={handleModifVisuel}
              key={visuel.id}
            />

        );
      })}
    </div>
  );
}
export default PageGalerie;