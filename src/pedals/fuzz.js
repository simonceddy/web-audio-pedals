import { $el } from '../$e';
import rotaryKnob from '../components/rotaryKnob';
import initPedalContainer from '../initPedalContainer';
import ledSwitch from '../components/ledSwitch';

export default function fuzz() {
  const el = initPedalContainer('fuzz-pedal-container', '140px', '192px');
  el.classList.add(
    'bg-orange-800',
    'text-black',
    'col',
    'justify-between',
    'items-center',
    'overflow-x-hidden',
    'whitespace-nowrap'
  );
  const label = $el('span');
  label.classList.add(
    'absolute',
    'top-1/3',
    'w-full',
    'text-center',
    'italic',
    'font-mono',
    'font-bold',
    'select-none',
    'text-6xl',
    'rotate-6',
    'text-purple-900'
  );

  label.style.textShadow = '';

  label.innerHTML = 'FUZZ';

  const controls = $el('div');

  controls.classList.add('row', 'items-center', 'justify-around', 'mt-2', 'mx-1');

  const footswitches = $el('div');
  footswitches.classList.add(
    'row',
    'justify-around',
    'items-center',
    'w-full'
  );

  const [bypass] = ledSwitch('fuzz-bypass');

  footswitches.append(bypass);

  const gainKnob = rotaryKnob('fuzz-gain-knob');
  gainKnob.classList.add('bg-black');
  gainKnob.min = 0;
  gainKnob.max = 42;
  gainKnob.value = 36;
  gainKnob.scale = 42;
  gainKnob.step = 1;
  const gainLabel = $el('span');
  gainLabel.classList.add('font-mono', 'text-sm', 'capitalize');
  gainLabel.innerHTML = 'gain';

  const gainKnobContainer = $el('div');
  gainKnobContainer.classList.add(
    'col',
    'justify-between',
    'items-center'
  );
  gainKnobContainer.append(gainLabel, gainKnob);
  controls.append(gainKnobContainer);
  el.append(label, controls, footswitches);
  return el;
}
