import { Visuel } from "../pages/Page Play";

interface CarteVisuelProps {
  visuelAAfficher: Visuel;
  // chansonVersMedia: (chanson: Chanson) => void;
}

// Le role de ce composant est d'afficher une carte contenant les détails d'UN ingredient
const CarteVisuel = ({
  visuelAAfficher,
}: // chansonVersMedia,
CarteVisuelProps) => {
  const handleModifVisuel = () => {
    // chansonVersMedia(chansonAAfficher);
    // console.log(handleAjout);
  };
  // ItemAAjouter(typedValue);
  return (
    <div
      className="btn card text-center mb-3 shadow"
      onClick={handleModifVisuel}
    >
      <div className="card-body">
        <h5 className="card-title">{visuelAAfficher.chanson.Titre}</h5>
        <p className="card-text">Ch.{visuelAAfficher.Visuel}</p>
        <p className="card-text">Pgm {visuelAAfficher.NoteMidi}</p>
      </div>
    </div>
  );
};

export default CarteVisuel;
