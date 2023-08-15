/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
import Tuna from 'tunajs';
import 'input-knob';
import template from './templates/pedalboard.ejs';
import './styles';
// import initPedalContainer from './initPedalContainer';
import compressor from './pedals/compressor';
import yumCrisps from './pedals/yumCrisps';
import chorus from './pedals/chorus';
// import bigMute from './pedals/bigMute';
import delay from './pedals/delay';
import algoDrive from './pedals/algoDrive';
// import makeAddButton from './makeAddButton';
import Pedalboard from './pedalboard';
import Toolbar from './components/toolbar';
import muteButton from './components/muteButton';
import PedalDirectory from './PedalDirectory';

console.log('working');
document.body.innerHTML = template;

const board = document.getElementById('pedalboard-container');

// console.log(board);
const context = new AudioContext();
const tuna = new Tuna(context);

/** @type {HTMLDivElement} */
let selectedPedal;

/**
 *
 * @param {HTMLDivElement} el
*/
const selectPedal = (el) => {
  if (selectedPedal) {
    selectedPedal.classList.replace('z-20', 'z-10');
    selectedPedal.classList.replace('dark:border-yellow-300', 'dark:border-slate-300');
    selectedPedal.classList.replace('border-yellow-700', 'border-slate-700');
  }
  el.classList.replace('dark:border-slate-300', 'dark:border-yellow-300');
  el.classList.replace('border-slate-700', 'border-yellow-700');
  el.classList.replace('z-10', 'z-20');
  selectedPedal = el;
};

/**
 * @typedef {object} PedalData
 * @prop {string} name
 * @prop {HTMLDivElement} el
 * @prop {AudioNode|import('tunajs').TunaAudioNode} effect
 * @prop {?number} id
 * @prop {?Function} addNext
 * @prop {?Function} onClick
 */

const makePedalObj = ([el, effect], id) => ({
  el,
  effect,
  name: effect?.name || `Pedal ${id}`,
  id,
  onClick: () => selectPedal(el),
  addNext: (key) => addToPedalBoard(key, id + 1)
});

let pedals = [
  compressor(tuna, 'comp1'),
  algoDrive(tuna),
  chorus(tuna, 'chorus1'),
  delay(tuna, 'delay1'),
  delay(tuna, 'delay2'),
  yumCrisps(tuna),
  compressor(tuna, 'comp2'),
  // bigMute(context, 'bigmute'),
].map(makePedalObj);
const pedalBoard = new Pedalboard(context, pedals.map((v) => v.effect));
const toolbar = new Toolbar(document.getElementById('toolbar'));

const output = new GainNode(context, { gain: 0.5 });

const removePedal = (el, effect, onRemove) => () => {
  pedalBoard.remove(pedalBoard.indexOf(effect));
  board.removeChild(el);
  console.log(pedals);
  pedals = pedals.filter((pedal) => pedal.el !== el);
  console.log(pedals);
  if (onRemove) onRemove(pedals);
};

const diretory = new PedalDirectory(context, tuna);

const addToPedalBoard = (id, index = -1) => {
  const factory = diretory.factoryFor(id);
  const [el, effect] = factory(tuna, `${id}-effect-${pedalBoard.effects.length}`);
  if (effect) pedalBoard.insert(effect, index);
  board.appendChild(el);
  const closeButton = document.getElementById(`${el.id}-close-button`);
  if (closeButton) {
    closeButton.addEventListener('click', removePedal(el, effect, (p) => {
      console.log('should render toolbar');
      toolbar.render(p, (f, key) => {
        addToPedalBoard(f, key, 0);
      });
    }));
  } else {
    console.log(el);
  }
  const i = index > 0 ? index : 0;
  pedals.splice(i, 0, makePedalObj([el, effect], i));
  // console.log(pedalBoard.effects);
  toolbar.render(pedals, (f, key) => {
    addToPedalBoard(f, key, 0);
  });
};

async function setup() {
  // if (context.state === 'suspended') {
  //   await context.resume();
  // }
  const stream = await navigator.mediaDevices
    .getUserMedia({
      audio: {
        echoCancellation: false,
        autoGainControl: false,
        noiseSuppression: false,
        latency: 0
      }
    });

  const lineInSource = context.createMediaStreamSource(stream);
  lineInSource.disconnect();

  let nextWidth = 5;
  let row = 0;

  const styleEl = (el) => {
    el.style.left = `${nextWidth}px`;
    el.style.top = `${row * 230}px`;
    return el;
  };
  /**
   *
   * @param {PedalData} pedal
   */
  const setupPedal = (pedal) => {
    pedal.el.addEventListener('mousedown', () => selectPedal(pedal.el));
    styleEl(pedal.el);
    board.appendChild(pedal.el);
    const closeButton = document.getElementById(`${pedal.el.id}-close-button`);
    if (closeButton) {
      closeButton.addEventListener('click', removePedal(pedal.el, pedal.effect, (p) => {
        console.log('should render toolbar');
        toolbar.render(p, (key) => {
          addToPedalBoard(key, 0);
        });
      }));
    } else {
      console.log(pedal.el);
    }
    // renderToToolbar(el, effect, id);
    nextWidth += (pedal.el.clientWidth + 5);
    if (nextWidth >= board.clientWidth) {
      nextWidth = 0;
      row += 1;
      // restyle el
      styleEl(pedal.el);
      nextWidth += (pedal.el.clientWidth + 5);
    }
    return pedal;
  };
  toolbar.render(pedals.map(setupPedal), (key) => {
    addToPedalBoard(key, 0);
  });

  toolbar.appendChild(muteButton(context));
  pedalBoard.plugIn(lineInSource);
  pedalBoard.connect(output);
  // const pingPongDelay = new tuna.PingPongDelay({
  //   wetLevel: 0.5, // 0 to 1
  //   feedback: 0.3, // 0 to 1
  //   delayTimeLeft: 200, // 1 to 10000 (milliseconds)
  //   delayTimeRight: 400 // 1 to 10000 (milliseconds)
  // });

  // const comp2 = new tuna.Compressor({
  //   threshold: -20, // -100 to 0
  //   makeupGain: 1, // 0 and up (in decibels)
  //   attack: 1, // 0 to 1000
  //   release: 250, // 0 to 3000
  //   ratio: 14, // 1 to 20
  //   knee: 5, // 0 to 40
  //   automakeup: false, // true/false
  //   bypass: false
  // });

  // const cabinet = new tuna.Cabinet({
  //   makeupGain: 2, // 0 to 20
  //   impulsePath: 'ir/V30 412 C Hi-Gn All+Room Stereo Celestion.wav', // path to your speaker impulse
  //   bypass: false
  // });

  // lineInSource.connect(comp1Effect);
  // comp1Effect.connect(algoDriveEffect);
  // algoDriveEffect.connect(cabinet);
  // cabinet.connect(chorus1Effect);
  // chorus1Effect.connect(delay1Effect);
  // delay1Effect.connect(delay2Effect);
  // // chorus2.connect(delay2Effect);
  // delay2Effect.connect(pingPongDelay);
  // pingPongDelay.connect(yumCrispsEffect);
  // yumCrispsEffect.connect(comp2);
  // comp2.connect(output);
  // bigMuteEffect.connect(output);
  output.connect(context.destination);
  // const micStatus = await navigator.permissions.query({ name: 'microphone' });
}
// gainNode.gain.exponentialRampToValueAtTime(gain, context.currentTime + 0.01);

setup();
