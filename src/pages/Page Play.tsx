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
    console.log("Error accessing MIDI devices: " + error);
  });
// let noteNames: string[] = [
//   "C",
//   "C#",
//   "D",
//   "D#",
//   "E",
//   "F",
//   "F#",
//   "G",
//   "G#",
//   "A",
//   "A#",
//   "B",
// ];

function onMidiMessage(midiEvent: WebMidi.MIDIMessageEvent): void {
  let data: Uint8Array = midiEvent.data;
  if (data.length === 3) {
    // status is the first byte.
    let status = data[0];
    // command is the four most significant bits of the status byte.
    let command = status >>> 4;
    // channel 0-15 is the lower four bits.
    let channel = (status & 0xf) + 1;
    // console.log(`Canal MIDI: ${channel}, Commande: ${status}`);

    // just look at note on and note off messages.
    if (command === 0x9) {
      // note number is the second byte.
      let note = data[1];
      // velocity is the thrid byte.
      let velocity = data[2];
      // let commandName = command === 0x9 ? "Note On " : "Note Off";

      // calculate octave and note name.
      // let octave = Math.trunc(note / 12);
      // let noteName = noteNames[note % 12];

      // console.log(`${commandName} ${noteName}${octave} ${velocity}`);
      console.log(
        `Canal MIDI: ${channel}, Commande: ${status} note: ${note}, vélocité: ${velocity}   `
      );
    }
  }
  if (data.length === 2) {
    // status is the first byte.
    let status = data[0];
    // command is the four most significant bits of the status byte.
    let command = status >>> 4;
    // channel 0-15 is the lower four bits.
    let channel = (status & 0xf) + 1;

    // just look at note on and note off messages.
    if (command === 0xc) {
      // note number is the second byte.
      let not = data[1];
      let note = not + 1;
      // velocity is the thrid byte.
      let velocity = data[2];
      // let commandName = command === 0x9 ? "Note On " : "Note Off";

      // calculate octave and note name.
      // let octave = Math.trunc(note / 12);
      // let noteName = noteNames[note % 12];

      // console.log(`${commandName} ${noteName}${octave} ${velocity}`);
      console.log(
        `Canal MIDI: ${channel}, Commande: ${status} note: ${note}, vélocité: ${velocity}   `
      );
    }
  }
}
const PagePlay = () => {
  return (
    <div>
      <h1>Hello World PagePlay</h1>
    </div>
  );
};

export default PagePlay;
