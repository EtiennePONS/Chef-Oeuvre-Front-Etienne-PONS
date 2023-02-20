import axios from "axios";
import { useEffect, useState } from "react";
import CarteVisuel from "../components/CarteVisuel";
import { Visuel } from "./Page Play";

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

  const [affichageVisuels, setAffichageVisuels] = useState<Visuel[]>([]);

  return (
    <div>
      <h1>Page-Galerie</h1>

      <div className="SurfaceDeChoixDeVisuels" />
      {affichageVisuels.map((visuel) => {
        return (
          <div key={visuel.id}>
            <CarteVisuel
              visuelAAfficher={visuel}
              key={`optioncateg${visuel.id}`}
            />
          </div>
        );
      })}
    </div>
  );
};
export default PageGalerie;
