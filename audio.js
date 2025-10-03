{
  /* <button id="clickBtn">Klick mich</button> */
}

// 1️⃣ AudioContext erstellen (mobilfreundlich)
const AudioContextClass = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContextClass();

// Funktion, um AudioContext bei User-Interaction zu aktivieren
function unlockAudioContext() {
  if (audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  document.body.removeEventListener("click", unlockAudioContext);
}
document.body.addEventListener("click", unlockAudioContext);

// 2️⃣ Funktion für den Klicksound
export function playClickSound() {
  const oscillator = audioCtx.createOscillator(); // Tonquelle
  const gainNode = audioCtx.createGain(); // Lautstärkesteuerung

  oscillator.type = "sine"; // kurzer, unaufdringlicher Sound
  oscillator.frequency.setValueAtTime(600, audioCtx.currentTime); // Tonhöhe in Hz

  gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime); // sehr leise starten
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1); // schnell ausblenden

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start(audioCtx.currentTime);
  oscillator.stop(audioCtx.currentTime + 0.03); // sehr kurzer Ton
}

export function playWrongSound() {
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(600, audioCtx.currentTime); // etwas tiefer
  oscillator.frequency.exponentialRampToValueAtTime(
    200,
    audioCtx.currentTime + 0.2
  ); // abfallender Ton

  gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime); // leise starten
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2); // fade-out

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start(audioCtx.currentTime);
  oscillator.stop(audioCtx.currentTime + 0.2); // etwas länger als Klick, aber immer noch kurz
}

export function playMatchSound() {
  const now = audioCtx.currentTime;
  const gainNode = audioCtx.createGain();
  gainNode.gain.setValueAtTime(0.15, now);
  gainNode.connect(audioCtx.destination);

  // Musikintervalle (C5-Pentatonik, typische Zauberstab-Folge)
  const frequencies = [523, 659, 783, 987, 1319]; // Hz
  const duration = 0.04; // Dauer pro Ton
  const gap = 0.00; // Pause zwischen Tönen

  for (let i = 0; i < frequencies.length; i++) {
    const osc = audioCtx.createOscillator();
    osc.type = "sine";
    osc.frequency.setValueAtTime(frequencies[i], now + i * (duration + gap));

    // Sanfte Hüllkurve pro Ton
    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.001, now + i * (duration + gap));
    gain.gain.exponentialRampToValueAtTime(
      0.15,
      now + i * (duration + gap) + 0.02
    ); // Fade-In
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      now + i * (duration + gap) + duration
    ); // Fade-Out

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now + i * (duration + gap));
    osc.stop(now + i * (duration + gap) + duration);
  }
}

export function playMatchSound2() {
  const now = audioCtx.currentTime;

  // GainNode für Gesamtlautstärke
  const gainNode = audioCtx.createGain();
  gainNode.gain.setValueAtTime(0.15, now); // leicht hörbar
  gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.5); // sanft ausblenden
  gainNode.connect(audioCtx.destination);

  // Haupt-Oszillator (sanfter Aufstieg)
  const osc1 = audioCtx.createOscillator();
  osc1.type = "sine";
  osc1.frequency.setValueAtTime(600, now);
  osc1.frequency.exponentialRampToValueAtTime(900, now + 0.5);
  osc1.connect(gainNode);
  osc1.start(now);
  osc1.stop(now + 0.5);

  // zweiter Oszillator (höher, glitzernd)
  const osc2 = audioCtx.createOscillator();
  osc2.type = "triangle";
  osc2.frequency.setValueAtTime(900, now);
  osc2.frequency.exponentialRampToValueAtTime(1200, now + 0.5);
  osc2.connect(gainNode);
  osc2.start(now);
  osc2.stop(now + 0.5);

  // leichter Arpeggio-/Glissando-Effekt (zusätzlich kleine schnelle Sprünge)
  const osc3 = audioCtx.createOscillator();
  osc3.type = "sine";
  osc3.frequency.setValueAtTime(700, now);
  osc3.frequency.setValueAtTime(700, now + 0.05);
  osc3.frequency.setValueAtTime(800, now + 0.1);
  osc3.frequency.setValueAtTime(1000, now + 0.2);
  osc3.connect(gainNode);
  osc3.start(now);
  osc3.stop(now + 0.3);
}
export function playWinSound() {
  const now = audioCtx.currentTime;

  // Gesamtlautstärke GainNode
  const gainNode = audioCtx.createGain();
  gainNode.gain.setValueAtTime(0.05, now);        // leise starten
  gainNode.gain.linearRampToValueAtTime(0.2, now + 0.2);  // Crescendo
  gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.9); // sanft ausblenden
  gainNode.connect(audioCtx.destination);

  // Basisfrequenzen für Fanfare (mehrstimmig, 3 Stimmen)
  const baseFrequencies = [
    [440, 554, 659],   // Stimme 1
    [349, 440, 523],   // Stimme 2
    [392, 494, 587]    // Stimme 3
  ];

  baseFrequencies.forEach((freqs, idx) => {
    freqs.forEach((f, i) => {
      const osc = audioCtx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, now + i * 0.1 + idx * 0.02); // leichte Verschiebung pro Stimme
      osc.connect(gainNode);
      osc.start(now + i * 0.1 + idx * 0.02);
      osc.stop(now + i * 0.1 + idx * 0.02 + 0.3); // jeder Ton ~0.3s
    });
  });
}

// 3️⃣ Event Listener für Button
// document.getElementById("clickBtn").addEventListener("click", () => {
//   playClickSound();
// });
