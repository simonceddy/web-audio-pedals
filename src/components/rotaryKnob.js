import { $el } from '../$e';

const defaultOpts = {
  min: 0,
  max: 10,
  scale: 10,
  value: 1,
};

export default function rotaryKnob(id, opts = defaultOpts) {
  /** @type {import('input-knob')} */
  const knob = $el('input-knob');
  // const el = $el('div');
  knob.id = id;
  knob.min = opts.min || defaultOpts.min;
  knob.max = opts.max || defaultOpts.max;
  knob.scale = opts.scale || defaultOpts.scale;
  knob.value = opts.value || defaultOpts.value;
  knob.classList.add(
    'rounded-full',
    'w-8',
    'h-8',
    'relative',
    'border-2',
    'border-slate-700',
    'dark:border-slate-300',
    'z-20',
    'bg-slate-400'
  );

  const line = $el('span');
  line.classList.add(
    'absolute',
    'top-[-8px]',
    'text-center',
    'w-full',
    'font-bold',
    'z-30',
    'select-none',
    'text-slate-700',
    'dark:text-slate-300',
  );
  line.innerHTML = '|';
  knob.appendChild(line);

  return knob;
}
