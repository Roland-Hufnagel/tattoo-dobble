const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playBeep(frequency, duration, type = "square", delay = 0) {
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, audioCtx.currentTime + delay);

  gain.gain.setValueAtTime(0.2, audioCtx.currentTime + delay); // Lautstärke
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    audioCtx.currentTime + delay + duration
  );

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start(audioCtx.currentTime + delay);
  osc.stop(audioCtx.currentTime + delay + duration);
}

export function playCorrect() {
  // Coin Pickup: schneller Arpeggio-Sound
  playBeep(800, 0.1, "square");
  playBeep(1000, 0.1, "square", 0.1);
  playBeep(1300, 0.15, "square", 0.2);
}

export function playWrong() {
  // Buzzer: tiefer Brumm mit Vibrato
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(200, audioCtx.currentTime);

  // schnelles Wobble
  const lfo = audioCtx.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = 10; // Vibrato-Geschwindigkeit
  const lfoGain = audioCtx.createGain();
  lfoGain.gain.value = 20; // Vibrato-Stärke
  lfo.connect(lfoGain).connect(osc.frequency);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);

  osc.start();
  lfo.start();
  osc.stop(audioCtx.currentTime + 0.6);
  lfo.stop(audioCtx.currentTime + 0.6);
}
