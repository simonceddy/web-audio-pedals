import { $el } from '../$e';
import rotaryKnob from './rotaryKnob';

const defaultOpts = {
  max: 20,
  min: 0,
  scale: 20,
  value: 1,
  label: null,
};

export default function paramControl(id, effect, param, options = defaultOpts) {
  const opts = { ...defaultOpts, ...options };
  const el = $el('div');
  el.classList.add('col', 'justify-between', 'items-center', 'mx-1');
  const span = $el('span');
  span.classList.add('text-xs', 'capitalize', 'font-mono', 'select-none');
  span.innerHTML = opts.label || param;
  const knob = rotaryKnob(`${id}-knob`, {
    max: opts.max,
    min: opts.min,
    value: typeof effect[param] === 'number' ? effect[param] : opts.value,
    scale: opts.scale
  });
  knob.addEventListener('knob-move-change', (e) => {
    effect[param] = e.target.value;
  });

  knob.addEventListener('dblclick', () => {
    knob.value = opts.value;
    effect[param] = opts.value;
  });

  el.append(span, knob);

  return el;
}
