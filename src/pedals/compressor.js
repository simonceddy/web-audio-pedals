import { $el } from '../$e';
import ledSwitch from '../components/ledSwitch';
import paramControl from '../components/paramControl';
import initPedalContainer from '../initPedalContainer';

const params = {
  threshold: -20, // -100 to 0
  makeupGain: 1, // 0 and up (in decibels)
  attack: 1, // 0 to 1000
  release: 250, // 0 to 3000
  ratio: 14, // 1 to 20
  knee: 5, // 0 to 40
  automakeup: false, // true/false
  bypass: false
};

/**
 *
 * @param {import('tunajs')} tuna the app tuna instance
 * @param {string} id id for the compressor
 * @returns
 */
export default function compressor(tuna, id = 'compressor-pedal') {
  const container = initPedalContainer(id, '200px', '200px');
  container.classList.add(
    'col',
    'justify-between',
    'items-center',
    'text-cyan-200',
    'bg-black'
  );
  const effect = new tuna.Compressor(params);

  const label = $el('span');

  label.innerHTML = 'Compressor';
  label.classList.add(
    'font-bold',
    'italic',
    'font-mono',
    'absolute',
    'top-1/2',
    'w-full',
    'text-center',
    'text-xl',
    'select-none',
    'text-teal-200'
  );

  const ratioKnob = paramControl(`${id}-ratio-knob`, effect, 'ratio', {
    max: 20,
    min: 1,
    value: typeof effect.ratio === 'number' ? effect.ratio : params.ratio,
    scale: 19,
    label: 'ratio'
  });

  const thresholdKnob = paramControl(`${id}-threshold-knob`, effect, 'threshold', {
    max: 0,
    min: -100,
    value: typeof effect.threshold === 'number' ? effect.threshold : params.threshold,
    scale: -100,
    label: 'thrs'
  });

  const attackKnob = paramControl(`${id}-attack-knob`, effect, 'attack', {
    max: 1000,
    min: 0,
    value: typeof effect.attack === 'number' ? effect.attack : params.attack,
    scale: 1000,
    label: 'atk'
  });

  const releaseKnob = paramControl(`${id}-release-knob`, effect, 'release', {
    max: 3000,
    min: 0,
    value: typeof effect.release === 'number' ? effect.release : params.release,
    scale: 3000,
    label: 'rel'
  });

  const makeupGainKnob = paramControl(`${id}-makeupGain-knob`, effect, 'makeupGain', {
    max: 12,
    min: 0,
    value: typeof effect.makeupGain === 'number' ? effect.makeupGain : params.makeupGain,
    scale: 12,
    label: 'gain'
  });

  const controls = $el('div');
  controls.classList.add('row', 'w-full', 'flex-wrap', 'justify-evenly', 'items-center');

  controls.append(ratioKnob, thresholdKnob, attackKnob, releaseKnob, makeupGainKnob);

  const footswitches = $el('div');
  footswitches.classList.add('row', 'justify-between', 'items-center');
  const [bypass, toggle] = ledSwitch(`${id}-bypass`, !effect.bypass);
  bypass.onclick = () => {
    console.log(effect);
    toggle();
    effect.bypass = !effect.bypass;
  };
  footswitches.append(bypass);

  container.append(label, controls, footswitches);

  return [container, effect];
}
