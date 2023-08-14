import { $el } from '../$e';
import bypassSwitch from '../components/bypassSwitch';
import paramControl from '../components/paramControl';
import initPedalContainer from '../initPedalContainer';

const params = {
  outputGain: -9.154, // -42 to 0 in dB
  drive: 0.8, // 0 to 1
  curveAmount: 0.5, // 0 to 1
  algorithmIndex: 4, // 0 to 5, selects one of the drive algorithms
  bypass: false
};

/**
 *
 * @param {import('tunajs')} tuna
 * @param {*} id
 */
function algoDrive(tuna, id = 'algodrive') {
  const container = initPedalContainer(`${id}`, '160px', '210px');

  const effect = new tuna.Overdrive(params);

  const label = $el('span');

  label.innerHTML = 'Drive';
  label.classList.add(
    'font-bold',
    'font-mono',
    'absolute',
    'top-[55%]',
    'left-1',
    'text-2xl',
    'select-none',
  );

  const driveKnob = paramControl(`${id}-drive-knob`, effect, 'drive', {
    min: 0,
    max: 1,
    scale: 1,
    value: typeof effect.drive === 'number' ? effect.drive : params.drive,
    label: 'drive'
  });

  const curveAmountKnob = paramControl(`${id}-curveAmount-knob`, effect, 'curveAmount', {
    min: 0,
    max: 1,
    scale: 1,
    value: typeof effect.curveAmount === 'number' ? effect.curveAmount : params.curveAmount,
    label: 'curve'
  });

  const gainKnob = paramControl(`${id}-gain-knob`, effect, 'gain', {
    min: -42,
    max: 0,
    scale: 42,
    value: typeof effect.gain === 'number' ? effect.gain : params.gain,
    label: 'gain'
  });

  const controls = $el('div');
  controls.classList.add(
    'row',
    'flex-wrap',
    'justify-evenly',
    'items-center',
    'w-full',
    'p-2'
  );

  controls.append(
    driveKnob,
    curveAmountKnob,
    gainKnob
  );

  /** @type {HTMLInputElement} */
  const algoSelector = $el('input');
  algoSelector.type = 'range';
  algoSelector.max = 5;
  algoSelector.min = 0;
  algoSelector.step = 1;
  algoSelector.value = effect.algorithmIndex || params.algorithmIndex;
  algoSelector.classList.add('w-4/5', 'z-30');

  algoSelector.onchange = (e) => {
    effect.algorithmIndex = Number(e.target.value);
  };

  algoSelector.ondragstart = () => false;

  const controlsContainer = $el('div');
  controlsContainer.classList.add('col', 'justify-center', 'items-center', 'w-full');
  controlsContainer.append(controls, algoSelector);
  const footswitches = $el('div');
  footswitches.classList.add('row', 'justify-between', 'items-center');
  const bypass = bypassSwitch(id, effect);
  footswitches.append(bypass);

  container.classList.add(
    'bg-red-900',
    'text-white',
    'col',
    'justify-between',
    'items-center'
  );

  container.append(controlsContainer, footswitches, label);
  return [container, effect];
}

export default algoDrive;
