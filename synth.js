const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var ac = new window.AudioContext() || new window.webkitAudioContext();
var osc;
// create Oscillator node
function playosc() {
  osc = ac.createOscillator();
  osc.type = "sine";
  osc.frequency.value = 340; // value in hertz
  osc.connect(ac.destination);
  osc.start(0.5);
  console.log("hello?");
}

function stoposc() {
  osc.stop();
}

export { audioCtx, ac, osc, playosc, stoposc };
