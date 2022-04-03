const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var ac = new window.AudioContext() || new window.webkitAudioContext();
var osc;
// create Oscillator node
//calculate length of feature in bbox

function playosc() {
  osc = ac.createOscillator();
  osc.type = "sine";
  osc.frequency.value = 250; // value in hertz
  osc.connect(ac.destination);
  osc.start(0.5);
  console.log("osc_playing");
}

function stoposc() {
  osc.stop();
}

export { audioCtx, ac, osc, playosc, stoposc };
