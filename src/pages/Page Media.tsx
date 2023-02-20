import axios from "axios";
import { useEffect, useState } from "react";
import CarteChanson from "../components/CarteChanson";
import Searchbar from "../components/SearchBar";
import { Chanson } from "./Page Play";

const PageMedia = () => {
  useEffect(() => {
    axios
      // recuperation des données (toutes les chansons)
      .get("http://localhost:8080/api/chanson")
      .then((retourReponseChansons) => {
        const listeCompleteChansons = retourReponseChansons.data;
        setAffichageChansons(listeCompleteChansons);
      });
  }, []);

  const [affichageChansons, setAffichageChansons] = useState<Chanson[]>([]);
  // recherche via SearchBar//
  const [search, setSearch] = useState<string>("");
  // recherche via filtre categories dropdown//
  const [chansonsFilter, setChansonsFilter] = useState<string>("");

  return (
    <div>
      <h1>Page-Média</h1>
      <Searchbar
        toutesChansonsAAfficher={affichageChansons}
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
            <div key={chanson.id}>
              <CarteChanson
                chansonAAfficher={chanson}
                key={`optioncateg${chanson.id}`}
              />
            </div>
          );
        })}
    </div>
  );
};

export default PageMedia;
