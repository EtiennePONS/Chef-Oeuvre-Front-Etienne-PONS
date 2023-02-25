import axios from "axios";
import { useEffect, useState } from "react";
// import "./Page Play.css";

// interface PagePlayProps {
//   objetUser: MusicienUtilisateur | undefined;
// }

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

let lastChanson: Chanson;
const PagePlay = () => {
  const [chansonAAfficher, setChansonAAfficher] = useState<Chanson>();
  const [visuelAAfficher, setVisuelAAfficher] = useState<Visuel>();

  useEffect(() => {
    window.navigator
      .requestMIDIAccess()
      .then((midiAccess) => {
        console.log("MIDI Ready!");
        for (let entry of midiAccess.inputs) {
          // console.log("MIDI input device: " + entry[1].id);
          entry[1].onmidimessage = onMidiMessage;
        }
      })
      .catch((error) => {
        console.log("Error accessing MIDI devices:", error);
      });
  }, []);

  const onMidiMessage = (midiEvent: WebMidi.MIDIMessageEvent) => {
    let data: Uint8Array = midiEvent.data;

    if (data.length === 2) {
      // la longueur des données Midi conditionne la recherche (2=Chanson) reception que si l'on a 2 données (commande et note).
      let status = data[0]; // status est la premiere valeur de la donnée "data".
      let command = status >>> 4; // command est le quatrieme bit de la premiere valeur de la donnée "data".
      let channel = (status & 0xf) + 1; // Status converti en hexadecimal pour en déduire le canal MIDI et j'ajoute 1 pour me situer entre (1-16) au lieu de (0-15).

      if (command === 0xc) {
        // Si la commande Midi = (192-207).
        let not = data[1]; // not est la deuxieme valeur de la donnée "data".
        let programme = not + 1; // j'ajoute 1 pour me situer entre (1-128) au lieu de (0-127).
        // Le console.log qui suit permet de visualiser n'importe quel signal MIDI (changement de programme) provenant d'une machine Exterieure
        // console.log(`Canal MIDI: ${channel}, Programme MIDI: ${programme}`);

        // mon appel axios je le fais si le canal et le programme que je capte sont différents de la chansonAAfficher du useState (Jérémy)
        if (!chansonAAfficher) {
          // si la Chanson à afficher est differente: alors, lancement de la requette Axios qui suit.
          axios
            .post(`http://localhost:8080/api/chanson/charge`, {
              // Requette Post avec un body
              CanalMidi: channel,
              PgmMidi: programme,
            })

            .then((retourChanson) => {
              // retour de la requette
              let Chanson = retourChanson.data;
              setChansonAAfficher(Chanson);
              lastChanson = Chanson;
            });
        }
      }
    } else if (data.length === 3) {
      // la longueur des données Midi conditionne la recherche (3=Visuel) reception que si l'on a 3 données (commande, note, et velocité)
      let status = data[0]; // status est la premiere valeur de la donnée "data".
      let command = status >>> 4; // command est le quatrieme bit de la premiere valeur de la donnée "data".
      let channel = (status & 0xf) + 1; // Status converti en hexadecimal pour en déduire le canal MIDI et j'ajoute 1 pour me situer entre (1-16) au lieu de (0-15).

      if (command === 0x9) {
        //Si la commande Midi = (144-159).
        let not = data[1]; //  not est la deuxieme valeur de la donnée "data".
        let note = not + 1; // j'ajoute 1 à not pour me situer entre (1-128) au lieu de (0-127).
        // let velocity = data[2]; velocity est la troisième valeur de la donnée "data" (non utilisée dans notre cas).
        // Le console.log qui suit permet de visualiser n'importe quel signal MIDI (attaque de note) provenant d'une machine Exterieure

        // console.log(
        //   `Canal MIDI: ${channel}, Programme MIDI: ${lastChanson.PgmMidi}, Note MIDI: ${note}, Vélocité: ${velocity}`
        // );
        if (!visuelAAfficher) {
          // si le visuel à afficher est different: alors, lancement de la requette Axios qui suit.
          axios
            .post(`http://localhost:8080/api/visuel/charge`, {
              // Requette Post avec un body
              CanalMidi: channel,
              PgmMidi: lastChanson.PgmMidi,
              NoteMidi: note,
            })

            .then((retourVisuel) => {
              // retour de la requette
              let Visuel = retourVisuel.data;
              setVisuelAAfficher(Visuel);
            });
        }
      }
    }
  };

  return (
    <div>
      <div className="card text-bg-sombre">
        <div className="card-body">
          <h5 className="card-title">{chansonAAfficher?.Titre}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Ch.
            {chansonAAfficher?.CanalMidi}
          </h6>
          <p className="card-text">Pgm{chansonAAfficher?.PgmMidi}</p>
        </div>
      </div>
      <div className="card text-bg-sombre">
        <div className="card-body">
          <h5 className="card-title">{visuelAAfficher?.chanson.Titre}</h5>
          <h5 className="card-title">{visuelAAfficher?.Visuel}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Ch.
            {visuelAAfficher?.chanson.CanalMidi}
          </h6>
          <p className="card-text">Pgm{visuelAAfficher?.chanson.PgmMidi}</p>
          <p className="card-text">Note{visuelAAfficher?.NoteMidi}</p>
        </div>
      </div>
    </div>
  );
};
export default PagePlay;
