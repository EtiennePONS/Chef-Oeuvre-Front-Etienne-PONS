import axios from "axios";
import { useEffect } from "react";

const PageGalerie = () => {
  useEffect(() => {
    axios
      // recuperation des données (tout les Visuels)
      .get("http://localhost:8080/api/visuel")
      .then((retourReponseVisuels) => {
        console.log(retourReponseVisuels.data);
        // setChansonsAAfficher(retourReponseVisuels.data);
      });
  });
  return (
    <div>
      <h1>PageGalerie</h1>
    </div>
  );
};

export default PageGalerie;
