import { $el } from '../$e';
import bypassSwitch from '../components/bypassSwitch';
import paramControl from '../components/paramControl';
import initPedalContainer from '../initPedalContainer';

const params = {
  feedback: 0.7, // 0 to 1+
  delayTime: 220, // 1 to 10000 milliseconds
  wetLevel: 0.9, // 0 to 1+
  dryLevel: 0.6, // 0 to 1+
  cutoff: 20000, // cutoff frequency of the built in lowpass-filter. 20 to 22050
  bypass: false
};

/**
 *
 * @param {import('tunajs')} tuna
 * @param {string} id
 * @returns
 */
function delay(tuna, id = 'delay') {
  const container = initPedalContainer(`${id}-container`, '220px', '192px');

  const effect = new tuna.Delay(params);

  const label = $el('span');

  label.innerHTML = 'Delay';
  label.classList.add(
    'font-bold',
    'font-serif',
    'italic',
    'absolute',
    'top-[66%]',
    'left-[1%]',
    'select-none',
    'text-blue-600',
    'text-2xl',
    '-rotate-45',
  );

  const delayTimeKnob = paramControl(`${id}-delayTime-knob`, effect, 'delayTime', {
    min: 1,
    max: 10000,
    scale: 10000,
    value: typeof effect.delayTime === 'number' ? effect.delayTime : params.delayTime,
    label: 'delayTime'
  });
  const feebackKnob = paramControl(`${id}-feeback-knob`, effect, 'feeback', {
    min: 0,
    max: 1.2,
    scale: 1.2,
    value: typeof effect.feeback === 'number' ? effect.feeback : params.feeback,
    label: 'feeback'
  });
  const wetLevelKnob = paramControl(`${id}-wetLevel-knob`, effect, 'wetLevel', {
    min: 0,
    max: 1,
    scale: 1,
    value: typeof effect.wetLevel === 'number' ? effect.wetLevel : params.wetLevel,
    label: 'wetLevel'
  });
  const dryLevelKnob = paramControl(`${id}-dryLevel-knob`, effect, 'dryLevel', {
    min: 0,
    max: 1,
    scale: 1,
    value: typeof effect.dryLevel === 'number' ? effect.dryLevel : params.dryLevel,
    label: 'dryLevel'
  });
  const cutoffKnob = paramControl(`${id}-cutoff-knob`, effect, 'cutoff', {
    min: 20,
    max: 22050,
    scale: 22030,
    value: typeof effect.cutoff === 'number' ? effect.cutoff : params.cutoff,
    label: 'cutoff'
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
  controls.append(delayTimeKnob, feebackKnob, wetLevelKnob, dryLevelKnob, cutoffKnob);
  const footswitches = $el('div');
  footswitches.classList.add('row', 'justify-between', 'items-center');
  const bypass = bypassSwitch(id, effect);
  footswitches.append(bypass);

  container.classList.add(
    'bg-slate-400',
    'text-purple-950',
    'col',
    'justify-between',
    'items-center'
  );

  container.append(controls, footswitches, label);

  return [container, effect];
}

export default delay;
