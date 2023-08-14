import { $el } from '../$e';

export default function led(id) {
  const el = $el('span');
  el.id = id;
  el.classList.add('rounded-full', 'w-2', 'h-2', 'border', 'border-black', 'z-20');
  return el;
}
