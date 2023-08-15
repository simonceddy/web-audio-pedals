import { $el } from '../$e';
import rotaryKnob from './rotaryKnob';

const defaultOpts = {
  max: 20,
  min: 0,
  scale: 20,
  value: 1,
  label: null,
};

function setParamVal(effect, param, val) {
  if (!effect[param]) return false;
  if (effect[param].value) effect[param].value = val;
  effect[param] = val;
  // console.log(effect, param);
  return effect;
}

function renderValue(effect, param) {
  if (effect[param]) {
    if (effect[param].value && typeof effect[param].value === 'number') {
      return effect[param].value;
    }
    if (typeof effect[param] === 'number') {
      return effect[param];
    }
  }
  console.log(`could not render value for ${param}`, effect);
  return null;
}

export default function paramControl(id, effect, param, options = defaultOpts) {
  const opts = { ...defaultOpts, ...options };
  const el = $el('div');
  el.classList.add('col', 'justify-between', 'items-center', 'mx-1', 'tooltip');
  const span = $el('span');
  const tooltip = $el('span');
  tooltip.classList.add('tooltip-text');
  span.classList.add('text-xs', 'capitalize', 'font-mono', 'select-none');
  span.innerHTML = opts.label || param;

  const updateTooltip = () => {
    const val = renderValue(effect, param);
    tooltip.innerHTML = val ? val.toLocaleString('en-US', {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2
    }) : opts.value;
  };

  updateTooltip();
  const knob = rotaryKnob(`${id}-knob`, {
    max: opts.max,
    min: opts.min,
    value: renderValue(effect, param) || opts.value,
    scale: opts.scale
  });
  // (12).toLocaleString('en-US', {
  //   maximumFractionDigits: 2,
  //   minimumFractionDigits: 2
  // });
  knob.addEventListener('knob-move-change', (e) => {
    const result = setParamVal(effect, param, Number(e.target.value));
    if (!result) console.log(effect, param);
    updateTooltip();
  });

  knob.addEventListener('dblclick', () => {
    setParamVal(effect, param, Number(opts.value));
    updateTooltip();
  });

  el.append(span, knob, tooltip);

  return el;
}
