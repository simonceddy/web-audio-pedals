import { $el } from '../$e';

export default function inputKnob(id = 'input-knob') {
  /** @type {import('input-knob')} */
  const el = $el('input-knob');
  el.id = id;

  return el;
}
