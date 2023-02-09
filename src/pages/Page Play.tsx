import axios from "axios";
import { useEffect, useState } from "react";
import "./Page Play.css";

interface Chanson {
  id: number;
  Titre: string;
  CanalMidi: number;
  PgmMidi: number;
}

const PagePlay = () => {
  useEffect(() => {
    window.navigator
      .requestMIDIAccess()
      .then((midiAccess) => {
        console.log("MIDI Ready!");
        for (let entry of midiAccess.inputs) {
          console.log("MIDI input device: " + entry[1].id);
          entry[1].onmidimessage = onMidiMessage;
        }
      })
      .catch((error) => {
        console.log("Error accessing MIDI devices:", error);
      });
  }, []);

  const [chansonAAfficher, setChansonAAfficher] = useState<Chanson>();
  const onMidiMessage = (midiEvent: WebMidi.MIDIMessageEvent) => {
    let data: Uint8Array = midiEvent.data;
    // la longueur des données Midi conditionne la recherche (2=Chanson) reception que si l'on a 2 données (commande et note)
    if (data.length === 2) {
      let status = data[0]; // status est le premier bit de la donnée "data".
      let command = status >>> 4; // command est le quatrieme bit de la donnée "data".
      let channel = (status & 0xf) + 1; // j'ajoute 1 à channel en hexadecimal pour me situer entre (1-16) au lieu de (0-15).

      // just look at note on and note off messages.
      if (command === 0xc) {
        let not = data[1]; //  not est le deuxième bit de la donnée "data".
        let note = not + 1; // j'ajoute 1 pour me situer entre (1-128) au lieu de (0-127).
        let velocity = data[2]; //  velocity est le troisième bit de la donnée "data".
        // Le console.log qui suit permet de visualiser n'importe quel signal MIDI (changement de programme) provenant d'une machine Exterieure
        console.log(note, velocity);
        // console.log(
        //   `Canal MIDI:${channel}, Commande:${status}, note:${note}, vélocité:${velocity}`
        // );
        axios
          .post(`http://localhost:8080/api/chanson/charge`, {
            CanalMidi: channel,
            PgmMidi: note,
          })

          .then((retourChanson) => {
            let Chanson = retourChanson.data;
            setChansonAAfficher(Chanson);
            console.log(Chanson);
          });
      }
    }
    // la longueur des données Midi conditionne la recherche (3=Visuel) reception que si l'on a 3 données (commande, note et vélocité)
    if (data.length === 3) {
      let status = data[0]; // status est le premier bit de la donnée "data".
      let command = status >>> 4; // command est le quatrieme bit de la donnée "data".
      let channel = (status & 0xf) + 1; // j'ajoute 1 à channel en hexadecimal pour me situer entre (1-16) au lieu de (0-15).
      // let notMIDI = data[1]; //  not est le deuxième bit de la donnée "data".
      // let noteMIDI = notMIDI + 1; // j'ajoute 1 pour me situer entre (1-128) au lieu de (0-127).
      // let velocityMIDI = data[2]; //  velocity est le troisième bit de la donnée "data".
      //
      if (command === 0x9) {
        // let commandName = command === 0x9 ? "Note On " : "Note Off";
        let not = data[1]; //  not est le deuxième bit de la donnée "data".
        let note = not + 1; // j'ajoute 1 pour me situer entre (1-128) au lieu de (0-127).
        let velocity = data[2]; //  velocity est le troisième bit de la donnée "data".
        console.log(
          `Canal MIDI: ${channel}, Commande: ${status} note: ${note}, vélocité: ${velocity}   `
        );
      }
      // Le console.log qui suit permet de visualiser n'importe quel signal MIDI provenant d'une machine Exterieure
      // console.log(
      //   `Canal MIDI: ${channel}, Commande: ${status} note: ${noteMIDI}, vélocité: ${velocityMIDI}`
      // );
    }
  };

  return (
    <div>
      <div className="card text-bg-sombre">
        <div className="card-body">
          <h5 className="card-title">Titre:{chansonAAfficher?.Titre}</h5>
          <h6 className="card-subtitle mb-2 text-muted">
            Canal Midi:
            {chansonAAfficher?.CanalMidi}
          </h6>
          <p className="card-text">Programme:{chansonAAfficher?.PgmMidi}</p>
        </div>
      </div>
    </div>
  );
};

export default PagePlay;
