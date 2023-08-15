import { $el } from '../$e';
import bypassSwitch from '../components/bypassSwitch';
import paramControl from '../components/paramControl';
import CurvyCruncha from '../effects/CurvyCruncha';
import initPedalContainer from '../initPedalContainer';

export default function curvyCruncha(context, id = 'curvy-cruncha') {
  const effect = new CurvyCruncha(context);

  const el = initPedalContainer(id, '220px', '200px');
  el.classList.add(
    'bg-red-400',
    'text-black',
    'col',
    'justify-between',
    'items-center'
  );

  const label = $el('span');
  label.innerHTML = 'Curvy Cruncha';

  const gainKnob = paramControl(`${id}-gain-knob`, effect, 'gain.', {
    min: 0,
    max: 1,
    scale: 1,
    value: typeof effect.gain === 'number' ? effect.gain : 0.5,
    label: 'drive'
  });

  const lowPassHzKnob = paramControl(`${id}-lowPassHz-knob`, effect, 'lowPassHz.', {
    min: 20,
    max: 22050,
    scale: 22030,
    value: typeof effect.lowPassHz === 'number' ? effect.lowPassHz : 20000,
    label: 'LPF'
  });

  const highPassHzKnob = paramControl(`${id}-highPassHz-knob`, effect, 'highPassHz.', {
    min: 20,
    max: 22050,
    scale: 22030,
    value: typeof effect.highPassHz === 'number' ? effect.highPassHz : 20,
    label: 'HPF'
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
    gainKnob,
    lowPassHzKnob,
    highPassHzKnob,
  );

  const footswitches = $el('div');
  footswitches.classList.add('row', 'justify-between', 'items-center');
  const bypass = bypassSwitch(id, effect);
  footswitches.append(bypass);

  el.append(controls, label, footswitches);

  return [el, effect];
}
