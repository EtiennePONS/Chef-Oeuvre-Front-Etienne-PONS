export interface Chanson {
  id: number;
  Titre: string;
  CanalMidi: number;
  PgmMidi: number;
}
export interface Visuel {
  id: number;
  Visuel: string;
  NoteMidi: number;
  chanson: {
    id: number;
    Titre: string;
    CanalMidi: number;
    PgmMidi: number;
  };
}
export interface ChansonAModifier {
  Titre: string;
  CanalMidi: number;
  PgmMidi: number;
}
export interface VisuelAModifier {
  Visuel: String;
  CanalMidi: Number;
  PgmMidi: Number;
  NoteMidi: Number;
  chanson: {
    id: Number;
  };
}
// Composant principal
const PageHome = () => {
  return (
    <div>
      <h1>PageHome</h1>
    </div>
  );
};

export default PageHome;
