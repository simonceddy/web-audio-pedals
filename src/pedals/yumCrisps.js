import { $el } from '../$e';
import bypassSwitch from '../components/bypassSwitch';
import paramControl from '../components/paramControl';
import initPedalContainer from '../initPedalContainer';

const defaultParams = {
  highCut: 22050, // 20 to 22050
  lowCut: 20, // 20 to 22050
  dryLevel: 1, // 0 to 1+
  wetLevel: 1, // 0 to 1+
  level: 1, // 0 to 1+, adjusts total output of both wet and dry
  impulse: 'ir/h3000, 86~DrewzNooRoom (611)_dc.wav', // the path to your impulse response
  bypass: false
};

/**
 *
 * @param {import('tunajs')} tuna
 * @param {string} id
 * @returns
 */
export default function yumCrisps(tuna, id = 'yum-crisps') {
  const container = initPedalContainer(id, '220px', '192px');

  const convolver = new tuna.Convolver(defaultParams);

  const lowCutKnob = paramControl(`${id}-low-cut-knob`, convolver, 'lowCut', {
    min: 20,
    max: 22050,
    scale: 22050,
    value: 20,
    label: 'HPF'
  });
  const highCutKnob = paramControl(`${id}-high-cut-knob`, convolver, 'highCut', {
    min: 20,
    max: 22050,
    scale: 22050,
    value: 20000,
    label: 'LPF'
  });

  const dryLvlKnob = paramControl(`${id}-dry-lvl-knob`, convolver, 'dryLevel', {
    min: 0,
    max: 1,
    scale: 1,
    value: 1,
    label: 'Dry'
  });
  const wetLvlKnob = paramControl(`${id}-wet-lvl-knob`, convolver, 'wetLevel', {
    min: 0,
    max: 1,
    scale: 1,
    value: 1,
    label: 'wet'
  });
  const volumeKnob = paramControl(`${id}-volume-knob`, convolver, 'level', {
    min: 0,
    max: 1,
    scale: 1,
    value: 1,
    label: 'vol'
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
    lowCutKnob,
    highCutKnob,
    wetLvlKnob,
    dryLvlKnob,
    volumeKnob
  );

  const footswitches = $el('div');
  footswitches.classList.add('row', 'justify-between', 'items-center');
  const bypass = bypassSwitch(id, convolver);
  footswitches.append(bypass);

  container.classList.add(
    'bg-purple-400',
    'text-white',
    'col',
    'justify-between',
    'items-center'
  );

  container.append(controls, footswitches);
  return [container, convolver];
}
