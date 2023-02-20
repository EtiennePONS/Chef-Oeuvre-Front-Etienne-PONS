import { Chanson } from "../pages/Page Play";

interface CarteChansonProps {
  chansonAAfficher: Chanson;
  // chansonVersMedia: (chanson: Chanson) => void;
}

// Le role de ce composant est d'afficher une carte contenant les détails d'UN ingredient
const CarteChanson = ({
  chansonAAfficher,
}: // chansonVersMedia,
CarteChansonProps) => {
  const handleModifChanson = () => {
    // chansonVersMedia(chansonAAfficher);
    // console.log(handleAjout);
  };
  // ItemAAjouter(typedValue);
  return (
    <div
      className="btn card text-center mb-3 shadow"
      onClick={handleModifChanson}
    >
      <div className="card-body">
        <h5 className="card-title">{chansonAAfficher.Titre}</h5>
        <p className="card-text">Ch.{chansonAAfficher.CanalMidi}</p>
        <p className="card-text">Pgm {chansonAAfficher.PgmMidi}</p>
      </div>
    </div>
  );
};

export default CarteChanson;
