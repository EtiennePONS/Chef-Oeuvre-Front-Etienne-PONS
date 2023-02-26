import { SetStateAction } from "react";
import { Chanson } from "../pages/Page Play";

// import "./Searchbar.css";

interface SearchBarProps {
  affichageChansons: Chanson[];
  parentUseStateSearch: (event: SetStateAction<string>) => void;
  parentUseStateFiltre: (event: SetStateAction<string>) => void;
}

// Ce composant attend une liste de catégorie à afficher
const SearchBar = ({
  affichageChansons,
  parentUseStateSearch,
  parentUseStateFiltre,
}: SearchBarProps) => {
  const handleChansonSelect = (e: any) => {
    const chansonSelectedValue = e.currentTarget.value;
    parentUseStateFiltre(chansonSelectedValue); // fait appel à setChansonFilter dans Page-Média
  };
  const handleRecherche = (e: any) => {
    const chansonRecherchedValue = e.currentTarget.value.toLocaleLowerCase();
    parentUseStateSearch(chansonRecherchedValue);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-8 col-xs-offset-2">
          <div className="input-group">
            <div className="input-group-btn search-panel input-group-text">
              <div className="form-floating">
                <select
                  className="form-select"
                  id="floatingSelect"
                  aria-label="Floating label select example"
                  defaultValue=""
                  onChange={(e) => handleChansonSelect(e)}
                >
                  <option value="">Toutes les chansons</option>
                  {affichageChansons.map((chanson) => {
                    return (
                      <option
                        key={chanson.id}
                        value={chanson.id}                
                      >
                        {chanson.Titre}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="floatingSelect">Recherche</label>
              </div>
            </div>

            <input
              type="text"
              className="form-control"
              name="x"
              id="search"
              placeholder="Search"
              onInput={(e) => handleRecherche(e)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
